import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('js-foundation/06-promises.ts Test', () => {
  test('getPokemonById should be bulbasaur', async() => {
    const pokId = 1;
    const pokemonName = await getPokemonById(pokId);
    expect(pokemonName).toBe('bulbasaur');
  });

  test('getPokemonById should be bulbasaur', async() => {
    const pokId = 10000000;
    try {
      await getPokemonById(pokId);
      expect(true).toBeFalsy(); // SI ENTRO AQUI USAR ESTO YA QUE SIGNIFICA QUE TODO FUE BIEN
    } catch(err) {
      expect(err).toBe(`Pokemon not found with id ${pokId}`);
    }
  });
});