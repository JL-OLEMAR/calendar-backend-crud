import { response } from 'express'
import { EventModel } from '../models/event.js'

const getEvents = async (req, res = response) => {
  const events = await EventModel.find().populate('user', 'name')

  res.json({
    ok: true,
    events
  })
}

const createEvent = async (req, res = response) => {
  const event = new EventModel(req.body)

  try {
    event.user = req.uid // get it from jwt

    const eventSaved = await event.save()

    res.json({
      ok: true,
      event: eventSaved
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator.'
    })
  }
}

const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'updateEvent'
  })
}

const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'deleteEvent'
  })
}

export { createEvent, deleteEvent, getEvents, updateEvent }
