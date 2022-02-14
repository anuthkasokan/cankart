const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context) => {
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
