export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f1115] text-white">
      <div className="text-center">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-white/15 border-t-[#ccff00]" />

        <h2 className="font-display text-2xl font-bold uppercase">
          LOADING WORKOUTS
        </h2>

        <p className="mt-2 text-sm text-white/50">
          Preparing your workout library...
        </p>
      </div>
    </main>
  );
}