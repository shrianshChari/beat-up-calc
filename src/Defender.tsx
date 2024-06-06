import { useState, useEffect, useContext } from "react";

import { getSpecies, computeStatChangeMultiplier, fixValues, getItems } from "./Pokemon"
import { calcStat, GenerationNum, Pokemon } from "@smogon/calc";

import { EffortValues, IndividualValues, Items, Level, Natures, SpeciesSelect, StatChanges } from './components';
import { GenerationContext } from "./GenerationContext";
import './test.css';

export default function Defender({ exportDefender }:
  { exportDefender: (arg0: Pokemon) => void }) {
  const generation = useContext(GenerationContext);

  const [species, setSpecies] = useState(getSpecies(generation)[0]);

  const [level, setLevel] = useState(100)

  const [nature, setNature] = useState('Hardy')

  const [baseHP, setBaseHP] = useState(species.baseStats.hp);
  const [hpEV, setHpEV] = useState(0);
  const [hpIV, setHpIV] = useState(31);

  const [hpStat, setHpStat] = useState(calcStat(generation as GenerationNum, 'hp', baseHP, hpIV, hpEV, level, nature));

  useEffect(() => {
    setBaseHP(species.baseStats.hp)
  }, [species]);

  useEffect(() => {
    setHpStat(calcStat(generation as GenerationNum, 'hp', baseHP, hpIV, hpEV, level, nature));
  }, [baseHP, hpIV, hpEV, level, nature])

  const [baseDefense, setBaseDefense] = useState(species.baseStats.def);
  const [defenseEV, setDefenseEV] = useState(0)
  const [defenseIV, setDefenseIV] = useState(31)
  const [defenseStatChanges, setDefenseStatChanges] = useState(0);

  const [defenseStat, setDefenseStat] = useState(calcStat(generation as GenerationNum, 'def', baseDefense, defenseIV, defenseEV, level, nature));

  const [item, setItem] = useState(getItems(generation)[0])

  useEffect(() => {
    setBaseDefense(species.baseStats.def);
  }, [species])

  useEffect(() => {
    setDefenseStat(Math.floor(calcStat(generation as GenerationNum, 'def',
      baseDefense, defenseIV, defenseEV, level, nature) *
      computeStatChangeMultiplier(defenseStatChanges)));
  }, [baseDefense, defenseIV, defenseEV, level, defenseStatChanges, nature])

  useEffect(() => {
    exportDefender(new Pokemon(generation as GenerationNum, species.name, {
      level: level,
      nature: nature,
      evs: {
        hp: hpEV,
        def: defenseEV
      },
      ivs: {
        hp: hpIV,
        def: defenseIV
      },
      boosts: {
        def: defenseStatChanges
      },
      item: item.name,
      overrides: {
        baseStats: {
          hp: baseHP,
          atk: 10,
          def: baseDefense,
          spa: 10,
          spd: 10,
          spe: 10
        }
      }
    }));
  }, [level, nature, baseHP, hpEV, hpIV, baseDefense, defenseEV, defenseIV, defenseStatChanges, item])

  return (
    <fieldset className="field">
      <legend><b>Defender</b></legend>

      <SpeciesSelect exportSpecies={setSpecies} />

      <Level exportLevel={setLevel} defaultLevel={level} id="defenderLevel" />

      <Natures exportNature={setNature} defaultNature={nature} id="defenderNature" />

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
            <td>HP</td>
            <td>
              <input
                value={baseHP}
                id="defenderBaseHP"
                type="number"
                style={{
                  width: '3em'
                }}
                onChange={(event) => {
                  let num = fixValues(event.target.value, 1, 255)

                  setBaseHP(num);
                  event.target.value = num.toString();
                }}
              ></input>
            </td>
            <td>
              <EffortValues exportEV={setHpEV} defaultEV={hpEV} id="defenderHPEV" />
            </td>
            <td>
              <IndividualValues exportIV={setHpIV} defaultIV={hpIV} id="defenderHPIV" />
            </td>
            <td>
              {
                // Empty because HP should not have stat changes
              }
            </td>
            <td>
              {hpStat}
            </td>
          </tr>
          <tr>
            <td>Defense</td>
            <td>
              <input
                value={baseDefense}
                id="defenderBaseDef"
                type="number"
                style={{
                  width: '3em'
                }}
                onChange={(event) => {
                  let num = fixValues(event.target.value, 1, 255)

                  setBaseDefense(num);
                  event.target.value = num.toString();
                }}
              ></input>
            </td>
            <td>
              <EffortValues exportEV={setDefenseEV} defaultEV={defenseEV} id="defenderDefEV" />
            </td>
            <td>
              <IndividualValues exportIV={setDefenseIV} defaultIV={defenseIV} id="defenderDefIV" />
            </td>
            <td>
              <StatChanges exportStatChanges={setDefenseStatChanges} id="defenderStatChanges" />
            </td>
            <td>
              {defenseStat}
            </td>
          </tr>
        </tbody>
      </table>

      <Items exportItem={setItem} id="defenderItem" />

    </fieldset>
  )

}
