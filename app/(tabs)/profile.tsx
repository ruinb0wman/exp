import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import NavBar from '@/components/navBar';
import { Settings } from 'lucide-react-native';
import { useTheme } from '@/context/theme';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const { colors, size } = useTheme();

  const recentActivities = [
    { id: 1, icon: 'menu_book', title: 'Read a chapter', time: 'Completed today', points: '+10', color: 'green' },
    { id: 2, icon: 'coffee', title: 'Redeemed \'Coffee\'', time: '2 days ago', points: '-50', color: 'red' },
    { id: 3, icon: 'fitness_center', title: '30-minute workout', time: '3 days ago', points: '+25', color: 'green' },
  ];

  const quickActions = [
    { icon: 'backpack', title: 'My Backpack' },
    { icon: 'history', title: 'Task History' },
    { icon: 'edit', title: 'Edit Profile' },
  ];

  const stats = [
    { label: 'Total Points Earned', value: '2,480' },
    { label: 'Tasks Completed', value: '112' },
    { label: 'Items Redeemed', value: '15' },
    { label: 'Current Streak', value: '21 Days' },
  ];

  return (
    <View style={styles.container}>
      <NavBar title="My Profile" rightNode={<Settings color={colors.text} size={size.icon} />} />
      <ScrollView >
        {/* Points Balance Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsCardContent}>
            <Text style={styles.pointsLabel}>CURRENT BALANCE</Text>
            <Text style={styles.pointsValue}>1,250</Text>
            <View style={styles.pointsFooter}>
              <Text style={styles.pointsMessage}>Well done! Keep up the great work.</Text>
            </View>
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <View key={index} style={styles.quickActionItem}>
              <Text style={styles.quickActionIcon}>🎒</Text>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </View>
          ))}
        </View>

        {/* Progress Stats Section */}
        <Text style={styles.sectionTitle}>Progress Stats</Text>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityContainer}>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#2b8cee20' }]}>
                <Text style={[styles.iconText, { color: '#2b8cee' }]}>📚</Text>
              </View>
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <Text style={[styles.activityPoints, { color: activity.color === 'green' ? '#2ecc71' : '#e74c3c' }]}>
                {activity.points}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101922', // Dark background
  },
  topAppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101922',
    padding: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#fff',
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 24,
    color: '#fff',
  },
  emptySpace: {
    width: 48,
    height: 40,
  },
  profileHeader: {
    padding: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  userHandle: {
    fontSize: 16,
    color: '#94a3b8', // Dark mode text color
  },
  pointsCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#2b8cee', // Primary color
    overflow: 'hidden',
  },
  pointsCardContent: {
    padding: 24,
  },
  pointsLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  pointsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  pointsMessage: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  quickActionItem: {
    flex: 1,
    backgroundColor: 'rgba(51, 65, 85, 0.8)', // Dark mode background
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {
    fontSize: 24,
    color: '#2b8cee',
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    minWidth: (width - 48) / 2, // Two columns with padding
    backgroundColor: '#1e293b', // Dark mode card background
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#94a3b8', // Dark mode text color
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  activityContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b', // Dark mode card background
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  activityDetails: {
    flex: 1,
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  activityTime: {
    fontSize: 14,
    color: '#94a3b8', // Dark mode text color
  },
  activityPoints: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
