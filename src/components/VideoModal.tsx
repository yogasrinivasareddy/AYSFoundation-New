import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const getEmbedUrl = (rawUrl: string): string => {
  if (!rawUrl) return '';
  const shortsMatch = rawUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}?autoplay=1&rel=0`;
  }
  const watchMatch = rawUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}?autoplay=1&rel=0`;
  }
  const shortLinkMatch = rawUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortLinkMatch && shortLinkMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${shortLinkMatch[1]}?autoplay=1&rel=0`;
  }
  return rawUrl;
};

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
}) => {
  if (!isOpen) return null;

  const isShort = videoUrl.includes('/shorts/');
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className={`relative w-full ${isShort ? 'max-w-md' : 'max-w-4xl'} bg-stone-950 rounded-xl overflow-hidden shadow-2xl border border-stone-800`}>
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-900 border-b border-stone-800">
          <h3 className="font-serif text-base sm:text-lg text-stone-200 font-medium truncate pr-4">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
              title="Open directly on YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={`relative ${isShort ? 'aspect-[9/16] max-h-[75vh]' : 'aspect-video'} w-full bg-black mx-auto`}>
          {embedUrl.includes('youtube') || embedUrl.includes('youtu.be') || embedUrl.includes('vimeo') ? (
            <iframe
              src={embedUrl}
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
