import type React from "react";

import styles from "./Table.module.css";

type TableProps<T> = {
  data: T[];
  columns: {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
  }[];
  onRowClick?: (item: T) => void;
};

export function Table<T>({ data, columns, onRowClick }: TableProps<T>) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className={styles.th}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={styles.tr}
            onClick={() => onRowClick && onRowClick(item)}
          >
            {columns.map((column) => (
              <td key={column.key} className={styles.td}>
                {column.render
                  ? column.render(item)
                  : (item as Record<string, string>)[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
