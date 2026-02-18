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
    <div className="min-h-screen bg-white font-sans text-[12px] text-gray-800">
      {/* 2. Main Content Container */}
      <div className="m-2 border border-[#1a8a81] shadow-sm">
        {/* Title Bar with Add Button */}
        <div className="bg-[#1a8a81] text-white px-3 py-1 flex justify-between items-center font-semibold text-sm">
          <span>Loan Follow Up List</span>
          <button
            onClick={() => navigate("/add_follow_up")} // Add the click handler
            className="bg-[#5ba1d2] hover:bg-blue-700 text-white px-3 py-0.5 rounded text-xs flex items-center gap-1 border border-blue-300"
          >
            <span className="text-lg leading-none">+</span> Add
          </button>
        </div>

        {/* Filter Section */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-gray-600">Customer ID</label>
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-32 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-gray-600">Loan No</label>
              <input
                type="text"
                value={loanNo}
                onChange={(e) => setLoanNo(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-32 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-gray-600">Search Type</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="border border-gray-300 px-2 py-1 w-40 outline-none focus:border-blue-500 bg-white"
              >
                <option value="All Loan Wise">All Loan Wise</option>
                <option value="Open Loan Wise">Open Loan Wise</option>
                <option value="Close Loan Wise">Close Loan Wise</option>
                <option value="Follow up Date Wise">Follow up Date Wise</option>
                <option value="Next Follow up Date Wise">
                  Next Follow up Date Wise
                </option>
              </select>
            </div>

            <button
              onClick={fetchData}
              className="bg-[#005a9c] text-white px-6 py-1 rounded shadow-sm hover:bg-blue-700 font-semibold transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* 3. Result Table Section */}
        <div className="bg-white overflow-x-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead className="bg-[#f2f2f2] text-gray-600 font-semibold border-b border-gray-300">
              <tr>
                <th className="border border-gray-300 p-2 text-left">
                  LoanNo
                  <br />
                  Loan Amount
                  <br />
                  Loan Date
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Customer ID
                  <br />
                  Party name
                  <br />
                  Mobile No
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  BranchName
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Loan Scheme
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  FollowUp Date
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Next FollowUp Date
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  FollowUp Method
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  FollowUp By
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Followup Details
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  User Remarks
                </th>
                <th className="border border-gray-300 p-2 text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {followUpData?.map((row, idx) => (
                <tr key={idx} className="bg-white hover:bg-gray-50 align-top">
                  <td className="border border-gray-300 p-2 whitespace-nowrap">
                    {row.id}
                    <br />
                    {row.Loan_amount}
                    <br />
                   {row.created_at
  ? new Date(row.created_at).toLocaleDateString("en-GB")
  : "-"}

                  </td>
                  <td className="border border-gray-300 p-2">
                    {row.BorrowerId}
                    <br />
                    {row.Print_Name}
                    <br />
                    {row.Mobile_Number}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {row.branch_id}
                  </td>
                  <td className="border border-gray-300 p-2">{row.Scheme}</td>
                  <td className="border border-gray-300 p-2">
                    {row.followUpDate
                      ? new Date(row.followUpDate).toLocaleDateString("en-GB")
                      : "-"}
                  </td>

                  <td className="border border-gray-300 p-2">
                    {row.nextFollowDate
                      ? new Date(row.nextFollowDate).toLocaleDateString("en-GB")
                      : "-"}
                  </td>

                  <td className="border border-gray-300 p-2">
                    {row.followUpMethod}
                  </td>
                  <td className="border border-gray-300 p-2 uppercase">
                    {row.followUpBy}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {row.followUpRemarks}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {row.employeeRemarks}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleFollowUp(row)}
                      className="text-blue-500 font-bold hover:underline"
                    >
                      Followup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-64 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Loan_follow_up;
