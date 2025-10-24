import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import profileempty from "../assets/profileempty.png";
const AddGoldLoanApplication = () => {

  useEffect(() => {
    document.title = "SLF | Add Gold Loan Application ";
  }, []);

  const [rows, setRows] = useState([
    {
      id: 1,
      particular: "gold",
      nos: 1,
      gross: "5.000",
      netWeight: "5.000",
      purity: "20k",
      rate: "6,300",
      valuation: "31,500.00",
      remark: "Ganthan",
    },
  ]);

  // ➕ Add new row
  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      particular: "gold",
      nos: 1,
      gross: "",
      netWeight: "",
      purity: "20k",
      rate: "",
      valuation: "",
      remark: "",
    };
    setRows([...rows, newRow]);
  };

  // ❌ Delete specific row
  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };
  return (
    <div className="min-h-screen w-full">
      {/* ===== Top Bar ===== */}
      <div className="flex justify-center">
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
            Add Gold Loan Application
          </h2>

          <button className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] text-[10px]">
            Close
          </button>
        </div>
      </div>

      {/* ===== FORM SECTIONS ===== */}
      <div className="flex justify-center gap-5 mt-10">
        <div >
          <div className="flex    gap-5">

            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">Party Name *</label>
                </div>

                <input
                  type="text"
                  placeholder="Country"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[225px] rounded-[8px] bg-white h-[38px]"
                />
              </div>
            </div>



            <div className="">
              <div>
                <label className="text-[14px] font-medium">Scheme*</label>
              </div>

              <select className="border border-gray-300  px-3 py-2 mt-1 w-[115px] bg-white rounded-[8px]">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>


            <div className="">
              <div>
                <label className="text-[14px] font-medium">Print Name  *</label>
              </div>

              <input
                type="text"
                placeholder="MAHESH SANJAY DONDE"
                className="border border-gray-300 px-3 py-2 mt-1 w-[225px] rounded-[8px] bg-white h-[38px]"
              />
            </div>

            <div className="">
              <div>
                <label className="text-[14px] font-medium">Mobile Number*</label>
              </div>

              <input
                type="text"
                placeholder="Mobile Number"
                className="border border-gray-300 px-3 py-2 mt-1 w-[136px] rounded-[8px] bg-white h-[38px]"
              />
            </div>
            <div className="">
              <div>
                <label className="text-[14px] font-medium">Alternate Number</label>
              </div>

              <input
                type="text"
                placeholder="Alternate Number"
                className="border border-gray-300 px-3 py-2 mt-1 w-[136px] rounded-[8px] bg-white h-[38px]"
              />
            </div>


            <div>

            </div>
          </div>
          <div className="flex   mt-5 gap-5">
            <textarea className="border w-[299px] h-[62px] rounded-[8px]" />

            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">Co-Borrower</label>
                </div>

                <input
                  type="text"
                  placeholder="Co-Borrower"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[209px] rounded-[8px] bg-white h-[38px]"
                />
              </div>
            </div>

            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">Relation</label>
                </div>

                <input
                  type="text"
                  placeholder="Co-Borrower"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[95px] rounded-[8px] bg-white h-[38px]"
                />
              </div>
            </div>

            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">Nominee*</label>
                </div>

                <input
                  type="text"
                  placeholder="Nominee"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[209px] rounded-[8px] bg-white h-[38px]"
                />
              </div>
            </div>

            <div>
              <div className="">
                <div>
                  <label className="text-[14px] font-medium">Relation*</label>
                </div>

                <input
                  type="text"
                  placeholder="Relation"
                  className="border border-gray-300 px-3 py-2 mt-1 w-[113px] rounded-[8px] bg-white h-[38px]"
                />
              </div>
            </div>
          </div>
        </div>


        {/* <div className="flex justify-center gap-2"> */}
        <div className="relative w-[139px] h-[130px] mt-[20px]">
          {/* Profile Image */}
          <img
            src={profileempty}
            alt="profile"
            className="w-full h-full rounded-[8px] object-cover border border-gray-300"
          />

          {/* Edit Icon */}
          <button
            className="absolute top-2 right-2 text-black transition"
          >
            <FaEdit className="text-black w-4 h-4" />
          </button>
        </div>
        <div className="">
          <p>Ornament Photo</p>
          <img src={profileempty} alt="logout" className="w-[139px] h-[130px]" />
          <div className="flex items-center border border-gray-300 rounded mt-2 w-[140px] ">
            <label
              htmlFor="uploadFile"
              className="bg-[#D9D9D9] p-1 cursor-pointer text-[10px] rounded-l border-r border w-[120px] text-black font-bold h-[21px]"
            >
              Choose File
            </label>
            <input
              id="uploadFile"
              type="file"
              className="hidden"
            //   onChange={(e) =>
            //     setFileName(e.target.files[0] ? e.target.files[0].name : "No file chosen")
            //   }
            />
            <span className="px-3 py-2 text-sm text-gray-500 w-full truncate">
              {/* {fileName || "No file chosen"} */}
            </span>
          </div>
          {/* </div> */}

        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-[1320px]">
          <h3 className="font-semibold mb-4 text-blue-900 text-lg">Pledge Item List</h3>

          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-[#0A2478] text-white">
              <tr>
                <th className="px-4 py-2 border-r border-gray-200">Particulars</th>
                <th className="px-4 py-2 border-r border-gray-200">Nos.</th>
                <th className="px-4 py-2 border-r border-gray-200">Gross</th>
                <th className="px-4 py-2 border-r border-gray-200">Net Weight</th>
                <th className="px-4 py-2 border-r border-gray-200">Purity</th>
                <th className="px-4 py-2 border-r border-gray-200">Rate</th>
                <th className="px-4 py-2 border-r border-gray-200">Valuation</th>
                <th className="px-4 py-2">Remark</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {rows.map((row, index) => (
                <tr key={row.id} className="border-t border-gray-200">
                  <td>
                    <select
                      value={row.particular}
                      className="rounded-md px-2 py-1 focus:outline-none"
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[index].particular = e.target.value;
                        setRows(newRows);
                      }}
                    >
                      <option value="gold">Gold</option>
                      <option value="silver">Silver</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  </td>

                  <td className="px-4 py-2">{row.nos}</td>
                  <td className="px-4 py-2">{row.gross}</td>
                  <td className="px-4 py-2">{row.netWeight}</td>

                  <td>
                    <select
                      value={row.purity}
                      className="rounded-md px-2 py-1 focus:outline-none"
                      onChange={(e) => {
                        const newRows = [...rows];
                        newRows[index].purity = e.target.value;
                        setRows(newRows);
                      }}
                    >
                      <option value="20k">Gold 20K</option>
                      <option value="22k">Gold 22K</option>
                      <option value="24k">Gold 24K</option>
                    </select>
                  </td>

                  <td className="px-4 py-2">{row.rate}</td>
                  <td className="px-4 py-2">{row.valuation}</td>

                  <td className="px-4 py-2 flex justify-between items-center">
                    <p>{row.remark}</p>
                    <div className="flex gap-2">
                      {/* ➕ Add Button */}
                      <button
                        onClick={handleAddRow}
                        className="w-[24px] h-[24px] bg-[#0A2478] p-1 rounded-[3.22px]"
                      >
                        <IoMdAddCircleOutline className="text-white w-[18px] h-[18px]" />
                      </button>

                      {/* ❌ Delete Button */}
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="w-[24px] h-[24px] bg-[#F11717] p-1 rounded-[3.22px]"
                      >
                        <MdOutlineCancel className="text-white w-[18px] h-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="border-t border-gray-200 font-semibold">
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2">{rows.length}</td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"></td>
                <td className="px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>







      <div className="flex gap-2 justify-center">

        <div className="">
          <div>
            <label className="text-[14px] font-medium">Loan amount *</label>
          </div>

          <input
            type="text"
            placeholder="Loan amount "
            className="border border-gray-300 px-3 py-2  w-[129px] rounded-[8px] bg-white h-[38px]"
          />

        </div>



        <div className="flex flex-col">
          <label className="text-[14px] font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>

          <div className="flex w-[129px]">
            {/* Percentage Button first */}
            <button
              className="bg-[#0A2478] text-white px-4 py-2 text-sm font-medium rounded-l-md border border-[#0A2478] hover:bg-[#081c5b] transition-all duration-200"
            >
              12%
            </button>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter rate"
              className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A2478] w-[50px]"
            />
          </div>

        </div>

        <div className="">
          <div>
            <label className="text-[14px] font-medium">Doc Charges(%)</label>
          </div>

          <input
            type="text"
            placeholder="Doc Charges(%)"
            className="border border-gray-300 px-3 py-2  w-[107px] rounded-[8px] bg-white h-[38px]"
          />
        </div>


        <div className="">
          <div>
            <label className="text-[14px] font-medium">Tax</label>
          </div>

          <input
            type="text"
            placeholder="Tax"
            className="border border-gray-300 px-3 py-2  w-[129px] rounded-[8px] bg-white h-[38px]"
          />
        </div>
        <div className="">
          <div>
            <label className="text-[14px] font-medium">Net Payable </label>
          </div>

          <input
            type="text"
            placeholder="Net Payable "
            className="border border-gray-300 px-3 py-2  w-[129px] rounded-[8px] bg-white h-[38px]"
          />
        </div>

        <div className="">
          <div>
            <label className="text-[14px] font-medium">Net Payable </label>
          </div>

          <input
            type="text"
            placeholder="Net Payable "
            className="border border-gray-300 px-3 py-2  w-[129px] rounded-[8px] bg-white h-[38px]"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[14px] font-medium">Valuer 1* </label>
          <select className="border border-gray-300 rounded-[8px] px-3 py-2  w-[256px] bg-white">
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[14px] font-medium">Valuer 2* </label>
          <select className="border border-gray-300 rounded-[8px] px-3 py-2  w-[256px] bg-white">
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>


      </div>
      <div>
        <p className="pl-[180px] mt-5">Thirty One Thousand Five Hundred only</p>
      </div>





      <div className="flex justify-between pl-[180px] pr-[180px]">
        <div className="flex justify-center  mt-5">
          <div className="">
            <h3 className="font-semibold  text-blue-900 text-lg">Scheme Details</h3>

            <table className="border border-gray-300 text-sm">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-200 w-[224px]">Loan Tenure (Days)</th>
                  <th className="px-4 py-2 border-r border-gray-200 w-[173px]">Min Loan</th>
                  <th className="px-4 py-2 border-r border-gray-200 w-[195px]">Max Loan</th>


                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border border-[#4A4A4A38]">
                  <td className="px-4 py-2 border border-[#4A4A4A38]">365</td>
                  <td className="px-4 py-2 border border-[#4A4A4A38]">1,000</td>
                  <td className="px-4 py-2 border border-[#4A4A4A38]">20,00,000</td>


                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center  mt-5">
          <div className="">
            <h3 className="font-semibold  text-blue-900 text-lg">Effective Interest Rates</h3>

            <table className="border border-gray-300 text-sm">
              <thead className="bg-[#0A2478] text-white">
                <tr>
                  <th className="px-4 py-2 border-r border-gray-200 w-[307px]">Terms</th>
                  <th className="px-4 py-2 border-r border-gray-200 w-[307px]">Effective Interest Rates</th>



                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border border-[#4A4A4A38] bg-[#FFCDCD]">
                  <td className="px-4 py-2 border border-[#4A4A4A38]">0 To 185 DAYS</td>
                  <td className="px-4 py-2 border border-[#4A4A4A38]">18.00%</td>



                </tr>
                <tr className="border border-[#4A4A4A38] bg-[#E5E5FF]">
                  <td className="px-4 py-2 border border-[#4A4A4A38]">185To 365 DAYS</td>
                  <td className="px-4 py-2 border border-[#4A4A4A38]">24.00%</td>



                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGoldLoanApplication
