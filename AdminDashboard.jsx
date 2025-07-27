import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const AdminDashboard = () => {
    const [data, setData] = useState([]);
    
    const SHEET_ID = "https://docs.google.com/spreadsheets/d/13CrTRt87pPKDEIQLzHgWwVmCkUGk9AF6y5AuDUAFibQ/edit?usp=sharing";  // Your Google Sheet ID
    const API_KEY = "AIzaSyAL7mRWlt11sXdbYg6VvDEaHy8S1Hxkc4U";  // Replace with your API Key
    
    useEffect(() => {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`)
            .then(response => response.json())
            .then(sheetData => {
                const rows = sheetData.values;
                if (rows) {
                    const headers = rows[0]; // First row as headers
                    const formattedData = rows.slice(1).map(row => {
                        let obj = {};
                        headers.forEach((header, index) => {
                            obj[header] = row[index] || "";
                        });
                        return obj;
                    });
                    setData(formattedData);
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
        XLSX.writeFile(workbook, "Attendance.xlsx");
    };

    return (
        <div>
            <h2>Admin Attendance Dashboard</h2>
            <button onClick={downloadExcel}>Download as Excel</button>
            <table border="1">
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                            <th key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
