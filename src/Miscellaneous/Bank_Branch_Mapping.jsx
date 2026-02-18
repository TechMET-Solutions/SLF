import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../utils/cryptoHelper";

const Bank_Branch_Mapping = () => {
  // Mock data based on the provided branch list image
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleBankClick = (branch) => {
    // Navigate and pass the specific branch data
    navigate("/BankBranchMapping", { state: { branch } });
  };

  const [branchData, setBranchData] = useState([]);
  console.log(branchData, "branchData");
  useEffect(() => {
    fetchBranches(page, limit);
  }, [page, limit]);

  const fetchBranches = async (pageNo = page, pageSize = limit) => {
    try {
      const res = await axios.get(
        `https://slunawat.co.in/Master/Master_Profile/get_Branches?page=${pageNo}&limit=${pageSize}&search=`,
      );

      const decrypted = decryptData(res.data.data);

      if (decrypted) {
        setBranchData(decrypted.branches);
        setPage(decrypted.page);
        setLimit(decrypted.limit);
        setTotal(decrypted.total);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // const branchData = [
  //   { id: 10, code: "", name: "", address1: "", address2: "" },
  //   {
  //     id: 9,
  //     code: "B1",
  //     name: "Nashik",
  //     address1: "Nashik Maharashtra",
  //     address2: "Nashik Maharashtra",
  //   },
  //   {
  //     id: 8,
  //     code: "v1",
  //     name: "Bhagurv1",
  //     address1: "318, naheru road",
  //     address2: "Bhagur",
  //   },
  //   {
  //     id: 7,
  //     code: "V1",
  //     name: "Bhagur V1",
  //     address1: "318, Nehru Road",
  //     address2: "Bhagur",
  //   },
  //   {
  //     id: 6,
  //     code: "03",
  //     name: "Nashik B3",
  //     address1: "Dattakrupa, Opp Bhole Mangal Karyalay,",
  //     address2: "CIDCO",
  //   },
  //   {
  //     id: 5,
  //     code: "V2",
  //     name: "Nasikroad V2",
  //     address1: "Shop 1, Pratik arcade",
  //     address2: "Bytco Point",
  //   },
  //   {
  //     id: 4,
  //     code: "V3",
  //     name: "Nashik V3",
  //     address1: "Dattakrupa, Opp Bhole Mangal Karyalay,",
  //     address2: "CIDCO",
  //   },
  //   {
  //     id: 3,
  //     code: "999",
  //     name: "Head Office",
  //     address1: "S Lunawat Jewellers",
  //     address2: "318, Nehru Road, Bhagur.",
  //   },
  //   {
  //     id: 2,
  //     code: "02",
  //     name: "Nasikroad B2",
  //     address1: "Shop No.1, Pratik Arcade,",
  //     address2: "Nasik-Pune Road, Bytco Point,",
  //   },
  //   {
  //     id: 1,
  //     code: "01",
  //     name: "Bhagur B1",
  //     address1: "S Lunawat Jewellers",
  //     address2: "318, Nehru Road, Bhagur",
  //   },
  // ];
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="m-2 border border-[#008080] bg-white shadow-sm font-sans">
      {/* Title Bar */}
      <div className="bg-[#008080] text-white px-4 py-1.5 text-sm font-semibold">
        Branch List
      </div>

      <div className="p-2">
        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-300">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-300">
                <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700 w-24">
                  Branch Id
                </th>
                <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700 w-24">
                  Code
                </th>
                <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700 w-48">
                  Name
                </th>
                <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700">
                  Address 1
                </th>
                <th className="border-r border-gray-300 p-2 text-left font-medium text-gray-700">
                  Address 2
                </th>
                <th className="p-2 text-left font-medium text-gray-700 w-32">
                  Branch Mapping
                </th>
              </tr>
            </thead>
            <tbody>
              {branchData.map((branch, index) => (
                <tr
                  key={branch.id}
                  className={`border-b border-gray-200 hover:bg-teal-50/30 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {/* Branch Id */}
                  <td className="border-r border-gray-200 p-2">{branch.id}</td>

                  {/* Code */}
                  <td className="border-r border-gray-200 p-2">
                    {branch.branch_code}
                  </td>

                  {/* Name */}
                  <td className="border-r border-gray-200 p-2">
                    {branch.branch_name}
                  </td>

                  {/* Address 1 */}
                  <td className="border-r border-gray-200 p-2 text-gray-600">
                    {branch.address_line1}
                  </td>

                  {/* Address 2 (we don’t have, so show print_name / lead_person nicely) */}
                  <td className="border-r border-gray-200 p-2 text-gray-600">
                    <div>{branch.print_name}</div>
                    <div className="text-[11px] text-gray-400">
                      {branch.lead_person}
                    </div>
                  </td>

                  {/* Branch Mapping */}
                  <td className="p-2">
                    <button
                      onClick={() => handleBankClick(branch)}
                      className="text-blue-600 hover:underline font-bold"
                    >
                      Bank
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="bg-gray-100 p-2 flex justify-between items-center text-[11px] border-t border-gray-300">
            <div className="flex items-center gap-1">
              {/* First */}
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="px-2 py-1 border bg-white"
              >
                «
              </button>

              {/* Prev */}
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-2 py-1 border bg-white"
              >
                ‹
              </button>

              {/* Current Page */}
              <button className="px-3 py-1 border border-orange-500 bg-orange-500 text-white rounded-full font-bold">
                {page}
              </button>

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-2 py-1 border bg-white"
              >
                ›
              </button>

              {/* Last */}
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="px-2 py-1 border bg-white"
              >
                »
              </button>

              {/* Limit */}
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="ml-4 border bg-white px-1 py-0.5 outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <span className="ml-1 text-gray-600 italic">items per page</span>
            </div>
          </div>
        </div>

        {/* Exit Button */}
        <div className="mt-4">
          <button className="bg-[#1a5d9b] text-white px-6 py-1.5 text-xs font-semibold rounded-sm flex items-center gap-2 hover:bg-blue-800 transition-shadow">
            <span className="text-lg leading-none">✖</span> Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bank_Branch_Mapping;
