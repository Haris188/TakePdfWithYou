
import * as passport from 'passport'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export default (app)=>{
    app.post('/login', (req,res, next)=>{
        passport.authenticate('local', {session:false}, (err, user, info)=>{
            if(err || !user || user.error){
                console.log(err)
                return res.status(400).json({
                    message: info ? info.message: "Login failed",
                    user
                })
            }

            req.login(user, {session:false}, (err)=>{
                if(err) res.send(err)

                const token = jwt.sign(
                    user, 
                    process.env.JWT_SECRET, 
                    {expiresIn: '1h'})
                return res.json({user, token})
            })
        })(req,res, next)
    })
}