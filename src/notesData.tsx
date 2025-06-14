import React from "react";
import {
  WakatimeStats,
  GitHubStats,
  LeetCodeStats,
} from "./components/NoteComponents";
import Achievement from "./components/NoteComponents/Achievement";

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
  Achievements: [
    {
      id: "achievement-1",
      title: "ETHIndia 2023 Winner",
      preview: "Winner of ETHIndia 2023 + 3 track prizes",
      content: (
        <Achievement
          image="ethindia-2023.jpeg"
          title="ETHIndia 2023 - 3Transform"
          content={[
            "Empowers beginners with hands-on smart contract integration.",
            "Helps enterprises adopt Web3 efficiently.",
            "🏆 Winner of ETHIndia 2023, the world's biggest Ethereum hackathon.",
            "🏅 Won 3 track prizes - Filecoin, Okto, and Scroll.",
          ]}
          date="December 2023"
          link="https://devfolio.co/projects/transform-014b"
        />
      ),
    },
    {
      id: "achievement-2",
      title: "Kavach 2023 Winner",
      preview: "Government integration of crime detection tool",
      content: (
        <Achievement
          image="kavach-2023.jpeg"
          title="Kavach 2023 - FundTrail"
          content={[
            "Developed a fund trail analysis tool to detect cybercrime.",
            "Winner of Kavach 2023, a national-level government hackathon.",
            "Project selected for integration into current government systems.",
          ]}
          date="August 2023"
          link="https://www.youtube.com/watch?v=PQmar1DG5eI"
        />
      ),
    },
    {
      id: "achievement-3",
      title: "ETHIndia 2024 Honoree",
      preview: "Quadratic prize winner + Honorable mention",
      content: (
        <Achievement
          image="ethindia-2024.jpeg"
          title="ETHIndia 2024 - ThreeDrive"
          content={[
            "A decentralized Google Drive-like filesystem powered by the Walrus protocol.",
            "Provides intuitive nested folders, real-time collaboration, and SDK integration.",
            "🏅 Honorable Mention in Walrus Protocol track.",
            "🏆 Won share of Quadratic Voting prize pool.",
          ]}
          date="December 2024"
          link="https://devfolio.co/projects/threedrive-0f13"
        />
      ),
    },
    {
      id: "achievement-4",
      title: "Unfold 2024 - Best Agentic Project",
      preview: "Crypto-reward GitHub bot wins 3 prizes",
      content: (
        <Achievement
          image="unfold-2024.jpeg"
          title="Unfold 2024 - OpenFund"
          content={[
            "Empowering open source innovation with crypto rewards.",
            "AI-driven GitHub bot bridges contributions and incentives.",
            "🏅 Won 'Best Agentic Project' from Nethermind and 2 other prizes.",
            "Tackles contributor burnout with automated crypto rewards.",
          ]}
          date="December 2024"
          link="https://devfolio.co/projects/openfund-8ef2"
        />
      ),
    },
    {
      id: "achievement-5",
      title: "Prakalp 2025 Winner",
      preview: "Best software project for Parity Protocol",
      content: (
        <Achievement
          image="prakalp-2025.jpeg"
          title="Prakalp 2025 - Parity Protocol"
          content={[
            "National-level project presentation competition.",
            "Won best software project for presenting Parity Protocol - an open-source decentralized compute platform.",
          ]}
          date="April 2025"
          link=""
        />
      ),
    },
    {
      id: "achievement-6",
      title: "JPMC Secure Code Warrior - 2nd Place",
      preview: "Ranked 2nd among interns across India & Singapore",
      content: (
        <Achievement
          image="jpmc-2024.png"
          title="Secure Code Warrior 2024"
          content={[
            "Internal CTF-style cybersecurity contest by JPMC.",
            "Involved solving real-world hacking challenges and quizzes.",
            "🏅 Secured 2nd place across all interns in India + Singapore.",
          ]}
          date="July 2024"
          link=""
        />
      ),
    },
    {
      id: "achievement-7",
      title: "Hackerstellar Blockchain 2023 Winner",
      preview: "Escrow + logistics dApp with KYC verification",
      content: (
        <Achievement
          image="hackerstellar-2023.jpeg"
          title="Hackerstellar - ThreeChain"
          content={[
            "Secured goods transfer with ERC721 tokens and escrow service.",
            "Integrated logistics transparency and Aadhaar QR-based KYC.",
          ]}
          date="April 2023"
          link="https://devfolio.co/projects/three-chain-97b3"
        />
      ),
    },
    {
      id: "achievement-8",
      title: "BitnBuild 2023 Winner",
      preview: "Tokenized real estate using Polygon",
      content: (
        <Achievement
          image="bitnbuild-2023.jpeg"
          title="BitnBuild - Bricks"
          content={[
            "Streamlined property transactions using NFTs on Polygon.",
            "Improved transparency and security with blockchain tech.",
          ]}
          date="January 2023"
          link="https://devfolio.co/projects/bricks-731e"
        />
      ),
    },
    {
      id: "achievement-9",
      title: "X-Tract Datathon - 3rd Place",
      preview: "Ranked 3rd in ML + data cleaning competition",
      content: (
        <Achievement
          image="xtract-2022.jpeg"
          title="X-Tract 2022 Datathon"
          content={[
            "Solved end-to-end challenges using data cleaning & ML models.",
            "Ranked 3rd overall by solving full trail with accurate predictions.",
          ]}
          date="March 2022"
        />
      ),
    },
    {
      id: "achievement-10",
      title: "Bid by Bit 2022 Champion",
      preview: "DSA-based gamified contest win",
      content: (
        <Achievement
          title="Bid by Bit 2022"
          content={[
            "State-level competitive programming contest.",
            "Used DSA to earn points and unlock new problem sets.",
          ]}
          date="November 2022"
        />
      ),
    },
  ],
};
