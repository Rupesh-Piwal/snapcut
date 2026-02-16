import {
  Layout,
  Maximize,
  Mic,
  Monitor,
  MousePointer,
  Settings,
  Zap,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Canvas Composition",
    description: "Arrange screen & camera freely.",
    icon: Layout,
  },
  {
    title: "PiP Layout",
    description: "Perfect for tutorials.",
    icon: Maximize,
  },
  {
    title: "Real-time Overlays",
    description: "Add text & stickers on the fly.",
    icon: MousePointer,
  },
  {
    title: "Instant Export",
    description: "No cloud processing or wait times.",
    icon: Zap,
  },
  {
    title: "Audio Visualizer",
    description: "Monitor levels in real-time.",
    icon: Mic,
  },
  {
    title: "Privacy First",
    description: "Everything stays on your device.",
    icon: Shield,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="bg-background py-24 relative overflow-hidden border-b border-white/5"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-block border border-white/10 px-3 py-1 mb-6">
            <span className="text-xs uppercase tracking-[0.2em] text-blue-500 font-bold">
              Features
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
            Engineered for speed
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Every pixel designed to help you move faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative p-8 md:p-12 border-r border-b border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              {/* Corner Accent on Hover */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <span className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center bg-blue-500/10 text-blue-400 rounded-sm">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
