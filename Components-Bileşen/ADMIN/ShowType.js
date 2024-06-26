import {useState } from "react";
export default function ShowType({  onChange ,sele})
{
  const ReservationsType = [
    {
      type: "Seç",
    },
    {
      type: "VIP",
    },
    {
      type: "Economy",
    },
   
  ];

  const [selectedItem, setSelectedItem] = useState(sele ? sele : "Seç");
  const handleSelectChange = (event) => {
    const selectedItemIndex = event.target.value;
    setSelectedItem(ReservationsType[selectedItemIndex]);
    onChange(selectedItemIndex);
  };
  return (
    <>
    <div  className="p-6 bg-[#2a4180] rounded-full">
      <select value={selectedItem} onChange={handleSelectChange}   className="bg-[#2a4180] text-white w-full">
        {
        ReservationsType.map((item,index) => (
          <option key={index} value={item.type} className="  text-3xl ">
            {item.type}
          </option>
        ))}
      </select>
    </div>
    </>
  );
}