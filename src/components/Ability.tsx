import { Ability } from "@pkmn/dex";
import { useContext } from "react";
import { GenerationContext } from "../GenerationContext";
import { getAbilities } from "../Pokemon";
import ReactSelect from "react-select";

export default function Abilities( { exportAbility }:
  { exportAbility: (arg0: Ability) => void }) {
  const generation = useContext(GenerationContext);
  const allAbilities = getAbilities(generation).map((ability) => 
    ({ value: ability, label: ability.name }));

  return (
    <>
      <label>Ability: </label>
      <ReactSelect
        options={allAbilities}
        defaultValue={allAbilities[0]}
        onChange={(newValue) => {
          exportAbility(newValue ? newValue.value : allAbilities[0].value)
        }}
        className="halfWidth"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral0: '#242424',
            neutral80: 'white',
            primary: 'silver',
            primary25: 'midnightblue',
            primary50: 'blue',
          }
        })}
      />
    </>
  )
}
