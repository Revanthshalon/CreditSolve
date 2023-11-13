import Realm from "realm";
import Company from "./Company";

class Purchase extends Realm.Object<Purchase> {
  _id!: Realm.BSON.ObjectId;
  date!: Date;
  amount!: number;
  company!: Company;

  static schema: Realm.ObjectSchema = {
    name: "Purchase",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "objectId",
        default: () => new Realm.BSON.ObjectId(),
      },
      date: {
        type: "date",
        default: () => new Date(),
      },
      amount: {
        type: "float",
        default: () => 0.0,
      },
      company: {
        type: "linkingObjects",
        objectType: "Company",
        property: "purchases",
      },
    },
  };
}

export default Purchase;
