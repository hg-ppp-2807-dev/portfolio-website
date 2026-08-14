import { NextResponse } from "next/server";

const USER = "hg-ppp-2807-dev";

export async function GET() {
  try {
    const reposRes = await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=8`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "pritam-portfolio" },
      next: { revalidate: 300 },
    });

    if (!reposRes.ok) throw new Error("GitHub repositories request failed");
    const repos = await reposRes.json();

    const commits = await Promise.all(
      repos.slice(0, 6).map(async (repo: { full_name: string; name: string; html_url: string }) => {
        const res = await fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=4`, {
          headers: { Accept: "application/vnd.github+json", "User-Agent": "pritam-portfolio" },
          next: { revalidate: 300 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.map((commit: any) => ({
          repo: repo.name,
          repoUrl: repo.html_url,
          message: commit.commit?.message?.split("\n")[0] ?? "Commit",
          sha: commit.sha?.slice(0, 7),
          url: commit.html_url,
          date: commit.commit?.author?.date,
        }));
      })
    );

    const flat = commits.flat().sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 8);
    return NextResponse.json({ commits: flat, updatedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ commits: [], updatedAt: null }, { status: 200 });
  }
}
