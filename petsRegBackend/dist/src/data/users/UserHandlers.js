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
const UserController_1 = __importDefault(require("./UserController"));
const get = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.get(input);
});
exports.get = get;
const getAll = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getAll(input);
});
exports.getAll = getAll;
const update = (roles) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return roles.update(input);
});
exports.update = update;
const insert = (roles) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return roles.insert(input);
});
exports.insert = insert;
const deleteUser = (roles) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return roles.deleteUser(input);
});
exports.deleteUser = deleteUser;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserController_1.default.create(data);
        return {
            get: (0, exports.get)(users),
            getAll: (0, exports.getAll)(users),
            update: (0, exports.update)(users),
            insert: (0, exports.insert)(users),
            deleteUser: (0, exports.deleteUser)(users)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserHandlers.js.map