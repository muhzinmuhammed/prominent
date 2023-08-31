import express from "express"
/* to connect database*/
import '../connection/connection'
import studentRouter from "./routes/studentRouter/studentRouter"
import tutorRouter from "./routes/tutorRouter/tutorRouter"
import cors from 'cors'


import 'dotenv/config'
import adminRouter from "./routes/adminRouter/adminRouter"


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors()); 
const port=process.env.PORT

/*student route*/
app.use('/student',studentRouter)
/*student route*/
/*instructor  route*/
app.use('/instructor',tutorRouter)
/*instructor  route*/
/*admin  route*/
app.use('/admin',adminRouter)
/*admin  route*/

app.listen(port)