const express = require('express')

const router = express.Router()

router.post('/new', async ({ body }, res) => {})

router.get('/me', async ({ body }, res) => {})

router.get('/:id', async ({ body }, res) => {})

router.patch('/:id', async ({ body }, res) => {})

router.delete('/:id', async ({ body }, res) => {})

module.exports = router
