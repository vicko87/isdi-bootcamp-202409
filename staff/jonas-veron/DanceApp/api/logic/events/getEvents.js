import { Event, User } from "dat"
import { validate, errors } from "com"

const { SystemError, NotFoundError } = errors

export default async (userId) => {
  validate.id(userId, "userId")
  debugger
  try {
    const [user, events] = await Promise.all([
      User.findById(userId).lean(),
      Event.find().populate("author", "name").sort({ date: -1 }).lean(),
    ])

    if (!user) {
      throw new Error("User not found")
    }

    debugger
    return events.map((event) => ({
      id: event._id.toString(),
      files: event.files,
      eventType: event.eventType,
      text: event.text,
      eventDate: event.eventDate,
      date: event.date,
      location: {
        address: event.location.address,
        coordinates: event.location.coordinates,
      },
      author: {
        id: event.author._id.toString(),
        name: event.author.name,
      },
      likes: event.likes.length,
      comments: event.comments.length,
      favoriteByUser: user.favorites.some(
        (favoriteId) => favoriteId.toString() === event._id.toString()
      ),
      likedByUser: event.likes.some(
        (likeId) => likeId.toString() === userId.toString()
      ),
    }))
  } catch (error) {
    throw new SystemError(error.message)
  }
}
