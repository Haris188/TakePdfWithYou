import actions from "..";

const userId = '1'

describe('actions.getPdfInfo', () => {
    it('should get all pdf info from current user', async () => {
        const res = await actions.getPdfInfo(userId)

        expect(res).toBeDefined()
        expect(res).toBeInstanceOf(Array)
    });
});