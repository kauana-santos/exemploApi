import { BuscarUsuario } from "@/api/get-usuario"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams } from "expo-router"
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native"

export default function Perfil() {
  const { id } = useLocalSearchParams<{id: string}>()

  const {data, isError, isLoading} = useQuery({
    queryKey: ["Usuario", id],
    queryFn: () => BuscarUsuario(id)
  })

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
        <View style={style.container}>
            <Image style={style.avatar} source={{uri: data.avatar}}/>
            <Text style={style.nome}>{data.first_name} {data.last_name}</Text>
            <Text style={style.email}>{data.email}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    centro:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 6
    },
    avatar:{
        width:100,
        height:100,
        borderRadius: 50,
        marginBottom: 8
    },
    nome: {
        fontSize:20,
        fontWeight:"600"
    },
    email:{
        fontSize:14
    }
})
