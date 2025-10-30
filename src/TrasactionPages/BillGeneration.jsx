import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaLessThan } from "react-icons/fa";

const BillGenerationPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex justify-center">
        <div className="flex items-center justify-between border border-gray-300 rounded-[10px] px-4 py-2 mt-4 w-[1290px] h-[62px] shadow-lg">
          {/* Title */}
          <div className="flex items-center gap-4">
            <FaLessThan className=" text-[15px] whitespace-nowrap " />
            <h2 className="text-[#C1121F] font-bold text-[20px] whitespace-nowrap mr-4">
              Generate Bill
            </h2>
          </div>

          <div className="flex gap-2">
            <button className="bg-[#0A2478] text-white px-4 py-1 text-sm rounded hover:bg-[#091d5f] shadow-lg">
              Submit
            </button>
            <button
              //   onClick={() => navigate("/")}
              className="bg-[#C1121F] text-white px-4 py-1 text-sm rounded hover:bg-[#a50d18] shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-white shadow-md py-5 ">
        {/* Credit Note Details */}
        <section className="bg-[#ECECF6] p-4  px-18 border-gray-300">
          <h3 className="font-semibold font-weight-600 text-[20px] text-[#0A2478] mb-3">
            Invoice Details :
          </h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="font-semibold text-xs mb-1">
                Invoice No<span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">Date of Invoice</div>
              <input
                type="date"
                className="w-[250px]  font-weight-600 bg-white px-2 py-1 rounded-[8px] border border-gray-300"
              />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Auction Reference No<span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                Auction Date<span className="text-red-600">*</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="w-[250px] border border-gray-300 px-2 bg-white py-1 rounded-[8px]"
                />
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Payment Mode<span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Payment Reference No<span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Payment Date<span className="text-red-600">*</span>
              </div>
              <input
                type="date"
                className="w-[250px] border border-gray-300 bg-white px-2 py-1 rounded-[8px]"
              />
            </div>
          </div>
        </section>

        {/* Customer Details */}
        <section className="bg-[#FFE6E6] p-4  px-18 border-gray-300">
          <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
            Buyer's Details
          </h3>
          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <div className="text-xs font-semibold mb-1">
                {" "}
                Name <span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Contact No.<span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Email ID<span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Adress<span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Aadhar / PAN<span className="text-red-600">*</span>
              </div>
              <input className="w-[250px] border bg-white border-gray-300 px-2 py-1 rounded-[8px]" />
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">
                Upload 
              </div>
              <div className="flex items-center bg-white w-[250px] rounded-[8px] overflow-hidden border border-gray-300">
                <label
                  htmlFor="file-upload"
                  className="flex items-center bg-gray-300 text-gray-700 px-3 py-[6px] rounded-r-[8px] cursor-pointer w-[110px] justify-center"
                >
                  <MdOutlineFileUpload className="text-black mr-1 text-sm" />
                  <span className="text-sm">Choose File</span>
                </label>
                <input id="file-upload" type="file" className="hidden bg-white" />
                <span className="bg-white text-gray-600 text-sm px-2 py-[6px] flex-1">
                  No File Chosen
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="p-6 bg-white text-gray-800 ">
        {/* Header */}
        <h2 className="text-lg font-bold text-[#0A2478] mb-4 px-18">
          Gold Purchase Details
        </h2>

        {/* Table */}
        <section className="px-18">
          <table className="w-full border-collapse border border-gray-300 text-sm mb-6">
          <thead className="bg-[#0A2478] text-white">
            <tr>
              <th className="border border-gray-300 px-3  text-left w-[5%]">
                Sr. No.
              </th>
              <th className="border border-gray-300 px-3  text-left">
                Product Desc
              </th>
              <th className="border border-gray-300 px-3  text-left">
                Gross Weight
              </th>
              <th className="border border-gray-300 px-3  text-left">
                Net Weight
              </th>
              <th className="border border-gray-300 px-3 text-left">
                Purity
              </th>
              <th className="border border-gray-300 px-3 text-left">
                Rate/gram
              </th>
              <th className="border border-gray-300 px-3 text-left">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 text-center">
                1
              </td>
              <td className="border border-gray-300 px-3 py-2">
                Gold Bangles (Pair)
              </td>
              <td className="border border-gray-300 px-3 py-2 text-left">
                81.50
              </td>
              <td className="border border-gray-300 px-3 py-2 text-left">
                79.00
              </td>
              <td className="border border-gray-300 px-3 py-2 text-left">
                22k
              </td>
              <td className="border border-gray-300 px-3 py-2 text-left">
                5,000
              </td>
              <td className="border border-gray-300 px-3 py-2 text-left">
                ₹5,92,500.00
              </td>
            </tr>
          </tbody>
        </table>
        </section>
        

        {/* Right Side Summary */}
        <div className="flex justify-end px-18">
          <div className="border border-gray-300 w-[320px] p-3 text-sm">
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Subtotal</span>
              <span>₹5,92,500.00</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Auction Fee</span>
              <span>₹500.00</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                CGST&nbsp;&nbsp;
                <span className="font-normal text-gray-600">1.5%</span>
              </span>
              <span>₹8895.00</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                SGST&nbsp;&nbsp;
                <span className="font-normal text-gray-600">1.5%</span>
              </span>
              <span>₹8895.00</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">
                IGST&nbsp;&nbsp;
                <span className="font-normal text-gray-600">3%</span>
              </span>
              <span>–</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Debit Note Amount</span>
              <span>–</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Credit Note Amount</span>
              <span className="text-red-600">-₹3,000.00</span>
            </div>
            <div className="flex justify-between font-semibold text-blue-800 mt-2">
              <span className="font-semibold">Total Payable Amount</span>
              <span>₹5,90,000.00</span>
            </div>
          </div>
        </div>

        {/* Amount in Words */}
        <p className="text-sm mt-6 px-18 mb-20">
          <strong>Amount in Words:</strong> Five Lakh Ninety Thousand Only…
        </p>
      </div>
    </div>
  );
};

export default BillGenerationPage;
