/*const ex = require('express');
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
});*/



// server.js or app.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
const fs = require('fs.promises');


app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/stations', (req, res) => {
    fs.readFile('./database.json').then(data => {
        res.send(JSON.parse(data));
    }).catch(err => console.error(err));
});

app.post('/stations', (req, res) =>{
    const newStation = req.body;
    fs.readFile('./database.json').then(data => {
        const stationArray = JSON.parse(data)
        stationArray.push(newStation);
        fs.writeFile('./database.json', JSON.stringify(stationArray)).then(() =>{
            res.sendStatus(200);
        })
    }).catch(err => console.error(err));
});

app.put('/stations/:id', (req, res) => {
    fs.readFile('./database.json').then(data => {
        const arrayFromFile = JSON.parse(data);
        const resultArray = arrayFromFile.map(
            s => s.id == req.params.id ? { ...s, ...req.body } : s
        )

        fs.writeFile('./database.json', JSON.stringify(resultArray)).then(() => {
            res.sendStatus(200);
        });
    }).catch(err => console.error(err));
});

app.delete('/stations/:id', (req, res) => {
    fs.readFile('./database.json').then(data => {
         const stations = JSON.parse(data).filter(s => s.id != req.params.id)
        console.log(stations)
         return fs.writeFile('./database.json', JSON.stringify(stations)).then(() => {
             res.sendStatus(204);
         });
         res.sendStatus(404);
    }).catch(err => console.error(err));
});

app.listen(8082, () => {
    console.log('Server is listening at 8082');
});