"use client";

import { toPng } from "html-to-image";

export default function ExportButton() {

  const exportImage = async () => {
    const node =
      document.getElementById("export-area");

    if (!node) return;

    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const link =
      document.createElement("a");

    link.download =
      `lineup-${Date.now()}.png`;

    link.href = dataUrl;

    link.click();
  };

  return (
    <button
      onClick={exportImage}
      className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
    >
      EXPORT PNG
    </button>
  );
}
