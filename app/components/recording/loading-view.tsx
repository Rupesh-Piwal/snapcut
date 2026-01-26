interface LoadingViewProps {
  status: "initializing" | "stopping";
}

export function LoadingView({ status }: LoadingViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C1C]backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#1C1C1C] p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full border border-[#333333] mx-4 animate-in zoom-in-95 duration-300">
        <div className="relative">
          <svg
            className="w-16 h-16 animate-spin text-[#FFFFFF]"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-20"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="141 283"
              className="opacity-100"
            />
          </svg>
        </div>
        <div className="text-center space-y-3">
          <h3 className="text-xl font-semibold text-[#FFFFFF]">
            {status === "initializing" ? "Starting..." : "Finalizing..."}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {status === "initializing"
              ? "Setting up your recording environment"
              : "Processing your video"}
          </p>
        </div>
      </div>
    </div>
  );
}
