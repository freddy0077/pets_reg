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
exports.create = exports.deleteLesson = exports.insert = exports.update = exports.getAll = exports.get = void 0;
const LessonLearntLogData_1 = __importDefault(require("./LessonLearntLogData"));
const get = (lessons) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return lessons.get(input);
});
exports.get = get;
const getAll = (lessons) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return lessons.getAll(input);
});
exports.getAll = getAll;
const update = (lessons) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return lessons.update(input);
});
exports.update = update;
const insert = (lessons) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return lessons.insert(input);
});
exports.insert = insert;
const deleteLesson = (scopes) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return scopes.deleteLesson(input);
});
exports.deleteLesson = deleteLesson;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const lessons = yield LessonLearntLogData_1.default.create(data);
        return {
            get: (0, exports.get)(lessons),
            getAll: (0, exports.getAll)(lessons),
            update: (0, exports.update)(lessons),
            insert: (0, exports.insert)(lessons),
            deleteLesson: (0, exports.deleteLesson)(lessons),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=LessonLearntLogController.js.map