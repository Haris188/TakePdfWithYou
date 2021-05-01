import actions from "..";

describe('actions.getUserWithId', () => {
    it('should get user with provided Id', async () => {
        const res:any = await actions.getUserWithId('1')
        expect(res.id).toBe('1')
    });
});