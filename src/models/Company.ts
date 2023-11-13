import Realm from "realm";
import Purchase from "./Purchase";
import Payment from "./Payment";
class Company extends Realm.Object<Company> {
  _id!: Realm.BSON.ObjectId;
  _uid!: string;
  name!: string;
  contact!: string;
  balance!: number;
  purchases?: Realm.List<Purchase>;
  payments?: Realm.List<Payment>;

  static schema: Realm.ObjectSchema = {
    name: "Company",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "objectId",
        default: () => new Realm.BSON.ObjectId(),
      },
      _uid: {
        type: "string",
        indexed: true,
        optional: false,
      },
      name: {
        type: "string",
        optional: false,
        indexed: true,
      },
      contact: {
        type: "string",
        optional: true,
      },
      balance: {
        type: "float",
        optional: false,
      },
      purchases: {
        type: "list",
        objectType: "Purchase",
      },
      payments: {
        type: "list",
        objectType: "Payment",
      },
    },
  };
}

export default Company;
