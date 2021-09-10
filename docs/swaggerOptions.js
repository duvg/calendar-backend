const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CalendarExpress API With Swagger",
      version: "0.1.0",
      description: "Simple crud",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "calendar",
        url: "https://calendar.com",
        email: "duviel7@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
  },
  apis: ["./docs/**/*.yaml"],
};

module.exports = options;
