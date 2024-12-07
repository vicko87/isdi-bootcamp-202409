import { Router } from 'express'
import authorizationHandler from '../helpers/authorizationHandler.js'
import jsonBodyParser from '../helpers/jsonBodyParser.js'

import {
    addCommentsHandler,
    createRecommendHandler,
    deleteRecommendHandler,
    downVoteHandler,
    getCommentsHandler,
    getRecommendHandler,
    removeCommentHandler,
    upVoteHandler
} from './handlers/index.js'

const recommendRouter = Router()

recommendRouter.post('/', jsonBodyParser, authorizationHandler, createRecommendHandler)
recommendRouter.get('/', authorizationHandler, getRecommendHandler)
recommendRouter.delete('/:recommendId', authorizationHandler, deleteRecommendHandler)
recommendRouter.patch('/:recommendId/upVotes', authorizationHandler, upVoteHandler)
recommendRouter.patch('/:recommendId/downVotes', authorizationHandler, downVoteHandler)
recommendRouter.post('/:recommendId/comments', authorizationHandler, jsonBodyParser, addCommentsHandler)
recommendRouter.delete('/:recommmendId/comments/:commentId', authorizationHandler, removeCommentHandler)
recommendRouter.get('/:recommendId/comments', authorizationHandler, getCommentsHandler)


export default recommendRouter