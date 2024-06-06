import { useState } from "react";

export default function MinHPLikelihood({ data }: { data: { [key: string]: number } }) {
  const total = Object.values(data).reduce((prev, cur) => prev + cur);
  const keys = Object.keys(data);
  const median = parseInt(keys[Math.floor(keys.length / 2)])

  const [minHP, setMinHP] = useState(median);

  let numberOfOutcomes = 0;
  for (let [key, value] of Object.entries(data)) {
    let keyNum = parseInt(key);

    if (minHP <= keyNum) {
      numberOfOutcomes += value;
    }
  }

  return (
    <>
      <label>Minimum HP: </label>
      <input
        defaultValue={minHP}
        type="number"
        onChange={(event) => {
          setMinHP(parseInt(event.target.value))
        }}
      />

      <p>There is a {
        100 * numberOfOutcomes / total >= 1 ?
          `${Math.round(10 * 100 * numberOfOutcomes / total) / 10}% ` :
          `${(100 * numberOfOutcomes / total).toPrecision(1)}% (${numberOfOutcomes.toLocaleString('en-US')} in ${total.toLocaleString('en-US')}) `
      } chance that Beat Up will do at least {minHP}HP.</p>
    </>
  )
}
