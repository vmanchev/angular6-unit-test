import { FormatAddressPipe } from './format-address.pipe';
import { Address } from '../../models/address.model';

const pipe = new FormatAddressPipe();

const inputAddress = {
  street: 'Main str.',
  suite: 'ap. 22',
  city: 'Berlin',
  zipcode: '12345'
} as Address;

const outputAddress = 'Main str., ap. 22, Berlin - 12345';

describe('FormatAddressPipe', () => {

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format an Address object to string', () => {
    expect(pipe.transform(inputAddress)).toEqual(outputAddress);
  });

});
