import { model, Schema } from 'mongoose'

const condition = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['equal', 'greater than equal', 'lower than equal']
    },
    property: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true,
        enum: ['row', 'column']
    },
    index: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

const Condition = model('Condition', condition, 'conditions')

export default Condition