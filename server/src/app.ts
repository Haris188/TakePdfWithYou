
import * as express from 'express'
import installApi from './middlewares/api'
import * as dotenv from 'dotenv'

dotenv.config()

export default ()=>{
    const app = express()

    installApi(app)
    app.listen(process.env.EXPRESS_PORT, ()=>{
        console.log('SERVER: running at ' + process.env.EXPRESS_PORT)
    })
}