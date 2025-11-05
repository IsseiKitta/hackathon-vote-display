import styles from './Button.module.css'; // ボタン専用のCSSを読み込む

// 1. props の型を定義
type ButtonProps = {
  children: React.ReactNode; // 2. "children" を受け取る
} & React.ComponentPropsWithoutRef<'button'>; // 3. onClick などの標準属性も受け取る

// 4. children と、それ以外の props を受け取る
export default function Button({ children, ...props }: ButtonProps) {
  return (
    // 5. 共通のスタイルと、受け取った props を <button> に適用
    <button className={styles.commonButton} {...props}>
      {/* 6. タグの間に入力された内容(文字)をここで表示 */}
      {children}
    </button>
  );
}