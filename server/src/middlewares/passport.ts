import * as passport from 'passport'
import * as passportJwt from 'passport-jwt'
import * as passportLocal from 'passport-local'
import actions from '../actions'

const ExtractJwt = passportJwt.ExtractJwt
const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy

export default (app)=>{
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, cb)=>{
        return actions.getUserWithEmailAndPass(email, password)
        .then(user=>{
            console.log(user)
            if(!user) return cb(null, false,{message: "Incorrect email or password"})
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