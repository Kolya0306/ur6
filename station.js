async function refreshStations() {
     let response = await fetch("http://localhost:8082/stations")
     let stations = await response.json()

     let elementtabletwo = document.getElementById("table");
        elementtabletwo.innerHTML = ''

     for (let i = 0; i < stations.length; i++) {
         let station = stations[i]
         console.log(station); 

         let tr = document.createElement("tr");
         let tdId = document.createElement("td");
         let tdAddress = document.createElement("td");
         let tdStatus = document.createElement("td");
         let tdDelete = document.createElement("button");
         let tdUpdate = document.createElement("button");

         tdId.innerText = station.id

         tdAddress.innerText = station.address

         tdStatus.innerText = station.status

         tdDelete.innerText = "Delete"
          tdDelete.onclick = function(){
            deletestation(station.id)}

         tdUpdate.innerText = "Update"
            tdUpdate.onclick = function(){
            updateStation(station)
            }


         tr.appendChild(tdId);
         tr.appendChild(tdAddress);
         tr.appendChild(tdStatus);
         tr.appendChild(tdDelete);
         tr.appendChild(tdUpdate);
         elementtabletwo.appendChild(tr);

        //  let elementtable = document.getElementById("two");
        //  elementtable.appendChild(tr);
        }        
        
    }

function deletestation(id){
    fetch('http://localhost:8082/stations/' + id, {
    method: 'DELETE',
    })
    .then(res => { refreshStations()
        
    });
}

function postStation() {
    const form = document.getElementById("newStation")
    const formData = new FormData(form);

    let resp = {}
    for (let [key, value] of formData.entries()) {
        resp[key] = value;
    }
    
    form.reset()

    fetch("http://localhost:8082/stations", {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(resp)
    }).then(res => { refreshStations()
        console.log("Request complete! response:", res);
    });
    
    

}   

function updateStation(station){
    alert(JSON.stringify(station))
    document.forms["newStation"].elements["id"].value = station.id
    document.forms["newStation"].elements["address"].value = station.address
    document.forms["newStation"].elements["status"].value = station.status
}

function onUpdate(){
    const form = document.getElementById("newStation")
    const formData = new FormData(form);
    let station = {}
    for (let [key, value] of formData.entries()) {
        station[key] = value;
    }
    
    form.reset()
   
    fetch('http://localhost:8082/stations/' + station.id, {
        method: "PUT",
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(station)
    }).then(json => { refreshStations()
        console.log(json)
    });

}