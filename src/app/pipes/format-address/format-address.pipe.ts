import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../../models/address.model';

@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {

  transform(address: Address): string {
    return `${address.street}, ${address.suite}, ${address.city} - ${address.zipcode}`;
  }

}
