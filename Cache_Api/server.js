const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.get('/', (req,resp)=>{
    resp.sendFile(path.join(__dirname, 'views/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});