import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Gc from './Gc'
import { Button, TextField, Typography } from '@mui/material'
import "./Reg.css"
const Login = () => {
    let navigate=useNavigate()
    let [data,setData]=useState({"_id":"","password":""})
    let [err,setErr]=useState("")
    let obj=useContext(Gc)
    useEffect(()=>{
        let x=localStorage.getItem("data")
        if(x!=undefined)
        {
            setData(JSON.parse(x))
        }
        

    },[])
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})

    }
    let login=()=>{
        localStorage.setItem("data",JSON.stringify(data))
        axios.post("http://localhost:5000/login",data).then((res)=>{
            if(res.data.token!=undefined)
            {
                let y={"islogin":true,"token":res.data.token,"_id":res.data._id,"name":res.data.name}
                if(res.data.role==101)
                {
                    y.isadmin=true
                }
                else{
                    y.isadmin=false
                }
                obj.updateusercon(y)

               navigate("/")
            }
            else{
                setErr(res.data.msg)
            }
        })
    }
  return (
    <div className='regcon'>
        <div className='reg' style={{height:"40vh"}}>
            <Typography style={{"color":"red"}}>{err}</Typography>
            <TextField type='text' placeholder='enter email' name="_id" onChange={fun} value={data._id}/>
            <TextField type='password' placeholder='enter password' name="password" onChange={fun} value={data.password}/>
            <Button onClick={login} sx={{
        color: 'white',
        backgroundColor: 'green',
        borderRadius: 8,
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        
      }} variant="contained">Login</Button>
        </div>
    </div>
  )
}

export default Login