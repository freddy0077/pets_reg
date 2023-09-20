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
exports.create = exports.deleteCategory = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const CategoryController_1 = __importDefault(require("./CategoryController"));
const get = (category) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return category.get(input);
});
exports.get = get;
const getAll = (category) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return category.getAll(input);
});
exports.getAll = getAll;
const update = (category) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return category.update(input);
});
exports.update = update;
const insert = (category) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return category.insert(input);
});
exports.insert = insert;
const deleteCategory = (category) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return category.deleteCategory(input);
});
exports.deleteCategory = deleteCategory;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield CategoryController_1.default.create(data);
        return {
            get: (0, exports.get)(categories),
            getAll: (0, exports.getAll)(categories),
            update: (0, exports.update)(categories),
            insert: (0, exports.insert)(categories),
            deleteCategory: (0, exports.deleteCategory)(categories)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=CategoryHandlers.js.map