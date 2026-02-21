import axios from "axios";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FundTransferList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  console.log(list, "list");
  const [payMode, setPayMode] = useState("");
  useEffect(() => {
    debugger;
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData && userData.branchId) {
      console.log("Branch ID:", userData.branchId.branch_code);
      console.log("Branch Name:", userData.branchId.branch_name);
      // setSelectedYear(userData.financialYear)
      // setSelectedBranch(userData.branchId.branch_name);
      // setSelectedBranchid(userData.branchId.id);

      fetchFundTransfers(userData.branchId.id);
    }
  }, []);

  

  const fetchFundTransfers = async (selectedBranchid) => {
    debugger;
    try {
      if (!selectedBranchid) return; // wait until branchId is set

      const res = await axios.get(
        `http://localhost:5000/api/FundTransfer/listIssue`,
        {
          params: {
            branchId: selectedBranchid,
          },
        },
      );

      setList(res.data.data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  // Exact system colors from screenshots
  const navyBlue = "bg-[#0D3082]";
  const tealHeader = "bg-[#008b8b]";

  // Compact input style for the search bar
  const inputClass =
    "border border-gray-300 rounded-sm px-1 py-0.5 text-[11px] outline-none focus:border-blue-500 w-[140px] h-[22px]";
  const labelClass = "text-[11px] font-bold text-gray-700";
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/FundTransfer/Delete/${id}`);

      alert("Deleted Successfully ✅");
      fetchFundTransfers(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 ">
       <div className="flex justify-center p-2 mt-5">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between ">
          {/* Left heading */}
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
           FT Issue
          </h2>

          {/* Right section (search + buttons) */}
          <div className="flex items-center gap-6">
            {/* Search section */}
            
           
            {/* Buttons stuck to right */}
            <div className="flex gap-3">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",
                }}
                // onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Add
              </button>

              <button
                onClick={() => navigate("/")}
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
              >
                Exit
              </button>

            </div>
          </div>
        </div>
      </div>
      <div className='ml-[110px] mr-[110px]'>
 <div className="mt-5 ">
        {/* 2. List Header with +Add Button */}
       
        {/* 3. Search Bar Area */}
       

        {/* 4. Data Grid */}
        <div className="overflow-x-auto  ">
          <table >
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr className=" text-white text-[12px] font-bold border-b border-gray-300">
                <th className="p-1.5 border-r border-gray-300 w-[100px]">Doc No</th>
                <th className="p-1.5 border-r border-gray-300 w-[100px]">Doc Date</th>
                {/* <th className="p-1.5 border-r border-gray-300">Paymode</th> */}
                <th className="p-1.5 border-r border-gray-300 w-[150px]">From Branch</th>
                <th className="p-1.5 border-r border-gray-300 w-[100px]">To Branch</th>
                {/* <th className="p-1.5 border-r border-gray-300">
                  Account Ledger Name
                </th> */}
                <th className="p-1.5 border-r border-gray-300 w-[100px]">Amount</th>
                <th className="p-1.5 border-r border-gray-300 w-[100px]">MOP</th>
                <th className="p-1.5 border-r border-gray-300 w-[120px]">Add By</th>
                <th className="p-1.5 border-r border-gray-300 w-[120px]">Add On</th>
                <th className="p-1.5 border-r border-gray-300 w-[120px]" >
                  Receipt Status
                </th>
                <th className="p-1.5 text-center w-[100px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[11px] divide-y divide-gray-200">
              {list.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-1.5 border-r text-blue-800">{item.id}</td>

                  <td className="p-1.5 border-r">
                    {new Date(item.doc_date).toLocaleDateString("en-GB")}
                  </td>

                  {/* <td className="p-1.5 border-r">{item.pay_mode}</td> */}
                  <td className="p-1.5 border-r">{item.from_branch_name}</td>
                  <td className="p-1.5 border-r">{item.to_branch_name}</td>

                  <td className="p-1.5 border-r font-bold">
                    {item.amount || "-"}
                  </td>

                  <td className="p-1.5 border-r">{item.pay_mode}</td>

                  <td className="p-1.5 border-r text-gray-500">Admin</td>

                  <td className="p-1.5 border-r">
                    {item.created_at?.split("T")[0]}
                  </td>

                  <td
                    className={`p-1.5 border-r font-bold ${
                      item.status === "Pending"
                        ? "text-yellow-600"
                        : item.status === "Accepted"
                          ? "text-green-700"
                          : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </td>

                  <td className="p-1.5 text-center whitespace-nowrap">
                    <span
                      className="text-blue-600 cursor-pointer font-bold mr-2"
                      onClick={() =>
                        navigate("/FundTransfer/create", {
                          state: { fundData: item },
                        })
                      }
                    >
                      View
                    </span>

                    <span
                      className="text-red-600 cursor-pointer font-bold"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
      </div>
     
    </div>
  );
};

export default FundTransferList;
