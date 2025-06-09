import React from "react";

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

const ReactOptimizationNote = () => (
    <div>
        <p>
            React performance optimization involves several key strategies that
            can significantly improve your application's speed and user
            experience.
        </p>
        <h4>Key Techniques:</h4>
        <ul>
            <li>
                <strong>React.memo</strong> for component memoization
            </li>
            <li>
                <strong>Lazy loading</strong> with Suspense
            </li>
            <li>
                <strong>Bundle optimization</strong> with code splitting
            </li>
        </ul>
        <p>
            Consider using useMemo and useCallback hooks for expensive
            calculations and function references to prevent unnecessary
            re-renders.
        </p>
        <div
            style={{
                background: "#2a2a2a",
                padding: "12px",
                borderRadius: "8px",
                margin: "16px 0",
            }}
        >
            <code style={{ color: "#ff6b6b" }}>
                {`const MemoizedComponent = React.memo(MyComponent);`}
            </code>
        </div>
    </div>
);

const TypeScriptBestPracticesNote = () => (
    <div>
        <p>
            TypeScript provides excellent type safety and developer experience
            when used correctly with proper patterns and practices.
        </p>
        <h4>Essential Practices:</h4>
        <ul>
            <li>Always define interfaces for your data structures</li>
            <li>Use union types for flexibility</li>
            <li>Leverage generic types for reusable components</li>
            <li>Implement strict mode configuration</li>
        </ul>
        <div
            style={{
                background: "#2a2a2a",
                padding: "12px",
                borderRadius: "8px",
                margin: "16px 0",
            }}
        >
            <code style={{ color: "#4fc3f7" }}>
                {`interface User {\n  id: string;\n  name: string;\n  email?: string;\n}`}
            </code>
        </div>
        <p>
            Use proper utility types like Partial, Pick, and Omit for better
            type manipulation.
        </p>
    </div>
);

const DynamicProgrammingNote = () => (
    <div>
        <p>
            Dynamic Programming is a powerful technique for solving optimization
            problems by breaking them down into overlapping subproblems.
        </p>
        <h4>Core Concepts:</h4>
        <ul>
            <li>
                <strong>Optimal Substructure:</strong> Optimal solution can be
                constructed from optimal solutions of subproblems
            </li>
            <li>
                <strong>Overlapping Subproblems:</strong> Same subproblems are
                solved multiple times
            </li>
        </ul>
        <h4>Approaches:</h4>
        <ol>
            <li>
                <strong>Memoization (Top-Down):</strong> Store results of
                subproblems
            </li>
            <li>
                <strong>Tabulation (Bottom-Up):</strong> Build solution
                iteratively
            </li>
        </ol>
        <div
            style={{
                background: "#2a2a2a",
                padding: "12px",
                borderRadius: "8px",
                margin: "16px 0",
            }}
        >
            <code style={{ color: "#81c784" }}>
                {`// Fibonacci with memoization\nconst fib = (n, memo = {}) => {\n  if (n in memo) return memo[n];\n  if (n <= 2) return 1;\n  memo[n] = fib(n-1, memo) + fib(n-2, memo);\n  return memo[n];\n}`}
            </code>
        </div>
    </div>
);

const StudentPlatformNote = () => (
    <div>
        <p>
            Successfully led the development of a comprehensive student
            management platform that revolutionized administrative processes.
        </p>
        <h4>Key Achievements:</h4>
        <ul>
            <li>
                🚀 <strong>40% reduction</strong> in manual labor through AI
                automation
            </li>
            <li>
                👥 <strong>300+ daily users</strong> actively using the platform
            </li>
            <li>📊 Streamlined document tracking and progress reporting</li>
            <li>🤖 Implemented AI agents for repetitive tasks</li>
        </ul>
        <h4>Technology Stack:</h4>
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                margin: "12px 0",
            }}
        >
            {["React", "Node.js", "Express", "AI Agents", "Automation"].map(
                (tech) => (
                    <span
                        key={tech}
                        style={{
                            background: "#007aff",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                        }}
                    >
                        {tech}
                    </span>
                )
            )}
        </div>
        <p>
            This platform now serves as a critical tool for study-abroad
            consultancy services, enabling efficient management of student
            onboarding and progress tracking.
        </p>
    </div>
);

export const notesData: NotesData = {
    Dev: [
        {
            id: "dev-1",
            title: "React Performance Optimization",
            date: "Dec 15, 2024",
            preview:
                "Key strategies for optimizing React applications including memoization, lazy loading, and bundle optimization.",
            content: <ReactOptimizationNote />,
        },
        {
            id: "dev-2",
            title: "TypeScript Best Practices",
            date: "Dec 10, 2024",
            preview:
                "Essential TypeScript patterns and practices for building robust and maintainable applications.",
            content: <TypeScriptBestPracticesNote />,
        },
        {
            id: "dev-3",
            title: "Modern CSS Architecture",
            date: "Dec 5, 2024",
            preview:
                "Exploring CSS modules, styled-components, and modern layout techniques for scalable styling.",
            content: (
                <div>
                    <p>
                        Modern CSS architecture focuses on maintainability,
                        scalability, and performance using contemporary tools
                        and methodologies.
                    </p>
                    <p>
                        CSS modules provide scoped styling, while CSS-in-JS
                        solutions like styled-components offer dynamic styling
                        capabilities.
                    </p>
                    <p>
                        Utilize CSS Grid and Flexbox for complex layouts, and
                        implement CSS custom properties for theme management and
                        design tokens.
                    </p>
                </div>
            ),
        },
        {
            id: "dev-4",
            title: "API Design Principles",
            date: "Nov 28, 2024",
            preview:
                "RESTful API design patterns, GraphQL implementation, and best practices for backend development.",
            content: (
                <div>
                    <p>
                        Good API design is crucial for building scalable and
                        maintainable applications that can evolve with changing
                        requirements.
                    </p>
                    <p>
                        Follow RESTful principles for resource-based APIs,
                        implement proper HTTP status codes, and ensure
                        consistent naming conventions.
                    </p>
                    <p>
                        Consider GraphQL for complex data requirements and
                        implement proper error handling, authentication, and
                        rate limiting.
                    </p>
                </div>
            ),
        },
    ],
    DSA: [
        {
            id: "dsa-1",
            title: "Dynamic Programming Mastery",
            date: "Dec 12, 2024",
            preview:
                "Understanding memoization, tabulation, and solving complex optimization problems with dynamic programming.",
            content: <DynamicProgrammingNote />,
        },
        {
            id: "dsa-2",
            title: "Graph Algorithms Deep Dive",
            date: "Dec 8, 2024",
            preview:
                "BFS, DFS, shortest path algorithms, and advanced graph traversal techniques for competitive programming.",
            content: (
                <div>
                    <p>
                        Graph algorithms form the backbone of many complex
                        problems in computer science and competitive programming
                        challenges.
                    </p>
                    <p>
                        Master BFS and DFS for traversal, implement Dijkstra's
                        and Floyd-Warshall for shortest paths, and understand
                        topological sorting.
                    </p>
                    <p>
                        Practice problems involving minimum spanning trees,
                        strongly connected components, and bipartite graph
                        detection.
                    </p>
                </div>
            ),
        },
        {
            id: "dsa-3",
            title: "Binary Search Variations",
            date: "Dec 3, 2024",
            preview:
                "Advanced binary search techniques including search in rotated arrays and finding optimal solutions.",
            content: (
                <div>
                    <p>
                        Binary search is not just for finding elements in sorted
                        arrays - it's a powerful technique for optimization
                        problems.
                    </p>
                    <p>
                        Learn to apply binary search to find the first/last
                        occurrence, search in rotated arrays, and solve
                        optimization problems.
                    </p>
                    <p>
                        Practice binary search on answer patterns where you
                        search for the optimal value that satisfies given
                        constraints.
                    </p>
                </div>
            ),
        },
        {
            id: "dsa-4",
            title: "String Processing Algorithms",
            date: "Nov 25, 2024",
            preview:
                "Pattern matching, string manipulation, and advanced string algorithms for efficient text processing.",
            content: (
                <div>
                    <p>
                        String algorithms are essential for text processing,
                        pattern matching, and many real-world applications in
                        software development.
                    </p>
                    <p>
                        Master KMP algorithm for pattern matching, understand
                        rolling hash for substring problems, and learn trie data
                        structure.
                    </p>
                    <p>
                        Practice problems involving palindromes, anagrams, and
                        substring matching to build strong string manipulation
                        skills.
                    </p>
                </div>
            ),
        },
    ],
    Achievements: [
        {
            id: "ach-1",
            title: "Student Management Platform",
            date: "Mar 2024",
            preview:
                "Led development of comprehensive platform reducing manual labor by 40% using AI agents and automation.",
            content: <StudentPlatformNote />,
        },
        {
            id: "ach-2",
            title: "LeetCode Problem Solving",
            date: "Ongoing",
            preview:
                "Solved 500+ competitive programming problems across various difficulty levels and algorithm categories.",
            content: (
                <div>
                    <p>
                        Achieved a milestone of solving over 500 LeetCode
                        problems, demonstrating strong algorithmic thinking and
                        problem-solving skills.
                    </p>
                    <p>
                        Consistently maintained a high acceptance rate across
                        different problem categories including arrays, trees,
                        graphs, and dynamic programming.
                    </p>
                    <p>
                        Regularly participate in weekly contests and have
                        achieved top 10% rankings in multiple competitive
                        programming competitions.
                    </p>
                </div>
            ),
        },
        {
            id: "ach-3",
            title: "Open Source Contributions",
            date: "2024",
            preview:
                "Active contributor to multiple open source projects with focus on React ecosystem and developer tools.",
            content: (
                <div>
                    <p>
                        Made significant contributions to several open source
                        projects, focusing primarily on React ecosystem and
                        developer tooling improvements.
                    </p>
                    <p>
                        Contributed bug fixes, feature enhancements, and
                        documentation improvements to libraries used by
                        thousands of developers worldwide.
                    </p>
                    <p>
                        Maintained high code quality standards and collaborated
                        effectively with international development teams across
                        different time zones.
                    </p>
                </div>
            ),
        },
        {
            id: "ach-4",
            title: "Technical Mentorship",
            date: "2024",
            preview:
                "Mentored junior developers and students in web development, algorithms, and career guidance.",
            content: (
                <div>
                    <p>
                        Provided technical mentorship to over 50 junior
                        developers and students, helping them navigate their
                        programming journey.
                    </p>
                    <p>
                        Conducted workshops on modern web development practices,
                        algorithm problem-solving techniques, and industry best
                        practices.
                    </p>
                    <p>
                        Established a structured mentorship program that has
                        resulted in 90% of mentees securing internships or
                        full-time positions.
                    </p>
                </div>
            ),
        },
    ],
};
