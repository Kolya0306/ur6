const { response } = require('express');
const ex = require('express');
const fs = require('fs');

const application = ex();

application.get("/stations", (reg, res) => {
    const stations = fs.readFileSync('./stations.json')
    res.json(JSON.parse(stations));
})

application.listen(8080, () => {
    console.log("application is running");
});