import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { API } from "../api";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { loanId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const processPayment = async () => {
      try {
        console.log("Returned from PG");

        // ✅ Prevent duplicate execution
        if (localStorage.getItem("repaymentDone")) return;

        // ✅ Get stored data
        const savedData = localStorage.getItem("repaymentPayload");

        if (!savedData) {
          alert("No repayment data found!");
          navigate("/Loan-Application");
          return;
        }

        const finalObject = JSON.parse(savedData);

        console.log("FINAL OBJECT:", finalObject);

        // ✅ OPTIONAL: READ PG RESPONSE PARAMS
        const queryParams = new URLSearchParams(location.search);

        // ⚠️ Change based on ICICI response
        const status =
          queryParams.get("status") ||
          queryParams.get("txStatus") ||
          "SUCCESS";

        console.log("PG STATUS:", status);

        if (status !== "SUCCESS") {
          alert("❌ Payment Failed!");
          localStorage.removeItem("repaymentPayload");
          navigate("/Loan-Application");
          return;
        }

        // ✅ CALL YOUR BACKEND API
        const res = await axios.post(
          `${API}/Transactions/loanRepaymentForAdjLoan`,
          finalObject
        );

        console.log("API RESPONSE:", res.data);

        if (res.status === 200) {
          alert("✅ Repayment Successful!");

          // ✅ Mark as done
          localStorage.setItem("repaymentDone", "true");

          // ✅ Clean storage
          localStorage.removeItem("repaymentPayload");

          navigate("/Loan-Application");
        }
      } catch (err) {
        console.error("ERROR:", err);
        alert("Something went wrong!");

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

export default PaymentSuccess;