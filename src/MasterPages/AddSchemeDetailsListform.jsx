
import React, { useState } from "react";

const formFields = [
  { name: "schemeName", label: "Scheme Name", type: "text", required: true },
  { name: "description", label: "Description", type: "text", required: true },
  { name: "product", label: "Product", type: "text"},
  { name: "applicableFrom", label: "Applicable From", type: "date", required: true },
  { name: "applicableTo", label: "Applicable To", type: "date" },
  { name: "calcBasisOn", label: "Cal. basis on", type: "select", options: ["Monthly", "Yearly", "Daily"], required: true },
  { name: "calcMethod", label: "Calc. Method", type: "select", options: ["Simple", "Multiple"] },
  { name: "paymentFrequency", label: "Payment Frequency", type: "text" },
  { name: "compound", label: "Compound", type: "select", options: ["Yes", "No"] },
  { name: "interestInAdvance", label: "Interest in Advance", type: "select", options: ["Yes", "No"] },
  { name: "preCloseMinDays", label: "Pre Close Min Days", type: "number" },
  { name: "penaltyType", label: "Penalty Type", type: "select", options: ["Percent", "Amount"] },
  { name: "penalty", label: "Penalty", type: "number" },
  { name: "minLoanAmount", label: "Min Loan Amount", type: "number" },
  { name: "paymentBasisOn", label: "Payment Basis On", type: "select", options: ["Interest", "EMI"] },
  { name: "loanPeriod", label: "Loan Period", type: "number" },
  { name: "goldApproxPercent", label: "Gold approx %", type: "number" },
  { name: "maxLoanAmount", label: "Max Loan Amount", type: "number" },
  { name: "forPartyType", label: "For Party Type", type: "select", options: ["Individual", "Corporate"] },
];

const FormField = ({ field, formData, errors, handleInputChange }) => (
 <div className="flex flex-col">
  <label className="text-xs font-medium mb-1 whitespace-nowrap">
    {field.label}
    {field.required && <span className="text-red-600">*</span>}
  </label>
  {field.type === "select" ? (
    <select
      name={field.name}
      value={formData[field.name] || ""}
      onChange={handleInputChange}
      className={`px-2 py-1 border rounded text-xs ${
        errors[field.name] ? "border-red-500" : "border-gray-300"
      }`}
    >
      <option value="">Select {field.label}</option>
      {field.options.map((opt) => (
        <option key={opt} value={opt.toLowerCase()}>
          {opt}
        </option>
      ))}
    </select>
  ) : (
    <input
      type={field.type}
      name={field.name}
      value={formData[field.name] || ""}
      onChange={handleInputChange}
      className={`px-2 py-1 border rounded text-xs ${
        errors[field.name] ? "border-red-500" : "border-gray-300"
      }`}
    />
  )}
</div>

);

const InterestRateTable = ({ interestRates, onChange, addRow, removeRows }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Interest Rate</h3>
    <div className="flex justify-between items-center mb-3">
      <button
        type="button"
        onClick={removeRows}
        className="px-4 py-2 text-white text-sm rounded"
        style={{ backgroundColor: "#C1121F" }}
      >
        Remove
      </button>
      <button
        type="button"
        onClick={addRow}
        className="px-4 py-2 text-white text-sm rounded"
        style={{ backgroundColor: "#0A2478" }}
      >
        Add New
      </button>
    </div>
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr style={{ backgroundColor: "#0A2478", color: "white" }}>
            <th className="p-3 border-r">Select</th>
            <th className="p-3 border-r">No.</th>
            <th className="p-3 border-r">Type</th>
            <th className="p-3">Add to %</th>
          </tr>
        </thead>
        <tbody>
          {interestRates.map((rate, i) => (
            <tr key={rate.id} className={i % 2 ? "bg-gray-50" : ""}>
              <td className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={rate.selected}
                  onChange={(e) => onChange(rate.id, "selected", e.target.checked)}
                />
              </td>
              <td className="p-3 text-center">{i + 1}</td>
              <td className="p-3">
                <select
                  value={rate.type}
                  onChange={(e) => onChange(rate.id, "type", e.target.value)}
                  className="w-full border rounded p-1"
                >
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </td>
              <td className="p-3">
                <input
                  type="number"
                  step="0.01"
                  value={rate.addToPercent}
                  onChange={(e) => onChange(rate.id, "addToPercent", e.target.value)}
                  className="w-full border rounded p-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AddSchemeDetailsListform = () => {
  const [formData, setFormData] = useState({});
  const [interestRates, setInterestRates] = useState([{ id: 1, selected: false, type: "days", addToPercent: "" }]);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleInterestRateChange = (id, field, value) =>
    setInterestRates((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

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

  // Split fields: first 7 and remaining
  const firstRowFields = formFields.slice(0, 7);
  const secondRowFields = formFields.slice(7);

  return (
    <div className="min-h-screen bg-white p-5">
        <div className="flex justify-center ">
                <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
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
                        Add Scheme Details List form
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
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                            >
                                Save
                            </button>

                            <button
                                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
      <div className="bg-white rounded-lg  px-20">
        {/* Styled Header */}
        

        {/* First Row (7 fields) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-6 mt-4">
          {firstRowFields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
          ))}
        </div>

        {/* Second Row (rest of the fields) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-4 mb-6">
          {secondRowFields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
          ))}
        </div>

        {/* Document Charges */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Document Charge</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["docChargePercent", "docChargeMin", "docChargeMax"].map((name, i) => (
              <div key={name} className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                  {["% of Loan Amount", "Min", "Max"][i]}
                </label>
                <input
                  type="number"
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Interest Table */}
        <InterestRateTable
          interestRates={interestRates}
          onChange={handleInterestRateChange}
          addRow={addRow}
          removeRows={removeRows}
        />
      </div>
    </div>
  );
};

export default AddSchemeDetailsListform;
