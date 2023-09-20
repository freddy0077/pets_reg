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
const KeyChangeController_1 = __importDefault(require("./KeyChangeController"));
const get = (keyChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChange.get(input);
});
exports.get = get;
const getAll = (keyChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChange.getAll(input);
});
exports.getAll = getAll;
const update = (keyChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChange.update(input);
});
exports.update = update;
const insert = (keyChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChange.insert(input);
});
exports.insert = insert;
const deleteKeyChange = (keyChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return keyChange.deleteKeyChange(input);
});
exports.deleteKeyChange = deleteKeyChange;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const keyChanges = yield KeyChangeController_1.default.create(data);
        return {
            get: (0, exports.get)(keyChanges),
            getAll: (0, exports.getAll)(keyChanges),
            update: (0, exports.update)(keyChanges),
            insert: (0, exports.insert)(keyChanges),
            deleteKeyChange: (0, exports.deleteKeyChange)(keyChanges)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=KeyChangeHandlers.js.map