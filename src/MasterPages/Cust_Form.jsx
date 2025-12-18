
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import { formatIndianDate } from "../utils/Helpers";

export default function Cust_Form() {
  const location = useLocation();
  const row = location.state; // received row id
  const navigate = useNavigate();

  console.log("DATA : ", row)

  const [data, setData] = useState(null); // 🔹 Store customer data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!row?.id) {
      alert("Invalid Customer ID");
      navigate("/");
      return;
    }

    const fetchCustomer = async () => {
      try {
        console.log("Fetching customer with ID:", row.id);
        const res = await axios.get(`${API}/Master/doc/get-customer/${row.id}`);
        setData(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch customer");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [row, navigate]);


  if (loading) {
    return <p className="text-center mt-20 text-lg font-bold">Loading...</p>;
  }

  if (!data) return null;


  return (
    <div className="w-full bg-white min-h-screen ">
      {/* Header */}
      {/* <div className="bg-[#0C3C87] text-white p-4 rounded-md mb-6">
        <h1 className="text-xl font-semibold">Customer Profile Form</h1>
      </div> */}
      <div className="flex justify-center sticky top-[80px] z-40">
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
  onClick={() => navigate("/Customer-Profile-List")}
  className="text-white px-[6.25px] py-[6.25px] rounded-[3.75px] bg-[#C1121F] w-[74px] h-[24px] opacity-100 text-[10px]"
>
  Exit
</button>



            </div>

          </div>
        </div>
      </div>
<div className="flex justify-center mt-10  ">

              <div className="">
               {/* Personal Information */}
      <section className="bg-[#FFE6E6] p-4  px-18 border border-gray-300 text-[16px]">
        <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
          Personal Information
        </h3>
        <div className="flex justify-between items-start">
          {/* Left - Info */}
          <div className="w-4/5 flex flex-wrap gap-5 text-sm">
            <div>
              <div className=" text-gray-600">Customer id</div>
              <p className="font-medium">{data.id}</p>
            </div>
            <div>
              <div className=" text-gray-600">PAN No.</div>
              <p>{data.panNo}</p>
            </div>
            <div>
              <div className=" text-gray-600">Aadhar Number</div>
              <p className="font-medium">{data.aadhar}</p>
            </div>
            <div>
              <div className=" text-gray-600">Print Name</div>
              <p className="font-medium">{data.printName}</p>
            </div>
            <div>
              <div className=" text-gray-600">Email Id</div>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <div className=" text-gray-600">Mobile No.</div>
              <p className="font-medium">{data.mobile}</p>
            </div>
            <div>
              <div className=" text-gray-600">Alternate Mobile No</div>
              <p className="font-medium">{data.altMobile}</p>
            </div>
            <div>
              <div className=" text-gray-600">Date of Birth</div>
              <p className="font-medium">{formatIndianDate(data.dob)}</p>
            </div>
            <div>
              <div className=" text-gray-600">Gender</div>
              <p className="font-medium">{data.gender}</p>
            </div>
            <div>
              <div className=" text-gray-600">Marital</div>
              <p className="font-medium">{data.marital}</p>
            </div>
            <div>
              <div className=" text-gray-600">GST No.</div>
              <p className="font-medium">{data.gstNo}</p>
            </div>
            <div>
              <div className=" text-gray-600">Religious Belief</div>
              <p className="font-medium">{data.religion}</p>
            </div>
            <div>
              <div className=" text-gray-600">Education</div>
              <p className="font-medium">{data.education}</p>
            </div>
            <div>
              <div className=" text-gray-600">Occupation</div>
              <p className="font-medium">{data.occupation}</p>
            </div>
            <div>
              <div className=" text-gray-600">Party Type</div>
              <p className="font-medium">{data.partyType}</p>
            </div>
            <div>
              <div className=" text-gray-600">Risk Category</div>
              <p className="font-medium">{data.riskCategory}</p>
            </div>
            <div>
              <div className=" text-gray-600">First Name</div>
              <p className="font-medium">{data.firstName}</p>
            </div>
            <div>
              <div className=" text-gray-600">Middle Name</div>
              <p className="font-medium">{data.middleName}</p>
            </div>
            <div>
              <div className=" text-gray-600">Last Name</div>
              <p className="font-medium">{data.lastName}</p>
            </div>
            <div>
              <div className=" text-gray-600">Father/Husband's First Name</div>
              <p className="font-medium">{data.fatherFirstName}</p>
            </div>
            {/* <div>
              <div className=" text-gray-600">Father/Husband's Middle Name</div>
              <p className="font-medium">{data.fatherMiddleName}</p>
            </div>
            <div>
              <div className=" text-gray-600">Father/Husband's Last Name</div>
              <p className="font-medium">{data.fatherLastName}</p>
            </div> */}
            <div>
              <div className=" text-gray-600">Landline Number</div>
              <p className="font-medium">{data.landline}</p>
            </div>
            <div>
              <div className=" text-gray-600">Politically Exposed Person?</div>
              <p className="font-medium">{data.pep}</p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="w-1/5 flex flex-col items-center">
            <img
              src={
                data.profileImage
                  ? `${data.profileImage}` // if image exists
                  : "/profile.png" // fallback
              }
              alt="Customer"
              className="w-24 h-24 rounded object-cover"
            />
                <p className="text-sm mt-2">Customer Profile</p>
                 <div className="w-1/5 flex flex-col items-center">
            <img
              src={
                data.signature
                  ? `${data.signature}` // if image exists
                  : "/profile.png" // fallback
              }
              alt="Customer"
              className="w-50 h-10 rounded object-cover"
            />
            <p className="text-sm mt-2">Customer signature</p>
          </div>
              </div>
             
        </div>
      </section>


      {/* Permanent Address */}
      <section className="bg-[#F7F7FF] p-4 px-18 border-gray-300 text-[16px]">
        <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
          Permanent Address
        </h3>
        <div className="flex flex-wrap gap-5 text-sm">
          <div>
            <div className=" text-gray-600">Address</div>
            <p className="font-medium">{data.Permanent_Address}</p>
          </div>
          <div>
            <div className=" text-gray-600">Pincode</div>
            <p className="font-medium">{data.Permanent_Pincode}</p>
          </div>
          <div>
            <div className=" text-gray-600">State</div>
            <p className="font-medium">{data.Permanent_State}</p>
          </div>
          <div>
            <div className=" text-gray-600">City</div>
            <p className="font-medium">{data.Permanent_City}</p>
          </div>
          <div>
            <div className=" text-gray-600">Country</div>
            <p className="font-medium">{data.Permanent_Country}</p>
          </div>
          <div>
            <div className=" text-gray-600">Resi. Status</div>
            <p className="font-medium">{data.Permanent_ResiStatus}</p>
          </div>
          <div>
            <div className=" text-gray-600">Resi. since (in years)</div>
            <p className="font-medium">{data.Permanent_Resisince}</p>
          </div>
          <div>
            <div className=" text-gray-600">Category</div>
            <p className="font-medium">{data.Permanent_Category}</p>
          </div>
          <div>
            <div className=" text-gray-600">Company Type</div>
            <p className="font-medium">{data.Permanent_CompanyType}</p>
          </div>
          <div>
            <div className=" text-gray-600">Industry Type</div>
            <p className="font-medium">{data.Permanent_IndustryType}</p>
          </div>
          <div>
            <div className=" text-gray-600">Business working since( in year)</div>
            <p className="font-medium">{data.Permanent_Businessworkingsince}</p>
          </div>

        </div>
      </section >

      {/* Additional Documents */}
      <section className="bg-[#FFE6E6] p-4 px-18 border-gray-300 text-[16px]" >
        <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
         Current Address
        </h3>
        <div className="flex flex-wrap gap-5 text-sm">
          <div>
            <div className=" text-gray-600">Address</div>
            <p className="font-medium">{data.Corresponding_Address}</p>
          </div>
          <div>
            <div className=" text-gray-600">Area</div>
            <p className="font-medium">{data.Corresponding_Area}</p>
          </div>
          <div>
            <div className=" text-gray-600">Pincode</div>
            <p className="font-medium">{data.Corresponding_Pincode}</p>
          </div>
          <div>
            <div className=" text-gray-600">State</div>
            <p className="font-medium">{data.Corresponding_State}</p>
          </div>
          <div>
            <div className=" text-gray-600">City</div>
            <p className="font-medium">{data.Corresponding_City}</p>
          </div>
          <div>
            <div className=" text-gray-600">Country</div>
            <p className="font-medium">{data.Corresponding_Country}</p>
          </div>

        </div>
      </section >
      {/* Additional Documents */}
      <section className="bg-[#F7F7FF] p-4 px-18 border-gray-300 text-[16px]">
        <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
          Additional Documents
        </h3>
        <div className="flex flex-wrap gap-5 text-sm">
          <div>
            <div className=" text-gray-600">Address Proof</div>
            <p className="font-medium">{data.Additional_AddressProof}</p>
          </div>
          <div>
            <div className=" text-gray-600">Any Details</div>
            <p className="font-medium">{data.Additional_AnyDetails1}</p>
          </div>
          <div>
            <div className=" text-gray-600">Pincode</div>
            <p className="font-medium">{data.Additional_UploadDocumentFile1}</p>
          </div>
          <div>
            <div className=" text-gray-600">ID Proof</div>
            <p className="font-medium">{data.Additional_IDProof}</p>
          </div>
          <div>
            <div className=" text-gray-600">Any Details</div>
            <p className="font-medium">{data.Additional_AnyDetails2}</p>
          </div>
          <div>
            <div className=" text-gray-600">Pincode</div>
            <p className="font-medium">{data.Additional_UploadDocumentFile2}</p>
          </div>
          <div>
            <div className=" text-gray-600">Reference 1</div>
            <p className="font-medium">{data.Additional_Reference1}</p>
          </div>
          <div>
            <div className=" text-gray-600">Reference 2</div>
            <p className="font-medium">{data.Additional_Reference2}</p>
          </div>

        </div>
      </section >

      {/* Nominee Details */}
      <section className="bg-[#FFE6E6] p-4 px-18 border-gray-300 text-[16px]">
        <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
          Nominee Details
        </h3>
        <div className="flex flex-wrap gap-5 text-sm">
          <div>
            <div className=" text-gray-600">Nominee</div>
            <p className="font-medium">{data.Nominee_NomineeName}</p>
          </div>
          <div>
            <div className=" text-gray-600">Relation</div>
            <p className="font-medium">{data.Nominee_Relation}</p>
          </div>
          <div>
            <div className=" text-gray-600">Address</div>
            <p className="font-medium">{data.Nominee_Address}</p>
          </div>
          <div>
            <div className=" text-gray-600">State</div>
            <p className="font-medium">{data.Nominee_State}</p>
          </div>
          <div>
            <div className=" text-gray-600">City</div>
            <p className="font-medium">{data.Nominee_City}</p>
          </div>
        </div>
      </section >
      {/* Remark */}
      <section className="bg-[#F7F7FF] p-4 px-18 border-gray-300 text-[16px]">
        <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
          Remark
        </h3>
        <div className="flex flex-wrap gap-5 text-sm">
          <p className="font-medium">{data.Remark}</p>
        </div>
      </section >

      {/* Bank Details */}
      <section className="p-4 px-18 border-gray-300 text-[16px]">
        <h3 className="font-semibold text-[20px] text-[#0A2478] mb-3">
          Bank Details
        </h3>
        <table className="w-[1290px] text-sm border text-center">
          <thead className="bg-[#0c0e87] text-white">
            <tr>
              <th className="p-2">Bank Name</th>
              <th className="p-2">Customer Name</th>
              <th className="p-2">Account No</th>
              <th className="p-2">IFSC</th>
              <th className="p-2">Updated On</th>
            </tr>
          </thead>
          <tbody>
            {data?.bankData?.length > 0 ? (
              data.bankData.map((bank, index) => (
                <tr key={index} className="border-0">
                  <td className="p-2">{bank.bankName || "-"}</td>
                  <td className="p-2">{bank.customerName || "-"}</td>
                  <td className="p-2">{bank.accountNo || "-"}</td>
                  <td className="p-2">{bank.ifsc || "-"}</td>
                  <td className="p-2">
                    {bank.updatedOn
                      ? new Date(bank.updatedOn).toLocaleDateString("en-GB") // Converts to DD-MM-YYYY
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-2 text-gray-500">
                  No bank records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
   
</div>
              
</div>
      
    </div >
  );
}
