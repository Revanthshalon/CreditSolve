import Company from "./Company";

class Payment {
  _id!: string;
  date!: Date;
  amount!: number;
  company!: Company;
}

export default Payment;
