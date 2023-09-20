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
exports.deleteScope = exports.updateScope = exports.addScope = exports.getScope = exports.getScopes = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const ScopeHandlers_1 = __importDefault(require("../data/scope/ScopeHandlers"));
exports.getScopes = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const scopeHandler = yield ScopeHandlers_1.default.create(data);
    console.log("Body", req.query);
    const scopes = yield scopeHandler.getAll({});
    res.respond({ data: scopes });
}));
exports.getScope = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const scopeHandler = yield ScopeHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing scope id").status(400);
        throw new Error('Missing scope id');
    }
    const scope = yield scopeHandler.get({ id });
    res.respond({ scope });
}));
exports.addScope = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scopeData = req.body;
    if (!scopeData) {
        res.status(400).send("Missing project data");
        throw new Error('Missing project data');
    }
    const data = yield DataProvider_1.default.create();
    const scopeHandler = yield ScopeHandlers_1.default.create(data);
    const scope = yield scopeHandler.insert(scopeData);
    res.respond({ scope });
}));
exports.updateScope = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const scopeHandler = yield ScopeHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing scope id or update data").status(400);
        throw new Error('Missing scope id or update data');
    }
    const scope = yield scopeHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ scope });
}));
exports.deleteScope = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const scopeHandler = yield ScopeHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing scope id").status(400);
        throw new Error('Missing scope id');
    }
    yield scopeHandler.deleteScope({ id });
    res.respond({ message: 'Scope deleted successfully' });
}));
//# sourceMappingURL=scopes.js.map