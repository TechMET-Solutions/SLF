// import React from 'react'

// const footer = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default footer

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-12">
      <div className="max-w-8xl mx-auto px-6 flex justify-center gap-[150px]">
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            S Lunawat Finance
          </h3>
          <ul className="space-y-2 text-sm">
            {/* <li>
              <a href="/" className="hover:text-orange-400">Home</a>
            </li> */}
            <li>
              <a href="/about-us" className="hover:text-orange-400">About Us</a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-orange-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-use" className="hover:text-orange-400">
                Terms of Use
              </a>
                      </li>
                      <li>
              <a href="/Refund-and-Cancellation" className="hover:text-orange-400">
               Refund and Cancellation
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-orange-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* ADDRESS 1 */}
        <div className="md:col-span-1">
          <h4 className="text-white text-lg font-semibold mb-4">
            Address info.
          </h4>
          <p className="text-sm leading-6">
            <span className="font-medium">S Lunawat Finance Pvt Ltd</span><br />
            318, Nehru Road, Bhadrug, Nashik,<br />
            Maharashtra – 422502
          </p>

          <p className="text-sm mt-4">
            <strong>Phone:</strong> 9420406611, 9420406622
          </p>
          <p className="text-sm">
            <strong>Email:</strong> slf.bhagur@gmail.com
          </p>
        </div>

        {/* ADDRESS 2 */}
        <div className="md:col-span-1">
          <h4 className="text-white text-lg font-semibold mb-4">
            Address info.
          </h4>
          <p className="text-sm leading-6">
            <span className="font-medium">S Lunawat Finance Pvt Ltd</span><br />
            Shop No. 1, Pratik Arcade,<br />
            Bytco Point, Nashik Road,<br />
            Nashik – 422401
          </p>

          <p className="text-sm mt-4">
            <strong>Phone:</strong> 9420406611, 9420406622
          </p>
          <p className="text-sm">
            <strong>Email:</strong> slf.bhagur@gmail.com
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm text-gray-400">
        © 2023 S Lunawat Finance Pvt Ltd. All Rights Reserved
        <span className="block md:inline md:ml-2">
          | Design & Developed By: Maraekat Infotech Ltd.
        </span>
      </div>
    </footer>
  );
}
