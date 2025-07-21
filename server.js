const http = require('http');
const fs = require('fs');
const path = require('path');
const Busboy = require('busboy'); 

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const server = http.createServer((req, res) => {

    // CORS preflight handling
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        return res.end();
    }

    // File upload handler
    if (req.method === 'POST' && req.url === '/upload') {
        const busboy = Busboy({ headers: req.headers }); 
        let uploadPath = '';

        busboy.on('file', (fieldname, file, info) => {
            const { filename } = info;
            console.log(`Uploading: ${filename}`);
            const saveTo = path.join(uploadsDir, path.basename(filename));
            uploadPath = saveTo;
            const writeStream = fs.createWriteStream(saveTo)
            file.pipe(writeStream);

            writeStream.on('error', (error)=>{
                console.log('Error writing', error)
                res.writeHead(500)
                res.end('File upload failed')
            })
        });

        busboy.on('finish', () => {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            res.end('File uploaded');
        });

        req.pipe(busboy);
        
    } else {
        res.writeHead(404, {
            'Access-Control-Allow-Origin': '*',
        });
        res.end();
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
