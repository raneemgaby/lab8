import express from 'express';
import path from 'path';
const app=express();
const PORT=process.env.PORT??3000;
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});

let requestsServed=0;
app.use((req,res,next)=>{
    console.log(`${req.timeStamp} ${req.method} ${req.url}`);
    next();
});
app.use((req,res,next)=>{
    requestsServed++;
    next();
})

app.get('/',(req,res)=>{
    res.send('public/index.html');
     res.status(404).send('<h1>Page was not found</h1>');
});
app.get('/hello',(req,res)=>{
    res.send('Hello from Raneem\'s server');
     res.status(404).send('<h1>Page was not found</h1>');
});
app.get('/robots.txt',(req,res)=>{
    res.send('content-type: text');
     res.status(404).send('<h1>Page was not found</h1>');
});
app.get('app-page',(req,res)=>{
    res.statusCode=300;
    res.send('Redirecting to /hello');
    res.status(404).send('<h1>Page was not found</h1>');
});
app.get('api/courses',(req,res)=>{
    res.json({'id': 1, 'title': 'Course 1', 'credits': 3});
    res.status(404).json({'error': "Not found"});
});
app.get('api/status',(req,res)=>{
    res.json({status: 200, nodeVersion: process.version, uptimeSeconds: process.uptime()});
    res.status(404).json({'error': "Not found"});
});
app.get('api/headers',(req,res)=>{
    res.setHeader('User-Agent','Accept');
    res.json({ 'User-Agent': req.get('User-Agent')});
    res.json({'Accept': req.get('Accept')});
    res.status(404).json({'error': "Not found"});
});
app.post('api/subscribe',(req,res)=>{
    res.statusCode=201;
    res.json({"subscribe":true});
    res.status(404).json({'error': "Not found"});
});
app.get('api/admin',(req,res)=>{
    res.statusCode=403;
    res.json({"error":"Forbidden"});
    res.status(404).json({'error': "Not found"});
});
app.get('api/stats',(req,res)=>{
    res.json({requestsServed});
    res.status(404).json({'error': "Not found"});
});

app.get('bye',(req,res)=>{
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
