import { useEffect, useState } from "react";
export default function ShowUsers({  onChange ,sele,data})
{
 
  const [selectedItem, setSelectedItem] = useState(sele ? sele : "Seç");
  const handleSelectChange = (event) => {
    const selectedItemValue = event.target.value;
    const selectedUser = data.find((item) => item.username === selectedItemValue);
    setSelectedItem(selectedItemValue);
    onChange(selectedUser);
  };
  return (
    <>
   <div className=" p-6 bg-[#2a4180] rounded-full ">
      <select value={selectedItem} onChange={handleSelectChange}   className="bg-[#2a4180] text-white w-full ">
      <option className="  text-3xl ">
            Select
          </option>
        {
        data.map((item,index) => (
          <option key={index} value={item.username}  className="  text-3xl ">
            {item.username}
          </option>
        ))}
      </select>
    </div>
    </>
  );
}