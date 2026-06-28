"use client";

import {
  memo,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import type { FieldPlayer } from "../store/lineupStore";

type Position = Pick<FieldPlayer, "x" | "y">;

type DragState = {
  pointerId: number;
  fieldRect: DOMRect;
  position: Position;
  animationFrame: number | null;
};

type DraggablePlayerProps = {
  player: FieldPlayer;
  fieldRef: RefObject<HTMLDivElement | null>;
  onMove: (id: number, x: number, y: number) => void;
};

const clampPercentage = (value: number) =>
  Math.max(0, Math.min(100, value));

function DraggablePlayer({
  player,
  fieldRef,
  onMove,
}: DraggablePlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    return () => {
      const animationFrame = dragRef.current?.animationFrame;

      if (animationFrame !== null && animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const getPosition = (
    clientX: number,
    clientY: number,
    fieldRect: DOMRect
  ): Position => ({
    x: clampPercentage(
      ((clientX - fieldRect.left) / fieldRect.width) * 100
    ),
    y: clampPercentage(
      ((clientY - fieldRect.top) / fieldRect.height) * 100
    ),
  });

  const renderPosition = ({ x, y }: Position) => {
    if (!playerRef.current) return;

    playerRef.current.style.left = `${x}%`;
    playerRef.current.style.top = `${y}%`;
  };

  const schedulePositionRender = (position: Position) => {
    const drag = dragRef.current;

    if (!drag) return;

    drag.position = position;

    if (drag.animationFrame !== null) return;

    drag.animationFrame = requestAnimationFrame(() => {
      const activeDrag = dragRef.current;

      if (!activeDrag) return;

      renderPosition(activeDrag.position);
      activeDrag.animationFrame = null;
    });
  };

  const finishDrag = (pointerId: number) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== pointerId) return;

    if (drag.animationFrame !== null) {
      cancelAnimationFrame(drag.animationFrame);
    }

    renderPosition(drag.position);
    dragRef.current = null;
    onMove(player.id, drag.position.x, drag.position.y);
  };

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (
      !event.isPrimary ||
      (event.pointerType === "mouse" && event.button !== 0)
    ) {
      return;
    }

    const fieldRect = fieldRef.current?.getBoundingClientRect();

    if (!fieldRect || fieldRect.width === 0 || fieldRect.height === 0) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      fieldRect,
      position: { x: player.x, y: player.y },
      animationFrame: null,
    };
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    schedulePositionRender(
      getPosition(event.clientX, event.clientY, drag.fieldRect)
    );
  };

  const handlePointerEnd = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    drag.position = getPosition(
      event.clientX,
      event.clientY,
      drag.fieldRect
    );
    finishDrag(event.pointerId);
  };

  const photoClassName =
    player.team === "home"
      ? "h-20 w-20 rounded-full border-[3px] border-blue-400 bg-white shadow-[0_0_20px_rgba(96,165,250,0.75)]"
      : "h-20 w-20 rounded-full border-[3px] border-red-400 bg-white shadow-[0_0_20px_rgba(248,113,113,0.75)]";

  return (
    <div
      ref={playerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onLostPointerCapture={(event) => finishDrag(event.pointerId)}
      style={{
        position: "absolute",
        left: `${player.x}%`,
        top: `${player.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
      className="touch-none select-none cursor-grab transition-transform hover:scale-110 active:cursor-grabbing"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={player.photo}
            alt={player.name}
            draggable={false}
            className={photoClassName}
          />

          {player.number && (
            <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-sm font-black text-black shadow-xl">
              {player.number}
            </div>
          )}
        </div>

        <div className="mt-2 max-w-[140px] text-center text-[13px] font-extrabold uppercase leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
          {player.name}
        </div>
      </div>
    </div>
  );
}

export default memo(DraggablePlayer);
