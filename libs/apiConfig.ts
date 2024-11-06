import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.38.164.26:1337/api",
});

export const getPros = async () => {
  try {
    const response = await api.get("/pros?populate=*");
    const prosData = response.data.data;

    if (!Array.isArray(prosData)) {
      throw new Error("Les données récupérées ne sont pas un tableau.");
    }

    return prosData.map((pro) => ({
      id: pro.id,
      name: pro.name,
      profession: pro.profession,
      location: pro.location,
      animals: pro.animals.map((animal: any) => ({
        id: animal.id,
        name: animal.name,
      })),
      imageUrl: require("../assets/images/pdp-default.png"),
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des pros:", error);
    return [];
  }
};
