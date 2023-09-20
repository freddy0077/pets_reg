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
exports.create = exports.deleteBenefit = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const BenefitData_1 = __importDefault(require("./BenefitData"));
const get = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return benefits.get(input);
});
exports.get = get;
const getAll = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return benefits.getAll(input);
});
exports.getAll = getAll;
const update = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return benefits.update(input);
});
exports.update = update;
const insert = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return benefits.insert(input);
});
exports.insert = insert;
const deleteBenefit = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return benefits.deleteBenefit(input);
});
exports.deleteBenefit = deleteBenefit;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const benefits = yield BenefitData_1.default.create(data);
        return {
            get: (0, exports.get)(benefits),
            getAll: (0, exports.getAll)(benefits),
            update: (0, exports.update)(benefits),
            insert: (0, exports.insert)(benefits),
            deleteBenefit: (0, exports.deleteBenefit)(benefits),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=BenefitController.js.map