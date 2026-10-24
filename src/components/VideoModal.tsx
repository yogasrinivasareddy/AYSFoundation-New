import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-stone-950 rounded-xl overflow-hidden shadow-2xl border border-stone-800">
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-900 border-b border-stone-800">
          <h3 className="font-serif text-lg text-stone-200 font-medium truncate pr-4">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800"
              title="Open externally"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative aspect-video w-full bg-black">
          {videoUrl.includes('youtube') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo') ? (
            <iframe
              src={videoUrl}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};
