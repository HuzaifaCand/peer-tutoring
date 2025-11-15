type sizes = "sm" | "xs";

export const getInputClass = (size: sizes) => {
  const baseClass =
    "w-full rounded-md bg-elevatedBg px-2.5 py-1.5 text-textWhite focus:outline-none focus:ring-1 focus:ring-white/10";

  return baseClass + " " + (size === "sm" ? "text-sm" : "text-xs");
};

export const getLabelClass = (size: sizes) => {
  const baseClass = "block text-textMuted font-medium";
  return baseClass + " " + (size === "sm" ? "text-sm" : "text-xs");
};

export const getButtonClass = (size: sizes) => {
  const baseClass =
    "px-4 py-1.5 bg-hoverBg hover:bg-white/10 hover:cursor-pointer text-textWhite/90 border border-white/10 text-sm rounded-md font-medium transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-1 focus:ring-white/20";
  return baseClass + " " + (size === "sm" ? "text-sm" : "text-xs");
};
