"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Upload,
    RefreshCw,
    Trash2,
    ExternalLink,
    Copy,
    AlertCircle
} from "lucide-react";
import { formatTime } from "./utils";

type ReviewState = "review" | "uploading" | "success" | "error";

interface ReviewViewProps {
    reviewState: ReviewState;
    setReviewState: (state: ReviewState) => void;
    videoDescription: string;
    setVideoDescription: (description: string) => void;
    videoLinks: string[];
    setVideoLinks: (links: string[]) => void;
    recordedVideoUrl: string | null;
    recordingDuration: number;
    uploadProgress: number;
    shareData: { videoId: string; url: string } | null;
    uploadError: string | null;
    showDiscardDialog: boolean;
    setShowDiscardDialog: (show: boolean) => void;
    onUpload: () => void;
    onDiscard: () => void;
}

export function ReviewView({
    reviewState,
    setReviewState,
    videoDescription,
    setVideoDescription,
    videoLinks,
    setVideoLinks,
    recordedVideoUrl,
    recordingDuration,
    uploadProgress,
    shareData,
    uploadError,
    showDiscardDialog,
    setShowDiscardDialog,
    onUpload,
    onDiscard,
}: ReviewViewProps) {
    return (
        <div className=" grid grid-cols-1 md:grid-cols-12 gap-2 h-[calc(100vh-1rem)] animate-in fade-in slide-in-from-bottom-4 duration-500 p-2 md:p-8">
            {/* LEFT: Video Player */}
            <div className="rounded flex flex-col gap-4 min-h-0 col-span-1 md:col-span-8">
                <div className="flex items-center justify-between border border-slate-200 p-2 rounded bg-slate-100/80">
                    <h2 className="text-xl font-semibold">SnapCut | Record & Share -
                        {new Date().toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </h2>
                    <span className="text-sm font-mono text-muted-foreground bg-slate-200/80 px-2 py-1 rounded-lg">
                        {formatTime(recordingDuration)}
                    </span>
                </div>
                <div className="flex-1 bg-black rounded overflow-hidden border border-border shadow-sm">
                    {recordedVideoUrl && (
                        <video
                            src={recordedVideoUrl}
                            controls
                            className="w-full h-full object-contain"
                        />
                    )}
                </div>
            </div>

            {/* RIGHT: Actions */}
            <div className="rounded flex flex-col col-span-1 md:col-span-4">
                <div className="bg-card border rounded-lg p-6 shadow-sm space-y-6">
                    {/* 1. Review Mode */}
                    {reviewState === "review" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea
                                    placeholder="What's this video about?"
                                    className="w-full bg-background border px-3 py-2 rounded-md focus:ring-2 ring-primary/20 outline-none min-h-[80px] resize-none"
                                    value={videoDescription}
                                    onChange={(e) => setVideoDescription(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium">Links (Max 3)</label>
                                {videoLinks.map((link, index) => (
                                    <input
                                        key={index}
                                        type="url"
                                        placeholder={`Link #${index + 1}`}
                                        className="w-full bg-background border px-3 py-2 rounded-md focus:ring-2 ring-primary/20 outline-none text-sm"
                                        value={link}
                                        onChange={(e) => {
                                            const newLinks = [...videoLinks];
                                            newLinks[index] = e.target.value;
                                            setVideoLinks(newLinks);
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button size="lg" className="w-full gap-2 bg-primary hover:bg-primary/90" onClick={onUpload}>
                                    <Upload className="w-4 h-4" /> Upload Video
                                </Button>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" onClick={onDiscard} className="gap-2">
                                        <RefreshCw className="w-4 h-4" /> New Rec
                                    </Button>
                                    <Button variant="destructive" onClick={() => setShowDiscardDialog(true)} className="gap-2">
                                        <Trash2 className="w-4 h-4" /> Discard
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. Uploading Mode */}
                    {reviewState === "uploading" && (
                        <div className="space-y-6 py-8 animate-in fade-in zoom-in-95">
                            <div className="space-y-2 text-center">
                                <div className="text-2xl font-bold">{uploadProgress}%</div>
                                <Progress value={uploadProgress} className="h-2" />
                                <p className="text-sm text-muted-foreground">Uploading to secure storage...</p>
                            </div>
                        </div>
                    )}

                    {/* 3. Success Mode */}
                    {reviewState === "success" && shareData && (
                        <div className="space-y-6 animate-in fade-in zoom-in-95">
                            <div className="p-4 bg-green-500/10 text-green-500 rounded-lg flex items-center gap-3">
                                <ExternalLink className="w-5 h-5" />
                                <span className="font-semibold">Upload Complete!</span>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-muted-foreground">Share Link</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-muted px-3 py-2 rounded-md text-sm font-mono truncate border">
                                        {shareData.url}
                                    </div>
                                    <Button size="icon" variant="outline" onClick={() => navigator.clipboard.writeText(shareData.url)}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <Button className="w-full gap-2" asChild>
                                    <a href={shareData.url} target="_blank" rel="noopener noreferrer">
                                        Open Link <ExternalLink className="w-4 h-4" />
                                    </a>
                                </Button>
                                <Button variant="ghost" onClick={onDiscard} className="w-full">
                                    Record Another
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* 4. Error Mode */}
                    {reviewState === "error" && (
                        <div className="space-y-6 animate-in fade-in shake">
                            <div className="p-4 bg-red-500/10 text-red-500 rounded-lg flex items-center gap-3">
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-semibold">Upload Failed</span>
                            </div>
                            <p className="text-sm text-red-400">{uploadError || "Network error occurred."}</p>
                            <div className="flex flex-col gap-3">
                                <Button onClick={onUpload} className="w-full">Retry Upload</Button>
                                <Button variant="ghost" onClick={() => setReviewState("review")}>Cancel</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Discard Dialog */}
            {
                showDiscardDialog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-background p-6 rounded-lg shadow-xl max-w-sm w-full border">
                            <h3 className="text-lg font-semibold mb-2">Discard Recording?</h3>
                            <p className="text-sm text-muted-foreground mb-6">This action cannot be undone. You will lose the current video.</p>
                            <div className="flex justify-end gap-3">
                                <Button variant="ghost" onClick={() => setShowDiscardDialog(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={onDiscard}>Confirm Discard</Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
