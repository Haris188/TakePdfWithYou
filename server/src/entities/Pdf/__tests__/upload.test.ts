import Pdf from "..";

const mockFile = {
    meta:{
        userId: '1',
        fileId: '1',
        filename: 'hell'
    },
    file:{}
}

describe('Pdf.upload', () => {
    it('should return object with downloadLink and id', async()=>{
        const pdf = Pdf.createFromData(mockFile)
        const res = await pdf.upload()
        
        expect(res).toBeDefined()
        expect(res).toMatchObject({
            downloadLink: expect.any(String)
        })
    })
});