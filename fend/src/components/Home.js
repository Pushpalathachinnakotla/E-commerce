import axios from "axios"
import { useContext, useEffect, useState } from "react"
import './home.css'
import Gc from "./Gc"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import { Typography } from "@mui/material"
import Test from "./Test"
let Home = () => {
    let [data, setData] = useState([])
    let obj = useContext(Gc)
    let navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:5000/getprod").then((res) => {
            setData(res.data)
        })

    }, [])
    let addcart = (item) => {
        if (obj.usercon.islogin) {
            item = { ...item }
            let pid = item._id
            delete item._id
            delete item.comm
            data = { "pid": pid, "uid": obj.usercon._id, ...item }
            axios.post("http://localhost:5000/addcart", data, { headers: { "Authorization": obj.usercon.token } }).then((res) => {
                navigate("/cart")

            })
        }
        else {
            navigate("/login")
        }
    }

    let upd = (item) => {
        obj.updateusercon({ "item": item })
        navigate("/update")
    }
    let del = (_id) => {
        axios.delete(`http://localhost:5000/delprod/${_id}`, { headers: { "Authorization": obj.usercon.token, "_id": obj.usercon._id } }).then(() => {
            axios.get("http://localhost:5000/getprod").then((res) => {
                setData(res.data)
            })
        })
    }
    return (
        <div className="prodcon">
            {
                data.map((item, index) => {
                    return (
                        <div className="card">
                            <div className="img"><img src={`http://localhost:5000/imgs/${item.img}`} /></div>
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
                            <Button onClick={() => addcart(item)}>addcart</Button>
                            {obj.usercon.isadmin && <Button onClick={() => { upd(item) }}>update</Button>}
                            {obj.usercon.isadmin && <Button onClick={() => del(item._id)}>delprod</Button>}
                        </div>
                    )
                })
            }
            
         <Test/>
        </div>
    )
}
export default Home