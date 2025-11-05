import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";

const FormField = ({
  field,
  formData,
  errors,
  handleInputChange,
  setFormData,
}) => {
  const suffixFields = ["loanPeriod", "paymentFrequency"];

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


const AddSchemeDetailsListform = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { type, data } = location.state || {};
  const isViewMode = type === "view";
  const [formData, setFormData] = useState({
    schemeName: "",
    description: "",
    product: "Gold",
    applicableFrom: "",
    applicableTo: "",
    calcBasisOn: "Daily",
    calcMethod: "",
    paymentFrequency: "",
    // KEEP these fields always visible as per the user's request
    interestInAdvance: "",
    preCloserMinDays: "",
    penaltyType: "Amount",
    addOneDay: "",
    penalty: "",
    minLoanAmount: "",
    loanPeriod: "",
    paymentBasisOn: "",
    goldApprovePercent: "", // KEEP this field always visible
    maxLoanAmount: "",
    partyType: "individual",
    administrativeCharges: "",
    interestType: "Floating", // HIDE/SHOW this one
    docChargePercent: "",
    docChargeMin: "",
    docChargeMax: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        applicableFrom: data.applicableFrom
          ? data.applicableFrom.split("T")[0]
          : "",
        applicableTo: data.applicableTo ? data.applicableTo.split("T")[0] : "",
      });

      if (data.interestRates) {
        setInterestRates(
          typeof data.interestRates === "string"
            ? JSON.parse(data.interestRates)
            : data.interestRates
        );
      }
    }
  }, [data]);
  console.log(formData, "formData")
  const [interestRates, setInterestRates] = useState([
    {},
  ]);
  console.log(interestRates, "interestRates")
  const [errors, setErrors] = useState({});

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  //   if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  // };
const handleInputChange = (e) => {
  const { name, value } = e.target;

  // when calcBasisOn changes – auto update paymentBasisOn
  if (name === "calcBasisOn") {
    setFormData(prev => ({
      ...prev,
      calcBasisOn: value,
      paymentBasisOn: value === "Daily" ? "Interest" : "EMI",
    }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));

    return; // stop here (we already set)
  }

  // normal update
  setFormData((prev) => ({ ...prev, [name]: value }));

  if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
};


  const onchange = (id, field, value) => {
    setInterestRates((prevRates) =>
      prevRates.map((rate) =>
        rate.id === id ? { ...rate, [field]: value } : rate
      )
    );
  };



  const handleSave = async () => {
    try {
      if (type === "edit") {
        const response = await axios.put(`${API}/Scheme/updateScheme`, {
          id: data.id,
          formData,
          interestRates,
        });
        alert("✅ Scheme updated successfully!");
      } else {
        const response = await axios.post(`${API}/Scheme/addScheme`, {
          formData,
          interestRates,
        });
        alert("✅ Scheme added successfully!");
      }

      navigate("/Scheme-Details-List");
    } catch (error) {
      console.error("Error saving scheme:", error);
      alert("❌ Failed to save scheme.");
    }
  };


  const addRow = () => {
    setInterestRates((prev) => [
      ...prev,
      { id: Date.now(), from: "", to: "", type: "days", addInt: "" },
    ]);
  };

  const removeRow = (id) => {
    setInterestRates((prev) => prev.filter((rate) => rate.id !== id));
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

  const handleCalcBasisChange = (value) => {
    setFormData((prev) => {
      const updated = { ...prev, calcBasisOn: prev.calcBasisOn === value ? "" : value };

      // Clear Interest Type when Daily is selected, as it will be hidden.
      if (value === "Daily") {
        updated.interestType = "";
      }

      return updated;
    });
  };

  // Define a constant for the conditional check
  const isDailyBasis = formData.calcBasisOn === "Daily";

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
            Add Scheme Details Form
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

              <button
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
                onClick={() => navigate("/Scheme-Details-List")}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg px-20">
        {/* First Row (ALWAYS VISIBLE) */}
        <div className="flex items-end gap-4 w-full mt-5">
          {/* Scheme Name */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Scheme Name <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1 w-[180px]">
              <input
                type="text"
                placeholder=" Scheme Name"
                name="schemeName"
                disabled={isViewMode}
                value={formData.schemeName}
                onChange={handleInputChange}
                className={`border border-gray-300 rounded-[8px] px-3 py-2 w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.schemeName ? "border-red-500" : ""
                  }`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              disabled={isViewMode}
              onChange={handleInputChange}
              placeholder=""
              className={`border border-gray-300 rounded px-3 py-2 mt-1 w-[350px] bg-white ${errors.description ? "border-red-500" : ""
                }`}
            />
          </div>



          {/* Applicable From */}
          <div className="flex flex-col">
  <label className="text-[14px] font-medium">
    Applicable From
    <span className="text-red-500">*</span>
  </label>
  <input
    type="date"
    name="applicableFrom"
    value={formData.applicableFrom}
    onChange={handleInputChange}
    min={new Date().toISOString().split("T")[0]} // restrict to today or later
    className={`border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white ${
      errors.applicableFrom ? "border-red-500" : ""
    }`}
  />
</div>

<div className="flex flex-col">
  <label className="text-[14px] font-medium">Applicable To</label>
  <input
    type="date"
    name="applicableTo"
    value={formData.applicableTo}
    onChange={handleInputChange}
    min={formData.applicableFrom || new Date().toISOString().split("T")[0]} // always after 'Applicable From'
    className="border border-gray-300 rounded px-3 py-2 mt-1 w-[180px] bg-white"
  />
</div>


          {/* Calculation Basis (ALWAYS VISIBLE) */}
          <div className="flex flex-col">
            <label className="text-[14px] mb-2 font-medium">
              Cal. basis on <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center gap-2 mt-1">
              <div
                className="w-[160px] h-[38px] rounded-full cursor-pointer flex bg-[#0A2478] p-1"
                onClick={() =>
                  handleCalcBasisChange(
                    formData.calcBasisOn === "Daily" ? "Monthly" : "Daily"
                  )
                }
              >
                <div className="w-1/2 flex items-center justify-center">
                  <span
                    className={`text-sm font-medium transition-all duration-200 rounded-full w-full text-center py-1 ${formData.calcBasisOn === "Daily"
                      ? "bg-white text-[#0A2478]"
                      : "text-white"
                      }`}
                  >
                    Daily
                  </span>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                  <span
                    className={`text-sm font-medium transition-all duration-200 rounded-full w-full text-center py-1 ${formData.calcBasisOn === "Monthly"
                      ? "bg-white text-[#0A2478]"
                      : "text-white"
                      }`}
                  >
                    Monthly
                  </span>
                </div>
              </div>
            </div>
          </div>
          {
            isDailyBasis && (
              <div className="flex flex-col">
            <label className="text-[14px] font-medium">Add 1 Day*</label>
            <select
              name="addOneDay"
              value={formData.addOneDay}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[111px] bg-white"
            >
               <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
            )
          }
 
         


        </div>

        {/* Second Row (All fields are now ALWAYS VISIBLE) */}
        <div className="flex items-end gap-4 w-full mt-5">
          {/* Calculation Method */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Calc. Method</label>
            <select
              name="calcMethod"
              value={formData.calcMethod}
              onChange={handleInputChange}
              className="border border-gray-300  px-3 py-2 mt-1 w-[104px] bg-white rounded-[8px]"
            >
              <option value="">Select</option>
              <option value="Simple">Simple</option>
              <option value="Multiple">Multiple</option>
              <option value="Compound">Compound</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Payment Frequency<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center w-[220px]">
              <input
                type="text"
                name="paymentFrequency"
                value={formData.paymentFrequency}
                onChange={handleInputChange}
                placeholder=""
                className="border border-gray-300  px-3 py-2 w-[132px] bg-white"
              />
              <button className="bg-[#0A2478] text-white px-4 py-2 rounded-r-[8px] border border-gray-300 border-l-0 hover:bg-[#081c5b] flex items-center gap-2">

                <button className="bg-[#0A2478] text-white  hover:bg-[#081c5b] flex items-center gap-2">
                  <span>{formData.calcBasisOn === "Daily" ? "D" : formData.calcBasisOn === "Monthly" ? "M" : "-"}</span>
                </button>
              </button>
            </div>
          </div>

          {isDailyBasis && (
 <div className="flex flex-col">
            <label className="text-[14px] font-medium">Interest in Advance</label>
            <select
              name="interestInAdvance"
              value={formData.interestInAdvance || ""}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 w-[126px] h-[38px] text-sm mt-1"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          )}
         

          {/* Pre Closer Min Days (NOW ALWAYS VISIBLE) */}
          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Pre Closer Min Days <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="preCloserMinDays"
              value={formData.preCloserMinDays || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[130px] bg-white"
            />
          </div>


          <div className="flex flex-col">
            <label className="text-xs font-medium mb-1">
              Penalty Type <span className="text-red-600">*</span>
            </label>
            <select
              name="penaltyType"
              value={formData.penaltyType || ""}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 w-[111px] h-[38px] text-sm mt-1"
            >
              <option value="">Select</option>
              <option value="Amount">Amount</option>
              <option value="Percent">Percent</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Penalty
            </label>
            <input
              type="number"
              name="penalty"
              value={formData.penalty || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[75px] bg-white"
            />
          </div>

          {/* Min Loan Amount */}
         

          {/* Payment Basis On */}
          <div className="flex flex-col">
  <label className="text-xs font-medium mb-1">
    Payment Basis On <span className="text-red-600">*</span>
  </label>

 <input
  type="text"
  name="paymentBasisOn"
  value={formData.calcBasisOn === "Daily" ? "Interest" :
         formData.calcBasisOn === "Monthly" ? "EMI" : ""}
  readOnly
  className="border border-gray-300 rounded px-3 py-2 w-[113px] bg-gray-100 text-sm"
/>

</div>

           <div className="flex flex-col">
            <label className="text-[14px] font-medium">For party Type*</label>
            <select
              name="partyType"
              value={formData.partyType}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[111px] bg-white"
            >
              <option value="individual">Individual</option>
              <option value="cooperative">Corporate</option>
            </select>
          </div>


          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Loan Period<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center w-[220px]">
              <input
                type="text"
                name="loanPeriod"
                value={formData.loanPeriod}
                onChange={handleInputChange}
                placeholder=""
                className="border border-gray-300  px-3 py-2 w-[113px] bg-white"
              />
              <button className="bg-[#0A2478] text-white px-4 py-2 rounded-r-[8px] border border-gray-300 border-l-0 hover:bg-[#081c5b] flex items-center gap-2">
                <button className="bg-[#0A2478] text-white     hover:bg-[#081c5b] flex items-center gap-2">
                  <span>{formData.calcBasisOn === "Daily" ? "D" : formData.calcBasisOn === "Monthly" ? "M" : "-"}</span>
                </button>
              </button>
            </div>
          </div>
        </div>

        {/* Third Row (Adjusted for conditional fields) */}
        <div className="flex items-end gap-4 w-full mt-5">

          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Gold approve %</label>
            <input
              type="number"
              name="goldApprovePercent"
              value={formData.goldApprovePercent}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[100px] bg-white"
            />
          </div>

 <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Min Loan Amount
            </label>
            <input
              type="number"
              name="minLoanAmount"
              value={formData.minLoanAmount || ""}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[116px] bg-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[14px] font-medium">Max Loan Amount*</label>
            <input
              type="number"
              name="maxLoanAmount"
              value={formData.maxLoanAmount}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[150px] bg-white"
            />
          </div>

          {/* For party Type */}
          {/* <div className="flex flex-col">
            <label className="text-[14px] font-medium">For party Type*</label>
            <select
              name="partyType"
              value={formData.partyType}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[111px] bg-white"
            >
              <option value="individual">Individual</option>
              <option value="cooperative">Corporate</option>
            </select>
          </div> */}

          {/* Administrative Charges */}
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Administrative Charges
            </label>
            <input
              type="number"
              name="administrativeCharges"
              value={formData.administrativeCharges}
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-3 py-2 mt-1 w-[151px] bg-white"
            />
          </div>

          {/* Interest Type - Floating/Reducing (HIDE ONLY ON DAILY) */}
          {!isDailyBasis && (
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
          )}
        </div>

        {/* Document Charges (ALWAYS VISIBLE) */}
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
                  <th className="p-3 border-r">Add int %</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {interestRates.map((rate, i) => (
                  <tr key={rate.id} className={i % 2 ? "bg-gray-50" : ""}>

                    {/* From input */}
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        value={rate.from || ""}
                        onChange={(e) => onchange(rate.id, "from", e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-[200px] text-center"
                        placeholder="From"
                      />
                    </td>

                    {/* To input */}
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        value={rate.to || ""}
                        onChange={(e) => onchange(rate.id, "to", e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-[200px] text-center"
                        placeholder="To"
                      />
                    </td>

                    <td className="p-3 text-center">
                      <select
                        value={
                          rate.type ||
                          (formData.calcBasisOn === "Monthly"
                            ? "months"
                            : formData.calcBasisOn === "Daily"
                              ? "days"
                              : "")
                        }
                        onChange={(e) => onchange(rate.id, "type", e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-28"
                      >
                      <option
  value="days"
  disabled={formData.calcBasisOn === "Monthly"}
  className={
    formData.calcBasisOn === "Monthly"
      ? "opacity-50 cursor-not-allowed"
      : ""
  }
>
  Days
</option>

<option
  value="months"
  disabled={formData.calcBasisOn === "Daily"}
  className={
    formData.calcBasisOn === "Daily"
      ? "opacity-50 cursor-not-allowed"
      : ""
  }
>
  Months
</option>

                        {/* <option value="years">Years</option> */}
                      </select>
                    </td>



                    {/* Add int % input */}
                    <td className="p-3 text-center">
                      <input
                        type="number"
                        value={rate.addInt || ""}
                        onChange={(e) => onchange(rate.id, "addInt", e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-24 text-center"
                        placeholder="%"
                      />
                    </td>

                    {/* Action buttons */}
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
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
      </div>
    </div>
  );
};

export default AddSchemeDetailsListform;
