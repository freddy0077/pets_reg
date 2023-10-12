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
const PetController_1 = __importDefault(require("./PetController"));
const get = (pets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return pets.get(input);
});
exports.get = get;
const getAll = (pets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return pets.getAll(input);
});
exports.getAll = getAll;
const update = (pets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return pets.update(input);
});
exports.update = update;
const insert = (pets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return pets.insert(input);
});
exports.insert = insert;
const deletePet = (pets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return pets.deletePet(input);
});
exports.deletePet = deletePet;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const pets = yield PetController_1.default.create(data);
        return {
            get: (0, exports.get)(pets),
            getAll: (0, exports.getAll)(pets),
            update: (0, exports.update)(pets),
            insert: (0, exports.insert)(pets),
            deletePet: (0, exports.deletePet)(pets)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=PetHandlers.js.map