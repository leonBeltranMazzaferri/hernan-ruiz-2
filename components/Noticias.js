import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Linking, Image } from "react-native";
import { useLanguage } from "./LanguageContext";
import moment from "moment"; 
import 'moment/locale/es';

// ** PALETA DE COLORES CONSISTENTE **
const COLORS = {
  // 🟢 Color Principal (Verde Fuerte para acciones y fondos de botón)
  PRIMARY_GREEN:"#359418ff", 
  // 🟢 Color de Texto (Todo el texto debe ser negro)
  TEXT_BLACK: "#000000", 
  // 🟢 Color Secundario (Fondo y contraste)
  SECONDARY_WHITE: "#ffffffff", 
  // Color para el fondo de la tarjeta resaltada (usando el blanco con opacidad, o un gris muy sutil)
  HIGHLIGHT_CARD_BG: "#f0f0f0ff", 
  // Colores del Badge (Usados como acento o para Leer Más)
  ACCENT_COLOR_TEXT_LIGHT: "#666666", // Un gris más oscuro para texto secundario
  ERROR_TEXT: '#ff0000ff',
};

// ⚠️ Asegúrese de que esta IP sea la correcta de su backend
// const BASE_URL = 'http://ruizapp.duckdns.org:3001';
const BASE_URL = 'http://192.168.100.2:3001';
const IMAGES_MAP = {
    'avellaneda.jpg': require('../fotos/avellaneda.jpg'),
    'cilindro.jpg': require('../fotos/cilindro.jpg'),
    'darioymaxi.jpg': require('../fotos/darioymaxi.jpg'),
    'elefanteblanco.jpg': require('../fotos/elefanteblanco.jpg'),
    'independiente.jpg': require('../fotos/independiente.jpg'),
    'infierno.jpg': require('../fotos/infierno.jpg'),
    'teatro.jpg': require('../fotos/teatro.jpg'),
    // Agregue el resto de imágenes aquí
};

export default function Noticias() { 
    const { t } = useLanguage(); 
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    moment.locale('es');

    // FUNCIÓN DE FETCH (Mantenida)
    const fetchNoticias = async () => {
        try {
            const response = await fetch(`${BASE_URL}/noticias`); 
            
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status}`);
            }
            
            const data = await response.json();
            setNoticias(data);
        } catch (err) {
            console.error("Error al obtener noticias:", err);
            setError(t("error_loading_news") || `Error de conexión: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // USE EFFECT (Mantenido)
    useEffect(() => {
        fetchNoticias();
    }, []);

    // Función para abrir el enlace externo (Mantenida)
    const handlePressNoticia = (url) => {
        Linking.openURL(url).catch(err => console.error('No se pudo abrir el enlace:', err));
    };

    // RENDER NOTICIA (Mantenido)
    const renderNoticia = ({ item }) => {
        const imageSource = IMAGES_MAP[item.imagen_url];

        return (
            <TouchableOpacity 
                style={styles.cuadroNoticia}
                onPress={() => handlePressNoticia(item.enlace)} 
            >
                {/* Imagen destacada */}
                {imageSource && (
                    <Image 
                        source={imageSource} 
                        style={styles.newsImage} 
                        resizeMode="cover"
                    />
                )}
                
                <View style={styles.textContainer}> 
                    <Text style={styles.newsDate}>
                        {moment(item.fecha).format('LL')} 
                    </Text>
                    <Text style={styles.newsTitle}>{item.titular}</Text> 
                    <Text style={styles.newsText} numberOfLines={3}> {/* Aumentamos a 3 líneas */}
                        {item.cuerpo}
                    </Text>
                    <Text style={styles.leerMas}>{t("read_more") || "Leer más..."}</Text>
                </View>
            </TouchableOpacity>
        );
    }; 

    // ESTADOS DE RENDERIZADO
    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={COLORS.PRIMARY_GREEN} />
                <Text style={[styles.loadingText, { color: COLORS.TEXT_BLACK }]}>
                    {t("loading") || "Cargando noticias..."}
                </Text>
            </View>
        );
    }

    // 🔴 PANTALLA DE ERROR/SIN DATOS
    if (error || noticias.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent, {backgroundColor: COLORS.SECONDARY_WHITE}]}>
                <Text style={styles.errorTitle}>
                    ¡FALLO DE DATOS! 
                </Text>
                <Text style={styles.errorDetail}>
                    {t("no_news") || "Verifique si el Servidor Node y la Base de Datos están activos. Mensaje: "}{error || "No hay noticias disponibles."}
                </Text>
            </View>
        );
    }

    // RENDERIZADO FINAL (Lista de Noticias)
    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.headerBox}>
                <Text style={styles.tituloHeader}>{t("Enterate de lo ultimo") || "Noticias y Eventos"}</Text>
                <Text style={styles.subtituloHeader}>
                    {t("En Avellaneda Unida") || "Mantente al día con lo último de Avellaneda"}
                </Text>
            </View>

            {/* Lista de Noticias (Usando FlatList) */}
            <FlatList
                data={noticias}
                renderItem={renderNoticia}
                keyExtractor={item => item.id.toString()}
                style={styles.newsList}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.SECONDARY_WHITE, // Fondo Blanco Consistente
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    centerContent: { 
        justifyContent: "center", 
        flex: 1, 
        width: '100%' 
    },
    // Estilos para la carga
    loadingText: { 
        marginTop: 10, 
        color: COLORS.TEXT_BLACK 
    },
    // Estilos para el error
    errorTitle: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: COLORS.ERROR_TEXT, 
        textAlign: 'center' 
    },
    errorDetail: { 
        color: COLORS.TEXT_BLACK, 
        marginTop: 10, 
        textAlign: 'center' 
    },
    
    // ⭐ ESTILOS DEL ENCABEZADO (Header Box)
    headerBox: {
        backgroundColor: COLORS.PRIMARY_GREEN, // Verde principal
        width: "100%",
        paddingVertical: 30, // Un poco menos de padding
        borderRadius: 16, // Bordes consistentes con 'Inicio'
        alignItems: "center",
        marginBottom: 30,
        // Sombras consistentes con las tarjetas de navegación
        shadowColor: COLORS.TEXT_BLACK,
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    tituloHeader: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.SECONDARY_WHITE, // Texto Blanco
        textAlign: "center",
    },
    subtituloHeader: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)', // Blanco semi-transparente
        marginTop: 6,
        textAlign: "center",
    },
    
    newsList: {
        width: "100%",
    },
    
    // ⭐ ESTILOS DE LA TARJETA DE NOTICIA (cuadroNoticia)
    cuadroNoticia: {
        backgroundColor: COLORS.SECONDARY_WHITE, // Fondo Blanco
        borderRadius: 16,
        padding: 15, 
        marginBottom: 20, // Más espacio entre noticias
        // Sombras consistentes (igual a las tarjetas de navegación)
        shadowColor: COLORS.TEXT_BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1, 
        shadowRadius: 6,
        elevation: 4, 
        // Borde izquierdo como acento principal
        borderLeftWidth: 4, 
        borderLeftColor: COLORS.PRIMARY_GREEN,
    },
    // 🟢 ESTILO DE IMAGEN
    newsImage: {
        width: '100%',
        height: 180, 
        borderRadius: 12,
        marginBottom: 15,
    },
    textContainer: {
        // paddingHorizontal: 5, // ⭐ Eliminado o ajustado para mejor fluidez
    },
    newsDate: {
        fontSize: 13, 
        color: COLORS.ACCENT_COLOR_TEXT_LIGHT, // Usando el nuevo gris oscuro para mejor contraste
        marginBottom: 6, 
        fontStyle: 'normal',
        fontWeight: '500'
    },
    newsTitle: {
        fontSize: 20, 
        fontWeight: "bold",
        color: COLORS.PRIMARY_GREEN, // Título en color principal
        marginBottom: 8,
    },
    newsText: {
        fontSize: 15, 
        color: COLORS.TEXT_BLACK, // ⭐ CAMBIO CLAVE: Texto del cuerpo en negro puro
        lineHeight: 22, // ⭐ Ajuste de altura de línea para mejor legibilidad
        // textAlign: 'justify', // Opcional: para texto justificado
    },
    leerMas: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.PRIMARY_GREEN, // Botón 'Leer Más' en color principal
        alignSelf: 'flex-start', 
    },
});