const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const CLIENT_ID = '5d1m2v6f0sp1qqpkb296lqlji';
const CLIENT_SECRET = 'chr64vqhcdiar17al2nrmspqbajjb2f8so3s6je4enjraqmg4uo';

app.post('/api/crear-pago', async (req, res) => {
  const amount = req.body.amount || req.body.precio || 1300;
  const playerId = req.body.playerId || req.body.id || 'SinID';

  try {
    // Petición a la API de ChytaPay para crear el cobro automático
    const response = await fetch('https://api.chytapay.com.ar/v1/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': CLIENT_ID,
        'x-client-secret': CLIENT_SECRET
      },
      body: JSON.stringify({
        amount: Number(amount),
        description: `Recarga Fedestore - ID: ${playerId}`,
        external_reference: playerId
      })
    });

    const data = await response.json();

    if (data.checkout_url || data.url) {
      res.json({ success: true, url: data.checkout_url || data.url });
    } else {
      res.json({ success: false, error: data });
    }
  } catch (error) {
    console.error('Error al generar checkout:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
