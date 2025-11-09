import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackathon Result Visualizer",
  description: "Hackathon Result Visualizer",
};

export default function ResultAnimationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
