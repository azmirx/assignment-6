"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Clock,
  Flame,
  Star,
  ChevronDown,
  Search,
} from "lucide-react";

export default function WorkoutLibrary({ workouts }) {
  const [sortBy, setSortBy] = useState("duration");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedWorkouts = useMemo(() => {
    // Search Filter
    const filteredWorkouts = workouts.filter((workout) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesName = workout.name
        .toLowerCase()
        .includes(search);

      const matchesTag = workout.muscleGroups.some((group) =>
        group.toLowerCase().includes(search)
      );

      return matchesName || matchesTag;
    });

    const copiedWorkouts = [...filteredWorkouts];

    // Sort by Duration
    if (sortBy === "duration") {
      return copiedWorkouts.sort(
        (a, b) => Number(a.duration) - Number(b.duration)
      );
    }

    // Sort by Calories
    if (sortBy === "calories") {
      return copiedWorkouts.sort(
        (a, b) =>
          Number(a.caloriesBurned) -
          Number(b.caloriesBurned)
      );
    }

    // Sort by Rating
    if (sortBy === "rating") {
      return copiedWorkouts.sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    return copiedWorkouts;
  }, [workouts, sortBy, searchTerm]);

  return (
    <section
      id="library"
      className="border-t border-white/10 bg-[#0b0d10] py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
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

        {/* Search + Sort */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          {/* Search */}
          <div className="w-full md:max-w-md">
            <label
              htmlFor="search"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-white/40"
            >
              Search Workouts
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />

              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by workout or muscle group..."
                className="w-full border border-white/15 bg-[#15181d] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#ccff00]"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="relative w-full md:w-[190px]">
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
        {sortedWorkouts.length > 0 ? (
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
                    {/* Duration */}
                    <div className="flex items-center gap-1.5">
                      <Clock
                        size={15}
                        className="text-[#ccff00]"
                      />

                      <span>
                        {workout.duration} min
                      </span>
                    </div>

                    {/* Calories */}
                    <div className="flex items-center gap-1.5">
                      <Flame
                        size={15}
                        className="text-[#ccff00]"
                      />

                      <span>
                        {workout.caloriesBurned} kcal
                      </span>
                    </div>

                    {/* Rating */}
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
        ) : (
          /* No Results */
          <div className="border border-white/10 bg-[#13161b] px-5 py-16 text-center">
            <Search
              size={38}
              className="mx-auto mb-4 text-[#ccff00]"
            />

            <h3 className="font-display text-2xl font-bold uppercase">
              NO WORKOUTS FOUND
            </h3>

            <p className="mt-2 text-sm text-white/50">
              Try searching with another workout name or muscle group.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}