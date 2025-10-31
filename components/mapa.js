import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';

//(REEMPLAZA tu IP y Puerto)
const BASE_URL = 'http://192.168.100.2:3001'; 
const GOOGLE_MAPS_API_KEY = "AIzaSyCYKl8rjBs0itPUaL7M_8qyZtnKBolI-2I";

const mapStyle = [
  {
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
  }
];

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [eventosTemporales, setEventosTemporales] = useState([]); 

  
  const zonasInteres = [
    // ... (Mantenemos zonasInteres tal como está, es un arreglo válido)
    {
      title: "Alto Avellaneda",
      coordinate: { latitude: -34.67535192170136, longitude: -58.36713333919409 },
      theme: "shopping", 
      challenge: "🛍️ ¡Desafío! Tómate una selfie con tu compra más deseada.", // Nuevo campo
    },
    {
      title: "plaza la estacion",
      coordinate: {  latitude: -34.67542612489594, longitude: -58.362621086299875  },
      theme: "plaza", 
      challenge: "🧘 ¡Desafío! Disfruta 10 minutos de lectura o relajo.", // Nuevo campo
    },
    {
      title: "parque del futbol",
      coordinate: { latitude: -34.670076977362285, longitude: -58.36746491054485 },
      theme: "plaza", 
      challenge: "⚽ ¡Desafío! Patea un penal o tómate un mate mirando la cancha.", // Nuevo campo
    },
    {
      title: "Plaza Alsina",
      coordinate: { latitude: -34.66271209618463, longitude: -58.365220089497896 },
      theme: "plaza",
      challenge: "📸 ¡Desafío! Sube una foto del monumento a Alsina.", // Nuevo campo
    },
    {
      title: "Estadio Libertadores de América",
      coordinate: { latitude: -34.67019105735817, longitude: -58.37106194862821 },
      theme: "estadio",
      challenge: "📢 ¡Desafío! Grita un gol con todas tus fuerzas.", // Nuevo campo
    },
    {
      title:"estadio presidente peron",
      coordinate: { latitude: -34.667495357341544, longitude: -58.36859787036977 },
      theme: "estadio",
      challenge: "🏆 ¡Desafío! Tómate una foto en la entrada principal.", // Nuevo campo
    },
    {
      title: "Teatro Roma",
      coordinate: { latitude: -34.662102675509615, longitude: -58.363238368157354 },
      theme: "cultura",
      challenge: "🎭 ¡Desafío! Canta o recita una línea famosa en voz baja.", // Nuevo campo
    },
    {
      title: "Hospital Presidente Perón",
      coordinate: { latitude: -34.6645, longitude: -58.3718 },
      theme: "hospital", 
      challenge: "🙏 (Solo informativo) Ubicación de salud importante.", // Nuevo campo
    },
    {
      title: "Puente Colgante Nicolás Avellaneda",
      coordinate: { latitude: -34.6366, longitude: -58.3582 },
      theme: "landmark",
      challenge: "🌉 ¡Desafío! Tómate una foto con la mejor vista del puente.", // Nuevo campo
    },
    {
      title: "Parque Domínico",
      coordinate: { latitude: -34.6853, longitude: -58.3495 },
      theme: "plaza", 
      challenge: "🧉 ¡Desafío! Tómate un mate en el pasto con un amigo.", // Nuevo campo
    },
  
    {
      title: "Centro municipal de artes",
      coordinate: { latitude: -34.66335, longitude: -58.3654 },
      theme: "administracion", 
      challenge: "🖼️ ¡Desafío! Nombra 3 tipos de arte que se imparten aquí.", // Nuevo campo
    },
    {
      title: "Juzgado de Paz de Avellaneda",
      coordinate: { latitude: -34.6599, longitude: -58.3661 },
      theme: "administracion", 
      challenge: "🏛️ (Solo informativo) Ubicación administrativa.", // Nuevo campo
    },
    {
      title: "Comisaría 1ra de Avellaneda",
      coordinate: { latitude: -34.6611, longitude: -58.3671 },
      theme: "administracion", 
      challenge: "🚨 (Solo informativo) Ubicación administrativa.", // Nuevo campo
    },

    {
      title: "Universidad Nacional de Avellaneda (UNDAV)",
      coordinate: { latitude: -34.6548, longitude: -58.3675 },
      theme: "educacion", 
      challenge: "📚 ¡Desafío! ¿Cuál es la carrera más popular?", // Nuevo campo
    },
    {
        title: "Escuela de Educación Secundaria tecnica Nº7",
        coordinate: { latitude: -34.661821735275936, longitude: -58.36400510627415 },
        theme: "educacion",
        challenge: "📐 ¡Desafío! ¿Cuál es la especialidad más antigua?", // Nuevo campo
    },
    {
      title: "Clínica Sudamericana",
      coordinate: { latitude: -34.6601, longitude: -58.3591 },
      theme: "hospital",
      challenge: "🙏 (Solo informativo) Ubicación de salud importante.", // Nuevo campo
    },

    {
      title: "Estación de Tren Avellaneda",
      coordinate: { latitude: -34.662176372071144, longitude: -58.37608053568415 },
      theme: "landmark",
      challenge: "🚂 ¡Desafío! ¿De qué año data esta estación?", // Nuevo campo
    },

    {
      title: "Cine Monumental Avellaneda",
      coordinate: { latitude: -34.6615, longitude: -58.3649 },
      theme: "cultura",
      challenge: "🎬 ¡Desafío! Nombra una película argentina filmada en Avellaneda.", // Nuevo campo
    },
    {
      title: "Edificio Histórico de la Aduana",
      coordinate: { latitude: -34.6341, longitude: -58.3585 },
      theme: "landmark",
      challenge: "🚢 ¡Desafío! ¿Qué productos se exportaban desde aquí históricamente?", // Nuevo campo
    },
  ];
  const avellanedaBounds = {
    northEast: { latitude: -34.6470, longitude: -58.3400 },
    southWest: { latitude: -34.6900, longitude: -58.3900 },
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de ubicación denegado");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        (loc) => {
          setLocation(loc.coords);
        }
      );
    })();
  }, []);


 
  // INICIO (LÓGICA DE POLLING)
  useEffect(() => {
    // Función para obtener datos
    const fetchEventos = async () => {
        try {
            const response = await fetch(`${BASE_URL}/eventos-activos`);
            if (!response.ok) {
                throw new Error('La red o el servidor no respondió correctamente');
            }
            const data = await response.json();
          
            setEventosTemporales(data); 
            
        } catch (error) {
            console.error("Error al obtener eventos temporales:", error);
            
            setEventosTemporales([]); 
        }
    };

    fetchEventos(); 
    const intervalId = setInterval(fetchEventos, 90000); 

    
    return () => clearInterval(intervalId); 
  }, []); 
 
  // FIN (LÓGICA DE POLLING)
  
  //RUTA A PUNTO DE INTERÉS
  const handleMarkerPress = (tappedCoordinate) => {
    console.log(`Estableciendo destino a:`, tappedCoordinate);
    // Actualiza el estado con las coordenadas del marcador presionado
    setDestination(tappedCoordinate);
  };


  if (!location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        {/* 🟢 CORREGIDO: Aseguramos que el texto de carga esté en <Text> */}
        <Text style={{ marginTop: 10 }}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  // --- FUNCIÓN ACTUALIZADA
  const getMarkerStyle = (theme) => {
    switch (theme) {
      case "plaza":
        return styles.markerPlaza;
      case "estadio":
        return styles.markerEstadio;
      case "cultura":
        return styles.markerCultura;
      case "shopping":
        return styles.markerShopping;
      case "hospital":
        return styles.markerHospital;
      case "restaurante":
        return styles.markerRestaurante;
      case "landmark":
        return styles.markerLandmark;
      case "administracion": 
        return styles.markerAdministracion;
      case "educacion":
        return styles.markerEducacion;
      case "temporal": 
        return styles.markerTemporal;
      default:
        return styles.markerBase;
    }
  };

  // --- FUNCIÓN ACTUALIZADA (Nuevos Iconos) ---
  const getMarkerIcon = (theme) => {
    switch (theme) {
      case "plaza":
        return "🌳"; 
      case "estadio":
        return "🏟️"; 
      case "cultura":
        return "🎭"; 
      case "shopping":
        return "🛍️";
      case "hospital":
        return "🏥";
      case "restaurante":
        return "🍴";
      case "landmark":
        return "🌉";
      case "administracion":
        return "🏛️"; 
      case "educacion":
        return "🎓";
      case "temporal": 
        return "⭐"; 
      default:
        return "📍";
    }
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle} 
        showsPointsOfInterest={false} 
        initialRegion={{
          latitude: -34.6621,
          longitude: -58.3646,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        
        onRegionChangeComplete={(region) => {
          if (
            region.latitude > avellanedaBounds.northEast.latitude ||
            region.longitude > avellanedaBounds.northEast.longitude ||
            region.latitude < avellanedaBounds.southWest.latitude ||
            region.longitude < avellanedaBounds.southWest.longitude
          ) {
            console.log("Fuera de Avellaneda");
          }
        }}
        onPress={() => setDestination(null)} 
      >
        

        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Tu ubicación"
        >
          <View style={styles.userMarker} />
        </Marker>

       
        {zonasInteres.map((zona, index) => (
          <Marker
            key={'static-' + index} 
            coordinate={zona.coordinate}
            title={zona.title}
            description={zona.challenge} 
            onPress={() => handleMarkerPress(zona.coordinate)}
          >
            <View style={[styles.markerBase, getMarkerStyle(zona.theme)]}>
              <Text style={styles.markerText}>{getMarkerIcon(zona.theme)}</Text>
            </View>
          </Marker>
        ))}

        {destination && location && (
          <MapViewDirections
            origin={location}
            destination={destination} 
            apikey={'AIzaSyCYKl8rjBs0itPUaL7M_8qyZtnKBolI-2I'} 
            mode="WALKING" 
            strokeWidth={4} 
            strokeColor="#1ca72aff"
          />
        )}

          {eventosTemporales.map((evento, index) => (
          <Marker
            key={'dynamic-' + index} 
            coordinate={{ latitude: parseFloat(evento.latitud), longitude: parseFloat(evento.longitud) }}
            title={evento.titulo}
            onPress={() => handleMarkerPress({ latitude: parseFloat(evento.latitud), longitude: parseFloat(evento.longitud) })}
          >
            <View style={[styles.markerBase, getMarkerStyle("temporal")]}>
              <Text style={styles.markerText}>{getMarkerIcon("temporal")}</Text>
            </View>
          </Marker>
        ))}
       

      </MapView>
    </View>
  );
}

// --- STYLESHEET ---
const styles = StyleSheet.create({

  calloutContainer: {
    width: 100, // 🟢 MENOS ANCHO: Reducido a 100 (antes 220)
    minHeight: 400, // 🟢 MÁS ALTO: Aumentado a 400 (antes 110)
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // Sombra para que se destaque un poco
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Sombra más pronunciada
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  calloutTitle: {
    fontSize: 22, // 🟢 LETRAS MÁS GRANDES para el título (antes 20)
    fontWeight: '900', // Más negrita
    marginBottom: 6,
    color: '#1B4D4D', // Color más oscuro para resaltar
  },
  calloutDescription: {
    fontSize: 16, // 🟢 LETRAS MÁS GRANDES para la descripción (antes 14)
    color: '#4F8C8C',
    flexShrink: 1, 
  },
  calloutFooter: {
    fontSize: 11,
    marginTop: 12, // Más espacio arriba
    color: '#E91E63',
    fontWeight: '600',
    alignSelf: 'center', // Centramos el texto de acción
    textTransform: 'uppercase'
  },
  
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0, 122, 255, 0.8)", 
    borderColor: "white",
    borderWidth: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },  
  markerBase: {
    width: 36,
    height: 36,
    borderRadius: 18, 
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
  },
  markerText: {
    fontSize: 16,
  },
  markerPlaza: {
    backgroundColor: "#4CAF50", 
  },
  markerEstadio: {
    backgroundColor: "#E91E63", 
  },
  markerCultura: {
    backgroundColor: "#9C27B0", 
  },
  markerShopping: {
    backgroundColor: "#FF9800",
  },
  markerHospital: {
    backgroundColor: "#2196F3", 
  },
  markerRestaurante: {
    backgroundColor: "#795548",
  },
  markerLandmark: {
    backgroundColor: "#607D8B",
  },
  markerAdministracion: {
    backgroundColor: "#00BCD4",
  },
  markerEducacion: {
    backgroundColor: "#FFC107",
  },
  markerTemporal: {
    backgroundColor: "#FF5722", 
  },
});