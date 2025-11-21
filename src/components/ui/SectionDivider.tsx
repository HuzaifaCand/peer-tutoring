import clsx from "clsx";

export default function SectionDivider({
  invisible = false,
}: {
  invisible?: boolean;
}) {
  return (
    <div
      className={clsx(
        "my-8",
        invisible ? "invisible" : "border-b border-textWhite/10"
      )}
    />
  );
}
