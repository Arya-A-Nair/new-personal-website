import React from "react";
import { useIsMobile } from "../../../hooks";
import styles from "./WakatimeStats.module.css";

interface Day {
  date: string;
  total: number;
}

interface WakatimeResponse {
  days: Day[];
}

interface CachedData {
  data: WakatimeResponse;
  timestamp: number;
}

const CACHE_KEY = "wakatime_data";
const CACHE_DURATION = 1000 * 60 * 60;

const WakatimeStats: React.FC = () => {
  const [wakatimeData, setWakatimeData] =
    React.useState<WakatimeResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const fetchWakatimeData = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsed: CachedData = JSON.parse(cachedData);
          const now = Date.now();

          if (now - parsed.timestamp < CACHE_DURATION) {
            setWakatimeData(parsed.data);
            setLoading(false);
            return;
          }
        }

        const response = await fetch(
          "https://wakatime.com/share/@barelyexisting/a3c0dd03-7d1c-4fca-a8a7-f99ccc83b530.json"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        const cacheData: CachedData = {
          data,
          timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

        setWakatimeData(data);
      } catch (err) {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsed: CachedData = JSON.parse(cachedData);
          setWakatimeData(parsed.data);
        } else {
          setError("Unable to load coding stats");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWakatimeData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          Loading coding stats...
        </div>
      </div>
    );
  }

  if (error || !wakatimeData?.days) {
    return (
      <div className={styles.errorContainer}>
        {error || "No data available"}
      </div>
    );
  }

  const days = wakatimeData.days;
  const totalSeconds = days.reduce(
    (sum: number, day: Day) => sum + day.total,
    0
  );
  const totalHours = Math.floor(totalSeconds / 3600);
  const avgHoursPerDay = (totalHours / days.length).toFixed(1);
  const maxDaySeconds = Math.max(...days.map((day: Day) => day.total));
  const maxDayHours = (maxDaySeconds / 3600).toFixed(1);

  const recentDays = days.slice(-30);
  const maxRecent = Math.max(...recentDays.map((day: Day) => day.total));

  const monthlyData = days.reduce(
    (acc: { [key: string]: number }, day: Day) => {
      const date = new Date(day.date);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      acc[monthKey] = (acc[monthKey] || 0) + day.total;
      return acc;
    },
    {}
  );

  const last12Months = Object.entries(monthlyData)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 12)
    .reverse()
    .map(([month, seconds]) => ({
      month,
      hours: Math.round(seconds / 3600),
      monthName: new Date(month + "-01").toLocaleDateString("en", {
        month: "short",
      }),
      year: new Date(month + "-01").toLocaleDateString("en", {
        year: "numeric",
      }),
    }));

  const maxDailyHours = Math.max(...days.map(day => day.total / 3600));
  const _heatmapData = days.slice(-365).map(day => {
    const hours = day.total / 3600;
    let intensity = "heatmapLow";
    if (hours > maxDailyHours * 0.7) intensity = "heatmapVeryHigh";
    else if (hours > maxDailyHours * 0.5) intensity = "heatmapHigh";
    else if (hours > maxDailyHours * 0.2) intensity = "heatmapMedium";

    return {
      date: day.date,
      hours: hours.toFixed(1),
      intensity,
    };
  });

  return (
    <div className={styles.container}>
      <div
        className={`${styles.statsGrid} ${
          isMobile ? styles.statsGridMobile : styles.statsGridDesktop
        }`}
      >
        <div className={`${styles.statCard} ${styles.statCardBlue}`}>
          <div className={styles.statValue}>{totalHours}h</div>
          <div className={styles.statLabel}>Total Hours</div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardGreen}`}>
          <div className={styles.statValue}>{avgHoursPerDay}h</div>
          <div className={styles.statLabel}>Daily Average</div>
        </div>

        <div
          className={`${styles.statCard} ${styles.statCardOrange} ${
            isMobile ? styles.statCardMobileFullWidth : ""
          }`}
        >
          <div className={styles.statValue}>{maxDayHours}h</div>
          <div className={styles.statLabel}>Best Day</div>
        </div>
      </div>

      <div className={styles.yearlyContainer}>
        <h4 className={styles.yearlyTitle}>Yearly Coding Activity</h4>

        <div className={styles.monthsGrid}>
          {last12Months.reverse().map(({ month, hours, monthName, year }) => (
            <div key={month} className={styles.monthCard}>
              <div className={styles.monthName}>
                {monthName} {year}
              </div>
              <div className={styles.monthHours}>{hours}h</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chartContainer}>
        <h4 className={styles.chartTitle}>Last 30 Days Activity</h4>
        <div className={styles.chartBars}>
          {recentDays.map((day: Day, index: number) => {
            const height = maxRecent > 0 ? (day.total / maxRecent) * 70 : 0;
            const hours = (day.total / 3600).toFixed(1);
            return (
              <div
                key={index}
                className={`${styles.chartBar} ${
                  day.total > 0
                    ? styles.chartBarActive
                    : styles.chartBarInactive
                }`}
                style={{ height: `${Math.max(height, 2)}px` }}
                title={`${new Date(day.date).toLocaleDateString()}: ${hours}h`}
              />
            );
          })}
        </div>
        <div className={styles.chartLabels}>
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      <div className={styles.summaryContainer}>
        <p className={styles.summaryTitle}>📊 Coding Activity Summary</p>
        <p className={styles.summaryText}>
          Over the past {days.length} days, I've logged{" "}
          <strong>{totalHours} hours</strong> of coding time. That's an average
          of <strong>{avgHoursPerDay} hours per day</strong>, with my most
          productive day reaching <strong>{maxDayHours} hours</strong>.
        </p>
      </div>
    </div>
  );
};

export default WakatimeStats;
