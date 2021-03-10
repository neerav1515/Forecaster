const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Neerav Ganate'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Neerav Ganate'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Weather application. Type location and press enter',
        title: 'Help',
        name: 'Neerav Ganate'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address)
    {
        return res.send({
            error:'please provide valid address'
        })
    }
    
    geocode(req.query.address ,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
           return res.send({error});
        }

        forecast(latitude,longitude,(error,result)=>{
          if(error)
           {
               return res.send({error});
           }
           res.send({
               forecast: result,
               location,
               address:req.query.address
           });

         })
    })


    // res.send({
    //     forecast: 'It is snowing',
    //     location: req.query.address
    // })
})

app.get('/products',(req,res)=>{
   
    if(!req.query.search)
    {
        res.send({
            error: 'provide some search location'
        })
    }
     
    console.log(req.query.search);
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neerav Ganate',
        errorMessage: 'Help article not found. Click on one of the above links'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neerav Ganate',
        errorMessage: 'Page not found.Click on one of the above links'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})