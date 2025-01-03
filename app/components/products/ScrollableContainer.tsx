import React, { ReactNode, RefObject, useEffect, useRef } from 'react';

export function ScrollableContainer({ children }: { children: ReactNode[] }) {
  const spanRef: RefObject<HTMLSpanElement> | undefined = useRef(null);

  // kindly inspired from https://htmldom.dev/drag-to-scroll/
  let pos = {
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  };

  const mouseDownHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const span = spanRef.current!;

    pos = {
      left: span.scrollLeft,
      top: span.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    span.style.cursor = 'grabbing';
    span.style.userSelect = 'none';

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    const span = spanRef.current!;

    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    span.scrollTop = pos.top - dy;
    span.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = () => {
    const span = spanRef.current!;

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    span.style.cursor = 'grab';
    span.style.removeProperty('user-select');
  };

  const wheelHandler = (e: WheelEvent) => {
    if (window.innerWidth > 1024) return;

    const diff = e.deltaY || e.deltaX;

    spanRef.current!.scrollLeft += diff * 0.5;
    e.preventDefault();
  };

  useEffect(() => {
    spanRef.current!.addEventListener('wheel', wheelHandler, {
      passive: false,
    });
  });

  return (
    <span
      className="py-2 mt-2 flex flex-row flex-nowrap space-x-4 hide-scrollbar overflow-x-scroll cursor-grab touch-pan-x 
      lg:flex-col lg:overflow-hidden lg:pr-5 lg:hover:overflow-auto lg:touch-pan-y lg:max-w-[135px] lg:min-w-[135px] lg:mt-0 lg:space-x-0 lg:space-y-4
      "
      style={{
        maxHeight: 545,
        WebkitOverflowScrolling: 'touch',
      }}
      ref={spanRef}
      onMouseDown={mouseDownHandler}
      onClickCapture={(e) => {
        if (e.clientX != pos.x || e.clientY != pos.y) {
          e.stopPropagation();
        }
      }}
    >
      {children}
    </span>
  );
}
