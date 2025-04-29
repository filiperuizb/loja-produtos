const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const usuarioRoutes = require('../backend/src/routes/usuarioRouter');
const { tratarErrosGlobais } = require('../backend/src/middleware/errorHandler');

app.use(express.json());
app.use(cors());
app.use('/usuarios', usuarioRoutes);
app.use(tratarErrosGlobais);

app.listen(port, () => {
    console.log(`Servidor está na porta ${port} => \nACESSE: http://localhost:${port}/`);
});
