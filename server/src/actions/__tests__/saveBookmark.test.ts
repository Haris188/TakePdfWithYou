import actions from "..";
import DbAccess from '../../entities/DbAccess'

const mockBookmarkData ={
    fileId: '1',
    bookmark: '44'
}

describe('Actions.saveBookmark', () => {
    it('should save bookmark page number to the provided pdf id', async ()=>{
        await actions.saveBookmark(mockBookmarkData.fileId, mockBookmarkData.bookmark)

        const res = await DbAccess.Pdfs.getWhere({id: mockBookmarkData.fileId})
        expect(res[0].bookmark).toBe(mockBookmarkData.bookmark)
    })
});