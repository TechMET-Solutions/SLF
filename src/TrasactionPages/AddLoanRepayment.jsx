import React from 'react'
import profileempty from '../assets/profileempty.png';
import { MdOutlineFileDownload } from 'react-icons/md';
import { IoMdPrint, IoMdDownload } from 'react-icons/io';

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

const ItemList = [{

}];

function AddLoanRepayment() {
    return (
        <div className="flex flex-col items-center mt-5">
            {/* Header Section */}
            <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
                <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
                    Add Loan Repayment
                </h2>

                <div className="flex items-center gap-5">
                    <button className="bg-[#0A2478] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
                        Search
                    </button>
                    <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
                        Close
                    </button>
                </div>
            </div>
            {/* Loan Information Section */}
            <div className="mt-4 w-full max-w-[1290px] bg-white">
                <h1 className="text-blue-900 font-semibold text-xl pb-3">Loan Information</h1>

                <div className="flex flex-wrap justify-between gap-4">
                    {/* Left Section (Form Fields) */}
                    <div className="flex flex-wrap gap-2 flex-1 text-sm">

                        {/* Loan No */}
                        <div className="flex flex-col gap-1 w-[100px]">
                            <label className="text-gray-900 font-medium">Loan No</label>
                            <input
                                type="text"
                                placeholder="Loan No"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Customer Name */}
                        <div className="flex flex-col gap-1  min-w-[180px]">
                            <label className="text-gray-900 font-medium">Customer Name</label>
                            <input
                                type="text"
                                placeholder="Customer Name"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Mobile Number */}
                        <div className="flex flex-col gap-1  w-[140px]">
                            <label className="text-gray-900 font-medium">Mobile Number</label>
                            <input
                                type="text"
                                placeholder="Mobile Number"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Branch Code */}
                        <div className="flex flex-col gap-1  w-[100px]">
                            <label className="text-gray-900 font-medium">Branch Code</label>
                            <input
                                type="text"
                                placeholder="Branch Code"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Branch Name */}
                        <div className="flex flex-col gap-1  w-[140px]">
                            <label className="text-gray-900 font-medium">Branch Name</label>
                            <input
                                type="text"
                                placeholder="Branch Name"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Loan Date */}
                        <div className="flex flex-col gap-1 w-[140px]">
                            <label className="text-gray-900 font-medium">Loan Date</label>
                            <input
                                type="date"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Loan Amount */}
                        <div className="flex flex-col gap-1 w-[120px]">
                            <label className="text-gray-900 font-medium">Loan Amount</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Loan Amount"
                                    className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                                <button className="bg-[#0A2478] text-white px-1 py-2 rounded-r-md hover:bg-[#081c5b]">
                                    18%
                                </button>
                            </div>
                        </div>

                        {/* Under the Scheme */}
                        <div className="flex flex-col gap-1 w-[120px]">
                            <label className="text-gray-900 font-medium">Under the Scheme</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Tenure */}
                        <div className="flex flex-col gap-1 w-[110px]">
                            <label className="text-gray-900 font-medium">Tenure</label>
                            <input
                                type="text"
                                placeholder="Tenure"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* PreCloser Min Days */}
                        <div className="flex flex-col gap-1 w-[130px]">
                            <label className="text-gray-900 font-medium">PreCloser Min Days</label>
                            <input
                                type="text"
                                placeholder="PreCloser Min Days"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Precloser Charge */}
                        <div className="flex flex-col gap-1 w-[130px]">
                            <label className="text-gray-900 font-medium">Precloser Charge</label>
                            <input
                                type="text"
                                placeholder="Precloser Charge"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Pending Amount */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Pending Loan Amount</label>
                            <input
                                type="text"
                                placeholder="Pending Loan Amount"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        {/* Loan Amount Paid */}
                        <div className="flex flex-col gap-1 w-[120px]">
                            <label className="text-gray-900 font-medium">Loan Amount Paid</label>
                            <input
                                type="text"
                                placeholder="Loan Amount Paid"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        {/* Interest Paid */}
                        <div className="flex flex-col gap-1 w-[120px]">
                            <label className="text-gray-900 font-medium">Interest Paid</label>
                            <input
                                type="text"
                                placeholder="Interest Paid"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        {/* Interest Due */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Interest Due </label>
                            <input
                                type="text"
                                placeholder="Interest Due"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        {/* Period(Days)  */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Period(Days) </label>
                            <input
                                type="text"
                                placeholder="Period(Days) "
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Last Interest Paid Date */}
                        <div className="flex flex-col gap-1 w-[140px]">
                            <label className="text-gray-900 font-medium">Last Interest Paid Date</label>
                            <input
                                type="date"
                                placeholder="Last Interest Paid Date"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        {/* Last Interest Paid upto */}
                        <div className="flex flex-col gap-1 w-[140px]">
                            <label className="text-gray-900 font-medium">Last Interest Paid upto</label>
                            <input
                                type="date"
                                placeholder="Last Interest Paid upto"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Right Section (Profile Image) */}
                    <div className="flex items-start justify-center w-[150px]">
                        <img
                            src={profileempty}
                            alt="Profile"
                            className="w-[120px] h-[140px] border border-gray-300 rounded-md object-cover"
                        />
                    </div>
                </div>
            </div>



            {/* Table Section */}
            <div className="my-6 w-[1290px] bg-white">
                <h1 className="text-blue-900 font-semibold text-xl py-2">Pledge Item List</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-900 text-start text-white text-sm">
                                <th className="p-2 border text-start border-gray-300">Particulars</th>
                                <th className="p-2 border text-start border-gray-300">Nos</th>
                                <th className="p-2 border text-start border-gray-300">Gross</th>
                                <th className="p-2 border text-start border-gray-300">Net Weight</th>
                                <th className="p-2 border text-start w-[550px] border-gray-300">Remark</th>

                            </tr>
                        </thead>

                        <tbody>
                            {installments.length > 0 ? (
                                ItemList.map((row, index) => (
                                    <tr
                                        key={index}
                                        className="text-center text-sm hover:bg-gray-50 transition"
                                    >
                                        <td className="p-2 border border-gray-300">{row.srNo}</td>
                                        <td className="p-2 border border-gray-300">{row.receiptNo}</td>
                                        <td className="p-2 border border-gray-300">{row.paymentDate}</td>
                                        <td className="p-2 border border-gray-300">{row.paidUpto}</td>
                                        <td className="p-2 border border-gray-300">{row.mode1}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="text-center text-sm">
                                    <td
                                        colSpan="7"
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

            {/* Payment Section */}
            <div className="mt-4 w-[1290px] bg-white rounded-md">
                <h1 className="text-blue-900 font-semibold text-xl pb-2">Payment</h1>

                <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {/* Is Close */}
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2 w-[150px]">
                            <input type="checkbox" id="isClose" className="accent-[#0A2478] h-4 w-4" />
                            <label htmlFor="isClose" className="font-medium text-gray-900">Is Close</label>
                        </div>

                        {/* Pay Amount */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Pay Amount</label>
                            <input type="text" placeholder="Pay Amount"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Interest Adjusted */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Interest Adjusted</label>
                            <input type="text" placeholder="Interest Adjusted"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Loan Amt Adjusted */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Loan Amt Adjusted</label>
                            <input type="text" placeholder="Loan Amt Adjusted"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Balance Loan Amt */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Balance Loan Amt</label>
                            <input type="text" placeholder="Balance Loan Amt"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {/* Is Adv. Int */}
                        <div className="flex items-center gap-2 w-[160px]">
                            <input type="checkbox" id="isAdvInt" className="accent-[#0A2478] h-4 w-4" />
                            <label htmlFor="isAdvInt" className="font-medium text-gray-900">Is Adv. Int.</label>
                        </div>

                        {/* Notice Amt Adjusted */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Notice Amt Adjusted</label>
                            <input type="text" placeholder="Notice Amt Adjusted"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Oth. Charges Adjusted */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Oth. Charges Adjusted</label>
                            <input type="text" placeholder="Oth. Charges Adjusted"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Interest Paid For */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Interest Paid For</label>
                            <input type="text" placeholder="Interest Paid For"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Int Paid Upto */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Int Paid Upto</label>
                            <input type="date"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                    </div>

                    <div className="flex gap-2">
                        {/* Enhancement Modification */}
                        <div className="flex items-center gap-2 w-[150px]">
                            <input type="checkbox" id="enModif" className="accent-[#0A2478] h-4 w-4" />
                            <label htmlFor="enModif" className="font-medium text-gray-900">Enhancement <br /> Modification</label>
                        </div>

                        {/* Cash In Transit */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Cash In Transit</label>
                            <input type="text" placeholder="Cash In Transit"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Mode of Payment */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Mode of Payment</label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option value="">Select</option>
                                <option value="Cash">Cash</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>

                        {/* Cash A/C */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Cash A/C</label>
                            <input type="text" placeholder="Cash A/C"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Payment Ref. No */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Payment Ref. No</label>
                            <input type="text" placeholder="Payment Ref. No"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Payment Made By */}
                        <div className="flex flex-col gap-1 w-[150px]">
                            <label className="text-gray-900 font-medium">Payment Made By</label>
                            <input type="text" placeholder="Payment Made By"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"/>
                        </div>

                        {/* Amount Paid (In Words) */}
                        <div className="flex flex-col gap-1 w-[250px]">
                            <label className="text-gray-900 font-medium">Amount Paid (In Words)</label>
                            <input type="text" placeholder="Amount Paid (In Words)"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                        </div>

                    </div>
                </div>
            </div>



            {/* Table Section */}
            <div className="my-6 w-[1290px] bg-white">
                <h1 className="text-blue-900 font-semibold text-xl py-2">Installments</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-900 text-white text-sm">
                                <th className="p-2 border border-gray-300">Sr. No</th>
                                <th className="p-2 border border-gray-300">Receipt No</th>
                                <th className="p-2 border border-gray-300">Payment Date</th>
                                <th className="p-2 border border-gray-300">Paid Upto</th>
                                <th className="p-2 border border-gray-300">Mode of Payment</th>
                                <th className="p-2 border border-gray-300">Payment Ref. No</th>
                                <th className="p-2 border border-gray-300">Amount</th>
                                <th className="p-2 border border-gray-300">Interest</th>
                                <th className="p-2 border border-gray-300">Loan Amt. Adj</th>
                                <th className="p-2 border border-gray-300">Int Paid Days</th>
                                <th className="p-2 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {installments.length > 0 ? (
                                installments.map((row, index) => (
                                    <tr
                                        key={index}
                                        className="text-center text-sm hover:bg-gray-50 transition"
                                    >
                                        <td className="p-2 border border-gray-300">{row.srNo}</td>
                                        <td className="p-2 border border-gray-300">{row.receiptNo}</td>
                                        <td className="p-2 border border-gray-300">{row.paymentDate}</td>
                                        <td className="p-2 border border-gray-300">{row.paidUpto}</td>
                                        <td className="p-2 border border-gray-300">{row.mode}</td>
                                        <td className="p-2 border border-gray-300">{row.refNo}</td>
                                        <td className="p-2 border border-gray-300">{row.amount}</td>
                                        <td className="p-2 border border-gray-300">{row.interest}</td>
                                        <td className="p-2 border border-gray-300">{row.loanAdj}</td>
                                        <td className="p-2 border border-gray-300">{row.intDays}</td>
                                        <td className="p-2 border border-gray-300">
                                            <div className="flex gap-4 text-lg items-center justify-center">
                                                <IoMdDownload />
                                                <IoMdPrint />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="text-center text-sm">
                                    <td
                                        colSpan="10"
                                        className="p-3 border border-gray-300 text-gray-500"
                                    >
                                        No Installments Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div >

    )
}

export default AddLoanRepayment