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
exports.create = exports.deleteDepartment = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const DepartmentController_1 = __importDefault(require("./DepartmentController"));
const get = (department) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return department.get(input);
});
exports.get = get;
const getAll = (department) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return department.getAll(input);
});
exports.getAll = getAll;
const update = (department) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return department.update(input);
});
exports.update = update;
const insert = (department) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return department.insert(input);
});
exports.insert = insert;
const deleteDepartment = (department) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return department.deleteDepartment(input);
});
exports.deleteDepartment = deleteDepartment;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const departments = yield DepartmentController_1.default.create(data);
        return {
            get: (0, exports.get)(departments),
            getAll: (0, exports.getAll)(departments),
            update: (0, exports.update)(departments),
            insert: (0, exports.insert)(departments),
            deleteCategory: (0, exports.deleteDepartment)(departments)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=DepartmentHandlers.js.map