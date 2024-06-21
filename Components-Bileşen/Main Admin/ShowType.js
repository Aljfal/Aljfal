import {useState } from "react";
export default function ShowType({  onChange ,sele})
{
  var userst = [
    {
      type: "choose",
    },
    {
      type: "Restaurant owner",
    },
    {
      type: "Customer",
    },

  ];

  const [selectedItem, setSelectedItem] = useState(sele ? sele : "Seç");
  const handleSelectChange = (event) => {
    const selectedItemIndex = event.target.value;
    setSelectedItem(userst[selectedItemIndex]);
    onChange(selectedItemIndex);
  };
  return (
    <>
    <div className=" p-6 bg-[#2a4180] rounded-full">
      <select value={selectedItem} onChange={handleSelectChange} className="bg-[#2a4180] text-white w-full " >
        {
        userst.map((item,index) => (
          <option key={index} value={item.type} className="  ">
            {item.type}
          </option>
        ))}
      </select>
    </div>
    </>
  );
}