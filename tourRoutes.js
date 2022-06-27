const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

router.param('id',tourController.check);

router
.route('/')
.get(tourController.getAlltours)
.post(tourController.checkBody ,tourController.createTours)

router.route('/:id')
.get(tourController.getTours)
.patch(tourController.updateTours)
.delete(tourController.deleteTours)

module.exports = router;