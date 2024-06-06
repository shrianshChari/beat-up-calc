import { fixValues } from "../Pokemon"

export default function IndividualValues({ exportIV, defaultIV = 31, id }:
  { exportIV: (arg0: number) => void, defaultIV?: number, id: string }) {
  return (
    <input
      defaultValue={defaultIV}
      type="number"
      style={{
        width: '3em'
      }}
      id={id}
      onChange={(event) => {
        let num = fixValues(event.target.value, 0, 31, false)

        exportIV(num);
        event.target.value = num.toString();
      }}
    />
  )
}
