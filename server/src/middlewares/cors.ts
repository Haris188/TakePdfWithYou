import * as cors from 'cors'

export default (app:any)=>{
    app.use((req,res, next)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next()
    })

    app.use(cors({
        credentials:true, 
        origin:true
    }))
}