"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Header.module.css'; // 専用のCSSを読み込む（例）

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ログイン状態をチェック
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/mypage', {
          credentials: 'include',
        });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleTitleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push('/mypage');
    } else {
      router.push('/');
    }
  };

  return (
    <header className={styles.header}>
      <a href="#" onClick={handleTitleClick} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
        ハッカソン結果ビジュアライザー
      </a>
      <nav>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <Link href="/createnewvote">Create New Vote</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/">Sign in</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/signup">Sign up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}