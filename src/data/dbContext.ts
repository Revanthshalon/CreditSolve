import { createRealmContext } from "@realm/react";
import Company from "../models/Company";
import Purchase from "../models/Purchase";
import Payment from "../models/Payment";

const realmContext = createRealmContext({
  schema: [Company, Purchase, Payment],
  schemaVersion: 3,
});

export default realmContext;
