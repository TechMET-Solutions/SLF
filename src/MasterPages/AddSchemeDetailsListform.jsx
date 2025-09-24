// import React, { useState } from 'react';


// const AddSchemeDetailsListform = () => {
//   const [formData, setFormData] = useState({
//     schemeName: '',
//     description: '',
//     product: '',
//     applicableFrom: '',
//     applicableTo: '',
//     calcBasisOn: '',
//     calcMethod: '',
//     paymentFrequency: '',
//     compound: '',
//     interestInAdvance: '',
//     preCloseMinDays: '',
//     penaltyType: '',
//     penalty: '',
//     minLoanAmount: '',
//     paymentBasisOn: '',
//     loanPeriod: '',
//     goldApproxPercent: '',
//     maxLoanAmount: '',
//     forPartyType: '',
//     docChargePercent: '',
//     docChargeMin: '',
//     docChargeMax: ''
//   });

//   const [interestRates, setInterestRates] = useState([
//     { id: 1, selected: false, type: '', addToPercent: '' },
//     { id: 2, selected: false, type: '', addToPercent: '' },
//     { id: 3, selected: false, type: '', addToPercent: '' }
//   ]);

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: false
//       }));
//     }
//   };

//   const handleInterestRateChange = (id, field, value) => {
//     setInterestRates(prev => 
//       prev.map(rate => 
//         rate.id === id ? { ...rate, [field]: value } : rate
//       )
//     );
//   };

//   const addInterestRateRow = () => {
//     const newId = Math.max(...interestRates.map(r => r.id)) + 1;
//     setInterestRates(prev => [...prev, {
//       id: newId,
//       selected: false,
//       type: '',
//       addToPercent: ''
//     }]);
//   };

//   const removeSelectedRows = () => {
//     const selectedRows = interestRates.filter(rate => rate.selected);
    
//     if (selectedRows.length === 0) {
//       alert('Please select at least one row to remove.');
//       return;
//     }
    
//     setInterestRates(prev => prev.filter(rate => !rate.selected));
//   };

//   const validateForm = () => {
//     const requiredFields = ['schemeName', 'description', 'applicableFrom', 'calcBasisOn'];
//     const newErrors = {};
    
//     requiredFields.forEach(field => {
//       if (!formData[field] || formData[field].toString().trim() === '') {
//         newErrors[field] = true;
//       }
//     });
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = () => {
//     if (validateForm()) {
//       alert('Form saved successfully!');
//       console.log('Form data:', formData);
//       console.log('Interest rates:', interestRates);
//     } else {
//       alert('Please fill all required fields.');
//     }
//   };

//   const handleExit = () => {
//     if (window.confirm('Are you sure you want to exit? Any unsaved changes will be lost.')) {
//       console.log('Exit clicked');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white-100 p-5">
//       {/* Navigation Bar */}
      

//       {/* Main Container */}
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
//           <h1 className="text-xl font-bold" style={{ color: '#C1121F' }}>
//             Add Scheme Details List form
//           </h1>
//           <div className="flex gap-2">
//             <button 
//               onClick={handleSave}
//               className="px-4 py-2 text-white font-medium rounded hover:opacity-90 transition-opacity"
//               style={{ backgroundColor: '#0A2478' }}
//             >
//               Save
//             </button>
//             <button 
//               onClick={handleExit}
//               className="px-4 py-2 text-white font-medium rounded hover:opacity-90 transition-opacity"
//               style={{ backgroundColor: '#C1121F' }}
//             >
//               Exit
//             </button>
//           </div>
//         </div>

//         {/* Form Fields Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           {/* Row 1 */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">
//               Scheme Name<span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               name="schemeName"
//               value={formData.schemeName}
//               onChange={handleInputChange}
//               className={`p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.schemeName ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Scheme Name"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">
//               Description<span className="text-red-600">*</span>
//             </label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className={`p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.description ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Product</label>
//             <select
//               name="product"
//               value={formData.product}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Gold</option>
//               <option value="gold">Gold</option>
//               <option value="silver">Silver</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">
//               Applicable from<span className="text-red-600">*</span>
//             </label>
//             <input
//               type="date"
//               name="applicableFrom"
//               value={formData.applicableFrom}
//               onChange={handleInputChange}
//               className={`p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.applicableFrom ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//           </div>

//           {/* Row 2 */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Applicable To</label>
//             <input
//               type="date"
//               name="applicableTo"
//               value={formData.applicableTo}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">
//               Cal. basis on<span className="text-red-600">*</span>
//             </label>
//             <select
//               name="calcBasisOn"
//               value={formData.calcBasisOn}
//               onChange={handleInputChange}
//               className={`p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.calcBasisOn ? 'border-red-500' : 'border-gray-300'
//               }`}
//             >
//               <option value="">Monthly</option>
//               <option value="monthly">Monthly</option>
//               <option value="yearly">Yearly</option>
//               <option value="daily">Daily</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Calc. Method</label>
//             <select
//               name="calcMethod"
//               value={formData.calcMethod}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Simple</option>
//               <option value="simple">Simple</option>
//               <option value="compound">Compound</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Payment Frequency</label>
//             <select
//               name="paymentFrequency"
//               value={formData.paymentFrequency}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Monthly</option>
//               <option value="monthly">Monthly</option>
//               <option value="quarterly">Quarterly</option>
//               <option value="yearly">Yearly</option>
//             </select>
//           </div>

//           {/* Row 3 */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Compound</label>
//             <select
//               name="compound"
//               value={formData.compound}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Individual</option>
//               <option value="individual">Individual</option>
//               <option value="corporate">Corporate</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Interest in advance</label>
//             <input
//               type="text"
//               name="interestInAdvance"
//               value={formData.interestInAdvance}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Pre Close Min Days</label>
//             <input
//               type="number"
//               name="preCloseMinDays"
//               value={formData.preCloseMinDays}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Penalty Type</label>
//             <select
//               name="penaltyType"
//               value={formData.penaltyType}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Percent</option>
//               <option value="percent">Percent</option>
//               <option value="fixed">Fixed</option>
//             </select>
//           </div>

//           {/* Row 4 */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Penalty</label>
//             <input
//               type="number"
//               step="0.01"
//               name="penalty"
//               value={formData.penalty}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Min Loan Amount</label>
//             <input
//               type="number"
//               name="minLoanAmount"
//               value={formData.minLoanAmount}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="50000"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Payment Basis On</label>
//             <select
//               name="paymentBasisOn"
//               value={formData.paymentBasisOn}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Principal</option>
//               <option value="principal">Principal</option>
//               <option value="total">Total</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Loan Period</label>
//             <input
//               type="number"
//               name="loanPeriod"
//               value={formData.loanPeriod}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Row 5 */}
//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Gold approx %</label>
//             <input
//               type="number"
//               step="0.01"
//               name="goldApproxPercent"
//               value={formData.goldApproxPercent}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Max Loan Amount</label>
//             <input
//               type="number"
//               name="maxLoanAmount"
//               value={formData.maxLoanAmount}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="500000"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">For party Type</label>
//             <select
//               name="forPartyType"
//               value={formData.forPartyType}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Individual</option>
//               <option value="individual">Individual</option>
//               <option value="corporate">Corporate</option>
//             </select>
//           </div>
//         </div>

//         {/* Document Charge Section */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-4">Document Charge</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="flex flex-col">
//               <label className="text-sm font-medium mb-1">% of Loan Amount</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 name="docChargePercent"
//                 value={formData.docChargePercent}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm font-medium mb-1">Min</label>
//               <input
//                 type="number"
//                 name="docChargeMin"
//                 value={formData.docChargeMin}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm font-medium mb-1">Max</label>
//               <input
//                 type="number"
//                 name="docChargeMax"
//                 value={formData.docChargeMax}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Interest Rate Section */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Interest Rate</h3>
//           <div className="flex justify-between items-center mb-3">
//             <button 
//               type="button"
//               onClick={removeSelectedRows}
//               className="px-4 py-2 text-white text-sm rounded hover:opacity-90 transition-opacity"
//               style={{ backgroundColor: '#C1121F' }}
//             >
//               Remove
//             </button>
//             <button 
//               type="button"
//               onClick={addInterestRateRow}
//               className="px-4 py-2 text-white text-sm rounded hover:opacity-90 transition-opacity"
//               style={{ backgroundColor: '#0A2478' }}
//             >
//               Add New
//             </button>
//           </div>
          
//           <div className="overflow-x-auto border border-gray-300 rounded-lg">
//             <table className="w-full border-collapse bg-white">
//               <thead>
//                 <tr style={{ backgroundColor: '#0A2478', color: 'white' }}>
//                   <th className="p-3 text-left border-r border-blue-400">Select</th>
//                   <th className="p-3 text-left border-r border-blue-400">No.</th>
//                   <th className="p-3 text-left border-r border-blue-400">Type</th>
//                   <th className="p-3 text-left">Add to %</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {interestRates.map((rate, index) => (
//                   <tr 
//                     key={rate.id} 
//                     className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
//                   >
//                     <td className="p-3 border-r border-gray-200">
//                       <input
//                         type="checkbox"
//                         checked={rate.selected}
//                         onChange={(e) => handleInterestRateChange(rate.id, 'selected', e.target.checked)}
//                         className="w-4 h-4"
//                       />
//                     </td>
//                     <td className="p-3 border-r border-gray-200 text-center">{index + 1}</td>
//                     <td className="p-3 border-r border-gray-200">
//                       <select
//                         value={rate.type}
//                         onChange={(e) => handleInterestRateChange(rate.id, 'type', e.target.value)}
//                         className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                       >
//                         <option value="">Days</option>
//                         <option value="days">Days</option>
//                         <option value="months">Months</option>
//                         <option value="years">Years</option>
//                       </select>
//                     </td>
//                     <td className="p-3">
//                       <input
//                         type="number"
//                         step="0.01"
//                         value={rate.addToPercent}
//                         onChange={(e) => handleInterestRateChange(rate.id, 'addToPercent', e.target.value)}
//                         className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddSchemeDetailsListform;
import React, { useState } from "react";

const formFields = [
  { name: "schemeName", label: "Scheme Name", type: "text", required: true },
  { name: "description", label: "Description", type: "text", required: true },
  { name: "product", label: "Product", type: "select", options: ["Gold", "Silver"] },
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
    <label className="text-sm font-medium mb-1">
      {field.label}
      {field.required && <span className="text-red-600">*</span>}
    </label>
    {field.type === "select" ? (
      <select
        name={field.name}
        value={formData[field.name] || ""}
        onChange={handleInputChange}
        className={`p-2 border rounded text-sm ${
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
        className={`p-2 border rounded text-sm ${
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
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Styled Header */}
        <div className="flex justify-center">
          <div className="flex items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
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
              Add Scheme Details List
            </h2>

            <div className="flex gap-3">
              <div className="flex justify-between gap-5">
                <button
                  onClick={handleSave}
                  style={{
                    width: "74px",
                    height: "24px",
                    borderRadius: "3.75px",
                  }}
                  className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
                >
                  Save
                </button>

                <button
                  onClick={() => window.history.back()}
                  className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* First Row (7 fields) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-6 mt-6">
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
