// import { useRouter } from 'next/router'
//
// function CustomerDetails() {
//   const router = useRouter()
//   const { agentID } = router.query // retrieve employeeNumber from route params
//
//   // fetch employee data for the given employeeNumber
//
//   return (
//     <div>
//       <h1>Employee Details for Employee Number {agentID}</h1>
//       {/* Render employee details here */}
//     </div>
//   )
// }
//
// export default CustomerDetails
// ** MUI Imports
import Grid from '@mui/material/Grid'
import { getFirestore, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from "../../../firebase/config";
import { useRouter } from 'next/router'
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import Detail from "../../../layouts/components/detail/Detail";
import DetailStats from "../../../layouts/components/detail/DetailStats";
import CustomerDetail from "../../../layouts/components/detail/CustomerDetail";

const CustomerDetails = () => {
  const router = useRouter()
  const { agentID } = router.query

  const [value, loading, error] = useDocument(
    doc(getFirestore(firebase), 'users', String(agentID)),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (loading) {
    return 'loading...'
  }
  if (error) {
    return `Error: ${error}`
  }

  let newData = null;
  console.log(value?.data())


  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <CustomerDetail />
        </Grid>

      </Grid>
    </ApexChartWrapper>

  )
}

export default CustomerDetails
