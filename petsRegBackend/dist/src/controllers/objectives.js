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
exports.deleteObjective = exports.updateObjective = exports.addObjective = exports.getObjective = exports.getObjectives = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const ObjectiveHandlers_1 = __importDefault(require("../data/objective/ObjectiveHandlers"));
const BenefitHandlers_1 = __importDefault(require("../data/benefit/BenefitHandlers"));
const ObjectiveBenefitHandlers_1 = __importDefault(require("../data/objectiveBenefit/ObjectiveBenefitHandlers"));
// import omit from  "omit"
exports.getObjectives = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const objectiveHandler = yield ObjectiveHandlers_1.default.create(data);
    console.log("Body", req.query);
    const objectives = yield objectiveHandler.getAll({});
    res.respond({ data: objectives });
}));
exports.getObjective = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const objectiveHandler = yield ObjectiveHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing objective id").status(400);
        throw new Error('Missing objective id');
    }
    const objectiveId = req.query ? { key_change_id: id } : { id };
    const objective = yield objectiveHandler.get(objectiveId);
    res.respond({ objective });
}));
exports.addObjective = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectiveData = req.body;
    if (!objectiveData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }
    const data = yield DataProvider_1.default.create();
    const objectiveHandler = yield ObjectiveHandlers_1.default.create(data);
    const objectiveExists = yield objectiveHandler.get({ key_change_id: req.body.key_change_id });
    let objective;
    if (objectiveExists) {
        objective = yield objectiveHandler.update({
            id: objectiveExists === null || objectiveExists === void 0 ? void 0 : objectiveExists.id,
            desired_out_come: req.body.desired_outcome,
            implementation_risk: req.body.implementation_risk,
            project_id: req.body.project_id,
            key_change_id: req.body.key_change_id
        });
    }
    else {
        objective = yield objectiveHandler.insert({
            desired_out_come: req.body.desired_outcome,
            implementation_risk: req.body.implementation_risk,
            project_id: req.body.project_id,
            key_change_id: req.body.key_change_id
        });
    }
    if (req.body.benefits) {
        const benefitHandler = yield BenefitHandlers_1.default.create(data);
        const objectiveBenefitHandler = yield ObjectiveBenefitHandlers_1.default.create(data);
        const benefits = req.body.benefits;
        // const benefitExists = objectiveBenefitHandler.get({objective_id: objective?.id })
        for (const bnft of benefits) {
            // @ts-ignore
            let benefitInserted;
            if (bnft.id === "") {
                benefitInserted = yield benefitHandler.insert({
                    change_benefit: bnft.content,
                    measured_benefit: bnft.details
                });
            }
            else {
                benefitInserted = yield benefitHandler.update({
                    id: bnft === null || bnft === void 0 ? void 0 : bnft.id,
                    change_benefit: bnft.content,
                    measured_benefit: bnft.details
                });
            }
            console.log("Benefit inserted", benefitInserted);
            console.log("Benefit inserted", bnft === null || bnft === void 0 ? void 0 : bnft.id);
            if (!(bnft === null || bnft === void 0 ? void 0 : bnft.id)) {
                yield objectiveBenefitHandler.insert({
                    benefit_id: benefitInserted === null || benefitInserted === void 0 ? void 0 : benefitInserted.id,
                    objective_id: objective === null || objective === void 0 ? void 0 : objective.id
                });
            }
            else {
                // const objectiveBenefitHandlerExists = await objectiveBenefitHandler.get({benefit_id: benefitInserted?.id, objective_id: objective?.id})
                // if (!objectiveBenefitHandlerExists){
                //     await objectiveBenefitHandler.insert({
                //         benefit_id:  benefitInserted?.id,
                //         objective_id: objective?.id
                //     })
                // }
            }
        }
    }
    res.respond({ data: objective });
}));
exports.updateObjective = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const objectiveHandler = yield ObjectiveHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing objective id or update data").status(400);
        throw new Error('Missing objective id or update data');
    }
    const objective = yield objectiveHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ objective });
}));
exports.deleteObjective = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const objectiveHandler = yield ObjectiveHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing objective id").status(400);
        throw new Error('Missing objective id');
    }
    yield objectiveHandler.deleteObjective({ id });
    res.respond({ message: 'Objective deleted successfully' });
}));
//# sourceMappingURL=objectives.js.map