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
exports.create = exports.deleteKeyChange = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const KeyChangeData_1 = __importDefault(require("./KeyChangeData"));
const get = (keyChanges) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChanges.get(input);
});
exports.get = get;
const getAll = (keyChanges) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChanges.getAll(input);
});
exports.getAll = getAll;
const update = (keyChanges) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChanges.update(input);
});
exports.update = update;
const insert = (keyChanges) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChanges.insert(input);
});
exports.insert = insert;
const deleteKeyChange = (keyChanges) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChanges.deleteKeyChange(input);
});
exports.deleteKeyChange = deleteKeyChange;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const keyChanges = yield KeyChangeData_1.default.create(data);
        return {
            get: (0, exports.get)(keyChanges),
            getAll: (0, exports.getAll)(keyChanges),
            update: (0, exports.update)(keyChanges),
            insert: (0, exports.insert)(keyChanges),
            deleteKeyChange: (0, exports.deleteKeyChange)(keyChanges),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=KeyChangeController.js.map