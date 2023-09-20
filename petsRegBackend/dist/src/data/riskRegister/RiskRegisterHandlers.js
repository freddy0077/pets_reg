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
exports.create = exports.deleteRegister = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const RiskRegisterController_1 = __importDefault(require("./RiskRegisterController"));
const get = (risks) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return risks.get(input);
});
exports.get = get;
const getAll = (risks) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return risks.getAll(input);
});
exports.getAll = getAll;
const update = (risks) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return risks.update(input);
});
exports.update = update;
const insert = (risks) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return risks.insert(input);
});
exports.insert = insert;
const deleteRegister = (risks) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return risks.deleteRisk(input);
});
exports.deleteRegister = deleteRegister;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const riskRegister = yield RiskRegisterController_1.default.create(data);
        return {
            get: (0, exports.get)(riskRegister),
            getAll: (0, exports.getAll)(riskRegister),
            update: (0, exports.update)(riskRegister),
            insert: (0, exports.insert)(riskRegister),
            deleteRegister: (0, exports.deleteRegister)(riskRegister),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=RiskRegisterHandlers.js.map