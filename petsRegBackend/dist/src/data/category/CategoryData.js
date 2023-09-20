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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.deleteCategory = exports.update = exports.insert = exports.getAll = exports.get = void 0;
const config_1 = require("../../config");
const get = (categories) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return categories().select().where(input).first();
});
exports.get = get;
const getAll = (categories) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return categories().select().where(input);
});
exports.getAll = getAll;
const insert = (categories) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield categories().insert(input, ['id', "name"]))[0];
});
exports.insert = insert;
const update = (categories) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input, updateFields = __rest(input, ["id"]);
    if (!id) {
        throw new Error("An ID must be provided to update a category.");
    }
    return (yield categories().where({ id }).update(updateFields, ['id', 'name']))[0];
});
exports.update = update;
const deleteCategory = (categories) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input;
    if (!id) {
        throw new Error("An ID must be provided to delete a category.");
    }
    return yield categories().where({ id }).del();
});
exports.deleteCategory = deleteCategory;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = () => data.postgres.withSchema(config_1.Database.schema).table('Category');
        return {
            get: (0, exports.get)(categories),
            getAll: (0, exports.getAll)(categories),
            update: (0, exports.update)(categories),
            insert: (0, exports.insert)(categories),
            deleteCategory: (0, exports.deleteCategory)(categories),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=CategoryData.js.map