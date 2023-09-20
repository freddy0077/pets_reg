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
exports.create = exports.deleteScope = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const ScopeData_1 = __importDefault(require("./ScopeData"));
const get = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return scopes.get(input);
});
exports.get = get;
const getAll = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return scopes.getAll(input);
});
exports.getAll = getAll;
const update = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return scopes.update(input);
});
exports.update = update;
const insert = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return scopes.insert(input);
});
exports.insert = insert;
const deleteScope = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return scopes.deleteScope(input);
});
exports.deleteScope = deleteScope;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const scopes = yield ScopeData_1.default.create(data);
        return {
            get: (0, exports.get)(scopes),
            getAll: (0, exports.getAll)(scopes),
            update: (0, exports.update)(scopes),
            insert: (0, exports.insert)(scopes),
            deleteScope: (0, exports.deleteScope)(scopes),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=ScopeController.js.map