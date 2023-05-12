import 'firebase/firestore';
import * as XLSX from 'xlsx'

// Function to export Firestore collection data to Excel
function exportDataToExcel(data, collectionName, fileName) {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Remove the signature field from each data object
  const dataWithoutSignature = data.map(({ signature, ...rest }) => rest);

  // Convert the data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(dataWithoutSignature);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, collectionName);

  // Export the workbook to an Excel file
  XLSX.writeFile(workbook, fileName);
}



export default exportDataToExcel
