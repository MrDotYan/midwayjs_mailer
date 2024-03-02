import { Config, Configuration, IMidwayContainer } from '@midwayjs/core';
import * as DefaultConfig from './config/config.default';
import {
  Transport,
  TransportOptions,
  Transporter,
  createTransport,
} from 'nodemailer';

@Configuration({
  namespace: 'mailer',
  importConfigs: [
    {
      default: DefaultConfig,
    },
  ],
})
export class MailerConfiguration {
  @Config('mailer')
  private readonly mailer: Transport<any> | TransportOptions;

  async onReady(container: IMidwayContainer) {
    container.registerObject('mailer', createTransport(this.mailer));
  }

  async onStop(container: IMidwayContainer) {
    const isMailer = container.hasObject('mailer');
    if (isMailer) {
      const mailer: Transporter = await container.getAsync('mailer');
      mailer?.close();
    }
  }
}
