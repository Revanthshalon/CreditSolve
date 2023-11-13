import Realm from "realm";
import Company from "./Company";

class Payment extends Realm.Object<Payment> {
  _id!: Realm.BSON.ObjectId;
  date!: Date;
  amount!: number;
  company!: Company;

  static schema: Realm.ObjectSchema = {
    name: "Payment",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "objectId",
        default: () => new Realm.BSON.ObjectId(),
      },
      date: {
        type: "date",
        default: () => Date(),
      },
      amount: {
        type: "float",
        default: () => 0.0,
      },
      company: {
        type: "linkingObjects",
        objectType: "Company",
        property: "payments",
      },
    },
  };
}

export default Payment;
