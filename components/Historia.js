//hacer un paper con imagenes y texto de la historia de avellaneda
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLanguage } from "../components/LanguageContext";

export default function FotosImportantes() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);

  const historiaAvellaneda = {
    titulo: t("history_title"),
    texto: t("history_subtitle"),
    imagen: require("../fotos/avellaneda.jpg"),
  };

  const fotos = [
    {
      id: "cilindro-construccion",
      titulo: t("cilindro_title"),
      descripcion: t("cilindro_text"),
      detalle: t("cilindro_detail"),
      imagen: require("../fotos/cilindro.jpg"),
    },
    {
      id: "estadio-independiente",
      titulo: t("independiente_title"),
      descripcion: t("independiente_text"),
      detalle: t("independiente_detail"),
      imagen: require("../fotos/independiente.jpg"),
    },
    {
      id: "estacion-dario-maxi",
      titulo: t("dario_maxi_title"),
      descripcion: t("dario_maxi_text"),
      detalle: t("dario_maxi_detail"),
      imagen: require("../fotos/darioymaxi.jpg"),
    },
    {
      id: "avellaneda-conecta",
      titulo: t("avellaneda_conecta_title"),
      descripcion: t("avellaneda_conecta_text"),
      detalle: t("avellaneda_conecta_detail"),
      imagen: require("../fotos/avellanedaConecta.jpg"),
    },
    {
      id: "elefante-blanco",
      titulo: t("elefante_blanco_title"),
      descripcion: t("elefante_blanco_text"),
      detalle: t("elefante_blanco_detail"),
      imagen: require("../fotos/elefanteblanco.jpg"),
    },
    {
      id: "teatro-romero",
      titulo: t("teatro_roma_title"),
      descripcion: t("teatro_roma_text"),
      detalle: t("teatro_roma_detail"),
      imagen: require("../fotos/teatro.jpg"),
    },
    {
      id: "infierno-avellaneda",
      titulo: t("infierno_title"),
      descripcion: t("infierno_text"),
      detalle: t("infierno_detail"),
      imagen: require("../fotos/infierno.jpg"),
    },
  ];

  const toggleDetalle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{t("history")}</Text>
      <Text style={styles.subHeader}>{t("history_description")}</Text>

      <View style={styles.historyCard}>
        <Image source={historiaAvellaneda.imagen} style={styles.historyImage} />
        <Text style={styles.historyTitle}>{historiaAvellaneda.titulo}</Text>
        <Text style={styles.historyText}>{historiaAvellaneda.texto}</Text>
      </View>

      {fotos.map((foto) => (
        <View key={foto.id} style={styles.card}>
          <Image source={foto.imagen} style={styles.image} />
          <Text style={styles.title}>{foto.titulo}</Text>
          <Text style={styles.caption}>{foto.descripcion}</Text>

          {expandedId === foto.id && <Text style={styles.detalleText}>{foto.detalle}</Text>}

          <TouchableOpacity onPress={() => toggleDetalle(foto.id)} style={styles.button}>
            <Text style={styles.buttonText}>
              {expandedId === foto.id ? t("read_less") : t("read_more")}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F8F8", paddingHorizontal: 16, paddingTop: 20, paddingBottom: 30 },
  header: { fontSize: 26, fontWeight: "bold", color: "#1E5555", textAlign: "center", marginBottom: 8 },
  subHeader: { fontSize: 14, color: "#3C7373", textAlign: "center", marginBottom: 20 },
  historyCard: { backgroundColor: "#DFF3F3", borderRadius: 16, padding: 14, marginBottom: 25, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  historyImage: { width: "100%", height: 180, borderRadius: 12, marginBottom: 10 },
  historyTitle: { fontSize: 20, fontWeight: "bold", color: "#1E5555", marginBottom: 6 },
  historyText: { fontSize: 14, color: "#355E5E", textAlign: "justify" },
  card: { backgroundColor: "white", borderRadius: 16, padding: 14, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  image: { width: "100%", height: 180, borderRadius: 12, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#1E5555", marginBottom: 6 },
  caption: { fontSize: 14, color: "#4F8C8C", marginBottom: 10 },
  detalleText: { fontSize: 14, color: "#2B6E6E", marginBottom: 10, textAlign: "justify" },
  button: { alignSelf: "flex-start", backgroundColor: "#2B6E6E", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 14 },
});
