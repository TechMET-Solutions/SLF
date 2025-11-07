import { useEffect, useState } from "react";
import { IoMdImage } from "react-icons/io";
import profileempty from "../assets/profileempty.png";
import { viewBidderApi } from "../API/Transaction/Auction/BidderApi"; // adjust import path
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';

const ViewBidderDetails = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const id = item;
  console.log("id ",id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    bidder_name: "",
    mobile_no: "",
    alt_mob_no: "",
    email: "",
    personal_address: "",
    shop_address: "",
    landline_no: "",
    landline_no2: "",
    firm_name: "",
    gst_no: "",
    aadhar_no: "",
    aadharFile: "",
    pan_no: "",
    panFile: "",
    bank_name: "",
    account_no: "",
    ifsc_code: "",
    account_holder_name: "",
    bank_address: "",
    profile_photo: "",
  });

  useEffect(() => {
    const fetchBidderData = async () => {
      setLoading(true);
      try {
        const res = await viewBidderApi(id);
        if (res?.bidder) {
          setFormData(res.bidder);
        } else {
          setError("No bidder data found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bidder details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBidderData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading bidder details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center mt-5">
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
        <h2 className="text-red-600 font-bold text-[20px] leading-[1.48] font-['Source_Sans_3']">
          View Bidder Details
        </h2>
        <div className="flex items-center gap-5">
          <button
            className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition"
            onClick={() => window.history.back()}
          >
            Exit
          </button>
        </div>
      </div>

      <div className="w-full max-w-[1290px] space-y-6">
        {/* Bidder Information Section */}
        <div className="bg-white">
          <h1 className="text-blue-900 font-semibold text-xl my-6">
            Bidder Information
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section - Form Fields */}
            <div className="flex-1 ">
              {/* Flex container with wrap */}
              <div className="flex flex-wrap -mx-3">
                {/* Bidder Name */}
                <div className="px-3 mb-4  w-[200px]">
                  <label className="text-gray-900 font-medium">Bidder Name </label>
                  <p className="text-gray-700 font-normal">
                    {formData.bidder_name}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[150px]">
                  <label className="text-gray-900 font-medium">Mobile Number </label>
                  <p className="text-gray-700 font-normal">
                    {formData.mobile_no}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[200px]">
                  <label className="text-gray-900 font-medium">Alternate Mobile Number </label>
                  <p className="text-gray-700 font-normal">
                    {formData.alt_mob_no || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[230px]">
                  <label className="text-gray-900 font-medium">Email </label>
                  <p className="text-gray-700 font-normal">
                    {formData.email || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[350px]">
                  <label className="text-gray-900 font-medium">Personal Address </label>
                  <p className="text-gray-700 font-normal">
                    {formData.personal_address || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[350px]">
                  <label className="text-gray-900 font-medium">Shop Address</label>
                  <p className="text-gray-700 font-normal">
                    {formData.shop_address || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[130px]">
                  <label className="text-gray-900 font-medium">Landline No </label>
                  <p className="text-gray-700 font-normal">
                    {formData.landline_no || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[130px]">
                  <label className="text-gray-900 font-medium">Landline No 2 </label>
                  <p className="text-gray-700 font-normal">
                    {formData.landline_no2 || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[180px]">
                  <label className="text-gray-900 font-medium">Firm Name </label>
                  <p className="text-gray-700 font-normal">
                    {formData.firm_name || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[280px]">
                  <label className="text-gray-900 font-medium">GST No </label>
                  <p className="text-gray-700 font-normal">
                    {formData.gst_no || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[180px]">
                  <label className="text-gray-900 font-medium">Aadhar No</label>
                  <p className="text-gray-700 font-normal">
                    {formData.aadhar_no || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[200px]">
                  <label className="text-gray-900 font-medium">View Aadhar </label>
                  {formData.aadharFile && (
                    <a
                      href={formData.aadharFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <IoMdImage className="text-black text-lg" />
                      <span>View Aadhaar File</span>
                    </a>
                  )}
                </div>
                <div className="px-3 mb-4  w-[150px]">
                  <label className="text-gray-900 font-medium">Pan No</label>
                  <p className="text-gray-700 font-normal">
                    {formData.pan_no || "N/A"}
                  </p>
                </div>
                <div className="px-3 mb-4  w-[200px]">
                  <label className="text-gray-900 font-medium">View Pan </label>
                  {formData.panFile && (
                    <a
                      href={formData.panFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <IoMdImage className="text-black text-lg" />
                      <span>View Aadhaar File</span>
                    </a>
                  )}
                </div>

              </div>
            </div>


            {/* Right Section - Profile Picture */}
            <div className="lg:w-36 flex flex-col items-center lg:items-start gap-4">
              <h3 className="font-semibold text-gray-900 text-center lg:text-left">
                Bidder Profile
              </h3>
              <div className="relative">
                <img
                  src={formData.bidder_photo || profileempty}
                  alt="profile"
                  className="h-[150px] w-[130px] border border-gray-300 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <h1 className="text-blue-900 font-semibold text-xl mb-6">
            Add Bank Details
          </h1>

          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-semibold">Account Number</label>
              <p className="text-gray-700 font-normal">
                {formData.account_no || "N/A"}
              </p>
            </div>

            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-semibold">IFSC Code</label>
              <p className="text-gray-700 font-normal">
                {formData.ifsc_code || "N/A"}
              </p>
            </div>

            <div className="flex flex-col gap-1 w-[250px]">
              <label className="text-gray-900 font-semibold">Account Holder Name</label>
              <p className="text-gray-700 font-normal">
                {formData.account_holder_name || "N/A"}
              </p>
            </div>

            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-semibold">Bank Name</label>
              <p className="text-gray-700 font-normal">
                {formData.bank_name || "N/A"}
              </p>
            </div>

            <div className="flex flex-col gap-1 w-[200px]">
              <label className="text-gray-900 font-semibold">Bank Address</label>
              <p className="text-gray-700 font-normal">
                {formData.bank_address || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewBidderDetails;
