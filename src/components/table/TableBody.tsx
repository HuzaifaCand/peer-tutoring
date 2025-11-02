import { TableBodyProps } from "./types";
import { TableRow } from "./TableRow";
import { EmptyTableBody } from "./EmptyTable";

export function TableBody<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
}: TableBodyProps<T>) {
  const MIN_ROWS = 5;

  if (data.length === 0) return <EmptyTableBody colSpan={columns.length} />;
  const phantomCount = Math.max(0, MIN_ROWS - data.length);
  const rowsToRender = [...data, ...Array(phantomCount).fill(null)];

  return (
    <tbody>
      {rowsToRender.map((row, i) => {
        if (row === null) {
          // phantom row
          return (
            <tr
              key={`phantom-${i}`}
              className="h-[48px] border-b border-muted/40 bg-transparent"
            >
              <td colSpan={columns.length} />
            </tr>
          );
        }

        return (
          <TableRow
            key={i}
            row={row}
            columns={columns}
            onClick={() => onRowClick?.(row)}
          />
        );
      })}
    </tbody>
  );
}
