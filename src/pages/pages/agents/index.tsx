// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'


import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../../firebase/config'

import Link from 'next/link'
import { useRouter } from 'next/router'
import PrivateRoute from "../../privateRoute";
import exportDataToExcel from "../../../configs/exportToExcel";
import Button from "@mui/material/Button";

interface RowType {
  name: string
  district: string
  phone: string
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const rows: RowType[] = [

]

const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  accepted: { color: 'success' }
}



const AgentsPage = () => {
  const router = useRouter()

  // function handleRowClick(agentID) {
  //   router.push(`/agents/${agentID}`) // navigate to dynamic route for employee
  // }
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), 'users')
  );
  const handleExportClick = () => {
    if (value) {
      const data = value.docs.map((doc) => doc.data());
      exportDataToExcel(data, 'users', 'output.xlsx');
    }
  };
  const newData: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    orderCount: number;
    customerCount: number;
    deleteCount: number;
    dateJoined: { seconds: number; nanoseconds: number };
    lastName: string;
    firstName: string;
    district: string;
  }[] = [];

  value?.forEach((doc) => {
    const data = doc.data();
    console.log(`OUR USERS ${JSON.stringify(data)}`);
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      orderCount,
      customerCount,
      deleteCount,
      dateJoined,
      district,
      ...rest
    } = data;
    const name = `${firstName} ${lastName}`;
    newData.push({
      id: doc.id,
      name,
      email,
      phoneNumber,
      orderCount,
      customerCount,
      deleteCount,
      dateJoined,
      lastName,
      firstName,
      district
    });
  });



  if (loading) {
    return 'loading...'
  }

  if (error) {
    return `Error fetching data: ${error}`
  }


  //console.log(`Our value is ${JSON.stringify(value)}`)

  return (
    <PrivateRoute>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <Button variant='contained' onClick={handleExportClick}>
          Export to Excel
        </Button>
      </Box>
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {newData.map((row) => (
              <TableRow onClick={() => router.push(`/pages/agents/${row.id}`)} hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell
                  sx={{ py: theme => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </PrivateRoute>
  )
}

export default AgentsPage
