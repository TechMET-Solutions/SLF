// import { useState } from 'react';
// import { IoMdImage } from "react-icons/io";
// import { MdDelete, MdOutlineFileUpload } from "react-icons/md";
// import profileempty from '../assets/profileempty.png';


// const EditBidderDetails = () => {
//     const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleDelete = () => {
//     setFile(null);
//   };
//  return (
//          <div className="flex flex-col items-center mt-5">
//              {/* Header Section */}
//              <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
//                  <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
//                       Edit Bidder Registration
//                  </h2>

//                  <div className="flex items-center gap-5">
//                      <button className="bg-[#0A2478] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
//                          Update
//                      </button>
//                      <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
//                          Cancel
//                      </button>
//                  </div>
//              </div>
//              {/* Loan Information Section */}
//              <div className=" max-w-[1290px] bg-white p-4">
//                  <h1 className="text-blue-900 font-semibold text-xl pb-3"> Edit Bidder Information</h1>

//                  <div className="flex flex-wrap justify-between grid-cols-4 gap-6 text-sm">
//                      {/* Left Section (Form Fields) */}
//                      <div className="flex flex-wrap gap-8 flex-1 text-sm w-full">

//                          {/* Bidder Name */}
//                          <div className="flex flex-col gap-1 w-[250px]">
//                              <label className="text-gray-900 font-medium">Bidder Name</label>
//                              <input
//                                  type="text"
//                                  placeholder="Bidder Name"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>



//                          {/* Mobile Number */}
//                          <div className="flex flex-col gap-1  w-[250px]">
//                              <label className="text-gray-900 font-medium">Mobile Number</label>
//                              <input
//                                  type="number"
//                                  placeholder="Mobile Number"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/*Alternate Mobile Number */}
//                          <div className="flex flex-col gap-1  w-[250px]">
//                              <label className="text-gray-900 font-medium">Alternate Mobile Number</label>
//                              <input
//                                  type="number"
//                                  placeholder="Alternate Mobile Number"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/* Email ID*/}
//                          <div className="flex flex-col gap-1  w-[250px]">
//                              <label className="text-gray-900 font-medium">Email ID</label>
//                              <input
//                                  type="email"
//                                  placeholder="Email ID"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/*Personal Address*/}
//                          <div className="flex flex-col gap-1 w-[300px]">
//                              <label className="text-gray-900 font-medium">Personal Address</label>
//                              <input
//                              type="text"
//                              placeholder="Personal Address"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/* Shop Address */}
//                          <div className="flex flex-col gap-1 w-[300px]">
//                              <label className="text-gray-900 font-medium">Shop Address</label>
//                              <div className="flex">
//                                  <input
//                                      type="text"
//                                      placeholder="Shop Address"
//                                      className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                  />

//                              </div>
//                          </div>

//                          {/* Landline No 1 */}
//                          <div className="flex flex-col gap-1 w-[200px]">
//                              <label className="text-gray-900 font-medium">Landline No 1</label>
//                              <input
//                              type="number"
//                              placeholder='203-53363'
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                      </div>

//                       {/* Landline No 2 */}
//                          <div className="flex flex-col gap-1 w-[200px]">
//                              <label className="text-gray-900 font-medium">Landline No 2</label>
//                              <input
//                              type="number"
//                              placeholder='203-53363'
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/* Firm Name */}
//                          <div className="flex flex-col gap-1 w-[170px]">
//                              <label className="text-gray-900 font-medium">Firm Name</label>
//                              <input
//                                  type="text"
//                                  placeholder="Firm Name"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/* GST No */}
//                          <div className="flex flex-col gap-1 w-[170px]">
//                              <label className="text-gray-900 font-medium">GST No</label>
//                              <input
//                                  type="number"
//                                  placeholder="GST No"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                      </div>


//                          {/* Aadhar No */}


//                       <div className="flex flex-col gap-1 w-[250px]">
//                              <label className="text-gray-900 font-medium">Adhar No</label>
//                              <input
//                                  type="number"
//                                  placeholder="Adhar no"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                      </div>
//                       <div className="flex flex-col space-y-2 w-full max-w-sm">
//                            <label htmlFor="pan" className="text-sm font-medium text-gray-700">
//                              <span className="text-red-500">*</span>
//                            </label>

//                            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
//                              <IoMdImage className="text-black mr-2" size={20} />
//                              <input
//                                type="file"
//                                id="pan"
//                                name="pan"
//                                accept=".png,.jpg,.jpeg,.pdf"
//                                onChange={handleFileChange}
//                                className="hidden"
//                              />
//                              <span className="flex-1 text-gray-700 text-sm">
//                                {file ? file.name : "Adhar.png "}
//                              </span>

//                              {file ? (
//                                <button type="button" onClick={handleDelete} className="ml-2 text-red-500">
//                                  <MdDelete size={20} />
//                                </button>
//                              ) : (
//                                <label htmlFor="pan" className="ml-2 cursor-pointer text-blue-700">
//                                  <MdOutlineFileUpload size={22} />
//                                </label>
//                              )}
//                            </div>
//                       </div>


//                          {/* Pan No */}

//                                               <div className="flex flex-col gap-1 w-[250px]">
//                                                       <label className="text-gray-900 font-medium">Pan No</label>
//                                                       <input
//                                                           type="number"
//                                                           placeholder="Pan no"
//                                                           className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                                       />
//                                                   </div>

//                                                  <div className="flex flex-col space-y-2 w-full max-w-sm">
//                                <label htmlFor="pan" className="text-sm font-medium text-gray-700">
//                                  <span className="text-red-500">*</span>
//                                </label>

//                                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
//                                  <IoMdImage className="text-black mr-2" size={20} />
//                                  <input
//                                    type="file"
//                                    id="pan"
//                                    name="pan"
//                                    accept=".png,.jpg,.jpeg,.pdf"
//                                    onChange={handleFileChange}
//                                    className="hidden"
//                                  />
//                                  <span className="flex-1 text-gray-700 text-sm">
//                                    {file ? file.name : "Pan.png "}
//                                  </span>

//                                  {file ? (
//                                    <button type="button" onClick={handleDelete} className="ml-2 text-red-500">
//                                      <MdDelete size={20} />
//                                    </button>
//                                  ) : (
//                                    <label htmlFor="pan" className="ml-2 cursor-pointer text-blue-700">
//                                      <MdOutlineFileUpload size={22} />
//                                    </label>
//                                  )}
//                                </div>
//                           </div>

//                          <div className=" absolute top-50 right-30"> {/* Make parent relative */}
//   {/* ... your Bidder Information form fields ... */}

//                          {/* <div className="absolute top-2 right-4"> */}
//                          <h1 className='font-semibold'>Upload Bidder Profile</h1>
//     <img
//       src={profileempty}
//       alt="profile"
//                              className="h-[120px] w-[120px]  border border-gray-300 object-cover "




//                          />

// </div>
// </div>
//                         {/* </div> */}

//                  </div>
//              </div>







//              <div className="mt-4 w-[1290px] bg-white rounded-md">
//                  <h1 className="text-blue-900 font-semibold text-xl pb-2">Add Bank Details</h1>
//                  <div className="flex flex-wrap justify-between gap-4">
//                      {/* Left Section (Form Fields) */}
//                      <div className="flex flex-wrap gap-10 flex-1 text-sm">

//                          {/* Account No */}
//                          <div className="flex flex-col gap-1  w-[160px]">
//                              <label className="text-gray-900 font-medium">Account Number</label>
//                              <input
//                                  type="number"
//                                  placeholder=" 521753215"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>



//                          {/* IFSC Number */}
//                          <div className="flex flex-col gap-1  w-[160px]">
//                              <label className="text-gray-900 font-medium">IFSC Number</label>
//                              <input
//                                  type="number"
//                                  placeholder="IFSC Number"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/*Alternate Mobile Number */}
//                          <div className="flex flex-col gap-1  w-[160px]">
//                              <label className="text-gray-900 font-medium">Alternate Mobile Number</label>
//                              <input
//                                  type="number"
//                                  placeholder="Alternate Mobile Number"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/* Account Holder No*/}
//                          <div className="flex flex-col gap-1  w-[160px]">
//                              <label className="text-gray-900 font-medium">Account Holder No</label>
//                              <input
//                                  type="number"
//                                  placeholder="46242266"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/*Bank Name*/}
//                          <div className="flex flex-col gap-1 w-[160px]">
//                              <label className="text-gray-900 font-medium">Bank Name</label>
//                              <input
//                              type="text"
//                              placeholder="Bank Name"
//                                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                              />
//                          </div>

//                          {/* Bank Address */}
//                          <div className="flex flex-col gap-1 w-[160px]">
//                              <label className="text-gray-900 font-medium">Bank Address </label>
//                              <div className="flex">
//                                  <input
//                                      type="text"
//                                      placeholder="Bank Address "
//                                      className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
//                                  />

//                              </div>
//                          </div>












//                         </div>

//                  </div>

//              </div>





//          </div >

//      )
// }

// export default EditBidderDetails


import { useState } from 'react';
import { IoMdImage } from "react-icons/io";
import { MdDelete, MdOutlineFileUpload } from "react-icons/md";
import profileempty from '../assets/profileempty.png';

const EditBidderDetails = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDelete = () => {
        setFile(null);
    };

    return (
        <div className="flex flex-col items-center mt-5 px-4">
            {/* Header Section */}
            <div className="w-full max-w-[1290px] bg-white border border-gray-200 rounded-[11px] shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4">
                    <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3'] mb-4 sm:mb-0">
                        Edit Bidder Registration
                    </h2>
                    <div className="flex items-center gap-3">
                        <button className="bg-[#0A2478] text-white text-[12px] w-[80px] h-[32px] rounded-[3.75px] hover:bg-blue-700 transition">
                            Update
                        </button>
                        <button className="bg-[#C1121F] text-white text-[12px] w-[80px] h-[32px] rounded-[3.75px] hover:bg-red-700 transition">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="w-full max-w-[1290px] space-y-6">
                {/* Bidder Information Section */}
                <div className="bg-white">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Left Section - Form Fields */}
                        <div className="flex-1">
                            {/* Flex container with wrap */}
                            <div className="flex flex-wrap -mx-3">
                                {/* Bidder Name */}
                                <div className="px-3 mb-2  w-[280px]">
                                    <label className="text-gray-900 font-medium">Bidder Name <span className='text-red-600'>*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Bidder Name"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div className="px-3 mb-6 w-[220px]">
                                    <label className="text-gray-900 font-medium">Mobile Number <span className='text-red-600'>*</span></label>
                                    <input
                                        type="tel"
                                        placeholder="Mobile Number"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Alternate Mobile Number */}
                                <div className="px-3 mb-6 w-[220px]">
                                    <label className="text-gray-900 font-medium">Alternate Mobile Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Alternate Mobile Number"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Email ID */}
                                <div className="px-3 mb-6 w-[280px]">
                                    <label className="text-gray-900 font-medium">Email ID <span className='text-red-600'>*</span></label>
                                    <input
                                        type="email"
                                        placeholder="Email ID"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Personal Address */}
                                <div className="px-3 mb-6 w-[340px]">
                                    <label className="text-gray-900 font-medium">Personal Address <span className='text-red-600'>*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Personal Address"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Shop Address */}
                                <div className="px-3 mb-6 w-[340px]">
                                    <label className="text-gray-900 font-medium">Shop Address <span className='text-red-600'>*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Shop Address"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Landline No 1 */}
                                <div className="px-3 mb-6 w-[180px]">
                                    <label className="text-gray-900 font-medium">Landline No 1 <span className='text-red-600'>*</span></label>
                                    <input
                                        type="tel"
                                        placeholder="203-53363"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Landline No 2 */}
                                <div className="px-3 mb-6 w-[180px]">
                                    <label className="text-gray-900 font-medium">Landline No 2</label>
                                    <input
                                        type="tel"
                                        placeholder="203-53363"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Firm Name */}
                                <div className="px-3 mb-6 w-[280px]">
                                    <label className="text-gray-900 font-medium">Firm Name <span className='text-red-600'>*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Firm Name"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* GST No */}
                                <div className="px-3 mb-6 w-[280px]">
                                    <label className="text-gray-900 font-medium">GST No <span className='text-red-600'>*</span></label>
                                    <input
                                        type="text"
                                        placeholder="GST No"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Aadhar No */}
                                <div className="px-3 mb-6 w-[220px]">
                                    <label className="text-gray-900 font-medium">Aadhar No <span className='text-red-600'>*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Aadhar no"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Aadhar Document */}
                                <div className="px-3 mb-6 w-[280px]">
                                    <label className="text-gray-900 font-medium">Aadhar Document</label>
                                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5">
                                        <IoMdImage className="text-gray-600 mr-2" size={20} />
                                        <input
                                            type="file"
                                            accept=".png,.jpg,.jpeg,.pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="aadhar-file"
                                        />
                                        <span className="flex-1 text-gray-700 text-sm">
                                            {file ? file.name : "Aadhar.png"}
                                        </span>
                                        {file ? (
                                            <button type="button" onClick={handleDelete} className="ml-2 text-red-500 hover:text-red-700">
                                                <MdDelete size={20} />
                                            </button>
                                        ) : (
                                            <label htmlFor="aadhar-file" className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800">
                                                <MdOutlineFileUpload size={22} />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* Pan No */}
                                <div className="px-3 mb-6 w-[220px]">
                                    <label className="text-gray-900 font-medium">Pan No <span className='text-red-600'>*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Pan no"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 w-full"
                                    />
                                </div>

                                {/* Pan Document */}
                                <div className="px-3 mb-6 w-[280px]">
                                    <label className="text-gray-900 font-medium">Pan Document</label>
                                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5">
                                        <IoMdImage className="text-gray-600 mr-2" size={20} />
                                        <input
                                            type="file"
                                            accept=".png,.jpg,.jpeg,.pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="pan-file"
                                        />
                                        <span className="flex-1 text-gray-700 text-sm">
                                            {file ? file.name : "Pan.png"}
                                        </span>
                                        {file ? (
                                            <button type="button" onClick={handleDelete} className="ml-2 text-red-500 hover:text-red-700">
                                                <MdDelete size={20} />
                                            </button>
                                        ) : (
                                            <label htmlFor="pan-file" className="ml-2 cursor-pointer text-blue-600 hover:text-blue-800">
                                                <MdOutlineFileUpload size={22} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Right Section - Profile Picture */}
                        <div className="lg:w-48 flex flex-col items-center lg:items-start gap-4">
                            <h3 className="font-semibold text-gray-900 text-center lg:text-left">
                                Upload Bidder Profile
                            </h3>
                            <div className="relative">
                                <img
                                    src={profileempty}
                                    alt="profile"
                                    className="h-32 w-32 border-2 border-gray-300 object-cover rounded-lg"
                                />

                            </div>

                        </div>
                    </div>
                </div>

                {/* Bank Details Section */}
                <div className="bg-white">
                    <h1 className="text-blue-900 font-semibold text-xl pb-4 mb-2 border-gray-200">
                        Add Bank Details
                    </h1>
                    <div className="flex flex-wrap -mx-3">
                        {/* Account Number */}
                        <div className="flex flex-col gap-2 px-3 mb-6 w-[240px]">
                            <label className="text-gray-900 font-medium">Account Number <span className='text-red-600'>*</span></label>
                            <input
                                type="text"
                                placeholder="521753215"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            />
                        </div>

                        {/* IFSC Number */}
                        <div className="flex flex-col gap-2 px-3 mb-6 w-[200px]">
                            <label className="text-gray-900 font-medium">IFSC Number <span className='text-red-600'>*</span></label>
                            <input
                                type="text"
                                placeholder="IFSC Number"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            />
                        </div>

                        {/* Account Holder Name */}
                        <div className="flex flex-col gap-2 px-3 mb-6 w-[280px]">
                            <label className="text-gray-900 font-medium">Account Holder Name <span className='text-red-600'>*</span></label>
                            <input
                                type="text"
                                placeholder="Account Holder Name"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            />
                        </div>

                        {/* Bank Name */}
                        <div className="flex flex-col gap-2 px-3 mb-6 w-[250px]">
                            <label className="text-gray-900 font-medium">Bank Name <span className='text-red-600'>*</span></label>
                            <input
                                type="text"
                                placeholder="Bank Name"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            />
                        </div>

                        {/* Bank Address (full width on large screens) */}
                        <div className="flex flex-col gap-2 px-3 mb-6 w-[320px]">
                            <label className="text-gray-900 font-medium">Bank Address <span className='text-red-600'>*</span></label>
                            <input
                                type="text"
                                placeholder="Bank Address"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EditBidderDetails;