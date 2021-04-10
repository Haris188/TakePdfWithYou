(global as any).XMLHttpRequest = require('xhr2');
import FileAccess from '../FileAccess'
import FileDataType from '../../Pdf/FileDataType'
import config from './config'
import firebase from 'firebase'
import 'firebase/storage'

firebase.initializeApp(config)

export default class FireStoreAccess implements FileAccess{
    private path: string

    constructor(path:string){
        this.path = path
    }

    public static setDir(path:string){
        return new this(path)
    }

    public async uploadFile(file: FileDataType){
        try {
            const storeRes = await firebase.storage().ref(`${this.path}/${file.meta.filename}`)
            .put(file.file.buffer, {contentType: file.meta.mimeType})

            if(storeRes.bytesTransferred > 0){
                const downloadLink = await firebase.storage().ref(`${this.path}/${file.meta.filename}`)
                .getDownloadURL()
                
                return {downloadLink}
            }
            return null
        } catch (error) {
            throw new Error('FIREBASE: FAILED TO UPLOAD FILE')
        }
    }
}