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
exports.deleteChangeApproach = exports.updateChangeApproach = exports.addChangeApproach = exports.getChangeApproach = exports.getChangeApproaches = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const ChangeApproachHandlers_1 = __importDefault(require("../data/changeApproach/ChangeApproachHandlers"));
exports.getChangeApproaches = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const changeApproachHandler = yield ChangeApproachHandlers_1.default.create(data);
    console.log("Body", req.query);
    const changeApproaches = yield changeApproachHandler.getAll({});
    res.respond({ data: changeApproaches });
}));
exports.getChangeApproach = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const changeApproachHandler = yield ChangeApproachHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing change approach id").status(400);
        throw new Error('Missing change approach id');
    }
    const type = req.query.type ? { project_id: req.params.id } : { id };
    const changeApproach = yield changeApproachHandler.get(type);
    res.respond({ data: changeApproach });
}));
exports.addChangeApproach = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const changeApproachData = req.body;
    if (!changeApproachData) {
        res.status(400).send("Missing change approach data");
        throw new Error('Missing change approach data');
    }
    const data = yield DataProvider_1.default.create();
    const changeApproachHandler = yield ChangeApproachHandlers_1.default.create(data);
    const changeApproachExists = yield changeApproachHandler.get({ project_id: req.body.project_id });
    let changeApproach;
    if (changeApproachExists) {
        changeApproach = yield changeApproachHandler.update(Object.assign({ id: changeApproachExists === null || changeApproachExists === void 0 ? void 0 : changeApproachExists.id }, req.body));
    }
    else {
        changeApproach = yield changeApproachHandler.insert(changeApproachData);
    }
    res.respond({ data: changeApproach });
}));
exports.updateChangeApproach = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const changeApproachHandler = yield ChangeApproachHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing change approach id or update data").status(400);
        throw new Error('Missing change approach id or update data');
    }
    const changeApproach = yield changeApproachHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ changeApproach });
}));
exports.deleteChangeApproach = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const changeApproachHandler = yield ChangeApproachHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing change approach id").status(400);
        throw new Error('Missing change approach id');
    }
    yield changeApproachHandler.deleteChangeApproach({ id });
    res.respond({ message: 'Change approach deleted successfully' });
}));
//# sourceMappingURL=changeApproaches.js.map