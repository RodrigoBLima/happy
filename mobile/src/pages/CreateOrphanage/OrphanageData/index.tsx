import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import api from "../../../services/api";

interface OrphanageDataParamns {
  position?: {
    latitude: string;
    longitude: string;
  };
}

export default function OrphanageData() {
  const route = useRoute();

  const params = route.params as OrphanageDataParamns;

  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [about, setAbout] = useState();
  const [instructions, setInstructions] = useState();
  const [opening_hours, setOpeningHours] = useState();
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function getFormData() {
    const { latitude, longitude } = params.position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));

    images.forEach((image, index) => {
      data.append("images", {
        type: "image/jpg",
        uri: image,
        name: `image_${index}.jpg`,
      } as any);
    });

    return data;
  }

  async function handleSubmit() {
    //   event.preventDefault();
    let response = await api.post("orphanages", getFormData());
    if (response.status === 201) {
      //   // alert("Cadastro realizado com sucesso!");
       navigation.navigate("OrphanagesMap");
    }
  }
  async function handleSelectedImages(event: any) {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      alert("Caro gafanhoto, precisamos de acesso a sua galeria");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    // console.log(result)

    if (result.cancelled) return;

    const { uri: image } = result;

    setImages([...images, image]);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      {/* <Text style={styles.label}>Whatsapp</Text>
      <TextInput style={styles.input} /> */}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map((image) => (
          <Image
            key={image}
            source={{ uri: image }}
            style={styles.uploadedImage}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.imagesInput}
        onPress={handleSelectedImages}
      >
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: "#ccc", true: "#39CC83" }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: "#5c8599",
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: "#D3E2E6",
  },

  label: {
    color: "#8fa7b3",
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: "#8fa7b3",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
  },

  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#96D2F0",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
  uploadedImagesContainer: {
    flexDirection: "row",
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },
});
