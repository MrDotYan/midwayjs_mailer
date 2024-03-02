import { Config, Inject, Provide } from '@midwayjs/core';
import { Transporter } from 'nodemailer';
import { MailerConfigurationType, MessageType } from '../..';
import { BadRequestError } from '@midwayjs/core/dist/error/http';

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

/**
 * @description 判断不空
 * @param val
 * @returns boolean
 */
function isNotEmpty(val: unknown) {
  const types = typeof val;
  if (types === 'string' && val !== '') return true;
  if (
    types === 'object' &&
    val !== null &&
    JSON.stringify(val) !== '{}' &&
    JSON.stringify(val) !== '[]'
  )
    return true;
  if (types === 'number') {
    if (Number.isNaN(val)) return false;
    return true;
  }
  if (types === 'undefined') return false;
  if (types === 'boolean') return true;
  if (types === 'function') return true;
  return false;
}
