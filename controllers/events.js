import { response } from 'express'
import { EventModel } from '../models/event.js'

const getEvents = async (req, res = response) => {
  const events = await EventModel.find().populate('user', 'name')

  return res.json({
    ok: true,
    events
  })
}

const createEvent = async (req, res = response) => {
  const event = new EventModel(req.body)

  try {
    event.user = req.uid // get it from jwt

    const eventSaved = await event.save()

    return res.json({
      ok: true,
      event: eventSaved
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator.'
    })
  }
}

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id
  const userUid = req.uid

  try {
    const event = await EventModel.findById(eventId)

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist for that id.'
      })
    }

    if (event.user.toString() !== userUid) {
      return res.status(401).json({
        ok: false,
        msg: "You don't have privilege to edit this event"
      })
    }

    const newUser = { ...req.body, user: userUid }
    const updatedEvent = await EventModel.findByIdAndUpdate(eventId, newUser, {
      new: true
    })

    return res.json({
      ok: true,
      event: updatedEvent
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator.'
    })
  }
}

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id
  const userUid = req.uid

  try {
    const event = await EventModel.findById(eventId)

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist for that id.'
      })
    }

    if (event.user.toString() !== userUid) {
      return res.status(401).json({
        ok: false,
        msg: "You don't have privilege to delete this event"
      })
    }

    await EventModel.findByIdAndDelete(eventId)

    return res.json({
      ok: true,
      msg: 'Deleted event'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator.'
    })
  }
}

export { createEvent, deleteEvent, getEvents, updateEvent }
