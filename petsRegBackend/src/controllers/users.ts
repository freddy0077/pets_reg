import {catchErrors} from '../errors';
import DataProvider from "../data/DataProvider";
import UserHandlers from "../data/users/UserHandlers";
import {generateToken} from "../utils/auth";
import bcrypt from 'bcrypt';
import {parseJwt} from "../utils/generalUtils";
import PetHandlers from "../data/pets/PetHandlers";
import OtpLoginHandlers from "../data/otpLogin/OtpLoginHandlers";
import {randomUUID} from "crypto";

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

            return res.respond({
                ...jsonInfo
            });
        }

        return res.status(401).send({message: "username or password incorrect!"});
    })


export const otpLogin = catchErrors(async (req, res) => {
    // Initialize your data provider or database connection
    const data = await DataProvider.create();

    // Extract the OTP from the request body
    const { otp } = req.body;

    // Check if the OTP is provided
    if (!otp) {
        return res.status(400).send("OTP is required!");
    }

    // Fetch the OTP details from the database
    const userHandler = await UserHandlers.create(data);
    const otpHandler = await OtpLoginHandlers.create(data);
    const otpDetails = await otpHandler.get({ otp_code: otp });

    // Check if the OTP exists
    if (!otpDetails) {
        return res.status(400).send("Invalid OTP.");
    }

    // Check if the OTP has already been used
    if (otpDetails.used) {
        return res.status(400).send("This OTP has already been used.");
    }

    // Check if the OTP has expired
    const currentTime = Date.now();
    const otpExpirationTime = new Date(otpDetails.expiration_time).getTime();

    if (currentTime > otpExpirationTime) {
        return res.status(400).send("This OTP has expired.");
    }

    await otpHandler.update({used: true})

    // Here, the OTP is valid. You can continue with authentication and set the OTP to 'used'.
    // e.g., await otpHandler.markAsUsed(otpDetails.otp_id);

    const userObject = await userHandler.get({id: otpDetails.user_id})
    const token = generateToken(userObject)
    const jsonInfo = {
        ...userObject,
        token
    }

    return res.respond({
        ...jsonInfo
    });

});




// export const sendMemberOtp =
//     catchErrors(async (req, res) => {
//         const data = await DataProvider.create()
//         const { microchip_number } = req.body;
//
//         if (!microchip_number) {
//             return res.status(400).send("Microchip number is required!");
//         }
//
//         const memberExists = await (await PetHandlers.create(data)).get({microchip_number})
//
//         console.log("Member exists", memberExists)
//
//         if (memberExists) {
//             const otp = generateOtp();
//             await sendSms({
//                 numbers: memberExists.primary_phone,
//                 message: `Your verification code from Pets Registry is: ${otp}. Please do not share this code with anyone.`
//             });
//
//             return res.respond({});
//         }
//     });
//

export const sendMemberOtp = catchErrors(async (req, res) => {
    // Initialize your data provider or database connection
    const data = await DataProvider.create();

    // Extract the microchip_number from the request body
    const { microchip_number } = req.body;

    if (!microchip_number) {
        return res.status(400).send("Microchip number is required!");
    }

    // Fetch member details using the microchip_number
    const otpHandler = await OtpLoginHandlers.create(data);
    const petHandler = await PetHandlers.create(data);
    const memberExists = await petHandler.get({ microchip_number });

    if (!memberExists) {
        return res.status(404).send("Member with the given microchip number not found.");
    }

    // Generate OTP and send via SMS
    const otp = generateOtp();

    await sendSms({
        numbers: memberExists.phone_number,
        message: `Your verification code from Pets Registry is: ${otp}. Please do not share this code with anyone.`
    });

    await otpHandler.insert({
        id: randomUUID().toString(),
        user_id: memberExists?.user_id,
        otp_code: otp,
        channel: "sms",
    })

    // Here you would store the generated OTP in your database with related details like expiration_time, used status, etc.
    // e.g., await otpHandler.save({ otp_code: otp, user_id: memberExists.id, expiration_time: ... , used: false });

    return res.respond({});
});


//@ts-ignore
const sendSms = async ({ numbers, message }) => {
    const url = 'https://sms.nalosolutions.com/smsbackend/Nal_resl/send-message/';

    const payload = {
        key: "4g6s68e)o5fmhax6dv!_3e8(nu9_v_ji3sz@@hc1npwec)3v5l7bvj98vysdxc_s",
        msisdn: `${numbers}`,
        message: `${message}`,
        sender_id: "PETSREG"
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

