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
exports.create = exports.deleteIssue = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const IssueRegisterData_1 = __importDefault(require("./IssueRegisterData"));
const get = (issues) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return issues.get(input);
});
exports.get = get;
const getAll = (issues) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return issues.getAll(input);
});
exports.getAll = getAll;
const update = (issues) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return issues.update(input);
});
exports.update = update;
const insert = (issues) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return issues.insert(input);
});
exports.insert = insert;
const deleteIssue = (issues) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return issues.deleteIssueRegister(input);
});
exports.deleteIssue = deleteIssue;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const issueRegister = yield IssueRegisterData_1.default.create(data);
        return {
            get: (0, exports.get)(issueRegister),
            getAll: (0, exports.getAll)(issueRegister),
            update: (0, exports.update)(issueRegister),
            insert: (0, exports.insert)(issueRegister),
            deleteIssue: (0, exports.deleteIssue)(issueRegister),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=IssueRegisterController.js.map