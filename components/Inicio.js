import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useLanguage } from "./LanguageContext";
import { useNavigation } from "@react-navigation/native";

// ** PALETA DE COLORES FINAL Y CORRECTA **
const COLORS = {
  // 🟢 Color Principal (Verde Fuerte para acciones y fondos de botón)
  PRIMARY_GREEN:"#3eb11bff", 
  // 🟢 Color de Texto (Todo el texto debe ser negro)
  TEXT_BLACK: "#000000", 
  // 🟢 Color Secundario (Fondo y contraste)
  SECONDARY_WHITE: "#ffffffff", 
  // Color para el fondo de la tarjeta resaltada (usando el blanco con opacidad, o un gris muy sutil)
  HIGHLIGHT_CARD_BG: "#f0f0f0ff", // Cambiado a gris sutil para que se distinga mejor
  // Colores del Badge (Mantenidos por ser una alerta visual, deben contrastar)
  BADGE_BACKGROUND: '#ff0000ff', 
  BADGE_TEXT: '#fbff00ff', 
};

// ⭐ REQUERIMIENTO DE IMAGEN
const MAP_BACKGROUND_IMAGE = require('../fotos/fondo-inicio.png')

const NewsCard = ({ t, navigation }) => {
  return (
    <View style={styles.cardAndBadgeWrapper}>
      <TouchableOpacity 
        style={[styles.card, styles.highlight]} 
        onPress={() => navigation.navigate("Noticias")}
      >
        <Text style={styles.cardTitle}>{t("recommendations") || "Noticias"}</Text>
        <Text style={styles.cardText}>
          {t("recommendations_description") || "Mira las últimas novedades y eventos del municipio."}
        </Text>
      </TouchableOpacity>
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
    // 1. Usamos ImageBackground como contenedor principal
    <ImageBackground source={MAP_BACKGROUND_IMAGE} style={styles.backgroundImage}>
      {/* 2. Nuevo contenedor para centrar todo el contenido sobre la imagen */}
      <View style={styles.containerContent}>
        
        <View style={styles.header}>
          <Text style={styles.titulo}>{t("app_name") || "avellanedaUnida"}</Text>
          <Text style={styles.subtitulo}>
            {t("") || ""}
          </Text>
        </View>

        
        <View style={styles.content}>
          {/* ENLACE 1: HISTORIA */}
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate("Historia")} 
          >
            <Text style={styles.cardTitle}>{t("history") || "Historia"}</Text>
            <Text style={styles.cardText}>
              {t("history_description") || "Aprende sobre los lugares que visitas."}
            </Text>
          </TouchableOpacity>

          {/* ENLACE 2: NOTICIAS (Resaltada) */}
          <NewsCard t={t} navigation={navigation} />
        </View>

        {/* Botón inferior (Color Principal) */}
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>
            {t("complaint_box") || "Buzón de quejas"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // ⭐ ESTILOS DE IMAGEN Y CONTENIDO
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  containerContent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
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
    fontSize: 45, 
    fontWeight: "900", 
    color: COLORS.TEXT_BLACK, 
    marginBottom: 6,
    marginTop: 20, 
    textAlign: "center",
    textShadowColor: COLORS.PRIMARY_GREEN, // Corregido: usando la variable de color
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  subtitulo: { 
    fontSize: 16, 
    color: COLORS.TEXT_BLACK 
  },
  content: { 
    width: "100%", 
    flex: 1, 
    justifyContent: "center" 
  },
  cardAndBadgeWrapper: {
    marginVertical: 10,
    position: 'relative',
  },
  card: {
    backgroundColor: COLORS.SECONDARY_WHITE, // Fondo de tarjeta Blanco
    padding: 10, // Aumentado a 20 para mejor espacio alrededor del texto centrado
    borderRadius: 10, // Aumentado a 16 para bordes más suaves
    // ⭐ CAMBIO CLAVE 1: Centrar los items dentro de la tarjeta
    alignItems: 'center', 
    shadowColor: COLORS.TEXT_BLACK,
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 8, 
    elevation: 2, 
    marginBottom: 10
  },
  // ⭐ CAMBIO CLAVE 2: Centrar el texto del título
  cardTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: COLORS.TEXT_BLACK, 
    marginBottom: 8,
    textAlign: 'center', 
  },
  // ⭐ CAMBIO CLAVE 3: Centrar el texto descriptivo
  cardText: { 
    fontSize: 14, 
    color: COLORS.TEXT_BLACK,
    textAlign: 'center', 
  },
  // Resto de estilos se mantienen iguales
  notificationBadge: {
    position: 'absolute',
    top: -12, right: -12, 
    backgroundColor: COLORS.BADGE_BACKGROUND, 
    borderRadius: 15, width: 30, height: 30,     
    justifyContent: 'center', alignItems: 'center',
    zIndex: 100, 
    borderWidth: 3, 
    borderColor: COLORS.SECONDARY_WHITE,
    shadowColor: COLORS.TEXT_BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5, 
    shadowRadius: 3,
    elevation: 5,
  },
  notificationText: {
    color: COLORS.BADGE_TEXT, 
    fontWeight: 'bold',
    fontSize: 18, lineHeight: 25, 
  },
  footerButton: {
    backgroundColor: COLORS.PRIMARY_GREEN, 
    width: "100%",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: COLORS.PRIMARY_GREEN,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 15,
  },
  footerText: { 
    color: COLORS.SECONDARY_WHITE, 
    fontSize: 17, fontWeight: "bold" 
  },
});