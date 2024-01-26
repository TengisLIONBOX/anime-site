import { useGlobalSearchParams, useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function All() {
  const { id } = useGlobalSearchParams();
  const [data, setData] = useState<any>({});
  const router = useRouter();
  const [basket, setBasket] = useState(Boolean);

  useEffect(() => {
    const fetchData = async () => {
      let param = "";
      if (id === "TopHitsAnime") {
        param = "?sort=popularityRank";
      } else if (id === "NewEpisodeReleases") {
        param = "?filter[status]=current";
      }
      try {
        const url = `https://kitsu.io/api/edge/anime${param}`;

        const result = await axios.get(url);
        setData(result.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const stringValue = JSON.stringify(basket);
  //   AsyncStorage.setItem("basket", stringValue);
  // }, [basket]);

  // const isSaved = basket.includes(id + "");

  const toggleBasket = () => {
    setBasket(!basket);
  };

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
        paddingTop: 20,
        backgroundColor: "#1F222A",
      }}
    >
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
              <TouchableOpacity onPress={toggleBasket}>
                {basket ? (
                  <Text
                    style={{
                      borderWidth: 2,
                      borderColor: "white",
                      borderRadius: 30,
                      height: 40,
                      width: 100,
                      padding: 10,
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    ✓ My List
                  </Text>
                ) : (
                  <Text
                    style={{
                      backgroundColor: "#06C149",
                      borderRadius: 30,
                      height: 40,
                      width: 100,
                      padding: 10,
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    + My List
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
