import { fixValues } from "../Pokemon";

export default function Level({ exportLevel, defaultLevel = 100, id }:
  { exportLevel: (arg0: number) => void, defaultLevel?: number, id: string }) {
  return (
    <>
      <label htmlFor={id}>Level: </label>
      <input
        defaultValue={defaultLevel}
        type="number"
        min={1}
        max={100}
        style={{
          width: '3em'
        }}
        id={id}
        onChange={(event) => {
          let num = fixValues(event.target.value, 1, 100, false);

          event.target.value = num.toString();
          exportLevel(num);
        }}
      />
    </>
  )
}
