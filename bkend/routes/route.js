let express=require("express")
const { userreg, login,isauth,islogin } = require("../controlers/usercon")
const { upload, addprod, getprod, updateprod, delprod, addcom } = require("../controlers/prodcon")
const { addcart, getcart, delcart, delitem, incqty, decqty } = require("../controlers/cartcon")
let route=new express.Router()
route.post("/reg",userreg)
route.post("/login",login)
route.post("/addprod",upload.single("img"),islogin,isauth,addprod)
route.get("/getprod",getprod)
route.put("/updateprod",islogin,isauth,updateprod)
route.delete("/delprod/:_id",islogin,isauth,delprod)
route.post("/addcart",islogin,addcart)
route.get("/getcart/:uid",islogin,getcart)
route.delete("/delcart/:uid",islogin,delcart)
route.delete("/delitem/:_id",islogin,delitem)
route.put("/inc",islogin,incqty)
route.put("/dec",islogin,decqty)
route.put("/addcom",addcom)

module.exports=route