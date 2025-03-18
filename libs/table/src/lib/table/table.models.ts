import { TemplateRef } from "@angular/core";

export interface TableColumn<T = unknown> {
  key: keyof T;
  header: string;
  cellTemplate?: TemplateRef<unknown>;
  sortable?: boolean;
  width?: string;
}

export type TableSorting = 'asc' | 'desc';
