import Image from "next/image";
import Navbar from "@/components/Navbar";
import WorkoutLibrary from "@/components/WorkoutLibrary";

async function getWorkouts() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

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

      {/* Hero Section */}
      <section className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
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

        {/* Right Banner */}
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

      {/* Workout Library */}
      <WorkoutLibrary workouts={workouts} />
    </main>
  );
}