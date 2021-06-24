const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

const PersonInShift = require("../../models/PersonInShift");

// @route       POST api/personInShifts
// @desc        Create or Update PersonInShifts
// @access      Private
router.post(
  "/",
  auth,
  [
    body("dateFrom", "Date from is required").not().isEmpty(),
    body("dateTo", "Date to is required").not().isEmpty(),
    body("date", "Date is required").not().isEmpty(),
    body("personNumber", "Person number is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, shiftId, dateFrom, dateTo, date, personNumber } = req.body;

    const personInShiftField = {};
    if (id) personInShiftField.id = id;
    personInShiftField.shiftId = shiftId;
    personInShiftField.dateFrom = dateFrom;
    personInShiftField.dateTo = dateTo;
    personInShiftField.date = date;
    personInShiftField.personNumber = personNumber;

    try {
      let personInShift = await PersonInShift.findOne({
        $and: [
          { shiftId: shiftId },
          { dateFrom: dateFrom },
          { dateTo: dateTo },
          { date: date },
        ],
      });

      if (id) {
        // Update
        personInShift = await PersonInShift.findOneAndUpdate(
          { _id: id },
          { $set: personInShiftField },
          { new: true }
        );
        return res.json(personInShift);
      }

      if (!personInShift) {
        personInShift = null;
      }

      if (personInShift) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Person In Shift already exists" }] });
      }

      // Create
      personInShift = new PersonInShift({
        shiftId,
        dateFrom,
        dateTo,
        date,
        personNumber,
      });

      await personInShift.save();

      res.json(personInShift);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route       GET api/personInShifts
// @desc        Get all PersonInShifts
// @access      Public
router.get("/", async (req, res) => {
  try {
    const personInShifts = await PersonInShift.find();
    res.json(personInShifts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/shiftRegisters
// @desc        Get Person in Shift by dateFrom and dateTo
// @access      Public
router.get("/:dateFrom/:dateTo", async (req, res) => {
  try {
    const dateFrom = req.params.dateFrom;
    const dateTo = req.params.dateTo;

    const personInShift = await PersonInShift.find({ $and: [{ dateFrom: dateFrom }, { dateTo: dateTo }] })
    .sort({ date: 1, shiftId: 1 });

    res.json(personInShift);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});

// @route       GET api/shiftRegisters
// @desc        Get Person in Shift by dateFrom and dateTo and date
// @access      Public
router.get("/:dateFrom/:dateTo/:date", async (req, res) => {
  try {
    const dateFrom = req.params.dateFrom;
    const dateTo = req.params.dateTo;
    const date = req.params.date;

    const personInShift = await PersonInShift.find({ $and: [{ dateFrom: dateFrom }, { dateTo: dateTo }, { date: date }] })
      .sort({ date: 1, shiftId: 1 });

    res.json(personInShift);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});

// @route       GET api/personInShifts/:shiftId
// @desc        Get PersonInShift by ID
// @access      Private
router.get("/:shiftId", auth, async (req, res) => {
  const shiftId = req.params.shiftId;
  try {
    const personInShift = await PersonInShift.findOne({ shiftId });

    if (!personInShift) {
      return res.status(404).json({ msg: "Person In Shift not found" });
    }

    res.json(personInShift);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Person In Shift not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/personInShift/:id
// @desc        Delete a PersonInShift
// @access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const personInShift = await PersonInShift.findById(req.params.id);

    if (!personInShift) {
      return res.status(404).json({ msg: "Person In Shift not found" });
    }

    await personInShift.remove();

    res.json({ msg: "Person In Shift removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Person In Shift not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
