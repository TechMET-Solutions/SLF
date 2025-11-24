
import { useLocation } from "react-router-dom";

export default function Cust_Form() {
     const location = useLocation();
  const row = location.state; // 👈 received row data

  console.log("Received Row Data:", row);
  return (
    <div className="w-full bg-white min-h-screen ">
      {/* Header */}
      {/* <div className="bg-[#0C3C87] text-white p-4 rounded-md mb-6">
        <h1 className="text-xl font-semibold">Customer Profile Form</h1>
      </div> */}
<div className="flex justify-center">
        <div className="flex  items-center px-6 py-4 border-b mt-5 w-[1290px] h-[62px] border rounded-[11px] border-gray-200 justify-between">
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
          Customer Profile Form
          </h2>

          <div className="flex gap-3 ">



            <div className="flex justify-between gap-5">
             

              <button
                className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
              >
                Exit
              </button>


            </div>

          </div>
        </div>
      </div>

      {/* Personal Information */}
      <section className="bg-[#FFE6E6] p-4 ">
       <h2 className="font-[600] text-[24px] leading-[100%] tracking-[3%] font-[SourceSans3] mb-4 text-[#0A2478]">
  Personal Information
</h2>

              <div className="flex  gap-4">
                  <div>
                       <div className="flex gap-5">
                      <div>
            <p className="text-xs text-gray-600">Customer Name</p>
            <p className="font-medium">John Doe</p>
          </div>
<div>
            <p className="text-xs text-gray-600">PAN No.</p>
            <p className="font-medium">john@example.com</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Aadhar Number</p>
            <p className="font-medium">9876543210</p>
          </div>
 <div>
            <p className="text-xs text-gray-600">Print Name</p>
            <p className="font-medium">9876543210</p>
          </div>
<div>
            <p className="text-xs text-gray-600">Email Id</p>
            <p className="font-medium">9876543210</p>
                          </div>
                          <div>
            <p className="text-xs text-gray-600">Mobile No.</p>
            <p className="font-medium">9876543210</p>
          </div>
           <div>
            <p className="text-xs text-gray-600">Alternate Mobile No</p>
            <p className="font-medium">9876543210</p>
                          </div>
                          <div>
            <p className="text-xs text-gray-600">Date of Birth</p>
            <p className="font-medium">9876543210</p>
          </div>
          

          {/* <div className="row-span-4 flex flex-col items-center">
            <img
              src="/profile.png"
              alt="Customer"
              className="w-24 h-24 rounded object-cover"
            />
            <p className="text-sm mt-2">Customer Profile</p>
          </div> */}
                      
                  </div>

                    <div className="flex gap-5 mt-2">
                      <div>
            <p className="text-xs text-gray-600">Gender</p>
            <p className="font-medium">John Doe</p>
          </div>

          <div>
            <p className="text-xs text-gray-600">Marital</p>
            <p className="font-medium">9876543210</p>
          </div>

          <div>
            <p className="text-xs text-gray-600">GST No.</p>
            <p className="font-medium">john@example.com</p>
          </div>

                            <div>
            <p className="text-xs text-gray-600">Religious Belief</p>
            <p className="font-medium">john@example.com</p>
                          </div>
                            <div>
            <p className="text-xs text-gray-600">Education</p>
            <p className="font-medium">john@example.com</p>
                          </div>
                           <div>
            <p className="text-xs text-gray-600">Occupation</p>
            <p className="font-medium">john@example.com</p>
                          </div>
                           <div>
            <p className="text-xs text-gray-600">Party Type</p>
            <p className="font-medium">john@example.com</p>
                          </div>
                           <div>
            <p className="text-xs text-gray-600">Risk Category</p>
            <p className="font-medium">john@example.com</p>
                          </div>
                           <div>
            <p className="text-xs text-gray-600">First Name</p>
            <p className="font-medium">john@example.com</p>
          </div>

          
                      
                      </div>
                      
                      <div className="flex gap-5 mt-2">
                      <div>
            <p className="text-xs text-gray-600">Middle Name</p>
            <p className="font-medium">John Doe</p>
          </div>

          <div>
            <p className="text-xs text-gray-600">Last Name</p>
            <p className="font-medium">9876543210</p>
          </div>

          <div>
            <p className="text-xs text-gray-600">GST No.</p>
            <p className="font-medium">john@example.com</p>
          </div>

                            <div>
            <p className="text-xs text-gray-600">Father/Husbands First Name</p>
            <p className="font-medium">john@example.com</p>
                          </div>
                            <div>
            <p className="text-xs text-gray-600">Father/Husbands Middle Name</p>
            <p className="font-medium">john@example.com</p>
                          </div>
                           <div>
            <p className="text-xs text-gray-600">Father/Husbands Last Name</p>
            <p className="font-medium">john@example.com</p>
                          </div>
                           <div>
            <p className="text-xs text-gray-600">Landline Number</p>
            <p className="font-medium">john@example.com</p>
                          </div>
                           
          
                      
                  </div>
                  </div>
                 
                  <div>

                      
                  </div>
          
        </div>
      </section>

      {/* Permanent Address */}
      <section className="bg-red-50 p-4 rounded-lg mb-6 border">
        <h2 className="font-semibold text-lg mb-4">Permanent Address</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-600">Address</p>
            <p className="font-medium">ABC Street</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">City</p>
            <p className="font-medium">Mumbai</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">State</p>
            <p className="font-medium">Maharashtra</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Pincode</p>
            <p className="font-medium">400001</p>
          </div>
        </div>
      </section>

      {/* Additional Documents */}
      <section className="bg-red-50 p-4 rounded-lg mb-6 border">
        <h2 className="font-semibold text-lg mb-4">Additional Documents</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-600">Address Proof</p>
            <p className="font-medium">Aadhaar Card</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">ID Proof</p>
            <p className="font-medium">PAN Card</p>
          </div>
        </div>
      </section>

      {/* Nominee Details */}
      <section className="bg-red-50 p-4 rounded-lg mb-6 border">
        <h2 className="font-semibold text-lg mb-4">Nominee Details</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-600">Nominee Name</p>
            <p className="font-medium">Sita Devi</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Relation</p>
            <p className="font-medium">Mother</p>
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="bg-white border rounded-lg p-4">
        <h2 className="font-semibold text-lg mb-4">Bank Details</h2>
        <table className="w-full text-sm border">
          <thead className="bg-[#0C3C87] text-white">
            <tr>
              <th className="p-2">Bank Name</th>
              <th className="p-2">Customer Name</th>
              <th className="p-2">Account No</th>
              <th className="p-2">IFSC</th>
              <th className="p-2">Updated On</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="p-2">HDFC Bank</td>
              <td className="p-2">John Doe</td>
              <td className="p-2">1234567890</td>
              <td className="p-2">HDFC0001234</td>
              <td className="p-2">22-11-2025</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
