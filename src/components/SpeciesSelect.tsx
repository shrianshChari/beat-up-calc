import ReactSelect from 'react-select';

import { getSpecies } from "../Pokemon";
import { Species } from '@pkmn/dex';
import { useContext } from 'react';
import { GenerationContext } from '../GenerationContext';

export default function SpeciesSelect({ exportSpecies, halfWidth }:
  { exportSpecies: (arg0: Species) => void, halfWidth?: boolean }) {
  const generation = useContext(GenerationContext);
  const allSpecies = getSpecies(generation).map((specie) =>
    ({ value: specie, label: specie.name }));

  return (
    <ReactSelect
      options={allSpecies}
      defaultValue={allSpecies[0]}
      onChange={(newValue) => {
        exportSpecies(newValue ? newValue.value : allSpecies[0].value);
      }}
      className={halfWidth ? 'halfWidth' : ''}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: '#242424',
          neutral80: 'white',
          primary: 'silver',
          primary25: 'midnightblue',
          primary50: 'blue',
        },
      })}
    />
  )
}
