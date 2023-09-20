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
exports.deleteLesson = exports.updateLesson = exports.addLesson = exports.getLessons = exports.getLesson = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const LessonsLearntLogHandlers_1 = __importDefault(require("../data/lessonsLearntLog/LessonsLearntLogHandlers"));
const generalUtils_1 = require("../utils/generalUtils");
// import {humanReadableDate} from "../utils/generalUtils";
exports.getLesson = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const lessonHandler = yield LessonsLearntLogHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing lesson id").status(400);
        throw new Error('Missing lesson id');
    }
    const lesson = yield lessonHandler.get({ id });
    res.respond({ data: lesson });
}));
exports.getLessons = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const lessonHandler = yield LessonsLearntLogHandlers_1.default.create(data);
    console.log("Body", req.params);
    // const lesson = await lessonHandler.getAll({})
    const lessons = (yield lessonHandler.getAll({})).map((dec, index) => {
        var _a;
        return Object.assign({ No: index + 1, created_at: (0, generalUtils_1.humanReadableDate)((_a = dec.created_at) === null || _a === void 0 ? void 0 : _a.toString()) }, dec);
    });
    res.respond({ data: lessons });
}));
exports.addLesson = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonData = req.body;
    if (!lessonData) {
        res.status(400).send("Missing lesson data");
        throw new Error('Missing lesson data');
    }
    const data = yield DataProvider_1.default.create();
    const lessonHandler = yield LessonsLearntLogHandlers_1.default.create(data);
    const lesson = yield lessonHandler.insert(lessonData);
    res.respond({ data: lesson });
}));
exports.updateLesson = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const lessonHandler = yield LessonsLearntLogHandlers_1.default.create(data);
    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing lesson id or update data").status(400);
        throw new Error('Missing lesson id or update data');
    }
    const lesson = yield lessonHandler.update(Object.assign(Object.assign({}, updateData), { id }));
    res.respond({ data: lesson });
}));
exports.deleteLesson = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const lessonHandler = yield LessonsLearntLogHandlers_1.default.create(data);
    const id = req.params.id;
    if (!id) {
        res.send("Missing lesson id").status(400);
        throw new Error('Missing lesson id');
    }
    yield lessonHandler.deleteLesson({ id });
    res.respond({ message: 'Lesson deleted successfully' });
}));
//# sourceMappingURL=lessons.js.map