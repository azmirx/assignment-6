"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  const workoutActive =
    pathname === "/" || pathname.startsWith("/workout/");

  const myPlanActive = pathname === "/my-plan";

  return (
    <nav className="border-b border-white/10 bg-[#0f1115]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={28}
            height={28}
          />

          <span className="text-xl font-black tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`font-semibold transition ${
              workoutActive
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`font-semibold transition ${
              myPlanActive
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-sm font-bold text-black"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold text-white"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </nav>
  );
}