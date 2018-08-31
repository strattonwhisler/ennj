const express = require('express');
const path = require('path');

const env = {
    port: 3000
};

const app = express();

app.use('/res', express.static(path.join(__dirname, 'res')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Test.html'));
});

app.listen(env.port, () => {
    console.log(`> Listening on port ${env.port}`);
});
