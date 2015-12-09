import { handleMessage, sendInventoryMessage } from '../sendMessage'

export default function buyItem(req, res, next) {
  if (typeof req.body.quantity === 'undefined' || req.body.quantity === null) {
    res.send(new Restify.errors.BadRequestError('No quantity given'));
    return next()
  }
  if (typeof req.body.price === 'undefined' || req.body.price === null) {
    res.send(new Restify.errors.BadRequestError('No price given'));
    return next()
  }

  sendInventoryMessage(
    req.params.id
    ,req.body.quantity
    ,req.body.price
    ,handleMessage(res)
  )
}
