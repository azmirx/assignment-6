"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    Clock,
    Flame,
    Star,
    Check,
    X,
    ArrowRight,
    Dumbbell,
} from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import { useWorkout } from "@/context/WorkoutContext";

export default function MyPlanPage() {
    const {
        plan,
        saved,
        loaded,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
    } = useWorkout();

    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState("plan");

    useEffect(() => {
        if (searchParams.get("tab") === "saved") {
            setActiveTab("saved");
        } else {
            setActiveTab("plan");
        }
    }, [searchParams]);

    const totalMinutes = plan.reduce(
        (total, workout) => total + Number(workout.duration || 0),
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) =>
            total + Number(workout.caloriesBurned || 0),
        0
    );

    function handleMarkDone(id, done) {
        if (done) {
            toast("This workout is already completed");
            return;
        }

        markAsDone(id);
        toast.success("Workout marked as done");
    }

    function handleRemovePlan(id) {
        removeFromPlan(id);
        toast.success("Workout removed from today's plan");
    }

    function handleRemoveSaved(id) {
        removeFromSaved(id);
        toast.success("Workout removed from saved");
    }

    const currentWorkouts =
        activeTab === "plan" ? plan : saved;

    return (
        <main className="min-h-screen bg-[#0f1115] text-white">
            {/* Navbar */}
            <Navbar />

            <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
                {/* Heading */}
                <div className="mb-10">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
                        WORKOUT LOG
                    </p>

                    <h1 className="font-display text-5xl font-bold uppercase sm:text-6xl">
                        MY PLAN
                    </h1>

                    <p className="mt-3 text-white/50">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="mb-10 grid gap-4 sm:grid-cols-3">
                    {/* Exercises */}
                    <div className="border border-white/10 bg-[#15181d] p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                            Exercises
                        </p>

                        <p className="font-display mt-3 text-4xl font-bold text-[#ccff00]">
                            {plan.length}
                        </p>
                    </div>

                    {/* Minutes */}
                    <div className="border border-white/10 bg-[#15181d] p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                            Minutes
                        </p>

                        <p className="font-display mt-3 text-4xl font-bold text-[#ccff00]">
                            {totalMinutes}
                        </p>
                    </div>

                    {/* Calories */}
                    <div className="border border-white/10 bg-[#15181d] p-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                            Calories
                        </p>

                        <p className="font-display mt-3 text-4xl font-bold text-[#ccff00]">
                            {totalCalories}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8 flex border-b border-white/10">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`border-b-2 px-5 py-4 text-sm font-bold uppercase transition ${activeTab === "plan"
                                ? "border-[#ccff00] text-[#ccff00]"
                                : "border-transparent text-white/50 hover:text-white"
                            }`}
                    >
                        Today&apos;s Plan ({plan.length})
                    </button>

                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`border-b-2 px-5 py-4 text-sm font-bold uppercase transition ${activeTab === "saved"
                                ? "border-[#ccff00] text-[#ccff00]"
                                : "border-transparent text-white/50 hover:text-white"
                            }`}
                    >
                        Saved ({saved.length})
                    </button>
                </div>

                {/* Loading */}
                {!loaded ? (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-[#ccff00]" />

                        <p className="text-white/50">
                            Loading workouts…
                        </p>
                    </div>
                ) : currentWorkouts.length === 0 ? (
                    /* Empty State */
                    <div className="flex min-h-[350px] flex-col items-center justify-center border border-white/10 bg-[#13161b] px-5 text-center">
                        <Dumbbell
                            size={42}
                            className="mb-5 text-[#ccff00]"
                        />

                        <h2 className="font-display text-3xl font-bold uppercase">
                            NOTHING HERE YET
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                            Browse the library and add a lift to get today moving.
                        </p>

                        <Link
                            href="/#library"
                            className="mt-7 inline-flex items-center gap-2 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-[#b8e600]"
                        >
                            GO TO WORKOUTS
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                ) : (
                    /* Workout List */
                    <div className="space-y-4">
                        {currentWorkouts.map((workout) => (
                            <div
                                key={workout.id}
                                className={`border bg-[#15181d] p-4 transition sm:p-5 ${workout.done && activeTab === "plan"
                                        ? "border-[#ccff00]/40 opacity-70"
                                        : "border-white/10"
                                    }`}
                            >
                                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                                    {/* Thumbnail */}
                                    <div className="flex h-[150px] w-full shrink-0 items-center justify-center overflow-hidden bg-[#1b1e24] p-3 md:w-[190px]">
                                        <img
                                            src={workout.image}
                                            alt={workout.name}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="min-w-0 flex-1">
                                        {/* Tags */}
                                        <div className="mb-2 flex flex-wrap gap-2">
                                            {workout.muscleGroups?.map((group) => (
                                                <span
                                                    key={group}
                                                    className="border border-[#ccff00]/40 bg-[#ccff00]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00]"
                                                >
                                                    {group}
                                                </span>
                                            ))}

                                            {workout.done &&
                                                activeTab === "plan" && (
                                                    <span className="bg-[#ccff00] px-2 py-1 text-[10px] font-black uppercase text-black">
                                                        DONE
                                                    </span>
                                                )}
                                        </div>

                                        {/* Title */}
                                        <h2 className="font-display text-2xl font-bold uppercase sm:text-3xl">
                                            {workout.name}
                                        </h2>

                                        {/* Equipment */}
                                        <p className="mt-1 text-sm text-white/50">
                                            {workout.equipment}
                                        </p>

                                        {/* Stats */}
                                        <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-white/60">
                                            <div className="flex items-center gap-1.5">
                                                <Clock
                                                    size={15}
                                                    className="text-[#ccff00]"
                                                />
                                                {workout.duration} min
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Flame
                                                    size={15}
                                                    className="text-[#ccff00]"
                                                />
                                                {workout.caloriesBurned} kcal
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Star
                                                    size={15}
                                                    className="text-[#ccff00]"
                                                />
                                                {workout.rating}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-2 md:max-w-[310px] md:justify-end">
                                        <Link
                                            href={`/workout/${workout.id}`}
                                            className="inline-flex items-center justify-center border border-white/20 px-4 py-3 text-xs font-bold uppercase transition hover:border-[#ccff00] hover:text-[#ccff00]"
                                        >
                                            VIEW DETAILS
                                        </Link>

                                        {activeTab === "plan" && (
                                            <button
                                                onClick={() =>
                                                    handleMarkDone(
                                                        workout.id,
                                                        workout.done
                                                    )
                                                }
                                                className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase transition ${workout.done
                                                        ? "bg-white/10 text-white/40"
                                                        : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                                                    }`}
                                            >
                                                <Check size={15} />
                                                {workout.done
                                                    ? "DONE"
                                                    : "MARK AS DONE"}
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                activeTab === "plan"
                                                    ? handleRemovePlan(workout.id)
                                                    : handleRemoveSaved(workout.id)
                                            }
                                            className="inline-flex h-[42px] w-[42px] items-center justify-center border border-red-500/30 text-red-400 transition hover:bg-red-500/10"
                                            aria-label="Remove workout"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}