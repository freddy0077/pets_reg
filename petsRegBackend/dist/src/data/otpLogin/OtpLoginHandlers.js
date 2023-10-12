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
exports.create = exports.deleteUser = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const OtpLoginController_1 = __importDefault(require("./OtpLoginController"));
const get = (otp) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return otp.get(input);
});
exports.get = get;
const getAll = (otp) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return otp.getAll(input);
});
exports.getAll = getAll;
const update = (otp) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return otp.update(input);
});
exports.update = update;
const insert = (otp) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return otp.insert(input);
});
exports.insert = insert;
const deleteUser = (otp) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return otp.deleteOtp(input);
});
exports.deleteUser = deleteUser;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = yield OtpLoginController_1.default.create(data);
        return {
            get: (0, exports.get)(otp),
            getAll: (0, exports.getAll)(otp),
            update: (0, exports.update)(otp),
            insert: (0, exports.insert)(otp),
            deleteUser: (0, exports.deleteUser)(otp)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=OtpLoginHandlers.js.map