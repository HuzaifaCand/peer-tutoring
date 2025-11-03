export default function TextLoader({
  height,
  width,
}: {
  height: string;
  width: string;
}) {
  return (
    <div
      className={`${width} ${height} rounded-md bg-white/10 animate-pulse`}
    />
  );
}
