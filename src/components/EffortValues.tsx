import { fixValues } from "../Pokemon"

export default function EffortValues({ exportEV, defaultEV = 0, id }:
  { exportEV: (arg0: number) => void, defaultEV?: number, id: string }) {
  return (
    <input
      defaultValue={defaultEV}
      type="number"
      style={{
        width: '3em'
      }}
      id={id}
      onChange={(event) => {
        let num = fixValues(event.target.value, 0, 252)

        exportEV(num);
        event.target.value = num.toString();
      }}
      min={0}
      max={252}
      step={4}
    />
  )
}
