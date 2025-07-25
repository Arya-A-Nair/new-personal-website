export interface PersonalInfo {
  name: string;
  tagline: string;
  profileImage: string;
  subtitle: string;
  education: string;
  socialLinks: {
    github: string;
    linkedin: string;
    leetcode: string;
    email: string;
    whatsapp: string;
    resume: string;
  };
  about: string[];
  technologies: string;
}

export interface ResumeItem {
  text: string;
  link: string;
  title: string;
}

export interface Project {
  title: string;
  img: string;
  description: string[];
  techStack: string[];
  link: string;
}

export interface Experience {
  companyName: string;
  position: string;
  techStack: string[];
  duration: string;
  workDone: string[];
}

export interface AchievementNote {
  id: string;
  title: string;
  preview: string;
  image: string;
  achievementTitle: string;
  content: string[];
  date: string;
  link?: string;
}

const personalInfo: PersonalInfo = {
  name: "Arya Nair",
  tagline: "I like to build software that solves real problems 🚀💻🎯",
  profileImage: "/images/profilePic.png",
  subtitle: "Software Developer",
  education: "B.Tech Information Technology",
  socialLinks: {
    github: "https://github.com/Arya-A-Nair",
    linkedin: "https://linkedin.com/in/arya-nair-2003",
    leetcode: "https://leetcode.com/u/aryaajitnair/",
    email: "mailto:aryaajitnair@gmail.com",
    whatsapp: "https://wa.me/919920646238",
    resume:
      "https://drive.google.com/file/d/1bhLfOFy87ukde8o6MoI6AC0gJmc6Nygp/view?usp=sharing",
  },
  about: [
    "I'm a passionate software engineer with expertise in full-stack development, blockchain technology, and AI/ML applications.",
    "I love building innovative solutions that solve real-world problems and have a proven track record of winning hackathons and delivering impactful projects.",
    "My experience spans across various technologies and I'm always eager to learn new technologies and tackle challenging problems.",
  ],
  technologies:
    "I work with a wide range of technologies including React, Node.js, Python, Go, Solidity, AWS, Docker, PostgreSQL, and many more. I'm particularly interested in blockchain technology, AI/ML applications, and building scalable web applications.",
};

const projects: Project[] = [
  {
    title: "Parity Protocol",
    img: "parity.png",
    description: [
      "A decentralized, verifiable compute execution network—think trustless AWS Lambda where anyone can contribute compute and earn rewards.",
      "Built with a modular Go-based architecture including runner, server, client, token, and wallet components.",
      "💡 Fully open-source and cloudless—compute remains off-chain, coordination and verification are on-chain.",
      "🏆 Winner of Prakalp 2025, the national-level working software competition.",
    ],
    techStack: ["Go", "Docker", "PostgreSQL", "ERC-20", "Ethereum", "Web3"],
    link: "https://blitlabs.xyz/",
  },
  {
    title: "ThreeDrive",
    img: "threedrive.jpeg",
    description: [
      "A decentralized Google Drive-like filesystem powered by the Walrus protocol.",
      "Provides intuitive nested folders, real-time collaboration, and SDK integration.",
      "🏅 Earned an Honorable Mention in the Walrus Protocol track at ETHIndia 2024.",
      "🏆 Won the Quadratic Voting prize pool share at ETHIndia 2024.",
    ],
    techStack: [
      "npm",
      "WebSockets",
      "Python",
      "Express.js",
      "FastAPI",
      "Node.js",
      "Next.js",
      "Walrus",
    ],
    link: "https://devfolio.co/projects/threedrive-0f13",
  },
  {
    title: "OpenFund",
    img: "openfund.png",
    description: [
      "Empowering open source innovation with crypto rewards—bridging contributions and incentives seamlessly through our AI driven GitHub bot.",
      "Built at Unfold 2024, it won “Best Agentic Project” from Nethermind plus 2 other prizes.",
      "Solves contributor burnout by incentivizing meaningful open source work via automated crypto rewards.",
    ],
    techStack: [
      "Express.js",
      "React.js",
      "Polygon (Matic)",
      "BASE",
      "okto",
      "BAML",
    ],
    link: "https://devfolio.co/projects/openfund-8ef2",
  },
  {
    title: "3-Transform",
    img: "3-transform.webp",
    description: [
      "This International hackathon winning project empowers beginners with hands-on learning for smart contract integration, and aids enterprises in efficient web3 adoption.",
      "This is the Winner project in EthIndia 2023, World's biggest Ethereum hackathon.",
      "It also won 3 track prizes in EthIndia 2023, namely Filecoin, Okto and Scroll.",
    ],
    techStack: ["React", "Solidity", "Firebase", "Polygon"],
    link: "https://devfolio.co/projects/transform-014b",
  },
  {
    title: "Dhanush",
    img: "dhanush.png",
    description: [
      "Developed a fund trail analysis tool for detecting cyber crime and won Kavach 2023 and the project is now going to be integrated into current systems by the government of India.",
      "This is Kavach national Government hackathon 2023 winner project.",
    ],
    techStack: ["React", "Django", "Express", "MongoDB"],
    link: "https://www.youtube.com/watch?v=PQmar1DG5eI",
  },
  {
    title: "Three Bricks",
    img: "threeBricks.png",
    description: [
      "Streamlined property transactions using Polygon and NFTs, enhancing transparency, security, and ownership transfers while leveraging blockchain technology and Polygon's scalability to reduce intermediaries and enable direct ownership through NFTs.",
    ],
    techStack: ["React", "Solidity", "Firebase", "Polygon"],
    link: "https://github.com/team-somehow/3-bricks",
  },
  {
    title: "Pointer Aid",
    img: "pointerAid.jpeg",
    description: [
      "Empowering students with efficient studying by estimating required marks for desired pointers, optimizing academic performance.",
      "Popular app with 10K+ views and 1.2K+ active users, enhancing student learning experience and addressing study needs effectively.",
    ],
    techStack: ["React"],
    link: "https://pointer-aid.pettiboy.com/",
  },
  {
    title: "Three Money",
    img: "threeMoney.jpeg",
    description: [
      "Building a fair credit score system for decentralized bank, reducing loan default risk and promoting financial inclusion, and creating a transparent and unbiased evaluation mechanism for fair loan access.",
    ],
    techStack: ["React", "Solidity", "Firebase", "Polygon"],
    link: "https://github.com/team-somehow/three-money",
  },
  {
    title: "Any Kode",
    img: "anyKode.png",
    description: [
      "Empowering developers with in-app code debugging and testing, and offering a diverse range of coding problems and a customizable keyboard for an enhanced coding experience",
    ],
    techStack: ["React Native"],
    link: "https://github.com/team-somehow/code-somehow",
  },
  {
    title: "Three Chain",
    img: "threeChain.jpeg",
    description: [
      "Ensures secure goods transfer, transparent logistics, and efficient inventory management through escrow service, ERC721 tokens, and Aadhar QR KYC verification.",
    ],
    techStack: ["Solidity", "React", "Firebase"],
    link: "https://github.com/team-somehow/three-chain",
  },
  {
    title: "Placement Predictor",
    img: "placementPredictor.jpeg",
    description: [
      "Developed an accurate placement prediction model and integrated it into a Flask app for seamless input and predictions.",
    ],
    techStack: ["Python", "Flask", "Scikit-learn"],
    link: "https://github.com/Arya-A-Nair/PlacementPredictor",
  },
  {
    title: "Mail Project",
    img: "mailProject.jpeg",
    description: [
      "Developed an internal mailing system with Django+React, providing comprehensive email management features for seamless communication",
    ],
    techStack: ["React", "Django"],
    link: "https://github.com/Arya-A-Nair/MAIL-PROJECT",
  },
  {
    title: "Team Manager",
    img: "teamManager.jpeg",
    description: [
      "Developed a full-stack team management app with unique team codes, facilitating seamless task assignment and prioritization for enhanced collaboration.",
    ],
    techStack: ["React", "Django"],
    link: "https://github.com/Arya-A-Nair/Team-Manager",
  },
];

const experience: Experience[] = [
  {
    companyName: "Edra Labs",
    position: "Software Engineer Intern",
    techStack: [
      "Prefect",
      "Python",
      "Phoenix Framework",
      "LLMs",
      "Browser Automation",
    ],
    duration: "Jan 2025 - July 2025",
    workDone: [
      "Reduced manual labor by 40% by developing AI agents that automate repetitive business tasks",
      "Automated 300+ daily tasks via browser automation using AI agents, removing manual input",
      "Centralized LLM evaluation and Prefect orchestration, reducing execution time by 50% and error rate by 30%",
    ],
  },
  {
    companyName: "Isosceles AI",
    position: "Software Development Engineer",
    techStack: ["Next.js", "Python", "RAG"],
    duration: "Oct 2024 - Dec 2024",
    workDone: [
      "Automated 70% of manual processes by designing AI-driven workflows for business operations",
      "Increased customer engagement by 25% by integrating AI-powered solutions to enhance user interaction",
      "Boosted revenue and onboarded major clients by implementing scalable AI-driven business features",
    ],
  },
  {
    companyName: "JPMorgan Chase",
    position: "Software Development Engineering Intern",
    techStack: ["Terraform", "AWS Lambda", "Python"],
    duration: "Jun 2024 - Aug 2024",
    workDone: [
      "Enhanced cloud scalability by deploying Infrastructure-as-Code (IaC) solutions using Terraform",
      "Reduced cloud costs by 30% by optimizing AWS Lambda functions for better resource efficiency",
      "Increased system throughput by 77% by implementing multithreading and improving concurrency",
    ],
  },
  {
    companyName: "Metis",
    position: "Software Engineer",
    techStack: ["React", "Node", "Express", "GraphQL"],
    duration: "Dec 2023 - Mar 2024",
    workDone: [
      "Led the development of a comprehensive student management platform tailored for study-abroad consultancy services",
      "Designed and implemented key modules for student onboarding, document tracking, and progress reporting",
      "Ensured seamless integration with third-party APIs for application status updates and notifications",
    ],
  },
  {
    companyName: "CodeCell",
    position: "Committee Head",
    techStack: [
      "React",
      "Python",
      "SCSS",
      "React Native",
      "Node",
      "Solidity",
      "Firebase",
      "MongoDB",
      "Express",
    ],
    duration: "Jan 2022 - June 2024",
    workDone: [
      "Responsible for efficiently maintaining and improving legacy code repositories",
      "Organized engaging workshops on competitive programming and web development, empowering students with valuable tech skills",
      "Developed a robust participant tracking app for a hackathon, ensuring smooth event management",
    ],
  },
  {
    companyName: "UNL",
    position: "SDE Intern",
    techStack: ["Node", "NestJs", "Rust"],
    duration: "June 2023 - Sep 2023",
    workDone: [
      "Streamlined code efficiency by implementing a conversion process from NestJs to Rust, harnessing Rust's inherent advantages to significantly enhance performance and optimize resource utilization.",
      "Strategically managed and fine-tuned routing algorithms through in-depth analysis, resulting in notable speed enhancements and improved overall efficiency of the system.",
    ],
  },
  {
    companyName: "Tactic",
    position: "Frontend Developer",
    techStack: ["React Native", "Node", "Express"],
    duration: "March 2023 - Aug 2023",
    workDone: [
      "Led frontend development of the Tactic trading app, implementing innovative features for an exceptional user experience",
      "Proficient in MERN stack and React Native, building robust, high-performance applications",
      "Deployed Tactic on Google Playstore, enabling seamless updates and gaining valuable insights through Mixpanel integration",
    ],
  },
];

const achievementNotes: AchievementNote[] = [
  {
    id: "achievement-1",
    title: "ETHIndia 2023 Winner",
    preview: "Winner of ETHIndia 2023 + 3 track prizes",
    image: "ethindia-2023.jpeg",
    achievementTitle: "ETHIndia 2023 - 3Transform",
    content: [
      "Empowers beginners with hands-on smart contract integration.",
      "Helps enterprises adopt Web3 efficiently.",
      "🏆 Winner of ETHIndia 2023, the world's biggest Ethereum hackathon.",
      "🏅 Won 3 track prizes - Filecoin, Okto, and Scroll.",
    ],
    date: "December 2023",
    link: "https://devfolio.co/projects/transform-014b",
  },
  {
    id: "achievement-2",
    title: "Kavach 2023 Winner",
    preview: "Government integration of crime detection tool",
    image: "kavach-2023.jpeg",
    achievementTitle: "Kavach 2023 - FundTrail",
    content: [
      "Developed a fund trail analysis tool to detect cybercrime.",
      "Winner of Kavach 2023, a national-level government hackathon.",
      "Project selected for integration into current government systems.",
    ],
    date: "August 2023",
    link: "https://www.youtube.com/watch?v=PQmar1DG5eI",
  },
  {
    id: "achievement-3",
    title: "ETHIndia 2024 Honoree",
    preview: "Quadratic prize winner + Honorable mention",
    image: "ethindia-2024.jpeg",
    achievementTitle: "ETHIndia 2024 - ThreeDrive",
    content: [
      "A decentralized Google Drive-like filesystem powered by the Walrus protocol.",
      "Provides intuitive nested folders, real-time collaboration, and SDK integration.",
      "🏅 Honorable Mention in Walrus Protocol track.",
      "🏆 Won share of Quadratic Voting prize pool.",
    ],
    date: "December 2024",
    link: "https://devfolio.co/projects/threedrive-0f13",
  },
  {
    id: "achievement-4",
    title: "Unfold 2024 - Best Agentic Project",
    preview: "Crypto-reward GitHub bot wins 3 prizes",
    image: "unfold-2024.jpeg",
    achievementTitle: "Unfold 2024 - OpenFund",
    content: [
      "Empowering open source innovation with crypto rewards.",
      "AI-driven GitHub bot bridges contributions and incentives.",
      "🏅 Won 'Best Agentic Project' from Nethermind and 2 other prizes.",
      "Tackles contributor burnout with automated crypto rewards.",
    ],
    date: "December 2024",
    link: "https://devfolio.co/projects/openfund-8ef2",
  },
  {
    id: "achievement-5",
    title: "Prakalp 2025 Winner",
    preview: "Best software project for Parity Protocol",
    image: "prakalp-2025.jpeg",
    achievementTitle: "Prakalp 2025 - Parity Protocol",
    content: [
      "National-level project presentation competition.",
      "Won best software project for presenting Parity Protocol - an open-source decentralized compute platform.",
    ],
    date: "April 2025",
  },
  {
    id: "achievement-6",
    title: "JPMC Secure Code Warrior - 2nd Place",
    preview: "Ranked 2nd among interns across India & Singapore",
    image: "jpmc-2024.png",
    achievementTitle: "Secure Code Warrior 2024",
    content: [
      "Internal CTF-style cybersecurity contest by JPMC.",
      "Involved solving real-world hacking challenges and quizzes.",
      "🏅 Secured 2nd place across all interns in India + Singapore.",
    ],
    date: "July 2024",
  },
  {
    id: "achievement-7",
    title: "Hackerstellar Blockchain 2023 Winner",
    preview: "Escrow + logistics dApp with KYC verification",
    image: "hackerstellar-2023.jpeg",
    achievementTitle: "Hackerstellar - ThreeChain",
    content: [
      "Secured goods transfer with ERC721 tokens and escrow service.",
      "Integrated logistics transparency and Aadhaar QR-based KYC.",
    ],
    date: "April 2023",
    link: "https://devfolio.co/projects/three-chain-97b3",
  },
  {
    id: "achievement-8",
    title: "BitnBuild 2023 Winner",
    preview: "Tokenized real estate using Polygon",
    image: "bitnbuild-2023.jpeg",
    achievementTitle: "BitnBuild - Bricks",
    content: [
      "Streamlined property transactions using NFTs on Polygon.",
      "Improved transparency and security with blockchain tech.",
    ],
    date: "January 2023",
    link: "https://devfolio.co/projects/bricks-731e",
  },
  {
    id: "achievement-9",
    title: "X-Tract Datathon - 3rd Place",
    preview: "Ranked 3rd in ML + data cleaning competition",
    image: "xtract-2022.jpeg",
    achievementTitle: "X-Tract 2022 Datathon",
    content: [
      "Solved end-to-end challenges using data cleaning & ML models.",
      "Ranked 3rd overall by solving full trail with accurate predictions.",
    ],
    date: "March 2022",
  },
  {
    id: "achievement-10",
    title: "Bid by Bit 2022 Champion",
    preview: "DSA-based gamified contest win",
    image: "",
    achievementTitle: "Bid by Bit 2022",
    content: [
      "State-level competitive programming contest.",
      "Used DSA to earn points and unlock new problem sets.",
    ],
    date: "November 2022",
  },
];

export { personalInfo, projects, experience, achievementNotes };
