import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import {
  updateAssignBranchApi
} from "../API/Master/User_Management/BranchMapping";
import Loader from "../Component/Loader";

const AddMemberBranchMapping = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
const name = new URLSearchParams(location.search).get("name");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [branches, setBranches] = useState([]);

  console.log(branches, "branches");
  const [employee, setEmployee] = useState(null);
  const [selectedBranches, setSelectedBranches] = useState([]);


  useEffect(() => {
    document.title = "SLF | Add Member Branch Mapping";

    if (id) {
      loadEmployeeBranchMapping();
    }

    loadBranches(page); // 🔥 important
  }, [id, page]);

  const loadEmployeeBranchMapping = async () => {
    setLoading(true);
    debugger;
    try {
      const res = await axios.get(
        `https://slunawat.co.in/Master/Master_Profile/EmployeeBranchess/${id}`,
      );

      const data = res.data.data; // ✅ actual array

      // store full branch list
      setEmployee(data);
setLoading(false);
      // extract only IDs
      setSelectedBranches(data.map((b) => b.id));
    } catch (err) {
      console.error("❌ Error fetching employee branch mapping:", err);
      setLoading(false);
    }
  };

  const loadBranches = async (page = 1, search = "") => {
     setLoading(true);
    try {
      const res = await axios.get(
        `${API}/Master/Master_Profile/getBranchesWithPagination`,
        {
          params: {
            page,
            limit,
            search,
          },
        },
      );

      if (res.data.success) {
        setBranches(res.data.branches || []);
        setTotal(res.data.total || 0);
         setLoading(false);
      } else {
        setBranches([]);
        setTotal(0);
         setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
       setLoading(false);
    }
  };

  const handleCheckboxChange = (branch_id) => {
    setSelectedBranches((prev) =>
      prev.includes(branch_id)
        ? prev.filter((id) => id !== branch_id)
        : [...prev, branch_id],
    );
  };

//   const handleSave = async () => {
//     debugger
//   try {
//     // only store branch IDs
//     const selected = branches
//       .filter((b) => selectedBranches.includes(b.id))
//       .map((b) => b.id);

//     const payload = { id: Number(id), branches: selected };

//     const res = await updateAssignBranchApi(payload);

//     alert(res.message);
//     navigate("/Member-Details");
//   } catch (err) {
//     console.error("❌ Error updating branch mapping:", err);
//   }
// };
  const handleSave = async () => {
   setLoading(true);
  try {
    const payload = {
      id: Number(id),

      // ✅ directly send all selected IDs
      branches: selectedBranches.map((b) => Number(b)),
    };

    console.log("FINAL PAYLOAD:", payload);

    const res = await updateAssignBranchApi(payload);

    alert(res.message);
    setLoading(false);
    navigate("/Member-Details");

  } catch (err) {
    console.error("❌ Error updating branch mapping:", err);
    setLoading(false);
  }
};
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };
  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-center sticky top-[50px] z-40">
        <div className="flex items-center px-6 py-4 border-b w-[1462px] h-[40px] border  border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px]">
            Member Branch Mapping
          </h2>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/Member-Details")}
              className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 ml-[25px]">
        <div className="flex flex-col gap-2 w-[540px]">
          <label className="text-gray-700 font-medium">Employee Name</label>
          <input
            type="text"
            value={name || ""}
            readOnly
            disabled
            className="border border-[#C4C4C4] rounded-md px-2 py-1 disabled:bg-gray-200"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <label className="text-gray-700 font-medium">Select Branches</label>
          <div className=" gap-3">
            {branches.map((branch) => (
              <label key={branch.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBranches.includes(branch.id)}
                  onChange={() => handleCheckboxChange(branch.id)}
                  className="w-5 h-5 accent-blue-900"
                />
                <span>
                  {branch.branch_code} - {branch.branch_name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-5  items-center mt-4 ">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default AddMemberBranchMapping;
