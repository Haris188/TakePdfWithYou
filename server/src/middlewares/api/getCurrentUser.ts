import actions from "../../actions"

export default (app)=>{
    app.get('/current-user', async (req,res)=>{
        res.send(req.user)
    })
}