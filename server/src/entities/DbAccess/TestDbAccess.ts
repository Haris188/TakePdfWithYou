
import User, { UserDataType, mockUserData } from '../User'
import DbAccess, {PdfAccessSchema, UserAccessSchema} from './DbAccess'
import {isMatch} from 'lodash'
import { PdfType } from '../Pdf/FileDataType'
import datastore from '.'

export type UserStoreType = Array<UserDataType>

export interface StoreType {
    users: UserStoreType
}

const initialStore = {
    users: [
        mockUserData.def
    ]
}

class DataStore {
    private store:StoreType = initialStore

    public getStore(){
        return this.store
    }

    public setStore(newStore){
        this.store = newStore
    }

    public resetStore(){
        this.store = initialStore
    }
}

export const dataStore = new DataStore()

class UserSchema implements UserAccessSchema{

    public resetDataStore = ()=>{
        dataStore.resetStore()
    }

    public async get(where: UserDataType){
        const users = dataStore.getStore().users
        if(where){
            return users.filter(user=>(
                isMatch(user, where)
            ))
        }
        return users
    }

    public async store(data: UserDataType){
        const users = dataStore.getStore().users
        users.push(data)
        dataStore.setStore({...dataStore.getStore(), users})
        return {id: dataStore.getStore().users[dataStore.getStore().users.length-1].id}
    }

    public async updateWhere(where, data){
        let updatedLast = null
        const newUsers = dataStore.getStore().users.map(user=>{
            if(isMatch(user, where)){
                updatedLast = user.id
                return {...user , ...data}
            }
            return user
        })
        dataStore.setStore({...dataStore.getStore(), users: newUsers})
        return {id:updatedLast}
    }
}

class Pdf implements PdfAccessSchema{

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

const TestDbAccess: DbAccess = {
    Users: new UserSchema(),
    Pdfs: new Pdf()
}

export default TestDbAccess