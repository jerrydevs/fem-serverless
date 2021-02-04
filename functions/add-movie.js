const { query } = require('./util/hasura')

exports.handler = async (event) => {
  const { id, title, tagline, poster } = JSON.parse(event.body)

  const result = await query({
    query: `mutation AddOneMovie($id: String!, $poster: String!, $tagline: String!, $title: String!) {
      insert_movies_one(object: {id: $id, tagline: $tagline, poster: $poster, title: $title}) {
        id
        poster
        tagline
        title
      }
    }`,
    variables: { id, title, tagline, poster },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
