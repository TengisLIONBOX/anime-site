import { Link, useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Link
        href="../"
        style={{ backgroundColor: "#ADD8E6", padding: 10, borderRadius: 10 }}
      >
        Go back
      </Link>

      <Text>
        {data.attributes && data.attributes.slug && data.attributes.description}
      </Text>
    </View>
  );
}
