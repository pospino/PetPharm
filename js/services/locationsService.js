angular.module('starter').factory('LocationsService', [ function() {

  var locationsObj = {};
  //Se deben leer los puntos desde el API de alberto.
  locationsObj.savedLocations = {
    ppp: {

      lat: -33.865143,
      lng: 151.209900,
      focus: true,
      draggable: false,
      message: "<b>Punto PetPharm</b><br/>Calle 80 # 78B - 201",
      title: "Titulo",
      clickable: true,
      icon: {
        iconUrl: 'img/ppp.png',
        iconSize: [100, 107], // size of the icon

      }
    },
    ap: {

      lat: -33.864140,
      lng: 151.208890,
      focus: true,
      draggable: false,
      message: "<b>Agro-Punto PetPharm</b><br/>Calle 80 # 78B - 201",
      title: "Titulo",
      clickable: true,
      icon: {
        iconUrl: 'img/ap.png',
        iconSize: [100, 107], // size of the icon

      }
    },
    cp: {

      lat: -33.863143,
      lng: 151.209900,
      focus: true,
      draggable: false,
      message: "<b>Clinica PetPharm</b><br/>Calle 80 # 78B - 201",
      title: "Titulo",
      clickable: true,
      icon: {
        iconUrl: 'img/cp.png',
        iconSize: [100, 107], // size of the icon

      }
    },
    ev: {

      lat: -33.863143,
      lng: 151.208900,
      focus: true,
      draggable: false,
      message: "<b>Ejecutivo PetPharm</b><br/>Calle 80 # 78B - 201",
      title: "Titulo",
      clickable: true,
      icon: {
        iconUrl: 'img/ev.png',
        iconSize: [100, 107], // size of the icon

      }
    },
    ps: {

      lat: -33.861143,
      lng: 151.208900,
      focus: true,
      draggable: false,
      message: "<b>PetShop PetPharm</b><br/>Calle 80 # 78B - 201",
      title: "Titulo",
      clickable: true,
      icon: {
        iconUrl: 'img/ps.png',
        iconSize: [100, 107], // size of the icon

      }
    },
    vp: {

      lat: -33.861143,
      lng: 151.207900,
      focus: true,
      draggable: false,
      message: "<b>Veterinario PetPharm</b><br/>Calle 80 # 78B - 201",
      title: "Titulo",
      clickable: true,
      icon: {
        iconUrl: 'img/vp.png',
        iconSize: [100, 107], // size of the icon

      }
    },

  };

  return locationsObj;

}]);