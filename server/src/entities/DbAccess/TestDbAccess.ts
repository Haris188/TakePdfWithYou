
import { UserDataType, mockUserData } from '../User'
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
}

const TestDbAccess: DbAccess = {
    Users: new UserSchema()
}

export default TestDbAccess