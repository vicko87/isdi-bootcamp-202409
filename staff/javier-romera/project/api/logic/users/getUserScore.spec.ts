import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import bcrypt from 'bcryptjs'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError } = errors

import getUserScore from './getUserScore.js'

describe('getUserScore', () => {
    before(() => db.connect(process.env.ALLPIECE_URL_TEST!))

    beforeEach(() => User.deleteMany())

    it('succeeds on existing user', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10), score: 3000 })

        const score = await getUserScore(user.id, user.id)

        expect(score).to.equal(3000)
    })

    it('fails on non-existing user', () =>
        expect(
            getUserScore('012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing target-user', () =>
        expect(
            User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })
                .then(user => getUserScore(user.id, '012345678901234567890123'))
        ).to.be.rejectedWith(NotFoundError, /^target user not found$/)
    )

    it('fails on non-valid userId length', () =>
        expect(() =>
            getUserScore('0123', '')
        ).to.throw(ValidationError, /^Invalid userId length$/)
    )

    it('fails on non-valid targetUserId length', async () => {
        const user = await User.create({ email: 'javi@gmail.com', username: 'javi', password: bcrypt.hashSync('123123123', 10) })

        expect(() =>
            getUserScore(user.id, '0123')
        ).to.throw(ValidationError, /^Invalid targetUserId length$/)
    })

    after(() => db.disconnect())
})