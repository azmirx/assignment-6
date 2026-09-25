import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f1115] px-5 text-white">
      <div className="text-center">
        <Dumbbell
          size={52}
          className="mx-auto mb-6 text-[#ccff00]"
        />

        <p className="mb-3 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
          ERROR 404
        </p>

        <h1 className="font-display text-5xl font-bold uppercase sm:text-7xl">
          PAGE NOT FOUND
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/50">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-[#b8e600]"
        >
          <ArrowLeft size={18} />
          BACK TO WORKOUTS
        </Link>
      </div>
    </main>
  );
}