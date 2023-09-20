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
exports.deleteObjectiveBenefit = exports.updateObjectiveBenefit = exports.addObjectiveBenefit = exports.getObjectiveBenefit = exports.getObjectiveBenefits = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const ObjectiveBenefitHandlers_1 = __importDefault(require("../data/objectiveBenefit/ObjectiveBenefitHandlers"));
exports.getObjectiveBenefits = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const objectiveBenefitHandler = yield ObjectiveBenefitHandlers_1.default.create(data);
    console.log("Body", req.query);
    const objectiveBenefits = yield objectiveBenefitHandler.getAll({});
    res.respond({ data: objectiveBenefits });
}));
exports.getObjectiveBenefit = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const objectiveBenefitHandler = yield ObjectiveBenefitHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing objective benefit id").status(400);
        throw new Error('Missing objective benefit id');
    }
    const objectiveBenefit = yield objectiveBenefitHandler.get({ id });
    res.respond({ objectiveBenefit });
}));
exports.addObjectiveBenefit = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectiveBenefitData = req.body;
    if (!objectiveBenefitData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }
    const data = yield DataProvider_1.default.create();
    const objectiveBenefitHandler = yield ObjectiveBenefitHandlers_1.default.create(data);
    const objectiveBenefit = yield objectiveBenefitHandler.insert(objectiveBenefitData);
    res.respond({ objectiveBenefit });
}));
exports.updateObjectiveBenefit = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const objectiveBenefitHandler = yield ObjectiveBenefitHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing objective benefit id or update data").status(400);
        throw new Error('Missing objective benefit id or update data');
    }
    const objectiveBenefit = yield objectiveBenefitHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ objectiveBenefit });
}));
exports.deleteObjectiveBenefit = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const objectiveBenefitHandler = yield ObjectiveBenefitHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing objective benefit id").status(400);
        throw new Error('Missing objective benefit id');
    }
    yield objectiveBenefitHandler.deleteBenefit({ id });
    res.respond({ message: 'Objective benefit deleted successfully' });
}));
//# sourceMappingURL=objectiveBenefits.js.map