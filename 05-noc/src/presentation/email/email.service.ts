import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repositories';
import { LogEntity, LogLevelSeverity } from '../../domain/entities';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  fileName: string;
  path: string;
}

export class EmailService {

  constructor() {}

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });
  
  public async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const {to, subject, htmlBody, attachments = []} = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        to: to, 
        subject : subject, 
        html: htmlBody,
        attachments: attachments
      });
      // console.log(sendInformation);
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }

  async sendEmailWithFileSystemLog(to: string | string[]) {
    const subject = 'Server Logs';
    const htmlBody = '<p><h3>This is a email test, please omited this advertistment!<h3><p><p>View Lows:</p>';
    const attachments: Attachment[] = [
      {fileName: 'logs-all.log', path: './logs/logs-all.log'},
      {fileName: 'logs-high.log', path: './logs/logs-high.log'},
      {fileName: 'logs-medium.log', path: './logs/logs-medium.log'},
    ];

    return await this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    });
  }
}