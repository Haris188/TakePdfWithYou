import passport = require("passport")

export default (app)=>{
    app.use(passport.authenticate('jwt', {session:false}), 
    (req,res,next)=>{
        if(req.user){
            next()
        }
        else{
            req.status(403).send({error:'You are not logged in'})
        }
    })
}