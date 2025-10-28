import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAssignBranchApi, updateAssignBranchApi, } from "../API/Master/User_Management/BranchMapping";
import {  fetchBranchesApi } from "../API/Master/Master_Profile/Branch_Details";

const AddMemberBranchMapping = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [branches, setBranches] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [selectedBranches, setSelectedBranches] = useState([]);

  useEffect(() => {
    document.title = "SLF | Add Member Branch Mapping";
    if (id) {
      loadEmployeeBranchMapping();
      loadBranches();
    }
  }, [id]);

  const loadEmployeeBranchMapping = async () => {
    try {
      const res = await getAssignBranchApi(id);
      setEmployee(res);
      setSelectedBranches(res.assign_branch.map((b) => b.branch_id));
    } catch (err) {
      console.error("❌ Error fetching employee branch mapping:", err);
    }
  };

  const loadBranches = async () => {
    try {
      const res = await fetchBranchesApi();
      setBranches(res.branches);
    } catch (err) {
      console.error("❌ Error fetching branches:", err);
    }
  };

  const handleCheckboxChange = (branch_id) => {
    setSelectedBranches((prev) =>
      prev.includes(branch_id)
        ? prev.filter((id) => id !== branch_id)
        : [...prev, branch_id]
    );
  };

  const handleSave = async () => {
    try {
      const selected = branches
        .filter((b) => selectedBranches.includes(b.id))
        .map((b) => ({
          branch_id: b.id,
          branch_name: b.branch_name,
        }));

      const payload = { id: Number(id), branches: selected };
      const res = await updateAssignBranchApi(payload);

      alert(res.message);
      navigate("/Member-Branch-Mapping");
    } catch (err) {
      console.error("❌ Error updating branch mapping:", err);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
          <h2 className="text-red-600 font-bold text-[20px]">Member Branch Mapping</h2>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-[#0A2478] text-white text-[11.25px] w-[74px] h-[24px] rounded flex items-center justify-center"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/Member-Branch-Mapping")}
              className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 px-32">
        <div className="flex flex-col gap-2 w-[540px]">
          <label className="text-gray-700 font-medium">Employee Name</label>
          <input
            type="text"
            value={employee?.emp_name || ""}
            readOnly
            className="border border-[#C4C4C4] rounded-md px-1 py-1"
          />
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <label className="text-gray-700 font-medium">Select Branches</label>
          <div className="flex flex-wrap gap-12">
            {branches.map((branch) => (
              <label key={branch.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBranches.includes(branch.id)}
                  onChange={() => handleCheckboxChange(branch.id)}
                  className="w-5 h-5 accent-blue-900"
                />
                <span>{branch.branch_code} - {branch.branch_name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberBranchMapping;
