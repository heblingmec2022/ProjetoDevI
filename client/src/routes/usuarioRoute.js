const usuarioController = require("../controllers/usuarioController");
module.exports = (app) => {
  app.post("/usuario", usuarioController.post);
  app.put("/usuario/:id", usuarioController.put);
  app.delete("/usuario/:id", usuarioController.delete);
  app.get("/usuarios", usuarioController.get);
  app.get("/usuario/:id", usuarioController.getById);
};
