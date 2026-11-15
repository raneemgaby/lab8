import express from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const courses=[{'id':1,'title':'web prog','credits':6},
{'id':2,'title':'interface-designing','credits':3},
{'id':3,'title':'OOP','creditscur':5}];

const app=express();
const serverFolder=path.dirname(fileURLToPath(import.meta.url));

let requestsServed=0;
app.use((req,res,next)=>{
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});
app.use((req,res,next)=>{
    requestsServed++;
    next();
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(serverFolder, 'public', 'index.html'));
     
});
app.get('/hello',(req,res)=>{
    res.type('text/plain').send("Hello from Raneem's server");
});
app.get('/robots.txt',(req,res)=>{
    res.type('text/plain').send('User-agent: *\nDisallow:');
});
app.get('/old-page',(req,res)=>{
    res.redirect('/hello');
});
app.get('/api/courses',(req,res)=>{
    res.json(courses);
});
app.get('/api/status',(req,res)=>{
    res.json({status: 200, nodeVersion: process.version, uptimeSeconds: process.uptime()});
});
app.get('/api/headers',(req,res)=>{
    res.json({ 'User-Agent': req.get('User-Agent'),'Accept': req.get('Accept')});
});
app.post('/api/subscribe',(req,res)=>{
    res.statusCode=201;
    res.json({"subscribed":true});
});
app.get('/api/admin',(req,res)=>{
    res.status(403).json({'error': "Forbidden"});
});
app.get('/api/stats',(req,res)=>{
    res.json({requestsServed});
});

app.get('/bye',(req,res)=>{
    res.status(404).send('Not Found');
});
app.post('public/premium',(req,res)=>{
    res.statusCode=404;
    res.json({"error":"Not Found"});
});
app.patch('public/premium',(req,res)=>{
    res.statusCode=200;
    res.json({"message": "Premium subscription updated"});
});

app.use(express.static(path.join(serverFolder, 'public')));

app.use((req,res)=>{
    if(req.path.startsWith('/api')){
        return res.status(404).json({error: 'Not found'});
    }else{
        return res.status(404).type('text/plain').send('Page not found');
    }
});

const PORT=process.env.PORT??3000;
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});