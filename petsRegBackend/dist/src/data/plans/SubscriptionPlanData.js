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
exports.create = exports.deletePlan = exports.update = exports.insert = exports.getAll = exports.get = void 0;
const get = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const qb = queryBuilder().select('plans.*')
        .from('plans')
        .where(input);
    return qb.first();
});
exports.get = get;
const getAll = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return queryBuilder().select().where(input).orderBy("created_at", "desc");
});
exports.getAll = getAll;
const insert = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield queryBuilder().insert(input, ['id']))[0];
});
exports.insert = insert;
const update = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input, updateFields = __rest(input, ["id"]);
    if (!id) {
        throw new Error("An ID must be provided to update a plan.");
    }
    return (yield queryBuilder().where({ id }).update(updateFields, ['id']))[0];
});
exports.update = update;
const deletePlan = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input;
    if (!id) {
        throw new Error("An ID must be provided to delete a plan.");
    }
    return yield queryBuilder().where({ id }).del();
});
exports.deletePlan = deletePlan;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const plans = () => data.postgres.table('subscription_plans');
        return {
            get: (0, exports.get)(plans),
            getAll: (0, exports.getAll)(plans),
            update: (0, exports.update)(plans),
            insert: (0, exports.insert)(plans),
            deletePlan: (0, exports.deletePlan)(plans),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=SubscriptionPlanData.js.map