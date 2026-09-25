"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedPlan = localStorage.getItem("fitlog-plan");
        const storedSaved = localStorage.getItem("fitlog-saved");

        if (storedPlan) {
          setPlan(JSON.parse(storedPlan));
        }

        if (storedSaved) {
          setSaved(JSON.parse(storedSaved));
        }
      } catch (error) {
        console.error("Failed to load FitLog data:", error);
      }

      setLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save Today's Plan
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(plan)
      );
    }
  }, [plan, loaded]);

  // Save Saved Workouts
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(saved)
      );
    }
  }, [saved, loaded]);

  // Add to Today's Plan
  function addToPlan(workout) {
    const alreadyAdded = plan.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadyAdded) {
      return "exists";
    }

    if (plan.length >= 5) {
      return "full";
    }

    setPlan((current) => [
      ...current,
      {
        ...workout,
        done: false,
      },
    ]);

    return "added";
  }

  // Save for later
  function saveForLater(workout) {
    const alreadySaved = saved.some(
      (item) => String(item.id) === String(workout.id)
    );

    if (alreadySaved) {
      return "exists";
    }

    setSaved((current) => [
      ...current,
      workout,
    ]);

    return "saved";
  }

  // Remove from Today's Plan
  function removeFromPlan(id) {
    setPlan((current) =>
      current.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  }

  // Remove from Saved
  function removeFromSaved(id) {
    setSaved((current) =>
      current.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  }

  // Mark workout as done
  function markAsDone(id) {
    setPlan((current) =>
      current.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              done: true,
            }
          : item
      )
    );
  }

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        loaded,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  return useContext(WorkoutContext);
}