// ** React Imports
import {ChangeEvent, forwardRef, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Date' fullWidth {...props} />
})

interface State {
  title: string
  firstName: string
  lastName: string
  nrc: string
  employeeNumber: string
  primaryPhoneNumber: string
  secondaryPhoneNumber: string
  district: string
  department: string
  institution: string
  createdBy: string
  createdOn: string
}

const CustomerDetail = (props) => {
  console.log(`We got props: ${JSON.stringify(props)}`)
  // ** State
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [values, setValues] = useState<State>({
    title: '',
    firstName: '',
    lastName: '',
    nrc: '',
    employeeNumber: '',
    primaryPhoneNumber: '',
    secondaryPhoneNumber: '',
    district: '',
    department: '',
    institution: '',
    createdBy: '',
    createdOn: ''
  });
  const handleChange = (prop: keyof State) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value })
  }
 console.log(`FirstName is ${values.firstName}`)

return (
    <CardContent>
      <form>
        <Grid container spacing={7}>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>{props.value.title}</InputLabel>
              <Select label={props.value.title} defaultValue={props.value.title} placeholder={props.value.title} value={values.title} onChange={handleChange('title')}>
                <MenuItem value='Mr'>Mr</MenuItem>
                <MenuItem value='Ms'>Ms</MenuItem>
                <MenuItem value='Mrs'>Mrs</MenuItem>
                <MenuItem value='Miss'>Miss</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={props.value.firstName}
              value={values.firstName}
              onChange={handleChange('firstName')}
              placeholder='First Name'
              defaultValue='Some Name'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={props.value.lastName}
              value={values.lastName}
              onChange={handleChange('lastName')}
              placeholder='Last Name'
              defaultValue='Some Name'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={props.value.nrc}
              value={values.nrc}
              onChange={handleChange('nrc')}
              placeholder='NRC'
              defaultValue='Some NRC'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={props.value.employeeNumber}
              value={values.employeeNumber}
              onChange={handleChange('employeeNumber')}
              placeholder='Employee Number'
              defaultValue='Some Num'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={props.value.district}
              value={values.district}
              onChange={handleChange('district')}
              placeholder='District'
              defaultValue='Some Num'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={props.value.department}
              placeholder='Department'
              value={values.department}
              onChange={handleChange('department')}
              defaultValue='Some Num'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={props.value.institution}
              value={values.institution}
              onChange={handleChange('institution')}
              placeholder='Institution'
              defaultValue='Some Num'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={props.value.agentName}
              value={values.createdBy}
              onChange={handleChange('createdBy')}
              placeholder='Created By'
              defaultValue='Some Num'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={(date: Date) => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='number' label={props.value.primaryPhoneNumber} placeholder='(123) 456-7890' />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='number' label={props.value.secondaryPhoneNumber} placeholder='(123) 456-7890' />
          </Grid>



          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default CustomerDetail
