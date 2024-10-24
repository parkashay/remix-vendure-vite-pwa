import { useState, useRef, useEffect } from 'react';

export function FullscreenImage({
  imageUrl,
  setShowFullScreen,
}: {
  imageUrl: string;
  setShowFullScreen: (value: boolean) => void;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      const rect = imageRef.current?.getBoundingClientRect();
      if (rect) {
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isZoomed && imageRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
    }
  };

  useEffect(() => {
    if (isZoomed && imageRef.current) {
      const img = imageRef.current;
      img.style.transformOrigin = `${position.x}px ${position.y}px`;
      img.style.transform = 'scale(2)';
      img.style.cursor = 'zoom-out';
    } else if (imageRef.current) {
      const img = imageRef.current;
      img.style.transform = 'scale(1)';
      img.style.cursor = 'zoom-in';
    }
  }, [isZoomed, position]);

  return (
    <div
      ref={containerRef}
      onClick={() => setShowFullScreen(false)}
      onMouseMove={handleMouseMove}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50 overflow-hidden"
    >
      <button
        onClick={() => setShowFullScreen(false)}
        className="absolute top-6 right-6 text-white text-2xl bg-primary/30 hover:bg-primary/50 px-3 py-1 rounded"
      >
        &times;
      </button>
      <img
        onClick={handleImageClick}
        ref={imageRef}
        src={imageUrl}
        alt="Fullscreen"
        className="max-w-full max-h-full object-contain transition-transform duration-200 ease-in-out"
      />
    </div>
  );
}
