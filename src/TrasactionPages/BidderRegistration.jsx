import { useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import profileempty from '../assets/profileempty.png';
const BidderRegistration = () => {
   
        const fileInputRef = useRef(null);

        const handleUploadClick = () => {
            fileInputRef.current.click(); // Open file picker
        };

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                alert(`File selected: ${file.name}`);
            }
        };
        return (
            <div className="flex flex-col items-center mt-5">
                {/* Header Section */}
                <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
                    <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
                        Bidder Registration
                    </h2>
 
                    <div className="flex items-center gap-5">
                        <button className="bg-[#0A2478] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
                            Submit
                        </button>
                        <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
                            Cancel
                        </button>
                    </div>
                </div>
                {/* Loan Information Section */}
                <div className=" max-w-[1290px] bg-white p-4">
                    <h1 className="text-blue-900 font-semibold text-xl pb-3">Bidder Information</h1>
 
                    <div className="flex flex-wrap justify-between grid-cols-4 gap-6 text-sm">
                        {/* Left Section (Form Fields) */}
                        <div className="flex flex-wrap gap-5 flex-1 text-sm w-full">
 
                            {/* Bidder Name */}
                            <div className="flex flex-col gap-1 w-[250px]">
                                <label className="text-gray-900 font-medium">Bidder Name</label>
                                <input
                                    type="text"
                                    placeholder="Bidder Name"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                         
 
                            {/* Mobile Number */}
                            <div className="flex flex-col gap-1  w-[250px]">
                                <label className="text-gray-900 font-medium">Mobile Number</label>
                                <input
                                    type="number"
                                    placeholder="Mobile Number"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/*Alternate Mobile Number */}
                            <div className="flex flex-col gap-1  w-[250px]">
                                <label className="text-gray-900 font-medium">Alternate Mobile Number</label>
                                <input
                                    type="number"
                                    placeholder="Alternate Mobile Number"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/* Email ID*/}
                            <div className="flex flex-col gap-1  w-[250px]">
                                <label className="text-gray-900 font-medium">Email ID</label>
                                <input
                                    type="email"
                                    placeholder="Email ID"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/*Personal Address*/}
                            <div className="flex flex-col gap-1 w-[250px]">
                                <label className="text-gray-900 font-medium">Personal Address</label>
                                <input
                                    type="text"
                                    placeholder="Personal Address"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/* Shop Address */}
                            <div className="flex flex-col gap-1 w-[250px]">
                                <label className="text-gray-900 font-medium">Shop Address</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Shop Address"
                                        className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                 
                                </div>
                            </div>
 
                            {/* Landline No 1 */}
                            <div className="flex flex-col gap-1 w-[250px]">
                                <label className="text-gray-900 font-medium">Landline No 1</label>
                                <input
                                    type="number"
                                    placeholder='203-53363'
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                     
                            {/* Landline No 2 */}
                            <div className="flex flex-col gap-1 w-[250px]">
                                <label className="text-gray-900 font-medium">Landline No 2</label>
                                <input
                                    type="number"
                                    placeholder='203-53363'
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/* Firm Name */}
                            <div className="flex flex-col gap-1 w-[280px]">
                                <label className="text-gray-900 font-medium">Firm Name</label>
                                <input
                                    type="text"
                                    placeholder="Firm Name"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/* GST No */}
                            <div className="flex flex-col gap-1 w-[320px]">
                                <label className="text-gray-900 font-medium">GST No</label>
                                <input
                                    type="number"
                                    placeholder="GST No"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                     
                     
                            {/* Aadhar No */}
                            <div className="flex flex-col gap-1 w-[250px]">
                                <label className="text-gray-900 font-medium"> Aadhar No</label>
                                <input
                                    type="number"
                                    placeholder=" Aadhar No"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="document" className="text-sm font-medium text-gray-700">
                                    Upload Document
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                   accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={handleUploadClick}
                                    className="bg-blue-950  text-white font-semibold py-2 px-4 rounded-md w-fit flex items-center gap-2"
                                    
                                >
                                    Upload Document
                                    <MdOutlineFileUpload className="text-xl" />
                                </button>
                            </div>
 
                            {/* Pan No */}
                            <div className="flex flex-col gap-1 w-[170px]">
                                <label className="text-gray-900 font-medium">Pan No</label>
                                <input
                                    type="number"
                                    placeholder="Pan No"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="document" className="text-sm font-medium text-gray-700">
                                    Upload Document
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                    className="hidden"
                                    
                                />
                                <button
                                    type="button"
                                    onClick={handleUploadClick}
                                    className="bg-blue-950  text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 w-fit"
                                >
                                     Upload Document
        <MdOutlineFileUpload className="text-xl" />
                                </button>
                            </div>
                         
                            <div className=" absolute top-50 right-30"> {/* Make parent relative */}
                                {/* ... your Bidder Information form fields ... */}

                                {/* <div className="absolute top-2 right-4"> */}
                                <h1 className='font-semibold'>Upload Bidder Profile</h1>
                                <img
                                    src={profileempty}
                                    alt="profile"
                                    className="h-[120px] w-[120px]  border border-gray-300 object-cover "
                             
        
                         
                             
                                />
                         
                            </div>
                        </div>
                        {/* </div> */}
                     
                    </div>
                </div>
 
 
 
             
            
 
             
                <div className="mt-4 w-[1290px] bg-white rounded-md">
                    <h1 className="text-blue-900 font-semibold text-xl pb-2">Add Bank Details</h1>
                    <div className="flex flex-wrap justify-between gap-4">
                        {/* Left Section (Form Fields) */}
                        <div className="flex flex-wrap gap-10 flex-1 text-sm">
 
                            {/* Account No */}
                            <div className="flex flex-col gap-1  w-[160px]">
                                <label className="text-gray-900 font-medium">Account Number</label>
                                <input
                                    type="number"
                                    placeholder=" 521753215"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                         
 
                            {/* IFSC Number */}
                            <div className="flex flex-col gap-1  w-[160px]">
                                <label className="text-gray-900 font-medium">IFSC Number</label>
                                <input
                                    type="number"
                                    placeholder="IFSC Number"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/*Alternate Mobile Number */}
                            <div className="flex flex-col gap-1  w-[160px]">
                                <label className="text-gray-900 font-medium">Alternate Mobile Number</label>
                                <input
                                    type="number"
                                    placeholder="Alternate Mobile Number"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/* Account Holder No*/}
                            <div className="flex flex-col gap-1  w-[160px]">
                                <label className="text-gray-900 font-medium">Account Holder No</label>
                                <input
                                    type="number"
                                    placeholder="46242266"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/*Bank Name*/}
                            <div className="flex flex-col gap-1 w-[160px]">
                                <label className="text-gray-900 font-medium">Bank Name</label>
                                <input
                                    type="text"
                                    placeholder="Bank Name"
                                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
 
                            {/* Bank Address */}
                            <div className="flex flex-col gap-1 w-[160px]">
                                <label className="text-gray-900 font-medium">Bank Address </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        placeholder="Bank Address "
                                        className="border border-gray-300 rounded-l-md px-3 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    />
                                 
                                </div>
                            </div>
 
                        
                     
 
                         
 
                         
                         
 
                        
                         
                         
                        </div>
                     
                    </div>
                
                </div>
 
 
 
            
 
            </div >
 
        )
    }


export default BidderRegistration 