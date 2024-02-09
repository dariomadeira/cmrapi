const express = require("express");
const app = express();
const path = require("path");

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// ej. http://localhost:3000/md/4/164335241/720p/raw
// ej. http://localhost:3000/mf/9/276033946/720p/hd
app.get("/:saga/:cap/:id/:quality/:sub", function (req, res) {
  // Extrae los parámetros de la URL
  const saga = req.params.saga;
  const cap = req.params.cap;
  const id = req.params.id;
  const quality = req.params.quality;
  const sub = req.params.sub;

  // Redirige al usuario a la página index.html con los parámetros de la URL como parámetros de consulta
  res.redirect(`/index.html?saga=${saga}&cap=${cap}&id=${id}&quality=${quality}&sub=${sub}`);
});

app.listen(3000, function () {
  console.log("App escuchando en el puerto 3000");
});
