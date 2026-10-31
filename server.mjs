import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import handler from './api/index.js';
process.env.LOCAL_DATA='1';
const publicDir=resolve('public');
http.createServer(async(req,res)=>{const path=new URL(req.url,'http://localhost').pathname;const file=resolve(publicDir,'.'+decodeURIComponent(path));if(path.includes('.')&&file.startsWith(publicDir+'/')){try{const data=await readFile(file);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.txt':'text/plain'})[extname(file)]||'application/octet-stream');res.end(data);}catch{res.statusCode=404;res.end('Not found');}}else await handler(req,res);}).listen(4199,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4199'));
