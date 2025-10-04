import React from 'react'
import { CiSearch } from "react-icons/ci";
const LoanApplication = () => {
  return (
    <div>
  <div className="flex justify-center">
        <div className="flex  items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-around">
          <h2
            style={{
              fontFamily: "Source Sans 3, sans-serif",
              fontWeight: 700, // Bold
              fontSize: "20px",
              lineHeight: "148%",
              letterSpacing: "0em",
            }}
            className="text-red-600"
          >
         Loan Application
          </h2>

          <div className="flex gap-3">
                      <div className="flex gap-5 items-center">
                           <div>
                {/* <label className="text-[14px]">Lead Person</label> */}
                <select
                  name="lead_person"
                //   value={branchData.lead_person}
                //   onChange={handleChange}
                  className="border border-gray-300 rounded pl-2 w-[111px] h-[31px]"
                >
                  <option value="" >
                   Field
                  </option>
                  <option value="john">Loan No</option>
                  <option value="mary">Party Name</option>
                                  <option value="alex">Loan Date</option>
                                   <option value="alex">Added on</option>
                                  <option value="alex">Added By</option>
                                   
                </select>
              </div>
            
                          <div className='flex gap-2'>
                           <input
                type="text"
placeholder='Search'
                style={{
                  width: "134.64px",
                  height: "31.49px",
                  borderRadius: "5px",
                  borderWidth: "0.62px",
                }}
                className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
                          />
                          <button
                style={{
                  width: "30px",
                  height: "31px",
                  borderRadius: "5px",
                }}
                className="bg-[#0b2c69] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
               <CiSearch className='w-[14px] h-[14px] font-bold'/>
              </button>    
</div>
             
 <select
                  name="lead_person"
                //   value={branchData.lead_person}
                //   onChange={handleChange}
                  className="border border-gray-300 rounded pl-2 w-[111px] h-[31px]"
                >
                  <option value="" >
                   Scheme
                  </option>
                  <option value="john">John Doe</option>
                  <option value="mary">Mary Smith</option>
                  <option value="alex">Alex Johnson</option>
                </select>
            </div>

            <div className="flex gap-5 items-center">
              <p
                style={{
                  fontFamily: "Source Sans 3, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "11.25px",
                  lineHeight: "15px",
                  letterSpacing: "0em",
                }}
              >
                Name
              </p>

              <input
                type="text"

                style={{
                  width: "168.64px",
                  height: "27.49px",
                  borderRadius: "5px",
                  borderWidth: "0.62px",
                }}
                className="border border-gray-400 px-3 py-1 text-[11.25px] font-source"
              />
              

            </div>
            <div className="flex justify-center item-center gap-5">
              <button
                style={{
                  width: "74px",
                  height: "24px",
                  borderRadius: "3.75px",

                  gap: "6.25px",
                }}
                // onClick={() => setIsModalOpen(true)}
                className="bg-[#0A2478] text-white text-[11.25px] font-source font-normal flex items-center justify-center"
              >
                Add
              </button>

              <button
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
              >
                Exit
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanApplication

