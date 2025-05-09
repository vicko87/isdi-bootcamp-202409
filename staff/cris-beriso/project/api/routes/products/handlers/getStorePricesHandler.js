import logic from '../../../logic/index.js'
import { createFunctionalHandler } from '../../helpers/index.js'

export default createFunctionalHandler((req, res) => {
  const { userId, params: { productId } } = req

  return logic.getStorePrices(userId, productId).then(storePrices => res.json(storePrices))
})