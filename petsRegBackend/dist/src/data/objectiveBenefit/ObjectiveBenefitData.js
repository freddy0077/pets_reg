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
exports.create = exports.deleteBenefit = exports.update = exports.insert = exports.getAll = exports.get = void 0;
const config_1 = require("../../config");
const get = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return benefits().select().where(input).first();
});
exports.get = get;
const getAll = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = benefits().select("ObjectiveBenefit.*", "Benefit.change_benefit", "Benefit.measured_benefit").from('ObjectiveBenefit')
        .leftJoin('Benefit', 'Benefit.id', 'ObjectiveBenefit.benefit_id');
    if (input)
        query.where(input);
    return (yield query.orderBy("Benefit.created_at", "asc"));
});
exports.getAll = getAll;
const insert = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield benefits().insert(input, ['id']))[0];
});
exports.insert = insert;
const update = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input, updateFields = __rest(input, ["id"]);
    if (!id) {
        throw new Error("An ID must be provided to update a key change.");
    }
    return (yield benefits().where({ id }).update(updateFields, ['id']))[0];
});
exports.update = update;
const deleteBenefit = (benefits) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input;
    if (!id) {
        throw new Error("An ID must be provided to delete a key change.");
    }
    return yield benefits().where({ id }).del();
});
exports.deleteBenefit = deleteBenefit;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const benefits = () => data.postgres.withSchema(config_1.Database.schema).table('ObjectiveBenefit');
        return {
            get: (0, exports.get)(benefits),
            getAll: (0, exports.getAll)(benefits),
            update: (0, exports.update)(benefits),
            insert: (0, exports.insert)(benefits),
            deleteBenefit: (0, exports.deleteBenefit)(benefits),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=ObjectiveBenefitData.js.map