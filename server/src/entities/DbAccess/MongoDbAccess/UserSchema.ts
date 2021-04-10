import {UserAccessSchema} from '../DbAccess'
import {dataStore} from '../TestDbAccess'
import { UserDataType } from '../../User'
import MongoStore, {
    modifyIdKeysToMongo, 
    revertKeyModification
} from './MongoStore'

export default class UserSchema implements UserAccessSchema{
    public resetDataStore = ()=>{
        dataStore.resetStore()
    }

    public async get(where?: UserDataType){
        try {
            const con = await MongoStore.connectDb()
            const query = con.collection('users')
            
            const mongoWhere = modifyIdKeysToMongo(where)

            const res = mongoWhere
            ? await query.find(mongoWhere).toArray()
            : await query.find().toArray()

            return revertKeyModification(res)
        } catch (error) {
            console.log(error)
            throw new Error('MONGO: FAILED TO RETRIEVE DATA')
        }
    }

    public async store(data: UserDataType){
        try {
            const con = await MongoStore.connectDb()
            const query = con.collection('users')
            const modifiedData = modifyIdKeysToMongo(data)

            const res = await query.insertOne(modifiedData)
            return {id: res.insertedId || null}
        } catch (error) {
            console.log(error)
            throw new Error('MONGO: FAILED TO STORE DATA')
        }
    }

    public async updateWhere(where, data){
        try {
            const con = await MongoStore.connectDb()
            const query = con.collection('users')
            const modifiedData = modifyIdKeysToMongo(data)
            const modifiedWhere = modifyIdKeysToMongo(where)

            const res = await query.updateMany(modifiedWhere, {$set:modifiedData})
            return res.modifiedCount.toString()
        } catch (error) {
            console.log(error)
            throw new Error('MONGO: FAILED TO UPDATE THE DATA')
        }
    }
}