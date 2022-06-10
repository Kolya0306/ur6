const ex = require('express');
const req = require('express/lib/request');
const fs = require('fs.promises');

const application = ex();

application.use(ex.json())

application.get("/stations", (reg, res) => {
    fs.readFile('./stations.json').then(data => {
        res.json(JSON.parse(data));
    })
})

application.post('/stations', (req, res) =>{
    const newStation = req.body;
    fs.readFile('./stations.json').then(data => {
        const stationArray = JSON.parse(data)
        stationArray.push(newStation);
        fs.writeFile('./stations.json', JSON.stringify(stationArray)).then(() => {
            res.sendStatus(200);
        })    
    }).catch(err => console.error(err));
});

 application.delete('/stations/:id', (req, res) =>{
    fs.readFile('./stations.json').then(data => {
        const stations = JSON.parse(data).filter(s => s.id != req.params.id);
        console.log("delete id: ",req.params.id)
        fs.writeFile('./stations.json', JSON.stringify(stations)).then(() => {
            res.sendStatus(200);
        })    
    }).catch(err => console.error(err))
 })

 application.get('/stations/:id', (req, res) => {
    fs.readFile('./stations.json').then(data => {
        const newArr = JSON.parse(data).filter(s => s.id == req.params.id)
        if (newArr.length > 0){
            res.json(newArr[0]);   
        } else {
            res.sendStatus(404);
        }
        
    }).catch(err => console.error(err))
})

application.put('/stations/:id', (req, res) => {
    console.log(req.body)
    fs.readFile('./stations.json').then(data => {
        res.sendStatus(200)
    }).catch(err => console.error(err))
})


application.listen(8085, () => {
    console.log("application is running good");
});