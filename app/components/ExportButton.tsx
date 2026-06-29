"use client";

import { useState } from "react";
import { toPng } from "html-to-image";

const EXPORT_WIDTH = 1920;
const EXPORT_HEIGHT = 1080;

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const exportImage = async () => {
    if (isExporting) return;

    const node =
      document.getElementById("export-area");

    if (!node) return;

    setIsExporting(true);

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        width: EXPORT_WIDTH,
        height: EXPORT_HEIGHT,
        canvasWidth: EXPORT_WIDTH,
        canvasHeight: EXPORT_HEIGHT,
        pixelRatio: 1,
        style: {
          width: `${EXPORT_WIDTH}px`,
          height: `${EXPORT_HEIGHT}px`,
        },
      });

      const link =
        document.createElement("a");

      link.download =
        `lineup-${Date.now()}.png`;

      link.href = dataUrl;

      link.click();
      link.remove();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={exportImage}
      disabled={isExporting}
      className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:bg-blue-900 disabled:text-white/60"
    >
      {isExporting ? "EXPORTING..." : "EXPORT PNG"}
    </button>
  );
}
