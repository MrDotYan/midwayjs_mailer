import { MailerConfigurationType, MessageType } from '../..';
export declare class MailerService {
    private mailer;
    config: MailerConfigurationType;
    send(message: MessageType): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
