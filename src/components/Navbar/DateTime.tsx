import React, { useEffect, useState } from "react";

const DateTime: React.FC = () => {
    const [day, setDay] = useState<string>("Monday");
    const [month, setMonth] = useState<string>("January");
    const [date, setDate] = useState<number>(1);
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600) {
                setIsMobile(false);
            } else {
                setIsMobile(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    return (
        <div>
            {!isMobile && `${day.slice(0, 3)} ${month.slice(0, 3)} ${date} `}
            {hour > 12 ? hour - 12 : hour}:{minute < 10 ? `0${minute}` : minute}{" "}
            {hour > 12 ? "PM" : "AM"}
        </div>
    );
};

export default DateTime;
