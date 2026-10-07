import { BuscarUsuarios } from "@/api/get-usuarios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter()
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["usuarios"],
    queryFn: BuscarUsuarios,
  });
  if(isLoading){
    return(
      <View style={style.centro}>
        <ActivityIndicator/>
        <Text>Carregando usuários...</Text>
      </View>
    )
  }

  if(isError){
    return(
      <View style={style.centro}>
        <Text>Ops! Erro ao carregar usuários!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      contentContainerStyle={style.lista}
      renderItem={({item}) => (
        <TouchableOpacity style={style.card} onPress={() => router.push(`/perfil/${item.id}`)}>
          <Image source={item.avatar} style={style.avatar}/>
          <View>
            <Text> {item.first_name} {item.last_name}</Text>
            <Text> {item.email}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const style = StyleSheet.create({
  lista:{
    padding:16,
    gap: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    gap: 14
  },
  avatar:{
    width: 56,
    height: 56,
    borderRadius: 28
  },
  nome: {
    fontSize: 16,
    fontWeight:600
  },
  email:{
    fontSize: 13,
    marginTop: 2
  },
  centro:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12
  }
})

