import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '@/components/navBar';

const EditRewardScreen = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [pointCost, setPointCost] = useState('');
  const [inventoryQuantity, setInventoryQuantity] = useState('10');
  const [restockCycle, setRestockCycle] = useState('None');
  const [limitedStock, setLimitedStock] = useState(true);

  const restockOptions = ['None', 'Daily', 'Weekly', 'Monthly'];

  const handleSave = () => {
    // Implementation for saving the reward
    console.log('Saving reward:', {
      productName,
      description,
      pointCost,
      inventoryQuantity,
      restockCycle,
      limitedStock
    });
  };

  const handleAddProduct = () => {
    // Implementation for adding the product
    console.log('Adding product:', {
      productName,
      description,
      pointCost,
      inventoryQuantity,
      restockCycle,
      limitedStock
    });
  };

  const handleImageUpload = () => {
    // Implementation for image upload
    console.log('Opening image upload');
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
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            value={productName}
            onChangeText={setProductName}
            placeholderTextColor="#9ca3af"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter a detailed description"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#9ca3af"
          />

          <Text style={styles.label}>Point Cost</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 500"
            value={pointCost}
            onChangeText={setPointCost}
            keyboardType="numeric"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Restock Cycle Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Restock Cycle</Text>
          <View style={styles.buttonRow}>
            {restockOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.cycleButton,
                  restockCycle === option && styles.cycleButtonSelected
                ]}
                onPress={() => setRestockCycle(option)}
              >
                <Text
                  style={[
                    styles.cycleButtonText,
                    restockCycle === option && styles.cycleButtonTextSelected
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Limited Stock Section */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Limited Stock</Text>
            <Switch
              value={limitedStock}
              onValueChange={setLimitedStock}
              trackColor={{ false: '#374151', true: '#2b8cee' }}
              thumbColor={limitedStock ? '#ffffff' : '#94a3b8'}
            />
          </View>

          {limitedStock && (
            <>
              <Text style={styles.label}>Inventory Quantity</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 10"
                value={inventoryQuantity}
                onChangeText={setInventoryQuantity}
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
              />
            </>
          )}
        </View>

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
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#334155', // slate-700 dark
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#ffffff', // white in dark mode
    backgroundColor: '#1e293b', // slate-800 dark
  },
  textArea: {
    height: 144,
    paddingTop: 15,
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
