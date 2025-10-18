import { useState } from "react";
import { IoIosCloseCircleOutline, IoMdAddCircleOutline } from "react-icons/io";

const FormField = ({
  field,
  formData,
  errors,
  handleInputChange,
  setFormData,
}) => {
  const suffixFields = ["loanPeriod", "paymentFrequency"];
  const suffix = formData.calcBasisOn === "Daily" ? "D" : "M";

  // ✅ Special case for calcBasisOn checkboxes
  if (field.name === "calcBasisOn") {
    return (
      <div className="flex flex-col">
        <label className="text-xs font-medium mb-1 whitespace-nowrap">
          {field.label}
          {field.required && <span className="text-red-600">*</span>}
        </label>

        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              name="calcBasisOn"
              value="Daily"
              checked={formData.calcBasisOn === "Daily"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  calcBasisOn: e.target.checked ? "Daily" : "",
                }))
              }
              className="w-4 h-4"
            />
            Daily
          </label>

          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              name="calcBasisOn"
              value="Monthly"
              checked={formData.calcBasisOn === "Monthly"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  calcBasisOn: e.target.checked ? "Monthly" : "",
                }))
              }
              className="w-4 h-4"
            />
            Monthly
          </label>
        </div>
      </div>
    );
  }

  return (
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
          className={`px-2 py-1 border rounded text-xs ${errors[field.name] ? "border-red-500" : "border-gray-300"
            }`}
        >
          <option value="">Select {field.label}</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            className={`px-2 py-1 border rounded text-xs w-full pr-10 ${errors[field.name] ? "border-red-500" : "border-gray-300"
              }`}
          />
          {suffixFields.includes(field.name) && (
            <span
              className="absolute right-0 top-0 bottom-0 
                        flex items-center justify-center 
                        bg-[#0A2478] text-white text-xs font-semibold 
                        px-3 rounded-r"
            >
              {suffix}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const InterestRateTable = ({ interestRates, onChange, addRow, removeRow }) => (
  <div>
    <h3 className="text-md font-semibold mb-4">Interest Rate</h3>
    <div className="flex justify-between items-center mb-3">
      
    </div>
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr style={{ backgroundColor: "#0A2478", color: "white" }}>
            <th className="p-3 border-r">From</th>
            <th className="p-3 border-r">To</th>
            <th className="p-3 border-r">Type</th>
            <th className="p-3">Add int %</th>
         
          </tr>
        </thead>
        <tbody>
          {interestRates.map((rate, i) => (
            <tr key={rate.id} className={i % 2 ? "bg-gray-50" : ""}>
              <td className="p-3 text-center">
                
              </td>
              <td className="p-3 text-center">
               
              </td>
              <td className="p-3">
                <select
                  value={rate.type}
                  onChange={(e) => onChange(rate.id, "type", e.target.value)}
                  className="w-full  rounded p-1"
                >
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </td>
              <td className="p-3">
                 <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={addRow}
                    className="text-white p-1 rounded flex items-center justify-center"
                    style={{ backgroundColor: "#0A2478" }}
                    title="Add row"
                  >
                    <IoMdAddCircleOutline className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeRow(rate.id)}
                    className="text-white p-1 rounded flex items-center justify-center"
                    style={{ backgroundColor: "#C1121F" }}
                    title="Delete row"
                  >
                    <IoIosCloseCircleOutline className="h-5 w-5" />
                  </button>
                </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AddSchemeDetailsListform = () => {
  const [formData, setFormData] = useState({
    schemeName: "",
    description: "",
    product: "Gold",
    applicableFrom: "",
    applicableTo: "",
    calcBasisOn: "",
    calcMethod: "",
    paymentFrequency: "",
    interestInAdvance: "",
    preCloserMinDays: "",
    penaltyType: "Amount",
    penalty: "",
    minLoanAmount: "",
    loanPeriod: "",
    paymentBasisOn: "",
    goldApprovePercent: "",
    maxLoanAmount: "",
    partyType: "individual",
    administrativeCharges: "",
    interestType: "Floating",
    docChargePercent: "",
    docChargeMin: "",
    docChargeMax: ""
  });

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
    const required = [
      "schemeName",
      "description",
      "applicableFrom",
      "calcBasisOn",
    ];
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

  const handleCalcBasisChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      calcBasisOn: prev.calcBasisOn === value ? "" : value
    }));
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="flex justify-center ">
        <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between shadow">
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
            Add Scheme Details form
          </h2>

          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",
                }}
                onClick={handleSave}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Save
              </button>

              <button className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]">
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg px-20">
        {/* First Row */}
        <div className="flex items-end gap-4 w-full mt-5">
          {/* Scheme Name */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Scheme Name <span className="text-red-500">*</span></label>
            <div className="relative mt-1 w-[180px]">
              <input
                type="text"
                placeholder="Enter Scheme Name*"
                name="schemeName"
                value={formData.schemeName}
                onChange={handleInputChange}
                className={`border border-gray-300 rounded-[8px] px-3 py-2 w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.schemeName ? "border-red-500" : ""
                  }`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Description <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder=""
              className={`border border-gray-300 rounded px-3 py-2 mt-1 w-[350px] bg-white ${errors.description ? "border-red-500" : ""
                }`}
            />
          </div>

          {/* Product */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Product</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleInputChange}
              placeholder="Gold"
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[90px] bg-white"
            />
          </div>

          {/* Applicable From */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Applicable from
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="applicableFrom"
              value={formData.applicableFrom}
              onChange={handleInputChange}
              className={`border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white ${errors.applicableFrom ? "border-red-500" : ""
                }`}
            />
          </div>

          {/* Applicable To */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Applicable To
            </label>
            <input
              type="date"
              name="applicableTo"
              value={formData.applicableTo}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white"
            />
          </div>

          {/* Calculation Basis */}
          <div className="flex flex-col">
            <label className="text-[14px] mb-5 font-medium">
              Cal. basis on
              <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 mb-2 mt-1">
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="calcBasisOn"
                  value="Daily"
                  checked={formData.calcBasisOn === "Daily"}
                  onChange={() => handleCalcBasisChange("Daily")}
                  className="accent-[#0A2478]"
                />
                <span className="text-[14px]">Daily</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="calcBasisOn"
                  value="Monthly"
                  checked={formData.calcBasisOn === "Monthly"}
                  onChange={() => handleCalcBasisChange("Monthly")}
                  className="accent-[#0A2478]"
                />
                <span className="text-[14px]">Monthly</span>
              </label>
            </div>
            {errors.calcBasisOn && (
              <p className="text-red-500 text-xs mt-1">This field is required</p>
            )}


          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Add 1 Day</label>
            <select
              name="addOneDay"

              className="border border-gray-300 rounded px-3 py-2 mt-1 bg-white"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>

            </select>
          </div>

        </div>

        {/* Second Row */}
        <div className="flex items-end gap-4 w-full mt-5">
          {/* Calculation Method */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Calc. Method
            </label>
            <select
              name="calcMethod"
              value={formData.calcMethod}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[104px] bg-white rounded-[8px]"
            >
              <option value="">Select</option>
              <option value="Simple">Simple</option>
              <option value="Multiple">Multiple</option>
              <option value="Compound">Compound</option>
            </select>
          </div>

          {/* Payment Frequency */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Payment Frequency*</label>
            <input
              type="text"
              name="paymentFrequency"
              value={formData.paymentFrequency}
              onChange={handleInputChange}
              placeholder=""
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[132px] bg-white"
            />
          </div>

          {/* Interest in Advance */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Interest in Advance*</label>
            <select
              name="interestInAdvance"
              value={formData.interestInAdvance}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 w-[132px] h-[32px] text-sm"
            >
              <option value="">Yes</option>
              <option value="simple">No</option>

            </select>
          </div>

          {/* Pre Closer Min Days */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Pre Closer Min Days*
            </label>
            <input
              type="number"
              name="preCloserMinDays"
              value={formData.preCloserMinDays}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white"
            />
          </div>

          {/* Penalty Type */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Penalty Type*
            </label>
            <select
              name="penaltyType"
              value={formData.penaltyType}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 w-[132px] h-[32px] text-sm"
            >
              <option value="Amount">Amount</option>
              <option value="Percent">Percent</option>
            </select>
          </div>

          {/* Penalty */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Penalty*
            </label>
            <input
              type="number"
              name="penalty"
              value={formData.penalty}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[132px] bg-white"
            />
          </div>

          {/* Min Loan Amount */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Min Loan Amount*
            </label>
            <input
              type="number"
              name="minLoanAmount"
              value={formData.minLoanAmount}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[132px] bg-white"
            />
          </div>

          {/* Payment Basis On */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Payment Basis On*</label>
            <input
              type="number"
              name="paymentBasisOn"
              value={formData.paymentBasisOn}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[132px] bg-white"
            />
          </div>

          {/* Loan Period */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Loan Period*</label>
            <input
              type="number"
              name="loanPeriod"
              value={formData.loanPeriod}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[132px] bg-white"
            />
          </div>
        </div>

        {/* Third Row */}
        <div className="flex items-end gap-4 w-full mt-5">
          {/* Gold Approve % */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Gold approve %</label>
            <input
              type="number"
              name="goldApprovePercent"
              value={formData.goldApprovePercent}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[132px] bg-white"
            />
          </div>

          {/* Max Loan Amount */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Max Loan Amount*</label>
            <input
              type="number"
              name="maxLoanAmount"
              value={formData.maxLoanAmount}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[132px] bg-white"
            />
          </div>

          {/* For party Type */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">For party Type*</label>
            <select
              name="partyType"
              value={formData.partyType}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[132px] bg-white"
            >
              <option value="individual">Individual</option>
              <option value="cooperative">Corporate</option>
            </select>
          </div>

          {/* Administrative Charges */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Administrative Charges</label>
            <input
              type="number"
              name="administrativeCharges"
              value={formData.administrativeCharges}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[132px] bg-white"
            />
          </div>

          {/* Interest Type - Floating/Reducing */}
          <div className="flex flex-col">
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="interestType"
                  value="Floating"
                  checked={formData.interestType === "Floating"}
                  onChange={handleInputChange}
                  className="accent-[#0A2478]"
                />
                <span className="text-[14px]">Floating</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="interestType"
                  value="Reducing"
                  checked={formData.interestType === "Reducing"}
                  onChange={handleInputChange}
                  className="accent-[#0A2478]"
                />
                <span className="text-[14px]">Reducing</span>
              </label>
            </div>
          </div>
        </div>

        {/* Document Charges */}
        <div className="mb-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Document Charge</h3>
          <div className="flex gap-25 items-end">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">
                % of Loan Amount
              </label>
              <input
                type="number"
                name="docChargePercent"
                value={formData.docChargePercent}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded text-sm w-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">
                Min
              </label>
              <input
                type="number"
                name="docChargeMin"
                value={formData.docChargeMin}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded text-sm w-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">
                Max
              </label>
              <input
                type="number"
                name="docChargeMax"
                value={formData.docChargeMax}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded text-sm w-50"
              />
            </div>
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