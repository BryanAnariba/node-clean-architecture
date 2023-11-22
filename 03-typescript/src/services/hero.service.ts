import { heroes } from "../data/heroes"
import { IHero } from "../interfaces/hero.interface";

export const getHeroById = (id: number): IHero | undefined => {
  return heroes.find(hero => hero.id === id);
}