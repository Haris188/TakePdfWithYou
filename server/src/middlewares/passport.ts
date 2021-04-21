import * as passport from 'passport'
import * as passportJwt from 'passport-jwt'
import * as passportLocal from 'passport-local'
import actions from '../actions'
import * as bcrypt from 'bcrypt'

const ExtractJwt = passportJwt.ExtractJwt
const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy

export default (app)=>{
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, cb)=>{
        return actions.getUserWithEmail(email)
        .then(user=>{
            if(!user) 
            return cb(null, false,{message: "Incorrect email"})

            if(!bcrypt.compare(password, user.password))
            return cb(null, false,{message: "Incorrect password"})

            return cb(null, user, {message:'Logged in successfully'})
        })
        .catch(e=>{
            return cb(e)
        })
    }))

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, (jwtPayload, cb)=>{
        return actions.getUserWithId(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
    }))
}