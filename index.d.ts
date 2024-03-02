import Mail = require('nodemailer/lib/mailer');

export * from './src/index';

export type ServerType = string;
export type AuthType = { user: string; pass: string };

export type MailerConfigurationType = {
  service: ServerType;
  prefix: string;
  auth: AuthType;
};

export type MessageType = Omit<Mail.Options, 'from'>;

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    mailer?: PowerPartial<MailerConfigurationType>;
  }
}
