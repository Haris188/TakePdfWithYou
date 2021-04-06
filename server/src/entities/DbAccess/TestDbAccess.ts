
import User, { UserDataType, mockUserData } from '../User'
import DbAccess, {UserAccessSchema} from './DbAccess'
import {isMatch} from 'lodash'

interface UserStoreType {
    users: UserDataType[]
}

class UserSchema implements UserAccessSchema{
    private dataStore:UserStoreType = {
        users: [
            mockUserData.def
        ]
    }

    public resetDataStore = ()=>{
        this.dataStore = {
            users: [
                mockUserData.def
            ]
        }
    }

    public async get(where: UserDataType){
        return this.dataStore.users
    }

    public async store(data: UserDataType){
        this.dataStore.users.push(data)
        return {id: this.dataStore.users[this.dataStore.users.length-1].id}
    }

    public async updateWhere(where, data){
        let updatedLast = null
        const newUsers = this.dataStore.users.map(user=>{
            if(isMatch(user, where)){
                updatedLast = user.id
                return {...user , ...data}
            }
            return user
        })
        this.dataStore.users = newUsers
        return {id:updatedLast}
    }

    public async appendPdf(pdfInfo){
        const updated = this.dataStore.users.map(user=>{
            if(user.id == pdfInfo.userId){
                user.pdfs.push({id: pdfInfo.id, downloadLink: pdfInfo.downloadLink})
            }
            return user
        })
        this.dataStore.users = updated
        return {id: pdfInfo.id}
    }
}

const TestDbAccess: DbAccess = {
    Users: new UserSchema()
}

export default TestDbAccess