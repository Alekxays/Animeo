import axios from "axios";

export const api = axios.create({
  baseURL: "https://grateful-vacation-fc846330dc.strapiapp.com/api",
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
