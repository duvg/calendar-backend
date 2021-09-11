/**
 * Event Routes
 * host + /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");

const {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

// Middlewares
const { validateFields } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.use(validateJWT);

// Get event
router.get("/:id", getEvent);

// Get all events
router.get("/", getEvents);

// Create a new calendar event
router.post(
  "/",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
    validateFields,
  ],
  createEvent
);

// Update event
router.put(
  "/:id",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
    validateFields,
  ],
  updateEvent
);

// Delete event
router.delete("/:id", deleteEvent);

module.exports = router;
