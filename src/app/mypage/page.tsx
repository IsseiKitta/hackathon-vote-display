"use client";

import { useEffect, useState, useContext } from "react";
import PageShell from "@/components/PageShell";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import styles from "./page.module.css";

type Poll = {
  id: number;
  title: string;
  createdAt: string;
};

export default function MyPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Check authentication before fetching
    if (!isLoggedIn) {
      setError("ログインが必要です");
      setLoading(false);
      router.push("/");
      return;
    }

    const fetchPolls = async () => {
      try {
        const res = await fetch("/api/mypage", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("ログインが必要です");
            router.push("/");
            return;
          }
          throw new Error("投票一覧の取得に失敗しました");
        }

        const data = await res.json();
        setPolls(data.polls);
      } catch (err) {
        console.error("エラー:", err);
        setError(err instanceof Error ? err.message : "不明なエラー");
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [router, isLoggedIn]);

  if (loading) {
    return (
      <PageShell>
        <h1 className="title">ハッカソン一覧</h1>
        <p style={{ textAlign: "center", marginTop: "2rem" }}>読み込み中...</p>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <h1 className="title">ハッカソン一覧</h1>
        <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
          エラー: {error}
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="title">ハッカソン一覧</h1>
          <Link href="/createnewvote">
            <Button>ハッカソンを追加</Button>
          </Link>
        </div>

        <div className={styles.pollList}>
          {polls.length === 0 ? (
            <p className={styles.emptyMessage}>
              まだ投票が作成されていません。「ハッカソンを追加」から作成してください。
            </p>
          ) : (
            polls.map((poll) => (
              <div key={poll.id} className={styles.pollCard}>
                <div className={styles.pollInfo}>
                  <h2 className={styles.pollTitle}>名前 {poll.title}</h2>
                  <p className={styles.pollDate}>
                    登録日:{new Date(poll.createdAt).toLocaleDateString("ja-JP")}
                  </p>
                </div>
                <Link href={`/resultanimation?voteId=${poll.id}`}>
                  <Button>ハイライトを見る</Button>
                </Link>
              </div>
            ))
          )}
        </div>

      </div>
    </PageShell>
  );
}
