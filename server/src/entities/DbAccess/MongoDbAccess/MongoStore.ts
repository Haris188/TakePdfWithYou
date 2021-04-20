
import {MongoClient} from 'mongodb'
import * as dotenv from 'dotenv'
import {map, mapValues, mapKeys, isObject} from 'lodash'

dotenv.config()

const uri = process.env.MONGO_URI

const connectDb = async ()=>{
    try {
        const connection = await MongoClient.connect(uri, {
            useUnifiedTopology: true
        })
        const db = connection.db('pdf')
        return {db, connection}
    } catch (error) {
        throw new Error('FAILED TO CONNECT TO MONGO DB')
    }
}

export const modifyIdKeysToMongo = (queryObject, revert?:boolean)=>{
    if(queryObject && (queryObject[revert? "_id": "id"])){
        const obj = mapKeys(queryObject, (value, key)=>{
            if (key === (revert? "_id": "id")) return (revert? "id": "_id")
            return key
        })
  
        const recObj = mapValues(obj, (value)=>{
            if(isObject(value)) return modifyIdKeysToMongo(value, revert)
            return value
        })
  
        return recObj
    }
    return queryObject
}

export const revertKeyModification = (res)=>{
    if(res && res.length>0){
        return res.map(val =>(modifyIdKeysToMongo(val, true)))
    }
    return res
}

export const disconnect = async (db)=>{
    db.close()
}


export default {
    connectDb
}