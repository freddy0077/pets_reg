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
exports.deleteBudgetItem = exports.updateBudgetItem = exports.addBudgetItem = exports.getBudgetItem = exports.getBudgetItems = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const BudgetItemHandlers_1 = __importDefault(require("../data/budgetItem/BudgetItemHandlers"));
exports.getBudgetItems = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const budgetItemHandler = yield BudgetItemHandlers_1.default.create(data);
    console.log("Body", req.query);
    const budgetItems = yield budgetItemHandler.getAll({});
    res.respond({ data: budgetItems });
}));
exports.getBudgetItem = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const budgetItemHandler = yield BudgetItemHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing budget item id").status(400);
        throw new Error('Missing budget item id');
    }
    const type = req.query.type ? { project_id: req.params.id } : { id };
    const budgetItem = yield budgetItemHandler.get(type);
    res.respond({ data: budgetItem });
}));
exports.addBudgetItem = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const budgetItemData = req.body;
    if (!budgetItemData) {
        res.status(400).send("Missing budget item data");
        throw new Error('Missing budget item data');
    }
    const data = yield DataProvider_1.default.create();
    const budgetItemHandler = yield BudgetItemHandlers_1.default.create(data);
    // const budgetItemExists = await budgetItemHandler.get({project_id: req.body.project_id})
    let budgetItem;
    // if (budgetItemExists){
    //     budgetItem = await budgetItemHandler.update({
    //         id: budgetItemExists?.id,
    //         ...req.body
    //     })
    // }else{
    budgetItem = yield budgetItemHandler.insert(budgetItemData);
    // }
    res.respond({ data: budgetItem });
}));
exports.updateBudgetItem = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const budgetItemHandler = yield BudgetItemHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing budget item id or update data").status(400);
        throw new Error('Missing budget item id or update data');
    }
    const budgetItem = yield budgetItemHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ budgetItem });
}));
exports.deleteBudgetItem = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const budgetItemHandler = yield BudgetItemHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing budget item id").status(400);
        throw new Error('Missing budget item id');
    }
    yield budgetItemHandler.deleteBudgetItem({ id });
    res.respond({ message: 'Budget item deleted successfully' });
}));
//# sourceMappingURL=budgetItems.js.map