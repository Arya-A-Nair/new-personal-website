import React from "react";
import {
    WakatimeStats,
    GitHubStats,
    LeetCodeStats,
} from "../components/NoteComponents";

export interface Note {
    id: string;
    title: string;
    date?: string;
    preview: string;
    content: React.ReactNode;
    image?: string;
}

export interface NotesData {
    [section: string]: Note[];
}

export const notesData: NotesData = {
    Dev: [
        {
            id: "dev-1",
            title: "Wakatime Coding Stats",
            preview:
                "Real-time coding statistics from Wakatime showing daily activity, total hours, and productivity metrics.",
            content: <WakatimeStats />,
        },
        {
            id: "dev-2",
            title: "GitHub Development Profile",
            preview:
                "Comprehensive GitHub statistics showcasing coding activity, language usage, and open source contributions.",
            content: <GitHubStats />,
        },
    ],
    DSA: [
        {
            id: "dsa-1",
            title: "LeetCode Problem Solving Stats",
            preview:
                "Comprehensive LeetCode statistics showing problem-solving progress, contest performance, and submission activity with beautiful visualizations.",
            content: <LeetCodeStats />,
        },
    ],
    Achievements: [],
};
