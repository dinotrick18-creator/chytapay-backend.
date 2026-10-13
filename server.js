const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const CLIENT_ID = '5d1m2v6f0sp1qqpkb296lqlji'; //
const CLIENT_SECRET = 'chr64vqhcdiar17al2nrmspqbajjb2f8so3s6je4enjraqmg4uo
'; // Pega tu clave secreta de la captura

app.post('/api/crear-pago', (req, res) => {
  const amount = req.body.amount || req.body.precio || 1300;
  const playerId = req.body.playerId || req.body.id || 'SinID';

  res.json({ 
    success: true, 
    url: `https://chytapay.com.ar/checkout?amount=${amount}&id=${playerId}` 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
