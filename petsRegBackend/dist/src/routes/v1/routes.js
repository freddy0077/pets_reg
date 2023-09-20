"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachPublicRoutes = void 0;
const users = __importStar(require("../../controllers/users"));
const projects = __importStar(require("../../controllers/projects"));
const scopes = __importStar(require("../../controllers/scopes"));
const categories = __importStar(require("../../controllers/categories"));
const departments = __importStar(require("../../controllers/departments"));
const lessons = __importStar(require("../../controllers/lessons"));
const decisionRegisters = __importStar(require("../../controllers/decisionRegisters"));
const issueRegisters = __importStar(require("../../controllers/issueRegisters"));
const riskRegisters = __importStar(require("../../controllers/riskRegisters"));
const keychanges = __importStar(require("../../controllers/keychanges"));
const objectives = __importStar(require("../../controllers/objectives"));
const benefits = __importStar(require("../../controllers/benefits"));
const objectiveBenefits = __importStar(require("../../controllers/objectiveBenefits"));
const changeApproaches = __importStar(require("../../controllers/changeApproaches"));
const budgets = __importStar(require("../../controllers/budgets"));
const budgetItems = __importStar(require("../../controllers/budgetItems"));
const caseForChanges = __importStar(require("../../controllers/caseForChange"));
const Auth = __importStar(require("../../middleware/auth"));
const attachPublicRoutes = (app) => {
    app.post('/api/v1/auth/login', users.login);
    app.get('/api/v1/user', Auth.authorize(), users.getUser);
    app.get('/api/v1/users', Auth.authorize(), users.getUsers);
    //Project routes
    app.get('/api/v1/projects/:id', Auth.authorize(), projects.getProgress);
    app.post('/api/v1/projects', Auth.authorize(), projects.addProject);
    app.patch('/api/v1/projects', Auth.authorize(), projects.updateProject);
    app.delete('/api/v1/projects/', Auth.authorize(), projects.deleteProgress);
    //Scope routes
    app.get('/api/v1/scopes', Auth.authorize(), scopes.getScopes);
    app.get('/api/v1/scopes/:id', Auth.authorize(), scopes.getScope);
    app.post('/api/v1/scopes', Auth.authorize(), scopes.addScope);
    app.patch('/api/v1/scopes', Auth.authorize(), scopes.updateScope);
    app.delete('/api/v1/scopes/', Auth.authorize(), scopes.deleteScope);
    //Key Change routes
    app.get('/api/v1/key-changes', Auth.authorize(), keychanges.getKeyChanges);
    app.get('/api/v1/key-changes/:id', Auth.authorize(), keychanges.getKeyChanges);
    app.post('/api/v1/key-changes', Auth.authorize(), keychanges.addKeyChange);
    app.patch('/api/v1/key-changes', Auth.authorize(), keychanges.addKeyChange);
    app.delete('/api/v1/key-changes/', Auth.authorize(), keychanges.deleteKeyChange);
    //Objective routes
    app.get('/api/v1/objectives', Auth.authorize(), objectives.getObjectives);
    app.get('/api/v1/objectives/:id', Auth.authorize(), objectives.getObjective);
    app.post('/api/v1/objectives', Auth.authorize(), objectives.addObjective);
    app.patch('/api/v1/objectives', Auth.authorize(), objectives.updateObjective);
    app.delete('/api/v1/objectives/', Auth.authorize(), objectives.deleteObjective);
    // Benefit routes
    app.get('/api/v1/benefits', Auth.authorize(), benefits.getBenefits);
    app.get('/api/v1/benefits/:id', Auth.authorize(), benefits.getBenefit);
    app.post('/api/v1/benefits', Auth.authorize(), benefits.addBenefit);
    app.patch('/api/v1/benefits', Auth.authorize(), benefits.updateBenefit);
    app.delete('/api/v1/benefits/', Auth.authorize(), benefits.deleteBenefit);
    // Benefit routes
    app.get('/api/v1/objective-benefits', Auth.authorize(), objectiveBenefits.getObjectiveBenefits);
    app.get('/api/v1/objective-benefits/:id', Auth.authorize(), objectiveBenefits.getObjectiveBenefit);
    app.post('/api/v1/objective-benefits', Auth.authorize(), objectiveBenefits.addObjectiveBenefit);
    app.patch('/api/v1/objective-benefits', Auth.authorize(), objectiveBenefits.updateObjectiveBenefit);
    app.delete('/api/v1/objective-benefits/', Auth.authorize(), objectiveBenefits.deleteObjectiveBenefit);
    // Budget routes
    app.get('/api/v1/budgets', Auth.authorize(), budgets.getBudgets);
    app.get('/api/v1/budgets/:id', Auth.authorize(), budgets.getBudget);
    app.post('/api/v1/budgets', Auth.authorize(), budgets.addBudget);
    app.patch('/api/v1/budgets', Auth.authorize(), budgets.updateBudget);
    app.delete('/api/v1/budgets/', Auth.authorize(), budgets.deleteBudget);
    // BudgetItem routes
    app.get('/api/v1/budget-items', Auth.authorize(), budgetItems.getBudgetItems);
    app.get('/api/v1/budget-items/:id', Auth.authorize(), budgetItems.getBudgetItem);
    app.post('/api/v1/budget-items', Auth.authorize(), budgetItems.addBudgetItem);
    app.patch('/api/v1/budget-items', Auth.authorize(), budgetItems.updateBudgetItem);
    app.delete('/api/v1/budget-items/', Auth.authorize(), budgetItems.deleteBudgetItem);
    // CaseForChange routes
    app.get('/api/v1/case-for-changes', Auth.authorize(), caseForChanges.getCaseForChanges);
    app.get('/api/v1/case-for-changes/:id', Auth.authorize(), caseForChanges.getCaseForChange);
    app.post('/api/v1/case-for-changes', Auth.authorize(), caseForChanges.addCaseForChange);
    app.patch('/api/v1/case-for-changes', Auth.authorize(), caseForChanges.updateCaseForChange);
    app.delete('/api/v1/case-for-changes/', Auth.authorize(), caseForChanges.deleteCaseForChange);
    //Category routes
    app.get('/api/v1/categories', Auth.authorize(), categories.getCategories);
    app.get('/api/v1/categories/:id', Auth.authorize(), categories.getCategory);
    app.post('/api/v1/categories', Auth.authorize(), categories.addCategory);
    app.patch('/api/v1/categories', Auth.authorize(), categories.updateCategory);
    app.delete('/api/v1/categories/', Auth.authorize(), categories.deleteCategory);
    // ChangeApproach routes
    app.get('/api/v1/change-approaches', Auth.authorize(), changeApproaches.getChangeApproaches);
    app.get('/api/v1/change-approaches/:id', Auth.authorize(), changeApproaches.getChangeApproach);
    app.post('/api/v1/change-approaches', Auth.authorize(), changeApproaches.addChangeApproach);
    app.patch('/api/v1/change-approaches/:id', Auth.authorize(), changeApproaches.updateChangeApproach);
    app.delete('/api/v1/change-approaches/:id', Auth.authorize(), changeApproaches.deleteChangeApproach);
    //Department routes
    app.get('/api/v1/departments', Auth.authorize(), departments.getDepartments);
    app.get('/api/v1/departments/:id', Auth.authorize(), departments.getDepartments);
    app.post('/api/v1/departments', Auth.authorize(), departments.addDepartment);
    app.patch('/api/v1/departments', Auth.authorize(), departments.updateDepartment);
    app.delete('/api/v1/departments/', Auth.authorize(), departments.deleteDepartment);
    //Lessons Learnt Log routes
    app.get('/api/v1/lessons', Auth.authorize(), lessons.getLessons);
    app.get('/api/v1/lessons/:id', Auth.authorize(), lessons.getLesson);
    app.post('/api/v1/lessons', Auth.authorize(), lessons.addLesson);
    app.patch('/api/v1/lessons', Auth.authorize(), lessons.updateLesson);
    app.delete('/api/v1/lessons/', Auth.authorize(), lessons.deleteLesson);
    //Decision routes
    app.get('/api/v1/decisions', Auth.authorize(), decisionRegisters.getDecisions);
    app.get('/api/v1/decisions/:id', Auth.authorize(), decisionRegisters.getDecisionRegister);
    app.post('/api/v1/decisions', Auth.authorize(), decisionRegisters.addDecisionRegister);
    app.patch('/api/v1/decisions', Auth.authorize(), decisionRegisters.updateDecisionRegister);
    app.delete('/api/v1/decisions/', Auth.authorize(), decisionRegisters.deleteDecisionRegister);
    // Issue routes
    app.get('/api/v1/issues', Auth.authorize(), issueRegisters.getIssues);
    app.get('/api/v1/issues/:id', Auth.authorize(), issueRegisters.getIssueRegister);
    app.post('/api/v1/issues', Auth.authorize(), issueRegisters.addIssueRegister);
    app.patch('/api/v1/issues', Auth.authorize(), issueRegisters.updateIssueRegister);
    app.delete('/api/v1/issues/', Auth.authorize(), issueRegisters.deleteIssueRegister);
    // Risk routes
    app.get('/api/v1/risks', Auth.authorize(), riskRegisters.getRisks);
    app.get('/api/v1/risks/:id', Auth.authorize(), riskRegisters.getRiskRegister);
    app.post('/api/v1/risks', Auth.authorize(), riskRegisters.addRiskRegister);
    app.patch('/api/v1/risks', Auth.authorize(), riskRegisters.updateRiskRegister);
    app.delete('/api/v1/risks/', Auth.authorize(), riskRegisters.deleteRiskRegister);
};
exports.attachPublicRoutes = attachPublicRoutes;
//# sourceMappingURL=routes.js.map