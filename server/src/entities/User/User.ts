
import {UserDataType} from '.'
import DbAccess from '../DbAccess'
import * as bcrypt from 'bcrypt'

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

    public static async getWhere(where){
        const res = await DbAccess.Users.get(where)
        return res.length > 0
        ? new this(res[0])
        : null
    }

    private async hashPassword(){
        const hashed = await bcrypt.hash(
            this.userData.password,
            10
        )

        this.userData.password = hashed
    }

    public async register(){
        await this.hashPassword()

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
        .Pdfs
        .appendPdf(pdfInfo, this.userData.id)
    }

    public async getAllPdfs(){
        const res = await DbAccess.Users.get({id: this.userData.id})
        return res && res[0] ? res[0].pdfs : []
    }

    public async getFromDb(){
        const res = await DbAccess.Users.get({id:this.userData.id})
        return res[0]
    }
}