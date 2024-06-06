import Plot from "react-plotly.js";

export default function OutcomeGraph({ data }: { data: { [key: number]: number } }) {

  const total = Object.values(data).reduce((prev, cur) => prev + cur);

  return <Plot
    data={[
      {
        x: Object.keys(data),
        y: Object.values(data).map((value) => Math.round(10 * (100 * value / total)) / 10),
        type: 'bar',
        marker: {
          color: 'orange'
        },
        hovertemplate: '<b>Total Damage</b>: %{x} HP<br>' +
          '<b>Probability</b>: %{y}%<extra></extra>',
      }
    ]}
    layout={{
      autosize: true,
      title: {
        text: "Beat Up Damage Outcomes",
      },
      xaxis: {
        title: "Total HP Dealt"
      },
      yaxis: {
        title: "Probability of Occurring"
      }
    }}
  />
}
