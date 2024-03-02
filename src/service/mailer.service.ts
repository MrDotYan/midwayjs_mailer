import { Config, Inject, Provide } from '@midwayjs/core';
import { Transporter } from 'nodemailer';
import { MailerConfigurationType, MessageType } from '../..';
import { BadRequestError } from '@midwayjs/core/dist/error/http';
import { isNotEmpty } from '../utils';

@Provide()
export class MailerService {
  @Inject()
  private mailer: Transporter;

  @Config('mailer')
  config: MailerConfigurationType;

  async send(message: MessageType) {
    try {
      const r = await this.mailer.sendMail({
        ...message,
        from: this.config.auth.user,
        subject: `${this.config.prefix}-${message.subject}`,
      });

      if (isNotEmpty(r.messageId)) {
        return { success: true, message: 'success', data: r.messageId };
      } else {
        return { success: false, message: 'fail', data: null };
      }
    } catch (error) {
      throw new BadRequestError(error);
    }
  }
}
