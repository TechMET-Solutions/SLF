// import React from 'react'

// const PrivacyPolicy = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default PrivacyPolicy
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#F6F3EE] min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">

        {/* PAGE TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Privacy Policy
        </h1>

        {/* SECTION */}
        <section className="mb-6">
          <p className="text-gray-700 leading-7 text-justify">
            Please review our Privacy Policy, which also governs your visit to{" "}
            <strong> https://slunawat.co.in </strong>, to fully understand our practices.
          </p>
        </section>

        {/* ELECTRONIC COMMUNICATION */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Electronic Communication
          </h2>
          <p className="text-gray-700 leading-7 text-justify">
            When you visit <strong>https://slunawat.co.in/</strong> or send e-mails to us,
            you are communicating with us electronically. By communicating with us,
            you consent to receive communication from us electronically. We will
            communicate with you by e-mail or by posting notices on our website.
            You agree that all agreements, notices, disclosures, and other
            communications that we provide to you electronically satisfy any legal
            requirement that such communication be in writing.
          </p>
        </section>

        {/* PRICES */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Prices
          </h2>
          <p className="text-gray-700 leading-7 text-justify">
            All prices posted on this website are subject to change without notice.
            Prices prevailing at commencement of placing the order will apply.
            Posted prices do not include convenience fee. In case there are any
            additional charges or taxes, the same will be mentioned on the website.
          </p>
        </section>

        {/* PAYMENT */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Payment
          </h2>
          <p className="text-gray-700 leading-7 text-justify">
            Online payments can be done by Card Payment and Net Banking Payment
            via <strong>BillDesk Payment Gateway</strong>, which can be accessed
            through the Online Payment link on the Make Payment page.
          </p>
        </section>

        {/* CHANGES AND CANCELLATION */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Changes and Cancellation
          </h2>
          <p className="text-gray-700 leading-7 text-justify">
            Changes and cancellation are not allowed.
          </p>
        </section>

        {/* REFUND */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Refund
          </h2>
          <p className="text-gray-700 leading-7 text-justify">
            Refunds initiated will be credited to the account or card from where
            the transaction was initiated.
          </p>
        </section>

      </div>
    </div>
  );
}
