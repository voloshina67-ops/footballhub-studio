export default function TopMenu() {
  const items = [
    "LINE UP",
    "TACTICS",
    "COMPARE",
    "STATS",
    "NEWS",
  ];

  return (
    <div className="mb-6 flex items-center justify-center gap-12 border-b border-slate-800 bg-[#071321] py-4">
      {items.map((item, i) => (
        <button
          key={item}
          className={
            i === 0
              ? "border-b-2 border-green-500 pb-2 font-bold text-green-400"
              : "pb-2 text-slate-400 hover:text-white transition"
          }
        >
          {item}
        </button>
      ))}
    </div>
  );
}
