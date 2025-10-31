import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Linking, Image } from "react-native";
import { useLanguage } from "./LanguageContext";
import moment from "moment"; 
import 'moment/locale/es';

// ⚠️ Asegúrese de que esta IP sea la correcta de su backend
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

    // 1. FUNCIÓN DE FETCH (Faltaba)
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

    // 2. USE EFFECT (Faltaba)
    useEffect(() => {
        fetchNoticias();
    }, []);

    // Función para abrir el enlace externo (Faltaba)
    const handlePressNoticia = (url) => {
        Linking.openURL(url).catch(err => console.error('No se pudo abrir el enlace:', err));
    };

    // 3. RENDER NOTICIA (Se reincorpora el contenido de texto)
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
                    <Text style={styles.newsText} numberOfLines={2}>
                        {item.cuerpo}
                    </Text>
                    <Text style={styles.leerMas}>{t("read_more") || "Leer más..."}</Text>
                </View>
            </TouchableOpacity>
        );
    }; 

    // 4. ESTADOS DE RENDERIZADO (Faltaban)

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#2B6E6E" />
                <Text style={{ marginTop: 10 }}>{t("loading") || "Cargando noticias..."}</Text>
            </View>
        );
    }

    // 🔴 VERIFICACIÓN DE DATOS (Pantalla de error temporal)
    if (error || noticias.length === 0) {
        return (
            <View style={[styles.container, styles.centerContent, {backgroundColor: 'black'}]}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'yellow', textAlign: 'center' }}>
                    ¡FALLO DE DATOS! 
                </Text>
                <Text style={{ color: 'yellow', marginTop: 10, textAlign: 'center' }}>
                    {t("no_news") || "Verifique si el Servidor Node y la Base de Datos están activos. Mensaje: "}{error || "No hay noticias disponibles."}
                </Text>
            </View>
        );
    }

    // 5. RENDERIZADO FINAL (Lista de Noticias)
    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.headerBox}>
                <Text style={styles.titulo}>{t("Enterate de lo ultimo") || "Noticias y Eventos"}</Text>
                <Text style={styles.subtitulo}>
                    {t("En Avellaneda Unida") || "Mantente al día con lo último de Avellaneda"}
                </Text>
            </View>

            {/* Lista de Noticias (Usando FlatList) */}
            <FlatList
                data={noticias}
                renderItem={renderNoticia}
                keyExtractor={item => item.id.toString()} // Usar el ID como key
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
        backgroundColor: "#E6F2F2",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    centerContent: { justifyContent: "center", flex: 1, width: '100%' },
    headerBox: {
        backgroundColor: "#2B6E6E",
        width: "100%",
        paddingVertical: 40,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        letterSpacing: 0.5,
    },
    subtitulo: {
        fontSize: 15,
        color: "rgba(255,255,255,0.8)",
        marginTop: 6,
        textAlign: "center",
    },
    newsList: {
        width: "100%",
    },
    cuadroNoticia: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 15, 
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: '#2B6E6E',
    },
    // 🟢 ESTILO DE IMAGEN
    newsImage: {
        width: '100%',
        height: 180, 
        borderRadius: 12,
        marginBottom: 15,
    },
    textContainer: {
        paddingHorizontal: 5, 
    },
    newsDate: {
        fontSize: 12,
        color: '#888',
        marginBottom: 8,
        fontStyle: 'italic',
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2B6E6E",
        marginBottom: 4,
    },
    newsText: {
        fontSize: 14,
        color: "#4F8C8C",
    },
    leerMas: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5C8C8C',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});