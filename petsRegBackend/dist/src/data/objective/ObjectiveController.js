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
exports.create = exports.deleteObjective = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const ObjectiveData_1 = __importDefault(require("./ObjectiveData"));
const get = (objectives) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return objectives.get(input);
});
exports.get = get;
const getAll = (objectives) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return objectives.getAll(input);
});
exports.getAll = getAll;
const update = (objectives) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return objectives.update(input);
});
exports.update = update;
const insert = (objectives) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return objectives.insert(input);
});
exports.insert = insert;
const deleteObjective = (objectives) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return objectives.deleteObjective(input);
});
exports.deleteObjective = deleteObjective;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectives = yield ObjectiveData_1.default.create(data);
        return {
            get: (0, exports.get)(objectives),
            getAll: (0, exports.getAll)(objectives),
            update: (0, exports.update)(objectives),
            insert: (0, exports.insert)(objectives),
            deleteObjective: (0, exports.deleteObjective)(objectives),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=ObjectiveController.js.map