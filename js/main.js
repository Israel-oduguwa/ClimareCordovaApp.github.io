
var makeItRain = function() {
    //clear out everything
    $('.rain').empty();
  
    var increment = 0;
    var drops = "";
    var backDrops = "";
  
    while (increment < 100) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      //random number between 5 and 2
      var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
      //increment
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }
  
    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
  }


  let apiKey = "3f5bc1605801344f659f89e4a021c536";
  let cityName = document.getElementById("city");
  let date = document.getElementById("date");
  let time = document.getElementById("time");
  let temp = document.getElementById("temp");
  let dayIcon = document.getElementById("icon");
 let  searchForm = document.getElementById("search-form")
  let description = document.getElementById("description");
  let wind = document.getElementById("wind");
  let pressure = document.getElementById("pressure");
  let searchValue = document.getElementById("search");
  let humidity = document.getElementById("humidity");
  let windUnit = document.getElementById("wind-unit");
  let pressureUnit = document.getElementById("pressure-unit");
  let humidityUnit = document.getElementById("humidity-unit");
  let panelName = document.getElementById("city-name");
  let panelIcon  = document.getElementById("panel-icon");
  let cityContainer = document.getElementById("city-container");
  let addCity = document.getElementById("add-city");
  let loader = document.getElementById("loader");
  let humidityProgress = document.getElementById("humidity-progress");
  let pressureP= document.getElementById("pressure-p");
  let windP = document.getElementById("wind-p");
  let panel = document.getElementById("panel");
  let pressureUnitHead = document.getElementById("pressure-unit");
  let mmMecury = document.getElementById("mm-mecury");
  let inMecury =document.getElementById("in-mecury");
  let pascal = document.getElementById("pascal");
  let mBar = document.getElementById("mbar");
  let ms = document.getElementById("m/s");
  let kmh =  document.getElementById("km/h");
  let knots = document.getElementById("knots");
  let fts = document.getElementById("ft/s");
  let ChooseWind = document.getElementById("choose-wind");
  let networkPopup = document.getElementById("show-popup");
  let choosePressure = document.getElementById("choose-pressure");
  let retry = document.getElementById("retry");
  let tempScale = document.getElementById("temp-scale");
  let page = document.getElementById("page-content");
  let weatherForecast = document.getElementById("weather-forecast");
  let SearchForecast = document.getElementById("forecast-search");
  let namees = document.getElementById("namess");
  let signf = document.getElementById("signf");
  let signc = document.getElementById("signc");
  let population = document.getElementById("num");
  let populationClick = document.querySelector(".population");
     var d = new Date();
  var cityObject = {};
  
   function tm(unix_tm) {
                var dt = new Date(unix_tm*1000);
                time.textContent = dt.toDateString();
            }
  // scroll nav


 date.innerHTML =   d.toDateString();
 time.innerHTML =d.toTimeString();

 
 function geo() {
    navigator.geolocation.getCurrentPosition(geoCallBack, onError);
    console.log("geo func run...");
}

function onError() {
    console.log("error-happened");
}
geo();
 function forecastSection(hours){
  return  hours.map((hour)=>{
        return `
        <div>

        <img src="icons/${hour.weather[0].icon}@2x.png" width="65px" alt=""/>
        <p id="forecast-time">${hour.dt}</p>
        <p class="desi">${hour.weather[0].description} </p>

       </div>
        `;
    })
 }
function createForecats(hours){
    const forecastElement = document.createElement("div");
    forecastElement.setAttribute("class","forecast");

    const forecastTemplate = `<div class="forecast">
    
    <section class="forecastSection">
    ${forecastSection(hours)}
            </section>
   
            </div> `;
       forecastElement.innerHTML = forecastTemplate;
       return forecastElement;
    }
function geoCallBack(position){
    loader.classList.add("show");
    console.log(position);
    lat = position.coords.latitude;
    long = position.coords.longitude;
    const homeApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}`;
    
    fetch(homeApi)
    .then(response =>{
        return response.json();
    })
    .then(homeData =>{
        loader.classList.remove("show");
        networkPopup.classList.add("remove-popup");
        const hours = homeData.hourly;
        const forecastBlock= createForecats(hours);
        weatherForecast.appendChild(forecastBlock);
        page.classList.add("page-show");
        loader.classList.remove("load");
        console.log(homeData);
        cityName.textContent = homeData.timezone;
       
        temp.textContent = Math.floor(homeData.current.temp-273)+"°";
        date.textContent = d.toDateString();
        dayIcon.innerHTML = `<img src="icons/${homeData.current.weather[0].icon}@2x.png" width="50px" alt="" srcset="">`
        time.textContent= d.toTimeString();
        humidityProgress.style.width = `${homeData.current.humidity}%`;
        description.textContent= homeData.current.weather[0].description;
        wind.textContent=homeData.current.wind_speed;
        humidity.textContent = homeData.current.humidity;
        windP.style.width = `${homeData.current.wind_speed}%`;
        pressureP.style.width =`${homeData.current.pressure}%`;
        var pressureData =homeData.current.pressure;
        var windData =homeData.current.wind_speed;
        var temperture = homeData.current.temp-273;
        pressure.textContent = pressureData;
        //formulaes
        let tempFer = (temperture*9/5)+32;
        let pressuremmHg = pressureData * 0.7500616827;
        let pressureinHg =pressureData* 0.02953 ;
        let pressurehpa = pressureData;
        let pressureMbar = pressureData*1;

        // wind formulars
        let windMs = windData;
        let windkm = windData*3.6;
        let windknot =windData*1.94384;
        let windfeet = windData*3.28084;


        tempScale.addEventListener("click",()=>{
        if (tempScale.textContent ==="C") {   
            tempScale.textContent="F";
            signf.textContent="F";

            temp.textContent= Math.floor(tempFer)+"°";
          } else{
              tempScale.textContent="C";
              signf.textContent="F";
              temp.textContent = Math.floor(homeData.current.temp-273)+"°";
          }
          
        })


        ms.addEventListener("click",()=>{
            if (windUnit.textContent==="knots"||windUnit.textContent==="km/h"||windUnit.textContent==="ft/s") {
                wind.textContent = Math.floor(windMs);
                windUnit.textContent ="m/s";
                ChooseWind.textContent= " =>"+" m/s"
            }
        })
        kmh.addEventListener("click",()=>{
            if (windUnit.textContent==="m/s"||windUnit.textContent==="knots"||windUnit.textContent==="ft/s") {
                wind.textContent = Math.floor(windkm);
                windUnit.textContent ="km/h";
                ChooseWind.textContent= "=>"+" km/h"
            }
        })
        fts.addEventListener("click",()=>{
            if (windUnit.textContent==="m/s"||windUnit.textContent==="km/h"||windUnit.textContent==="knots") {
                wind.textContent = Math.floor(windfeet);
                windUnit.textContent ="ft/s";
                ChooseWind.textContent= "=>"+"ft/s";
            }
        })
        knots.addEventListener("click",()=>{
            if (windUnit.textContent==="m/s"||windUnit.textContent==="km/h"||windUnit.textContent==="ft/s") {
                wind.textContent = Math.floor(windknot);
                windUnit.textContent ="knots";
                ChooseWind.textContent = "=>"+"knots"
            }
        })

        mmMecury.addEventListener("click",()=>{
            if (pressureUnit.textContent=="hPa" || pressureUnit.textContent==="inHg" || pressureUnit.textContent==="mbar") {
                pressure.textContent = Math.floor(pressuremmHg);
                pressureUnit.textContent="mmHg";
                choosePressure.textContent="=>" +"mmHg"
            }
            
        })
        inMecury.addEventListener("click",()=>{
            if (pressureUnit.textContent="hPa"||pressureUnit.textContent ==="mmHg"||pressureUnit.textContent==="mbar") {
                pressure.textContent = Math.floor(pressureinHg);
                pressureUnit.textContent="inHg"
                choosePressure.textContent="=>"+" inHg"
            }
        })
        mBar.addEventListener("click",()=>{
            if (pressureUnit.textContent==="hPa"||pressureUnit.textContent==="mmHg"||pressureUnit.textContent==="inHg") {
                pressure.textContent =Math.floor(pressureMbar);
                pressureUnit.textContent ="mbar";
                console.log("ma");
                choosePressure.textContent = '=>'+'mbar '
            }
        })
        pascal.addEventListener('click',()=>{
            if (pressureUnit.textContent==="mmHg"||pressureUnit.textContent==="inHg") {
                pressure.textContent= pressurehpa;
                pressureUnit.textContent='hPa';
                choosePressure.textContent = "=>" + "hPa";
            }
        })

  })
    .catch(error =>{
        console.log(error);
    })
}

  searchForm.addEventListener("submit",(e)=>{

    loader.classList.add("show");
      e.preventDefault();
     if(searchValue.value.length===0){
         alert("Enter a city name to search");
     }
     else{
         panel.classList.add("ui-panel-closed");
        loader.classList.add("load");
       
        const searchApi =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&appid=${apiKey}`;
        fetch(searchApi)
        .then(response=>{
            return response.json();
        })
        .then(data2 =>{
            loader.classList.remove("show");
            networkPopup.classList.add("remove-popup");
            weatherForecast.classList.add("home-invisible");
           populationClick.classList.add("pop");
            searchValue.value=""
            loader.classList.remove("load");
            console.log(data2);
            tm(data2.dt);
            temp.textContent = Math.floor(data2.main.temp-273)+"°";
                cityName.textContent = data2.name;
                description.textContent= data2.weather[0].description;
                wind.textContent= data2.wind.speed;
                humidityProgress.style.width = data2.main.humidity;
                humidity.textContent = data2.main.humidity;
                humidityProgress.style.width = `${data2.main.humidity}%`;
                dayIcon.innerHTML= `<img src="icons/${data2.weather[0].icon}@2x.png" width="50px" alt="" srcset="">`
                pressure.textContent =data2.main.pressure;
                time.textContent="";
                windP.style.width = `(${data2.wind.speed}/100.26)*100%`;
                pressureP.style.width =`(${data2.main.pressure}/1083.8)*100%`;
                var pressureData = data2.main.pressure;
                var windData =data2.wind.speed;
                var tempChange = data2.main.temp-273;
                //formulaes
                let pressuremmHg = pressureData * 0.7500616827;
                let pressureinHg =pressureData* 0.02953 ;
                let pressurehpa = pressure;
                let pressureMbar = pressure*1;
                let ferinheit = (tempChange*9/5)+32;
                   // wind formulars
        let windMs = windData;
        let windkm = windData*3.6;
        let windknot =windData*1.94384;
        let windfeet = windData*3.28084;
        tempScale.addEventListener("click",()=>{
            if (tempScale.textContent ==="C") {   
                tempScale.textContent="F";
                signf.textContent="f";
                temp.textContent= Math.floor(ferinheit)+"°";

              } 
              else if(tempScale.textContent ==="F"){
                tempScale.textContent="C";
                signf.textContent="C";
                temp.textContent = Math.floor(data2.main.temp-273)+"°";
              }
              else{
                  tempScale.textContent="C";
                  signf.textContent="C";
                  temp.textContent = Math.floor(data2.main.temp-273)+"°";
              }
              
            })
        ms.addEventListener("click",()=>{
            if (windUnit.textContent==="knots"||windUnit.textContent==="km/h"||windUnit.textContent==="ft/s") {
                wind.textContent = Math.floor(windMs);
                windUnit.textContent ="m/s";
                ChooseWind.textContent= " =>"+" m/s"
            }
        })
        kmh.addEventListener("click",()=>{
            if (windUnit.textContent==="m/s"||windUnit.textContent==="knots"||windUnit.textContent==="ft/s") {
                wind.textContent = Math.floor(windkm);
                windUnit.textContent ="km/h";
                ChooseWind.textContent= "=>"+" km/h"
            }
        })
        fts.addEventListener("click",()=>{
            if (windUnit.textContent==="m/s"||windUnit.textContent==="km/h"||windUnit.textContent==="knots") {
                wind.textContent = Math.floor(windfeet);
                windUnit.textContent ="ft/s";
                ChooseWind.textContent= "=>"+"ft/s";
            }
        })
        knots.addEventListener("click",()=>{
            if (windUnit.textContent==="m/s"||windUnit.textContent==="km/h"||windUnit.textContent==="ft/s") {
                wind.textContent = Math.floor(windknot);
                windUnit.textContent ="knots";
                ChooseWind.textContent = "=>"+"knots"
            }
        })

        mmMecury.addEventListener("click",()=>{
            if (pressureUnit.textContent=="hPa" || pressureUnit.textContent==="inHg" || pressureUnit.textContent==="mbar") {
                pressure.textContent = Math.floor(pressuremmHg);
                pressureUnit.textContent="mmHg";
                choosePressure.textContent="=>" +"mmHg"
            }
            
        })
        inMecury.addEventListener("click",()=>{
            if (pressureUnit.textContent="hPa"||pressureUnit.textContent ==="mmHg"||pressureUnit.textContent==="mbar") {
                pressure.textContent = Math.floor(pressureinHg);
                pressureUnit.textContent="inHg"
                choosePressure.textContent="=>"+" inHg"
            }
        })
        mBar.addEventListener("click",()=>{
            if (pressureUnit.textContent==="hPa"||pressureUnit.textContent==="mmHg"||pressureUnit.textContent==="inHg") {
                pressure.textContent =Math.floor(pressureMbar);
                pressureUnit.textContent ="mbar";
                console.log("ma");
                choosePressure.textContent = '=>'+'mbar '
            }
        })
        pascal.addEventListener('click',()=>{
            if (pressureUnit.textContent==="mmHg"||pressureUnit.textContent==="inHg") {
                pressure.textContent= pressurehpa;
                pressureUnit.textContent='hPa';
                choosePressure.textContent = "=>" + "hPa";
            }
        })

        })
     

           
        const forecastApi =`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue.value}&appid=${apiKey}`;
        fetch(forecastApi)
        .then(respone =>{
             return respone.json();
        })
        .then(data3 =>{
              function forecastSearch(clouds){
                return  clouds.map((cloud)=>{
                      return `
                      <div class="individual">
                      <img src="icons/${cloud.weather[0].icon}@2x.png" width="65px" alt=""/>
                      <p id="cloud-times">${(cloud.dt_txt)}</p>
                      <p class="des">${cloud.weather[0].description}</p>
                      </div>
                      `
                  })
               }
              function createClouds(clouds){
                  const cloudElements = document.createElement("div");
                  const name = document.cre
                  cloudElements.setAttribute("class","clouds");
                  const cloudTemplates = `<div class="cloud">
                      <p class="cti">${data3.city.name}</p>
                  <section class="cloudSearch">
                  ${forecastSearch(clouds)}
                          </section>
                          </div> `;
                    cloudElements.innerHTML = cloudTemplates;
                     return cloudElements;
                  }
            console.log(data3);
        
     
          const clouds = data3.list;
        const forecastClouds= createClouds(clouds);
        SearchForecast.appendChild(forecastClouds);
        population.textContent = data3.city.population +" people";
        populationClick.addEventListener("click",()=>{
            population.classList.toggle("num");
        }); 
     
        })
     }
    
    
  })
