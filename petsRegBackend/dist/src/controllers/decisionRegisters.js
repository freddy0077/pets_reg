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
exports.deleteDecisionRegister = exports.updateDecisionRegister = exports.addDecisionRegister = exports.getDecisionRegister = exports.getDecisions = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const DecisionRegisterHandlers_1 = __importDefault(require("../data/decisionRegister/DecisionRegisterHandlers"));
exports.getDecisions = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const decisionRegisterHandler = yield DecisionRegisterHandlers_1.default.create(data);
    console.log("body", req.query);
    const decisions = (yield decisionRegisterHandler.getAll()).map((dec, index) => {
        return Object.assign({ No: index + 1 }, dec);
    });
    res.respond({ data: decisions });
}));
exports.getDecisionRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const decisionRegisterHandler = yield DecisionRegisterHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing decision register id").status(400);
        throw new Error('Missing decision register id');
    }
    const scope = yield decisionRegisterHandler.get({ id });
    res.respond({ scope });
}));
exports.addDecisionRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scopeData = req.body;
    if (!scopeData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }
    const data = yield DataProvider_1.default.create();
    const decisionRegisterHandler = yield DecisionRegisterHandlers_1.default.create(data);
    yield decisionRegisterHandler.insert(scopeData);
    res.respond({ message: "success" });
}));
exports.updateDecisionRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const decisionRegisterHandler = yield DecisionRegisterHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing scope id or update data").status(400);
        throw new Error('Missing scope id or update data');
    }
    yield decisionRegisterHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ message: "success" });
}));
exports.deleteDecisionRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const decisionRegisterHandler = yield DecisionRegisterHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing decision register id").status(400);
        throw new Error('Missing decision register id');
    }
    yield decisionRegisterHandler.deleteRegister({ id });
    res.respond({ message: 'Decision register deleted successfully' });
}));
//# sourceMappingURL=decisionRegisters.js.map