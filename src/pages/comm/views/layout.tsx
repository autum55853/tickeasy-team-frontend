import React from "react";
import Header from "@/core/components/global/header";
import ScrollTopBtn from "@/core/components/global/ScrollTopBtn";
import Footer from "@/core/components/global/footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="mt-24 flex h-[calc(100vh-6rem)] flex-col pb-[400px]">
      <Header />
      <main className="flex-grow">
        {children}
        <Footer />
      </main>
      <ScrollTopBtn />
    </div>
  );
}
