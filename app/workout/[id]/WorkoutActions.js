"use client";

import { Plus, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutActions({ workout }) {
  const { addToPlan, saveForLater } = useWorkout();

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
      <button
        onClick={handleAddToPlan}
        className="inline-flex items-center justify-center gap-2 bg-[#ccff00] px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-[#b8e600]"
      >
        <Plus size={18} />
        ADD TO TODAY&apos;S PLAN
      </button>

      <button
        onClick={handleSaveForLater}
        className="inline-flex items-center justify-center gap-2 border border-white/25 px-6 py-4 text-sm font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
      >
        <Bookmark size={18} />
        SAVE FOR LATER
      </button>
    </div>
  );
}