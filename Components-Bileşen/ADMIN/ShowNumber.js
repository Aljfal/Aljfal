import {useState } from "react";
export default function ShowNumber({  onChange ,sele})
{
  const ReservationsHuman = [
    {
      type: "choose",
    },
    {
      type: 1,
    },
    {
      type: 2,
    },
    {
      type: 3,
    },
    {
      type: 4,
    },
    {
      type: 5,
    },
    {
      type: 6,
    },
    {
      type: "Party",
    },
   
  ];

  const [selectedItem, setSelectedItem] = useState(sele ? sele : "Seç");
  const handleSelectChange = (event) => {
    const selectedItemIndex = event.target.value;
    setSelectedItem(selectedItemIndex);
    onChange(selectedItemIndex);
  };
  return (
    <>
    <div  className="p-6 bg-[#2a4180] rounded-full">
      <select value={selectedItem} onChange={handleSelectChange}   className="bg-[#2a4180] text-white w-full">
        {
        ReservationsHuman.map((item,index) => (
          <option key={index} value={item.type} className="  text-3xl ">
            {item.type}
          </option>
        ))}
      </select>
    </div>
    </>
  );
}