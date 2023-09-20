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
exports.deleteProgress = exports.updateProject = exports.addProject = exports.getProgress = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const ProjectHandlers_1 = __importDefault(require("../data/project/ProjectHandlers"));
const HighLevelPlanHandlers_1 = __importDefault(require("../data/highLevelPlan/HighLevelPlanHandlers"));
exports.getProgress = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const projectHandler = yield ProjectHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing project id").status(400);
        throw new Error('Missing project id');
    }
    const project = yield projectHandler.get({ id });
    res.respond({ project });
}));
exports.addProject = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectData = req.body;
    console.log("Project data", projectData);
    if (!projectData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }
    const data = yield DataProvider_1.default.create();
    const projectHandler = yield ProjectHandlers_1.default.create(data);
    const highLevelPlanHandler = yield HighLevelPlanHandlers_1.default.create(data);
    const project = yield projectHandler.insert(projectData);
    if (project) {
        const steps = ['first_step', 'second_step', 'third_step', 'fourth_step'];
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            if (req.body[step]) {
                yield highLevelPlanHandler.insert({
                    project_id: project === null || project === void 0 ? void 0 : project.id,
                    description: req.body[step],
                    order: i + 1
                });
            }
        }
    }
    res.respond({ project });
}));
exports.updateProject = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const projectHandler = yield ProjectHandlers_1.default.create(data);
    const highLevelPlanHandler = yield HighLevelPlanHandlers_1.default.create(data);
    const id = req.body.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing project id or update data").status(400);
        throw new Error('Missing project id or update data');
    }
    const project = yield projectHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    if (project) {
        const steps = ['first_step', 'second_step', 'third_step', 'fourth_step'];
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            if (req.body[step]) {
                yield highLevelPlanHandler.update({
                    project_id: project === null || project === void 0 ? void 0 : project.id,
                    description: req.body[step],
                    order: i + 1
                });
            }
        }
    }
    res.respond({ project });
}));
exports.deleteProgress = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const projectHandler = yield ProjectHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing project id").status(400);
        throw new Error('Missing project id');
    }
    yield projectHandler.deleteProject({ id });
    res.respond({ message: 'Project deleted successfully' });
}));
//# sourceMappingURL=projects.js.map