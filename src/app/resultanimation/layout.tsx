import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "結果発表 - HRV",
  description: "Hackathon Result Visualizer",
};

export default function ResultAnimationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
