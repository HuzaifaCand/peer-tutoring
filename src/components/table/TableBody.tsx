import { TableBodyProps } from "./types";
import { TableRow } from "./TableRow";
import { EmptyTableBody } from "./EmptyTable";

export function TableBody<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
}: TableBodyProps<T>) {
  if (data.length === 0) return <EmptyTableBody colSpan={columns.length} />;
  return (
    <tbody>
      {data.map((row, i) => (
        <TableRow
          key={i}
          row={row}
          columns={columns}
          onClick={() => onRowClick?.(row)}
        />
      ))}
    </tbody>
  );
}
