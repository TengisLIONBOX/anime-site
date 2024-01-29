import { useRouter } from "expo-router";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Search() {
  const [data, setData] = useState<any>([]);
  const [param, setParam] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const search = async () => {
    setLoading(true);
    try {
      const url = `https://kitsu.io/api/edge/anime?filter[text]=${param}`;
      const result = await axios.get(url);
      setData(result.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 70,
        backgroundColor: "#1F222A",
      }}
    >
      <SafeAreaView style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          keyboardType="ascii-capable"
          style={{
            width: 200,
            height: 60,
            margin: 10,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: "#181A20",
            color: "white",
            flexDirection: "row",
            alignItems: "center",
          }}
          defaultValue={param}
          onChangeText={(text) => setParam(text)}
          placeholder="Search..."
          placeholderTextColor="#757575"
        />
        <TouchableOpacity
          onPress={search}
          style={{
            height: 50,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              borderWidth: 3,
              borderColor: "#06C149",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text style={{ color: "white" }}>SEARCH</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }: any) => (
            <View
              style={{
                width: 340,
                flex: 1,
                flexDirection: "row",
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                onPress={() => router.push(`/info/${item.id}`)}
              >
                <Image
                  source={{
                    uri: `${item.attributes.posterImage.small}`,
                  }}
                  style={{
                    width: 150,
                    height: 210,
                    marginRight: 10,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>

              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    width: 180,
                    color: "white",
                    fontSize: 17,
                    marginBottom: 90,
                  }}
                >
                  {item.attributes.canonicalTitle}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}
