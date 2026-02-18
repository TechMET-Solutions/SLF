import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../api";

const Print_Cash_Balance = () => {
  const [cashData, setCashData] = useState(null);

  const noteDenoms = [500, 200, 100, 50, 20, 10];
  const coinDenoms = [20, 10, 5, 2, 1];

  const fetchCashData = async () => {
    try {
      const res = await axios.get(`${API}/cashbalance/latest`);
      setCashData(res.data);
    } catch (err) {
      console.error("Error fetching cash data:", err);
    }
  };
  useEffect(() => {
    fetchCashData();
  }, []);
  const styles = {
    printContainer: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#000",
      backgroundColor: "#fff",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "5px",
    },
    logoBox: { display: "flex", alignItems: "center", gap: "5px" },
    logoText: { display: "flex", flexDirection: "column", lineHeight: "1" },
    printDate: { fontSize: "12px" },
    hr: { border: "0", borderTop: "1px solid #000", margin: "5px 0" },
    reportTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#3f51b5",
      margin: "15px 0 5px 0",
    },
    flexContainer: {
      display: "flex",
      gap: "10px",
      alignItems: "flex-start",
    },
    tableWrapper: {
      flex: 1,
      border: "1px solid #000",
    },
    tableTitle: {
      fontWeight: "bold",
      padding: "2px 5px",
      borderBottom: "1px solid #000",
      fontSize: "14px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "12px",
    },
    thRow: { backgroundColor: "#f0ece2" },
    th: {
      border: "1px solid #000",
      textAlign: "left",
      padding: "4px",
    },
    td: {
      border: "1px solid #000",
      padding: "4px",
      height: "18px",
    },
    cashBalance: {
      fontSize: "18px",
      fontWeight: "bold",
      margin: "15px 0",
    },
    footer: {
      marginTop: "40px",
    },
    address: {
      fontSize: "11px",
      padding: "5px 0",
    },
  };
  const TableSection = ({ title, denominations, type, source }) => (
    <div style={styles.tableWrapper}>
      <div style={styles.tableTitle}>{title}</div>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thRow}>
            <th style={styles.th}>SNo.</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Denomination</th>
            <th style={styles.th}>Nos.</th>
            <th style={styles.th}>Total</th>
          </tr>
        </thead>
        <tbody>
          {denominations.map((denom, index) => {
            const count = source?.[denom] || 0;
            const total = denom * count;

            return (
              <tr key={denom} style={styles.tr}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{type}</td>
                <td style={styles.td}>₹{denom}</td>
                <td style={styles.td}>{count}</td>
                <td style={styles.td}>₹{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  if (!cashData) return <div>Loading...</div>;

  const currentDate = new Date().toLocaleDateString("en-GB");
  const printTime = new Date().toLocaleTimeString();

  return (
    <div style={styles.printContainer}>
      <div style={{ textAlign: "right", fontSize: "12px" }}>
        Date: {currentDate} | Time: {printTime}
      </div>

      <hr style={styles.hr} />

      <div style={styles.reportTitle}>Cash Scroll For Date : {currentDate}</div>

      <div style={styles.flexContainer}>
        <TableSection
          title="Notes Details"
          denominations={noteDenoms}
          type="Note"
          source={cashData.notes}
        />
        <TableSection
          title="Coins Details"
          denominations={coinDenoms}
          type="Coin"
          source={cashData.coins}
        />
      </div>

      <div style={styles.cashBalance}>
        Notes Total : ₹{cashData.notesTotal} <br />
        Coins Total : ₹{cashData.coinsTotal} <br />
        <b>Grand Total : ₹{cashData.grandTotal}</b>
      </div>

      <div style={styles.footer}>
        <hr style={styles.hr} />
        <center style={styles.address}>
          S Lunawat Jewellers, 318, Nehru Road, Bhagur, Nashik, Pin - 422502,
          Maharashtra
        </center>
        <hr style={styles.hr} />
      </div>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={() => window.print()}>🖨 Print</button>
      </div>
    </div>
  );
};
export default Print_Cash_Balance