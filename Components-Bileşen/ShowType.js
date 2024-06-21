import { useState } from "react";
export default function ShowType({ onChange, sele }) {
  var Employeest = [
    {
      type: "choose",
    },
    {
      type: "bellboy",
    },
    {
      type: "waiter",
    },
    {
      type: "chef",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(sele ? sele : "Seç");
  const handleSelectChange = (event) => {
    const selectedItemIndex = event.target.value;
    setSelectedItem(Employeest[selectedItemIndex]);
    onChange(selectedItemIndex);
  };
  return (
    <>
       <div className="p-6 bg-[#2a4180] rounded-full mr-4">
        <select
          value={selectedItem}
          onChange={handleSelectChange}
          className="bg-[#2a4180] text-white w-full "
        >
          {Employeest.map((item, index) => (
            <option
              key={index}
              value={item.type}
              className=" bg-slate-400 p-3 m-3 border border-double flex justify-center "
            >
              {item.type}
            </option>
          ))}
        </select>
       
      </div>
    </>
  );
}
