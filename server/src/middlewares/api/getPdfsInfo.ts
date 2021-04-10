import actions from "../../actions"

export default (app)=>{
    app.get('/pdfs-info', async (req,res)=>{
        const result = await actions.getPdfInfo(req.user.id)
        res.send(result)
    })
}