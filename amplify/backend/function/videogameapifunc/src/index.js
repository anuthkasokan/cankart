/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  //return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
  const videogameId = event.pathParameters.videogameId;
  const videogamelist = {
    videogameId: videogameId,
    videogamename: "videogame " + videogameId,
  };
  const response = {
    statusCode: 200,

    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(videogamelist),
  };
  return response;
};
