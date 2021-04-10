import actions from "../../actions"
import {v4} from 'uuid'

export default (app)=>{
    app.post('/register', async (req,res)=>{
        if(!res.body) 
        res.status(400).send({error: 'Provided user info is invalid'})

        const userData = req.body
        userData.id = v4()
        const response = await actions.registerUser(userData)

        res.send(response)
    })
}