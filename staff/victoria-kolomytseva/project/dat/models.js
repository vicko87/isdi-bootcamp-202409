import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose;

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    surname: {
        type: String,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    postal_code: {
        type: String,
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxLength: 200
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [comment]
}, { versionKey: false })


const comment = new Schema({

    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
        maxLength: 200
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})


const User = model('User', user)
const Post = model('Post', post)
const Comment = model('Comment', comment)

export {
    User,
    Post,
    Comment
}