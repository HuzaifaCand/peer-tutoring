import { TableLoadingProps } from "./types";

export function TableLoading<T extends Record<string, unknown>>({
  columns,
  rowCount = 6,
}: TableLoadingProps<T>) {
  return (
    <div className="overflow-hidden rounded-t-xl bg-mainBg shadow-md animate-fadeIn">
      <table className="w-full border-collapse text-[13px] text-textWhite">
        <thead className="bg-gradient-to-r from-elevatedBg to-elevatedBg/50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={String(col.key)}
                style={{ width: col.maxWidth }}
                className={`py-3 text-left text-xs font-semibold text-gray-300 ${
                  index === 0 ? "pl-6" : "pl-3"
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, i) => (
            <tr
              key={i}
              className="border-b border-white/5 hover:bg-transparent transition-all"
            >
              {columns.map((_, j) => (
                <td key={j} className={`p-3 ${j === 0 ? "pl-6" : "pl-3"}`}>
                  <div className="h-4 w-full max-w-[80%] bg-white/10 rounded-md overflow-hidden relative">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
