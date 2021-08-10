const apiEndpoint = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/'

const searchAllStationsBtn = document.getElementById('searchAllStations')

const queryTrainInfoBtn = document.getElementById('queryTrainInfo')
const originStation = document.getElementById('originStation')
const destinationStation = document.getElementById('destinationStation')

queryTrainInfoBtn.addEventListener('click', async function(){


    let origin = originStation.value
    let destination = destinationStation.value

    console.log(origin)
    console.log(destination)

    let date = new Date()
    let yyyyMMDD = date.toISOString().substring(0,10)
    let queryResultList = await queryTrainInfomation(origin,destination,yyyyMMDD)

    console.log(queryResultList)

    let HTMLstr=""

    queryResultList.forEach(element => {
        HTMLstr+=
        `
        <p>起始 :${element.OriginStopTime.StationName.Zh_tw} 時間 : ${element.OriginStopTime.ArrivalTime}</p>
        <p>到達 :${element.DestinationStopTime.StationName.Zh_tw} 時間 : ${element.DestinationStopTime.ArrivalTime}</p>
        <p>***************************************</p>
        `
    });

    const queryTrainInfoList = document.getElementById('queryTrainInfoList')
    queryTrainInfoList.innerHTML = HTMLstr
    // <p> 起始:南港 時間 -> 到達:台中 時間
    //<p>起始 :${item.OriginStopTime.StationName.Zh_tw} 時間 : {item.OriginStopTime.ArrivalTime}</p>
    //<p>起始 :${item.DestinationStopTime.StationName.Zh_tw} 時間 : {item.DestinationStopTime.ArrivalTime}</p>
})

async function queryTrainInfomation(originStation,destination,yyyyMMDD){
    
    let url = `${apiEndpoint}/DailyTimetable/OD/${originStation}/to/${destination}/${yyyyMMDD}?$top=30&$format=JSON`
    console.log(url)
    let data
    //https://ptx.transportdata.tw/MOTC/v2/DailyTimetable/OD/0990/to/1020/2021-08-09?$top=30&$format=JSON

    //https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/1000/to/1047/2021-08-09?$top=30&$format=JSON
    await fetch(url, { method: 'GET' }).then(
        res => {
            return res.json()
        }
    ).then((jsonData) => {
        data = jsonData
    }).catch((error) => {
        console.log(`error : ${error}`)
    })

    return data
}


searchAllStationsBtn.addEventListener('click', async function () {
   
    let stationListAry = await doGetAllStation()
    let stationList = document.getElementById('stationsList')
    console.log(stationListAry)


    let HTMLstr = ""

    stationListAry.forEach(element => {
        HTMLstr+=
        `
             <p>站名 : ${element.StationName.Zh_tw}</p>
             <p>站碼 : ${element.StationID}</p>
        `
    });
   


    stationList.innerHTML = HTMLstr

    console.log(stationList)
        
})


async function doGetAllStation() {
    let url = `${apiEndpoint}/Station`

    let data
    await fetch(url, { method: 'GET' }).then(
        res => {
            return res.json()
        }
    ).then((jsonData) => {
        data = jsonData

    }).catch((error) => {
        console.log(`error : ${error}`)
    })


    return data
}

