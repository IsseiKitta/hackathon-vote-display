"use client";

import PageShell from "@/components/PageShell";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "ログインに失敗しました");
        return;
      }

      // マイページにリダイレクト
      router.push("/mypage");
    } catch (error) {
      console.error("エラー:", error);
      alert("ログインに失敗しました");
    }
  };

  return (
    <PageShell>
      <h1 className="title">ハッカソン投票ビジュアライザーにログイン</h1>
      <form className="content" onSubmit={handleSubmit}>
        <FormField
          title="ユーザーネーム"
          name="username"
          type="text"
          placeholder="ユーザー名を入力"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <FormField
          title="パスワード"
          name="password"
          type="password"
          placeholder="パスワードを入力"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">ログイン</Button>
      </form>
    </PageShell>
  );
}
