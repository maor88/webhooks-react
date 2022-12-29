import React from "react";

const CurrencyType = ["All", "Bitcoin", "Ethereum", "Tether", "Binance Coin"];

interface Select {
  onSelect: (type:string) => void;
}
const Select: React.FC<Select> = (props) => {
  return (
    <select onChange={(e)=>props.onSelect(e.target.value)}>
      {CurrencyType.map((curr: string, index) => (
        <option key={index}>{curr}</option>
      ))}
    </select>
  );
};

export default Select;
