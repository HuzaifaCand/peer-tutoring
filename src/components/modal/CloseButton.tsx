export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="px-4 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-elevatedBg transition border border-white/5 focus:outline-none focus:bg-white/10 focus:border focus:border-white/30 hover:cursor-pointer"
    >
      Close
    </button>
  );
}
