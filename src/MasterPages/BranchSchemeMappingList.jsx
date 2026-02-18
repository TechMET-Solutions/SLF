
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBranchesApi } from "../API/Master/Master_Profile/Branch_Details";


const BranchSchemeMappingList = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    document.title = "SLF | Branch Scheme Mapping List";
    fetchBranches(page);
  }, [page]);

  const fetchBranches = async (pageNum) => {
    const result = await fetchBranchesApi(pageNum, limit);
    if (result) {
      setBranches(result.branches);
      setTotal(result.total);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen w-full">
      {/* Topbar */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
          <h2 className="text-red-600 font-bold text-[20px]">
            Branch Scheme Mapping List (User List)
          </h2>
          <button
          onClick={() => navigate("/")}
          className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]">
            Exit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex pl-[115px]">
        <div className="overflow-x-auto mt-5  h-[500px]">
          <table className="w-full border-collapse">
            <thead className="bg-[#0A2478] text-white text-sm">
              <tr>
                {/* <th className="px-4 py-2 text-left border-r text-[13px]">Branch Id</th> */}
                <th className="px-4 py-2 text-left border-r text-[13px]"> Branch Code</th>
                <th className="px-4 py-2 text-left border-r text-[13px]">Name</th>
            
                <th className="px-4 py-2 text-left border-r text-[13px] w-[350px]">Address</th>
               
                <th className="px-4 py-2 text-left text-[13px]">Scheme Mapping</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {branches.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {/* <td className="px-4 py-2">{row.id}</td> */}
                  <td className="px-4 py-2">{row.branch_code}</td>
                  <td className="px-4 py-2">{row.branch_name}</td>
                
                  <td className="px-4 py-2">{row.address_line1}, {row.address_line3}</td>
                 
                  <td
                    className="px-4 py-2 text-blue-600 font-medium cursor-pointer"
                    onClick={() => navigate("/Scheme-Role-Mapping", { state: row })}
                  >
                    Map
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center px-6 py-3 border-t gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-3 py-1 border rounded-md bg-[#0b2c69] text-white">
          {page}
        </span>
        <span>/ {totalPages}</span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BranchSchemeMappingList;
