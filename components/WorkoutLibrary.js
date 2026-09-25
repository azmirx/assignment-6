"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Clock,
  Flame,
  Star,
  ChevronDown,
} from "lucide-react";

export default function WorkoutLibrary({ workouts }) {
  const [sortBy, setSortBy] = useState("duration");

  const sortedWorkouts = useMemo(() => {
    const copiedWorkouts = [...workouts];

    if (sortBy === "duration") {
      return copiedWorkouts.sort(
        (a, b) => Number(a.duration) - Number(b.duration)
      );
    }

    if (sortBy === "calories") {
      return copiedWorkouts.sort(
        (a, b) =>
          Number(a.caloriesBurned) -
          Number(b.caloriesBurned)
      );
    }

    if (sortBy === "rating") {
      return copiedWorkouts.sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    return copiedWorkouts;
  }, [workouts, sortBy]);

  return (
    <section
      id="library"
      className="border-t border-white/10 bg-[#0b0d10] py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading + Sort */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
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

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-[190px]">
            <label
              htmlFor="sort"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/40"
            >
              Sort By
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none border border-white/15 bg-[#15181d] px-4 py-3 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute bottom-[14px] right-3 text-[#ccff00]"
            />
          </div>
        </div>

        {/* Workout Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
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
                {/* Tags */}
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

                {/* Name */}
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
                    <Clock
                      size={15}
                      className="text-[#ccff00]"
                    />

                    <span>
                      {workout.duration} min
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Flame
                      size={15}
                      className="text-[#ccff00]"
                    />

                    <span>
                      {workout.caloriesBurned} kcal
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Star
                      size={15}
                      className="text-[#ccff00]"
                    />

                    <span>
                      {workout.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}