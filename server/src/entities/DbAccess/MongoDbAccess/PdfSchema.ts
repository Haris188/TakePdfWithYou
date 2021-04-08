import {PdfAccessSchema} from '../DbAccess'
import {dataStore} from '../TestDbAccess'
import { PdfType } from '../../Pdf/FileDataType'
import {isMatch} from 'lodash'



export default class PdfSchema implements PdfAccessSchema{
    public async appendPdf(pdfInfo){
        const updated = dataStore.getStore().users.map(user=>{
            if(user.id == pdfInfo.userId){
                user.pdfs.push({id: pdfInfo.id, downloadLink: pdfInfo.downloadLink})
            }
            return user
        })
        dataStore.setStore({...dataStore.getStore(), users: updated})
        return {id: pdfInfo.id}
    }

    public async getWhere(where: PdfType){
        const users = dataStore.getStore().users
        if(where){
            // console.log(users)
            return users.map(user=>(
                user.pdfs.find(pdf=>isMatch(pdf, where))
            ))
        }
        return []
    }

    public async updateWhere(where: PdfType, data: PdfType){
        try{
            const users = dataStore.getStore().users
            let found
            if(where){
                const pdfMatch = users.map(user=>{
                    const m = user.pdfs.map(pdf=>{
                        if(isMatch(pdf, where)){
                            return {...pdf, ...data}
                            found = pdf.id
                        }
                        return pdf
                    })
                    user.pdfs = m
                    return user
                })
                dataStore.setStore({...dataStore.getStore(), users: pdfMatch})
            }
            return found ? this.getWhere({id: found}) : []
        }
        catch(e){
            console.log(e)
            throw new Error('FAILED TO  UPDATE PDF DATA')
        }
    }
}