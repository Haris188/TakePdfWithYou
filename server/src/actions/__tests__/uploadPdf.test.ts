import actions from "..";
import FileAccess from '../../entities/FileAccess'
import DbAccess from '../../entities/DbAccess'

const mockFile = {
    meta:{
        userId: "1",
        fileId: '1',
        name: 'testfile.pdf'
    },
    buffer: []
}

describe('actions.uploadPdf', () => {
    it('should add pdf file to filestore on success', async () => {
        await actions.uploadPdf(mockFile)
    
        const res = await FileAccess
        .setDir(mockFile.meta.userId)
        .getFile(mockFile.meta.name)

        expect(res).toBeTruthy()
    });

    it('should add book id to user in datastore', async()=>{
        const res = await DbAccess
        .Users
        .get({id: mockFile.meta.userId})

        expect(res.length).toBeGreaterThan(0)

        const file = res[0].pdfs.find(file=>file.id == mockFile.meta.fileId)
        expect(file).toBeTruthy()
    })

    it('should return null on failure', async ()=>{
        actions.uploadPdf = jest.fn(async (file)=>null)
        const res = await actions.uploadPdf(mockFile)
        expect(res).toBeDefined()
        expect(res).toBeNull()
    })
});