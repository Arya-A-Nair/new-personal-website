import React, { useEffect, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

const DateTime: React.FC = () => {
  const [day, setDay] = useState<string>("Monday");
  const [month, setMonth] = useState<string>("January");
  const [date, setDate] = useState<number>(1);
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const isMobile = useIsMobile(600);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const dayOfMonth = date.getDate();
      setMonth(date.toLocaleString("default", { month: "long" }));
      setDay(date.toLocaleString("default", { weekday: "long" }));
      setDate(dayOfMonth);
      setHour(hours);
      setMinute(minutes);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const displayMinute = minute < 10 ? `0${minute}` : minute;
    const period = hour >= 12 ? "PM" : "AM";
    return `${displayHour}:${displayMinute} ${period}`;
  };

  return (
    <div
      style={{
        fontSize: isMobile ? "0.8rem" : "0.875rem",
        fontWeight: isMobile ? "500" : "400",
        textAlign: "center",
      }}
    >
      {!isMobile && `${day.slice(0, 3)} ${month.slice(0, 3)} ${date} `}
      {formatTime()}
    </div>
  );
};

export default DateTime;
