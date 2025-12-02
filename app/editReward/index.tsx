import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import NavBar from '@/components/navBar';
import { productTemplates } from "@/db"
import CustomInput from '@/components/customInput';
import Scheduling from "@/components/Scheduling";
import * as imagePicker from "expo-image-picker";
import { getEmptyProduct } from "./lib"

const EditRewardScreen = () => {
  const [reward, setReward] = useState<typeof productTemplates.$inferInsert>(getEmptyProduct());

  const handleSave = () => {
    // Implementation for saving the reward
    console.log('Saving reward:', reward);
  };

  const handleAddProduct = () => {
    // Implementation for adding the product
    console.log('Adding product:', reward);
  };

  const handleImageUpload = async () => {
    const result = await imagePicker.launchImageLibraryAsync();
    // Implementation for image upload
    console.log('Opening image upload', result);
  };

  return (
    <View style={styles.container}>
      <NavBar title="Add New Reward" back rightNode={
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      } />

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {/* Image Uploader */}
        <View style={styles.imageUploaderContainer}>
          <View style={styles.imageUploaderContent}>
            <Text style={styles.imageUploaderTitle}>Upload Product Image</Text>
            <Text style={styles.imageUploaderSubtitle}>Tap to add an image for your new product.</Text>
          </View>
          <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        {/* Core Information Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Product Name</Text>
          <CustomInput
            placeholder="Enter product name"
            value={reward.title}
            onChangeText={(title) => setReward(prev => ({ ...prev, title }))}
          />

          <Text style={styles.label}>Description</Text>
          <CustomInput
            placeholder="Enter a detailed description"
            value={reward.description?.toString()}
            onChangeText={(description) => setReward(prev => ({ ...prev, description }))}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.label}>Point Cost</Text>
          <CustomInput
            placeholder="e.g., 500"
            value={reward.pointsCost.toString()}
            onChangeText={(pointsCost) => setReward(prev => ({ ...prev, pointsCost: parseInt(pointsCost) || 0 }))}
            keyboardType="numeric"
          />
        </View>

        {/* Type and Validity Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Product Type</Text>
          <View style={styles.buttonRow}>
            {(['consumable', 'permanent'] as const).map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.cycleButton,
                  reward.type === option && styles.cycleButtonSelected
                ]}
                onPress={() => setReward(prev => ({ ...prev, type: option }))}
              >
                <Text
                  style={[
                    styles.cycleButtonText,
                    reward.type === option && styles.cycleButtonTextSelected
                  ]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: 16 }]}>Valid Duration (ms)</Text>
          <CustomInput
            placeholder="e.g., 0 (0 for permanent, 86400000 for 1 day)"
            value={reward.validDuration?.toString()}
            onChangeText={(validDuration) => setReward(prev => ({ ...prev, validDuration: parseInt(validDuration) || 0 }))}
            keyboardType="numeric"
          />
        </View>

        {/* Availability Section */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Enabled</Text>
            <Switch
              value={reward.enabled}
              onValueChange={(enabled) => setReward(prev => ({ ...prev, enabled }))}
              trackColor={{ false: '#374151', true: '#2b8cee' }}
              thumbColor={reward.enabled ? '#ffffff' : '#94a3b8'}
            />
          </View>

        </View>

        <Scheduling
          replenishmentMode={reward.replenishmentMode || 'none'}
          replenishmentInterval={reward.replenishmentInterval || 0}
          replenishmentDaysOfWeek={reward.replenishmentDaysOfWeek || ''}
          replenishmentDaysOfMonth={reward.replenishmentDaysOfMonth || ''}
          onReplenishmentModeChange={(mode) =>
            setReward((prev) => ({ ...prev, replenishmentMode: mode }))
          }
          onReplenishmentIntervalChange={(interval) =>
            setReward((prev) => ({ ...prev, replenishmentInterval: interval }))
          }
          onReplenishmentDaysOfWeekChange={(days) =>
            setReward((prev) => ({ ...prev, replenishmentDaysOfWeek: days }))
          }
          onReplenishmentDaysOfMonthChange={(days) =>
            setReward((prev) => ({ ...prev, replenishmentDaysOfMonth: days }))
          }
        />

        {/* Spacer to push button to bottom */}
        <View style={styles.flexGrow} />

        {/* Add Product Button - Moved inside scroll view to match HTML structure */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101922', // dark background
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  backIcon: {
    fontSize: 16,
    color: '#ffffff', // white in dark mode
  },
  topAppBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // white in dark mode
    flex: 1,
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.24, // tracking-[-0.015em]
  },
  saveButton: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b8cee', // primary color
    lineHeight: 20,
    letterSpacing: 0.24, // tracking-[0.015em]
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 16,
    gap: 24,
  },
  flexGrow: {
    flex: 1,
  },
  imageUploaderContainer: {
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#334155', // slate-700 dark
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#1e293b', // slate-800 dark
  },
  imageUploaderContent: {
    alignItems: 'center',
    maxWidth: 480,
    gap: 8,
  },
  imageUploaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // white in dark mode
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.24, // tracking-[-0.015em]
  },
  imageUploaderSubtitle: {
    fontSize: 14,
    color: '#94a3b8', // slate-400 dark
    textAlign: 'center',
    lineHeight: 20,
  },
  uploadButton: {
    minWidth: 84,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 40,
    backgroundColor: '#2b8cee33', // primary with 20% opacity
    paddingHorizontal: 16,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2b8cee', // primary color
    lineHeight: 20,
    letterSpacing: 0.24, // tracking-[0.015em]
  },
  section: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff', // white in dark mode
    lineHeight: 20,
    paddingBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cycleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    backgroundColor: '#1e293b', // slate-800 dark
    borderWidth: 1,
    borderColor: '#334155', // slate-700 dark
  },
  cycleButtonSelected: {
    backgroundColor: '#2b8cee', // primary
    borderColor: '#2b8cee', // primary
  },
  cycleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff', // white in dark mode
  },
  cycleButtonTextSelected: {
    color: '#ffffff',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    paddingTop: 8,
  },
  addButton: {
    minWidth: 84,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    height: 56,
    backgroundColor: '#2b8cee', // primary
    paddingHorizontal: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 20,
    letterSpacing: 0.24, // tracking-[0.015em]
  },
});

export default EditRewardScreen;
