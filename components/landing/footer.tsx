import Link from "next/link";
import { TechButton } from "@/components/ui/tech-button";
import { Video } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto max-w-7xl px-4">

                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2">
                        <Link href="/" className="mb-6 flex items-center gap-2">
                            <Video className="h-6 w-6 text-white" />
                            <span className="font-bold text-xl tracking-tight text-white">Snap-cut</span>
                        </Link>
                        <p className="text-muted-foreground font-light max-w-xs mb-8">
                            The advanced screen recorder for professionals. Built for speed, privacy, and quality.
                        </p>
                        <div className="flex gap-4">
                            <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 w-full max-w-[200px]" />
                            <button className="bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-gray-200">Subscribe</button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Product</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Changelog</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Docs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Company</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Legal</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Security</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground font-light">
                    <p>&copy; {new Date().getFullYear()} Snap-cut Inc. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white">Twitter</Link>
                        <Link href="#" className="hover:text-white">GitHub</Link>
                        <Link href="#" className="hover:text-white">Discord</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
