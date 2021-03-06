const Hapi = require("@hapi/hapi");

const eleveniaAPI = require("./controllers/eleveniaAPI");
const localAPI = require("./controllers/localApi");

const server = Hapi.server({
  port: 8000,
  host: "localhost",
  routes: {
    cors: true,
  },
});

server.start();

console.log("Server running on %s", server.info.uri);
// Home
server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    const msg = "Oke Hidup";
    return { msg };
  },
});
// endpoint get from elevenia
server.route({
  method: "GET",
  path: "/indexData",
  handler: eleveniaAPI.indexData,
});
// endpoint local database
server.route({
  method: "GET",
  path: "/indexDataLocal",
  handler: localAPI.indexDataLocal,
});
server.route({
  method: "POST",
  path: "/addAllLocal",
  handler: localAPI.addAllLocal,
});
server.route({
  method: "DELETE",
  path: "/deleteLocal",
  handler: localAPI.deleteLocal,
});
server.route({
  method: "PUT",
  path: "/updateLocal",
  config: {
    cors: {
      origin: ["*"],
      additionalHeaders: ["cache-control", "x-requested-with"],
    },
  },
  handler: localAPI.updateLocal,
});
