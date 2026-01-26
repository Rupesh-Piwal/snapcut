"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  RefreshCw,
  Trash2,
  ExternalLink,
  Copy,
  AlertCircle,
  CheckCircle,
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-1rem)] animate-in fade-in duration-500 p-4 lg:p-8 bg-background">
      {/* LEFT: Video Player */}
      <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Video Preview
          </h2>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </h1>
            <span className="text-sm font-mono text-muted-foreground bg-secondary px-3 py-1.5 rounded-lg border border-border/50">
              {formatTime(recordingDuration)}
            </span>
          </div>
        </div>
        <div className="flex-1 bg-secondary rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
          {recordedVideoUrl && (
            <video
              src={recordedVideoUrl}
              controls
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      {/* RIGHT: Actions Panel */}
      <div className="lg:col-span-1 flex flex-col">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6 flex-1 flex flex-col justify-between">
          {/* 1. Review Mode */}
          {reviewState === "review" && (
            <div className="space-y-6 animate-in fade-in duration-300 flex flex-col flex-1">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Add details about your video..."
                  className="w-full bg-secondary border border-border px-4 py-3 rounded-lg focus:ring-2 ring-primary/30 outline-none min-h-[100px] resize-none text-sm placeholder:text-muted-foreground transition-all duration-200"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium text-foreground block mb-3">
                  Related Links (Optional)
                </label>
                <div className="space-y-2">
                  {videoLinks.map((link, index) => (
                    <input
                      key={index}
                      type="url"
                      placeholder={`Link ${index + 1}`}
                      className="w-full bg-secondary border border-border px-4 py-2.5 rounded-lg focus:ring-2 ring-primary/30 outline-none text-sm placeholder:text-muted-foreground transition-all duration-200"
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...videoLinks];
                        newLinks[index] = e.target.value;
                        setVideoLinks(newLinks);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-border">
                <Button
                  size="lg"
                  className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                  onClick={onUpload}
                >
                  <Upload className="w-4 h-4" /> Upload Video
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={onDiscard}
                    className="gap-2 transition-all duration-200 bg-transparent"
                  >
                    <RefreshCw className="w-4 h-4" /> New
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDiscardDialog(true)}
                    className="gap-2 text-destructive hover:text-destructive transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" /> Discard
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Uploading Mode */}
          {reviewState === "uploading" && (
            <div className="space-y-6 py-8 animate-in fade-in duration-300 flex flex-col items-center justify-center flex-1">
              <div className="space-y-4 text-center w-full">
                <div className="flex justify-center">
                  <div className="relative w-12 h-12">
                    <svg
                      className="w-full h-full animate-spin"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-border"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="141 283"
                        className="text-primary"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-foreground">
                    {uploadProgress}%
                  </div>
                  <Progress value={uploadProgress} className="h-2.5" />
                  <p className="text-sm text-muted-foreground">
                    Uploading your video...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. Success Mode */}
          {reviewState === "success" && shareData && (
            <div className="space-y-6 animate-in fade-in duration-300 flex flex-col flex-1">
              <div className="p-4 bg-emerald-50/60 border border-emerald-200/40 text-emerald-700 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold">Upload Complete</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-muted-foreground">
                  Your Share Link
                </label>
                <div className="flex gap-2 items-stretch">
                  <div className="flex-1 bg-secondary px-4 py-3 rounded-lg text-xs font-mono truncate border border-border text-muted-foreground">
                    {shareData.url}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(shareData.url)}
                    className="transition-all duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-border mt-auto">
                <Button className="w-full gap-2" asChild>
                  <a
                    href={shareData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Link <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={onDiscard}
                  className="w-full transition-all duration-200 bg-transparent"
                >
                  Record Another
                </Button>
              </div>
            </div>
          )}

          {/* 4. Error Mode */}
          {reviewState === "error" && (
            <div className="space-y-6 animate-in fade-in duration-300 flex flex-col flex-1">
              <div className="p-4 bg-red-50/60 border border-red-200/40 text-red-700 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-semibold">Upload Failed</span>
              </div>
              <p className="text-sm text-red-600">
                {uploadError || "An error occurred. Please try again."}
              </p>
              <div className="flex flex-col gap-3 mt-auto">
                <Button
                  onClick={onUpload}
                  className="w-full transition-all duration-200"
                >
                  Retry Upload
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setReviewState("review")}
                  className="w-full transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Discard Dialog */}
      {showDiscardDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-background p-6 rounded-xl shadow-xl max-w-sm w-full border border-border mx-4 animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Discard Recording?
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              This action cannot be undone. Your video will be permanently
              deleted.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDiscardDialog(false)}
                className="transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={onDiscard}
                className="text-destructive hover:text-destructive transition-all duration-200 bg-transparent"
              >
                Confirm Discard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
