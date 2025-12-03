import { useEffect, useState, useCallback } from "react"
import { View, StyleSheet, ScrollView, } from "react-native"
import { getAllTaskTemplates } from "@/db/services"
import TaskTemplateCard from "@/components/taskTemplateCard"
import Navbar from "@/components/navBar"
import { taskTemplates } from "@/db"
import { useRouter } from "expo-router"
import { useFocusEffect } from "expo-router"

type Template = typeof taskTemplates.$inferSelect;

export default function TaskTemplates() {
  const router = useRouter();
  const styles = useStyles();
  const [template, setTemplate] = useState<Template[]>([]);

  useFocusEffect(
    useCallback(() => {
      getAllTaskTemplates()?.then((templates: Template[]) => setTemplate(templates));
    }, [])
  )

  return (
    <View style={styles.container}>
      <Navbar title="Task Templates" />
      <ScrollView contentContainerStyle={styles.content}>
        {template.map((template) => (
          <TaskTemplateCard template={template} key={template.id}
            onPress={() => router.push({ pathname: '/editTask', params: { id: template.id } })} />
        ))}
      </ScrollView>
    </View>
  )
}

function useStyles() {
  return StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1 }
  })
}
