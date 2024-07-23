import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unread'
})
export class UnreadPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 10) {
      return `${value}`;
    } else {
      return '9+'
    }
  }

}
