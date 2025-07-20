// components/FloatingActionButton.tsx
"use client";

import { useState } from "react";
import { Coffee } from "lucide-react";

export default function FloatingActionButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShow(!show)}
        className="fixed bottom-5 right-5 z-50 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-3 rounded-full shadow-xl transition-all animate-pulse hover:animate-none"
      >
        <Coffee className="inline mr-2" />
        Support
      </button>

      {/* Modal or Alert */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-2">Support Our Project ☕</h2>
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              Like this website? You can support us with a coffee or share feedback.
            </p>
            <button
              onClick={() => setShow(false)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
