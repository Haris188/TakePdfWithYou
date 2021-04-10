
import * as multer from 'multer'
import actions from '../../actions'
import {v4} from 'uuid'

const storage = multer.memoryStorage()
const upload = multer({
    storage
})

export default (app)=>{
    app.post(
        '/upload-pdf', 
        upload.single('file'),
        async (req,res)=>{
            const result = await actions.uploadPdf({
                meta: {
                    userId: req.user.id,
                    fileId: v4(),
                    filename: req.file.originalname,
                    mimeType: req.file.mimetype,
                    downloadLink:null,
                    bookmark: '1'
                },
                file:{
                    buffer: req.file.buffer
                }
            })
            
            res.send(result)
    })
}