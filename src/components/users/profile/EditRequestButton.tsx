import { Edit3 } from "lucide-react";

export function EditRequestButton({ handleOpen }: { handleOpen: () => void }) {
  return (
    <button
      type="button"
      className="text-textWhite flex text-xs hover:bg-hoverBg transition duration-200 cursor-pointer items-center gap-2 px-3 py-2 bg-mainBg border border-white/10 rounded-lg"
      onClick={handleOpen}
    >
      Request Edit
      <Edit3 size={12} />
    </button>
  );
}
