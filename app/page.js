import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

async function getWorkouts() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#0f1115] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
        {/* Left */}
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-display max-w-2xl text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-3 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#b8e600]"
          >
            BROWSE WORKOUTS
            <span>↓</span>
          </a>
        </div>

        {/* Right */}
        <div className="flex items-center justify-center">
          <div className="relative flex h-[420px] w-full max-w-[500px] items-center justify-center">
            <div className="absolute h-[320px] w-[320px] rounded-full bg-[#ccff00]/10 blur-3xl" />

            <Image
              src="/banner.png"
              alt="Workout illustration"
              width={430}
              height={430}
              priority
              className="relative z-10 h-auto w-full max-w-[430px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Library */}
      <section
        id="library"
        className="border-t border-white/10 bg-[#0b0d10] py-20"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Library Heading */}
          <div className="mb-12">
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#ccff00]">
              12 WORKOUTS
            </p>

            <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
              THE LIBRARY
            </h2>

            <p className="mt-3 text-white/50">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Workout Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="group overflow-hidden border border-white/10 bg-[#13161b] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/60"
              >
                {/* Workout Image */}
                <div className="flex h-[260px] items-center justify-center overflow-hidden bg-[#171a20] p-5">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5">
                  {/* Muscle Groups */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((group) => (
                      <span
                        key={group}
                        className="border border-[#ccff00]/40 bg-[#ccff00]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00]"
                      >
                        {group}
                      </span>
                    ))}
                  </div>

                  {/* Workout Name */}
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight">
                    {workout.name}
                  </h3>

                  {/* Equipment */}
                  <p className="mt-3 text-sm text-white/50">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Clock size={15} className="text-[#ccff00]" />
                      <span>{workout.duration} min</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Flame size={15} className="text-[#ccff00]" />
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Star size={15} className="text-[#ccff00]" />
                      <span>{workout.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}