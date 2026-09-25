"use client";

import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <WorkoutProvider>
      {children}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#171a20",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.12)",
          },
        }}
      />
    </WorkoutProvider>
  );
}