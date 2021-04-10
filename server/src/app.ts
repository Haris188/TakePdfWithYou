
import * as express from 'express'
import {
    installPassport,
    installApi,
    installParsers
} from './middlewares'
import * as dotenv from 'dotenv'

dotenv.config()

export default ()=>{
    const app = express()

    installParsers(app)
    installPassport(app)
    installApi(app)
    
    app.listen(process.env.EXPRESS_PORT, ()=>{
        console.log('SERVER: running at ' + process.env.EXPRESS_PORT)
    })
}