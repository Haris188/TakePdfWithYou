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
        const con = await MongoStore.connectDb()
        try {
            const query = con.db.collection('users')
            
            const mongoWhere = modifyIdKeysToMongo(where)

            const res = mongoWhere
            ? await query.find(mongoWhere).toArray()
            : await query.find().toArray()

            return revertKeyModification(res)
        } catch (error) {
            console.log(error)
            throw new Error('MONGO: FAILED TO RETRIEVE DATA')
        }
        finally {
            con.connection.close()
        }
    }

    public async store(data: UserDataType){
        const con = await MongoStore.connectDb()
        try {
            const query = con.db.collection('users')
            const modifiedData = modifyIdKeysToMongo(data)

            const res = await query.insertOne(modifiedData)
            return {id: res.insertedId || null}
        } catch (error) {
            console.log(error)
            throw new Error('MONGO: FAILED TO STORE DATA')
        }
        finally {
            con.connection.close()
        }
    }

    public async updateWhere(where, data){
        const con = await MongoStore.connectDb()
        try {
            const query = con.db.collection('users')
            const modifiedData = modifyIdKeysToMongo(data)
            const modifiedWhere = modifyIdKeysToMongo(where)

            const res = await query.updateMany(modifiedWhere, {$set:modifiedData})
            return res.modifiedCount.toString()
        } catch (error) {
            console.log(error)
            throw new Error('MONGO: FAILED TO UPDATE THE DATA')
        }
        finally {
            con.connection.close()
        }
    }
}