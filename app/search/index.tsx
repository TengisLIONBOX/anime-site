import { useGlobalSearchParams, useRouter } from "expo-router";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";

export default function Search() {
  const [data, setData] = useState<any>({});
  const [param, setParam] = useState("");
  const router = useRouter();

  const search = () => {
    const fetchData = async () => {
      try {
        const url = `https://kitsu.io/api/edge/anime?filter[text]=${param}`;

        const result = await axios.get(url);
        setData(result.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };

  console.log(param);

  // useEffect(() => {
  //   const stringValue = JSON.stringify(basket);
  //   AsyncStorage.setItem("basket", stringValue);
  // }, [basket]);

  // const isSaved = basket.includes(id + "");

  //   const newBasket = [...basket];
  //   const index = newBasket.findIndex((unitId) => unitId === id + "");
  //   newBasket.splice(index, 1);
  //   setBasket(newBasket);
  // };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
        backgroundColor: "#1F222A",
      }}
    >
      <SafeAreaView>
        <TextInput
          keyboardType="ascii-capable"
          style={{
            width: 260,
            height: 60,
            margin: 10,
            borderWidth: 1,
            padding: 10,
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
        >
          {/* <AntDesign
            name="search1"
            size={20}
            color="#757575"
            style={{ marginRight: 10 }}
          />{" "} */}
        </TextInput>
      </SafeAreaView>
      <Button title="search" onPress={search} />

      <FlatList
        data={data}
        renderItem={({ item }: any) => (
          <View
            style={{
              width: 340,
              flex: 1,
              flexDirection: "row",
              marginBottom: 15,
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
    </View>
  );
}
