const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const app = express();
app.use(history());
app.use(serveStatic(__dirname + "/static"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
