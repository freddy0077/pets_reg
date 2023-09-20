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
exports.create = exports.deleteScope = exports.update = exports.insert = exports.getAll = exports.get = void 0;
const config_1 = require("../../config");
const get = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return scopes().select().where(input).first();
});
exports.get = get;
const getAll = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return scopes().select().where(input);
});
exports.getAll = getAll;
const insert = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield scopes().insert(input, ['id', "name"]))[0];
});
exports.insert = insert;
const update = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input, updateFields = __rest(input, ["id"]);
    if (!id) {
        throw new Error("An ID must be provided to update a scope.");
    }
    return (yield scopes().where({ id }).update(updateFields, ['id', 'name']))[0];
});
exports.update = update;
const deleteScope = (projects) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input;
    if (!id) {
        throw new Error("An ID must be provided to delete a scope.");
    }
    return yield projects().where({ id }).del();
});
exports.deleteScope = deleteScope;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const scopes = () => data.postgres.withSchema(config_1.Database.schema).table('Scope');
        return {
            get: (0, exports.get)(scopes),
            getAll: (0, exports.getAll)(scopes),
            update: (0, exports.update)(scopes),
            insert: (0, exports.insert)(scopes),
            deleteScope: (0, exports.deleteScope)(scopes),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=ScopeData.js.map