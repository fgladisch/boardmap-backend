import { Location } from '../models'
import ServerError from '../util/server-error'

export async function create(req, res, next) {

  try {

    const { name, latitude, longitude } = req.body

    const location = await Location.create({ name, latitude, longitude })

    res.send(location.toJSON())

  } catch (err) {
    next(err)
  }

}

export async function update(req, res, next) {

  try {

    const id = Number(req.params.id)
    const { name, latitude, longitude } = req.body

    let location = await Location.findById(id)

    if (!location) {
      throw new ServerError(404, 'Location not found.')
    }

    location = Object.assign(location, { name, latitude, longitude })
    location = await location.save()

    res.send(location.toJSON())

  } catch (err) {
    next(err)
  }

}

export async function destroy(req, res, next) {

  try {

    const id = Number(req.params.id)

    await Location.destroy({ where: { id } })

    res.status(204).end()

  } catch (err) {
    next(err)
  }

}

export async function findOne(req, res, next) {

  try {

    const id = Number(req.params.id)

    const location = await Location.findById(id)

    if (!location) {
      throw new ServerError(404, 'Location not found.')
    }

    res.send(location.toJSON())

  } catch (err) {
    next(err)
  }

}

export async function findAll(req, res, next) {

  try {

    const locations = await Location.findAll()

    res.send(locations)

  } catch (err) {
    next(err)
  }

}
