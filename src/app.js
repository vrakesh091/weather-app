const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()
const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')
const viewsPath = path.join(__dirname,'../templates/views')
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))
app.get('',(req,res)=>{
    //res.send('<h1>Hello welcome</h1');
    res.render('index',{
        title:'Weather',
        name:'Rakesh'
    })
})

app.get('/about',(req,res)=>{
    //res.send('<h1>Hello welcome</h1');
    res.render('about',{
        title:'About page',
        img:'/img/view.jpeg',
        name:'Rakesh'
    })
})

app.get('/help',(req,res)=>{
    //res.send('<h1>Hello welcome</h1');
    res.render('help',{
        title:'Help page',
        name:'Rakesh'
    })
})

app.get('/weather',({query},res)=>{
    //console.log(req.query);
    if(!query.address)
    {
        return res.send({
            "error": "pls provide address"
        });    
    }
    geocode(query.address,(error,{lat,long,location} = {})=>{//destructed with default value
        if(error){
            return res.send({ error });
        }
        forecast(lat,long,(error,forecastResponse)=>{
            if(error){
                return res.send({ error });
            }   
            res.send({
                forecast:forecastResponse,
                location:location,
                address:query.address        
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('not-found',{
        title:"404",
        errorMessage:'help article is not found.',
        name:'Rakesh'
    })
})

app.get('*',(req,res)=>{
    res.render('not-found',{
        title:"404",
        errorMessage:'The page is not found.',
        name:'Rakesh'
    })
})

app.listen(port,()=>{
    console.log('Server is up and running on port ', port);
})