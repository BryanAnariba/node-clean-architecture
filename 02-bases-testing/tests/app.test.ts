describe('Test in app.ts file', () => {
  test('Should be 30', () => {

    // TODO: poner atencion aqui estan los tres AAA de un test

    // Arrange: Arreglar es inicializar variables y importaciones necesarias
    const numUno = 10;
    const numDos = 20;

    // Act: Actuar es acciones o procedimientos sobre el paso anterior osea arrange
    const result = numUno + numDos;

    // Assert: Afirmar es observar el compontamiento es o no es
    expect(result).toBe(30);

  })
});