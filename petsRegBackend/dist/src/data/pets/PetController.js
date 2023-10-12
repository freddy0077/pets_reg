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
exports.create = exports.deletePet = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const PetData_1 = __importDefault(require("./PetData"));
const get = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.get(input);
});
exports.get = get;
const getAll = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getAll(input);
});
exports.getAll = getAll;
const update = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.update(input);
});
exports.update = update;
const insert = (plans) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return plans.insert(input);
});
exports.insert = insert;
const deletePet = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.deletePet(input);
});
exports.deletePet = deletePet;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield PetData_1.default.create(data);
        return {
            get: (0, exports.get)(users),
            getAll: (0, exports.getAll)(users),
            update: (0, exports.update)(users),
            insert: (0, exports.insert)(users),
            deletePet: (0, exports.deletePet)(users),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=PetController.js.map