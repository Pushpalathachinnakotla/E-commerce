import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Reg.css"
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
const Reg = () => {
    let [data,setData]=useState({})
    let [err,setErr]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let register=()=>{
        axios.post("http://localhost:5000/reg",data).then((res)=>{
            if(res.data.msg=='acc created')
            {
                navigate("/login")
            }
            else{
                setErr(res.data.msg)
            }
        })
    }
  return (
    <div className='regcon'>
    <div className='reg'>
        <Typography style={{ color: 'red', marginBottom: '10px' }}>{err}</Typography>
        <Typography variant="h5" style={{ marginBottom: '20px', color: 'green' }}>
          Registration Form
        </Typography>
        <TextField  fullWidth label="Enter Email"type='text'  name="_id" onChange={fun} />
        <TextField type='text' fullWidth label="Enter Name" name="name" onChange={fun} />
        <TextField type='date' name="dob" onChange={fun}/>
        <RadioGroup name="gen" onChange={fun} row>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <TextField type='text' name="phno" fullWidth
          label="Enter Phone Number" onChange={fun}/>
        <TextField type='password' name='password'  fullWidth label="Enter Password" onChange={fun}/>
        <Button onClick={register}  sx={{
        color: 'white',
        backgroundColor: 'green',
        borderRadius: 8,
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        
      }} variant="contained">Register</Button>
    </div>
    </div>
  )
}

export default Reg