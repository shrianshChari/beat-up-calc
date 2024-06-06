import { useState } from 'react'
import './App.css'

import Attacker from './Attacker'
import Defender from './Defender';
import { GenerationContext } from './GenerationContext';
import { Pokemon, calculate, Move, GenerationNum } from '@smogon/calc';
import { countOutcomes, getBeatUpBasePower, range, sumCombinations } from './Pokemon';
import { MinHPLikelihood, OutcomeGraph } from './components';

function App() {
  const MIN_GENERATION = 5;
  const MAX_GENERATION = 9;

  const [generation, setGeneration] = useState(9 as GenerationNum);
  const defaultPokemon = new Pokemon(generation, 'Bulbasaur');

  const [attacker, setAttacker] = useState(defaultPokemon);
  const [defender, setDefender] = useState(defaultPokemon);

  const [basePowers, setBasePowers] = useState([getBeatUpBasePower(defaultPokemon.species.baseStats.atk), getBeatUpBasePower(defaultPokemon.species.baseStats.atk)])

  const ranges = basePowers.map((bp) => {
    const move = new Move(generation, 'Beat Up', {
      overrides: {
        basePower: bp
      }
    })
    const result = calculate(generation, attacker, defender, move)

    return result.damage
  })

  const rangeCounts = ranges.map((range) => countOutcomes(range as number[]))

  let allOutcomes = sumCombinations(rangeCounts[0], rangeCounts[1])

  for (let i = 2; i < rangeCounts.length; i++) {
    allOutcomes = sumCombinations(allOutcomes, rangeCounts[i]);
  }

  return (
    <>
			<h1>Beat Up Damage Calculator</h1>

      <label htmlFor='generation'>Generation: </label>
      <select id='generation' defaultValue={generation} onChange={(event) => setGeneration(parseInt(event.target.value) as GenerationNum)}>
        {
          range(MIN_GENERATION, MAX_GENERATION + 1).map((value) =>
            <option key={value} value={value}>{value}</option>
          )
        }
      </select>

      <br />


      <GenerationContext.Provider value={generation}>
        <Attacker exportAttacker={setAttacker} exportBasePowers={setBasePowers} />
        
        <Defender exportDefender={setDefender} />
      </GenerationContext.Provider>

      <br />

      <OutcomeGraph data={allOutcomes} />

      <br />

      <MinHPLikelihood data={allOutcomes} />
    </>
  )
}

export default App
