import Restify from 'restify'
import { handleMessage, sendInventoryMessage } from '../sendMessage'

export default function sellItem(req, res, next) {
  if (typeof req.body.quantity === 'undefined') {
    res.send(new Restify.errors.BadRequestError('No quantity given'));
    return next()
  }
  if (typeof req.body.price === 'undefined') {
    res.send(new Restify.errors.BadRequestError('No price given'));
    return next()
  }

  sendInventoryMessage(
    req.params.id
    ,-req.body.quantity
    ,req.body.price
    ,handleMessage(res)
  )
}
