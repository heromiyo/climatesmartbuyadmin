

// Function to export Firestore collection data to Excel
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from '../firebase/config';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import XLSX from 'xlsx';

// Function to export Firestore collection data to Excel
async function ExportFirestoreCollectionToExcel(collectionName, fileName) {
  // Get a reference to the Firestore collection
  const collectionRef = getFirestore(firebase).collection(collectionName);

  // Use react-firebase-hooks to get the collection data
  const [data] = useCollectionData(collectionRef);

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert the data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, collectionName);

  // Export the workbook to an Excel file
  XLSX.writeFile(workbook, fileName);
}
