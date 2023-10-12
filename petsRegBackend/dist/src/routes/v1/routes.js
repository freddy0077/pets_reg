"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.attachPublicRoutes = void 0;
const users = __importStar(require("../../controllers/users"));
const pets = __importStar(require("../../controllers/pets"));
const doctor = __importStar(require("../../controllers/doctors"));
const plan = __importStar(require("../../controllers/plans"));
const Auth = __importStar(require("../../middleware/auth"));
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const data_1 = require("../../data");
const PetHandlers_1 = __importDefault(require("../../data/pets/PetHandlers"));
const crypto_1 = require("crypto");
const UserHandlers_1 = __importDefault(require("../../data/users/UserHandlers"));
const SubscriptionHandlers_1 = __importDefault(require("../../data/subscriptions/SubscriptionHandlers"));
const dateUtil_1 = require("../../utils/dateUtil");
const attachPublicRoutes = (app) => {
    app.post('/api/v1/auth/login', users.login);
    app.get('/api/v1/user', Auth.authorize(), users.getUser);
    app.get('/api/v1/users', Auth.authorize(), users.getUsers);
    app.post('/api/v1/member/otp', users.sendMemberOtp);
    app.post('/api/v1/member/otp-login', users.otpLogin);
    app.post('/api/v1/payments', express_1.default.json(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const apiKey = process.env.PAYSTACK_API_KEY; // Load from environment variables
        const { ownerEmail, ownerAddress, ownerFullName, primaryPhone, secondaryPhone, petName, petType, breed, color, dob, location, microchipNumber, sex, specialMark, specialNotes, weight, doctor_id } = req.body;
        if (!(ownerEmail && ownerAddress && ownerFullName && primaryPhone)) {
            res.status(400).send("Required fields are missing!");
        }
        const petData = {
            id: (0, crypto_1.randomUUID)().toString(),
            pet_name: petName,
            pet_type: petType,
            breed,
            color,
            dob,
            location,
            microchip_number: microchipNumber,
            sex,
            special_mark: specialMark,
            special_notes: specialNotes,
            weight,
            owner_address: ownerAddress,
            owner_email: ownerEmail,
            owner_full_name: ownerFullName,
            primary_phone: primaryPhone,
            secondary_phone: secondaryPhone,
            doctor_id
        };
        try {
            const pet_id = yield insertPetData(petData);
            const paymentData = {
                email: ownerEmail,
                amount: 1,
                reference: pet_id,
                callback_url: process.env.CALLBACK_ENDPOINT,
            };
            const response = yield initializePayment(paymentData, apiKey);
            const { data } = response.data;
            res.send({ url: data.authorization_url, reference: pet_id });
        }
        catch (error) {
            console.error("Error occurred:", error);
            res.status(500).send('Payment initialization failed or database operation failed.');
        }
    }));
    // app.get('/api/v1/payments/verify/:reference', async (req, res) => {
    //   const apiKey = process.env.PAYSTACK_API_KEY;
    //
    //   const { reference } = req.params;
    //
    //   try {
    //     const response = await axios.get(`${process.env.TRANSACTION_STATUS_ENDPOINT}/${reference}`, {
    //       headers: {
    //         'Authorization': `Bearer ${apiKey}`
    //       }
    //     });
    //
    //     const { data } = response.data;
    //
    //     console.log("Data", data)
    //
    //     if (data.status === 'success' && data.gateway_response === "Approved") {
    //
    //       const data = await DataProvider.create()
    //       const handler = await PetHandlers.create(data)
    //       const subscriptionHandler = await SubscriptionHandlers.create(data)
    //
    //       const petObject = await handler.get({id: reference})
    //
    //       await handler.update({
    //         id: reference,
    //         active: true,
    //         subscribed: true
    //       })
    //
    //       const subscribed = (await subscriptionHandler.get({pet_id: petObject?.id}))
    //
    //       if (!subscribed){
    //         const currentDate = new Date();
    //         const formattedDate = formatDate(currentDate)
    //         const expiryDate = addDays(formattedDate, 365)
    //
    //         await subscriptionHandler.insert({
    //           id: randomUUID().toString(),
    //           user_id: petObject?.user_id,
    //           pet_id: petObject?.id,
    //           plan_id: null,
    //           start_date: formattedDate,
    //           end_date: expiryDate
    //         })
    //       }else if (subscribed){
    //         const expired = compareWithToday( subscribed.end_date )
    //         if (expired){
    //           return res.send({verified: false}).status(200);
    //         }else {
    //           return res.send({verified: true}).status(200);
    //         }
    //       }
    //
    //       res.send({verified: true}).status(200);
    //
    //     } else {
    //       res.send({verified: false}).status(200);
    //     }
    //   } catch (error) {
    //     console.log("Payment error", error)
    //     res.status(500).send('Verification failed');
    //   }
    // });
    app.get('/api/v1/payments/verify/:reference', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const apiKey = process.env.PAYSTACK_API_KEY;
        const { reference } = req.params;
        try {
            const response = yield axios_1.default.get(`${process.env.TRANSACTION_STATUS_ENDPOINT}/${reference}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            const { data } = response.data;
            console.log("Data", data);
            if (data.status === 'success' && data.gateway_response === "Approved") {
                const data = yield data_1.DataProvider.create();
                const handler = yield PetHandlers_1.default.create(data);
                const subscriptionHandler = yield SubscriptionHandlers_1.default.create(data);
                const petObject = yield handler.get({ id: reference });
                yield handler.update({
                    id: reference,
                    active: true,
                    subscribed: true
                });
                const subscribed = (yield subscriptionHandler.get({ pet_id: petObject === null || petObject === void 0 ? void 0 : petObject.id }));
                if (!subscribed) {
                    const currentDate = new Date();
                    const formattedDate = (0, dateUtil_1.formatDate)(currentDate);
                    const expiryDate = (0, dateUtil_1.addDays)(formattedDate, 365);
                    yield subscriptionHandler.insert({
                        id: (0, crypto_1.randomUUID)().toString(),
                        user_id: petObject === null || petObject === void 0 ? void 0 : petObject.user_id,
                        pet_id: petObject === null || petObject === void 0 ? void 0 : petObject.id,
                        plan_id: null,
                        start_date: formattedDate,
                        end_date: expiryDate
                    });
                }
                else if (subscribed) {
                    const expired = (0, dateUtil_1.compareWithToday)(subscribed.end_date);
                    if (expired) {
                        return res.send({ verified: false }).status(200);
                    }
                    else {
                        return res.send({ verified: true }).status(200);
                    }
                }
                res.send({ verified: true }).status(200);
            }
            else {
                res.send({ verified: false }).status(200);
            }
        }
        catch (error) {
            console.log("Payment error", error);
            res.status(500).send('Verification failed');
        }
    }));
    app.get('/callback-endpoint', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //@ts-ignore
        const reference = req.query.reference.toString();
        const data = yield data_1.DataProvider.create();
        const handler = yield PetHandlers_1.default.create(data);
        yield handler.update({
            id: reference,
            active: true
        });
        res.send("Transaction was successful or not, based on verification result.");
    }));
    const initializePayment = (paymentData, apiKey) => __awaiter(void 0, void 0, void 0, function* () {
        return yield axios_1.default.post(`${process.env.PAYSTACK_URL_ENDPOINT}`, paymentData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
    });
    const insertPetData = (petData) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const data = yield data_1.DataProvider.create();
        const petsHandler = yield PetHandlers_1.default.create(data);
        const userHandler = yield UserHandlers_1.default.create(data);
        const userObject = yield userHandler.get({ email: petData.owner_email });
        let userId;
        if (userObject) {
            yield userHandler.update({
                id: userObject.id,
                email: petData.owner_email,
                first_name: (_a = petData.owner_full_name) === null || _a === void 0 ? void 0 : _a.split(" ")[0],
                last_name: (_c = (_b = petData.owner_full_name) === null || _b === void 0 ? void 0 : _b.split(" ")) === null || _c === void 0 ? void 0 : _c[1],
                phone_number: petData.primary_phone,
                secondary_phone_number: petData.secondary_phone_number
            });
            userId = userObject.id;
        }
        else {
            userId = (0, crypto_1.randomUUID)().toString();
            yield userHandler.insert({
                id: userId,
                email: petData.owner_email,
                first_name: (_d = petData.owner_full_name) === null || _d === void 0 ? void 0 : _d.split(" ")[0],
                last_name: (_f = (_e = petData.owner_full_name) === null || _e === void 0 ? void 0 : _e.split(" ")) === null || _f === void 0 ? void 0 : _f[1],
                phone_number: petData.primary_phone,
                secondary_phone_number: petData.secondary_phone_number,
                address: petData.owner_address,
                location: petData.location,
                role: "member"
            });
        }
        const pet_id = (0, crypto_1.randomUUID)().toString();
        yield petsHandler.insert({
            id: pet_id,
            pet_name: petData.pet_name,
            pet_type: petData === null || petData === void 0 ? void 0 : petData.pet_type,
            breed: petData === null || petData === void 0 ? void 0 : petData.breed,
            color: petData.color,
            dob: petData.dob,
            microchip_number: petData.microchip_number,
            sex: petData.sex,
            special_mark: petData.special_mark,
            special_notes: petData.special_notes,
            user_id: userId,
            doctor_id: petData === null || petData === void 0 ? void 0 : petData.doctor_id
        });
        return pet_id;
    });
    //Doctor routes
    app.get('/api/v1/doctors', Auth.authorize(), doctor.getDoctors);
    app.get('/api/v1/doctors/:id', Auth.authorize(), doctor.getDoctors);
    app.post('/api/v1/doctors', Auth.authorize(), doctor.addDoctor);
    app.patch('/api/v1/doctors', Auth.authorize(), doctor.updateDoctor);
    app.delete('/api/v1/doctors/', Auth.authorize(), doctor.deleteDoctor);
    //Pet routes
    app.get('/api/v1/pets', Auth.authorize(), pets.getPets);
    app.get('/api/v1/pets/:id', Auth.authorize(), doctor.getDoctors);
    app.post('/api/v1/pets', Auth.authorize(), doctor.addDoctor);
    app.patch('/api/v1/pets', Auth.authorize(), doctor.updateDoctor);
    app.delete('/api/v1/pets/', Auth.authorize(), doctor.deleteDoctor);
    //Plan routes
    app.get('/api/v1/plans', Auth.authorize(), plan.getPlans);
    app.get('/api/v1/plans/:id', Auth.authorize(), plan.getPlan);
    app.post('/api/v1/plans', Auth.authorize(), plan.addPlan);
    app.patch('/api/v1/plans', Auth.authorize(), plan.updatePlan);
    app.delete('/api/v1/plans/', Auth.authorize(), plan.deletePlan);
};
exports.attachPublicRoutes = attachPublicRoutes;
//# sourceMappingURL=routes.js.map