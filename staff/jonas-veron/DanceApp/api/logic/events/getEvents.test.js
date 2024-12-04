import "dotenv/config"
import db from "dat"
import getEvents from "./getEvents.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getEvents("674f5c3a4db9dce9cca8a42d")
        .then((events) => console.log(events))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
