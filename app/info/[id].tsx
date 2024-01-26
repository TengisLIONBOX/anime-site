import { useGlobalSearchParams } from "expo-router";
import { Text, View, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export default function Info() {
  const { id } = useGlobalSearchParams();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`https://kitsu.io/api/edge/anime/${id}`);
        setData(result.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#1F222A",
      }}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,1)"]}
        style={{
          position: "absolute",
          width: "100%",
          height: "10%",
          flex: 1,
          transform: "rotate(180deg)",
          zIndex: 2,
        }}
      />
      {data.attributes && data.attributes.coverImage && (
        <ImageBackground
          source={{
            uri: `${data.attributes.coverImage.original}`,
          }}
          style={{
            width: 500,
            height: 270,
          }}
        />
      )}

      {data.attributes &&
        data.attributes.description &&
        data.attributes.canonicalTitle && (
          <View>
            <Text style={{ color: "white", fontWeight: "700", fontSize: 30 }}>
              {data.attributes.canonicalTitle}
            </Text>
            <Text style={{ color: "white" }}>
              {data.attributes.description}
            </Text>
          </View>
        )}

      {(!data.attributes ||
        !data.attributes.coverImage ||
        !data.attributes.description) && <Text>Loading...</Text>}
    </View>
  );
}
