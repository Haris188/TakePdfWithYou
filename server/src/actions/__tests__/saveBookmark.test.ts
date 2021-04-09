import actions from "..";
import DbAccess from '../../entities/DbAccess'

const mockBookmarkData ={
    fileId: '1',
    bookmark: '44'
}

describe('Actions.saveBookmark', () => {
    it('should save bookmark page number to the provided pdf id', async ()=>{
        const res = await actions.saveBookmark(
            '1', 
            mockBookmarkData.fileId, 
            mockBookmarkData.bookmark
        )

        expect(res).toBe("1")
    })
});