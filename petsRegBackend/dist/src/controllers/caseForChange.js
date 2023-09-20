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
exports.deleteCaseForChange = exports.updateCaseForChange = exports.addCaseForChange = exports.getCaseForChange = exports.getCaseForChanges = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const CaseForChangeHandlers_1 = __importDefault(require("../data/caseForChange/CaseForChangeHandlers"));
exports.getCaseForChanges = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const caseForChangeHandler = yield CaseForChangeHandlers_1.default.create(data);
    console.log("Body", req.query);
    const caseForChanges = yield caseForChangeHandler.getAll({});
    res.respond({ data: caseForChanges });
}));
exports.getCaseForChange = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const caseForChangeHandler = yield CaseForChangeHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing Case for Change id").status(400);
        throw new Error('Missing Case for Change id');
    }
    const type = req.query.type ? { project_id: req.params.id } : { id };
    const caseForChange = yield caseForChangeHandler.get(type);
    res.respond({ data: caseForChange });
}));
exports.addCaseForChange = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const caseForChangeData = req.body;
    if (!caseForChangeData) {
        res.status(400).send("Missing Case for Change data");
        throw new Error('Missing Case for Change data');
    }
    const data = yield DataProvider_1.default.create();
    const caseForChangeHandler = yield CaseForChangeHandlers_1.default.create(data);
    let caseForChange;
    caseForChange = yield caseForChangeHandler.insert(caseForChangeData);
    res.respond({ data: caseForChange });
}));
exports.updateCaseForChange = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const caseForChangeHandler = yield CaseForChangeHandlers_1.default.create(data);
    const id = req.body.project_id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing Case for Change id or update data").status(400);
        throw new Error('Missing Case for Change id or update data');
    }
    const caseForChange = yield caseForChangeHandler.update(Object.assign(Object.assign({}, updateData), { project_id: id }));
    res.respond({ caseForChange });
}));
exports.deleteCaseForChange = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const caseForChangeHandler = yield CaseForChangeHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing Case for Change id").status(400);
        throw new Error('Missing Case for Change id');
    }
    yield caseForChangeHandler.deleteCaseForChange({ id });
    res.respond({ message: 'Case for Change deleted successfully' });
}));
//# sourceMappingURL=caseForChange.js.map