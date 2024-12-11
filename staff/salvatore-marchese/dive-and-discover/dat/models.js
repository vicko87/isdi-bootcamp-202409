import mongoose from 'mongoose'

const { Schema, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
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
        minLength: 8
    },
    role: {
        type: String,
        required: true,
        enum: ['diver', 'center'],
        default: 'diver'
    },
    certificate: {
        type: String,
    },
    insurance: {
        type: String,
    },
    address: {
        type: String,
        required: false,
    },
    openingHours: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        required: false,
    }
}, { versionKey: false });


const logBook = new Schema({
    diver: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    depth: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    weather: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    visibility: {
        type: String,
        required: true
    },
    waves: {
        type: String,
        required: true
    },
    wetSuit: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    tankSize: {
        type: String,
        required: true
    },
    tankBar: {
        type: Number,
        required: true
    },
    feeling: {
        type: String,
        required: true
    },
    diveCenter: {
        type: String,
        required: true
    },
    diveSite: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false,
        maxLength: 400
    },
}, { versionKey: false });


const place = new Schema({
    id: {
        type: String, // UUID represented as a string
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    photo: {
        type: String, // Storing image URL or path
        required: false
    },
    text: {
        type: String,
        required: false,
        maxLength: 600
    },
    location: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Location schema
        ref: 'Location',
        required: false
    },
}, { versionKey: false });


const point = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, { versionKey: false });

const centerLocation = new Schema({
    name: String,
    location: {
        type: point,
        required: true
    }
}, { versionKey: false });


const User = model('User', user)
const LogBook = model('Logbook', logBook)
const Place = model('Place', place)
const Point = model('Point', point)
const CenterLocation = model('CenterLocation', centerLocation)

export {
    User,
    LogBook,
    Place,
    Point,
    CenterLocation,
}