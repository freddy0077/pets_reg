import {catchErrors} from '../errors';
import DataProvider from "../data/DataProvider";
import UserHandlers from "../data/users/UserHandlers";
import {generateToken} from "../utils/auth";
import bcrypt from 'bcrypt';
import {parseJwt} from "../utils/generalUtils";
import PetHandlers from "../data/pets/PetHandlers";

export const getUsers =
    catchErrors(async (req, res) => {
        console.log("body", req.body)
        const data = await DataProvider.create()
        const userHandler = await UserHandlers.create(data)
        const users = await userHandler.getAll({})
        return res.respond({
            data: users
        })
    })

export const getUser =
    catchErrors(async (req, res) => {
        let jwt = req.headers.authorization
        const jwtKey = jwt && jwt.slice('bearer'.length).trim()
        const parsed = parseJwt(jwtKey)
        return res.respond({
            payload: parsed.payloadObject
        })
    })

export const login =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const { email, password } = req.body;

        if (!(email && password )) {
            res.status(400).send("Email and password are required!");
        }

        const emailExists    =   await (await UserHandlers.create(data)).get({email})

        const userObject = emailExists
        const passwordMatch = emailExists && await bcrypt.compare(password, userObject.password)

        if (userObject && passwordMatch) {
            const token = generateToken(userObject)
            const jsonInfo = {
                ...userObject,
                token
            }

            if (userObject.coordinator){
                return res.respond({
                    ...jsonInfo
                });
            }

            return res.respond({
                ...jsonInfo
            });
        }

        return res.status(401).send({message: "username or password incorrect!"});
    })


export const sendMemberOtp =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const { microchip_number } = req.body;

        if (!microchip_number) {
            return res.status(400).send("Microchip number is required!");
        }

        const memberExists = await (await PetHandlers.create(data)).get({microchip_number})

        if (memberExists) {
            const otp = generateOtp();
            await sendSms({
                numbers: "233242953672",
                message: `Your verification code from Pets Registry is: ${otp}. Please do not share this code with anyone.`
            });

            return res.respond({});
        }
    });

//@ts-ignore
const sendSms = async ({ numbers, message }) => {
    const url = 'https://sms.nalosolutions.com/smsbackend/Nal_resl/send-message/';

    const payload = {
        key: "4g6s68e)o5fmhax6dv!_3e8(nu9_v_ji3sz@@hc1npwec)3v5l7bvj98vysdxc_s",
        msisdn: `${numbers}`,
        message: `${message}`,
        sender_id: "PETREG"
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())  // assuming server responds with json
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

//@ts-ignore
const sendSmsViaHubtel = async ({ to, otp }) => {
    const query = new URLSearchParams({
        clientid: 'lzzackjy',
        clientsecret: 'zcsfytbe',
        from: '233242953672',
        to: `${to}`,
        content: `Your OTP is: ${otp}`
    }).toString();

    const resp = await fetch(
        `https://devp-sms03726-api.hubtel.com/v1/messages/send?${query}`,
        { method: 'GET' }
    );

    const data = await resp.text();
    console.log(data);
}

const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

