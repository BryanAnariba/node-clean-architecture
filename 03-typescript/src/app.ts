import { getHeroById } from "./services/hero.service";

const hero = getHeroById(3);
console.log(hero);