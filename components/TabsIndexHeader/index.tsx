import { View, Text, StyleSheet } from 'react-native';

interface Props {
  exp: number;
}

export default function Header({ exp }: Props) {
  const styles = useStyles();
  return (
    <View>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Exp</Text>
            <Text style={styles.greeting}>Good Morning!</Text>
          </View>
        </View>

        <View style={styles.expSection}>
          <View style={styles.starIcon}>
            <Text style={styles.starIconText}>⭐</Text>
          </View>
          <Text style={styles.expText}>{exp} exp</Text>
        </View>
      </View>
    </View>
  )

}

function useStyles() {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    userSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    userInfo: {
      justifyContent: 'center',
    },
    greeting: {
      fontSize: 14,
      color: '#A1A1AA',
      fontFamily: 'Inter',
      fontWeight: '400',
    },
    userName: {
      fontSize: 18,
      color: '#FFFFFF',
      fontFamily: 'Inter',
      fontWeight: '700',
    },
    expSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: '#2b8cee1a',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 24,
    },
    starIcon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    starIconText: {
      fontSize: 18,
      color: '#2b8cee',
    },
    expText: {
      fontSize: 14,
      color: '#2b8cee',
      fontFamily: 'Inter',
      fontWeight: '700',
    },
  })
}
