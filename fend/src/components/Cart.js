import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Gc from "./Gc"
import { Button, Typography } from "@mui/material"
let Cart=()=>{
    let [data,setData]=useState([])
    let [err,setErr]=useState("")
    let [total,setTotal]=useState(0)
    let obj=useContext(Gc)
    let getcart=()=>{
        axios.get(`http://localhost:5000/getcart/${obj.usercon._id}`,{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
        if(res.data.msg==undefined) 
        {   
        setData(res.data)
        let y=res.data
        let x=0
        for(let i=0;i<y.length;i++)
        {
            x=x+y[i].qty*y[i].price
        }
        setTotal(x)
        }
        else{
            setErr(res.data.msg)
        }
        })
    }
    useEffect(()=>{
        if(obj.usercon._id=="")
        {
            setErr("plz login")
        }
        else{
            getcart()
        
    }

    },[])
    let del=(_id)=>{
        axios.delete(`http://localhost:5000/delitem/${_id}`,{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
           
            getcart()

        })

    }
    let inc=(id)=>{
        axios.put(`http://localhost:5000/inc`,{"_id":id},{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
           
            getcart()

        })


    }
    let dec=(id)=>{
        axios.put(`http://localhost:5000/dec`,{"_id":id},{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
           
            getcart()

        })


    }
    let clercart=()=>{
        axios.delete(`http://localhost:5000/delcart/${obj.usercon._id}`,{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
           
        getcart()

    }) 

    }
    return(<>
    {err!=""&&<div>{err}</div>}
    {err=="" &&data.length==0&&<div>Your cart is empty</div>}
      {data.length!=0&&  <div className="prodcon"> 
        {
            data.map((item,index)=>{
               
                return(
                    <div className="card">
                        <div className="img"><img src={`http://localhost:5000/imgs/${item.img}`}/></div>
                        <div className="product-info">
                                <Typography variant="h4" className="product-name">
                                    Name: {item.name}
                                </Typography>
                                <Typography variant="body1" className="product-desc">
                                    Desc: {item.desc}
                                </Typography>
                                <Typography variant="body1" className="product-cat">
                                    Cat: {item.cat}
                                </Typography>
                                <Typography variant="h4" className="product-price">
                                    Price: {item.price}
                                </Typography>
                            </div>
                        <Typography variant="p">Quantity:<Button onClick={()=>item.qty>1?dec(item._id):null} sx={{"fontSize":"10px"}}>-</Button>{item.qty}<Button onClick={()=>inc(item._id)}>+</Button></Typography>
                        <Typography variant="p">amount:{item.price*item.qty}</Typography>
                        <Button onClick={()=>del(item._id)} sx={{fontSize:"15px"}}>delcart</Button>
                   
                    </div>
                )
            })
        }

        
        </div>}
       {data.length!=0&& <div style={{"color":"red"}}>Total:{total}</div>}
       {data.length!=0&&<button onClick={clercart}>clear cart</button>}
        </>
    )
}
export default Cart