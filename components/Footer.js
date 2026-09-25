import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090b0e]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-7 sm:flex-row lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={26}
            height={26}
          />

          <span className="text-lg font-black tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-center text-sm text-white/45 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}