import { useState, useEffect } from "react"
import { View, Image, TouchableOpacity, Text, FlatList, Alert } from "react-native"

import { FilterStatus } from "@/types/FilterStatus"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Filter } from "@/components/Filter"
import { Item } from "@/components/Item"
import { ItemStorage, itemsStorage } from "@/storage/itemsStorage"

import { styles } from "./styles"



const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]


export function Home() {

  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Digite uma descrição valida!")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)
    await itemsByStatus()
  }

  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "não foi possivel filtrar os items!")
    }
  }

  useEffect(() => {
    itemsByStatus()
  },
    [])

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que vc precisa comprar?"
          onChangeText={setDescription}
        />
        <Text>{description}</Text>
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter
                key={status}
                status={status}
                isActive={status === filter}
                onPress={() => setFilter(status)}
              />
            ))
          }
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => console.log("Muda status")}
              onRemove={() => console.log("remover")}

            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum Item adicionado</Text>}
        />
      </View>
    </View>
  )
}
