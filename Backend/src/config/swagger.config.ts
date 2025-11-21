const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "API – Sistema de Reservas",
    version: "1.0.0",
    description: "Documentación automática con Swagger",
  },

  servers: [
    {
      url: "http://localhost:3000",
    },
  ],

  paths: {
    "/api/clientes": {
      get: {
        summary: "Obtener todos los clientes",
        tags: ["Clientes"],
        responses: {
          200: {
            description: "Lista de clientes",
          },
        },
      },

      post: {
        summary: "Crear un cliente",
        tags: ["Clientes"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nombre: { type: "string" },
                  email: { type: "string" },
                },
                required: ["nombre", "email"],
              },
            },
          },
        },
        responses: {
          201: { description: "Cliente creado" },
        },
      },
    },

    "/api/clientes/{id}": {
      get: {
        summary: "Obtener cliente por ID",
        tags: ["Clientes"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: { 200: { description: "Cliente encontrado" } },
      },

      put: {
        summary: "Actualizar cliente",
        tags: ["Clientes"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nombre: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Cliente actualizado" } },
      },

      delete: {
        summary: "Eliminar cliente",
        tags: ["Clientes"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: { 200: { description: "Cliente eliminado" } },
      },
    },
  },
};

export default swaggerConfig;
