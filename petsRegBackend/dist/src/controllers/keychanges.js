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
exports.deleteKeyChange = exports.updateKeyChange = exports.addKeyChange = exports.getKeyChange = exports.getKeyChanges = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const KeyChangeHandlers_1 = __importDefault(require("../data/keyChange/KeyChangeHandlers"));
exports.getKeyChanges = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const keyChangeHandler = yield KeyChangeHandlers_1.default.create(data);
    console.log("Body", req.query);
    const keyChanges = yield keyChangeHandler.getAll({});
    res.respond({ data: keyChanges });
}));
exports.getKeyChange = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const keyChangeHandler = yield KeyChangeHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing key change id").status(400);
        throw new Error('Missing key change id');
    }
    const keyChange = yield keyChangeHandler.get({ id });
    res.respond({ keyChange });
}));
exports.addKeyChange = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyChangeData = req.body;
    if (!keyChangeData) {
        res.status(400).send("Missing key change data");
        throw new Error('Missing key change data');
    }
    const data = yield DataProvider_1.default.create();
    const keyChangeHandler = yield KeyChangeHandlers_1.default.create(data);
    const keyChange = yield keyChangeHandler.insert(keyChangeData);
    res.respond({ keyChange });
}));
exports.updateKeyChange = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const keyChangeHandler = yield KeyChangeHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing key change id or update data").status(400);
        throw new Error('Missing key change id or update data');
    }
    const keyChange = yield keyChangeHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ keyChange });
}));
exports.deleteKeyChange = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const keyChangeHandler = yield KeyChangeHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing key change id").status(400);
        throw new Error('Missing key change id');
    }
    yield keyChangeHandler.deleteKeyChange({ id });
    res.respond({ message: 'Key change deleted successfully' });
}));
//# sourceMappingURL=keychanges.js.map