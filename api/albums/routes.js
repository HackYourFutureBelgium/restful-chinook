const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/count', controllers.countAll);

router.get('/pagination/:page', controllers.getPageByNo);

router.get('/:id', controllers.getOne);

router.post('/', controllers.create);

router.put('/:id', controllers.update);

router.delete('/:id', controllers.delete);

module.exports = router;