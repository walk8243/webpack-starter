const path = require('path');
const express = require('express');

const baseDir = path.resolve(__dirname, './dist');

express()
	.use(express.static(baseDir))
	.get('/*', (req, res) => { res.sendFile(path.resolve(baseDir, './index.html')); })
	.listen(process.env.PORT || 3000);
