"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, TriangleAlert } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f1115] px-5 text-white">
      <div className="max-w-xl text-center">
        <TriangleAlert
          size={52}
          className="mx-auto mb-6 text-[#ccff00]"
        />

        <p className="mb-3 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
          SOMETHING WENT WRONG
        </p>

        <h1 className="font-display text-4xl font-bold uppercase sm:text-6xl">
          UNABLE TO LOAD THIS PAGE
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/50">
          An unexpected error occurred. Please try again or return to the workout library.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase text-black"
          >
            <RefreshCcw size={18} />
            TRY AGAIN
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center border border-white/20 px-6 py-4 text-sm font-black uppercase text-white"
          >
            BACK TO WORKOUTS
          </Link>
        </div>
      </div>
    </main>
  );
}