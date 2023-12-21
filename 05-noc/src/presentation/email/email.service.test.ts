import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from './email.service';
describe('This is Important Test Bryan', () => {

  /* 
    Mocks: Un Mock en Jest es un objeto que imita la interfaz y propiedades de una función real, o una clase, o un módulo, o cualquier otro elemento de software, que puedes definir un comportamiento, almacena en memoria información sobre cómo ha sido utilizado
  */
  const mockSendEmail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendEmail: mockSendEmail
  });

  test('', async () => {
    const emailService = new EmailService();
    const options: SendEmailOptions = {
      to: 'test1@gmail.com',
      subject: 'Test',
      htmlBody: '<p>Test<p>'
    };
    await emailService.sendEmail(options);
    // expect(mockSendEmail).toHaveBeenCalledWith({
    //   attachments: expect.any(Array),
    //   to: 'test1@gmail.com',
    //   subject: 'Test',
    //   htmlBody: '<p>Test<p>'
    // });
  });

});