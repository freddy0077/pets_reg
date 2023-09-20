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
exports.create = exports.deleteIssueRegister = exports.update = exports.insert = exports.getAll = exports.get = void 0;
const config_1 = require("../../config");
const get = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return query().select().where(input).first();
});
exports.get = get;
const getAll = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const queries = query().select();
    if (input) {
        queries.where(input);
    }
    return queries.orderBy("created_at", "DESC");
});
exports.getAll = getAll;
const insert = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield query().insert(input, ['id']))[0];
});
exports.insert = insert;
const update = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input, updateFields = __rest(input, ["id"]);
    if (!id) {
        throw new Error("An ID must be provided to update an issue register.");
    }
    return (yield query().where({ id }).update(updateFields, ['id']))[0];
});
exports.update = update;
const deleteIssueRegister = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input;
    if (!id) {
        throw new Error("An ID must be provided to delete an issue register.");
    }
    return yield query().where({ id }).del();
});
exports.deleteIssueRegister = deleteIssueRegister;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const issueRegister = () => data.postgres.withSchema(config_1.Database.schema).table('IssueRegister');
        return {
            get: (0, exports.get)(issueRegister),
            getAll: (0, exports.getAll)(issueRegister),
            update: (0, exports.update)(issueRegister),
            insert: (0, exports.insert)(issueRegister),
            deleteIssueRegister: (0, exports.deleteIssueRegister)(issueRegister),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=IssueRegisterData.js.map