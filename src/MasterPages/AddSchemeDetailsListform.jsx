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
const [openSlabModal, setOpenSlabModal] = useState(false);
const [selectedSlabs, setSelectedSlabs] = useState([]);

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
       if (data.precloser) {
  setPrecloser(
    typeof data.precloser === "string"
      ? JSON.parse(data.precloser)
      : data.precloser
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
 const [precloser, setPrecloser] = useState([
    { fromMonth: "", toMonth: "", charges: "" },
    { fromMonth: "", toMonth: "", charges: "" },
  ]); // only 2 rows
console.log(precloser,"precloser")
  const handleChange = (index, field, value) => {
    const updated = [...precloser];
    updated[index][field] = value;
    setPrecloser(updated);
  };
  
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
          precloser
        });
        alert("✅ Scheme updated successfully!");
      } else {
        const response = await axios.post(`${API}/Scheme/addScheme`, {
          formData,
          interestRates,
          precloser
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
      <div className="flex justify-center sticky top-[80px] z-40">
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
              {
                !isViewMode && (
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
                )
              }
             

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

      <div className="bg-white rounded-lg mt-5 ">
        {/* First Row (ALWAYS VISIBLE) */}
        <div className="flex gap-2 justify-center">
          <div className="w-[739px] h-auto bg-[#FFE6E6] p-[20px]">
          <div className="flex gap-[12px] ">
             <div className="flex flex-col ">
            <label className="text-[14px] font-medium">
              Scheme Name <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1 w-[160px]">
              <input
                type="text"
                placeholder=" Scheme Name"
                name="schemeName"
                disabled={isViewMode}
                value={formData.schemeName}
                onChange={handleInputChange}
                className={`border border-gray-300 rounded-[8px] h-[38px] px-3 py-2 w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.schemeName ? "border-red-500" : ""
                  }`}
              />

                
              </div>
              
              
            </div>
            
            <div className="">
  <p className="font-medium text-sm">Product Type <span className="text-red-500">*</span></p>
  <select
    name="product"          // 🔥 IMPORTANT
    value={formData.product}
    onChange={handleInputChange}
      disabled={isViewMode}
    className="border p-2 rounded-[8px] w-[90px] h-[38px]  bg-white border-gray-300 mt-1"
  >
    <option value="Gold">Gold</option>
    <option value="Silver">Silver</option>
  </select>
            </div>
            
            <div className="flex flex-col">
            <p className="text-[14px] font-medium">For party Type <span className="text-red-500">*</span></p>
            <select
              name="partyType"
                  value={formData.partyType}
                    disabled={isViewMode}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-[8px] h-[38px] px-3 py-2 mt-1 w-[111px] bg-white"
            >
              <option value="individual">Individual</option>
              <option value="cooperative">Corporate</option>
            </select>
            </div>
            
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
              className={`border border-gray-300 rounded-[8px] h-[38px] px-3 py-2 mt-1 w-[305px] bg-white ${errors.description ? "border-red-500" : ""
                }`}
            />
          </div>
</div>
          

{/* //2ndrows */}


 <div className="flex gap-[12px] mt-[20px] ">
             <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Applicable From
              <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="applicableFrom"
                  value={formData.applicableFrom}
                    disabled={isViewMode}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]} // restrict to today or later
              className={`border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[145px] h-[38px] bg-white ${errors.applicableFrom ? "border-red-500" : ""
                }`}
            />
          </div>
            
             <div className="flex flex-col">
            <label className="text-[14px] font-medium">Applicable To <span className="text-red-500">*</span></label>
            <input
              type="date"
              name="applicableTo"
                  value={formData.applicableTo}
                    disabled={isViewMode}
              onChange={handleInputChange}
              min={formData.applicableFrom || new Date().toISOString().split("T")[0]} // always after 'Applicable From'
              className="border border-gray-300 rounded-[8px] h-[38px] px-3 py-2 mt-1 w-[145px] bg-white"
            />
          </div>
            
            <div className="flex flex-col">
  <label className="text-[14px] font-medium">
    Cal. basis on <span className="text-red-500">*</span>
  </label>

  <div className="flex items-center gap-2 mt-1">
    <div
      className={`w-[146px] h-[38px] rounded-[8px] flex bg-white p-1 
        ${isViewMode ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => {
        if (!isViewMode) {
          handleCalcBasisChange(
            formData.calcBasisOn === "Daily" ? "Monthly" : "Daily"
          );
        }
      }}
    >
      <div className="w-1/2 flex items-center justify-center">
        <span
          className={`text-sm font-medium transition-all duration-200 rounded-full w-[70px] h-[30px] text-center py-1 
          ${formData.calcBasisOn === "Daily"
            ? "bg-[#0A2478] text-white"
            : "text-black"}`}
        >
          Daily
        </span>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <span
          className={`text-sm font-medium transition-all duration-200 rounded-full w-full text-center py-1 
          ${formData.calcBasisOn === "Monthly"
            ? "bg-[#0A2478] text-white"
            : "text-black"}`}
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
                <label className="text-[14px] font-medium">Add 1 Day <span className="text-red-500">*</span></label>
                <select
                  name="addOneDay"
                  value={formData.addOneDay}
                      onChange={handleInputChange}
                       disabled={isViewMode}
                  className="border border-gray-300 rounded-[8px] px-3 py-2 mt-1 w-[94px] bg-white h-[38px]"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            )
            }
            
            <div className="flex flex-col w-[140px]">
    <label className="text-[14px] font-medium">
      Calc. Method <span className="text-red-500">*</span>
    </label>
    <select
      name="calcMethod"
      value={formData.calcMethod}
                  onChange={handleInputChange}
                   disabled={isViewMode}
      className="border border-gray-300 px-3 py-2 mt-1 bg-white rounded-[8px] w-[104px] h-[38px]"
    >
      <option value="">Select</option>
      <option value="Simple">Simple</option>
      <option value="Multiple">Multiple</option>
      <option value="Compound">Compound</option>
    </select>
              </div>
              
              {
                !isDailyBasis && (
                  <div className="flex flex-col ">
    <label className="text-[14px] font-medium">
      Payment Freq. <span className="text-red-500">*</span>
    </label>

    <div className="flex items-center">
      <input
        type="text"
                  name="paymentFrequency"
                  placeholder="e.g.18"
        value={formData.paymentFrequency}
         disabled={isViewMode}
        onChange={handleInputChange}
        className="border border-gray-300 px-3 py-2 w-[80px] h-[38px] bg-white rounded-l-[8px] mt-1"
      />
      <div className="bg-[#0A2478] text-white px-4 py-2 rounded-r-[8px] w-[40px] h-[38px] mt-1">
        {formData.calcBasisOn === "Daily"
          ? "D"
          : formData.calcBasisOn === "Monthly"
          ? "M"
          : "-"}
      </div>
    </div>
  </div>
                )
              }
</div>


          
          {/* 3rd row */}
            <div className="flex gap-[12px] mt-[20px] ">
              {
                isDailyBasis && (
                 <div className="flex flex-col ">
    <label className="text-[14px] font-medium">
      Payment Freq. <span className="text-red-500">*</span>
    </label>

    <div className="flex items-center">
      <input
        type="text"
                  name="paymentFrequency"
                  placeholder="e.g.18"
                        value={formData.paymentFrequency}
                         disabled={isViewMode}
        onChange={handleInputChange}
        className="border border-gray-300 px-3 py-2 w-[80px] h-[38px] bg-white rounded-l-[8px]"
      />
      <div className="bg-[#0A2478] text-white px-4 py-2 rounded-r-[8px] w-[40px] h-[38px]">
        {formData.calcBasisOn === "Daily"
          ? "D"
          : formData.calcBasisOn === "Monthly"
          ? "M"
          : "-"}
      </div>
    </div>
  </div> 
)              }
              
            
            {isDailyBasis && (
    <div className="flex flex-col ">
      <label className="text-[14px] font-medium">
        Interest in Advance <span className="text-red-500">*</span>
      </label>
      <select
        name="interestInAdvance"
        value={formData.interestInAdvance || ""}
                    onChange={handleInputChange}
                     disabled={isViewMode}
        className="border rounded-md px-3 py-2  bg-white w-[126px] h-[38px]"
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </div>
  )}
            
             <div className="flex flex-col ">
    <label className="text-[14px] font-medium">
      Loan Period <span className="text-red-500">*</span>
    </label>

    <div className="flex items-center">
      <input
        type="text"
        name="loanPeriod"
                  value={formData.loanPeriod}
                  placeholder="e.g.185"
                    onChange={handleInputChange}
                     disabled={isViewMode}
        className="border border-gray-300 px-3 py-2 w-[100px] rounded-l-[8px] h-[38px] bg-white"
      />
      <div className="bg-[#0A2478] text-white px-4 py-2 rounded-r-[8px] w-[40px] h-[38px]">
        {formData.calcBasisOn === "Daily"
          ? "D"
          : formData.calcBasisOn === "Monthly"
          ? "M"
          : "-"}
      </div>
    </div>
  </div>
            
            {isDailyBasis && (
    <div className="flex flex-col ">
      <label className="text-[14px] font-medium">
        Pre Closer Min Days <span className="text-red-600">*</span>
      </label>
      <input
        type="number"
        name="preCloserMinDays"
        value={formData.preCloserMinDays || ""}
                    onChange={handleInputChange}
                     disabled={isViewMode}
                  placeholder="e.g 15 days"
        onWheel={(e) => e.target.blur()}
        className="border border-gray-300 rounded px-3 py-2  bg-white w-[130px] h-[38px]"
      />
    </div>
  )}
            
         <div className="flex flex-col ">
    <label className="text-[14px] font-medium">
      Penalty Type <span className="text-red-600">*</span>
    </label>
    <select
      name="penaltyType"
                  value={formData.penaltyType || ""}
                   disabled={isViewMode}
      onChange={handleInputChange}
      className="border rounded-[8px] px-3 py-2  bg-white border-gray-300 w-[111px] h-[38px]"
    >
      <option value="">Select</option>
      <option value="Amount">Amount</option>
      <option value="Percent">Percent</option>
    </select>
              </div>
              {!isDailyBasis && (
                
<>

                 <div className="flex flex-col ">
    <label className="text-[14px] font-medium">
      Penalty <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      name="penalty"
      value={formData.penalty || ""}
                      onChange={handleInputChange}
                       disabled={isViewMode}
                 placeholder="e.g ₹10"
      onWheel={(e) => e.target.blur()}
      className="border border-gray-300 rounded-[8px] px-3 py-2 h-[38px] bg-white w-[125px]"
    />
  </div>
            
            <div className="flex flex-col">
            <label className="text-[14px] font-medium">Product approve % <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="goldApprovePercent"
              value={formData.goldApprovePercent}
                      onChange={handleInputChange}
                       disabled={isViewMode}
              style={{
                MozAppearance: "textfield",
                }}
                  placeholder="e.g 95%"
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 rounded-[8px] px-3 py-2 w-[127px] bg-white h-[38px]"
            />
          </div>
            
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Min Loan Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="minLoanAmount"
              value={formData.minLoanAmount || ""}
                      onChange={handleInputChange}
                       disabled={isViewMode}
                 placeholder="e.g. ₹20,000.00"
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 rounded-[8px] px-3 py-2  w-[150px] bg-white h-[38px]"
            />
          </div>
                </>
              )}
              
</div>

          {/* 4throw */}
            <div className="flex gap-[12px] mt-[20px] ">
              {
                isDailyBasis && (
                  <>
                  
                  <div className="flex flex-col ">
    <label className="text-[14px] font-medium">
      Penalty <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      name="penalty"
      value={formData.penalty || ""}
                        onChange={handleInputChange}
                         disabled={isViewMode}
                 placeholder="e.g ₹10"
      onWheel={(e) => e.target.blur()}
      className="border border-gray-300 rounded-[8px] px-3 py-2 h-[38px] bg-white w-[125px]"
    />
  </div>
            
            <div className="flex flex-col">
            <label className="text-[14px] font-medium">Product approve % <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="goldApprovePercent"
              value={formData.goldApprovePercent}
                        onChange={handleInputChange}
                         disabled={isViewMode}
              style={{
                MozAppearance: "textfield",
                }}
                  placeholder="e.g 95%"
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 rounded-[8px] px-3 py-2 w-[127px] bg-white h-[38px]"
            />
          </div>
            
          <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Min Loan Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="minLoanAmount"
              value={formData.minLoanAmount || ""}
                        onChange={handleInputChange}
                         disabled={isViewMode}
                 placeholder="e.g. ₹20,000.00"
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 rounded-[8px] px-3 py-2  w-[116px] bg-white h-[38px]"
            />
          </div>
                  </>
                )
              }
             
            
            <div className="flex flex-col">
            <label className="text-[14px] font-medium">Max Loan Amount <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="maxLoanAmount"
              value={formData.maxLoanAmount}
                  onChange={handleInputChange}
                   disabled={isViewMode}
                 placeholder="e.g.₹5,00,000.00"
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 rounded-[8px] px-3 py-2 h-[38px] w-[119px] bg-white"
            />
          </div>
            
         <div className="flex flex-col">
            <label className="text-[14px] font-medium">
              Administrative Charges
            </label>
            <input
              type="number"
              name="administrativeCharges"
              value={formData.administrativeCharges}
                  onChange={handleInputChange}
                   disabled={isViewMode}
                 placeholder="e.g. ₹ 100.00"
              style={{
                MozAppearance: "textfield",
              }}
              onWheel={(e) => e.target.blur()}
              className="border border-gray-300 rounded-[8px] px-3 py-2 h-[38px] w-[151px] bg-white"
            />
              </div>

              
               {!isDailyBasis && (
  <div className="flex flex-col">
    <label className="text-[14px] font-medium">
      Interest Type <span className="text-red-500">*</span>
    </label>

    <div className="flex items-center gap-2">
      <div
        className={`w-[200px] h-[38px] rounded-[8px] flex bg-white p-1 
          ${isViewMode ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >

        {/* Floating */}
        <div
          className="w-1/2 flex items-center justify-center"
          onClick={() => {
            if (!isViewMode) {
              handleInputChange({
                target: { name: "interestType", value: "Floating" },
              });
            }
          }}
        >
          <span
            className={`text-sm font-medium transition-all duration-200 rounded-full w-[90px] h-[30px] text-center py-1 ${
              formData.interestType === "Floating"
                ? "bg-[#0A2478] text-white"
                : "text-black"
            }`}
          >
            Floating
          </span>
        </div>

        {/* Reducing */}
        <div
          className="w-1/2 flex items-center justify-center"
          onClick={() => {
            if (!isViewMode) {
              handleInputChange({
                target: { name: "interestType", value: "Reducing" },
              });
            }
          }}
        >
          <span
            className={`text-sm font-medium transition-all duration-200 rounded-full w-[90px] h-[30px] text-center py-1 ${
              formData.interestType === "Reducing"
                ? "bg-[#0A2478] text-white"
                : "text-black"
            }`}
          >
            Reducing
          </span>
        </div>
      </div>
    </div>
  </div>
)}


</div>


            {
              !isDailyBasis && (
                <>
                
                <h3 className="text-[15px] font-semibold text-[#0A2478] mb-4 mt-5">
    Document Charge
  </h3>

  <div className="flex gap-4 w-full">

    {/* % of Loan Amount */}
    <div className="flex flex-col">
      <label className="text-sm font-medium"> % of Loan Amount </label>
      <input
        type="number"
        name="docChargePercent"
        value={formData.docChargePercent}
        onChange={handleInputChange}
        onWheel={(e) => e.target.blur()}
        className="p-2 border border-gray-300 rounded text-sm w-[150px] bg-white"
      />
    </div>

  
    <div className="flex flex-col">
      <label className="text-sm font-medium"> Min </label>
      <input
        type="number"
        name="docChargeMin"
        value={formData.docChargeMin}
        onChange={handleInputChange}
        onWheel={(e) => e.target.blur()}
        className="p-2 border border-gray-300 rounded text-sm w-[150px] bg-white"
      />
    </div>

    {/* Max */}
    <div className="flex flex-col">
      <label className="text-sm font-medium"> Max </label>
      <input
        type="number"
        name="docChargeMax"
        value={formData.docChargeMax}
        onChange={handleInputChange}
        onWheel={(e) => e.target.blur()}
        className="p-2 border border-gray-300 rounded text-sm w-[150px] bg-white"
      />
    </div>

  </div>
                </>
              )
            }
          </div>
          <div className="w-[537px] bg-[#E9E9FF] p-4 ">

            {/* ---------------------- DOCUMENT CHARGE ---------------------- */}
            {
              isDailyBasis && (
                <>
                
               <h3 className="text-[15px] font-semibold text-[#0A2478] mb-4">
    Document Charge
  </h3>

  <div className="flex gap-4 w-full">

    {/* % of Loan Amount */}
    <div className="flex flex-col">
      <label className="text-sm font-medium"> % of Loan Amount </label>
      <input
        type="number"
        name="docChargePercent"
                        value={formData.docChargePercent}
                         disabled={isViewMode}
        onChange={handleInputChange}
        onWheel={(e) => e.target.blur()}
        className="p-2 border border-gray-300 rounded text-sm w-[150px] bg-white"
      />
    </div>

  
    <div className="flex flex-col">
      <label className="text-sm font-medium"> Min </label>
      <input
        type="number"
        name="docChargeMin"
        value={formData.docChargeMin}
                        onChange={handleInputChange}
                         disabled={isViewMode}
        onWheel={(e) => e.target.blur()}
        className="p-2 border border-gray-300 rounded text-sm w-[150px] bg-white"
      />
    </div>

    {/* Max */}
    <div className="flex flex-col">
      <label className="text-sm font-medium"> Max </label>
      <input
        type="number"
        name="docChargeMax"
                        value={formData.docChargeMax}
                         disabled={isViewMode}
        onChange={handleInputChange}
        onWheel={(e) => e.target.blur()}
        className="p-2 border border-gray-300 rounded text-sm w-[150px] bg-white"
      />
    </div>

  </div> 
                </>
              )
            }
            {
              !isDailyBasis && (
                <>
               <div>
      <h3 className="text-[15px] font-semibold text-[#0A2478] mb-4">
        Precloser Charges
      </h3>

      <div className="overflow-hidden">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-[#0A2478] text-white text-sm">
              <th className="p-3 border-r w-[80px]">From Month</th>
              <th className="p-3 border-r w-[80px]">To Month</th>
              <th className="p-3 border-r w-[70px]">Charges %</th>
            </tr>
          </thead>

          <tbody>
            {precloser?.map((item, index) => (
              <tr key={index} className="bg-white border-b border-gray-300">
                <td className="p-2 text-center">
                  <input
                    type="number"
                    value={item.fromMonth}
                     disabled={isViewMode}
                    onChange={(e) =>
                      handleChange(index, "fromMonth", e.target.value)
                    }
                    className="border px-2 py-1 w-[80px] h-[25px] text-center"
                  />
                </td>

                <td className="p-2 text-center">
                  <input
                    type="number"
                    value={item.toMonth}
                     disabled={isViewMode}
                    onChange={(e) =>
                      handleChange(index, "toMonth", e.target.value)
                    }
                    className="border px-2 py-1 w-[80px] h-[25px] text-center"
                  />
                </td>

                <td className="p-2 text-center">
                  <input
                    type="number"
                    value={item.charges}
                     disabled={isViewMode}
                    onChange={(e) =>
                      handleChange(index, "charges", e.target.value)
                    }
                    className="border px-2 py-1 w-[80px] h-[25px] text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      
    </div>
                
                </>
              )
            }
  

  
  <div className="mt-8 w-[496px]">
    {/* <h3 className="text-xl font-semibold text-[#0A2478] mb-4">Interest Rate</h3> */}
<h3 className="text-[15px] font-semibold text-[#0A2478] mb-4">
    Interest Rate
  </h3>
    <div className="  overflow-hidden">
      <table className="w-full border-collapse bg-white">

        {/* Table Header */}
        <thead>
          <tr className="bg-[#0A2478] text-white text-sm">
            <th className="p-3 border-r w-[80px]">From</th>
            <th className="p-3 border-r w-[80px]">To</th>
            <th className="p-3 border-r w-[80px]">Type</th>
            <th className="p-3 border-r w-[100px]">Add %</th>
            <th className="p-3 w-[80px]">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {interestRates.map((rate, i) => (
            <tr key={rate.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>

              {/* From */}
              <td className="p-3 text-center">
                <input
                  type="number"
                  value={rate.from || ""}
                   disabled={isViewMode}
                  onChange={(e) => onchange(rate.id, "from", e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  className="border border-gray-300 rounded px-2 py-1 w-[80px] text-center"
                  placeholder="From"
                />
              </td>

              {/* To */}
              <td className="p-3 text-center">
                <input
                  type="number"
                  value={rate.to || ""}
                   disabled={isViewMode}
                  onChange={(e) => onchange(rate.id, "to", e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  className="border border-gray-300 rounded px-2 py-1 w-[80px] text-center"
                  placeholder="To"
                />
              </td>

              {/* Type */}
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
                   disabled={isViewMode}
                  onChange={(e) => onchange(rate.id, "type", e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-[70px]"
                >
                  <option value="days" disabled={formData.calcBasisOn === "Monthly"}>
                    Days
                  </option>
                  <option value="months" disabled={formData.calcBasisOn === "Daily"}>
                    Months
                  </option>
                </select>
              </td>

              {/* Add % */}
              <td className="p-3 text-center">
                <input
                  type="number"
                  value={rate.addInt || ""}
                  onChange={(e) => onchange(rate.id, "addInt", e.target.value)}
                   disabled={isViewMode}
                  onWheel={(e) => e.target.blur()}
                  className="border border-gray-300 rounded px-2 py-1 w-[90px] text-center"
                  placeholder="%"
                />
              </td>

              {/* Action Buttons */}
              <td className="p-3 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={addRow}
                     disabled={isViewMode}
                    className="text-white p-1 rounded bg-[#0A2478]"
                    title="Add"
                  >
                    <IoMdAddCircleOutline className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeRow(rate.id)}
                     disabled={isViewMode}
                    className="text-white p-1 rounded bg-[#C1121F]"
                    title="Delete"
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
        
        <div>
          {type === "edit" && (
            <>
              <div className="flex  mt-5 ml-[100px] ">
<div className="">
 <h3 className="text-[15px] font-semibold text-[#0A2478] mb-4">
    Renewal List
  </h3>
          
          <div className="  overflow-hidden">
    <table className="w-[614px] border-collapse bg-white">
  <thead>
    <tr className="bg-[#0A2478] text-white text-sm">
      <th className="p-3 border w-[80px]">App. From</th>
      <th className="p-3 border w-[80px]">App. To</th>
                      <th className="p-3 border w-[70px]">Interest</th>
                      <th className="p-3 border w-[70px]">Approval %</th>
                        <th className="p-3 border w-[70px]">Renewal Date</th>
    </tr>
  </thead>

  <tbody>
  {data?.renewalHistory?.length > 0 ? (
    data.renewalHistory.map((item) => (
      <tr key={item.id} className="bg-white border border-gray-300">

        {/* App From */}
        <td className="p-2 text-center">
          {new Date(item.app_from).toISOString().split("T")[0]}
        </td>

        {/* App To */}
        <td className="p-2 text-center">
          {new Date(item.app_to).toISOString().split("T")[0]}
        </td>

        {/* Interest JSON */}
        <td 
  className="p-2 text-center text-blue-600 underline cursor-pointer"
  onClick={() => {
    setSelectedSlabs(JSON.parse(item.interest_json));
    setOpenSlabModal(true);
  }}
>
  {JSON.parse(item.interest_json).length} Slabs
</td>


        {/* Approval % */}
        <td className="p-2 text-center">
          {item.gold_approve_percent}%
        </td>

        {/* Renewal Date */}
        <td className="p-2 text-center">
          {new Date(item.renewal_date).toLocaleDateString("en-IN")}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td className="text-center p-3" colSpan={5}>
        No Renewal History Found
      </td>
    </tr>
  )}
</tbody>

</table>

    </div>

              </div>

              </div>
              
           
          
          </>
        )}
       </div>

      

      
       

       
      </div>
      {openSlabModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">

    <div className="bg-white w-[520px] rounded-xl shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-[#0A2478] text-white px-5 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Interest Slab Details</h2>
        <button
          onClick={() => setOpenSlabModal(false)}
          className="text-white text-2xl leading-none hover:text-gray-200"
        >
          &times;
        </button>
      </div>

      {/* Slab Table */}
      <div className="p-5 max-h-[350px] overflow-y-auto">

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">From</th>
              <th className="border px-3 py-2">To</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Add. Int (%)</th>
            </tr>
          </thead>

          <tbody>
            {selectedSlabs.map((slab, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-3 py-2 text-center">{slab.from}</td>
                <td className="border px-3 py-2 text-center">{slab.to}</td>
                <td className="border px-3 py-2 text-center capitalize">
                  {slab.type}
                </td>
                <td className="border px-3 py-2 text-center">
                  {slab.addInt}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default AddSchemeDetailsListform;
