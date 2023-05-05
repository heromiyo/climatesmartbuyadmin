// ** React Imports
import {ReactElement, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import {NaturePeople} from "mdi-material-ui";
// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, getFirestore} from "firebase/firestore";
import firebase from "../../firebase/config";


interface DataType {
  orderCount: number | undefined
  customerCount: number
  monthOrderCount: number | undefined
  monthCustomerCount: number | undefined
  title: string
  color: ThemeColor
  icon: ReactElement
}

const RenderStats = (props) => {

  console.log(`Stats props: ${JSON.stringify(props)}`)


  const statsData: DataType[] = [
    {
      orderCount: props.value.orderCount,
      customerCount: props.value.customerCount,
      monthOrderCount: 0,
      monthCustomerCount: 0,
      title: 'Agents',
      color: 'primary',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    ]



  // usersValue?.forEach((doc) => {
  //   const data = doc.data();
  //   console.log(data);
  // });


  return statsData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.orderCount}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const DetailStats = (props) => {

  return (
    <Card>
      <CardHeader
        title='Statistics'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        // subheader={
        //   <Typography variant='body2'>
        //     <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
        //       Total 48.5% growth
        //     </Box>{' '}
        //     😎 this month
        //   </Typography>
        // }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {RenderStats(props)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DetailStats
