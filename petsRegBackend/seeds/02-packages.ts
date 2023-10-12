
// import {Database} from '../src/config'
import {DataProvider} from "../src/data";
import {randomUUID} from "crypto";


exports.seed = async function() {
    const provider = await DataProvider.create()
    const plans = () => provider.postgres.table('subscription_plans')

  return  plans().del()
    .then(async () => {
        return  plans().insert([
        {
            id: randomUUID().toString(),
            name: "Ordinary Membership",
            price: 70,
            duration: 365
        },

        {
            id: randomUUID().toString(),
            name: "Gold Membership",
            price: 120,
            duration: 365
        },

        {
            id: randomUUID().toString(),
            name: "VIP Membership",
            price: 270,
            duration: 365
        },
      ])
    })


}
