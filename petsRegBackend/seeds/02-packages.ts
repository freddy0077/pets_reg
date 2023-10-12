
// import {Database} from '../src/config'
import {DataProvider} from "../src/data";
import * as bcrypt from "bcrypt";
import {randomUUID} from "crypto";


exports.seed = async function() {
    const provider = await DataProvider.create()
    const users = () => provider.postgres.table('users')

  return  users().del()
    .then(async () => {
        const hashedPassword = bcrypt.hashSync("password", 10)
        return  users().insert([
        {
            id: randomUUID().toString(),
            phone_number: '233242953672', email: "frederickankamah988@gmail.com",
            password: hashedPassword,
            role: "super-admin"
        },

        {
            id: randomUUID().toString(),
            phone_number: '233242953673', email: "doctor@gmail.com",
            password: hashedPassword,
            role: "doctor"
        }

      ])
    })


}
