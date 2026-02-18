import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import { encryptData } from "../utils/cryptoHelper";

const SchemeRoleMapping = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state || {};
  console.log(rowData, "rowData");

  const [schemes, setSchemes] = useState([]);
  console.log(schemes, "scheme");
  const [selectedSchemes, setSelectedSchemes] = useState([]);

  useEffect(() => {
    document.title = "SLF | Scheme Role Mapping ";
    fetchSchemes();
  }, []);

  // ✅ Fetch all schemes
  const fetchSchemes = async () => {
    try {
      const response = await axios.get(`${API}/Scheme/getAllSchemes`);

      if (response.data.items && Array.isArray(response.data.items)) {
        // ✅ Corrected: map over response.data.data
        const formattedSchemes = response.data.items.map((item) => ({
          id: item.id,
          schemeName: item.schemeName,
        }));

        setSchemes(formattedSchemes);

        // ----- Preselected Schemes from rowData -----
        if (rowData.schemes) {
          try {
            const parsedSchemes =
              typeof rowData.schemes === "string"
                ? JSON.parse(rowData.schemes)
                : rowData.schemes;

            if (Array.isArray(parsedSchemes)) {
              const preselectedIds = parsedSchemes.map((s) => s.id);
              setSelectedSchemes(preselectedIds);
            }
          } catch (e) {
            console.error("Error parsing schemes from rowData:", e);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
  };

  // ✅ Handle checkbox toggle
  const toggleScheme = (schemeId) => {
    setSelectedSchemes((prev) =>
      prev.includes(schemeId)
        ? prev.filter((id) => id !== schemeId)
        : [...prev, schemeId],
    );
  };

  const handleSave = async () => {
    try {
      const payload = {
        branchId: rowData.id,
        schemes: schemes
          .filter((scheme) => selectedSchemes.includes(scheme.id))
          .map((s) => ({ id: s.id, schemeName: s.schemeName })),
      };

      const encryptedData = encryptData(JSON.stringify(payload));
      const response = await axios.post(
        `${API}/Master/Master_Profile/updateBranchSchemes`,
        {
          data: encryptedData,
        },
      );

      console.log("✅ Saved successfully:", response.data);
      alert("Schemes saved successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error saving schemes:", error);
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Topbar */}
      <div className="flex justify-center sticky top-[80px] z-40">
        <div className="flex items-center px-6 py-4 mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "148%",
            }}
            className="text-red-600"
          >
            Scheme Role Mapping — {rowData.branch_name || "N/A"}
          </h2>

          <div className="flex items-center gap-3">
            <button
              className="text-white px-4 py-1 rounded bg-[#0A2478] text-sm"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-white px-4 py-1 rounded bg-[#C1121F] text-sm"
              onClick={() => navigate(-1)}
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-center">
        <div className="flex gap-8 mt-5 w-[1290px]">
          {/* Left - Branch Info */}
          <div className="flex flex-col gap-4 w-1/2">
            <div>
              <label className="block text-sm font-medium mb-1">
                Branch Code
              </label>
              <input
                type="text"
                value={rowData.branch_code || ""}
                readOnly
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm bg-gray-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Branch Name
              </label>
              <input
                type="text"
                value={rowData.branch_name || ""}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Branch Address
              </label>
              <input
                type="text"
                value={`${rowData.address_line1 || ""}${
                  rowData.address_line3 ? ", " + rowData.address_line3 : ""
                }`}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none"
              />
            </div>
          </div>

          {/* Right - Scheme Selection */}
          <div className="w-[300px] shadow rounded-md flex flex-col">
            <div className="bg-[#0A2478] text-white px-4 py-2 font-medium rounded-t">
              Select Scheme
            </div>

            <div
              className="flex-1 max-h-[450px] overflow-y-auto px-4 py-2 hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>
                {`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>

              {schemes.length > 0 ? (
                schemes.map((scheme) => (
                  <label
                    key={scheme.id}
                    className="flex items-center gap-2 py-2 text-sm cursor-pointer border-b border-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSchemes.includes(scheme.id)}
                      onChange={() => toggleScheme(scheme.id)}
                      className="w-5 h-5 mr-3"
                    />
                    {scheme.schemeName}
                  </label>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  No schemes available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeRoleMapping;
