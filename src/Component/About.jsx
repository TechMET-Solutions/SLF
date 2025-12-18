// import React from 'react'

// const about = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default about
import React from "react";

export default function About() {
  return (
    <div className="bg-[#F6F3EE] min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">

        {/* PAGE TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          About Us
        </h1>

        {/* INTRO */}
        <p className="text-gray-700 leading-7 mb-6 text-justify">
          <strong>Shantilal K Lunawat</strong> and <strong>Shailesh S Lunawat</strong> 
          are the two promoters of <strong>S Lunawat Finance Pvt Ltd (SLF)</strong>, 
          which received its <strong>NBFC certificate from the Reserve Bank of India (RBI) 
          on 17th January 2017</strong>. We have the honour of being the 
          <strong>first Gold Loan NBFC from the North Maharashtra region</strong>.
        </p>

        <p className="text-gray-700 leading-7 mb-8 text-justify">
          The company commenced its operations on <strong>1st February 2017</strong>. 
          As of now, the company operates through <strong>two branches</strong>, with 
          further expansion plans in the near future.
        </p>

        {/* FOUNDER SECTION */}
        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Founder – Mr. Shantilal Lunawat
          </h2>

          <p className="text-gray-700 leading-7 text-justify">
            Our Founder, <strong>Mr. Shantilal Lunawat</strong>, has worked in the 
            <strong>banking industry for nearly 25 years</strong> until the year 1994. 
            After that, he started a gold jewellery business in the year 1994 under the 
            name <strong>“S Lunawat Jewellers Pvt Ltd”</strong>, which has today become 
            a reputed and trusted brand in the region for gold and silver jewellery.
          </p>

          <p className="text-gray-700 leading-7 mt-4 text-justify">
            Alongside the jewellery business, he was also operating a gold pawning 
            business since 1994, which was later converted into an NBFC in the year 2017.
          </p>
        </div>

        {/* DIRECTOR SECTION */}
        <div className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Director – Mr. Shailesh Lunawat
          </h2>

          <p className="text-gray-700 leading-7 text-justify">
            <strong>Mr. Shailesh Lunawat</strong>, after completing his engineering 
            from a reputed engineering college, worked for <strong>four years in the 
            software industry</strong>.
          </p>

          <p className="text-gray-700 leading-7 mt-4 text-justify">
            He brings with him <strong>more than 20 years of experience</strong> in 
            the gold loan business and gold & silver retailing, supported by 
            strong technical knowledge and modern business practices.
          </p>
        </div>

      </div>
    </div>
  );
}
