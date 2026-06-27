"use client";

import { useEffect, useState } from "react";

export default function TestClient() {
  const [text, setText] = useState("START");

  useEffect(() => {
    setText("CLIENT WORKS");
  }, []);

  return (
    <div className="mb-4 rounded bg-red-600 p-4 text-white font-bold">
      {text}
    </div>
  );
}
