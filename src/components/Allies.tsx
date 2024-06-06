import { Species } from "@pkmn/dex";
import { useContext, useEffect, useState } from "react";
import { getSpecies, range } from "../Pokemon";
import { GenerationContext } from "../GenerationContext";
import SpeciesSelect from "./SpeciesSelect";

export default function Allies({ exportAllies, id }:
  { exportAllies: (arg0: Species[]) => void, id: string }) {
  const generation = useContext(GenerationContext);
  const MIN_ALLIES = 1;
  const MAX_ALLIES = 5;
  // TODO: Make this a context
  const speciesList = getSpecies(generation);

  const [numAllies, setNumAllies] = useState(MIN_ALLIES);

  // Yes, this is a horrendous solution.
  const [ally1, setAlly1] = useState(speciesList[0]);
  const [ally2, setAlly2] = useState(speciesList[0]);
  const [ally3, setAlly3] = useState(speciesList[0]);
  const [ally4, setAlly4] = useState(speciesList[0]);
  const [ally5, setAlly5] = useState(speciesList[0]);

  const alliesList = [ally1, ally2, ally3, ally4, ally5];
  const setAlliesList = [setAlly1, setAlly2, setAlly3, setAlly4, setAlly5];

  useEffect(() => {
    exportAllies(alliesList.slice(0, numAllies));
  }, [ally1, ally2, ally3, ally4, ally5, numAllies]);

  return (
    <>
      <label htmlFor={id}>Number of non-statused allies: </label>
      <select
        defaultValue={numAllies}
        id={id}
        onChange={(event) => {
          setNumAllies(parseInt(event.target.value));
        }}
      >
        {
          range(MIN_ALLIES, MAX_ALLIES + 1).map((num) =>
            <option value={num} key={num}>{num}</option>)
        }
      </select>

      {
        range(MIN_ALLIES - 1, numAllies).map((index) => {
          return <SpeciesSelect key={index} exportSpecies={setAlliesList[index]} halfWidth />
        })
      }
    </>
  )
}
