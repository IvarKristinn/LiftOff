const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

// /api/planets returns list of all planets GET

// /api/planets/:planetID/coordinates return all coordinates for various locations within a planet GET

// /api/planets/:planetID/coordinates adds coordinates for a location within a planet POST



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));