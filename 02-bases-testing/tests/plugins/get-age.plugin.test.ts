import { getAge } from '../../src/plugins/get-age.plugin';

describe('plugins/get-age.plugin.test.ts', () => {
  test('getAge() should return the age of a person', () => {
    const birthdate = '1997-02-20';
    const age = getAge(birthdate);
    expect(typeof age).toBe('number');
  });

  test('getAge() should be equal to my calculus', () => {
    const birthdate = '1997-02-20';
    const age = getAge(birthdate);
    const calculus = new Date().getFullYear() - new Date(birthdate).getFullYear();
    expect(age).toEqual(calculus);
  });

  test('getAge() should return 0 years', () => {

    /* 
      Usamos un espia que se activa al momento de que en el test estando pendiente de 
      Date si se ejecuta getFullYear() cambia el valor por uno manual que uno le da
    */
    const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1997);
    const birthdate = '1997-02-20';
    const age = getAge(birthdate);
    // console.log({age, spy});
    expect(spy).toHaveBeenCalledWith();
    expect(age).toBe(0);
  });
});