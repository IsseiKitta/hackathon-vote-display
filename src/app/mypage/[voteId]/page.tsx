"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PageShell from "@/components/PageShell";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "./page.module.css";

type Project = {
  id: number;
  teamName: string;
  projectName: string;
  votes: number;
  rank: number;
};

export default function PollDetailPage() {
  const params = useParams();
  const router = useRouter();
  const voteId = params.voteId as string;

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/api/vote/${voteId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401) {
            alert("ログインが必要です");
            router.push("/");
            return;
          }
          if (res.status === 404) {
            throw new Error("投票が見つかりませんでした");
          }
          throw new Error("作品一覧の取得に失敗しました");
        }

        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("エラー:", err);
        setError(err instanceof Error ? err.message : "不明なエラー");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [voteId, router]);

  if (loading) {
    return (
      <PageShell>
        <h1 className="title">提出作品一覧</h1>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>読み込み中...</p>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <h1 className="title">提出作品一覧</h1>
        <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
          エラー: {error}
        </p>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link href="/mypage">
            <Button>マイページに戻る</Button>
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="title">提出作品一覧</h1>
          <Link href={`/resultanimation?voteId=${voteId}`}>
            <Button>ハイライトを見る</Button>
          </Link>
        </div>

        <div className={styles.projectList}>
          {projects.length === 0 ? (
            <p className={styles.emptyMessage}>作品がまだ登録されていません。</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectInfo}>
                  <h2 className={styles.projectTitle}>
                    作品名 {project.projectName}
                  </h2>
                  <p className={styles.teamName}>チーム名 {project.teamName}</p>
                  <p className={styles.votes}>得票数 {project.votes}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </PageShell>
  );
}
