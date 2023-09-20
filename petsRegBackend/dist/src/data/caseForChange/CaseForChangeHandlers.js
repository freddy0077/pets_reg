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
exports.create = exports.deleteCaseForChange = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const CaseForChangeController_1 = __importDefault(require("./CaseForChangeController"));
const get = (caseForChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return caseForChange.get(input);
});
exports.get = get;
const getAll = (caseForChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return caseForChange.getAll(input);
});
exports.getAll = getAll;
const update = (caseForChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return caseForChange.update(input);
});
exports.update = update;
const insert = (caseForChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return caseForChange.insert(input);
});
exports.insert = insert;
const deleteCaseForChange = (caseForChange) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return caseForChange.deleteCaseForChange(input);
});
exports.deleteCaseForChange = deleteCaseForChange;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const caseForChanges = yield CaseForChangeController_1.default.create(data);
        return {
            get: (0, exports.get)(caseForChanges),
            getAll: (0, exports.getAll)(caseForChanges),
            update: (0, exports.update)(caseForChanges),
            insert: (0, exports.insert)(caseForChanges),
            deleteCaseForChange: (0, exports.deleteCaseForChange)(caseForChanges)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=CaseForChangeHandlers.js.map