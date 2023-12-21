import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity } from '../../entities';
import { LogRepository } from '../../repositories';
import { SendEmailLog } from './send-email-logs';

describe('Testing in send-email-log.ts file', () => {

  const mockEmailService = {
    sendEmailWithFileSystemLog: jest.fn().mockReturnValue(true)
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }
  const sendEmailLog = new SendEmailLog(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call send email and save log', async () => {
    const result = await sendEmailLog.execute(['bsanchez@gmail.com']);
    expect(result).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSystemLog).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test('should call log in case of error', async () => {
    mockEmailService.sendEmailWithFileSystemLog.mockResolvedValue(false);
    const result = await sendEmailLog.execute(['bsanchez@gmail.com']);
    expect(result).toBeFalsy();
    expect(mockEmailService.sendEmailWithFileSystemLog).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});