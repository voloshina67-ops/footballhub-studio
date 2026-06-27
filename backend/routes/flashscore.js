const express = require('express');
const router = express.Router();

router.get('/:eventId', async (req, res) => {
  try {
    const response = await fetch(
      `https://35.ds.lsapp.eu/pq_graphql?_hash=dlie2&eventId=${req.params.eventId}&projectId=35`
    );

    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
