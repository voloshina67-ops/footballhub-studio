type Props = {
  number: number;
  name: string;
  photo?: string;
};

export default function PlayerCard({
  number,
  name,
  photo,
}: Props) {
  return (
    <div className="flex flex-col items-center">

      <div className="relative">

        <div className="absolute -left-1 -top-1 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/80 text-xs font-black text-white shadow-lg">
          {number}
        </div>

        <div className="h-[72px] w-[72px] overflow-hidden rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-md shadow-2xl">

          <img
            src={photo || "https://placehold.co/120x120"}
            alt={name}
            className="h-full w-full object-cover"
          />

        </div>

      </div>

      <div className="mt-2 min-w-[110px] rounded-xl border border-white/20 bg-black/40 px-3 py-1 backdrop-blur-md shadow-xl">

        <div className="truncate text-center text-[11px] font-bold uppercase tracking-wide text-white">
          {name}
        </div>

      </div>

    </div>
  );
}
