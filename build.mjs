import {mkdir,writeFile,copyFile} from 'node:fs/promises';
import {shell} from './lib/render.js';
await mkdir('public',{recursive:true});
await writeFile('public/index.html',shell('/'));
await writeFile('public/robots.txt','User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /join\nDisallow: /request-change\n');
console.log('Built Рядом: static assets and server-rendered routes ready.');

for (const file of ['data.js','render.js','views.js']) await copyFile('lib/'+file,'public/'+file);

const origin='https://'+(process.env.VERCEL_PROJECT_PRODUCTION_URL||'ryadom-collab.vercel.app');
await writeFile('public/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['/','/participants','/offers','/rules','/contacts'].map(p=>'<url><loc>'+origin+p+'</loc></url>').join('')+'</urlset>');
