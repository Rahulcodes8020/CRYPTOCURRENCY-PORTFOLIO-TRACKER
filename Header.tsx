"use client";
import Link from "next/link";
import { FaChartLine, FaSignal, FaDoorOpen } from "react-icons/fa"; // Removed FaCalculator

export default function Header() {
  return (
    <header className="text-center py-10 px-4 bg-gradient-to-b from-gray-900 to-black shadow-md">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-400 drop-shadow-lg mb-2">
        📈 Crypto Watch
      </h1>
      <p className="text-gray-400 mb-6 text-lg">
        Track coins, manage portfolio, discover movers and trending projects.
      </p>
      <nav className="flex justify-center gap-6 text-white font-medium text-lg">
        <Link href="/" className="hover:text-blue-400 transition-colors">
          Home
        </Link>
        <Link href="/portfolio" className="hover:text-blue-400 transition-colors">
          Portfolio
        </Link>
        <Link href="/watchlist" className="hover:text-blue-400 transition-colors">
          Watchlist
        </Link>
        <Link
          href="/market-insight"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
          <FaChartLine />
          <span className="hidden md:inline">Market</span>
        </Link>
        <Link
          href="/live"
          className="flex items-center gap-2 hover:text-red-500 transition-colors"
        >
          <FaSignal />
          <span className="hidden md:inline">Live</span>
        </Link>
        {/* ✅ Share Room only */}
        <Link
          href="/share-market-room"
          className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
        >
          <FaDoorOpen />
          <span className="hidden md:inline">Share Room</span>
        </Link>
      </nav>
    </header>
  );
}
