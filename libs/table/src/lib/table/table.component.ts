// data-table.component.ts
import {
  Component,
  input,
  output,
  model,
  computed,
  contentChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TableColumn, TableSorting } from './table.models';
import { GetCellValuePipe } from './get-cell-value.pipe';
import { GetSortIconPipe } from './get-sort-icon.pipe';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, GetCellValuePipe, GetSortIconPipe],
})
export class TableComponent<T = any> {
  // Events
  readonly rowClick = output<T>();

  // Input signals for reactive state management
  readonly data = input.required<T[]>();
  readonly columns = input.required<TableColumn<T>[]>();

  // Model signals for two-way binding
  readonly sortColumn = model<string | null>(null);
  readonly sortDirection = model<TableSorting>('asc');

  // Public API with computed signals
  readonly displayData = computed(() => {
    const data = [...this.data()];
    const sortCol = this.sortColumn();

    if (sortCol) {
      return data.sort((a: any, b: any) => {
        const aValue = a[sortCol];
        const bValue = b[sortCol];

        if (aValue === bValue) return 0;

        const comparison = aValue > bValue ? 1 : -1;
        return this.sortDirection() === 'asc' ? comparison : -comparison;
      });
    }

    return data;
  });

  // Content projection for custom templates
  protected readonly headerTemplate =
    contentChild<TemplateRef<unknown>>('headerTemplate');
  protected readonly footerTemplate =
    contentChild<TemplateRef<unknown>>('footerTemplate');

  // Public methods
  protected sort(column: TableColumn<T>): void {
    if (!column.sortable) return;

    const key = column.key as string;

    if (this.sortColumn() === key) {
      // Toggle direction if already sorting by this column
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and reset direction
      this.sortColumn.set(key);
      this.sortDirection.set('asc');
    }
  }

  protected onRowClick(item: T): void {
    this.rowClick.emit(item);
  }
}
