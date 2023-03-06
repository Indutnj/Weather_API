let arrobj=[];
let data = [];

fetch('https://restcountries.com/v2/all')
  .then((response) => response.json())
  .then((res) => {
    data = res;
    console.log(data)
   console.log(data.length);
   
  
   for(let i=0;i<data.length;i++)
   {
    let s={} 
     s['name']=data[i].name;
     s['capital']=data[i].capital;
     s['region']=data[i].region;
     s['flag']=data[i].flag;
     s['code']=data[i].alpha3Code;
     s['latlng']=data[i].latlng;
    
     arrobj.push(s);
    //  console.log(s)
   }
   console.log(arrobj)
  
   display(arrobj);
   
  })
  .catch((error) => {
    console.error('Error fetching data: ', error);
  });

  function display(arrobj)
  {
    for(let i=0;i<arrobj.length;i++)
    {  
    const country = arrobj[i];
      const name = document.createElement("h4");
      name.textContent = country.name;

      const flagImg = document.createElement("img");
      flagImg.setAttribute("class","card-img-top")
      flagImg.src = country.flag;
      flagImg.setAttribute("alt","sorry")

      const capital=document.createElement("p");
      capital.textContent=country.capital;
  
      const region=document.createElement("p");
      region.textContent=country.region;

      const code=document.createElement("p");
      code.textContent=country.code;
      const latilngi=country.latlng;

      const row=document.getElementById("row");
      const colDiv=document.createElement("div");
      colDiv.setAttribute("class","col-lg-4 col-sm-12");
      row.append(colDiv);
      const cardDiv=document.createElement("div");
      cardDiv.setAttribute("class","card");

      const cardHead=document.createElement("div");
      cardHead.setAttribute("class","card-header");
      cardHead.append(name);
      cardDiv.appendChild(cardHead);
 
      const imgDiv=document.createElement("div")
      imgDiv.setAttribute("class","imgDiv")
      imgDiv.appendChild(flagImg);
      cardDiv.appendChild(imgDiv);

      const cardBody=document.createElement("div");
      cardBody.setAttribute("class","card-body");

      const p1=document.createElement("p");
      p1.setAttribute("class","card-text")

      const tp1=document.createTextNode("Capital:")
      const space1=document.createTextNode(" ")
      p1.append(tp1,space1,capital.innerText);
      cardBody.append(p1);
   
      const p2=document.createElement("p");
      p2.setAttribute("class","card-text")
      const tp2=document.createTextNode("Region:")
      const space2=document.createTextNode(" ")
      p2.append(tp2,space2,region.innerText);
      cardBody.append(p2);
   
      const p3=document.createElement("p");
      p3.setAttribute("class","card-text")
      const tp3=document.createTextNode("Country Code:")
      const space3=document.createTextNode(" ")
      p3.append(tp3,space3,code.innerText);
      cardBody.append(p3);
      var floatdiv=document.createElement("div");
      floatdiv.setAttribute("id","float")
      
      floatdiv.innerHTML=`<h2>Weather Info</h2>
      <p id="p1"></p>
      <button onclick="hidefloat()" class="btn btn-sm btn-danger">Close</button>`
      document.body.append(floatdiv)
      
      
      const btncard=document.createElement("button");
      btncard.setAttribute("class","btn btn-primary");
      btncard.setAttribute("type","button");
      btncard.innerText="Click for Weather"; 
      btncard.onclick=function()
      {
        myFunction(latilngi)
        showfloat();
      
      }
      cardBody.append(btncard)
      cardDiv.appendChild(cardBody);
      
      colDiv.appendChild(cardDiv);

 }
}

function showfloat() {
  var float = document.getElementById("float");
  if (float) {
    float.style.display = "block";
  }
  else {
    console.error("float element not found");
  }
}

function hidefloat() {
  var float = document.getElementById("float");
  if (float) {
    float.style.display = "none";
  }
  else {
    console.error("float element not found");
  }
}
function myFunction(code1)
{
  let lati=code1[0];
  let longi=code1[1];
  //console.log(lati,longi);
  
  getWeather(lati,longi);
  

  

}
function getWeather(lati,longi){
  const lati1 = lati;
    const longi1 =longi;
  
    // create the URL for the OpenWeather API call
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati1}&lon=${longi1}&appid=8058f39594374fc2f6966bcad02c65df`
    // make the API call using Fetch API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const temp = (data.main.temp-273.15).toFixed(3);
        const desc = data.weather[0].description;
        const humi=data.main.humidity;
        const ans = document.getElementById('p1');
        ans.innerHTML = `Temperature: ${temp} &deg;C <br>Humidity:${humi}&percnt;<br>
         Description: ${desc}`;
    })
    .catch(error => console.log("Error",error));

}

