import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Flame,
  Star,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import WorkoutActions from "./WorkoutActions";

async function getWorkout(id) {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function WorkoutDetails({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0f1115] text-white">
      {/* Navbar */}
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-[#ccff00]"
        >
          <ArrowLeft size={18} />
          BACK TO LIBRARY
        </Link>

        {/* Details Layout */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Image */}
          <div className="flex min-h-[520px] items-center justify-center border border-white/10 bg-[#171a20] p-8">
            <img
              src={workout.image}
              alt={workout.name}
              className="max-h-[500px] w-full object-contain"
            />
          </div>

          {/* Right Content */}
          <div>
            {/* Muscle Group Tags */}
            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="border border-[#ccff00]/40 bg-[#ccff00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ccff00]"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl font-bold uppercase leading-tight sm:text-6xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
              {workout.description}
            </p>

            {/* Key Specs */}
            <div className="mt-8 border border-white/10 bg-[#13161b]">
              <div className="border-b border-white/10 px-5 py-4">
                <h2 className="font-display text-xl font-bold uppercase">
                  KEY SPECS
                </h2>
              </div>

              <div className="divide-y divide-white/10">
                <SpecRow
                  label="Equipment"
                  value={workout.equipment}
                />

                <SpecRow
                  label="Difficulty"
                  value={workout.difficulty}
                />

                <SpecRow
                  label="Sets"
                  value={workout.sets}
                />

                <SpecRow
                  label="Reps"
                  value={workout.reps}
                />

                <SpecRow
                  label="Duration"
                  value={`${workout.duration} min`}
                />

                <SpecRow
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                />

                <SpecRow
                  label="Rating"
                  value={workout.rating}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {/* Duration */}
              <div className="border border-white/10 bg-[#13161b] p-4">
                <Clock
                  className="mb-2 text-[#ccff00]"
                  size={20}
                />

                <p className="text-sm text-white/50">
                  Duration
                </p>

                <p className="mt-1 font-bold">
                  {workout.duration} min
                </p>
              </div>

              {/* Calories */}
              <div className="border border-white/10 bg-[#13161b] p-4">
                <Flame
                  className="mb-2 text-[#ccff00]"
                  size={20}
                />

                <p className="text-sm text-white/50">
                  Calories
                </p>

                <p className="mt-1 font-bold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              {/* Rating */}
              <div className="border border-white/10 bg-[#13161b] p-4">
                <Star
                  className="mb-2 text-[#ccff00]"
                  size={20}
                />

                <p className="text-sm text-white/50">
                  Rating
                </p>

                <p className="mt-1 font-bold">
                  {workout.rating}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="font-display mb-5 text-2xl font-bold uppercase">
                INSTRUCTIONS
              </h2>

              <ol className="space-y-4">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-4 border-b border-white/10 pb-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#ccff00] text-sm font-black text-black">
                        {index + 1}
                      </span>

                      <p className="pt-1 text-sm leading-6 text-white/70">
                        {instruction}
                      </p>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* Action Buttons */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </section>
    </main>
  );
}

function SpecRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 py-3">
      <span className="text-xs font-bold uppercase tracking-wider text-white/40">
        {label}
      </span>

      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}