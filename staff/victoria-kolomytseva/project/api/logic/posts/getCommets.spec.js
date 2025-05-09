import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post, Comment } from 'dat'
import { errors } from 'com'

const { NotFoundError, ValidationError, SystemError } = errors

import getComments from './getComments.js'

debugger

describe('getComments', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Pedro Sanchez', email: 'pedro@sanchez.com', password: '123123123' })
        const comment = new Comment({ author: user.id, text: "hello comment" })
        const post = new Post({
            author: user.id, image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600", whatHappened: 'lost', petType: 'cat', petGender: 'female', text: 'We have lost our Pug', location: {
                type: 'Point',
                "coordinates": [
                    41.5064041,
                    2.3913883
                ],
                "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                "province": "Barcelona"
            }, comments: [comment]
        })


        return Promise.all([user.save(), comment.save(), post.save()])
            .then(([user, comment, post]) =>
                getComments(user.id, post.id, 'hello comment')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post).to.exist
                        expect(post.comments).to.have.lengthOf(1)

                        const [comment] = post.comments
                        expect(comment.author.toString()).to.equal(user.id)
                        expect(comment.text).to.equal('hello comment')
                        expect(comment.date).to.be.instanceOf(Date)
                    })
            )
    })

    it('fails on non-existing user', () =>
        expect(
            getComments('012345678901234567890123', '012345678901234567890123', 'hello world')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'pedro Loco', email: 'pedro@loco.com', password: '123123123' })
                .then(user =>
                    getComments(user.id, '012345678901234567890123', 'hello world')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    after(() => db.disconnect())
})
