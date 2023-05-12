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
import {useRouter} from "next/router";
import PrivateRoute from "../../privateRoute";
import exportDataToExcel from "../../../configs/exportToExcel";
import Button from "@mui/material/Button";

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}
const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  accepted: { color: 'success' }
}

const OrdersPage = () => {
  const router = useRouter()
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), 'orders')
  );

  const handleExportClick = () => {
    if (value) {
      const data = value.docs.map((doc) => doc.data());
      exportDataToExcel(data, 'orders', 'output.xlsx');
    }
  };
  const newData: {
    id: string;
    name: string;
    status: string;
    orderStatus: any;
    isCollected: any;
    itemNum: any;
    formType: any;
    installmentAmount: any;
    totalPrice: any;
    collectionDate: any;
  }[] = [];

  value?.forEach((doc) => {
    const data = doc.data();
    const { firstName, lastName, orderStatus, isCollected, ...rest } = data;
    const name = `${firstName} ${lastName}`;
    const status = orderStatus === 'accepted' ? 'accepted' : 'rejected';
    newData.push({
      name,
      status,
      orderStatus,
      isCollected,
      itemNum: rest.itemNum,
      formType: rest.formType,
      installmentAmount: rest.installmentAmount,
      totalPrice: rest.totalPrice,
      collectionDate: rest.collectionDate,
      ...rest,
      id: doc.id
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
              <TableCell>Number Of Items</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Form Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newData.map((row) => (
              <TableRow onClick={() => router.push(`/pages/orders/${row.id}`) } hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.itemNum}</TableCell>
                <TableCell>{row.collectionDate}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>{row.formType}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </PrivateRoute>
  )
}

export default OrdersPage
