import { useEffect, useState } from "react";

const AddSchemeDetailsform = () => {
  useEffect(() => {
    document.title = "SLF | Add Scheme Details Form";
  }, []);
  const [formData, setFormData] = useState({});
  const [interestRates, setInterestRates] = useState([
    { id: 1, selected: false, type: "days", addToPercent: "" },
  ]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleInterestRateChange = (id, field, value) =>
    setInterestRates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );

  const addRow = () =>
    setInterestRates((prev) => [
      ...prev,
      { id: prev.length + 1, selected: false, type: "days", addToPercent: "" },
    ]);

  const removeRows = () => {
    const hasSelection = interestRates.some((r) => r.selected);
    if (!hasSelection) return alert("Please select at least one row.");
    setInterestRates((prev) => prev.filter((r) => !r.selected));
  };

  const validateForm = () => {
    const required = ["schemeName", "description", "applicableFrom", "calcBasisOn"];
    const newErrors = {};
    required.forEach((f) => !formData[f]?.trim() && (newErrors[f] = true));
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return alert("Please fill all required fields.");
    console.log("Form Data:", formData, "Interest Rates:", interestRates);
    alert("Form saved!");
  };

  return (
    <div className="min-h-screen bg-white p-5">
      {/* Topbar */}
      <div className="flex justify-center">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow bg-white">
          <h2 className="text-red-600 text-[20px] font-bold">
            Add Scheme Details Form
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-[#0A2478] text-white text-[11.25px] px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-[#C1121F] text-white text-[11px] px-3 py-1 rounded"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
      {/* Form Fields */}
      <div className="bg-white rounded-lg px-2 mt-2 flex flex-col gap-4">
        {/* Row 1 */}
        <div className="flex gap-6 ">
          <div className="flex flex-col ">
            <label className="text-xs font-medium mb-1 ">
              Scheme Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="schemeName"
              value={formData.schemeName || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 w-60 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
              placeholder="Scheme Name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Description <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 w-85 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Applicable From <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="applicableFrom"
              value={formData.applicableFrom || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 w-35 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Applicable To <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="applicableTo"
              value={formData.applicableTo || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 w-35 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Cal. Basis On <span className="text-red-600">*</span>
            </label>
            <select
              name="calcBasisOn"
              value={formData.calcBasisOn || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 w-25 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Monthly</option>
              <option value="Daily">Daily</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Add 1 Day <span className="text-red-600">*</span>
            </label>
            <select
              name="addDay"
              value={formData.addDay || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 w-20 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Calc. Method </label>
            <select
              name="calcMethod"
              value={formData.calcMethod || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 w-20 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Simple">Simple</option>
              <option value="Multiple">Multiple</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex gap-4">
          <div className="flex flex-col  w-30 ">
            <label className="text-xs font-medium mb-1 "> Payment Frequency <span className="text-red-600">*</span></label>

            <div className="flex w-30">
              <input
                type="number"
                placeholder="185"
                style={{
                  MozAppearance: "textfield",
                }}
                onWheel={(e) => e.target.blur()}
                className="flex-1 w-15 border border-gray-300 rounded-l-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-[#0A2478] text-white px-4 py-2 rounded-r-md hover:bg-[#081c5b] transition-colors duration-200 text-sm font-medium">
                D
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Compound <span className="text-red-600">*</span></label>
            <select
              name="compound"
              value={formData.compound || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-20 px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Interest in Advance <span className="text-red-600">*</span>
            </label>
            <select
              name="interestAdvance"
              value={formData.interestAdvance || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-27  px-2 py-2 text-xs"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
               Fore Closure Min Days <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              name="preCloserMinDays"
              value={formData.preCloserMinDays || ""}
              onChange={handleInputChange}
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded px-2 w-30 py-2 text-xs"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Penalty Type <span className="text-red-600">*</span></label>
            <select
              name="penaltyType"
              value={formData.penaltyType || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-2 w-22 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Amount">Amount</option>
              <option value="Percent">Percent</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Penalty <span className="text-red-600">*</span></label>
            <input
              type="number"
              name="penalty"
              value={formData.penalty || ""}
              onChange={handleInputChange}
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 rounded w-15 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Min Loan Amount <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="minLoanAmount"
              value={formData.minLoanAmount || ""}
              onChange={handleInputChange}
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded w-29 px-2 py-2 text-xs"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Payment Basis On <span className="text-red-600">*</span>
            </label>
            <select
              name="paymentBasisOn"
              value={formData.paymentBasisOn || ""}
              onChange={handleInputChange}
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded w-28 px-2 py-2 text-xs"
            >
              <option value="Interest">Interest</option>
              <option value="Principal">Principal</option>
            </select>
          </div>

          <div className="flex flex-col mr-6 w-20 ">
            <label className="text-xs font-medium mb-1 ">Loan Period</label>

            <div className="flex w-20">
              <input
                type="number"
                placeholder="185"
                style={{
                  MozAppearance: "textfield",
                }}
                onWheel={(e) => e.target.blur()}
                className="flex-1 w-15 border border-gray-300 rounded-l-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-[#0A2478] text-white px-4 py-2 rounded-r-md hover:bg-[#081c5b] transition-colors duration-200 text-sm font-medium">
                D
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">Gold Approve % </label>
            <input
              type="number"
              name="goldApprove"
              value={formData.goldApprove || ""}
              onChange={handleInputChange}
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded w-20 px-4 py-2 text-xs"
            />
          </div>
        </div>

        {/* Row 5 */}

        {/* Row 6 */}
        <div className="flex gap-6">
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Max Loan Amount <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="maxLoanAmount"
              value={formData.maxLoanAmount || ""}
              onChange={handleInputChange}
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded px-2 py-2 text-xs"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">For Party Type <span className="text-red-600">*</span></label>
            <select
              name="forPartyType"
              value={formData.forPartyType || ""}
              onChange={handleInputChange}
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded px-2 py-2 text-xs"
            >
              <option value="Individual">Individual</option>
              <option value="Company">Company</option>
            </select>
          </div>
        </div>
        {/* Row 7 - Document Charge */}
        <div className="mt-2">
          <h2 className="text-[#0A2478] font-semibold mb-2">
            Document Charges
          </h2>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">% of Loan Amount</label>
              <input
                type="text"
                className="w-[200px] border  border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm  font-medium ">Min</label>
              <input
                type="text"
                className="w-[200px] border  border-gray-300  rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Max</label>
              <input
                type="text"
                className="w-[200px] border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Interest Rate Table */}
      <div className="mt-8 px-2">
        <h3 className="text-lg font-semibold mb-4">Interest Rate</h3>
        <table className="w-full border-collapse border ">
          <thead className="bg-[#0A2478] text-white text-sm">
            <tr>
              <th className="p-2 border">From</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Add Int %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">0</td>
              <td className="border p-2"></td>
              <td className="border p-2">Days</td>
              <td className="border p-2">&#10003;</td>
            </tr>
            <tr>
              <td className="border p-2">0</td>
              <td className="border p-2"></td>
              <td className="border p-2">Days</td>
              <td className="border p-2">&#10003;</td>
            </tr>
            <tr>
              <td className="border p-2">0</td>
              <td className="border p-2"></td>
              <td className="border p-2">Days</td>
              <td className="border p-2">&#10003;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default AddSchemeDetailsform;
