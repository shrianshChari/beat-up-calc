import { Dex } from "@pkmn/dex";
import { useContext } from "react";
import { GenerationContext } from "../GenerationContext";

export default function Natures({ exportNature, defaultNature = 'Hardy', id }:
  { exportNature: (arg0: string) => void, defaultNature?: string, id: string }) {
  const generation = useContext(GenerationContext);
  const natures = getNatures(generation);

  return (
    <>
      <label htmlFor={id}>Nature: </label>
      <select
        defaultValue={defaultNature}
        onChange={(event) => {
          exportNature(event.target.value);
        }}
        id={id}
      >
        {
          natures.map((nature) => <option value={nature.name} key={nature.name}>{nature.name}{nature.plus && nature.minus ? ` (+${convertStat(nature.plus)}, -${convertStat(nature.minus)})` : ''}</option>)
        }
      </select>
    </>
  )
}

function convertStat(str: 'atk' | 'def' | 'spa' | 'spd' | 'spe') {
  const mapping = {
    'atk': 'Atk',
    'def': 'Def',
    'spa': 'SpA',
    'spd': 'SpD',
    'spe': 'Spe'
  }
  return mapping[str];
}

function getNatures(generation: number) {
  return Dex.forGen(generation).natures.all();
}
