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
exports.deleteBenefit = exports.updateBenefit = exports.addBenefit = exports.getBenefit = exports.getBenefits = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const BenefitHandlers_1 = __importDefault(require("../data/benefit/BenefitHandlers"));
exports.getBenefits = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const benefitHandler = yield BenefitHandlers_1.default.create(data);
    console.log("Body", req.query);
    const benefits = yield benefitHandler.getAll({});
    res.respond({ data: benefits });
}));
exports.getBenefit = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const benefitHandler = yield BenefitHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing benefit id").status(400);
        throw new Error('Missing benefit id');
    }
    const benefit = yield benefitHandler.get({ id });
    res.respond({ benefit });
}));
exports.addBenefit = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const benefitData = req.body;
    if (!benefitData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }
    const data = yield DataProvider_1.default.create();
    const benefitHandler = yield BenefitHandlers_1.default.create(data);
    const benefit = yield benefitHandler.insert(benefitData);
    res.respond({ benefit });
}));
exports.updateBenefit = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const benefitHandler = yield BenefitHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing benefit id or update data").status(400);
        throw new Error('Missing benefit id or update data');
    }
    const benefit = yield benefitHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ benefit });
}));
exports.deleteBenefit = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const benefitHandler = yield BenefitHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing benefit id").status(400);
        throw new Error('Missing benefit id');
    }
    yield benefitHandler.deleteBenefit({ id });
    res.respond({ message: 'Benefit deleted successfully' });
}));
//# sourceMappingURL=benefits.js.map