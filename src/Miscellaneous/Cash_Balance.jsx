// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API } from "../api";
// import axios from "axios";

// // 1. Move TableSection OUTSIDE to prevent losing focus on re-render
// const TableSection = ({
//   title,
//   type,
//   denominations,
//   counts,
//   onUpdate,
//   styles,
// }) => (
//   <div style={styles.fieldset}>
//     <div style={styles.legend}>{title}</div>
//     <table style={styles.table}>
//       <thead>
//         <tr>
//           <th style={styles.th}>Type</th>
//           <th style={styles.th}>Denom.</th>
//           <th style={{ ...styles.th, width: "50px" }}>Nos.</th>
//           <th style={{ ...styles.th, textAlign: "right" }}>Total</th>
//         </tr>
//       </thead>
//       <tbody>
//         {denominations.map((denom) => (
//           <tr key={`${type}-${denom}`}>
//             <td style={styles.td}>{type}</td>
//             <td style={styles.td}>₹{denom}</td>
//             <td style={styles.td}>
//               <input
//                 type="text"
//                 inputMode="numeric"
//                 style={styles.input}
//                 value={counts[denom] || ""}
//                 placeholder="0"
//                 onChange={(e) =>
//                   onUpdate(denom, e.target.value, type.toLowerCase())
//                 }
//               />
//             </td>
//             <td style={{ ...styles.td, textAlign: "right", fontWeight: "600" }}>
//               {(Number(denom) * (Number(counts[denom]) || 0)).toLocaleString(
//                 "en-IN",
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const Cash_Balance = () => {
//   const [noteCounts, setNoteCounts] = useState({
//     10: "",
//     20: "",
//     50: "",
//     100: "",
//     200: "",
//     500: "",
//   });
//   const [coinCounts, setCoinCounts] = useState({
//     1: "",
//     2: "",
//     5: "",
//     10: "",
//     20: "",
//   });
//   const initialNotes = { 10: "", 20: "", 50: "", 100: "", 200: "", 500: "" };
// const initialCoins = { 1: "", 2: "", 5: "", 10: "", 20: "" };
//   const navigate = useNavigate();
//   const noteDenoms = [500, 200, 100, 50, 20, 10];
//   const coinDenoms = [20, 10, 5, 2, 1];

//   const handleInputChange = (denom, value, type) => {
//     // Allows only numbers and prevents focus loss
//     if (value !== "" && !/^\d+$/.test(value)) return;

//     if (type === "note") {
//       setNoteCounts((prev) => ({ ...prev, [denom]: value }));
//     } else {
//       setCoinCounts((prev) => ({ ...prev, [denom]: value }));
//     }
//   };

//   const calculateTotal = (counts) =>
//     Object.entries(counts).reduce(
//       (acc, [d, c]) => acc + Number(d) * (Number(c) || 0),
//       0,
//     );

//   const subTotalNotes = calculateTotal(noteCounts);
//   const subTotalCoins = calculateTotal(coinCounts);
// const buildCashJson = () => {
//   const notesTotal = calculateTotal(noteCounts);
//   const coinsTotal = calculateTotal(coinCounts);

//   return {
//     notes: noteCounts,
//     coins: coinCounts,
//     notesTotal,
//     coinsTotal,
//     grandTotal: notesTotal + coinsTotal,
//     createdAt: new Date(),
//   };
// };
//   const resetCashForm = () => {
//     setNoteCounts(initialNotes);
//     setCoinCounts(initialCoins);
//   };

//   const handleSaveCash = async () => {
//     try {
//       const cashData = buildCashJson();
//       await axios.post(`${API}/cashbalance/create`, cashData);

//       alert("Saved Successfully");
//       resetCashForm(); // ✅ reset after save
//     } catch (err) {
//       alert("Error saving");
//     }
//   };

//   return (
//       <div style={styles.container}>
//           <div className='flex justify-end p-2'>
//                <button
//         style={{ ...styles.btnSave, backgroundColor: "#0a7a2f" }}
//         onClick={() => navigate("/Print_Cash_Balance")}
//       >
//         🖨 Print Cash Balance
//       </button>
//           </div>
     
//       <div style={styles.header}>Cash Scroll</div>
//       <div style={styles.mainWrapper}>
//         <div style={styles.flexContainer}>
//           <TableSection
//             title="Notes"
//             type="Note"
//             denominations={noteDenoms}
//             counts={noteCounts}
//             onUpdate={handleInputChange}
//             styles={styles}
//           />
//           <TableSection
//             title="Coins"
//             type="Coin"
//             denominations={coinDenoms}
//             counts={coinCounts}
//             onUpdate={handleInputChange}
//             styles={styles}
//           />
//         </div>

//         {/* Compact Subtotals */}
//         <div style={styles.subTotalBar}>
//           <div>Notes: ₹{subTotalNotes.toLocaleString("en-IN")}</div>
//           <div>Coins: ₹{subTotalCoins.toLocaleString("en-IN")}</div>
//         </div>

//         <div style={styles.footer}>
//           <div style={styles.grandTotal}>
//             <span style={{ fontSize: "10px" }}>GRAND TOTAL</span>
//             <span style={styles.totalAmount}>
//               ₹ {(subTotalNotes + subTotalCoins).toLocaleString("en-IN")}
//             </span>
//           </div>
//           <div style={styles.buttonRow}>
//             <button style={styles.btnSave} onClick={handleSaveCash}>
//   💾 Save
// </button>
//             <button style={styles.btnExit}>✖ Exit</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles remain compact
// const styles = {
//   container: {
//     fontFamily: "sans-serif",
//     maxWidth: "1400px",
//     margin: "10px auto",
//     border: "1px solid #008080",
//     backgroundColor: "#fff",
//   },
//   header: {
//     backgroundColor: "#008080",
//     color: "white",
//     padding: "5px 10px",
//     fontSize: "13px",
//     fontWeight: "bold",
//   },
//   mainWrapper: { padding: "10px" },
//   flexContainer: { display: "flex", gap: "10px" },
//   fieldset: {
//     flex: 1,
//     border: "1px solid #00a0a0",
//     position: "relative",
//     padding: "10px 2px 2px",
//   },
//   legend: {
//     position: "absolute",
//     top: "-9px",
//     left: "10px",
//     backgroundColor: "white",
//     padding: "0 4px",
//     color: "#008080",
//     fontSize: "11px",
//     fontWeight: "bold",
//   },
//   table: { width: "100%", borderCollapse: "collapse", fontSize: "11px" },
//   th: {
//     backgroundColor: "#f2f8f8",
//     border: "1px solid #c0dcdc",
//     padding: "4px",
//     textAlign: "left",
//   },
//   td: { border: "1px solid #e0eeee", padding: "2px 5px" },
//   input: {
//     width: "100%",
//     padding: "3px",
//     border: "1px solid #ccc",
//     textAlign: "center",
//     fontSize: "12px",
//     boxSizing: "border-box",
//   },
//   subTotalBar: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: "10px",
//     fontSize: "12px",
//     color: "#005a5a",
//     fontWeight: "bold",
//     padding: "0 5px",
//   },
//   footer: {
//     marginTop: "10px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderTop: "1px solid #eee",
//     paddingTop: "10px",
//   },
//   grandTotal: {
//     backgroundColor: "#008080",
//     color: "white",
//     padding: "5px 15px",
//     borderRadius: "2px",
//     minWidth: "150px",
//   },
//   totalAmount: { fontSize: "18px", fontWeight: "bold", display: "block" },
//   buttonRow: { display: "flex", gap: "4px" },
//   btnSave: {
//     backgroundColor: "#1a5d9b",
//     color: "white",
//     border: "none",
//     padding: "8px 20px",
//     cursor: "pointer",
//     fontSize: "12px",
//   },
//   btnExit: {
//     backgroundColor: "#555",
//     color: "white",
//     border: "none",
//     padding: "8px 20px",
//     cursor: "pointer",
//     fontSize: "12px",
//   },
// };

// export default Cash_Balance;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import axios from "axios";

// Table Section (Same as yours)
const TableSection = ({
  title,
  type,
  denominations,
  counts,
  onUpdate,
  styles,
}) => (
  <div style={styles.fieldset}>
    <div style={styles.legend}>{title}</div>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Type</th>
          <th style={styles.th}>Denom.</th>
          <th style={{ ...styles.th, width: "50px" }}>Nos.</th>
          <th style={{ ...styles.th, textAlign: "right" }}>Total</th>
        </tr>
      </thead>
      <tbody>
        {denominations.map((denom) => (
          <tr key={`${type}-${denom}`}>
            <td style={styles.td}>{type}</td>
            <td style={styles.td}>₹{denom}</td>
            <td style={styles.td}>
              <input
                type="text"
                inputMode="numeric"
                style={styles.input}
                value={counts[denom] || ""}
                placeholder="0"
                onChange={(e) =>
                  onUpdate(denom, e.target.value, type.toLowerCase())
                }
              />
            </td>
            <td style={{ ...styles.td, textAlign: "right", fontWeight: "600" }}>
              {(Number(denom) * (Number(counts[denom]) || 0)).toLocaleString(
                "en-IN"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Cash_Balance = () => {
  const navigate = useNavigate();

  const [noteCounts, setNoteCounts] = useState({
    10: "",
    20: "",
    50: "",
    100: "",
    200: "",
    500: "",
  });

  const [coinCounts, setCoinCounts] = useState({
    1: "",
    2: "",
    5: "",
    10: "",
    20: "",
  });

  const [softwareCash, setSoftwareCash] = useState(20000);

  const noteDenoms = [500, 200, 100, 50, 20, 10];
  const coinDenoms = [20, 10, 5, 2, 1];

  // 🔹 Fetch Cash as per Software
  // useEffect(() => {
  //   const fetchSoftwareCash = async () => {
  //     try {
  //       const res = await axios.get(`${API}/cashbalance/software-total`);
  //       setSoftwareCash(res.data.total || 0);
  //     } catch (err) {
  //       console.log("Error fetching software cash");
  //     }
  //   };

  //   fetchSoftwareCash();
  // }, []);

  const handleInputChange = (denom, value, type) => {
    if (value !== "" && !/^\d+$/.test(value)) return;

    if (type === "note") {
      setNoteCounts((prev) => ({ ...prev, [denom]: value }));
    } else {
      setCoinCounts((prev) => ({ ...prev, [denom]: value }));
    }
  };

  const calculateTotal = (counts) =>
    Object.entries(counts).reduce(
      (acc, [d, c]) => acc + Number(d) * (Number(c) || 0),
      0
    );

  const subTotalNotes = calculateTotal(noteCounts);
  const subTotalCoins = calculateTotal(coinCounts);
  const physicalCash = subTotalNotes + subTotalCoins;

  // 🔹 Difference Logic
  const difference = physicalCash - softwareCash;

  let status = "MATCH";
  let statusColor = "green";

  if (difference > 0) {
    status = "EXTRA";
    statusColor = "orange";
  }

  if (difference < 0) {
    status = "SHORT";
    statusColor = "red";
  }

  const handleSaveCash = async () => {
    try {
      const cashData = {
        notes: noteCounts,
        coins: coinCounts,
        physicalCash,
        softwareCash,
        difference,
        status,
        createdAt: new Date(),
      };

      await axios.post(`${API}/cashbalance/create`, cashData);
      alert("Saved Successfully");
    } catch (err) {
      alert("Error saving");
    }
  };

  return (
    <div style={styles.container}>
      <div className="flex justify-end p-2">
        <button
          style={{ ...styles.btnSave, backgroundColor: "#0a7a2f" }}
          onClick={() => navigate("/Print_Cash_Balance")}
        >
          🖨 Print Cash Balance
        </button>
      </div>

      <div style={styles.header}>Cash Scroll</div>
      <div style={styles.mainWrapper}>
        <div style={styles.flexContainer}>
          <TableSection
            title="Notes"
            type="Note"
            denominations={noteDenoms}
            counts={noteCounts}
            onUpdate={handleInputChange}
            styles={styles}
          />
          <TableSection
            title="Coins"
            type="Coin"
            denominations={coinDenoms}
            counts={coinCounts}
            onUpdate={handleInputChange}
            styles={styles}
          />
        </div>

        {/* Totals Section */}
        <div style={styles.infoBar}>
          <div>Software Cash: ₹{softwareCash.toLocaleString("en-IN")}</div>
          <div>Physical Cash: ₹{physicalCash.toLocaleString("en-IN")}</div>
          <div>
            Difference: ₹{Math.abs(difference).toLocaleString("en-IN")}
          </div>
          <div style={{ color: statusColor, fontWeight: "bold" }}>
            Status: {status}
          </div>
        </div>

        <div style={styles.footer}>
          <div style={styles.grandTotal}>
            <span style={{ fontSize: "10px" }}>GRAND TOTAL</span>
            <span style={styles.totalAmount}>
              ₹ {physicalCash.toLocaleString("en-IN")}
            </span>
          </div>

          <div style={styles.buttonRow}>
            <button style={styles.btnSave} onClick={handleSaveCash}>
              💾 Save
            </button>
            <button style={styles.btnExit}>✖ Exit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extra Styles Added
const styles = {
  container: {
    fontFamily: "sans-serif",
    maxWidth: "1400px",
    margin: "10px auto",
    border: "1px solid #008080",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#008080",
    color: "white",
    padding: "5px 10px",
    fontSize: "13px",
    fontWeight: "bold",
  },
  mainWrapper: { padding: "10px" },
  flexContainer: { display: "flex", gap: "10px" },
  fieldset: {
    flex: 1,
    border: "1px solid #00a0a0",
    position: "relative",
    padding: "10px 2px 2px",
  },
  legend: {
    position: "absolute",
    top: "-9px",
    left: "10px",
    backgroundColor: "white",
    padding: "0 4px",
    color: "#008080",
    fontSize: "11px",
    fontWeight: "bold",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "11px" },
  th: {
    backgroundColor: "#f2f8f8",
    border: "1px solid #c0dcdc",
    padding: "4px",
    textAlign: "left",
  },
  td: { border: "1px solid #e0eeee", padding: "2px 5px" },
  input: {
    width: "100%",
    padding: "3px",
    border: "1px solid #ccc",
    textAlign: "center",
    fontSize: "12px",
  },
  infoBar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    fontSize: "13px",
    padding: "10px",
    backgroundColor: "#f7f7f7",
    border: "1px solid #ddd",
  },
  footer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grandTotal: {
    backgroundColor: "#008080",
    color: "white",
    padding: "5px 15px",
    borderRadius: "2px",
  },
  totalAmount: { fontSize: "18px", fontWeight: "bold", display: "block" },
  buttonRow: { display: "flex", gap: "4px" },
  btnSave: {
    backgroundColor: "#1a5d9b",
    color: "white",
    border: "none",
    padding: "8px 20px",
    cursor: "pointer",
  },
  btnExit: {
    backgroundColor: "#555",
    color: "white",
    border: "none",
    padding: "8px 20px",
    cursor: "pointer",
  },
};

export default Cash_Balance;
