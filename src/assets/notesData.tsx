import React from "react";
import { WakatimeStats } from "../components/NoteComponents";

export interface Note {
    id: string;
    title: string;
    date: string;
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
            date: "Dec 15, 2024",
            preview:
                "Real-time coding statistics from Wakatime showing daily activity, total hours, and productivity metrics.",
            content: <WakatimeStats />,
        },
    ],
    DSA: [],
    Achievements: [],
};
