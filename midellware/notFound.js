export const notFound = (request, response, next) => {
  console.log(request.body)
  response.status(404)
}
