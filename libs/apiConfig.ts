import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface de données
interface Animal {
  id: number;
  name: string;
}

interface Pro {
  id: number;
  name: string;
  profession: string;
  location: string;
  animals: Animal[];
  imageUrl: { uri: string } | number;
}

interface Banner {
  id: number;
  title: string;
  image: { uri: string } | number;
}

interface Pet {
  name: string;
  type: string;
  avatar: { uri: string } | number;
}

interface Consultation {
  id: number;
  date: string;
  time: string;
  duration: string;
  pet: Pet;
  owner: string;
  location: string;
  service: string;
}

// Initialiser l'instance Axios avec la base de l'URL de l'API
export const api = axios.create({
  baseURL: "https://grateful-vacation-fc846330dc.strapiapp.com/api",
});

// Fonction pour obtenir les informations des professionnels
export const getPros = async () => {
  try {
    const response = await api.get("/pros?populate=*");
    const prosData = response.data.data;

    if (!Array.isArray(prosData)) {
      throw new Error("Les données récupérées ne sont pas un tableau.");
    }

    return prosData.map((pro: any) => ({
      id: pro.id,
      name: pro.name || "Nom non disponible",
      profession: pro.profession || "Profession non disponible",
      location: pro.location || "Localisation non disponible",
      animals: (pro.animals || []).map((animal: any) => ({
        id: animal.id,
        name: animal.name || "Animal non disponible",
      })),
      imageUrl: pro.profileImage?.data
        ? { uri: pro.profileImage.data.url }
        : require("../assets/images/pdp-default.png"),
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des pros:", error);
    return [];
  }
};

// Fonction pour obtenir les bannières
export const getBanners = async () => {
  try {
    const response = await api.get("/banners?populate=*");
    const bannersData = response.data.data;

    if (!Array.isArray(bannersData)) {
      throw new Error("Les données récupérées ne sont pas un tableau.");
    }

    return bannersData.map((banner: any) => ({
      id: banner.id,
      title: banner.title || "Titre non disponible",
      image: banner.image?.data
        ? { uri: banner.image.data.url }
        : require("../assets/images/dog-banner.png"),
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des bannières:", error);
    return [];
  }
};

// Fonction pour obtenir les informations de consultation avec le token
export const getConsultation = async (
  consultationId: number
): Promise<Consultation | null> => {
  try {
    // Récupérer le token depuis AsyncStorage
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Token d'authentification introuvable.");
    }

    const response = await api.get(`/rdvs?id=${consultationId}&populate=*`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const consultationData = response.data.data;

    if (!consultationData) {
      throw new Error("Les données de consultation sont introuvables.");
    }

    console.log("Données de consultation:", consultationData);

    // Formater les données de consultation
    return {
      id: consultationData.id,
      date: consultationData.date || "Date non disponible",
      time: consultationData.time || "Heure non disponible",
      duration: consultationData.duration || "Durée non disponible",
      pet: {
        name: consultationData.pet?.name || "Nom non disponible",
        type: consultationData.pet?.type || "Type non disponible",
        avatar: consultationData.pet?.avatar?.data
          ? { uri: consultationData.pet.avatar.data.url }
          : require("../assets/images/pdp-default.png"), // Assurez-vous que ce chemin est correct et que l'image existe
      },
      owner: consultationData.pro?.name || "Propriétaire non disponible",
      location: consultationData.pro?.location || "Localisation non disponible",
      service: consultationData.object?.name || "Service non disponible",
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la consultation:", error);
    return null;
  }
};
