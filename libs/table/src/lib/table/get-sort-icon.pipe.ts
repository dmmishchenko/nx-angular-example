import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn, TableSorting } from './table.models';
@Pipe({
  name: 'getSortIcon',
  standalone: true,
})
export class GetSortIconPipe implements PipeTransform {
  transform<T = any>(
    column: TableColumn<T>,
    sortColumn: string | null,
    sortDirection: TableSorting
  ): string {
    if (!column.sortable) {
      return '';
    }

    const key = column.key as string;
    if (sortColumn !== key) {
      return 'sort';
    }

    return sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }
}
