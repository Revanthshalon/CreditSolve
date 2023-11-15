import Realm from "realm";
import Company from "./Company";

class Purchase extends Realm.Object<Purchase> {
  _id!: Realm.BSON.ObjectId;
  date!: Date;
  amount!: number;
  c_id!: string;
  u_id!: string;

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
      c_id: {
        type: "string",
        indexed: true,
        optional: false,
      },
      u_id: {
        type: "string",
        indexed: true,
        optional: false,
      },
    },
  };
}

export default Purchase;
