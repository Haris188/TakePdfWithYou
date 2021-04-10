import {PdfAccessSchema} from '../DbAccess'
import {dataStore} from '../TestDbAccess'
import { PdfType } from '../../Pdf/FileDataType'
import {isMatch} from 'lodash'
import MongoStore, { modifyIdKeysToMongo, revertKeyModification } from './MongoStore'



export default class PdfSchema implements PdfAccessSchema{
    public async appendPdf(pdfInfo, userId){
        try {
            const con = await MongoStore.connectDb()
            const query = con.collection('users')

            const mongoWhere = modifyIdKeysToMongo({id:userId})

            const res = await query.updateOne(mongoWhere,{
                $push: {pdfs: pdfInfo}
            })

            return {id:res.modifiedCount == 1 ? pdfInfo.id : null}
        } catch (error) {
            console.log('MONGO: FAILED TO APPEND PDF')
            console.log(error)
            return {id:null}
        }
    }

    public async getWhere(where: PdfType){
        try {
            const con = await MongoStore.connectDb()
            const query = con.collection('users')

            const mongoWhere = modifyIdKeysToMongo(where)

            const res = mongoWhere 
            ? await query.find({pdfs: mongoWhere}).toArray()
            : await query.find({pdfs: {}}).toArray()

            return revertKeyModification(res)
        } catch (error) {
            console.log('MONGO: FAILED TO GET PDFS')
            console.log(error)
            return []
        }
    }

    public async updateWhere(userId:string, where: PdfType, data: PdfType){
        try{
            const con = await MongoStore.connectDb()
            const query = con.collection('users')

            const getRes = await query.findOne({_id:userId})
            const pdfs = getRes && getRes.pdfs

            const newPdfs = pdfs.map(pdf=>{
                if(isMatch(pdf, where)) return {...pdf, ...data}
                return pdf
            })

            const res = await query.updateOne({_id:userId}, {$set:{pdfs:newPdfs}})
            return res.matchedCount.toString()

        }
        catch(e){
            console.log(e)
            throw new Error('FAILED TO  UPDATE PDF DATA')
            return null
        }
    }
}