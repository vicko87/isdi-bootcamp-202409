import { useState, useEffect } from "react"
import logic from "../../../logic"
import { getElapsedTime } from "../../../util"
import {
  likeIcon,
  likedIcon,
  commentIcon,
  shareIcon,
  locationIcon,
  starIcon,
} from "./../../../assets/index.js"

export default function Event({ event, onLiked }) {
  console.log("Post -> render")

  const {
    id,
    author,
    files,
    text,
    eventDate,
    date,
    location,
    likedByUser,
    likes,
    comments,
  } = event
  const [isLiked, setIsLiked] = useState(event.likedByUser)

  useEffect(() => {
    setIsLiked(event.likedByUser) // Actualiza el estado si `event.liked` cambia
  }, [event.likedByUser])

  const handleLikeClick = () => {
    setIsLiked(!isLiked)

    try {
      logic
        .toggleLikeEvent(id)
        .then(onLiked)
        .catch((error) => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  return (
    <article className="bg-transparent text-white shadow-md rounded-lg p-1 mb-6 max-w-xl mx-auto">
      {/* <h4>{author.name}</h4> */}
      <div className="flex items-center mb-2">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-white font-bold">
            {author.name[0]}
          </div>
        </div>
        <div className="ml-2">
          <h4 className="font-bold text-white">{author.name}</h4>
          <p className="text-xs ml-2 italic">{location.address}</p>
        </div>
      </div>

      <div className="mb-2">
        <img src={files[0]} className="w-full h-auto rounded-lg object-cover" />
        <div className="flex items-center justify-between mt-0.5 mr-3 ml-3">
          <div className="flex space-x-8">
            <img
              src={isLiked ? likedIcon : likeIcon}
              alt="Like"
              className="w-6 h-6 cursor-pointer"
              onClick={handleLikeClick}
            />
            <span>{likes}</span>

            <img
              src={commentIcon}
              alt="Comment"
              className="w-6 h-6 cursor-pointer"
            />
            <img
              src={shareIcon}
              alt="Share"
              className="w-6 h-6 cursor-pointer"
            />
            <img
              src={locationIcon}
              alt="Location"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <img
            src={starIcon}
            alt="Favorite"
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        <time className="flex justify-end text-xs">
          {getElapsedTime(eventDate)}
        </time>
      </div>
      <p className="text-white mb-4 text-start">
        <b>{author.name} </b>
        {text}
      </p>
      <time>{getElapsedTime(date)}</time>
    </article>
  )
}
