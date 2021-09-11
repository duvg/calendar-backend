const { response } = require("express");
const EventModel = require("../models/EventModel");
const { validationResult } = require("express-validator");

// get all users
const getEvents = async (req, res = response) => {
  const calendarEvents = await EventModel.find().populate("user", "name");
  res.status(200).json({
    ok: true,
    data: calendarEvents,
  });
};

const getEvent = async (req, res = response) => {
  const eventId = req.params.id;

  try {
    const calendarEvent = await EventModel.findById(eventId);
    const uid = req.uid;

    if (!calendarEvent) {
      return res.status(404).json({
        ok: false,
        msg: "Calendar event not exists",
      });
    }

    if (calendarEvent.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You aren't owner of this calendar event",
      });
    }

    return res.status(200).json({
      ok: true,
      data: calendarEvent,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
    });
  }
};

const createEvent = async (req, res = response) => {
  const calendarEvent = new EventModel(req.body);

  try {
    calendarEvent.user = req.uid;
    const newEvent = await calendarEvent.save();

    res.status(201).json({
      ok: true,
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id; // calendar event id
  const uid = req.uid;

  try {
    const calendarEvent = await EventModel.findById(eventId);

    if (!calendarEvent) {
      return res.status(404).json({
        ok: false,
        msg: "Calendar event not exists",
      });
    }

    // check if user is owner
    if (calendarEvent.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You aren't owner of this calendar event",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await EventModel.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      data: eventUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const calendarEvent = await EventModel.findById(eventId);

    if (!calendarEvent) {
      return res.status(404).json({
        ok: false,
        msg: "Event not exists",
      });
    }

    if (calendarEvent.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You aren't owner of this calendar event",
      });
    }

    await EventModel.findByIdAndDelete(eventId);

    return res.status(200).json({
      ok: true,
      msg: "Event deleted",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
