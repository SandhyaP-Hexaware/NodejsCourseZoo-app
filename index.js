const express=require('express')
const app=express()
const animalRouter=require('./routes/animals')
const swaggerJsDocs=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express')
//const router = require('./routes/animals')
require('./db/mongoose')

app.use(express.json())
app.use(animalRouter)

const swaggerOptions={
    definition: {
        openapi:'3.0.0',
        info:{
            title:'Zoo Mangement',
            version:'1.0.0',
          //  servers:["http://localhost:3000"]
        }

    },
    apis:["./routes/animals.js"]
}

const swaggerDocs=swaggerJsDocs(swaggerOptions)
console.log(swaggerDocs)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))


const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server is on port ${port}`)
})