"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const reports_1 = __importDefault(require("./reports"));
const router = new koa_router_1.default();
router.use('/reports', reports_1.default.routes(), reports_1.default.allowedMethods());
exports.default = router;
