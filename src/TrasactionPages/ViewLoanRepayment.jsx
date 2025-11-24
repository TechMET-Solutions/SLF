import { useEffect } from "react";
import profileempty from '../assets/profileempty.png';

function ViewLoanRepayment() {
    useEffect(() => {
    document.title = "SLF | View Loan Repayment ";
  }, []);
    // Dummy Installments (replace with props or API data later)
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

    return (
        <div className="flex flex-col items-center mt-5">
            {/* Header Section */}
            <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
                <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
                    View Loan Repayment
                </h2>

                <div className="flex items-center gap-5">
                    <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
                        Close
                    </button>
                </div>
            </div>

            {/* Loan information Section */}
            <div className="mt-4 w-[1290px] bg-white">
                <h1 className="text-blue-900 font-semibold text-xl py-2">Loan information</h1>
                <div className="overflow-x-auto">
                    <div className=" space-y-4 text-sm">
                        <div className="grid grid-cols-9 grid-rows-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Loan No</label>
                                <input
                                    type="text"
                                    placeholder="Loan No"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Branch Code</label>
                                <input
                                    type="text"
                                    placeholder="Branch Code"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Branch Name</label>
                                <input
                                    type="text"
                                    placeholder="Branch Name"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-span-2 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Customer Name</label>
                                <input
                                    type="text"
                                    placeholder="Customer Name"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-start-6 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Mobile Number</label>
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-start-7 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Loan Date</label>
                                <input
                                    type="date"
                                    placeholder="Loan Date"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-start-8 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Loan Start Date</label>
                                <input
                                    type="date"
                                    placeholder="Loan Start Date"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-start-9 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Loan Amount</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Loan Amount"
                                        className="border border-[#C4C4C4] bg-white rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <button className="bg-[#0A2478] text-white px-0.5 py-2 rounded-r-md hover:bg-[#081c5b]">
                                        18%
                                    </button>
                                </div>
                            </div>
                            <div className="row-start-2 col-start-5 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Under the Scheme</label>
                                <input
                                    type="text"
                                    placeholder="Under the Scheme"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="row-start-2 col-start-1 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Tenure</label>
                                <input
                                    type="text"
                                    placeholder="Tenure"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="row-start-2 col-start-2 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">PreCloser Min Days</label>
                                <input
                                    type="text"
                                    placeholder="PreCloser Min Days"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="row-start-2 col-start-3 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Precloser Charge</label>
                                <input
                                    type="text"
                                    placeholder="Precloser Charge"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="row-start-2 col-start-4 flex flex-col gap-1">
                                <label className="text-gray-900 font-medium">Pending Amount</label>
                                <input
                                    type="text"
                                    placeholder="Pending Loan Amount"
                                    className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="row-span-2 col-start-10 row-start-1 flex justify-center">
                                    <img src={profileempty} alt="profile" className="w-[120px] h-[140px]" />
                            </div>

                        </div>
                    </div>


                </div>

            </div>


            {/* Payment Section */}
            <div className="mt-4 w-[1290px] bg-white">
                <h1 className="text-blue-900 font-semibold text-xl py-2">Payment</h1>
                <div className="overflow-x-auto">

                    <div className="grid grid-cols-7 grid-rows-2 gap-4">
                        <div className="row-span-2 flex gap-2 items-center justify-center">
                            <input type="checkbox" name="isClose" id="isClose" />
                            <label htmlFor="isClose">is Close</label>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-900 font-medium">Pay Amount</label>
                            <input
                                type="text"
                                placeholder="Pay Amount"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-900 font-medium">Interest Adjusted</label>
                            <input
                                type="text"
                                placeholder="Interest Adjusted"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-900 font-medium">Loan Amt Adjusted</label>
                            <input
                                type="text"
                                placeholder="Loan Amt Adjusted"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-900 font-medium">Interest Paid For</label>
                            <input
                                type="text"
                                placeholder="Interest Paid For"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-start-2 flex flex-col gap-1">
                            <label className="text-gray-900 font-medium">Mode of Payment</label>
                            <input
                                type="text"
                                placeholder="Mode of Payment"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-start-3 flex flex-col gap-1">
                            <label className="text-gray-900 font-medium">Bank Name</label>
                            <input
                                type="text"
                                placeholder="Bank Name"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-start-4 flex flex-col gap-1">
                            <label className="text-gray-900 font-medium">Payment Ref. No</label>
                            <input
                                type="text"
                                placeholder="Payment Ref. No"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-start-5 flex flex-col gap-1">
                            <label className="text-gray-900 font-medium">Int Paid Upto</label>
                            <input
                                type="date"
                                placeholder="Int Paid Upto"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="row-start-3 flex gap-2 items-center justify-end">
                            <input type="checkbox" name="enModif" id="enModif" />
                            <label htmlFor="enModif">Enhancement Modification</label>
                        </div>
                        <div className="row-start-3 flex flex-col gap-1 ">
                            <label className="text-gray-900 font-medium">Cash In Transit</label>
                            <input
                                type="text"
                                placeholder="Cash In Transit"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="row-start-3 flex flex-col gap-1 ">
                            <label className="text-gray-900 font-medium">Payment Made By</label>
                            <input
                                type="text"
                                placeholder="Payment Made By"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-2  flex flex-col gap-1 row-start-3">
                            <label className="text-gray-900 font-medium">Amount Paid (In Words)</label>
                            <input
                                type="text"
                                placeholder="Amount Paid (In Words)"
                                className="border border-[#C4C4C4] bg-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
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
        </div>
    );
}

export default ViewLoanRepayment;
