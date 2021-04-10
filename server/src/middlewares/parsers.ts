
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

export default (app:any)=>{
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cookieParser())
}