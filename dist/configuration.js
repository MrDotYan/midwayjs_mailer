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
exports.MailerConfiguration = void 0;
const core_1 = require("@midwayjs/core");
const DefaultConfig = require("./config/config.default");
const nodemailer_1 = require("nodemailer");
const utils_1 = require("./utils");
let MailerConfiguration = class MailerConfiguration {
    async onReady(container) {
        if ((0, utils_1.isNotEmpty)(this.mailer)) {
            container.registerObject('mailer', (0, nodemailer_1.createTransport)(this.mailer));
        }
        else {
            throw new core_1.MidwayError('You need to configure email information');
        }
    }
    async onStop(container) {
        const isMailer = container.hasObject('mailer');
        if (isMailer) {
            const mailer = await container.getAsync('mailer');
            mailer === null || mailer === void 0 ? void 0 : mailer.close();
        }
    }
};
__decorate([
    (0, core_1.Config)('mailer'),
    __metadata("design:type", Object)
], MailerConfiguration.prototype, "mailer", void 0);
MailerConfiguration = __decorate([
    (0, core_1.Configuration)({
        namespace: 'mailer',
        importConfigs: [
            {
                default: DefaultConfig,
            },
        ],
    })
], MailerConfiguration);
exports.MailerConfiguration = MailerConfiguration;
