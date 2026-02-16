import Link from "next/link";

export function TrustedBy() {
    return (
        <div className="border-t border-b border-white/5 bg-background relative z-10">
            <div className="container mx-auto max-w-7xl px-0">
                <div className="flex flex-col md:flex-row items-stretch">
                    {/* Text Block */}
                    <div className="p-6 md:p-8 md:w-64 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center">
                        <p className="text-sm text-muted-foreground">Trusted by <span className="text-blue-500 font-semibold">5000+</span></p>
                        <p className="text-sm text-muted-foreground">Top companies</p>
                    </div>

                    {/* Logos Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                        {["Sematic", "boldes", "Crust", "Stacker AI", "Times", "Cakm", "Crust"].slice(0, 5).map((logo, i) => (
                            <div key={i} className="h-24 flex items-center justify-center border-r border-b md:border-b-0 border-white/5 last:border-r-0 grayscale hover:grayscale-0 transition-all cursor-default">
                                <span className="font-bold text-lg text-white/40">{logo}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
