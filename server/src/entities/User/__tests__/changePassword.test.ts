import User from ".."

const userId = '1'
const password = 'testpass'

describe('User.changePassword', ()=>{
    it('should return id of the user on success', async ()=>{
        const user = User.createFromData({id: userId, password})
        const res = await user.changePassword(password)

        expect(res).toBeDefined()
        expect(res).toMatchObject({id:userId})
    })
})