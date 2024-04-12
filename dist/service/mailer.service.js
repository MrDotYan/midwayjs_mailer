"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const core_1 = require("@midwayjs/core");
const utils_1 = require("../utils");
let MailerService = class MailerService {
    async send(message) {
        try {
            const r = await this.mailer.sendMail({
                ...message,
                from: this.config.auth.user,
                subject: `${this.config.prefix}-${message.subject}`,
            });
            if ((0, utils_1.isNotEmpty)(r.messageId)) {
                return { success: true, message: "success", data: r.messageId };
            }
            else {
                return { success: false, message: "fail", data: null };
            }
        }
        catch (error) {
            return { success: false, message: "error", data: JSON.stringify(error) };
        }
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], MailerService.prototype, "mailer", void 0);
__decorate([
    (0, core_1.Config)("mailer"),
    __metadata("design:type", Object)
], MailerService.prototype, "config", void 0);
MailerService = __decorate([
    (0, core_1.Provide)()
], MailerService);
exports.MailerService = MailerService;
