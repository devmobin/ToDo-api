const createNewTask = async ({ body }, res, next) => {
  if (!body.title) {
    return res.status(400).send({ error: 'please enter valid title for task' })
  }

  next()
}

module.exports = {
  createNewTask
}
