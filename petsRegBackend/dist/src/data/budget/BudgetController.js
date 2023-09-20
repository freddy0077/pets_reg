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
exports.create = exports.deleteBudget = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const BudgetData_1 = __importDefault(require("./BudgetData"));
const get = (budgets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgets.get(input);
});
exports.get = get;
const getAll = (budgets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgets.getAll(input);
});
exports.getAll = getAll;
const update = (budgets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgets.update(input);
});
exports.update = update;
const insert = (budgets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgets.insert(input);
});
exports.insert = insert;
const deleteBudget = (budgets) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return budgets.deleteBudget(input);
});
exports.deleteBudget = deleteBudget;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const budgets = yield BudgetData_1.default.create(data);
        return {
            get: (0, exports.get)(budgets),
            getAll: (0, exports.getAll)(budgets),
            update: (0, exports.update)(budgets),
            insert: (0, exports.insert)(budgets),
            deleteBudget: (0, exports.deleteBudget)(budgets),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=BudgetController.js.map