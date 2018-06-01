import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changemePipe'
})
export class ChangemePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.toUpperCase();
  }

}
