import React, { useEffect } from "react";

function NOC() {
    useEffect(() => {
    document.title = "SLF | NOC ";
  }, []);
    return (
        <div className="flex flex-col items-center mt-5">
            {/* Header Section */}
            <div className="flex items-center justify-between px-6 py-4 w-[1290px] h-[62px] border border-gray-200 rounded-[11px] shadow-sm">
                <h2 className="text-black font-bold text-[20px] font-['Source_Sans_3']">
                    S. Lunawat Finance Pvt. Ltd.
                </h2>
                <button className="bg-[#C1121F] text-white text-[10px] w-[74px] h-[24px] rounded-[3.75px] hover:bg-red-700 transition">
                    Exit
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white w-[1290px] mt-6">
                <table className="w-full border border-gray-400 text-sm border-collapse">
                    <tbody>

                        <tr className="border">
                            <td colSpan="7" className="py-6 text-center">
                                <p className="text-lg">
                                    Amount To Be Given Amount
                                </p >
                                <p className="text-lg font-semibold">
                                    कस्टमर ना-हरकत प्रमाण.पत्र (NoC - To Be Attached With Loan Payment Slip)
                                </p>

                            </td>
                        </tr>
                        {/* Customer Name */}
                        <tr className="border">
                            <td className="border px-2 py-1 font-semibold w-[180px]">
                                ग्राहकाचे नाव -
                            </td>
                            <td colSpan="6" className="border px-2 py-1">
                                IND0002563 - BARFILAL MULCHAND KANOJIYA
                            </td>
                        </tr>

                        {/* Loan Info */}
                        <tr className="border">
                            <td className="border px-2 py-1 font-semibold">कर्ज क्रमांक -</td>
                            <td colSpan="4" className="border px-2 py-1">01A5602839</td>
                            <td className="border px-2 py-1 font-semibold">कर्ज दिनांक -</td>
                            <td colSpan="4" className="border px-2 py-1">
                                25/Jul/2025
                            </td>
                        </tr>

                        {/* Loan Amount Details */}
                        <tr className="border">
                            <td
                                rowSpan="3"
                                className="border px-2 py-1  font-semibold w-[180px]"
                            >
                                कर्ज रक्कम -
                            </td>
                            <td colSpan="2" className="border text-center  px-2 py-1">
                                New Loan Amount: ₹35,000
                            </td>
                            <td colSpan="2" className="border text-center      px-2 py-1 font-semibold">
                                Less: Repay Amount (Old Loan Closed)
                            </td>
                            <td colSpan="2" className="border text-center px-2 py-1">
                                Amount To Be Given Amount
                            </td>
                        </tr>

                        <tr className="border text-center">
                            <td className="border px-2 py-1 font-semibold">CASH</td>
                            <td className="border px-2 py-1">0 /-</td>
                            <td className="border px-2 py-1 font-semibold">CASH</td>
                            <td className="border px-2 py-1">0 /-</td>
                            <td className="border px-2 py-1 font-semibold">CASH</td>
                            <td className="border px-2 py-1">0 /-</td>
                        </tr>

                        <tr className="border text-center">
                            <td className="border px-2 py-1 font-semibold">TOTAL BANK</td>
                            <td className="border px-2 py-1">35,000.00</td>
                            <td className="border px-2 py-1 font-semibold">BANK</td>
                            <td className="border px-2 py-1"></td>
                            <td className="border px-2 py-1 font-semibold">BANK</td>
                            <td className="border px-2 py-1"></td>

                        </tr>

                        {/* Bank Details Rows */}
                        <tr className="border text-left">
                            <td className="border px-2 py-1 font-semibold">Bank 01 Details</td>
                            <td colSpan="6" className="border px-2 py-1">
                                ANIL BARFILAL KANOJIYA &nbsp; | &nbsp; AXIS BANK &nbsp; | &nbsp;
                                779010100051527 &nbsp; | &nbsp; UTIB0000779 &nbsp; | &nbsp; ₹35,000 /-
                            </td>
                        </tr>

                        <tr className="border">
                            <td className="border px-2 py-1 font-semibold">Bank 02 Details</td>
                            <td colSpan="6" className="border px-2 py-1"></td>
                        </tr>

                        <tr className="border">
                            <td className="border px-2 py-1 font-semibold">Bank 03 Details</td>
                            <td colSpan="6" className="border px-2 py-1"></td>
                        </tr>

                        {/* Marathi Declaration */}
                        <tr>
                            <td colSpan="7" className="border px-2 py-3 text-justify leading-snug">
                                मी जे SLF कंपनीकडून लोन घेत आहे, ती सदर रक्कम वरील बँक-खात्यात जमा करण्यास माझी कोणतीही हरकत नाही. जर लोन पावती वरील नाव व बँक खात्याचे नाव वेगळे असल्यास त्यास माझी पूर्ण संमती आहे. मी उपरोक्त ग्राहक असून मी कंपनीकडून घेतलेल्या कर्जाची रक्कम SLF कंपनीने मी लिहून दिलेल्या खात्यावर वर्ग झाल्यानंतर SLF कंपनीची कोणतीही जबाबदारी राहणार नाही. ती  जबाबदारी व कर्ज परत-फेडीची जबाबदारी माझी राहील. त्यासरशी मी खाली सही केली.
                            </td>
                        </tr>

                        {/* Signature Section */}
                        <tr>
                            <td rowSpan="2" className="border px-2 py-1 font-semibold w-[180px]">
                                ग्राहकाची सही -
                            </td>
                            <td colSpan="3" className="border px-2 py-1 text-left">
                                Loan Created By: <br /> - Nitin.Suryawanshi@Slunawat.Com
                            </td>
                            <td colSpan="3" className="border px-2 py-1 text-left">
                                Loan Approved By: <br /> - Nitin.Suryawanshi@Slunawat.Com
                            </td>
                            
                        </tr>
                        <tr>  
                            <td colSpan="3" className="border px-2 py-1 text-left">
                                Bank Added By: <br /> -
                            </td>
                            <td colSpan="3" className="border px-2 py-1 text-left">
                                Bank Approved By: <br /> -
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default NOC;
