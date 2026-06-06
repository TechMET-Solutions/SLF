import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { API } from "../api";

const PaymentSuccessEMI = () => {
  const navigate = useNavigate();
  const { loanId } = useParams();
  const location = useLocation();

useEffect(() => {
  // ✅ Step 1: Force reload only once
  if (!sessionStorage.getItem("paymentReloaded")) {
    sessionStorage.setItem("paymentReloaded", "true");
    window.location.reload();
    return;
  }

  const processPayment = async () => {
    try {
      console.log("Returned from PG");

      if (localStorage.getItem("repaymentDone")) return;

      const savedData = localStorage.getItem("repaymentPayload");

      if (!savedData) {
        alert("No repayment data found!");
        navigate("/Loan-Application");
        return;
      }

      const finalObject = JSON.parse(savedData);

      const queryParams = new URLSearchParams(location.search);

      const status =
        queryParams.get("status") ||
        queryParams.get("txStatus") ||
        "SUCCESS";

      if (status !== "SUCCESS") {
        alert("❌ Payment Failed!");
        localStorage.removeItem("repaymentPayload");
        navigate("/Loan-Application");
        return;
      }

      // ✅🔥 CALL YOUR MAIN API HERE
      const res = await axios.post(
        `${API}/Transactions/loan-repayment`,
        finalObject
      );

      if (res.data?.success) {
        alert("✅ Repayment Successful!");

        localStorage.setItem("repaymentDone", "true");
        localStorage.removeItem("repaymentPayload");

        sessionStorage.removeItem("paymentReloaded");

        navigate("/Loan-Application");
      } else {
        alert("Failed to save repayment");
      }
    } catch (err) {
      console.error("ERROR:", err);

      sessionStorage.removeItem("paymentReloaded");
      navigate("/Loan-Application");
    }
  };

  processPayment();
}, []);

  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold">
      Processing your payment... ⏳ Please wait
    </div>
  );
};

export default PaymentSuccessEMI;