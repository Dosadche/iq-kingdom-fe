import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number, elipsis = true): string {
    if (value) {
        return this.truncate(value, limit, elipsis);
    } else {
        return '';
    }
}

  private truncate(value: string, limit: number, elipsis: boolean) {
      const sufix = elipsis ? '...' : '';
      return value.length < limit ? value : value.slice(0, limit) + sufix;
  }
}
