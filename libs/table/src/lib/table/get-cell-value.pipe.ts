import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'getCellValue',
  standalone: true,
})
export class GetCellValuePipe implements PipeTransform {
  transform<T = any>(value: T, key: keyof T): string {
    if (value && typeof value === 'object' && key in value) {
      return (value as Record<string, any>)[key as string];
    }
    return '';
  }
}
