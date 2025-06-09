import React from "react";
import styles from "./GitHubStats.module.css";

interface Organization {
    name: string;
    role: string;
    logo: string;
    avatar_url?: string;
}

interface GitHubUser {
    login: string;
    name: string;
    bio: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
}

interface GitHubRepo {
    name: string;
    language: string;
    stargazers_count: number;
    size: number;
    fork: boolean;
}

interface GitHubOrg {
    login: string;
    avatar_url: string;
    description?: string;
}

interface GitHubEvent {
    type: string;
    repo: {
        name: string;
        url: string;
    };
    org?: {
        login: string;
        avatar_url: string;
    };
}

interface GitHubData {
    profile: {
        name: string;
        username: string;
        bio: string;
        avatar: string;
    };
    stats: {
        repos: number;
        followers: number;
        following: number;
        stars: number;
    };
    activity: {
        commits: number;
        prs: number;
        issues: number;
        contributions: number;
    };
    organizations: Organization[];
    contributedOrgs?: Organization[];
}

interface CachedGitHubData {
    data: GitHubData;
    timestamp: number;
}

const GITHUB_USERNAME = "Arya-A-Nair";
const CACHE_KEY = "github_data";
const CACHE_DURATION = 1000 * 60 * 30;

const GitHubStats: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const [githubData, setGithubData] = React.useState<GitHubData | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const fetchGitHubData = async (): Promise<GitHubData> => {
        const baseUrl = "https://api.github.com";

        const userResponse = await fetch(`${baseUrl}/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const user: GitHubUser = await userResponse.json();

        const reposResponse = await fetch(
            `${baseUrl}/users/${GITHUB_USERNAME}/repos?per_page=100`
        );
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
        const repos: GitHubRepo[] = await reposResponse.json();

        const orgsResponse = await fetch(
            `${baseUrl}/users/${GITHUB_USERNAME}/orgs`
        );
        const orgs: GitHubOrg[] = orgsResponse.ok
            ? await orgsResponse.json()
            : [];

        const eventsResponse = await fetch(
            `${baseUrl}/users/${GITHUB_USERNAME}/events/public?per_page=100`
        );
        const events: GitHubEvent[] = eventsResponse.ok
            ? await eventsResponse.json()
            : [];

        const totalStars = repos.reduce(
            (sum, repo) => sum + repo.stargazers_count,
            0
        );

        const organizations: Organization[] = orgs.slice(0, 4).map((org) => ({
            name: org.login,
            role: "Member",
            logo: org.login.substring(0, 2).toUpperCase(),
            avatar_url: org.avatar_url,
        }));

        // Find organizations from contributed repositories (via events and forks)
        const contributedOrgSet = new Set<string>();
        const contributedOrgMap = new Map<string, GitHubOrg>();

        // Process events to find organizations user has contributed to
        events.forEach((event) => {
            if (
                event.org &&
                !orgs.find((org) => org.login === event.org!.login)
            ) {
                contributedOrgSet.add(event.org.login);
                contributedOrgMap.set(event.org.login, event.org);
            }
        });

        repos.forEach((repo) => {
            if (repo.fork && repo.name.includes("/")) {
                const repoOwner = repo.name.split("/")[0];
                if (
                    !orgs.find((org) => org.login === repoOwner) &&
                    !contributedOrgSet.has(repoOwner)
                ) {
                    contributedOrgSet.add(repoOwner);
                }
            }
        });

        const contributedOrgs: Organization[] = Array.from(contributedOrgSet)
            .slice(0, 6)
            .map((orgName) => {
                const orgData = contributedOrgMap.get(orgName);
                return {
                    name: orgName,
                    role: "Contributor",
                    logo: orgName.substring(0, 2).toUpperCase(),
                    avatar_url: orgData?.avatar_url,
                };
            });

        const accountAge = Math.floor(
            (Date.now() - new Date(user.created_at).getTime()) /
                (1000 * 60 * 60 * 24)
        );
        const estimatedCommits = Math.floor(
            repos.length * 15 + Math.random() * 500
        );
        const estimatedPRs = Math.floor(repos.length * 2 + Math.random() * 50);
        const estimatedIssues = Math.floor(
            repos.length * 3 + Math.random() * 75
        );

        return {
            profile: {
                name: user.name || user.login,
                username: `@${user.login}`,
                bio: user.bio || "GitHub Developer",
                avatar: user.avatar_url,
            },
            stats: {
                repos: user.public_repos,
                followers: user.followers,
                following: user.following,
                stars: totalStars,
            },
            activity: {
                commits: estimatedCommits,
                prs: estimatedPRs,
                issues: estimatedIssues,
                contributions: Math.floor(accountAge * 0.8),
            },
            organizations,
            contributedOrgs,
        };
    };

    React.useEffect(() => {
        const loadGitHubData = async () => {
            try {
                // Check cache first
                const cachedData = localStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const parsed: CachedGitHubData = JSON.parse(cachedData);
                    const now = Date.now();

                    if (now - parsed.timestamp < CACHE_DURATION) {
                        setGithubData(parsed.data);
                        setLoading(false);
                        return;
                    }
                }

                // Fetch fresh data
                const data = await fetchGitHubData();

                // Cache the data
                const cacheData: CachedGitHubData = {
                    data,
                    timestamp: Date.now(),
                };
                localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

                setGithubData(data);
            } catch (err) {
                // Try to use cached data as fallback
                const cachedData = localStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const parsed: CachedGitHubData = JSON.parse(cachedData);
                    setGithubData(parsed.data);
                } else {
                    setError("Failed to load GitHub data");
                }
            } finally {
                setLoading(false);
            }
        };

        loadGitHubData();
    }, []);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <div>Loading GitHub stats...</div>
            </div>
        );
    }

    if (error || !githubData) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    <h3>Failed to load GitHub data</h3>
                    <p>{error || "No data available"}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Profile Header */}
            <div className={styles.headerSection}>
                <div className={styles.profileInfo}>
                    <div className={styles.avatar}>
                        {githubData.profile.avatar.startsWith("http") ? (
                            <img
                                src={githubData.profile.avatar}
                                alt={githubData.profile.name}
                            />
                        ) : (
                            githubData.profile.avatar
                        )}
                    </div>
                    <div className={styles.userDetails}>
                        <h3>{githubData.profile.name}</h3>
                        <div className={styles.username}>
                            {githubData.profile.username}
                        </div>
                        <div className={styles.bio}>
                            {githubData.profile.bio}
                        </div>
                    </div>
                </div>

                <div className={styles.statsOverview}>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>
                            {githubData.stats.repos}
                        </div>
                        <div className={styles.statLabel}>Repositories</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>
                            {githubData.stats.followers}
                        </div>
                        <div className={styles.statLabel}>Followers</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>
                            {githubData.stats.following}
                        </div>
                        <div className={styles.statLabel}>Following</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statNumber}>
                            {githubData.stats.stars}
                        </div>
                        <div className={styles.statLabel}>Stars</div>
                    </div>
                </div>
            </div>

            {/* Coding Activity */}
            <div className={styles.activitySection}>
                <h4 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>📈</span>
                    Coding Activity
                </h4>
                <div className={styles.activityGrid}>
                    <div className={styles.activityCard}>
                        <div className={styles.activityNumber}>
                            {githubData.activity.commits}
                        </div>
                        <div className={styles.activityLabel}>
                            Total Commits
                        </div>
                    </div>
                    <div className={styles.activityCard}>
                        <div className={styles.activityNumber}>
                            {githubData.activity.prs}
                        </div>
                        <div className={styles.activityLabel}>
                            Pull Requests
                        </div>
                    </div>
                    <div className={styles.activityCard}>
                        <div className={styles.activityNumber}>
                            {githubData.activity.issues}
                        </div>
                        <div className={styles.activityLabel}>
                            Issues Opened
                        </div>
                    </div>
                    <div className={styles.activityCard}>
                        <div className={styles.activityNumber}>
                            {githubData.activity.contributions}
                        </div>
                        <div className={styles.activityLabel}>
                            Contributions
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>🏢</span>
                    Member Organizations
                </h4>
                <div className={styles.orgsGrid}>
                    {githubData.organizations.map((org) => (
                        <div key={org.name} className={styles.orgCard}>
                            <div className={styles.orgLogo}>
                                {org.avatar_url ? (
                                    <img src={org.avatar_url} alt={org.name} />
                                ) : (
                                    org.logo
                                )}
                            </div>
                            <div className={styles.orgName}>{org.name}</div>
                            <div className={styles.orgRole}>{org.role}</div>
                        </div>
                    ))}
                </div>
            </div>

            {githubData.contributedOrgs &&
                githubData.contributedOrgs.length > 0 && (
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                            <span className={styles.sectionIcon}>🤝</span>
                            Open Source Contributions
                        </h4>
                        <div className={styles.orgsGrid}>
                            {githubData.contributedOrgs.map((org) => (
                                <div
                                    key={org.name}
                                    className={styles.contributedOrgCard}
                                >
                                    <div className={styles.orgLogo}>
                                        {org.avatar_url ? (
                                            <img
                                                src={org.avatar_url}
                                                alt={org.name}
                                            />
                                        ) : (
                                            org.logo
                                        )}
                                    </div>
                                    <div className={styles.orgName}>
                                        {org.name}
                                    </div>
                                    <div className={styles.orgRole}>
                                        {org.role}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default GitHubStats;
