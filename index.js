const apiEndpoint = 'https://ptx.transportdata.tw/MOTC/v2'

const searchAllStationsBtn = document.getElementById('searchAllStations')





searchAllStationsBtn.addEventListener('click', function () {
   
    doGetAllStation()
    let stationList = document.getElementById('stationsList')
    let stationListAry = 
    // let str = ""
    // str+=`
    //         <p>站名 : </p>
    //         <p>站碼 : </p>
    // `

    // listStation.forEach(element => {
        
    // });




    // stationList.innerHTML =str

    console.log(stationList)
        
})


async function doGetAllStation() {
    let url = `${apiEndpoint}/Rail/THSR/Station`
    let data 
    fetch(url, { method: 'GET' }).then(
        res => {
            return res.json()
        }
    ).then((jsonData) => {
        data = jsonData
    }).catch((error) => {
        console.log(`error : ${error}`)
    })


    console.log(data)
}

