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
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const [searchTarget, setSearchTarget] = useState('nrc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), 'orders')
  );
  useEffect(() => {
    console.log(`SearchTarget is in useEffect ${searchTarget}`)
    if (value) {
      const data = value.docs.map((doc) => doc.data());
      const filtered = data.filter((item) =>
        item[searchTarget].toLowerCase().includes(searchQuery.toLowerCase())
      );
      const newData = filtered.map((item) => {
        const { firstName, lastName, orderStatus, isCollected, ...rest } = item;
        const name = `${firstName} ${lastName}`;
        const status = orderStatus === 'accepted' ? 'accepted' : 'rejected';
        return {
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
          id: item.id
        }
      });
      setFilteredData(newData);
    }
  }, [value, searchQuery, searchTarget]);

  console.log(`Filtered data is: ${JSON.stringify(filteredData)}`)
  const handleChangeSearchTarget = (event) => {
    console.log(`search target value: ${event.target.value}`)
    setSearchTarget(event.target.value);
    console.log(`search target value after: ${searchTarget}`)
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="search-target-label">Search By</InputLabel>
          <Select
            labelId="search-target-label"
            id="search-target"
            value={searchTarget}
            label="Search By"
            onChange={handleChangeSearchTarget}
          >
            <MenuItem value="nrc">NRC</MenuItem>
            <MenuItem value="collectionDate">Collection Date</MenuItem>
            <MenuItem value="employeeNumber">Employee Number</MenuItem>
            <MenuItem value="firstName">First Name</MenuItem>
            <MenuItem value="lastName">Last Name</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            id="search-query"
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant='contained' onClick={handleExportClick}>
            Export to Excel
          </Button>
        </Box>
      </Box>
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Is Collected</TableCell>
              <TableCell>Item Number</TableCell>
              <TableCell>Form Type</TableCell>
              <TableCell>Installment Amount</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Collection Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.isCollected ? 'Yes' : 'No'}</TableCell>
                <TableCell>{row.itemNum}</TableCell>
                <TableCell>{row.formType}</TableCell>
                <TableCell>{row.installmentAmount}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>{row.collectionDate}</TableCell>
                <TableCell>
                  <Chip label={row.orderStatus} color={statusObj[row.status].color} />
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
