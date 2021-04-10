import actions from "../../actions"

export default (app)=>{
    app.post('/save-bookmark', async(req,res)=>{
        const result = await actions.saveBookmark(
            req.user.id,
            req.body.pdfId,
            req.body.bookmark
        )

        res.send(result)
    })
}