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
exports.deleteRiskRegister = exports.updateRiskRegister = exports.addRiskRegister = exports.getRiskRegister = exports.getRisks = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const RiskRegisterHandlers_1 = __importDefault(require("../data/riskRegister/RiskRegisterHandlers"));
exports.getRisks = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield DataProvider_1.default.create();
    const riskRegisterHandler = yield RiskRegisterHandlers_1.default.create(data);
    console.log("body", req.query);
    let risks;
    if (req.query.key_change_id) {
        risks = (yield riskRegisterHandler.getAll({ key_change_id: (_a = req.query.key_change_id) === null || _a === void 0 ? void 0 : _a.toString() }));
    }
    const mappedRisks = risks.map((risk, index) => {
        return Object.assign({ No: index + 1 }, risk);
    });
    res.respond({ data: mappedRisks });
}));
exports.getRiskRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const riskRegisterHandler = yield RiskRegisterHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing risk register id").status(400);
        throw new Error('Missing risk register id');
    }
    const risk = yield riskRegisterHandler.get({ id });
    res.respond({ risk });
}));
exports.addRiskRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const riskData = req.body;
    if (!riskData) {
        res.status(400).send("Missing risk data");
        throw new Error('Missing risk data');
    }
    const data = yield DataProvider_1.default.create();
    const riskRegisterHandler = yield RiskRegisterHandlers_1.default.create(data);
    yield riskRegisterHandler.insert(riskData);
    res.respond({ message: "success" });
}));
exports.updateRiskRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const riskRegisterHandler = yield RiskRegisterHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing risk id or update data").status(400);
        throw new Error('Missing risk id or update data');
    }
    yield riskRegisterHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ message: "success" });
}));
exports.deleteRiskRegister = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const riskRegisterHandler = yield RiskRegisterHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing risk register id").status(400);
        throw new Error('Missing risk register id');
    }
    yield riskRegisterHandler.deleteRegister({ id });
    res.respond({ message: 'Risk register deleted successfully' });
}));
//# sourceMappingURL=riskRegisters.js.map