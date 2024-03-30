if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}



const express=require('express')
const app=express()
const path=require('path')
const mainRouter=require('./router/index')
const ejsMate=require('ejs-mate')
const mongoose=require('mongoose')




mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})

const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('mongoose connected'))



app.use(express.static('public'))
app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use('/',mainRouter)


app.listen(process.env.PORT || 3000)

