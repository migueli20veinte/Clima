const card = (name, country, temp, min, max, lat, long, hum, pres, des, spp) => {

  return `<div class='col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-6'>
    <div class="card cardbody">
      <p>Ciudad: ${name}</p>
      <p>País: ${country}</p>
      <p>Temperatura: ${temp} ºC</p>
      <p>Temperatura min: ${min} ºC</p>
      <p>Temperatura max: ${max} ºC</p>
      <p>Coordenadas Geograficas: [${lat},${long}]</p>
      <p>Latitud: ${lat}</p>
      <p>Longitud: ${long}</p>
      <p>Humedad: ${hum} %</p>
      <p>presión: ${pres} hpa</p>
      <p>velocidad del viento: ${spp} m/s</p>
      <p>Actualmente ${name} cuenta con: ${des}</p>
    </div>
  </div>`;
}


const mostrar_clima = () => {
  var city = (document.getElementById('city').value).trim();
  var code = (document.getElementById('code').value).trim();
  if(city == '' && code == ''){
    document.getElementById('resultados').innerHTML = '<div class="col-12"><div class="alert alert-danger" role="alert">Ingresa la ciudad y código de país</div></div>';
  }else{
    var key_OpWeather = '122fb4d921b14b4195e6fec60ed593c5';
    var api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + code + '&appid=' + key_OpWeather + '&units=metric&lang=es';
    var div_resultados = document.getElementById('resultados')
    var html_resultados = '';

    html_resultados += '<div class="col-12"><div class="alert alert-info" role="alert">Mostrando datos climaticos actuales de  ' + city + ' <b>' + code + '</b></div></div>';

    fetch(api_url).then((result) => {

      var result_json = result.json();
      result_json.then((json) => {
        var results = json.results;
        var temp_ok = json.main.temp;
        var temp_min = json.main.temp_min;
        var temp_max = json.main.temp_max;
        var lon_ok = json.coord.lon;
        var lat_ok = json.coord.lat;
        var hum_ok = json.main.humidity;
        var pres_ok = json.main.pressure;
        var des_ok = json.weather[0].description;
        var name_ok = json.name;
        var country_ok = json.sys.country;
        var spp_ok = json.wind.speed;
        html_resultados += card(name_ok, country_ok, temp_ok, temp_min, temp_max, lat_ok, lon_ok, hum_ok, pres_ok, des_ok, spp_ok);

        div_resultados.innerHTML =  html_resultados;
      });
    })
  }
}
