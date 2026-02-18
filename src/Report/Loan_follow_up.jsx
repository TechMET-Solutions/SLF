import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

const Loan_follow_up = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("Open Loan Wise");
  const [customerId, setCustomerId] = useState("");
  const [loanNo, setLoanNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [followUpData, setFollowUpData] = useState([]);

  console.log("followUpData:", followUpData);
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/loan-followup-report/loan-followup-list`,
        {
          params: {
            borrowerId: customerId,
            loanNo: loanNo,
          },
        },
      );

      if (res.data.success) {
        setFollowUpData(res.data.data);
      }
    } catch (error) {
      console.error("Loan FollowUp Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // Mock data based on image_4cb881.png

  const handleFollowUp = (loan) => {
    navigate("/Loan_Follow_up_Updated", {
      state: { loanData: loan },
    });
  };
  return (
    //   <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">
    //     {/* 2. Main Content Container */}
    //     <div className="m-2 border border-[#1a8a81] shadow-sm">
    //       {/* Title Bar with Add Button */}
    //       <div className="bg-[#1a8a81] text-white px-3 py-1 flex justify-between items-center font-semibold text-sm">
    //         <span>Loan Follow Up List</span>
    //         <button
    //           onClick={() => navigate("/add_follow_up")} // Add the click handler
    //           className="bg-[#5ba1d2] hover:bg-blue-700 text-white px-3 py-0.5 rounded text-xs flex items-center gap-1 border border-blue-300"
    //         >
    //           <span className="text-lg leading-none">+</span> Add
    //         </button>
    //       </div>

    //       {/* Filter Section */}
    //       <div className="p-4 bg-white border-b border-gray-200">
    //         <div className="flex flex-wrap items-center gap-6">
    //           <div className="flex items-center gap-2">
    //             <label className="text-gray-600">Customer ID</label>
    //             <input
    //               type="text"
    //               value={customerId}
    //               onChange={(e) => setCustomerId(e.target.value)}
    //               className="border border-gray-300 px-2 py-1 w-32 outline-none focus:border-blue-500"
    //             />
    //           </div>

    //           <div className="flex items-center gap-2">
    //             <label className="text-gray-600">Loan No</label>
    //             <input
    //               type="text"
    //               value={loanNo}
    //               onChange={(e) => setLoanNo(e.target.value)}
    //               className="border border-gray-300 px-2 py-1 w-32 outline-none focus:border-blue-500"
    //             />
    //           </div>

    //           <div className="flex items-center gap-2">
    //             <label className="text-gray-600">Search Type</label>
    //             <select
    //               value={searchType}
    //               onChange={(e) => setSearchType(e.target.value)}
    //               className="border border-gray-300 px-2 py-1 w-40 outline-none focus:border-blue-500 bg-white"
    //             >
    //               <option value="All Loan Wise">All Loan Wise</option>
    //               <option value="Open Loan Wise">Open Loan Wise</option>
    //               <option value="Close Loan Wise">Close Loan Wise</option>
    //               <option value="Follow up Date Wise">Follow up Date Wise</option>
    //               <option value="Next Follow up Date Wise">
    //                 Next Follow up Date Wise
    //               </option>
    //             </select>
    //           </div>

    //           <button
    //             onClick={fetchData}
    //             className="bg-[#005a9c] text-white px-6 py-1 rounded shadow-sm hover:bg-blue-700 font-semibold transition-colors"
    //           >
    //             Search
    //           </button>
    //         </div>
    //       </div>

    //       {/* 3. Result Table Section */}
    //       <div className="bg-white overflow-x-auto">
    //         <table className="w-full border-collapse text-[11px]">
    //           <thead className="bg-[#f2f2f2] text-gray-600 font-semibold border-b border-gray-300">
    //             <tr>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 LoanNo
    //                 <br />
    //                 Loan Amount
    //                 <br />
    //                 Loan Date
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 Customer ID
    //                 <br />
    //                 Party name
    //                 <br />
    //                 Mobile No
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 BranchName
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 Loan Scheme
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 FollowUp Date
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 Next FollowUp Date
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 FollowUp Method
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 FollowUp By
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 Followup Details
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">
    //                 User Remarks
    //               </th>
    //               <th className="border border-gray-300 p-2 text-left">View</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {followUpData?.map((row, idx) => (
    //               <tr key={idx} className="bg-white hover:bg-gray-50 align-top">
    //                 <td className="border border-gray-300 p-2 whitespace-nowrap">
    //                   {row.id}
    //                   <br />
    //                   {row.Loan_amount}
    //                   <br />
    //                  {row.created_at
    // ? new Date(row.created_at).toLocaleDateString("en-GB")
    // : "-"}

    //                 </td>
    //                 <td className="border border-gray-300 p-2">
    //                   {row.BorrowerId}
    //                   <br />
    //                   {row.Print_Name}
    //                   <br />
    //                   {row.Mobile_Number}
    //                 </td>
    //                 <td className="border border-gray-300 p-2">
    //                   {row.branch_id}
    //                 </td>
    //                 <td className="border border-gray-300 p-2">{row.Scheme}</td>
    //                 <td className="border border-gray-300 p-2">
    //                   {row.followUpDate
    //                     ? new Date(row.followUpDate).toLocaleDateString("en-GB")
    //                     : "-"}
    //                 </td>

    //                 <td className="border border-gray-300 p-2">
    //                   {row.nextFollowDate
    //                     ? new Date(row.nextFollowDate).toLocaleDateString("en-GB")
    //                     : "-"}
    //                 </td>

    //                 <td className="border border-gray-300 p-2">
    //                   {row.followUpMethod}
    //                 </td>
    //                 <td className="border border-gray-300 p-2 uppercase">
    //                   {row.followUpBy}
    //                 </td>
    //                 <td className="border border-gray-300 p-2">
    //                   {row.followUpRemarks}
    //                 </td>
    //                 <td className="border border-gray-300 p-2">
    //                   {row.employeeRemarks}
    //                 </td>
    //                 <td className="border border-gray-300 p-2">
    //                   <button
    //                     onClick={() => handleFollowUp(row)}
    //                     className="text-blue-500 font-bold hover:underline"
    //                   >
    //                     Followup
    //                   </button>
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //         <div className="h-64 bg-white"></div>
    //       </div>
    //     </div>
    //   </div>

    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      {/* 🟦 Top Header & Control Bar */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex items-center w-full max-w-[1400px] rounded-[11px] border border-gray-200 shadow-sm bg-white overflow-hidden px-6 py-3 gap-6">

          {/* Title */}
          <h2 className="text-red-600 font-bold text-[18px] whitespace-nowrap uppercase tracking-tight">
            Loan Follow Up List
          </h2>

          {/* Customer ID */}
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Customer ID</label>
            <input
              type="text"
              className="border border-gray-300 p-1.5 rounded text-[11px] w-28 outline-none focus:border-[#1a8a81] bg-white"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>

          {/* Loan No */}
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Loan No</label>
            <input
              type="text"
              className="border border-gray-300 p-1.5 rounded text-[11px] w-28 outline-none focus:border-[#1a8a81] bg-white"
              value={loanNo}
              onChange={(e) => setLoanNo(e.target.value)}
            />
          </div>

          {/* Search Type */}
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">Search Type</label>
            <select
              className="border border-gray-300 p-1.5 rounded text-[11px] min-w-[160px] bg-white outline-none focus:border-[#1a8a81]"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="All Loan Wise">All Loan Wise</option>
              <option value="Open Loan Wise">Open Loan Wise</option>
              <option value="Close Loan Wise">Close Loan Wise</option>
              <option value="Follow up Date Wise">Follow up Date Wise</option>
              <option value="Next Follow up Date Wise">Next Follow up Date Wise</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={fetchData}
            className="h-[34px] px-6 rounded bg-[#0A2478] text-white text-[12px] font-bold shadow-sm active:scale-95 uppercase whitespace-nowrap"
          >
            Search
          </button>

          {/* Add Button (right aligned) */}
          <button
            onClick={() => navigate("/add_follow_up")}
            className="ml-auto flex items-center gap-1.5 bg-[#0A2478] text-white px-4 h-[34px] rounded shadow-sm transition-all active:scale-95 text-[12px] font-bold whitespace-nowrap"
          >
            <span className="text-lg leading-none">+</span> ADD NEW
          </button>

        </div>

      </div>

      {/* 🟢 Table Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1400px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto min-h-[500px]">
            <table className="w-full text-left border-collapse min-w-[1300px]">
              <thead className="sticky top-0 z-10 shadow-sm">
                <tr className="bg-[#0A2478] text-gray-100 text-[10px] font-bold">
                  <th className="border border-gray-300 p-3">LOAN DETAILS</th>
                  <th className="border border-gray-300 p-3">CUSTOMER INFO</th>
                  <th className="border border-gray-300 p-3">BRANCH & SCHEME</th>
                  <th className="border border-gray-300 p-3 text-center">FOLLOW UP DATES</th>
                  <th className="border border-gray-300 p-3">METHOD & BY</th>
                  <th className="border border-gray-300 p-3">REMARKS & DETAILS</th>
                  <th className="border border-gray-300 p-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-[11px] text-gray-700">
                {followUpData?.length > 0 ? (
                  followUpData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors border-b border-gray-200 align-top">
                      {/* Loan Details Column */}
                      <td className="border border-gray-300 p-3">
                        <div className="font-bold text-[#005a9c] mb-1">{row.id}</div>
                        <div className="font-mono text-green-700 font-bold">₹{Number(row.Loan_amount).toLocaleString()}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-1">
                          {row.created_at ? new Date(row.created_at).toLocaleDateString("en-GB") : "-"}
                        </div>
                      </td>

                      {/* Customer Info Column */}
                      <td className="border border-gray-300 p-3">
                        <div className="text-[10px] text-gray-400 uppercase font-bold">{row.BorrowerId}</div>
                        <div className="font-bold uppercase text-gray-900">{row.Print_Name}</div>
                        <div className="text-blue-600 font-mono">{row.Mobile_Number}</div>
                      </td>

                      {/* Branch & Scheme Column */}
                      <td className="border border-gray-300 p-3">
                        <div className="mb-1"><span className="text-gray-400 uppercase text-[9px] block">Branch</span>{row.branch_id}</div>
                        <div><span className="text-gray-400 uppercase text-[9px] block">Scheme</span>{row.Scheme}</div>
                      </td>

                      {/* Dates Column */}
                      <td className="border border-gray-300 p-3 text-center bg-gray-50/30">
                        <div className="mb-2">
                          <span className="text-[9px] font-bold text-gray-400 block uppercase">Last Followup</span>
                          <span className="font-mono">{row.followUpDate ? new Date(row.followUpDate).toLocaleDateString("en-GB") : "-"}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-red-400 block uppercase">Next Followup</span>
                          <span className="font-mono font-bold text-red-700">{row.nextFollowDate ? new Date(row.nextFollowDate).toLocaleDateString("en-GB") : "-"}</span>
                        </div>
                      </td>

                      {/* Method & User Column */}
                      <td className="border border-gray-300 p-3">
                        <div className="mb-1">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-[4px] font-bold text-[9px] uppercase tracking-wider">
                            {row.followUpMethod}
                          </span>
                        </div>
                        <div className="text-gray-500 font-medium uppercase text-[10px]">
                          By: <span className="text-gray-800">{row.followUpBy}</span>
                        </div>
                      </td>

                      {/* Remarks Column */}
                      <td className="border border-gray-300 p-3">
                        <div className="mb-1 italic text-gray-600">"{row.followUpRemarks}"</div>
                        <div className="text-[10px] border-t border-gray-100 pt-1 text-gray-500">
                          <span className="font-bold text-gray-400">User:</span> {row.employeeRemarks}
                        </div>
                      </td>

                      {/* Action Column */}
                      <td className="border border-gray-300 p-3 text-center">
                        <button
                          onClick={() => handleFollowUp(row)}
                          className="bg-white border border-blue-500 text-blue-600 px-3 py-1.5 rounded font-bold hover:bg-blue-500 hover:text-white transition-all shadow-sm uppercase text-[10px]"
                        >
                          Followup
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-16 text-center text-gray-400 italic bg-gray-50 uppercase tracking-widest text-[10px]">
                      No follow-up records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loan_follow_up;
