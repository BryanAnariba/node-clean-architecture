import { emailTemplate } from '../../src/js-foundation/01-template';
describe('js-foundation/01-template.ts', () => {
  test('emailTemplate should be contain a gretting', () => { // Debe tener un saludo, al meno un Hi,
    expect(emailTemplate).toContain('Hi, ');
  });

  test('emailTemplate should contain {{name}} and {{orderId}}', () => {
    expect(emailTemplate).toMatch(/{{name}}/);
    expect(emailTemplate).toMatch(/{{orderId}}/);
    expect(emailTemplate).toContain('{{name}}');
    expect(emailTemplate).toContain('{{orderId}}');
  })
});