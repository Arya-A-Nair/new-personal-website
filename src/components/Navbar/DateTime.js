import React, { useEffect, useState } from "react";

const DateTime = () => {
    const [day, setDay] = useState("Monday");
    const [month, setMonth] = useState("January");
    const [date, setDate] = useState(1);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    useEffect(() => {
        setInterval(() => {
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
    }, []);

    return (
        <div>
            {day.slice(0, 3)} {month.slice(0,3)} {date} {hour > 12 ? hour - 12 : hour}:
            {minute<10?`0${minute}`:minute} {hour > 12 ? "PM" : "AM"}
        </div>
    );
};

export default DateTime;
