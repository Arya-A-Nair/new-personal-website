import React, { useState, useEffect } from "react";
import styles from "./LeetCodeStats.module.css";

interface LeetCodeUser {
    username: string;
    name: string;
    avatar: string;
    ranking: number;
}

interface ProblemsSolved {
    solvedProblem: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    totalSubmissionNum: {
        difficulty: string;
        count: number;
        submissions: number;
    }[];
    acSubmissionNum: {
        difficulty: string;
        count: number;
        submissions: number;
    }[];
}

interface Contest {
    title: string;
    startTime: number;
}

interface ContestParticipation {
    attended: boolean;
    rating: number;
    ranking: number;
    trendDirection: "DOWN" | "UP";
    problemsSolved: number;
    totalProblems: number;
    finishTimeInSeconds: number;
    contest: Contest;
}

interface UserContests {
    bestRating: number;
    contestRating: number;
    contests: ContestParticipation[];
    bestRanking: number;
}

interface RecentSubmission {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
}

interface Badge {
    id: string;
    displayName: string;
    icon: string;
    creationDate: string;
}

interface LeetCodeData {
    user: LeetCodeUser;
    problemsSolved: ProblemsSolved;
    contest: UserContests;
    recentSubmissions: RecentSubmission[];
    badges: Badge[];
}

const LEETCODE_USERNAME = "aryaajitnair";
const CACHE_KEY = "leetcode_data_v1";
const CACHE_DURATION = 1000 * 60 * 15;

const LeetCodeStats: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [leetcodeData, setLeetcodeData] = useState<LeetCodeData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showAllContests, setShowAllContests] = useState(false);
    const [showAllSubmissions, setShowAllSubmissions] = useState(false);

    const fetchLeetCodeData = async (): Promise<LeetCodeData> => {
        try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                const isExpired = Date.now() - timestamp > CACHE_DURATION;
                if (!isExpired) {
                    console.log("Using cached LeetCode data");
                    return data;
                }
            }

            const baseApiUrl = `https://alfa-leetcode-api-three.vercel.app`;
            let userData: any = null;
            let solvedData: any = null;
            let contestData: any = null;
            let submissionsData: any = null;
            let badgesData: any = null;

            try {
                const userResponse = await fetch(
                    `${baseApiUrl}/${LEETCODE_USERNAME}`,
                    {
                        method: "GET",
                        headers: { Accept: "application/json" },
                    }
                );

                if (userResponse.ok) {
                    userData = await userResponse.json();
                }

                try {
                    const solvedResponse = await fetch(
                        `${baseApiUrl}/${LEETCODE_USERNAME}/solved`
                    );
                    if (solvedResponse.ok) {
                        solvedData = await solvedResponse.json();
                    }
                } catch (err) {
                    console.warn("Could not fetch solved data:", err);
                }

                try {
                    const contestResponse = await fetch(
                        `${baseApiUrl}/${LEETCODE_USERNAME}/contest`
                    );
                    if (contestResponse.ok) {
                        contestData = await contestResponse.json();
                    }
                } catch (err) {
                    console.warn("Could not fetch contest data:", err);
                }

                try {
                    const submissionResponse = await fetch(
                        `${baseApiUrl}/${LEETCODE_USERNAME}/submission`
                    );
                    if (submissionResponse.ok) {
                        submissionsData = await submissionResponse.json();
                    }
                } catch (err) {
                    console.warn("Could not fetch submission data:", err);
                }

                try {
                    const badgesResponse = await fetch(
                        `${baseApiUrl}/${LEETCODE_USERNAME}/badges`
                    );
                    if (badgesResponse.ok) {
                        badgesData = await badgesResponse.json();
                    }
                } catch (err) {
                    console.warn("Could not fetch badges data:", err);
                }
            } catch (err) {
                console.error(`Failed to fetch from API:`, err);
            }

            if (!userData) {
                console.warn("All APIs failed, no data available");
                throw new Error("No data available from LeetCode API");
            }

            const result: LeetCodeData = {
                user: {
                    username: userData.username || LEETCODE_USERNAME,
                    name: userData.name || userData.username || "Arya Nair",
                    avatar:
                        userData.avatar ||
                        "https://assets.leetcode.com/users/default_avatar.jpg",
                    ranking: userData.ranking || 0,
                },
                problemsSolved: solvedData || {
                    solvedProblem: userData.totalSolved || 0,
                    easySolved: userData.easySolved || 0,
                    mediumSolved: userData.mediumSolved || 0,
                    hardSolved: userData.hardSolved || 0,
                    totalSubmissionNum: [
                        {
                            difficulty: "All",
                            count: userData.totalQuestions || 3284,
                            submissions: userData.totalSolved || 0,
                        },
                        {
                            difficulty: "Easy",
                            count: 748,
                            submissions: userData.easySolved || 0,
                        },
                        {
                            difficulty: "Medium",
                            count: 1552,
                            submissions: userData.mediumSolved || 0,
                        },
                        {
                            difficulty: "Hard",
                            count: 984,
                            submissions: userData.hardSolved || 0,
                        },
                    ],
                    acSubmissionNum: [
                        {
                            difficulty: "All",
                            count: userData.totalSolved || 0,
                            submissions: userData.totalSolved || 0,
                        },
                        {
                            difficulty: "Easy",
                            count: userData.easySolved || 0,
                            submissions: userData.easySolved || 0,
                        },
                        {
                            difficulty: "Medium",
                            count: userData.mediumSolved || 0,
                            submissions: userData.mediumSolved || 0,
                        },
                        {
                            difficulty: "Hard",
                            count: userData.hardSolved || 0,
                            submissions: userData.hardSolved || 0,
                        },
                    ],
                },
                contest: contestData
                    ? {
                          bestRating:
                              contestData.contestParticipation?.length > 0
                                  ? Math.max(
                                        ...contestData.contestParticipation.map(
                                            (contest) => contest.rating
                                        )
                                    )
                                  : contestData.contestRating || 0,
                          contestRating: contestData.contestRating || 0,
                          contests: contestData.contestParticipation || [],
                          bestRanking:
                              contestData.contestParticipation?.length > 0
                                  ? Math.min(
                                        ...contestData.contestParticipation.map(
                                            (contest) => contest.ranking
                                        )
                                    )
                                  : 0,
                      }
                    : {
                          bestRating: 0,
                          contestRating: 0,
                          contests: [],
                          bestRanking: 0,
                      },
                recentSubmissions: submissionsData?.submission || [],
                badges: badgesData?.badges
                    ? badgesData.badges.map((badge) => {
                          if (badge.icon.startsWith("/static")) {
                              badge.icon = "https://leetcode.com" + badge.icon;
                          }
                          return badge;
                      })
                    : [],
            };

            console.log("Final processed data:", result);

            try {
                localStorage.setItem(
                    CACHE_KEY,
                    JSON.stringify({
                        data: result,
                        timestamp: Date.now(),
                    })
                );
            } catch (err) {
                console.warn("Could not cache LeetCode data:", err);
            }

            return result;
        } catch (error) {
            console.error("Error loading LeetCode data:", error);
            return {
                user: {
                    username: LEETCODE_USERNAME,
                    name: "User",
                    avatar: "https://assets.leetcode.com/users/default_avatar.jpg",
                    ranking: 0,
                },
                problemsSolved: {
                    solvedProblem: 0,
                    easySolved: 0,
                    mediumSolved: 0,
                    hardSolved: 0,
                    totalSubmissionNum: [],
                    acSubmissionNum: [],
                },
                contest: {
                    bestRating: 0,
                    contestRating: 0,
                    contests: [],
                    bestRanking: 0,
                },
                recentSubmissions: [],
                badges: [],
            };
        }
    };

    useEffect(() => {
        const loadLeetCodeData = async () => {
            try {
                setLoading(true);
                const data = await fetchLeetCodeData();
                setLeetcodeData(data);
                setError(null);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load LeetCode data"
                );
                setLeetcodeData(null);
            } finally {
                setLoading(false);
            }
        };

        loadLeetCodeData();
    }, []);

    const formatDate = (timestamp: string): string => {
        const date = new Date(parseInt(timestamp) * 1000);
        return date.toLocaleDateString();
    };

    const getLanguageColor = (lang: string): string => {
        const colors: Record<string, string> = {
            python3: "#3776ab",
            cpp: "#00599c",
            java: "#f89820",
            javascript: "#f7df1e",
            typescript: "#3178c6",
            c: "#a8b9cc",
            go: "#00add8",
            rust: "#dea584",
        };
        return colors[lang.toLowerCase()] || "#007aff";
    };

    const formatContestDate = (timestamp: number): string => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getTrendIcon = (direction: "UP" | "DOWN"): string => {
        return direction === "UP" ? "📈" : "📉";
    };

    const getTrendColor = (direction: "UP" | "DOWN"): string => {
        return direction === "UP" ? "#34c759" : "#ff3b30";
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <div>Loading LeetCode stats...</div>
            </div>
        );
    }

    if (!leetcodeData) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h3>Failed to load LeetCode data</h3>
                    <p>{error || "No data available"}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerSection}>
                <div className={styles.profileInfo}>
                    <div className={styles.avatar}>
                        <img
                            src={leetcodeData.user.avatar}
                            alt={leetcodeData.user.name}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    "https://assets.leetcode.com/users/default_avatar.jpg";
                            }}
                        />
                    </div>
                    <div className={styles.userDetails}>
                        <h3>
                            {leetcodeData.user.name ||
                                leetcodeData.user.username}
                        </h3>
                        <div className={styles.username}>
                            @{leetcodeData.user.username}
                        </div>
                        <div className={styles.ranking}>
                            Global Ranking: #
                            {leetcodeData.user.ranking.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className={styles.statsOverview}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>
                            {leetcodeData.problemsSolved.solvedProblem}
                        </div>
                        <div className={styles.statLabel}>Problems Solved</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>
                            {Math.round(leetcodeData.contest.contestRating)}
                        </div>
                        <div className={styles.statLabel}>Contest Rating</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>
                            {leetcodeData.contest.contests?.length}
                        </div>
                        <div className={styles.statLabel}>Contests</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>
                            {leetcodeData.contest.bestRanking
                                ? `#${leetcodeData.contest.bestRanking}`
                                : "N/A"}
                        </div>
                        <div className={styles.statLabel}>Best Rank</div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>📊</span>
                    Problems Solved by Difficulty
                </h4>

                <div className={styles.overallStats}>
                    <div className={styles.totalSolved}>
                        <span className={styles.totalNumber}>
                            {leetcodeData.problemsSolved.solvedProblem}
                        </span>
                        <span className={styles.totalLabel}>Total Solved</span>
                    </div>
                </div>

                <div className={styles.segmentedProgressContainer}>
                    <div className={styles.segmentedProgressBar}>
                        <div
                            className={styles.progressSegment}
                            style={{
                                width: `${
                                    leetcodeData.problemsSolved.solvedProblem >
                                    0
                                        ? (leetcodeData.problemsSolved
                                              .easySolved /
                                              leetcodeData.problemsSolved
                                                  .solvedProblem) *
                                          100
                                        : 0
                                }%`,
                                backgroundColor: "#34c759",
                            }}
                        />
                        <div
                            className={styles.progressSegment}
                            style={{
                                width: `${
                                    leetcodeData.problemsSolved.solvedProblem >
                                    0
                                        ? (leetcodeData.problemsSolved
                                              .mediumSolved /
                                              leetcodeData.problemsSolved
                                                  .solvedProblem) *
                                          100
                                        : 0
                                }%`,
                                backgroundColor: "#ff9500",
                            }}
                        />
                        <div
                            className={styles.progressSegment}
                            style={{
                                width: `${
                                    leetcodeData.problemsSolved.solvedProblem >
                                    0
                                        ? (leetcodeData.problemsSolved
                                              .hardSolved /
                                              leetcodeData.problemsSolved
                                                  .solvedProblem) *
                                          100
                                        : 0
                                }%`,
                                backgroundColor: "#ff3b30",
                            }}
                        />
                    </div>
                </div>

                <div className={styles.difficultyBreakdown}>
                    <div className={styles.difficultyItem}>
                        <div
                            className={styles.difficultyIndicator}
                            style={{ backgroundColor: "#34c759" }}
                        ></div>
                        <div className={styles.difficultyInfo}>
                            <span className={styles.difficultyName}>Easy</span>
                            <span className={styles.difficultyStats}>
                                {leetcodeData.problemsSolved.easySolved}
                                <span className={styles.difficultyPercentage}>
                                    (
                                    {leetcodeData.problemsSolved.solvedProblem >
                                    0
                                        ? Math.round(
                                              (leetcodeData.problemsSolved
                                                  .easySolved /
                                                  leetcodeData.problemsSolved
                                                      .solvedProblem) *
                                                  100
                                          )
                                        : 0}
                                    %)
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className={styles.difficultyItem}>
                        <div
                            className={styles.difficultyIndicator}
                            style={{ backgroundColor: "#ff9500" }}
                        ></div>
                        <div className={styles.difficultyInfo}>
                            <span className={styles.difficultyName}>
                                Medium
                            </span>
                            <span className={styles.difficultyStats}>
                                {leetcodeData.problemsSolved.mediumSolved}
                                <span className={styles.difficultyPercentage}>
                                    (
                                    {leetcodeData.problemsSolved.solvedProblem >
                                    0
                                        ? Math.round(
                                              (leetcodeData.problemsSolved
                                                  .mediumSolved /
                                                  leetcodeData.problemsSolved
                                                      .solvedProblem) *
                                                  100
                                          )
                                        : 0}
                                    %)
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className={styles.difficultyItem}>
                        <div
                            className={styles.difficultyIndicator}
                            style={{ backgroundColor: "#ff3b30" }}
                        ></div>
                        <div className={styles.difficultyInfo}>
                            <span className={styles.difficultyName}>Hard</span>
                            <span className={styles.difficultyStats}>
                                {leetcodeData.problemsSolved.hardSolved}
                                <span className={styles.difficultyPercentage}>
                                    (
                                    {leetcodeData.problemsSolved.solvedProblem >
                                    0
                                        ? Math.round(
                                              (leetcodeData.problemsSolved
                                                  .hardSolved /
                                                  leetcodeData.problemsSolved
                                                      .solvedProblem) *
                                                  100
                                          )
                                        : 0}
                                    %)
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {leetcodeData.contest.contests &&
                leetcodeData.contest.contests.length > 0 && (
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>🏆</span>
                            Contest Performance
                        </h4>

                        <div className={styles.contestSummary}>
                            <div className={styles.summaryCard}>
                                <div className={styles.summaryValue}>
                                    {Math.round(
                                        leetcodeData.contest.contestRating
                                    )}
                                </div>
                                <div className={styles.summaryLabel}>
                                    Current Rating
                                </div>
                            </div>
                            <div className={styles.summaryCard}>
                                <div className={styles.summaryValue}>
                                    {Math.round(
                                        leetcodeData.contest.bestRating
                                    )}
                                </div>
                                <div className={styles.summaryLabel}>
                                    Best Rating
                                </div>
                            </div>
                            <div className={styles.summaryCard}>
                                <div className={styles.summaryValue}>
                                    #{leetcodeData.contest.bestRanking}
                                </div>
                                <div className={styles.summaryLabel}>
                                    Best Rank
                                </div>
                            </div>
                            <div className={styles.summaryCard}>
                                <div className={styles.summaryValue}>
                                    {leetcodeData.contest.contests.length}
                                </div>
                                <div className={styles.summaryLabel}>
                                    Total Contests
                                </div>
                            </div>
                        </div>

                        <div className={styles.contestList}>
                            <div className={styles.contestListHeader}>
                                <h5>Recent Contests</h5>
                                <button
                                    className={styles.expandButton}
                                    onClick={() =>
                                        setShowAllContests(!showAllContests)
                                    }
                                >
                                    {showAllContests ? "Show Less" : "Show All"}
                                    <span
                                        className={`${styles.expandIcon} ${
                                            showAllContests
                                                ? styles.expanded
                                                : ""
                                        }`}
                                    >
                                        ▼
                                    </span>
                                </button>
                            </div>

                            <div className={styles.contestItems}>
                                {leetcodeData.contest.contests
                                    .sort(
                                        (a, b) =>
                                            b.contest.startTime -
                                            a.contest.startTime
                                    )
                                    .slice(0, showAllContests ? undefined : 3)
                                    .map((contest, index) => (
                                        <div
                                            key={index}
                                            className={styles.contestItem}
                                        >
                                            <div
                                                className={styles.contestHeader}
                                            >
                                                <div
                                                    className={
                                                        styles.contestTitle
                                                    }
                                                >
                                                    {contest.contest.title}
                                                </div>
                                                <div
                                                    className={
                                                        styles.contestDate
                                                    }
                                                >
                                                    {formatContestDate(
                                                        contest.contest
                                                            .startTime
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                className={
                                                    styles.contestDetails
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.contestStat
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.statLabel
                                                        }
                                                    >
                                                        Rating:
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.statValue
                                                        }
                                                    >
                                                        {Math.round(
                                                            contest.rating
                                                        )}
                                                        <span
                                                            className={
                                                                styles.trendIndicator
                                                            }
                                                            style={{
                                                                color: getTrendColor(
                                                                    contest.trendDirection
                                                                ),
                                                            }}
                                                        >
                                                            {getTrendIcon(
                                                                contest.trendDirection
                                                            )}
                                                        </span>
                                                    </span>
                                                </div>

                                                <div
                                                    className={
                                                        styles.contestStat
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.statLabel
                                                        }
                                                    >
                                                        Rank:
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.statValue
                                                        }
                                                    >
                                                        #{contest.ranking}
                                                    </span>
                                                </div>

                                                <div
                                                    className={
                                                        styles.contestStat
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.statLabel
                                                        }
                                                    >
                                                        Solved:
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.statValue
                                                        }
                                                    >
                                                        {contest.problemsSolved}
                                                        /{contest.totalProblems}
                                                    </span>
                                                </div>

                                                <div
                                                    className={
                                                        styles.contestStat
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.statLabel
                                                        }
                                                    >
                                                        Time:
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.statValue
                                                        }
                                                    >
                                                        {Math.floor(
                                                            contest.finishTimeInSeconds /
                                                                60
                                                        )}
                                                        m{" "}
                                                        {contest.finishTimeInSeconds %
                                                            60}
                                                        s
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

            {leetcodeData.badges && leetcodeData.badges.length > 0 && (
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🏅</span>
                        Achievements & Badges
                    </h4>
                    <div className={styles.badgesGrid}>
                        {leetcodeData.badges.map((badge, index) => (
                            <div
                                key={badge.id || index}
                                className={styles.badgeCard}
                            >
                                <div className={styles.badgeIcon}>
                                    <img
                                        src={badge.icon}
                                        alt={badge.displayName}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                "https://assets.leetcode.com/static_assets/others/annual_badge.png";
                                        }}
                                    />
                                </div>
                                <div className={styles.badgeInfo}>
                                    <div className={styles.badgeName}>
                                        {badge.displayName}
                                    </div>
                                    <div className={styles.badgeDate}>
                                        {new Date(
                                            badge.creationDate
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {leetcodeData.recentSubmissions.length > 0 && (
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🔥</span>
                        Recent Submissions
                    </h4>
                    <div className={styles.submissionsContainer}>
                        <div className={styles.submissionsHeader}>
                            <div className={styles.submissionsInfo}>
                                <span className={styles.submissionsCount}>
                                    Recent{" "}
                                    {leetcodeData.recentSubmissions.length}{" "}
                                    submissions
                                </span>
                            </div>
                            <button
                                className={styles.expandButton}
                                onClick={() =>
                                    setShowAllSubmissions(!showAllSubmissions)
                                }
                            >
                                {showAllSubmissions ? "Show Less" : "Show 20"}
                                <span
                                    className={`${styles.expandIcon} ${
                                        showAllSubmissions
                                            ? styles.expanded
                                            : ""
                                    }`}
                                >
                                    ▼
                                </span>
                            </button>
                        </div>

                        <div className={styles.submissionsList}>
                            {leetcodeData.recentSubmissions
                                .slice(0, showAllSubmissions ? undefined : 3)
                                .map((submission, index) => (
                                    <div
                                        key={index}
                                        className={styles.submissionItem}
                                    >
                                        <div className={styles.submissionInfo}>
                                            <div
                                                className={
                                                    styles.submissionTitle
                                                }
                                            >
                                                {submission.title}
                                            </div>
                                            <div
                                                className={
                                                    styles.submissionMeta
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.submissionLang
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            getLanguageColor(
                                                                submission.lang
                                                            ),
                                                    }}
                                                >
                                                    {submission.lang}
                                                </span>
                                                <span
                                                    className={
                                                        styles.submissionDate
                                                    }
                                                >
                                                    {formatDate(
                                                        submission.timestamp
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`${
                                                styles.submissionStatus
                                            } ${
                                                submission.statusDisplay ===
                                                "Accepted"
                                                    ? styles.accepted
                                                    : styles.rejected
                                            }`}
                                        >
                                            {submission.statusDisplay}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeetCodeStats;
