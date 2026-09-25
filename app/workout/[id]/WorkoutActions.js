"use client";

import { Plus, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutActions({ workout }) {
  const {
    plan,
    saved,
    addToPlan,
    saveForLater,
  } = useWorkout();

  const alreadyInPlan = plan.some(
    (item) => String(item.id) === String(workout.id)
  );

  const alreadySaved = saved.some(
    (item) => String(item.id) === String(workout.id)
  );

  const planIsFull = plan.length >= 5;

  function handleAddToPlan() {
    const result = addToPlan(workout);

    if (result === "added") {
      toast.success("Added to today's plan");
    }

    if (result === "exists") {
      toast.error("This workout is already in today's plan");
    }

    if (result === "full") {
      toast.error("Today's plan already has 5 workouts");
    }
  }

  function handleSaveForLater() {
    const result = saveForLater(workout);

    if (result === "saved") {
      toast.success("Saved for later");
    }

    if (result === "exists") {
      toast.error("This workout is already saved");
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {/* Add to Plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={planIsFull || alreadyInPlan}
        className={`inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-black uppercase transition ${
          planIsFull || alreadyInPlan
            ? "cursor-not-allowed bg-white/10 text-white/30"
            : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
        }`}
      >
        <Plus size={18} />

        {alreadyInPlan
          ? "ALREADY IN PLAN"
          : planIsFull
            ? "PLAN IS FULL"
            : "ADD TO TODAY'S PLAN"}
      </button>

      {/* Save */}
      <button
        type="button"
        onClick={handleSaveForLater}
        disabled={alreadySaved}
        className={`inline-flex items-center justify-center gap-2 border px-6 py-4 text-sm font-black uppercase transition ${
          alreadySaved
            ? "cursor-not-allowed border-white/10 text-white/30"
            : "border-white/25 text-white hover:border-[#ccff00] hover:text-[#ccff00]"
        }`}
      >
        <Bookmark size={18} />

        {alreadySaved ? "SAVED" : "SAVE FOR LATER"}
      </button>
    </div>
  );
}