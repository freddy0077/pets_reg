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
exports.deleteIssueRegister = exports.updateIssueRegister = exports.addIssueRegister = exports.getIssueRegister = exports.getIssues = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const IssueRegisterHandlers_1 = __importDefault(require("../data/issueRegister/IssueRegisterHandlers"));
exports.getIssues = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield DataProvider_1.default.create();
    const issueRegisterHandler = yield IssueRegisterHandlers_1.default.create(data);
    console.log("body", req.query);
    let issues;
    if (req.query.key_change_id) {
        issues = (yield issueRegisterHandler.getAll({ key_change_id: (_a = req.query.key_change_id) === null || _a === void 0 ? void 0 : _a.toString() }));
    }
    // const issues = (await issueRegisterHandler.getAll()).map((iss, index) => {
    const mappedIssues = issues.map((iss, index) => {
        return Object.assign({ No: index + 1 }, iss);
    });
    res.respond({ data: mappedIssues });
}));
exports.getIssueRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const issueRegisterHandler = yield IssueRegisterHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing issue register id").status(400);
        throw new Error('Missing issue register id');
    }
    const issue = yield issueRegisterHandler.get({ id });
    res.respond({ issue });
}));
exports.addIssueRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const issueData = req.body;
    if (!issueData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }
    const data = yield DataProvider_1.default.create();
    const issueRegisterHandler = yield IssueRegisterHandlers_1.default.create(data);
    yield issueRegisterHandler.insert(issueData);
    res.respond({ message: "success" });
}));
exports.updateIssueRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const issueRegisterHandler = yield IssueRegisterHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing issue id or update data").status(400);
        throw new Error('Missing issue id or update data');
    }
    yield issueRegisterHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ message: "success" });
}));
exports.deleteIssueRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const issueRegisterHandler = yield IssueRegisterHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing issue register id").status(400);
        throw new Error('Missing issue register id');
    }
    yield issueRegisterHandler.deleteRegister({ id });
    res.respond({ message: 'Issue register deleted successfully' });
}));
//# sourceMappingURL=issueRegisters.js.map