"use client";

import { useState } from "react";
import { toPng } from "html-to-image";

const EXPORT_RESOLUTIONS = {
  "full-hd": {
    label: "Full HD",
    width: 1920,
    height: 1080,
  },
  "4k-uhd": {
    label: "4K UHD",
    width: 3840,
    height: 2160,
  },
} as const;

type ExportResolutionKey = keyof typeof EXPORT_RESOLUTIONS;

const DEFAULT_RESOLUTION: ExportResolutionKey = "full-hd";

function getResolution(key: string) {
  return (
    EXPORT_RESOLUTIONS[key as ExportResolutionKey] ??
    EXPORT_RESOLUTIONS[DEFAULT_RESOLUTION]
  );
}

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const [resolutionKey, setResolutionKey] =
    useState<ExportResolutionKey>(DEFAULT_RESOLUTION);
  const selectedResolution = getResolution(resolutionKey);

  const exportImage = async () => {
    if (isExporting) return;

    const node =
      document.getElementById("export-area");

    if (!node) return;

    const resolution = getResolution(resolutionKey);

    setIsExporting(true);

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        width: resolution.width,
        height: resolution.height,
        canvasWidth: resolution.width,
        canvasHeight: resolution.height,
        pixelRatio: 1,
        style: {
          width: `${resolution.width}px`,
          height: `${resolution.height}px`,
        },
      });

      const link =
        document.createElement("a");

      link.download =
        `lineup-${resolution.width}x${resolution.height}-${Date.now()}.png`;

      link.href = dataUrl;

      link.click();
      link.remove();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-[1rem] border border-white/10 bg-slate-950/55 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl sm:flex-row sm:items-center">
      <label className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <span className="shrink-0 text-[0.68rem] font-black uppercase tracking-[0.16em] text-white/55">
          Export
        </span>
        <select
          value={resolutionKey}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setResolutionKey(
              value in EXPORT_RESOLUTIONS
                ? (value as ExportResolutionKey)
                : DEFAULT_RESOLUTION
            );
          }}
          disabled={isExporting}
          className="min-w-[9rem] rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm font-extrabold text-white outline-none transition focus:border-emerald-200/50 disabled:cursor-wait disabled:text-white/45"
        >
          {Object.entries(EXPORT_RESOLUTIONS).map(
            ([key, resolution]) => (
              <option key={key} value={key}>
                {resolution.label} {resolution.width}x{resolution.height}
              </option>
            )
          )}
        </select>
      </label>

      <button
        type="button"
        onClick={exportImage}
        disabled={isExporting}
        className="rounded-xl border border-emerald-100/15 bg-emerald-600 px-6 py-3 text-sm font-black text-white shadow-[0_12px_24px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.18)] transition hover:bg-emerald-500 disabled:cursor-wait disabled:bg-slate-800 disabled:text-white/45"
      >
        {isExporting
          ? "EXPORTING..."
          : `EXPORT ${selectedResolution.label}`}
      </button>
    </div>
  );
}
