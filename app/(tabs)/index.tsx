import { Text } from "react-native"
import { useUser } from "@/store/user";
import { useCallback } from "react";
import { useDbContext } from "@/context/db";
import { useFocusEffect } from "@react-navigation/native";

export default function Index() {
  const { users, setUsers } = useUser();
  const { canUseDB } = useDbContext();

  useFocusEffect(
    useCallback(() => {
      console.log('in', canUseDB, performance.now());
      if (!canUseDB) return;
      setUsers();
    }, [canUseDB]))

  return (
    <>
      <Text>Index</Text>
      {users.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </>
  )
}

