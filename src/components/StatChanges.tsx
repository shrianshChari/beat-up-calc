import { range } from "../Pokemon"

export default function StatChanges({ exportStatChanges, id }:
  { exportStatChanges: (arg0: number) => void, id: string }) {
  return (
    <select
      defaultValue={0}
      id={id}
      onChange={(event) => {
        exportStatChanges(parseInt(event.target.value))
      }}
    >
      {range(-6, 7).reverse().map((num) =>
        <option value={num} key={num}>{num > 0 ? '+' : ''}{num}</option>)}
    </select>
  )
}
