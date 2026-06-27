const express = require('express');
const router = express.Router();

router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    const response = await fetch(
      `https://35.ds.lsapp.eu/pq_graphql?_hash=dlie2&eventId=${eventId}&projectId=35`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
