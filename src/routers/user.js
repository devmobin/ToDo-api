const express = require('express')

const router = express.Router()

router.post('/user/signup', async (req, res) => {})

router.post('/user/login', async (req, res) => {})

router.get('/user/me', async (req, res) => {})

router.patch('/user/me', async (req, res) => {})

router.delete('/user/me', async (req, res) => {})

router.get('/user/logout', async (req, res) => {})

router.get('/user/logoutAll', async (req, res) => {})

module.exports = router
