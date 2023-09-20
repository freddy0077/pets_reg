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
exports.create = exports.deleteChangeApproach = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const ChangeApproachData_1 = __importDefault(require("./ChangeApproachData"));
const get = (changeApproaches) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return changeApproaches.get(input);
});
exports.get = get;
const getAll = (changeApproaches) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return changeApproaches.getAll(input);
});
exports.getAll = getAll;
const update = (changeApproaches) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return changeApproaches.update(input);
});
exports.update = update;
const insert = (changeApproaches) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return changeApproaches.insert(input);
});
exports.insert = insert;
const deleteChangeApproach = (changeApproaches) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return changeApproaches.deleteChangeApproach(input);
});
exports.deleteChangeApproach = deleteChangeApproach;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const changeApproaches = yield ChangeApproachData_1.default.create(data);
        return {
            get: (0, exports.get)(changeApproaches),
            getAll: (0, exports.getAll)(changeApproaches),
            update: (0, exports.update)(changeApproaches),
            insert: (0, exports.insert)(changeApproaches),
            deleteChangeApproach: (0, exports.deleteChangeApproach)(changeApproaches),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=ChangeApproachController.js.map