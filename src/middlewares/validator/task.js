const createNewTask = async ({ body }, res, next) => {
  if (!body.title && body.title.length > 4) {
    return res.status(400).send({ error: 'please enter valid title for task' })
  }

  next()
}

module.exports = {
  createNewTask
}
