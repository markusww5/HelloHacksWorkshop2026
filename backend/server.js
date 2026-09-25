const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Look up a Pokémon type by its ID or name.
// Example: http://localhost:3000/api/type/fire
app.get('/api/type/:idOrName', async (req, res) => {
  const { idOrName } = req.params;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/type/${encodeURIComponent(idOrName)}/`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json({
      half_damage_to: data.damage_relations.half_damage_to.map(
        (type) => type.name
      ),
      double_damage_from: data.damage_relations.double_damage_from.map(
        (type) => type.name
      ),
    });
  } catch (error) {
    console.error('Failed to fetch Pokémon type:', error);
    res.status(502).json({ error: 'Could not reach the Pokémon API.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
