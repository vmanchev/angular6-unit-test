import { Company } from './company.model';

export class User {
  id: number;
  name: string;
  email: string;
  address: any;
  phone: string;
  website: string;
  company: Company;
}
