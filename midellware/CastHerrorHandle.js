export const castHerror = (error, request, response, next) => {
  console.error(error)
  console.log(error.name)
  if (error.name === 'CastError') {
    response.status(400).send({ message: 'ha introducido incorrectamente el id' }).end()
  } else {
    response.status(500).end()
  }
}
