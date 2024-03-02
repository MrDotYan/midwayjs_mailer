import { Config, Configuration, IMidwayContainer, MidwayError } from '@midwayjs/core';
import * as DefaultConfig from './config/config.default';
import {
  Transport,
  TransportOptions,
  Transporter,
  createTransport,
} from 'nodemailer';
import { isNotEmpty } from './utils';

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
    if(isNotEmpty(this.mailer)) {
      container.registerObject('mailer', createTransport(this.mailer));
    }else{
      throw new MidwayError('You need to configure email information')
    }
  }

  async onStop(container: IMidwayContainer) {
    const isMailer = container.hasObject('mailer');
    if (isMailer) {
      const mailer: Transporter = await container.getAsync('mailer');
      mailer?.close();
    }
  }
}
