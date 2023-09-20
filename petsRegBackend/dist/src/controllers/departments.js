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
exports.deleteDepartment = exports.updateDepartment = exports.addDepartment = exports.getDepartment = exports.getDepartments = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const CategoryHandlers_1 = __importDefault(require("../data/category/CategoryHandlers"));
const DepartmentHandlers_1 = __importDefault(require("../data/department/DepartmentHandlers"));
exports.getDepartments = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const departmentHandler = yield DepartmentHandlers_1.default.create(data);
    console.log("Body", req.params);
    // const {name} = req.params
    const departments = yield departmentHandler.getAll({});
    res.respond({
        data: departments
    });
}));
exports.getDepartment = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const departmentHandler = yield DepartmentHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing department id").status(400);
        throw new Error('Missing department id');
    }
    const department = yield departmentHandler.get({ id });
    res.respond({ data: department });
}));
exports.addDepartment = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentData = req.body;
    if (!departmentData) {
        res.status(400).send("Missing category data");
        throw new Error('Missing category data');
    }
    const data = yield DataProvider_1.default.create();
    const departmentHandler = yield DepartmentHandlers_1.default.create(data);
    const department = yield departmentHandler.insert(departmentData);
    res.respond({ data: department });
}));
exports.updateDepartment = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const departmentHandler = yield CategoryHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing department id or update data").status(400);
        throw new Error('Missing department id or update data');
    }
    const department = yield departmentHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ data: department });
}));
exports.deleteDepartment = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const departmentHandler = yield DepartmentHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing category id").status(400);
        throw new Error('Missing category id');
    }
    yield departmentHandler.deleteCategory({ id });
    res.respond({ message: 'Category deleted successfully' });
}));
//# sourceMappingURL=departments.js.map