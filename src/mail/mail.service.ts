import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerservice: MailerService) {}
  async sendAdminConfrmation(admin: Admin): Promise<void> {
    const url = `https://e-com-production.up.railway.app/api/admin/activate/${admin.unique_id}`;
    await this.mailerservice.sendMail({
      to: admin.email,
      subject: "Ashyo online do'koniga xush kelibsiz! Emailingizni tasdiqlang!",
      template: './confirmation',
      context: {
        name: admin.first_name,
        url,
      },
    });
  }
}
