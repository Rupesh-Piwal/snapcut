import { ArrowRight, Check, X } from "lucide-react";
import { TechButton } from "@/components/ui/tech-button";

export function Comparison() {
    return (
        <section id="pricing" className="bg-background py-24 border-b border-white/5">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                            Compare <br />
                            <span className="text-muted-foreground italic font-serif">Versions</span>
                        </h2>
                        <p className="text-muted-foreground font-light text-lg">
                            See exactly what you get. No hidden fees, no credit card required for the free tier.
                        </p>
                        <TechButton className="w-full justify-between group bg-white text-black hover:bg-gray-200" withBrackets>
                            Start for Free <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </TechButton>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="border border-white/10 bg-white/[0.01]">
                            {/* Header */}
                            <div className="grid grid-cols-4 border-b border-white/10 p-6 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                                <div className="col-span-2">Feature</div>
                                <div className="text-center">Basic</div>
                                <div className="text-center text-blue-400">Pro</div>
                            </div>
                            {/* Rows */}
                            <div className="divide-y divide-white/5">
                                {[
                                    { name: "Recording Limit", basic: "5 Mins", pro: "Unlimited" },
                                    { name: "Exports", basic: "720p", pro: "4K" },
                                    { name: "Watermark", basic: "Yes", pro: "None" },
                                    { name: "Cloud Storage", basic: "No", pro: "Yes" },
                                    { name: "AI Editing", basic: "No", pro: "Yes" },
                                    { name: "Team Seats", basic: "No", pro: "Unlimited" },
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-4 p-6 text-sm hover:bg-white/[0.02] transition-colors items-center">
                                        <div className="col-span-2 font-medium text-white">{row.name}</div>
                                        <div className="text-center text-muted-foreground">{row.basic}</div>
                                        <div className="text-center font-semibold text-white">{row.pro}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
