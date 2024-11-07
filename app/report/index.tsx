import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getConsultation } from "../../libs/apiConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomNavigation from "../../components/BottomNavigation";

interface Consultation {
  date: string;
  pet: {
    name: string;
  };
  location: string;
  service: string;
  time: string;
}

const ReportPage: React.FC = () => {
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const consultationId = 1;

    const fetchConsultation = async () => {
      const data = await getConsultation(consultationId);
      setConsultation(data);
    };

    fetchConsultation();
  }, []);

  const onChangeDate = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      setSelectedDate(formattedDate);
    }
  };

  if (!consultation) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View className="flex-1 bg-[#B3C7F9]">
      <ScrollView
        className="flex-1 p-4 pt-20 mb-20"
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header */}
        <View className="flex-row items-center mb-4">
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text className="text-center flex-1 text-2xl font-bold text-white">
            Compte-rendu de consultation
          </Text>
        </View>

        {/* Consultation Info Card */}
        <View className="bg-white rounded-xl shadow-md p-4 flex-row items-center mb-6">
          <View className="flex-1 ml-4">
            <Text className="text-xs text-[#3C3C3C]">{consultation.date}</Text>
            <Text className="text-lg font-bold text-[#3C3C3C]">
              {consultation.pet.name}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={16} color="#FF6464" />
              <Text className="text-xs text-[#3C3C3C]">
                {consultation.location}
              </Text>
            </View>
            <Text className="text-xs text-[#FF6464]">
              {consultation.service}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="time-outline" size={16} color="#FF6464" />
              <Text className="text-xs text-[#3C3C3C]">
                {consultation.time}
              </Text>
            </View>
          </View>
        </View>

        {/* Text Inputs */}
        <View>
          <Text className="text-lg font-bold text-white mb-2">
            Le compte-rendu :
          </Text>
          <TextInput
            placeholder="Votre compte-rendu ici..."
            className="bg-white rounded-lg border border-[#FF6464] p-4 mb-4"
            multiline
            numberOfLines={4}
          />

          <Text className="text-lg font-bold text-white mb-2">
            Conseils à appliquer :
          </Text>
          <TextInput
            placeholder="Vos conseils ici..."
            className="bg-white rounded-lg border border-[#FF6464] p-4 mb-4"
            multiline
            numberOfLines={4}
          />

          <Text className="text-lg font-bold text-white mb-2">
            Traitements préconisés :
          </Text>
          <TextInput
            placeholder="Vos traitements ici..."
            className="bg-white rounded-lg border border-[#FF6464] p-4 mb-4"
            multiline
            numberOfLines={4}
          />

          <Text className="text-lg font-bold text-white mb-2">
            Autres conseils :
          </Text>
          <TextInput
            placeholder="Vos conseils ici..."
            className="bg-white rounded-lg border border-[#FF6464] p-4 mb-6"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Ajouter un document */}
        <TouchableOpacity className="flex-row items-center justify-center bg-[#FF6464] rounded-full px-4 py-2 mb-6">
          <Ionicons name="add-circle-outline" size={20} color="white" />
          <Text className="text-white font-bold ml-2">
            Ajouter un document associé
          </Text>
        </TouchableOpacity>

        {/* Prochaine date de consultation */}
        <View className="bg-[#FF6464] rounded-lg p-4 mb-6">
          <Text className="text-lg font-bold text-white text-center mb-4">
            Prochaine date de consultation conseillée :
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="flex-row items-center justify-center mb-4"
          >
            <Ionicons name="calendar-outline" size={20} color="white" />
            <Text className="text-white font-bold ml-2">
              {selectedDate ? selectedDate : "Date de la consultation"}
            </Text>
          </TouchableOpacity>
          <Text className="text-center text-white text-xs mt-2">
            Non obligatoire, si renseigné un rappel sera envoyé
          </Text>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Enregistrer Button */}
        <TouchableOpacity className="bg-[#FF6464] rounded-full py-3 mt-4">
          <Text className="text-center text-white font-bold">ENREGISTRER</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barre de navigation fixe en bas */}
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation />
      </View>
    </View>
  );
};

export default ReportPage;
