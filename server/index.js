const mongoose = require('mongoose');
const app = require('./app');
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern_taskboard';
const port = Number(process.env.PORT || 3001);
mongoose.connect(uri, {serverSelectionTimeoutMS: 5000}).then(()=>app.listen(port,()=>console.log(`API listening on http://localhost:${port}`))).catch(e=>{console.error('MongoDB connection failed:',e.message);process.exit(1)});
