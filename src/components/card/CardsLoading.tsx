function CardSkeleton() {
  return (
    <div className="rounded-xl bg-elevatedBg shadow-md p-6 text-sm animate-pulse">
      {/* Header */}
      <div className="mb-2 flex justify-between items-center">
        <div className="h-4 w-24 bg-white/10 rounded"></div>
        <div className="h-4 w-20 bg-white/10 rounded"></div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 sm:flex sm:justify-between sm:items-center space-y-2 py-4">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-white/10 rounded"></div>
          <div className="h-3 w-28 bg-white/10 rounded"></div>
        </div>
        {/* <div className="space-y-2">
          <div className="h-3 w-16 bg-white/10 rounded"></div>
          <div className="h-3 w-28 bg-white/10 rounded"></div>
        </div> */}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 pt-2 flex justify-between">
        <div className="h-3 w-16 bg-white/10 rounded"></div>
        <div className="h-3 w-12 bg-white/10 rounded"></div>
      </div>
    </div>
  );
}

interface CardLoadingProps {
  count?: number;
  layoutClassName: string;
}

export function CardsLoading({ count = 6, layoutClassName }: CardLoadingProps) {
  return (
    <div className={layoutClassName}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
