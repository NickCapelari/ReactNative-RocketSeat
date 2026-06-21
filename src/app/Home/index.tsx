import { View, Image, TouchableOpacity, Text, FlatList } from "react-native"

import { FilterStatus } from "@/types/FilterStatus"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { Item } from "@/components/Item"

import { styles } from "./styles"


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  { id: "1", status: FilterStatus.DONE, description: "Pacote de café" },
  { id: "2", status: FilterStatus.PENDING, description: "Macarrão" },
  { id: "3", status: FilterStatus.PENDING, description: "Cebolas" },
]

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que vc precisa comprar?" />
        <Button title="Entrar" />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (<Filter key={status} status={status} isActive />))
          }
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>



        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => console.log("Muda status")}
              onRemove={() => console.log("remover")}

            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={()=><View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum Item adicionado</Text>}
        />



      </View>
    </View>
  )
}
