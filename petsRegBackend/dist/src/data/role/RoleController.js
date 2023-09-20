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
exports.create = exports.deleteRole = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const RoleData_1 = __importDefault(require("./RoleData"));
const get = (roles) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return roles.get(input);
});
exports.get = get;
const getAll = (roles) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return roles.getAll(input);
});
exports.getAll = getAll;
const update = (plans) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return plans.update(input);
});
exports.update = update;
const insert = (plans) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return plans.insert(input);
});
exports.insert = insert;
const deleteRole = (roles) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return roles.deleteRole(input);
});
exports.deleteRole = deleteRole;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = yield RoleData_1.default.create(data);
        return {
            get: (0, exports.get)(roles),
            getAll: (0, exports.getAll)(roles),
            update: (0, exports.update)(roles),
            insert: (0, exports.insert)(roles),
            deleteRole: (0, exports.deleteRole)(roles),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=RoleController.js.map