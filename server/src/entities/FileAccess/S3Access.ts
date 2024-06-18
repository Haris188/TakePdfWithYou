import FileAccess from './FileAccess'
import FileDataType from '../Pdf/FileDataType'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const s3Client = new S3Client({
    region: 'ca-central-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export default class S3Access implements FileAccess {
    private path: string

    constructor(path: string) {
        this.path = path
    }

    public static setDir(path: string) {
        return new this(path)
    }

    public async uploadFile(file: FileDataType) {
        let url = null
        const uploadParams = {
            Bucket: 'bankcapy',
            Key: `${this.path}/${file.meta.filename}`, // the path in the bucket including the folder
            Body: file.file.buffer,
            ContentType: file.meta.mimeType
        }

        try {
            await s3Client.send(new PutObjectCommand(uploadParams));
            console.log("File uploaded successfully");

            url = await getSignedUrl(s3Client, new GetObjectCommand(uploadParams), { expiresIn: 3600 });
            console.log("Pre-signed URL:", url);
        } catch (err) {
            console.log("Error", err);
        }

        return { downloadLink: url }
    }
}