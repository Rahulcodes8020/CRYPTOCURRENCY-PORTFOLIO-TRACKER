"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold text-blue-400">Crypto Watch</h1>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/portfolio">Portfolio</Link>
        <Link href="/watchlist">Watchlist</Link>
        <Link href="/dashboard">Dashboard</Link>
        {/* ✅ Only Share Room remains */}
        <Link href="/share-market-room">Share Room</Link>
      </div>
    </nav>
  );
}
