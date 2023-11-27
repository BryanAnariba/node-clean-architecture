import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('js-foundation/06-promises.ts Test', () => {
  test('getPokemonBy id should return a pokemon', async () => {
    const pokemonId: number = 1;
    const pokemonName: string = await getPokemonById(pokemonId);
    expect(pokemonName).toBe('bulbasaur');
  });
  test('getPokemonById should be return an error if pokemon does not exist', async () => {
    const pokemonId: number = 100000000;
    try {
      await getPokemonById(pokemonId);
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBe(`Pokemon not found with id ${pokemonId}`)
    }
  });
});