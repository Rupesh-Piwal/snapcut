import { notFound } from "next/navigation";
import { db } from "@/app/db";
import { videos, videoLinks } from "@/app/db/schema";
import { eq, asc } from "drizzle-orm";
import { ExternalLink, Calendar, Link as LinkIcon } from "lucide-react";
import { getPresignedVideoUrl } from "@/lib/s3-server";
import { VideoPlayer } from "@/components/video-player";

type PageProps = {
    params: Promise<{ videoId: string }>;
};

// Force dynamic rendering since we fetch data based on params
export const dynamic = "force-dynamic";

export default async function VideoSharePage({ params }: PageProps) {
    const { videoId } = await params;

    // 1. Fetch Video Metadata
    const video = await db.query.videos.findFirst({
        where: eq(videos.id, videoId),
    });

    if (!video) {
        notFound();
    }

    // 2. Fetch Links
    const links = await db.query.videoLinks.findMany({
        where: eq(videoLinks.videoId, videoId),
        orderBy: [asc(videoLinks.order)],
    });

    // Generate Presigned GET URL (Server-side)
    const videoUrl = await getPresignedVideoUrl(video.objectKey);

    if (!videoUrl) {
        // Handle error or fallback (maybe show error state)
        // For now, let's just log and maybe return null or notFound if critical
        console.error("Failed to generate video URL");
        // notFound(); // Optional: decide if we 404
    }

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto p-6 md:p-12">

                <div className="col-span-1 md:col-span-8">
                    {/* HEADER */}
                    <div className="flex flex-row items-center gap-4 space-y-4 mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Shared Recording
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    {new Date(video.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            {/* Could add views/duration here if stored */}
                        </div>
                    </div>

                    {/* PLAYER */}
                    <div className="mb-8">
                        <VideoPlayer
                            src={videoUrl ?? undefined}
                            autoPlay={true}
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-3">
                            About this recording
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {video.description || "No description provided."}
                        </p>
                    </div>
                </div>

                {/* SIDEBAR: Description & Links */}
                <div className="col-span-1 md:col-span-4 space-y-8">

                    {/* Links Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-3">
                            Related Links
                        </h3>

                        {links.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic">No links attached.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block bg-card hover:bg-secondary border border-border rounded-xl overflow-hidden transition-all hover:shadow-md hover:border-primary/30"
                                    >
                                        {link.image && !link.previewFailed ? (
                                            <div className="h-28 w-full overflow-hidden relative bg-muted">
                                                <img
                                                    src={link.image || "/placeholder.svg"}
                                                    alt={link.title || "Link preview"}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                        ) : null}

                                        <div className="p-4 space-y-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <h4 className="font-semibold text-foreground line-clamp-2 leading-tight text-sm">
                                                    {link.title || link.url}
                                                </h4>
                                                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
                                            </div>

                                            {link.description && (
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    {link.description}
                                                </p>
                                            )}

                                            <div className="pt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                                <LinkIcon className="w-3 h-3" />
                                                {link.site || new URL(link.url).hostname}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
