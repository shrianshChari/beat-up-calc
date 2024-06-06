import { useContext, useEffect, useState } from "react";

import { computeStatChangeMultiplier, fixValues, getBeatUpBasePower, getItems, getSpecies } from './Pokemon';
import { calcStat, GenerationNum, Pokemon } from "@smogon/calc";

import { Allies, EffortValues, IndividualValues, Items, Level, Natures, SpeciesSelect, StatChanges } from './components';
import { GenerationContext } from "./GenerationContext";
import './test.css';

export default function Attacker({ exportAttacker, exportBasePowers }:
  { exportAttacker: (arg0: Pokemon) => void, exportBasePowers: (arg0: number[]) => void }) {
  const generation = useContext(GenerationContext);
  const defaultSpecies = getSpecies(generation)[0];

  const [species, setSpecies] = useState(defaultSpecies);
  const [level, setLevel] = useState(100)
  const [nature, setNature] = useState('Hardy')

  const [baseAttack, setBaseAttack] = useState(species.baseStats.atk)
  const [attackEV, setAttackEV] = useState(0)
  const [attackIV, setAttackIV] = useState(31)
  const [attackStatChanges, setAttackStatChanges] = useState(0);

  const [item, setItem] = useState(getItems(generation)[0])

  const [attackStat, setAttackStat] = useState(calcStat(generation as GenerationNum, 'atk', baseAttack, attackIV, attackEV, level, nature));

  useEffect(() => {
    setBaseAttack(species.baseStats.atk);
  }, [species])

  useEffect(() => {
    setAttackStat(Math.floor(calcStat(generation as GenerationNum, 'atk',
      baseAttack, attackIV, attackEV, level, nature) *
      computeStatChangeMultiplier(attackStatChanges)));
  }, [baseAttack, attackIV, attackEV, level, attackStatChanges, nature])


  const [allies, setAllies] = useState([defaultSpecies])

  useEffect(() => {
    species.baseStats.atk = baseAttack;

    exportBasePowers([species].concat(allies).map((specie) => getBeatUpBasePower(specie.baseStats.atk)))
  }, [species, allies, baseAttack])

  useEffect(() => {
    exportAttacker(new Pokemon(generation as GenerationNum, species.name, {
      level: level,
      nature: nature,
      evs: {
        atk: attackEV
      },
      ivs: {
        atk: attackIV
      },
      boosts: {
        atk: attackStatChanges
      },
      item: item.name,
      overrides: {
        baseStats: {
          hp: 10,
          atk: baseAttack,
          def: 10,
          spa: 10,
          spd: 10,
          spe: 10
        }
      }
    }));
  }, [baseAttack, attackIV, attackEV, level, attackStatChanges, nature, species, item])

  return (
    <fieldset className="field">
      <legend><b>Attacker</b></legend>

      <SpeciesSelect exportSpecies={setSpecies} />

      <Level exportLevel={setLevel} defaultLevel={level} id="attackerLevel" />

      <Natures exportNature={setNature} defaultNature={nature} id="attackerNature" />

      <table>
        <thead>
          <tr>
            <th>Stat</th>
            <th>Base</th>
            <th>EVs</th>
            <th>IVs</th>
            <th></th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Attack</td>
            <td>
              <input
                value={baseAttack}
                type="number"
                style={{
                  width: '3em'
                }}
                id="attackerBaseAtk"
                onChange={(event) => {
                  let num = fixValues(event.target.value, 1, 255)

                  setBaseAttack(num);
                  event.target.value = num.toString();
                }}
              ></input>
            </td>
            <td>
              <EffortValues exportEV={setAttackEV} defaultEV={attackEV} id="attackerAtkEV" />
            </td>
            <td>
              <IndividualValues exportIV={setAttackIV} defaultIV={attackIV} id="attackerAtkIV" />
            </td>
            <td>
              <StatChanges exportStatChanges={setAttackStatChanges} id="attackerStatChanges" />
            </td>
            <td>
              {attackStat}
            </td>
          </tr>
        </tbody>
      </table>

      <Items exportItem={setItem} />

      <Allies exportAllies={setAllies} id="attackerAllies" />
    </fieldset>
  )

}
