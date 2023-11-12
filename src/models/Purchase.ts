import Company from "./Company";

class Purchase {
  _id!: string;
  date!: Date;
  amount!: number;
  company!: Company;
}

export default Purchase;
