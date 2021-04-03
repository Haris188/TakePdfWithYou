
import {UserDataType} from '.'
import DbAccess from '../DbAccess'

export default class User{
    private userData

    constructor(userData:UserDataType){
        this.userData = userData
    }

    public static createFromData(userData:UserDataType){
        return new this(userData)
    }

    public async register(){
        return await DbAccess
        .Users.store(this.userData)
    }
}