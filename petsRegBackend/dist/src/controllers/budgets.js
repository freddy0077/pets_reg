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
exports.deleteBudget = exports.updateBudget = exports.addBudget = exports.getBudget = exports.getBudgets = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const BudgetHandlers_1 = __importDefault(require("../data/budget/BudgetHandlers"));
exports.getBudgets = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const budgetHandler = yield BudgetHandlers_1.default.create(data);
    console.log("Body", req.query);
    const query = req.query.type ? { budget_item_id: req.params.id } : {};
    console.log("Query", req.params);
    const budgets = yield budgetHandler.getAll(query);
    res.respond({ data: budgets });
}));
exports.getBudget = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const budgetHandler = yield BudgetHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing budget id").status(400);
        throw new Error('Missing budget id');
    }
    const type = req.query.type ? { budget_item_id: req.params.id } : { id: req.params.id };
    const budget = yield budgetHandler.get(type);
    res.respond({ data: budget });
}));
exports.addBudget = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const budgetData = req.body;
    if (!budgetData) {
        res.status(400).send("Missing budget data");
        throw new Error('Missing budget data');
    }
    const data = yield DataProvider_1.default.create();
    const budgetHandler = yield BudgetHandlers_1.default.create(data);
    const budgetExists = yield budgetHandler.get({ budget_item_id: req.body.budget_item_id });
    let budget;
    if (budgetExists) {
        budget = yield budgetHandler.update(Object.assign({ id: budgetExists === null || budgetExists === void 0 ? void 0 : budgetExists.id }, req.body));
    }
    else {
        budget = yield budgetHandler.insert(budgetData);
    }
    res.respond({ data: budget });
}));
exports.updateBudget = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const budgetHandler = yield BudgetHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing budget id or update data").status(400);
        throw new Error('Missing budget id or update data');
    }
    const budget = yield budgetHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ budget });
}));
exports.deleteBudget = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const budgetHandler = yield BudgetHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing budget id").status(400);
        throw new Error('Missing budget id');
    }
    yield budgetHandler.deleteBudget({ id });
    res.respond({ message: 'Budget deleted successfully' });
}));
//# sourceMappingURL=budgets.js.map