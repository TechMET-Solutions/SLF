// import React from 'react'

// const Refund = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Refund

export default function Refund() {
  return (
    <div className="bg-[#F6F3EE] min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Refund & Cancellation Policy
        </h1>

        {/* CONTENT */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Refunds & Cancellation
          </h2>

          <p className="text-gray-700 leading-7">
          If a refund is applicable, the amount will be credited to the original payment method
within 5–7 working days from the date of approval.
          </p>
        </section>

      </div>
    </div>
  );
}
