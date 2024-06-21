let map;
let geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -19.913646, lng: -43.931608},
        zoom: 12
    });

    geocoder = new google.maps.Geocoder();

    const urlReceptores = "/Receptores";

    
    fetch(urlReceptores)
        .then(response => response.json())
        .then(dados => {
            console.log(dados);
            
            const ceps = dados.map(receptor => {
                return {
                    cep: receptor.endereco[0].cep,
                    title: receptor.nome
                };
            });

            
            ceps.forEach(point => {
                geocodeCEP(point);
            });
        })
        .catch(error => console.error('Erro ao buscar dados dos receptores:', error));
}


function geocodeCEP(point) {
    geocoder.geocode({'address': point.cep}, function(results, status) {
        if (status === 'OK') {
            console.log('CEP: ' + point.cep + ', Latitude: ' + results[0].geometry.location.lat() + ', Longitude: ' + results[0].geometry.location.lng());

            
            const infowindow = new google.maps.InfoWindow({
                content: '<h3>' + point.title + '</h3>'
            });

            
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

           
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        } else {
            console.error('Geocodificação falhou para o seguinte CEP: ' + point.cep + ', motivo: ' + status);
        }
    });
}


document.getElementById('searchButton').addEventListener('click', function() {
    const cepInput = document.getElementById('cepInput').value;
    if (cepInput) {
        searchCEP(cepInput);
    } else {
        alert('Por favor, digite um CEP válido.');
    }
});


function searchCEP(cep) {
    geocoder.geocode({'address': cep}, function(results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            map.setCenter(location);
            map.setZoom(15); 

        } else {
            alert('Geocodificação falhou devido a: ' + status);
        }
    });
}
