const express = require('express')

const router = express.Router()

router.post('/task/new', async (req, res) => {})

router.get('/task/user', async (req, res) => {})

router.get('/task/:id', async (req, res) => {})

router.patch('/task/:id', async (req, res) => {})

router.delete('/task/:id', async (req, res) => {})

module.exports = router
