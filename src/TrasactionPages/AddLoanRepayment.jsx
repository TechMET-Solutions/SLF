import React, { useEffect, useState } from "react";
import profileempty from "../assets/profileempty.png";
import { IoMdPrint, IoMdDownload } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const installments = [
  {
    srNo: 1,
    receiptNo: "R-1001",
    paymentDate: "25/09/2025",
    paidUpto: "Aug 2025",
    mode: "UPI",
    refNo: "TXN12345",
    amount: "₹10,000",
    interest: "₹500",
    loanAdj: "₹9,500",
    intDays: 30,
  },
  {
    srNo: 2,
    receiptNo: "R-1002",
    paymentDate: "25/10/2025",
    paidUpto: "Sep 2025",
    mode: "Cash",
    refNo: "-",
    amount: "₹10,000",
    interest: "₹400",
    loanAdj: "₹9,600",
    intDays: 28,
  },
];

const ItemList = [{}];

function AddLoanRepayment() {
  useEffect(() => {
    document.title = "SLF | Add Loan Repayment";
  }, []);

  const initialLoanInfo = {
    loanNo: "",
    customerName: "",
    mobileNumber: "",
    loanDate: "",
    loanAmount: "",
    interestRate: "",
    scheme: "",
    pendingLoanAmount: "",
    pendingInt: "",
    pendingDays: "",
    loanAmountPaid: "",
    chargesDue: "",
    lastInterestPaidDate: "",
    lastInterestPaidUpto: "",
  };
  // ✅ Initialize formData state
  const [formData, setFormData] = useState({
    Borrower_ProfileImg: "",
    Borrower_signature: "",
    CoBorrower_ProfileImg: "",
    CoBorrower_signature: "",
    OrnamentPhoto: "",
  });

  const [loanInfo, setLoanInfo] = useState(initialLoanInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center mt-5">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
        <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
          Add Loan Repayment
        </h2>

        <div className="flex items-center gap-5">
          <button className="bg-[#0A2478] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px]  transition">
            Submit
          </button>
          <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px]  transition">
            Close
          </button>
        </div>
      </div>

      {/* Loan Information Section */}
      <div className="flex flex-col items-center ">
        {/* Header Section */}

        {/* Loan Information Section */}
      <div className="w-full max-w-[1290px] bg-white p-4 rounded-md">
  <h1 className="text-blue-900 font-semibold text-xl pb-3">
    Loan Information
  </h1>

  <div className="flex justify-between items-start gap-6">
    {/* Left Section - Loan Info */}
    <div className="flex flex-col gap-3 flex-1 text-sm">
      {/* Row 1 */}
      <div className="flex gap-4">
        {[
          { label: "Loan No", name: "loanNo", type: "text", width: "120px" },
          { label: "Customer Name", name: "customerName", type: "text", width: "210px" },
          { label: "Mobile Number", name: "mobileNumber", type: "text", width: "120px" },
          { label: "Loan Date", name: "loanDate", type: "date", width: "130px" },
          { label: "Loan Amount", name: "loanAmount", type: "text", width: "130px" },
          { label: "Under the Scheme", name: "scheme", type: "text", width: "120px" },
        ].map((f, i) => {
          if (f.name === "loanAmount") {
            return (
              <div key={i} className="flex flex-col gap-1" style={{ width: f.width }}>
                <label className="text-gray-900 font-medium">{f.label}</label>
                <div className="flex">
                  <input
                    type="text"
                    name="loanAmount"
                    placeholder="Loan Amount"
                    value={loanInfo.loanAmount}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:ring-1 focus:outline-none"
                  />
                  <button className="bg-[#0A2478] text-white px-2 py-2 rounded-r-md hover:bg-[#081c5b] text-xs w-[40px]">
                    {loanInfo.interestRate || "18%"}
                  </button>
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="flex flex-col" style={{ width: f.width }}>
              <label className="text-gray-800 font-medium">{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                value={loanInfo[f.name]}
                onChange={handleChange}
                className=" border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          );
        })}
      </div>

      {/* Row 2 */}
      <div className="flex gap-4">
        {[
          { label: "Pending Loan Amount", name: "pendingLoanAmount", type: "text", width: "150px" },
          { label: "Pending Int", name: "pendingInt", type: "text", width: "120px" },
          { label: "Pending Days", name: "pendingDays", type: "text", width: "120px" },
          { label: "Loan Amount Paid", name: "loanAmountPaid", type: "text", width: "130px" },
          { label: "Charges Due", name: "chargesDue", type: "text", width: "130px" },
        ].map((f, i) => (
          <div key={i} className="flex flex-col" style={{ width: f.width }}>
            <label className="text-gray-800 font-medium">{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              value={loanInfo[f.name]}
              onChange={handleChange}
              className=" border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Row 3 */}
      <div className="flex gap-4">
        {[
          { label: "Last Interest Paid Date", name: "lastInterestPaidDate", type: "date", width: "150px" },
          { label: "Last Interest Paid Upto", name: "lastInterestPaidUpto", type: "date", width: "150px" },
        ].map((f, i) => (
          <div key={i} className="flex flex-col" style={{ width: f.width }}>
            <label className="text-gray-800 font-medium">{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              value={loanInfo[f.name]}
              onChange={handleChange}
              className=" border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Right Section - Images */}
    <div className="flex gap-3 mt-[-40px] ">
      {[
        { label: "Customer", img: formData.Borrower_ProfileImg, sign: formData.Borrower_signature },
        { label: "Co-Borrower", img: formData.CoBorrower_ProfileImg, sign: formData.CoBorrower_signature },
        { label: "Ornament Photo", img: formData.OrnamentPhoto, sign: null },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <p className="font-medium mb-1 text-xs">{item.label}</p>
          <img
            src={item.img ? item.img : profileempty}
            alt={item.label}
            className="w-[100px]  h-[115px] object-cover rounded-[5px] border border-gray-300"
          />
          {item.sign !== null && (
            <div className="mt-1 border w-[100px] h-[26px] flex items-center justify-center bg-white rounded-[4px]">
              {item.sign ? (
                <img src={item.sign} alt="Signature" className="w-full h-full object-contain" />
              ) : (
                <span className="text-gray-400 text-[9px]">No Signature</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>



        {/* Payment Section */}
        <div className="mt-4 w-[1290px] bg-white rounded-md p-4">
          <h1 className="text-blue-900 font-semibold text-xl pb-2">Payment</h1>

          {/* Top Checkboxes */}
          <div className="flex gap-6 mb-4">
            {[
              { id: "isClose", label: "Is Close" },
              { id: "isAdvInt", label: "Is Adv. Int" },
              { id: "creditNote", label: "Credit Note" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={c.id}
                  className="accent-[#0A2478] h-4 w-4"
                />
                <label htmlFor={c.id} className="font-medium text-gray-900">
                  {c.label}
                </label>
              </div>
            ))}
          </div>

          {/* Row 1 */}
         <div className="flex flex-wrap gap-x-6 gap-y-4">
  {[
    "Pay Amount",
    "Interest Adjusted",
    "Loan Amt Adjusted",
    "Balance Loan Amt",
    "Charges Adjusted",
    "Interest Paid For",
  ].map((field, i) => (
    <div key={i} className="flex flex-col gap-1 w-[150px]">
      <label className="text-gray-900 font-medium">{field}</label>
      <input
        type="text"
        placeholder={field}
        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  ))}

  {/* Int. Paid Upto (Date Picker Field) */}
  <div className="flex flex-col gap-1 w-[150px]">
    <label className="text-gray-900 font-medium">Int. Paid Upto</label>
    <DatePicker
      selected={loanInfo.intPaidUpto}
      onChange={(date) =>
        setLoanInfo((prev) => ({ ...prev, intPaidUpto: date }))
      }
      dateFormat="dd/MM/yyyy"
      placeholderText="Select Date"
      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</div>


          <p className="text-sm text-gray-500 mt-1 ml-1">Amount in words</p>

          {/* Row 2: Payment Details */}
          <div className="flex flex-wrap gap-x-6 gap-y-4 mt-4">
            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">
                Mode of Payment
              </label>
              <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                <option>--Select--</option>
                <option>Cash</option>
                <option>Net Banking</option>
                <option>Credit Note</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 w-[150px]">
              <label className="text-gray-900 font-medium">
                Type of Payment
              </label>
              <input
                type="text"
                placeholder="Cash"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">
                Payment Ref. No
              </label>
              <input
                type="text"
                placeholder="Reference Number"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-medium">
                Payment Made By
              </label>
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pledge Item List */}
        <div className="my-6 w-[1270px] bg-white">
          <h1 className="text-blue-900 font-semibold text-xl py-2">
            Pledge Item List
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white text-sm">
                  <th className="p-2 border border-gray-300">Particulars</th>
                  <th className="p-2 border border-gray-300">Nos</th>
                  <th className="p-2 border border-gray-300">Gross</th>
                  <th className="p-2 border border-gray-300">Net Weight</th>
                  <th className="p-2 border border-gray-300 w-[550px]">
                    Remark
                  </th>
                </tr>
              </thead>
              <tbody>
                {ItemList.length > 0 ? (
                  ItemList.map((row, i) => (
                    <tr
                      key={i}
                      className="text-center text-sm hover:bg-gray-50"
                    >
                      <td className="p-2 border border-gray-300">
                        {row.particulars}
                      </td>
                      <td className="p-2 border border-gray-300">{row.nos}</td>
                      <td className="p-2 border border-gray-300">
                        {row.gross}
                      </td>
                      <td className="p-2 border border-gray-300">{row.net}</td>
                      <td className="p-2 border border-gray-300">
                        {row.remark}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center text-sm">
                    <td
                      colSpan="5"
                      className="p-3 border border-gray-300 text-gray-500"
                    >
                      No Pledge Item List Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Installments Table */}
        <div className="my-6 w-[1270px] bg-white">
          <h1 className="text-blue-900 font-semibold text-xl py-2">
            Installments
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white text-sm">
                  <th className="p-2 border border-gray-300">Sr. No</th>
                  <th className="p-2 border border-gray-300">Receipt No</th>
                  <th className="p-2 border border-gray-300">Payment Date</th>
<th className="p-2 border border-gray-300">
  <input
    type="date"
    value={formData.paidUpto}
    onChange={(e) =>
      setFormData({ ...formData, paidUpto: e.target.value })
    }
    className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />
</th>
                  <th className="p-2 border border-gray-300">
                    Mode of Payment
                  </th>
                  <th className="p-2 border border-gray-300">
                    Payment Ref. No
                  </th>
                  <th className="p-2 border border-gray-300">Amount</th>
                  <th className="p-2 border border-gray-300">Interest</th>
                  <th className="p-2 border border-gray-300">Loan Amt. Adj</th>
                  <th className="p-2 border border-gray-300">Int Paid Days</th>
                  <th className="p-2 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {installments.map((row, i) => (
                  <tr key={i} className="text-center text-sm hover:bg-gray-50">
                    <td className="p-2 border border-gray-300">{row.srNo}</td>
                    <td className="p-2 border border-gray-300">
                      {row.receiptNo}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {row.paymentDate}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {row.paidUpto}
                    </td>
                    <td className="p-2 border border-gray-300">{row.mode}</td>
                    <td className="p-2 border border-gray-300">{row.refNo}</td>
                    <td className="p-2 border border-gray-300">{row.amount}</td>
                    <td className="p-2 border border-gray-300">
                      {row.interest}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {row.loanAdj}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {row.intDays}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <div className="flex gap-4 text-lg items-center justify-center">
                        <IoMdDownload />
                        <IoMdPrint />
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
}

export default AddLoanRepayment;
