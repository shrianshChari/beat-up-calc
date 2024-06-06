import { Item } from "@pkmn/dex";
import { getItems } from "../Pokemon";
import ReactSelect from "react-select";
import './select.css'
import { useContext } from "react";
import { GenerationContext } from "../GenerationContext";

export default function Items({ exportItem, id }:
  { exportItem: (arg0: Item) => void, defaultItem?: string, id: string }) {
  const generation = useContext(GenerationContext);
  const allItems = getItems(generation).map((item) =>
    ({ value: item, label: item.name.length > 0 ? item.name : '(no item)' }));

  return (
    <>
      <label htmlFor={id}>Item: </label>

      <ReactSelect
        options={allItems}
        defaultValue={allItems[0]}
        onChange={(newValue) => {
          exportItem(newValue ? newValue.value : allItems[0].value);
        }}
        className="halfWidth"
        id={id}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral0: '#242424',
            neutral80: 'white',
            primary: 'silver',
            primary25: 'midnightblue',
            primary50: 'blue',
          },
        })}
      />
    </>
  )
}
