import axios from 'axios'
import React, { useContext, useState } from 'react'
import Gc from './Gc'
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import "./Reg.css"
const Addprod = () => {
  let [data,setData]=useState({})
  let obj=useContext(Gc)
  let [err,setErr]=useState("")
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})


  }
  let fun1=(e)=>{
    setData({...data,"img":e.target.files[0]})
    
  }
  let addprod=(e)=>{
    let d=new FormData()
    for(let p in data)
    {
      d.append(p,data[p])
    }

    axios.post("http://localhost:5000/addprod",d,{headers:{"Authorization":obj.usercon.token,"_id":obj.usercon._id}}).then((res)=>{
   
    setErr(res.data.msg)
     
    })

    
  }
  return (
    <div className='regcon'>
      <div className='reg'>
        <Typography style={{"color":"blue"}}>{err}</Typography>
        <TextField type='text' fullWidth label='Enter Product name' name="name" onChange={fun}/>
        <TextField type='text' fullWidth label='Enter Category' name="cat" onChange={fun}/>
      <Typography> Description: <textarea onChange={fun} name='desc' rows={3} cols={20}></textarea></Typography>
        <TextField type='text' fullWidth label='Enter Price' name='price' onChange={fun}/>
        <TextField type='file' name="img" onChange={fun1}/>
        <Button onClick={addprod}
         sx={{
          color: 'white',
          backgroundColor: 'green',
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          
        }} variant="contained"
        >Addprod</Button>



      </div>
    </div>
  )
}

export default Addprod