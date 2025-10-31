import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useLanguage } from "./LanguageContext";
import { useNavigation } from "@react-navigation/native";

// 🟢 Componente de Tarjeta de Noticias (AHORA CON ESTRATEGIA DE BADGE HERMANO)
const NewsCard = ({ t, navigation }) => {
  return (
    // Paso 1: Un contenedor para la tarjeta Y el badge, para posicionar ambos relativamente
    <View style={styles.cardAndBadgeWrapper}>
      {/* Paso 2: El contenedor de la tarjeta con su sombra y bordes */}
      <TouchableOpacity 
        style={[styles.card, styles.highlight]}
        onPress={() => navigation.navigate("Noticias")}
      >
        <Text style={styles.cardTitle}>{t("recommendations") || "Noticias"}</Text>
        <Text style={styles.cardText}>
          {t("recommendations_description") || "Mira las últimas novedades y eventos del municipio."}
        </Text>
      </TouchableOpacity>

      {/* 🟢 BADGE DE NOTIFICACIÓN: Ahora es un hermano de la tarjeta, posicionado sobre ella */}
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationText}>!</Text>
      </View>
    </View>
  );
};


export default function Inicio() {
  const { t } = useLanguage();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.titulo}>{t("app_name") || "avellanedaUnida"}</Text>
        <Text style={styles.subtitulo}>
          {t("app_subtitle") || "Explora y descubre tu entorno"}
        </Text>
      </View>

      
      <View style={styles.content}>
        {/* ENLACE 1: HISTORIA (Volvemos al estilo card original sin badge) */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate("Historia")} 
        >
          <Text style={styles.cardTitle}>{t("history") || "Historia"}</Text>
          <Text style={styles.cardText}>
            {t("history_description") || "Aprende sobre los lugares que visitas."}
          </Text>
        </TouchableOpacity>

        {/* ENLACE 2: NOTICIAS (Usando el nuevo componente con badge flotante) */}
        <NewsCard t={t} navigation={navigation} />
      </View>

      {/* Botón inferior */}
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerText}>
          {t("complaint_box") || "Buzón de quejas"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F2F2",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: { 
    alignItems: "center",
    marginTop: 30, 
  },
  titulo: { 
    fontSize: 32, 
    fontWeight: "bold", 
    color: "#2B6E6E", 
    marginBottom: 6,
    marginTop: 20, 
  },
  subtitulo: { 
    fontSize: 16, 
    color: "#5C8C8C" 
  },
  content: { 
    width: "100%", 
    flex: 1, 
    justifyContent: "center" 
  },
  // 🟢 NUEVO: Contenedor para la tarjeta Y el badge para posicionamiento relativo
  cardAndBadgeWrapper: {
    marginVertical: 10, // Margen para separar las tarjetas
    position: 'relative', // Para que el badge se posicione en relación a este
    // No necesita overflow: 'visible' aquí, ya que el badge es hermano
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    // No necesitamos position: 'relative' aquí si el badge es hermano
  },
  highlight: { 
    backgroundColor: "#DFF3F3" 
  },
  // 🟢 ESTILOS DEL BADGE DE NOTIFICACIÓN AJUSTADOS Y REFORZADOS
  notificationBadge: {
    position: 'absolute',
    top: -12,     // Posición fuera del borde superior (relativo a cardAndBadgeWrapper)
    right: -12,   // Posición fuera del borde derecho (relativo a cardAndBadgeWrapper)
    backgroundColor: '#FFD700', 
    borderRadius: 15, 
    width: 30,      
    height: 30,     
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, 
    borderWidth: 3, 
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5, 
    shadowRadius: 3,
    elevation: 5,
  },
  notificationText: {
    color: '#8B4513', 
    fontWeight: 'bold',
    fontSize: 18, 
    lineHeight: 25, 
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#2B6E6E", 
    marginBottom: 6 
  },
  cardText: { 
    fontSize: 14, 
    color: "#4F8C8C" 
  },
  footerButton: {
    backgroundColor: "#2B6E6E",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  footerText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});