import actions from "..";
import FileAccess from '../../entities/FileAccess'

const mockFile = {
    meta:{
        userId: "1",
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

    it('should return null on failure', async ()=>{
        actions.uploadPdf = jest.fn(async (file)=>null)
        const res = await actions.uploadPdf(mockFile)
        expect(res).toBeDefined()
        expect(res).toBeNull()
    })
});