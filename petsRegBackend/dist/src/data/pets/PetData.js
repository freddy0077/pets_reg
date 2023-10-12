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
exports.create = exports.deletePet = exports.update = exports.insert = exports.getAll = exports.get = void 0;
const get = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const qb = queryBuilder().select('pets.*', "users.phone_number")
        .from('pets')
        .leftJoin('users', 'users.id', 'pets.user_id');
    if (input && input.id) {
        qb.where("pets.id", input.id);
    }
    return qb.first();
});
exports.get = get;
const getAll = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return queryBuilder().select().where(input);
});
exports.getAll = getAll;
const insert = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    (yield queryBuilder().insert(input));
});
exports.insert = insert;
const update = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input, updateFields = __rest(input, ["id"]);
    if (!id) {
        throw new Error("An ID must be provided to update a pet.");
    }
    return (yield queryBuilder().where({ id }).update(updateFields, ['id']))[0];
});
exports.update = update;
const deletePet = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = input;
    if (!id) {
        throw new Error("An ID must be provided to delete a pet.");
    }
    return yield queryBuilder().where({ id }).del();
});
exports.deletePet = deletePet;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // const users = () => data.postgres.withSchema(Database.schema).table('User')
        const pets = () => data.postgres.table('pets');
        return {
            get: (0, exports.get)(pets),
            getAll: (0, exports.getAll)(pets),
            update: (0, exports.update)(pets),
            insert: (0, exports.insert)(pets),
            deletePet: (0, exports.deletePet)(pets),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=PetData.js.map