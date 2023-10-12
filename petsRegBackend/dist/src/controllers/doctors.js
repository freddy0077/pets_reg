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
exports.deleteDoctor = exports.updateDoctor = exports.addDoctor = exports.getDoctor = exports.getDoctors = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const DoctorHandlers_1 = __importDefault(require("../data/doctors/DoctorHandlers"));
const crypto_1 = require("crypto");
const bcrypt = __importStar(require("bcrypt"));
const UserHandlers_1 = __importDefault(require("../data/users/UserHandlers"));
exports.getDoctors = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const doctorHandler = yield DoctorHandlers_1.default.create(data);
    console.log("Body", req.query);
    const doctors = yield doctorHandler.getAll({});
    res.respond({ data: doctors });
}));
exports.getDoctor = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const doctorHandler = yield DoctorHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing doctor id").status(400);
        throw new Error('Missing doctor id');
    }
    const doctor = yield doctorHandler.get({ id });
    res.respond({ doctor });
}));
exports.addDoctor = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorData = req.body;
    if (!doctorData) {
        res.status(400).send("Missing doctor data");
        throw new Error('Missing doctor data');
    }
    const data = yield DataProvider_1.default.create();
    const doctorHandler = yield DoctorHandlers_1.default.create(data);
    const userHandler = yield UserHandlers_1.default.create(data);
    // const dataObject = {...doctorData, id: randomUUID().toString()}
    function formatDateForMySQL(date) {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }
    const hashedPassword = bcrypt.hashSync(doctorData.password, 10);
    const user_id = (0, crypto_1.randomUUID)().toString();
    const userDataObject = {
        id: user_id,
        full_name: doctorData === null || doctorData === void 0 ? void 0 : doctorData.name,
        email: doctorData === null || doctorData === void 0 ? void 0 : doctorData.email,
        password: hashedPassword,
        phone_number: doctorData === null || doctorData === void 0 ? void 0 : doctorData.phone,
        role: "doctor",
        created_at: formatDateForMySQL(new Date())
    };
    yield userHandler.insert(userDataObject);
    // console.log("User", user?.id)
    if (user_id) {
        const dataObject = Object.assign(Object.assign({}, doctorData), { id: (0, crypto_1.randomUUID)().toString(), user_id: user_id, password: hashedPassword, created_at: formatDateForMySQL(new Date()) });
        yield doctorHandler.insert(dataObject);
    }
    res.respond({ message: "success" });
}));
exports.updateDoctor = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const doctorHandler = yield DoctorHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing doctor id or update data").status(400);
        throw new Error('Missing doctor id or update data');
    }
    const doctor = yield doctorHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ doctor });
}));
exports.deleteDoctor = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const doctorHandler = yield DoctorHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing doctor id").status(400);
        throw new Error('Missing doctor id');
    }
    yield doctorHandler.deleteDoctor({ id });
    res.respond({ message: 'Doctor deleted successfully' });
}));
//# sourceMappingURL=doctors.js.map