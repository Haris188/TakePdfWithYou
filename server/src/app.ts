
import * as express from 'express'
import {
    installPassport,
    installApi,
    installParsers,
    installCors
} from './middlewares'
import * as dotenv from 'dotenv'

dotenv.config()

export default ()=>{
    const app = express()

    installCors(app)
    installParsers(app)
    installPassport(app)
    installApi(app)
    
    app.listen(process.env.EXPRESS_PORT, ()=>{
        console.log('SERVER: running at ' + process.env.PORT)
    })
}