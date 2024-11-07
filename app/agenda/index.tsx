import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "../../components/BottomNavigation";
import { getPros } from "../../libs/apiConfig";
import { Calendar } from "react-native-calendars";
import ProCardCarousel from "../../components/ProCardCarousel";

interface Animal {
  id: number;
  name: string;
}

interface Pro {
  id: number;
  name: string;
  profession: string;
  location: string;
  firstname: string;
  phone: string;
  animals: Animal[];
  imageUrl: any;
}

const Agenda: React.FC = () => {
  const [pros, setPros] = useState<Pro[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState<{
    [key: string]: {
      note: string;
      firstname: string;
      category: string;
      phone: string;
      time: string;
      location: string;
    };
  }>({});
  const [note, setNote] = useState("");
  const [firstname, setFirstname] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [animalInfo, setAnimalInfo] = useState("");
  const [consultationReason, setConsultationReason] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const requiredFields = [
    "note",
    "category",
    "firstname",
    "phone",
    "location",
    "animal",
    "time",
  ];

  useEffect(() => {
    const fetchPros = async () => {
      const prosData = await getPros();
      const formattedPros = prosData.map((pro: any) => ({
        id: pro.id,
        name: pro.name,
        profession: pro.profession,
        location: pro.location,
        firstname: pro.firstname,
        phone: pro.phone,
        animals: pro.animals.map((animal: any) => ({
          id: animal.id,
          name: animal.name,
        })),
        imageUrl: require("../../assets/images/pdp-default.png"),
      }));
      setPros(formattedPros);
    };

    fetchPros();
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    const appointment = appointments[day.dateString] || {
      note: "",
      category: "",
      firstname: "",
      phone: "",
      time: new Date().toISOString(),
      location: "",
    };
    setNote(appointment.note);
    setFirstname(appointment.firstname);
    setCategory(appointment.category);
    setPhone(appointment.phone);
    setTime(new Date(appointment.time));
    setLocation(appointment.location);
    setModalVisible(true);
  };

  const handleSaveAppointment = () => {
    if (!isSaveEnabled()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setAppointments({
      ...appointments,
      [selectedDate]: {
        note,
        firstname,
        phone,
        category,
        time: time.toISOString(),
        location,
      },
    });
    setModalVisible(false);
  };

  const isSaveEnabled = () => {
    return requiredFields.every((field) => {
      if (field === "note") return note.trim() !== "";
      if (field === "category") return category.trim() !== "";
      if (field === "firstname") return firstname.trim() !== "";
      if (field === "phone") return phone.trim() !== "";
      if (field === "location") return location.trim() !== "";
      if (field === "animal") return animal.trim() !== "";
      if (field === "time") return !!time;
      return true;
    });
  };

  const handleDeleteAppointment = () => {
    const updatedAppointments = { ...appointments };
    delete updatedAppointments[selectedDate];
    setAppointments(updatedAppointments);
    setModalVisible(false);
  };

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <View className="flex-1">
      {/* ImageBackground en arrière-plan */}
      <Image
        source={require("../../assets/images/bg-agenda.png")}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />

      {/* Contenu principal par-dessus l'arrière-plan */}
      <View className="flex-1">
        {/* Header avec fond orange */}
        <ImageBackground
          source={require("../../assets/images/rectangle_orange.png")}
          className="w-full h-32"
          resizeMode="cover"
        >
          <View className="flex justify-center h-full">
            <Text className="text-2xl font-bold text-white ml-5 mt-10">
              Mon Agenda :
            </Text>
          </View>
        </ImageBackground>

        {/* Modal de rendez-vous */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <KeyboardAvoidingView
            className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View className="bg-white p-5 rounded-xl w-[85%] h-[80%]">
              <ScrollView
                contentContainerStyle={{
                  alignItems: "center",
                  paddingBottom: 20,
                }}
              >
                <Text className="text-xl font-bold mb-4 text-gray-800">
                  Veuillez ajouter un RDV :
                </Text>

                {/* Nom */}
                <View style={{ width: "100%", marginBottom: 15 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Nom
                    <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#CCC",
                    }}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="#999"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Entrez le nom"
                      placeholderTextColor="#999"
                      value={note}
                      onChangeText={setNote}
                      style={{ fontSize: 16, flex: 1 }}
                    />
                  </View>
                </View>

                {/* Prénom */}
                <View style={{ width: "100%", marginBottom: 15 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Prénom
                    <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#CCC",
                    }}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="#999"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Entrez le prénom"
                      placeholderTextColor="#999"
                      value={firstname}
                      onChangeText={setFirstname}
                      style={{ fontSize: 16, flex: 1, paddingVertical: 10 }}
                    />
                  </View>
                </View>

                {/* Adresse mail */}
                <View style={{ width: "100%", marginBottom: 15 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Adresse mail
                    <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#CCC",
                    }}
                  >
                    <Ionicons
                      name="mail-unread-outline"
                      size={20}
                      color="#999"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Entrez l'adresse mail du client"
                      placeholderTextColor="#999"
                      value={category}
                      onChangeText={setCategory}
                      style={{ fontSize: 16, flex: 1, paddingVertical: 10 }}
                    />
                  </View>
                </View>

                {/* Téléphone */}
                <View style={{ width: "100%", marginBottom: 15 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Téléphone
                    <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#CCC",
                    }}
                  >
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color="#999"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Entrez le numéro de tel. du client"
                      placeholderTextColor="#999"
                      value={phone}
                      onChangeText={setPhone}
                      style={{ fontSize: 16, flex: 1, paddingVertical: 10 }}
                    />
                  </View>
                </View>

                {/* Quel animal ? */}
                <View style={{ width: "100%", marginBottom: 15 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Quel animal ?<Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#CCC",
                    }}
                  >
                    <Ionicons
                      name="paw-outline"
                      size={20}
                      color="#999"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Type d'animal"
                      placeholderTextColor="#999"
                      value={animal}
                      onChangeText={setAnimal}
                      style={{ fontSize: 16, flex: 1, paddingVertical: 10 }}
                    />
                  </View>
                </View>

                {/* Informations sur l'animal */}
                <View style={{ width: "100%", marginBottom: 15 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Informations sur l'animal
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#CCC",
                    }}
                  >
                    <Ionicons
                      name="information-circle-outline"
                      size={20}
                      color="#999"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Informations sur l'animal"
                      placeholderTextColor="#999"
                      value={animalInfo}
                      onChangeText={setAnimalInfo}
                      style={{ fontSize: 16, flex: 1, paddingVertical: 10 }}
                    />
                  </View>
                </View>

                {/* Motif de consultation */}
                <View style={{ width: "100%", marginBottom: 15 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Motif de consultation
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#CCC",
                    }}
                  >
                    <Ionicons
                      name="help-outline"
                      size={20}
                      color="#999"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Motif de consultation"
                      placeholderTextColor="#999"
                      value={consultationReason}
                      onChangeText={setConsultationReason}
                      style={{ fontSize: 16, flex: 1, paddingVertical: 10 }}
                    />
                  </View>
                </View>

                {/* Lieu */}
                <View style={{ width: "100%", marginBottom: 15 }}>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Lieu
                    <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#CCC",
                    }}
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color="#999"
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Entrez le lieu"
                      placeholderTextColor="#999"
                      value={location}
                      onChangeText={setLocation}
                      style={{ fontSize: 16, flex: 1, paddingVertical: 10 }}
                    />
                  </View>
                </View>

                {/* Sélection de l'heure */}
                <TouchableOpacity
                  onPress={() => setShowTimePicker(!showTimePicker)}
                  style={{
                    width: "100%",
                    borderColor: "#CCC",
                    paddingVertical: 10,
                    alignItems: "center",
                    marginBottom: 15,
                    backgroundColor: "#F5F5F5",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#333" }}>
                    Sélectionner une heure
                    <Text style={{ color: "red" }}>*</Text>
                  </Text>
                </TouchableOpacity>

                {showTimePicker && (
                  <DateTimePicker
                    value={time}
                    mode="time"
                    display="spinner"
                    onChange={onChangeTime}
                    textColor="#333"
                  />
                )}

                <Button
                  title="Enregistrer"
                  onPress={handleSaveAppointment}
                  color="#007AFF"
                  disabled={!isSaveEnabled()}
                />
                <Button
                  title="Supprimer"
                  onPress={handleDeleteAppointment}
                  color="#FF3B30"
                />
                <Button
                  title="Annuler"
                  onPress={() => setModalVisible(false)}
                  color="#8E8E93"
                />
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        {/* Contenu principal scrollable */}
        <ScrollView className="mt-5">
          <View className="w-full items-center">
            <View className="w-[90%] overflow-hidden rounded-xl">
              <Calendar
                style={{
                  width: "100%",
                  height: 310,
                  borderRadius: 10,
                }}
                current={new Date().toISOString().split("T")[0]}
                minDate={new Date().toISOString().split("T")[0]}
                firstDay={1}
                markedDates={{
                  ...Object.keys(appointments).reduce((acc, date) => {
                    acc[date] = { marked: true, dotColor: "#C34C2B" };
                    return acc;
                  }, {}),
                  [selectedDate]: { selected: true, selectedColor: "#C34C2B" },
                }}
                onDayPress={handleDayPress}
              />
            </View>
          </View>

          <View className="w-full mt-4 items-center">
            <ProCardCarousel pros={pros} />
          </View>
        </ScrollView>

        {/* Barre de navigation en bas */}
        <BottomNavigation />
      </View>
    </View>
  );
};

export default Agenda;
