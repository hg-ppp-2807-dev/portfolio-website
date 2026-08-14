"use client";

import { useEffect, useState } from "react";
import { Github, GitCommitHorizontal } from "lucide-react";

interface Commit {
  repo: string;
  repoUrl: string;
  message: string;
  sha: string;
  url: string;
  date: string;
}

export default function GithubActivity() {
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => setCommits(data.commits ?? []))
      .catch(() => setCommits([]));
  }, []);

  return (
    <section className="section github-section" id="activity">
      <div className="section-kicker"><Github size={15} /> LIVE GITHUB ACTIVITY</div>
      <div className="github-heading-row">
        <h2>BUILDING<br /><span>IN PUBLIC.</span></h2>
        <a className="text-link" href="https://github.com/hg-ppp-2807-dev" target="_blank" rel="noreferrer">VIEW GITHUB ↗</a>
      </div>
      <div className="commit-grid">
        {commits.length ? commits.map((commit) => (
          <a href={commit.url} target="_blank" rel="noreferrer" className="commit-card" key={commit.url}>
            <GitCommitHorizontal size={17} />
            <div>
              <p className="commit-repo">{commit.repo} · {commit.sha}</p>
              <p className="commit-message">{commit.message}</p>
              <p className="commit-date">{new Date(commit.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
            </div>
          </a>
        )) : <div className="commit-empty">Loading recent commits…</div>}
      </div>
    </section>
  );
}
