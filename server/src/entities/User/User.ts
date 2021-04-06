
import {UserDataType} from '.'
import DbAccess from '../DbAccess'

export default class User{
    private userData:UserDataType

    constructor(userData:UserDataType){
        this.userData = userData
    }

    public static createFromData(userData:UserDataType){
        return new this(userData)
    }

    public static async getFromDbWithEmailAndPass(email: string, password:string){
        const res = await DbAccess.Users.get({email, password})
        return res.length > 0
        ? new this(res[0])
        : null
    }

    public async register(){
        return await DbAccess
        .Users.store(this.userData)
    }

    public getInfo(){
        return this.userData || null
    }

    public async changePassword(password){
        return await DbAccess
        .Users
        .updateWhere({id:this.userData.id}, {password})
    }

    public async addNewPdfInfo(pdfInfo){
        return await DbAccess
        .Users
        .appendPdf(pdfInfo)
    }
}