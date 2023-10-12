"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMemberOtp = exports.otpLogin = exports.login = exports.getUser = exports.getUsers = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const UserHandlers_1 = __importDefault(require("../data/users/UserHandlers"));
const auth_1 = require("../utils/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generalUtils_1 = require("../utils/generalUtils");
const PetHandlers_1 = __importDefault(require("../data/pets/PetHandlers"));
const OtpLoginHandlers_1 = __importDefault(require("../data/otpLogin/OtpLoginHandlers"));
const crypto_1 = require("crypto");
exports.getUsers = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body", req.body);
    const data = yield DataProvider_1.default.create();
    const userHandler = yield UserHandlers_1.default.create(data);
    const users = yield userHandler.getAll({});
    return res.respond({
        data: users
    });
}));
exports.getUser = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let jwt = req.headers.authorization;
    const jwtKey = jwt && jwt.slice('bearer'.length).trim();
    const parsed = (0, generalUtils_1.parseJwt)(jwtKey);
    return res.respond({
        payload: parsed.payloadObject
    });
}));
exports.login = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("Email and password are required!");
    }
    const emailExists = yield (yield UserHandlers_1.default.create(data)).get({ email });
    const userObject = emailExists;
    const passwordMatch = emailExists && (yield bcrypt_1.default.compare(password, userObject.password));
    if (userObject && passwordMatch) {
        const token = (0, auth_1.generateToken)(userObject);
        const jsonInfo = Object.assign(Object.assign({}, userObject), { token });
        return res.respond(Object.assign({}, jsonInfo));
    }
    return res.status(401).send({ message: "username or password incorrect!" });
}));
exports.otpLogin = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize your data provider or database connection
    const data = yield DataProvider_1.default.create();
    // Extract the OTP from the request body
    const { otp } = req.body;
    // Check if the OTP is provided
    if (!otp) {
        return res.status(400).send("OTP is required!");
    }
    // Fetch the OTP details from the database
    const userHandler = yield UserHandlers_1.default.create(data);
    const otpHandler = yield OtpLoginHandlers_1.default.create(data);
    const otpDetails = yield otpHandler.get({ otp_code: otp });
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
    yield otpHandler.update({ used: true });
    // Here, the OTP is valid. You can continue with authentication and set the OTP to 'used'.
    // e.g., await otpHandler.markAsUsed(otpDetails.otp_id);
    const userObject = yield userHandler.get({ id: otpDetails.user_id });
    const token = (0, auth_1.generateToken)(userObject);
    const jsonInfo = Object.assign(Object.assign({}, userObject), { token });
    return res.respond(Object.assign({}, jsonInfo));
}));
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
exports.sendMemberOtp = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize your data provider or database connection
    const data = yield DataProvider_1.default.create();
    // Extract the microchip_number from the request body
    const { microchip_number } = req.body;
    if (!microchip_number) {
        return res.status(400).send("Microchip number is required!");
    }
    // Fetch member details using the microchip_number
    const otpHandler = yield OtpLoginHandlers_1.default.create(data);
    const petHandler = yield PetHandlers_1.default.create(data);
    const memberExists = yield petHandler.get({ microchip_number });
    if (!memberExists) {
        return res.status(404).send("Member with the given microchip number not found.");
    }
    // Generate OTP and send via SMS
    const otp = generateOtp();
    yield sendSms({
        numbers: memberExists.phone_number,
        message: `Your verification code from Pets Registry is: ${otp}. Please do not share this code with anyone.`
    });
    yield otpHandler.insert({
        id: (0, crypto_1.randomUUID)().toString(),
        user_id: memberExists === null || memberExists === void 0 ? void 0 : memberExists.user_id,
        otp_code: otp,
        channel: "sms",
    });
    // Here you would store the generated OTP in your database with related details like expiration_time, used status, etc.
    // e.g., await otpHandler.save({ otp_code: otp, user_id: memberExists.id, expiration_time: ... , used: false });
    return res.respond({});
}));
//@ts-ignore
const sendSms = ({ numbers, message }) => __awaiter(void 0, void 0, void 0, function* () {
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
        .then(response => response.json()) // assuming server responds with json
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});
//@ts-ignore
const sendSmsViaHubtel = ({ to, otp }) => __awaiter(void 0, void 0, void 0, function* () {
    const query = new URLSearchParams({
        clientid: 'lzzackjy',
        clientsecret: 'zcsfytbe',
        from: '233242953672',
        to: `${to}`,
        content: `Your OTP is: ${otp}`
    }).toString();
    const resp = yield fetch(`https://devp-sms03726-api.hubtel.com/v1/messages/send?${query}`, { method: 'GET' });
    const data = yield resp.text();
    console.log(data);
});
const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};
//# sourceMappingURL=users.js.map