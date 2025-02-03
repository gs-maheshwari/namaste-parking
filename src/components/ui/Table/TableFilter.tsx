import { useDebouncedCallback } from "use-debounce";

import styles from "./Table.module.css";

type FilterConfig = {
  key: string;
  type: InputType;
  label: string;
  options?: FilterOption[];
};

type FilterOption = {
  value: string;
  label: string;
};

type InputType = "select" | "date";

type TableFilterProps = {
  filters: Record<string, string>;
  filterConfig: FilterConfig[];
  onFilterChange: (filters: Record<string, string>) => void;
};

export function TableFilter({
  filters,
  filterConfig,
  onFilterChange,
}: TableFilterProps) {
  const handleChange = useDebouncedCallback((key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  }, 500);

  return (
    <div className={styles.filters}>
      {filterConfig.map((config) => (
        <div key={config.key} className={styles.filterItem}>
          <label htmlFor={config.key}>{config.label}</label>
          {config.type === "select" ? (
            <select
              id={config.key}
              value={filters[config.key] || ""}
              onChange={(e) => handleChange(config.key, e.target.value)}
            >
              <option value="">All</option>
              {config.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="date"
              id={config.key}
              value={filters[config.key] || ""}
              onChange={(e) => handleChange(config.key, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
