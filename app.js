import express from 'express';
const app = express();
const port = 3000;
var router = express.Router();


app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/create',(req,res)=>{
    res.send("New Personage Created")
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})