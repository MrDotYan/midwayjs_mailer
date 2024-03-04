import { IMidwayContainer } from '@midwayjs/core';
export declare class MailerConfiguration {
    private readonly mailer;
    onReady(container: IMidwayContainer): Promise<void>;
    onStop(container: IMidwayContainer): Promise<void>;
}
