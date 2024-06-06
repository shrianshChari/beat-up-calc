import { Dex } from "@pkmn/dex";

const allowedFormes = ['', 'Mega', 'Alola', 'Galar', 'Hisui', 'Paldea', 'Paldea-Combat', 'Paldea-Blaze', 'Paldea-Aqua'];

export function getSpecies(generation: number) {
  return Dex.forGen(generation).species.all()
    .filter((species) => species.exists && species.num >= 1 && allowedFormes.includes(species.forme))
    .sort((a, b) => a.num - b.num);
}

export function getItems(generation: number) {
  const items = Dex.forGen(generation).items;
  const allItems = [...items.all()];

  allItems.splice(0, 0, items.get(''))

  return allItems
    .filter((item) => item.gen <= generation)
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
}

export function range(start: number = 0, stop: number, step: number = 1) {
  let current = start;
  let numbers: number[] = [];

  step = step === 0 ? 1 : step;

  while (current < stop) {
    numbers.push(current);
    current += step;
  }

  return numbers;
}

export function computeStatChangeMultiplier(statChange: number): number {
  statChange = Math.min(statChange, 6);
  statChange = Math.max(statChange, -6);

  if (statChange < 0) {
    return 2 / (2 - statChange);
  } else {
    return (2 + statChange) / 2;
  }

}

export function fixValues(value: string, min: number, max: number, defaultMin: boolean = true) {
  let num = parseInt(value);

  if (isNaN(num)) {
    if (defaultMin) {
      num = min;
    } else {
      num = max;
    }
  } else if (num < min) {
    num = min;
  } else if (num > max) {
    num = max;
  }
  return num;
}

export function pokemonRound(x: number) {
  return Math.ceil(x - Math.floor(x) - 0.5) + Math.floor(x);
}

export function getBeatUpBasePower(baseAttack: number) {
  return pokemonRound(baseAttack / 10) + 5
}

export function sumCombinations(a: { [key: number]: number }, b: { [key: number]: number }) {
  let outcomes: { [key: number]: number } = {};

  Object.entries(a).forEach(([key1, value1]) => {
    let key1_num = parseInt(key1);
    Object.entries(b).forEach(([key2, value2]) => {
      let key2_num = parseInt(key2);

      if (!outcomes[key1_num + key2_num]) {
        outcomes[key1_num + key2_num] = value1 * value2;
      } else {
        outcomes[key1_num + key2_num] += value1 * value2;
      }
    })
  })

  return outcomes
}

export function countOutcomes(a: number[]) {
  let outcomes: { [key: number]: number } = {};

  for (let value of a) {
    if (!outcomes[value]) {
      outcomes[value] = 1;
    } else {
      outcomes[value] += 1;
    }
  }

  return outcomes
}
