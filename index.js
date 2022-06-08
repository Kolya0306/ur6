const ex = require('express');
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

application.listen(8085, () => {
    console.log("application is running good");
});