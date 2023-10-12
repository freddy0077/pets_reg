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
exports.login = exports.getUser = exports.getPets = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const UserHandlers_1 = __importDefault(require("../data/users/UserHandlers"));
const auth_1 = require("../utils/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generalUtils_1 = require("../utils/generalUtils");
const PetHandlers_1 = __importDefault(require("../data/pets/PetHandlers"));
exports.getPets = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("body", req.body);
    const data = yield DataProvider_1.default.create();
    const petHandler = yield PetHandlers_1.default.create(data);
    const pets = yield petHandler.getAll({});
    return res.respond({
        data: pets
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
        if (userObject.coordinator) {
            return res.respond(Object.assign({}, jsonInfo));
        }
        return res.respond(Object.assign({}, jsonInfo));
    }
    return res.status(401).send({ message: "username or password incorrect!" });
}));
//# sourceMappingURL=pets.js.map