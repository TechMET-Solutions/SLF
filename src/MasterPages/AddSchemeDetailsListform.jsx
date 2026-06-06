import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import Loader from "../Component/Loader";



const AddSchemeDetailsListform = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, data } = location.state || {};
  console.log(data, " ------------shceme data------------- ");
  const isViewMode = type === "view";
  const isCopyMode = type === "copy";
  const [loading, setLoading] = useState(false);
  // ===============================
  // Party Types – dynamic (active only)
  // ===============================
  const [partyTypeList, setPartyTypeList] = useState([]);

  useEffect(() => {
    const fetchPartyTypes = async () => {
      try {
        const res = await axios.get(`${API}/api/party-types/list`);
        const activeOnly = (res.data.data || []).filter(
          (item) => item.status === 1,
        );
        setPartyTypeList(activeOnly);
      } catch (error) {
        console.error("Failed to fetch party types:", error);
      }
    };
    fetchPartyTypes();
  }, []);
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };
  const [formData, setFormData] = useState({
    schemeName: "",
    description: "",
    product: "",
    applicableFrom: getTodayDate(),
    applicableTo: "",
    calcBasisOn: "Daily",
    adminChargeType: "percentage",
    calcMethod: "Simple",
    paymentFrequency: "",
    interestInAdvance: "Yes",
    preCloserMinDays: "",
    penaltyType: "",
    addOneDay: "",
    penalty: "",
    minLoanAmount: "",
    loanPeriod: "",
    paymentBasisOn: "",
    goldApprovePercent: "",
    maxLoanAmount: "",
    partyType: "",
    administrativeCharges: "",
    interestType: "",
    docChargePercent: "",
    docChargeFixed: "",
    docChargeMin: "",
    docChargeMax: "",
    AdminChargeMin: "",
    AdminChargeMax: "",
    docChargeType: "percentage",
    bouncedType: "", // "fixed" | "percentage"
    bounced: "",
    Monthly_interest_rate: "",
  });

  console.log(formData, "formData");
  const [openSlabModal, setOpenSlabModal] = useState(false);
  const [selectedSlabs, setSelectedSlabs] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Dropdown baher click kelyavar band honyasathi logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (partyTypeVal) => {
    let updatedList = [...formData.partyType];

    if (updatedList.includes(partyTypeVal)) {
      // Jar aadhi pasun asel tar kadhun taka (Uncheck)
      updatedList = updatedList.filter((item) => item !== partyTypeVal);
    } else {
      // Nasel tar add kara (Check)
      updatedList.push(partyTypeVal);
    }

    // Tumcha original handleInputChange call kara custom value sobat
    handleInputChange({
      target: { name: "partyType", value: updatedList },
    });
  };
  useEffect(() => {
    if (data) {
      setLoading(true);
      // For copy mode, strip `id` so Save creates a new record
      const { id: _omitId, ...dataWithoutId } = data;
      const baseData = isCopyMode ? dataWithoutId : data;

      setFormData({
        ...baseData,
        Monthly_interest_rate:baseData.monthlyInterestRate || "",
        AdminChargeMin: baseData.adminChargeMin || "",
        AdminChargeMax: baseData.adminChargeMax || "",
        applicableFrom: baseData.applicableFrom
          ? baseData.applicableFrom.split("T")[0]
          : "",
        applicableTo: baseData.applicableTo
          ? baseData.applicableTo.split("T")[0]
          : "",
      });

      if (data.interestRates) {
        setInterestRates(
          typeof data.interestRates === "string"
            ? JSON.parse(data.interestRates)
            : data.interestRates,
        );
      }
      if (data.precloser) {
        setPrecloser(
          typeof data.precloser === "string"
            ? JSON.parse(data.precloser)
            : data.precloser,
        );
      }
      setLoading(false);
    }
  }, [data, isCopyMode]);
  console.log(formData, "formData");
  const [interestRates, setInterestRates] = useState([{}]);
  console.log(interestRates, "interestRates");
  const [errors, setErrors] = useState({});
  const [precloser, setPrecloser] = useState([
    { fromDate: "", toDate: "", type: "percentage", value: "" },
  ]);
  console.log(precloser, "precloser");
  const handleChange = (index, field, value) => {
    const updated = [...precloser];
    updated[index][field] = value;
    setPrecloser(updated);
  };
  const addRow2 = () => {
    setPrecloser([
      ...precloser,
      { fromDate: "", toDate: "", type: "percentage", value: "" },
    ]);
  };

  const removeRow2 = (index) => {
    const updated = precloser.filter((_, i) => i !== index);
    setPrecloser(updated);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   // ✅ calcBasisOn logic
  //   if (name === "calcBasisOn") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       calcBasisOn: value,
  //       paymentBasisOn: value === "Daily" ? "Interest" : "EMI",
  //     }));

  //     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  //     return;
  //   }

  //   // ✅ FIXED: adminChargeType logic
  //   if (name === "adminChargeType") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       adminChargeType: value,
  //       administrativeCharges: "", // 🔥 reset
  //     }));

  //     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  //     return;
  //   }
  //   if (name === "penalty" && formData.penaltyType === "Percent") {
  //     if (parseFloat(value) > 100) {
  //       return; // 🚫 stop updating if > 100
  //     }
  //   }

  //   setFormData((prev) => ({ ...prev, [name]: value }));

  //   if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  // };
const handleInputChange = (e) => {
  const { name, value } = e.target;

  let updatedValue = value;

  // ✅ calcBasisOn logic
  if (name === "calcBasisOn") {
    setFormData((prev) => ({
      ...prev,
      calcBasisOn: value,
      paymentBasisOn: value === "Daily" ? "Interest" : "EMI",
    }));
    return;
  }

  // ✅ adminChargeType reset
  if (name === "adminChargeType") {
    setFormData((prev) => ({
      ...prev,
      adminChargeType: value,
      administrativeCharges: "",
    }));
    return;
  }
// ✅ Reset when adminChargeType changes
if (name === "adminChargeType") {
  setFormData((prev) => ({
    ...prev,
    adminChargeType: value,
    administrativeCharges: "", // 🔄 reset
  }));
  return;
}

  // ✅ Reset when docChargeType changes
if (name === "docChargeType") {
  setFormData((prev) => ({
    ...prev,
    docChargeType: value,
    docChargePercent: "", // 🔄 reset
    docChargeFixed: "",   // 🔄 reset
  }));
  return;
}

// ✅ Restrict docChargePercent (max 100)
if (name === "docChargePercent") {
  if (Number(value) > 100) return;
}

// ✅ Prevent negative for both
if (name === "docChargePercent" || name === "docChargeFixed") {
  if (Number(value) < 0) return;
}

// ✅ Restrict administrativeCharges when percentage
if (name === "administrativeCharges") {
  // 🚫 prevent negative
  if (Number(value) < 0) return;

  // 🚫 max 100 if percentage
  if (
    formData.adminChargeType === "percentage" &&
    Number(value) > 100
  ) {
    return;
  }
}
  // ✅ penaltyType reset
  if (name === "penaltyType") {
    setFormData((prev) => ({
      ...prev,
      penaltyType: value,
      penalty: "",
    }));
    return;
  }

  // ✅ 🔥 NEW: bouncedType reset
  if (name === "bouncedType") {
    setFormData((prev) => ({
      ...prev,
      bouncedType: value,
      bounced: "", // 🔄 reset
    }));
    return;
  }

  // ✅ Restrict penalty
  if (name === "penalty") {
    if (!formData.penaltyType) return;

    if (
      formData.penaltyType === "Percent" &&
      Number(value) > 100
    ) {
      return;
    }
  }

  // ✅ 🔥 NEW: Restrict bounced
  if (name === "bounced") {
    // 🚫 block if type not selected
    if (!formData.bouncedType) return;

    // 🚫 max 100 if percentage
    if (
      formData.bouncedType === "percentage" &&
      Number(value) > 100
    ) {
      return;
    }
  }

  // ✅ Restrict Loan approve %
  if (name === "goldApprovePercent") {
    if (Number(value) > 100) return;
  }

  // ✅ Prevent negative
  if (Number(value) < 0) {
    updatedValue = 0;
  }

  // ✅ Final update
  setFormData((prev) => ({
    ...prev,
    [name]: updatedValue,
  }));
};
  const onchange = (id, field, value) => {
    setInterestRates((prevRates) =>
      prevRates.map((rate) =>
        rate.id === id ? { ...rate, [field]: value } : rate,
      ),
    );
  };

  // const handleSave = async () => {
  //   try {
  //     if (type === "edit") {
  //       const response = await axios.put(`${API}/Scheme/updateScheme`, {
  //         id: data.id,
  //         formData,
  //         interestRates,
  //         precloser,
  //       });
  //       alert("✅ Scheme updated successfully!");
  //     } else {
  //       // Both "add" and "copy" create a new record via POST
  //       const response = await axios.post(`${API}/Scheme/addScheme`, {
  //         formData,
  //         interestRates,
  //         precloser,
  //       });
  //       alert(
  //         isCopyMode
  //           ? "✅ Scheme copied and saved successfully!"
  //           : "✅ Scheme added successfully!",
  //       );
  //     }

  //     navigate("/Scheme-Details-List");
  //   } catch (error) {
  //     console.error("Error saving scheme:", error);
  //     alert("❌ Failed to save scheme.");
  //   }
  // };
  const validateForm2 = () => {
    let newErrors = {};

    if (!formData.schemeName?.trim())
      newErrors.schemeName = "Scheme Name is required";

    if (!formData.product) newErrors.product = "Product is required";

    if (!formData.partyType) newErrors.partyType = "Party Type is required";

    if (!formData.description?.trim())
      newErrors.description = "Description is required";

    if (!formData.applicableFrom)
      newErrors.applicableFrom = "Applicable From is required";

    if (!formData.applicableTo)
      newErrors.applicableTo = "Applicable To is required";

    if (!formData.calcBasisOn)
      newErrors.calcBasisOn = "Calculation Basis is required";

    // if (!formData.addOneDay)
    //   newErrors.addOneDay = "Add One Day is required";

    if (formData.calcBasisOn === "Daily" && !formData.calcMethod) {
      newErrors.calcMethod = "Calculation Method is required";
    }

    if (!formData.paymentFrequency)
      newErrors.paymentFrequency = "Payment Frequency is required";

    if (!formData.loanPeriod) newErrors.loanPeriod = "Loan Period is required";

    // if (!formData.preCloserMinDays)
    //   newErrors.preCloserMinDays = "Pre-closer days required";

    if (!formData.penaltyType)
      newErrors.penaltyType = "Penalty Type is required";

    if (!formData.penalty) newErrors.penalty = "Penalty is required";

    if (!formData.goldApprovePercent)
      newErrors.goldApprovePercent = "Gold approve % required";

    if (!formData.minLoanAmount)
      newErrors.minLoanAmount = "Min loan amount required";

    if (!formData.maxLoanAmount)
      newErrors.maxLoanAmount = "Max loan amount required";

    setErrors(newErrors);

    // ✅ SHOW ALERT HERE
    if (Object.keys(newErrors).length > 0) {
      alert(
        "⚠️ Please fill all required fields:\n\n• " +
          Object.values(newErrors).join("\n• "),
      );
      return false;
    }

    return true; // ✅ valid
  };

  // const handleSave = async () => {
  //   // ✅ validation handles alert itself
  //   if (!validateForm2()) return;
  //   setLoading(true);
  //   try {
  //     if (type === "edit") {
  //       await axios.put(`${API}/Scheme/updateScheme`, {
  //         id: data.id,
  //         formData,
  //         interestRates,
  //         precloser,
  //       });

  //       alert("✅ Scheme updated successfully!");
  //       setLoading(false);
  //     } else {
  //       await axios.post(`${API}/Scheme/addScheme`, {
  //         formData,
  //         interestRates,
  //         precloser,
  //       });

  //       alert(
  //         isCopyMode
  //           ? "✅ Scheme copied and saved successfully!"
  //           : "✅ Scheme added successfully!",
  //       );
  //       setLoading(false);
  //     }

  //     navigate("/Scheme-Details-List");
  //   } catch (error) {
  //     console.error("Error saving scheme:", error);
  //     alert("❌ Failed to save scheme.");
  //   }
  // };
  const handleSave = async () => {
    if (!validateForm2()) return;

    setLoading(true);

    try {
      const payload = {
        formData: {
          ...formData,

          // ✅ ARRAY FIX
          partyType: Array.isArray(formData.partyType)
            ? formData.partyType
            : [],

          // ✅ BONUS
          bonusChargeType: formData.bonusChargeType || "amount",
          bonusChargeValue: formData.bonusChargeValue || null,
          // bonusMonth: formData.bonusMonth || null,

          // ✅ MONTHLY INTEREST
          Monthly_interest_rate: formData.Monthly_interest_rate || null,

          // ✅ CLEAN EMPTY VALUES
          AdminChargeMin: formData.AdminChargeMin || null,
          AdminChargeMax: formData.AdminChargeMax || null,
          docChargeMin: formData.docChargeMin || null,
          docChargeMax: formData.docChargeMax || null,
        },

        interestRates:
          interestRates?.filter((obj) => Object.keys(obj).length > 0) || [],

        precloser: precloser || [],
      };

      if (type === "edit") {
        await axios.put(`${API}/Scheme/updateScheme`, {
          id: data.id,
          ...payload,
        });

        alert("✅ Scheme updated successfully!");
      } else {
        await axios.post(`${API}/Scheme/addScheme`, payload);

        alert("✅ Scheme saved successfully!");
      }

      navigate("/Scheme-Details-List");
    } catch (error) {
      console.error("❌ Error:", error?.response?.data || error);
      alert(error?.response?.data?.error || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const addRow = () => {
    setInterestRates((prev) => {
      // Get the last row in the current list
      const lastRow = prev[prev.length - 1];

      // Calculate the next "From" value
      // If lastRow.to exists, use it + 1, otherwise default to 0 or empty
      const nextFrom =
        lastRow && lastRow.to !== "" ? Number(lastRow.to) + 1 : "";

      return [
        ...prev,
        {
          id: Date.now(),
          from: nextFrom,
          to: "",
          type: lastRow?.type || "", // Carry over the type (Days/Months) for convenience
          addInt: "",
        },
      ];
    });
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
      const updated = {
        ...prev,

        // toggle same click
        calcBasisOn: prev.calcBasisOn === value ? "" : value,

        // 🔥 RESET THESE FIELDS
        paymentFrequency: "",
        loanPeriod: "",
        preCloserMinDays: "",
        penaltyType: "",
        penalty: "",
        interestType: "",
        calcMethod: "",
        addOneDay: "",
        interestInAdvance: "",
      };

      return updated;
    });

    // 🔥 RESET ARRAYS ALSO
    setInterestRates([{}]);
  };

  const isDailyBasis = formData.calcBasisOn === "Daily";

  return (
    <div className="min-h-screen bg-white ">
      <div className="flex justify-center sticky top-[50px] z-40">
        <div className="flex items-center px-6 py-4 border-b  w-[1462px] h-[40px] border  border-gray-200 justify-between  bg-white">
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
            {isCopyMode
              ? "Copy Scheme Details"
              : type === "edit"
                ? `Edit Scheme Details (ID: ${data?.id || ""})`
                : type === "view"
                  ? `View Scheme Details (ID: ${data?.id || ""})`
                  : "Add Scheme Details "}
          </h2>

          <div className="flex items-center gap-6">
            <div className="flex gap-3">
              {!isViewMode && (
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
              )}

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

      <div className="bg-white rounded-lg ">
        {/* First Row (ALWAYS VISIBLE) */}
        <div className="flex gap-2 ml-[25px]">
          <div className="w-[739px] h-auto bg-[#FFE6E6] p-[20px]">
            <div className="flex gap-[12px] ">
              <div className="flex flex-col">
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
                    className={`border border-gray-300 rounded-[8px] h-[30px] px-2 text-xs w-full bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 `}
                  />
                </div>
              </div>

              <div className="">
                <p className="font-medium text-[14px]">
                  Product Type <span className="text-red-500">*</span>
                </p>
                <select
                  name="product" // 🔥 IMPORTANT
                  value={formData.product}
                  onChange={handleInputChange}
                  disabled={isViewMode || isCopyMode}
                  className="border p-1 rounded-[8px] w-[100px] h-[30px] text-xs bg-white border-gray-300 mt-1"
                >
                  <option value="">Product Type</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                </select>
              </div>

              <div
                className="flex flex-col relative w-[180px]"
                ref={dropdownRef}
              >
                <label className="text-[13px] font-semibold text-gray-700 mb-1">
                  For Party Type <span className="text-red-500">*</span>
                </label>

                <div
                  onClick={() =>
                    !(isViewMode || isCopyMode) &&
                    setIsDropdownOpen(!isDropdownOpen)
                  }
                  className={`
        flex items-center justify-between border rounded-[8px] px-3 h-[30px] text-xs bg-white transition-all cursor-pointer
       
        ${isViewMode || isCopyMode ? "bg-gray-100 cursor-not-allowed opacity-80" : "hover:border-gray-400"}
      `}
                >
                  <span className="truncate text-gray-600">
                    {formData.partyType.length > 0
                      ? `${formData.partyType.length} Selected`
                      : "Select Types"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* Dropdown Menu with Checkboxes */}
                {isDropdownOpen && (
                  <div className="absolute top-[65px] left-0 w-[200px] bg-white border border-gray-200 rounded-[8px] shadow-xl z-50 max-h-[200px] overflow-y-auto p-1 animate-in fade-in zoom-in duration-200">
                    {partyTypeList.map((pt) => (
                      <label
                        key={pt.id}
                        className="flex items-center px-3 py-2 hover:bg-blue-50 rounded-[6px] cursor-pointer transition-colors group"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          checked={formData.partyType.includes(pt.party_type)}
                          onChange={() => handleCheckboxChange(pt.party_type)}
                          disabled={isViewMode || isCopyMode}
                        />
                        <span className="ml-3 text-[12px] text-gray-700 group-hover:text-blue-700 transition-colors">
                          {pt.party_type}
                        </span>
                      </label>
                    ))}
                    {partyTypeList.length === 0 && (
                      <div className="p-3 text-xs text-gray-400 text-center">
                        No options found
                      </div>
                    )}
                  </div>
                )}

                {/* {errors.partyType && (
                  <p className="text-[10px] text-red-500 mt-1 font-medium italic">
                    Required field
                  </p>
                )} */}
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  disabled={isViewMode || isCopyMode}
                  onChange={handleInputChange}
                  placeholder=""
                  className={`border border-gray-300 rounded-[8px] h-[30px] text-xs px-3  mt-1 w-[305px] bg-white `}
                />
              </div>
            </div>

            {/* //2ndrows */}

            <div className="flex gap-[12px] mt-3 ">
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
                  className={`border border-gray-300 rounded-[8px] px-2  mt-1 w-[145px] h-[30px] text-xs bg-white ${
                    errors.applicableFrom ? "border-red-500" : ""
                  }`}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Applicable To <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="applicableTo"
                  value={formData.applicableTo}
                  disabled={isViewMode}
                  onChange={handleInputChange}
                  min={
                    formData.applicableFrom ||
                    new Date().toISOString().split("T")[0]
                  } // always after 'Applicable From'
                  className="border border-gray-300 rounded-[8px] px-2 h-[30px] text-xs mt-1 w-[145px] bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[14px] font-medium">
                  Cal. basis on <span className="text-red-500">*</span>
                </label>

                <div className="flex items-center gap-2 mt-1">
                  <div
                    disabled={isViewMode || isCopyMode}
                    className={`w-[146px] h-[30px] text-xs rounded-[8px] flex bg-white p-2 
        ${isViewMode ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() => {
                      if (!isViewMode) {
                        handleCalcBasisChange(
                          formData.calcBasisOn === "Daily"
                            ? "Monthly"
                            : "Daily",
                        );
                      }
                    }}
                  >
                    <div className="w-1/2 flex items-center justify-center">
                      <span
                        className={`text-sm font-medium transition-all duration-200 rounded-full w-[70px] h-[30px] text-center py-1 
                        ${
                          formData.calcBasisOn === "Daily"
                            ? "bg-[#0A2478] text-white"
                            : "text-black"
                        }`}
                      >
                        Daily
                      </span>
                    </div>

                    <div className="w-1/2 flex items-center justify-center">
                      <span
                        className={`text-sm font-medium transition-all duration-200 rounded-full w-full text-center py-1 
          ${
            formData.calcBasisOn === "Monthly"
              ? "bg-[#0A2478] text-white"
              : "text-black"
          }`}
                      >
                        Monthly
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isDailyBasis && (
                <div className="flex flex-col">
                  <label className="text-[14px] font-medium">
                    Add 1 Day <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="addOneDay"
                    value={formData.addOneDay}
                    onChange={handleInputChange}
                    disabled={isViewMode || isCopyMode}
                    className="border border-gray-300 rounded-[8px] px-3 h-[30px] text-xs mt-1 w-[94px] bg-white "
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              )}
              {isDailyBasis && (
                <div className="flex flex-col w-[140px]">
                  <label className="text-[14px] font-medium">
                    Calc. Method <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="calcMethod"
                    value={formData.calcMethod}
                    onChange={handleInputChange}
                    disabled={isViewMode || isCopyMode}
                    className="border border-gray-300 px-3 h-[30px] text-xs mt-1 bg-white rounded-[8px] w-[104px]"
                  >
                    <option value="">Select</option>
                    <option value="Simple">Simple</option>
                    <option value="Multiple">Multiple</option>
                    <option value="Compound">Compound</option>
                  </select>
                </div>
              )}

              {!isDailyBasis && (
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
                      disabled={isViewMode || isCopyMode}
                      onChange={handleInputChange}
                      className="border border-gray-300 px-3 py-2 w-[70px] h-[30px] text-xs bg-white rounded-l-[8px] mt-1"
                    />
                    <div className="bg-[#0A2478] text-white px-4 py-1 rounded-r-[8px] w-[40px] h-[30px] mt-1">
                      {formData.calcBasisOn === "Daily"
                        ? "D"
                        : formData.calcBasisOn === "Monthly"
                          ? "M"
                          : "-"}
                    </div>
                  </div>
                </div>
              )}
              {!isDailyBasis && (
                <div className="flex flex-col ">
                  <label className="text-[14px] font-medium">
                    Loan Tenure <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center">
                    <input
                      type="text"
                      name="loanPeriod"
                      value={formData.loanPeriod}
                      placeholder="e.g.185"
                      onChange={handleInputChange}
                      disabled={isViewMode || isCopyMode}
                      className="border border-gray-300 px-2 mt-1 w-[70px] rounded-l-[8px] h-[30px] text-xs bg-white"
                    />
                    <div className="bg-[#0A2478] text-white px-3 py-1 mt-1 rounded-r-[8px] w-[40px] h-[28px]">
                      {formData.calcBasisOn === "Daily"
                        ? "D"
                        : formData.calcBasisOn === "Monthly"
                          ? "M"
                          : "-"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3rd row */}
            <div className="flex gap-[12px] mt-3 ">
              {isDailyBasis && (
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
                      disabled={isViewMode || isCopyMode}
                      onChange={handleInputChange}
                      className="border border-gray-300 px-3 py-2 w-[80px] h-[30px] mt-1  text-xs bg-white rounded-l-[8px]"
                    />
                    <div className="bg-[#0A2478] text-white px-2 py-1 rounded-r-[8px] w-[40px] h-[28px] mt-1">
                      {formData.calcBasisOn === "Daily"
                        ? "D"
                        : formData.calcBasisOn === "Monthly"
                          ? "M"
                          : "-"}
                    </div>
                  </div>
                </div>
              )}

              {isDailyBasis && (
                <div className="flex flex-col ">
                  <label className="text-[14px] font-medium">
                    Interest in Advance <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="interestInAdvance"
                    value={formData.interestInAdvance || ""}
                    onChange={handleInputChange}
                    disabled={isViewMode || isCopyMode}
                    className="border border-gray-300 rounded-[8px] px-3 h-[30px] mt-1 text-xs bg-white w-[126px] "
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              )}
              {isDailyBasis && (
                <div className="flex flex-col ">
                  <label className="text-[14px] font-medium">
                    Loan Tenure <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center">
                    <input
                      type="text"
                      name="loanPeriod"
                      value={formData.loanPeriod}
                      placeholder="e.g.185"
                      onChange={handleInputChange}
                      disabled={isViewMode || isCopyMode}
                      className="border border-gray-300 px-2 mt-1 w-[100px] rounded-l-[8px] h-[30px] text-xs bg-white"
                    />
                    <div className="bg-[#0A2478] text-white px-2 py-1 mt-1 rounded-r-[8px] w-[40px] h-[28px]">
                      {formData.calcBasisOn === "Daily"
                        ? "D"
                        : formData.calcBasisOn === "Monthly"
                          ? "M"
                          : "-"}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col ">
                <label className="text-[14px] font-medium">
                  Penalty Type <span className="text-red-600">*</span>
                </label>
                <select
                  name="penaltyType"
                  value={formData.penaltyType || ""}
                  disabled={isViewMode || isCopyMode}
                  onChange={handleInputChange}
                  className="border rounded-[8px] px-3 h-[30px] text-xs mt-1 bg-white border-gray-300 w-[111px]"
                >
                  <option value="">Select</option>
                  <option value="Amount">Amount</option>
                  <option value="Percent">Percent</option>
                </select>
              </div>
              {isDailyBasis && (
                <div className="flex flex-col ">
                  <label className="text-[14px] font-medium">
                    Penalty <span className="text-red-500">*</span>
                  </label>
                  <input
  type="number"
  name="penalty"
  value={formData.penalty || ""}
  onChange={handleInputChange}
  disabled={
    isViewMode ||
    isCopyMode ||
    !formData.penaltyType // 🚀 disable if not selected
  }
  placeholder={
    !formData.penaltyType
      ? "Select Penalty Type first"
      : formData.penaltyType === "Percent"
      ? "e.g 10%"
      : "e.g ₹10"
  }
  onWheel={(e) => e.target.blur()}
  className="border border-gray-300 rounded-[8px] px-2 h-[30px] text-xs mt-1 bg-white w-[125px]"
/>
                </div>
              )}

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
  disabled={
    isViewMode ||
    isCopyMode ||
    !formData.penaltyType // 🚀 disable if not selected
  }
  placeholder={
    !formData.penaltyType
      ? "Select Penalty Type first"
      : formData.penaltyType === "Percent"
      ? "e.g 10%"
      : "e.g ₹10"
  }
  onWheel={(e) => e.target.blur()}
  className="border border-gray-300 rounded-[8px] px-2 h-[30px] text-xs mt-1 bg-white w-[125px]"
/>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      Loan approve % <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="goldApprovePercent"
                      value={formData.goldApprovePercent}
                      onChange={handleInputChange}
                      disabled={isViewMode || isCopyMode}
                      style={{
                        MozAppearance: "textfield",
                      }}
                      placeholder="e.g 95%"
                      onWheel={(e) => e.target.blur()}
                      className="border border-gray-300 rounded-[8px] px-2 h-[30px] mt-1 text-xs w-[127px] bg-white "
                    />
                  </div>
                </>
              )}

              {!isDailyBasis && (
                <>
                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      Min Loan Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="minLoanAmount"
                      value={formData.minLoanAmount || ""}
                      onChange={handleInputChange}
                      disabled={isViewMode || isCopyMode}
                      placeholder="e.g. ₹20,000.00"
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      className="border border-gray-300 rounded-[8px] px-2   w-[116px] bg-white h-[30px] text-xs"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      Max Loan Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="maxLoanAmount"
                      value={formData.maxLoanAmount}
                      onChange={handleInputChange}
                      disabled={isViewMode || isCopyMode}
                      placeholder="e.g.₹5,00,000.00"
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      className="border border-gray-300 rounded-[8px] px-2 h-[30px] text-xs w-[119px] bg-white"
                    />
                  </div>
                </>
              )}
            </div>

            {/* 4throw */}
            <div className="flex gap-[12px] mt-[20px] ">
              {isDailyBasis && (
                <>
                  {/* <div className="flex flex-col ">
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
                  </div> */}
                  {isDailyBasis && (
                    <div className="flex flex-col ">
                      <label className="text-[14px] font-medium">
                        Fore Closure Min Days{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        name="preCloserMinDays"
                        value={formData.preCloserMinDays || ""}
                        onChange={handleInputChange}
                        disabled={isViewMode || isCopyMode}
                        placeholder="e.g 15 days"
                        onWheel={(e) => e.target.blur()}
                        className="border border-gray-300 rounded-[8px] px-2 h-[30px] mt-1 text-xs  bg-white w-[130px] "
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      Product approve % <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="goldApprovePercent"
                      value={formData.goldApprovePercent}
                      onChange={handleInputChange}
                      disabled={isViewMode || isCopyMode}
                      style={{
                        MozAppearance: "textfield",
                      }}
                      placeholder="e.g 95%"
                      onWheel={(e) => e.target.blur()}
                      className="border border-gray-300 rounded-[8px] px-2 h-[30px] text-xs w-[127px] bg-white "
                    />
                  </div>
                </>
              )}
              {isDailyBasis && (
                <>
                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      Min Loan Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="minLoanAmount"
                      value={formData.minLoanAmount || ""}
                      onChange={handleInputChange}
                      disabled={isViewMode || isCopyMode}
                      placeholder="e.g. ₹20,000.00"
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      className="border border-gray-300 rounded-[8px] px-2   w-[116px] bg-white h-[30px] text-xs"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      Max Loan Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="maxLoanAmount"
                      value={formData.maxLoanAmount}
                      onChange={handleInputChange}
                      disabled={isViewMode || isCopyMode}
                      placeholder="e.g.₹5,00,000.00"
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      className="border border-gray-300 rounded-[8px] px-2 h-[30px] text-xs w-[119px] bg-white"
                    />
                  </div>
                </>
              )}

              {!isDailyBasis && (
                <>
                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      Interest Type <span className="text-red-500">*</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <div
                        className={`w-[200px] h-[30px] rounded-[8px] flex bg-white p-1 
          ${isViewMode ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {/* Floating */}
                        <div
                          className="w-1/2 flex items-center justify-center"
                          onClick={() => {
                            if (!isViewMode) {
                              handleInputChange({
                                target: { name: "interestType", value: "Flat" },
                              });
                            }
                          }}
                        >
                          <span
                            className={`text-sm font-medium transition-all duration-200 rounded-full w-[90px] h-[30px] text-center py-1 ${
                              formData.interestType === "Flat"
                                ? "bg-[#0A2478] text-white"
                                : "text-black"
                            }`}
                          >
                            Flat
                          </span>
                        </div>

                        {/* Reducing */}
                        <div
                          className="w-1/2 flex items-center justify-center"
                          onClick={() => {
                            if (!isViewMode) {
                              handleInputChange({
                                target: {
                                  name: "interestType",
                                  value: "Reducing",
                                },
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
                 <div>
  <p className="text-[14px] font-medium">
    Bounced Charge <span className="text-red-500">*</span>
  </p>

  <div className="flex gap-2">
    {/* ✅ Dropdown */}
    <select
      name="bouncedType"
      value={formData.bouncedType || ""}
      onChange={handleInputChange}
      disabled={isViewMode || isCopyMode}
      className="border border-gray-300 rounded-[8px] px-2 h-[30px] text-xs w-[119px] bg-white"
    >
      <option value="">Select</option>
      <option value="fixed">Fixed Amount</option>
      <option value="percentage">Percentage (%)</option>
    </select>

    {/* ✅ Input */}
    <input
  type="number"
  name="bounced"
  value={formData.bounced || ""}
  onChange={handleInputChange}
  disabled={
    isViewMode ||
    isCopyMode ||
    !formData.bouncedType
  }
  max={formData.bouncedType === "percentage" ? 100 : undefined}
  placeholder={
    !formData.bouncedType
      ? "Select type first"
      : formData.bouncedType === "percentage"
      ? "Enter %"
      : "Enter Amount"
  }
  onWheel={(e) => e.target.blur()}
  className="border border-gray-300 rounded-[8px] px-2 h-[30px] text-xs w-[119px] bg-white"
/>
  </div>
</div>

                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium">
                      EMI interest rate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="Monthly_interest_rate"
                      value={formData.Monthly_interest_rate}
                      onChange={handleInputChange}
                      disabled={isViewMode || isCopyMode}
                      placeholder="e.g-18%"
                      style={{
                        MozAppearance: "textfield",
                      }}
                      onWheel={(e) => e.target.blur()}
                      className="border border-gray-300 rounded-[8px] px-2 h-[30px] text-xs w-[119px] bg-white"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-[700px] bg-[#E9E9FF] p-4 ">
            {/* ---------------------- DOCUMENT CHARGE ---------------------- */}
            {isDailyBasis && (
              <>
                {/* <label className="text-[14px] font-medium mb-1">
                      Admin Charges
                    </label> */}
                <h3 className="text-[15px] font-semibold text-[#0A2478]">
                  Admin Charges
                </h3>
                <div className="flex gap-4 items-end mt-2">
                  {/* 1. Administrative Charge Type Dropdown */}

                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium mb-1">
                      Admin Charge Type
                    </label>
                    <select
                      name="adminChargeType"
                      value={formData.adminChargeType || "percentage"}
                      disabled={isViewMode}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-[8px]  text-xs h-[30px] w-[120px] bg-white outline-none"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>

                  {/* 2. Dynamic Input: Percentage or Amount */}
             <div className="flex flex-col">
  <label className="text-[14px] font-medium mb-1">
    {formData.adminChargeType === "percentage"
      ? "Percentage (%)"
      : "Amount (₹)"}
  </label>

  {/* <input
    type="number"
    name="administrativeCharges"
    value={formData.administrativeCharges || ""}

    onChange={(e) => {
      // ✅ allow typing freely (including decimal)
      setFormData((prev) => ({
        ...prev,
        administrativeCharges: e.target.value,
      }));
    }}

    onBlur={(e) => {
      const val = e.target.value;

      // ✅ convert to decimal format
      if (val !== "" && !isNaN(val)) {
        setFormData((prev) => ({
          ...prev,
          administrativeCharges: Number(val).toFixed(2),
        }));
      }
    }}

    step="0.01"   // ✅ allow decimals
    min="0"
    disabled={isViewMode}
    placeholder={
      formData.adminChargeType === "percentage"
        ? "e.g. 2.00"
        : "e.g. 100.00"
    }
    style={{ MozAppearance: "textfield" }}
    onWheel={(e) => e.target.blur()}
    className="border border-gray-300 rounded-[8px] px-2 text-xs h-[30px] w-[130px] bg-white outline-none"
  /> */}

  <input
  type="number"
  name="administrativeCharges"
  value={formData.administrativeCharges || ""}
  onChange={handleInputChange}   // ✅ use common handler now
  onBlur={(e) => {
    const val = e.target.value;

    if (val !== "" && !isNaN(val)) {
      setFormData((prev) => ({
        ...prev,
        administrativeCharges: Number(val).toFixed(2),
      }));
    }
  }}
  step="0.01"
  min="0"
  max={formData.adminChargeType === "percentage" ? 100 : undefined} // ✅ UI restriction
  disabled={isViewMode}
  placeholder={
    formData.adminChargeType === "percentage"
      ? "e.g. 2.00"
      : "e.g. 100.00"
  }
  onWheel={(e) => e.target.blur()}
  className="border border-gray-300 rounded-[8px] px-2 text-xs h-[30px] w-[130px] bg-white"
/>
</div>
                  <div className="flex flex-col">
                    <label
                      className={`text-sm font-medium ${formData.adminChargeType === "fixed" ? "text-gray-400" : ""}`}
                    >
                      Min
                    </label>
                    <input
                      type="number"
                      name="AdminChargeMin"
                      value={
                        formData.adminChargeType === "fixed"
                          ? ""
                          : formData.AdminChargeMin
                      }
                      onChange={handleInputChange}
                      // Disabled if in View Mode OR if Charge Type is Fixed Amount
                      disabled={
                        isViewMode || formData.adminChargeType === "fixed"
                      }
                      onWheel={(e) => e.target.blur()}
                      className={`p-2 border border-gray-300 mt-1 rounded-[8px] text-xs h-[30px] w-[100px] outline-none transition-colors ${
                        formData.adminChargeType === "fixed"
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>

                  {/* Max Field */}
                  <div className="flex flex-col">
                    <label
                      className={`text-sm font-medium ${formData.adminChargeType === "fixed" ? "text-gray-400" : ""}`}
                    >
                      Max
                    </label>
                    <input
                      type="number"
                      name="AdminChargeMax"
                      value={
                        formData.adminChargeType === "fixed"
                          ? ""
                          : formData.AdminChargeMax
                      }
                      onChange={handleInputChange}
                      // Disabled if in View Mode OR if Charge Type is Fixed Amount
                      disabled={
                        isViewMode || formData.adminChargeType === "fixed"
                      }
                      onWheel={(e) => e.target.blur()}
                      className={`p-2 border border-gray-300 mt-1 rounded-[8px] text-xs h-[30px] w-[100px] outline-none transition-colors ${
                        formData.adminChargeType === "fixed"
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>
                </div>
                <h3 className="text-[15px] font-semibold text-[#0A2478] mt-2">
                  Documents Charge
                </h3>
                <div className="flex gap-4 w-full mt-2 ">
                  {/* % of Loan Amount */}

                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      {" "}
                      Doc Charge Type{" "}
                    </label>
                    <select
                      name="docChargeType"
                      value={formData.docChargeType}
                      disabled={isViewMode}
                      onChange={handleInputChange}
                      className=" border border-gray-300 rounded-[8px] text-xs  h-[30px] w-[120px] bg-white outline-none"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      {formData.docChargeType === "percentage"
                        ? "Percentage (%)"
                        : "Fixed Amount"}
                    </label>
                   <input
  type="number"
  name={
    formData.docChargeType === "percentage"
      ? "docChargePercent"
      : "docChargeFixed"
  }
  value={
    formData.docChargeType === "percentage"
      ? formData.docChargePercent || ""
      : formData.docChargeFixed || ""
  }
  disabled={isViewMode}
  onChange={handleInputChange}
  onBlur={(e) => {
    const val = e.target.value;

    if (val !== "" && !isNaN(val)) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: Number(val).toFixed(2), // ✅ 2 decimal fix
      }));
    }
  }}
  step="0.01"   // ✅ allow decimals
  max={formData.docChargeType === "percentage" ? 100 : undefined}
  onWheel={(e) => e.target.blur()}
  placeholder={
    formData.docChargeType === "percentage"
      ? "e.g. 2.00"
      : "e.g. 500.00"
  }
  className="p-2 border border-gray-300 rounded-[8px] text-xs h-[30px] w-[130px] bg-white"
/>
                  </div>

                  {/* Min Field */}
                  <div className="flex flex-col">
                    <label
                      className={`text-sm font-medium ${formData.docChargeType === "fixed" ? "text-gray-400" : ""}`}
                    >
                      Min
                    </label>
                    <input
                      type="number"
                      name="docChargeMin"
                      value={
                        formData.docChargeType === "fixed"
                          ? ""
                          : formData.docChargeMin
                      }
                      onChange={handleInputChange}
                      // Disabled if in View Mode OR if Charge Type is Fixed Amount
                      disabled={
                        isViewMode || formData.docChargeType === "fixed"
                      }
                      onWheel={(e) => e.target.blur()}
                      className={`p-2 border border-gray-300 rounded-[8px] text-xs  h-[30px] w-[100px] outline-none transition-colors ${
                        formData.docChargeType === "fixed"
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>

                  {/* Max Field */}
                  <div className="flex flex-col">
                    <label
                      className={`text-sm font-medium ${formData.docChargeType === "fixed" ? "text-gray-400" : ""}`}
                    >
                      Max
                    </label>
                    <input
                      type="number"
                      name="docChargeMax"
                      value={
                        formData.docChargeType === "fixed"
                          ? ""
                          : formData.docChargeMax
                      }
                      onChange={handleInputChange}
                      // Disabled if in View Mode OR if Charge Type is Fixed Amount
                      disabled={
                        isViewMode || formData.docChargeType === "fixed"
                      }
                      onWheel={(e) => e.target.blur()}
                      className={`p-2 border border-gray-300 rounded-[8px] text-xs h-[30px] w-[100px] outline-none transition-colors ${
                        formData.docChargeType === "fixed"
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>
                </div>
              </>
            )}
            {!isDailyBasis && (
              <>
                <h3 className="text-[15px] font-semibold text-[#0A2478]  mt-3">
                  Admin Charges
                </h3>
                <div className="flex gap-5 mt-2">
                  <div className="flex flex-col">
                    <label className="text-[14px] font-medium mb-1">
                      Admin Charge Type
                    </label>
                    <select
                      name="adminChargeType"
                      value={formData.adminChargeType || "percentage"}
                      disabled={isViewMode}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-[8px] px-2 text-xs h-[30px] w-[130px] bg-white outline-none "
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>

                {/* <div className="flex flex-col">
  <label className="text-[14px] font-medium mb-1">
    {formData.adminChargeType === "percentage"
      ? "Percentage (%)"
      : "Amount (₹)"}
  </label>

  <input
    type="number"
    name="administrativeCharges"
    value={
      formData.administrativeCharges !== "" &&
      formData.administrativeCharges !== null &&
      !isNaN(formData.administrativeCharges)
        ? Number(formData.administrativeCharges).toFixed(2)
        : ""
    }
    onChange={(e) => {
      // ✅ allow typing freely
      setFormData((prev) => ({
        ...prev,
        administrativeCharges: e.target.value,
      }));
    }}
    onBlur={(e) => {
      const val = e.target.value;

      // ✅ format only after user leaves input
      if (val !== "" && !isNaN(val)) {
        setFormData((prev) => ({
          ...prev,
          administrativeCharges: Number(val).toFixed(2),
        }));
      }
    }}
    step="0.01"
    min="0"
    disabled={isViewMode}
    placeholder={
      formData.adminChargeType === "percentage"
        ? "e.g. 2.00"
        : "e.g. 100.00"
    }
    style={{ MozAppearance: "textfield" }}
    onWheel={(e) => e.target.blur()}
    className="border border-gray-300 rounded-[8px] px-2 text-xs h-[30px] w-[130px] bg-white outline-none"
  />
</div> */}
<div className="flex flex-col">
  <label className="text-[14px] font-medium mb-1">
    {formData.adminChargeType === "percentage"
      ? "Percentage (%)"
      : "Amount (₹)"}
  </label>

  <input
  type="number"
  name="administrativeCharges"
  value={formData.administrativeCharges || ""}
  onChange={handleInputChange}   // ✅ use common handler now
  onBlur={(e) => {
    const val = e.target.value;

    if (val !== "" && !isNaN(val)) {
      setFormData((prev) => ({
        ...prev,
        administrativeCharges: Number(val).toFixed(2),
      }));
    }
  }}
  step="0.01"
  min="0"
  max={formData.adminChargeType === "percentage" ? 100 : undefined} // ✅ UI restriction
  disabled={isViewMode}
  placeholder={
    formData.adminChargeType === "percentage"
      ? "e.g. 2.00"
      : "e.g. 100.00"
  }
  onWheel={(e) => e.target.blur()}
  className="border border-gray-300 rounded-[8px] px-2 text-xs h-[30px] w-[130px] bg-white"
/>
</div>

                  <div className="flex flex-col">
                    <label
                      className={`text-sm font-medium ${formData.adminChargeType === "fixed" ? "text-gray-400" : ""}`}
                    >
                      Min
                    </label>
                    <input
                      type="number"
                      name="AdminChargeMin"
                      value={formData.AdminChargeMin}
                      onChange={handleInputChange}
                      disabled={
                        isViewMode || formData.adminChargeType === "fixed"
                      }
                      style={{ MozAppearance: "textfield" }}
                      onWheel={(e) => e.target.blur()}
                      className={`p-2 border border-gray-300 mt-1 rounded-[8px] text-xs h-[30px] w-[100px] outline-none transition-colors ${
                        formData.adminChargeType === "fixed"
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      className={`text-sm font-medium ${formData.adminChargeType === "fixed" ? "text-gray-400" : ""}`}
                    >
                      Max
                    </label>
                    <input
                      type="number"
                      name="AdminChargeMax"
                      value={
                        formData.adminChargeType === "fixed"
                          ? ""
                          : formData.AdminChargeMax
                      }
                      onChange={handleInputChange}
                      // Disabled if in View Mode OR if Charge Type is Fixed Amount
                      disabled={
                        isViewMode || formData.adminChargeType === "fixed"
                      }
                      onWheel={(e) => e.target.blur()}
                      className={`p-2 border border-gray-300 mt-1 rounded-[8px] text-xs h-[30px] w-[100px] outline-none transition-colors ${
                        formData.adminChargeType === "fixed"
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>
                </div>

                <h3 className="text-[15px] font-semibold text-[#0A2478]  mt-3">
                  Document Charge
                </h3>
                <div className="flex gap-4 w-full mt-1">
                  {/* % of Loan Amount */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      {" "}
                      Doc Charge Type{" "}
                    </label>
                    <select
                      name="docChargeType"
                      value={formData.docChargeType}
                      disabled={isViewMode}
                      onChange={handleInputChange}
                      className=" border border-gray-300 rounded-[8px] text-xs h-[30px] w-[130px] bg-white outline-none"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">
                      {formData.docChargeType === "percentage"
                        ? "Percentage (%)"
                        : "Fixed Amount"}
                    </label>
                    <input
  type="number"
  name={
    formData.docChargeType === "percentage"
      ? "docChargePercent"
      : "docChargeFixed"
  }
  value={
    formData.docChargeType === "percentage"
      ? formData.docChargePercent || ""
      : formData.docChargeFixed || ""
  }
  disabled={isViewMode}
  onChange={handleInputChange}
  onBlur={(e) => {
    const val = e.target.value;

    if (val !== "" && !isNaN(val)) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: Number(val).toFixed(2), // ✅ 2 decimal fix
      }));
    }
  }}
  step="0.01"   // ✅ allow decimals
  max={formData.docChargeType === "percentage" ? 100 : undefined}
  onWheel={(e) => e.target.blur()}
  placeholder={
    formData.docChargeType === "percentage"
      ? "e.g. 2.00"
      : "e.g. 500.00"
  }
  className="p-2 border border-gray-300 rounded-[8px] text-xs h-[30px] w-[130px] bg-white"
/>
                  </div>

                  {/* Min Field */}
                  <div className="flex flex-col">
                    <label
                      className={`text-sm font-medium ${formData.docChargeType === "fixed" ? "text-gray-400" : ""}`}
                    >
                      Min
                    </label>
                    <input
                      type="number"
                      name="docChargeMin"
                      value={
                        formData.docChargeType === "fixed"
                          ? ""
                          : formData.docChargeMin
                      }
                      onChange={handleInputChange}
                      // Disabled if in View Mode OR if Charge Type is Fixed Amount
                      disabled={
                        isViewMode || formData.docChargeType === "fixed"
                      }
                      onWheel={(e) => e.target.blur()}
                      className={`p-2 border border-gray-300 mt-1 rounded-[8px] text-xs h-[30px] w-[100px] outline-none transition-colors ${
                        formData.docChargeType === "fixed"
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>

                  {/* Max Field */}
                  <div className="flex flex-col">
                    <label
                      className={`text-sm font-medium ${formData.docChargeType === "fixed" ? "text-gray-400" : ""}`}
                    >
                      Max
                    </label>
                    <input
                      type="number"
                      name="docChargeMax"
                      value={
                        formData.docChargeType === "fixed"
                          ? ""
                          : formData.docChargeMax
                      }
                      onChange={handleInputChange}
                      // Disabled if in View Mode OR if Charge Type is Fixed Amount
                      disabled={
                        isViewMode || formData.docChargeType === "fixed"
                      }
                      onWheel={(e) => e.target.blur()}
                      className={`p-2 border border-gray-300 mt-1 rounded-[8px] text-xs h-[30px] w-[100px] outline-none transition-colors ${
                        formData.docChargeType === "fixed"
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                    />
                  </div>
                </div>
              </>
            )}
            {!isDailyBasis && (
              <div>
                <h3 className="text-[15px] font-semibold text-[#0A2478] mt-2 mb-2">
                  Foreclosure Charges
                </h3>

                <div className="overflow-hidden">
                  <table className="w-full border-collapse bg-white">
                    <thead>
                      <tr className="bg-[#0A2478] text-white text-sm">
                        <th className="p-1 border-r">From Date</th>
                        <th className="p-1 border-r">To Date</th>
                        <th className="p-1 border-r">Type</th>
                        <th className="p-1 border-r">Value</th>
                        <th className="p-1">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {precloser.map((item, index) => (
                        <tr key={index} className="border-b text-xs">
                          {/* From Date */}
                          <td className="p-1 text-center">
                            <input
                              type="date"
                              value={item.fromDate}
                              disabled={isViewMode}
                              onChange={(e) =>
                                handleChange(index, "fromDate", e.target.value)
                              }
                              className="border px-2 py-1 rounded w-[100px]"
                            />
                          </td>

                          {/* To Date */}
                          <td className="p-1 text-center">
                            <input
                              type="date"
                              value={item.toDate}
                              disabled={isViewMode}
                              onChange={(e) =>
                                handleChange(index, "toDate", e.target.value)
                              }
                              className="border px-2 py-1 rounded w-[100px]"
                            />
                          </td>

                          {/* Type Dropdown */}
                          <td className="p-1 text-center">
                            <select
                              value={item.type}
                              disabled={isViewMode}
                              onChange={(e) =>
                                handleChange(index, "type", e.target.value)
                              }
                              className="border px-2 py-1 rounded"
                            >
                              <option value="percentage">%</option>
                              <option value="fixed">Fixed</option>
                            </select>
                          </td>

                          {/* Value Input */}
                          <td className="p-1 text-center">
                            <input
                              type="number"
                              value={item.value}
                              disabled={isViewMode}
                              placeholder={
                                item.type === "percentage"
                                  ? "Enter %"
                                  : "Enter Amount"
                              }
                              onChange={(e) =>
                                handleChange(index, "value", e.target.value)
                              }
                              className="border px-2 py-1 rounded w-[100px]"
                            />
                          </td>

                          {/* Actions */}
                          <td className="p-1 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                type="button"
                                onClick={addRow2}
                                disabled={isViewMode}
                                className="text-white p-1 rounded bg-[#0A2478] w-[30px]"
                              >
                                <IoMdAddCircleOutline className="h-5 w-5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => removeRow2(index)}
                                disabled={isViewMode}
                                className="text-white p-1 rounded bg-[#C1121F] w-[30px]"
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
            )}
            {formData.calcBasisOn === "Daily" && (
              <div className="mt-2 w-[496px]">
                {/* <h3 className="text-xl font-semibold text-[#0A2478] mb-4">Interest Rate</h3> */}
                <h3 className="text-[15px] font-semibold text-[#0A2478] mb-2">
                  Interest Rate
                </h3>
                <div className="  overflow-hidden">
                  <table className="w-full border-collapse bg-white">
                    {/* Table Header */}
                    <thead>
                      <tr className="bg-[#0A2478] text-white text-xs ">
                        <th className="p-1 border-r w-[80px]">From</th>
                        <th className="p-1 border-r w-[80px]">To</th>
                        <th className="p-1 border-r w-[80px]">Type</th>
                        <th className="p-1 border-r w-[100px]">Yearly %</th>
                        <th className="p-1 w-[80px]">Action</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {interestRates.map((rate, i) => (
                        <tr
                          key={rate.id}
                          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          {/* From */}
                          <td className=" text-center">
                            <input
                              type="number"
                              value={rate.from || ""}
                              disabled={isViewMode}
                              onChange={(e) =>
                                onchange(rate.id, "from", e.target.value)
                              }
                              onWheel={(e) => e.target.blur()}
                              className="border border-gray-300 rounded-[8px] px-2 text-xs h-[30px] w-[80px] "
                              placeholder="From"
                            />
                          </td>

                          {/* To */}
                          <td className=" text-center">
                            <input
                              type="number"
                              value={rate.to || ""}
                              disabled={isViewMode}
                              onChange={(e) =>
                                onchange(rate.id, "to", e.target.value)
                              }
                              onWheel={(e) => e.target.blur()}
                              className="border border-gray-300 rounded-[8px] px-2 text-xs h-[30px] w-[80px] text-left"
                              placeholder="To"
                            />
                          </td>

                          {/* Type */}
                          <td className="text-center">
                            <span
                              className={`px-2 py-1 rounded-full text-[13px] font-medium
      ${
        (rate.type ||
          (formData.calcBasisOn === "Monthly"
            ? "months"
            : formData.calcBasisOn === "Daily"
              ? "days"
              : "")) === "days"
          ? " text-blue-600"
          : " text-green-600"
      }`}
                            >
                              {rate.type
                                ? rate.type === "days"
                                  ? "Days"
                                  : "Months"
                                : formData.calcBasisOn === "Monthly"
                                  ? "Months"
                                  : formData.calcBasisOn === "Daily"
                                    ? "Days"
                                    : "-"}
                            </span>
                          </td>

                          {/* Add % */}
                          <td className=" text-center">
                            <input
                              type="number"
                              value={rate.addInt || ""}
                              onChange={(e) =>
                                onchange(rate.id, "addInt", e.target.value)
                              }
                              disabled={isViewMode}
                              onWheel={(e) => e.target.blur()}
                              className="border border-gray-300 rounded-[8px] px-2 text-xs h-[30px] w-[90px] text-left"
                              placeholder="%"
                            />
                          </td>

                          {/* Action Buttons */}
                          <td className="p-1 text-left">
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
            )}
          </div>
        </div>

        <div>
          {type === "edit" && (
            <>
              <div className="flex   ml-[25px] ">
                <div className="">
                  <h3 className="text-[15px] font-semibold text-[#0A2478] ">
                    Renewal List
                  </h3>

                  <div className="  overflow-hidden">
                    <table className="w-[614px] border-collapse bg-white">
                      <thead>
                        <tr className="bg-[#0A2478] text-white text-xs">
                          <th className="p-1 border w-[80px]">App. From</th>
                          <th className="p-1 border w-[80px]">App. To</th>
                          <th className="p-1 border w-[70px]">Interest</th>
                          <th className="p-1 border w-[70px]">Approval %</th>
                          <th className="p-1 border w-[70px]">Renewal Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data?.renewalHistory?.map((item, index) => {
                          const slabs =
                            typeof item.interest_json === "string"
                              ? JSON.parse(item.interest_json)
                              : item.interest_json;

                          return (
                            <tr
                              key={item.id}
                              className={
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                              }
                            >
                              <td className="p-1 text-xs text-center">
                                {
                                  new Date(item.app_from)
                                    .toISOString()
                                    .split("T")[0]
                                }
                              </td>

                              <td className="p-1 text-center text-xs">
                                {
                                  new Date(item.app_to)
                                    .toISOString()
                                    .split("T")[0]
                                }
                              </td>

                              <td
                                className="p-1 text-center text-blue-600 underline cursor-pointer text-xs"
                                onClick={() => {
                                  setSelectedSlabs(slabs);
                                  setOpenSlabModal(true);
                                }}
                              >
                                {slabs?.length || 0} Slabs
                              </td>

                              <td className="p-1 text-center text-xs">
                                {item.gold_approve_percent}%
                              </td>

                              <td className="p-1 text-center text-xs">
                                {new Date(item.renewal_date).toLocaleDateString(
                                  "en-IN",
                                )}
                              </td>
                            </tr>
                          );
                        })}
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
                      <td className="border px-3 py-2 text-center">
                        {slab.from}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {slab.to}
                      </td>
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

      {loading && <Loader />}
    </div>
  );
};

export default AddSchemeDetailsListform;
