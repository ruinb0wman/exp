import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { History, Search, Star, Plus } from 'lucide-react-native';
import CustomInput from '@/components/customInput';
import Navbar from '@/components/navBar'
import { useTheme } from '@/context/theme';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Shop = () => {
  const [selectedChip, setSelectedChip] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { colors, size } = useTheme();
  const router = useRouter();


  const rewards = [
    { id: 1, name: '1-Month Streaming', points: '500 PTS', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKa4TzRKo6waxNjMh_IKTuwH0zVZ6HpSFavjgMfjrxVU4pWJiSOH4nJMV_FK9cpa52OW-HJZVY5m8RpjF7Dmn8MrgksQ5pG768K97XEDZF_Im0Cs6yPcqkTqIWbUZiPAj9yO5niOzC9yyaU29iOzarbx3vF5RvwGouDU8qNEJMt3yMUuP4yRlzdQ81Pzcb8yMpagr26rNXcd9DYl5XLXZDB9u60ndpFTUhLlETdXdnMicfdrEHtZ2w1_vFgf3J3s8ZFS8kwvOBi-4', available: true },
    { id: 2, name: 'Premium App Access', points: '800 PTS', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4fmkxKwFfRMdAjBbS1IbiJczWCG_exP3Vlqak1duEG91qgST090fNugzkOLUgcFt4CHGvlXzyrSv3nwruiJBbuiPNlhqclbvVd8yeT3zRubHaNuGwBf-j9njt7F4EK9MpWeCR6QgosmjRFVOT1hsRgfxhRO6gbtIB7vDO98R-zlMldgIql3_RCk7Vq2UVI-2-P1YQxF73vLxVHBNuawIDT5BNph9C1COEHUuO1Aa2JiDFG7AOdH-NzYUoEaDHjwnFNmwQyWMPRJ4', available: true },
    { id: 3, name: 'Digital Gift Card', points: '1000 PTS', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCTXxE1geG88zf0DHrqaDkukRnYqJTEHIy7ldf-rkf7Q1XiGebLcjnSQwYNgk-upwFnz3DgyMaZ7jj0n-MmVNPy2hjRtsFhGyo9A3qtDwO3jGUPAcwjyypQKrGsfZfoUzrUMeL5lDGBpsp5AvG2wInKoRP1uRYQ3P-Q_1E1Z_Mlh1W-UbsbAXa24TP2eYPP_xpeleoplowE7Wugdt2NG87PzNXWIxQS4KsnQexKURokmBzZXqYqhSnT5djkdIDdJytNwFHPz9LuLE', available: true },
    { id: 4, name: 'Branded T-Shirt', points: '1500 PTS', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtHdcqXcam6CkTNVQbCIdBcbxHeFdl3JBL0nSlOcdnBv7sjj5j1PEuv6Hu0QRrVLR7GhTIgHvWwLqLRykyfikznlVkGyE50wCEsFsLoXbgKvxHQC-8i_a_UjqNJAGayA3Dq_CrIX0_1-RZLUtF9Cxg6zcIWcVvNAmgEalAZARh8MTLEzfp_G5Ujwk5Owvb87uUhYLuknZayqiWX7BAb55Ic06DfHAJIjLJwniv4yuFCFHahOThmpx8pwVUSOxsMWW2MVXIW4aQvYs', available: true },
    { id: 5, name: 'Guided Meditation', points: '4000 PTS', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClRmtH0k9D7iZjWNTZ0SaNPrTRI-u7hOUh45W54w6bNRwHb1UWQOqvdIReQ9qbusaFFZnUUuM_Fn6I3qdh2G7QarJDHcOl5B3A3sw-zhoEJNkU2JhQt8h78mAVA0kGO7FiyZpqIUXYp_8GMVH1Daclb46ibuuhxmI9qpFQ3CdvN7-2ZeiKL0xtU7Ug0viPfan0MSZtpp4csjKLu0Tr-6YsUd-D6gGs4MAQwKZlClL8_754OO0reP6WFJyfVaN3KaaPTnBBUpksW4Q', available: false },
    { id: 6, name: 'Tree Donation', points: '250 PTS', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-oTiKTrGdVAKIurddyMv-O7D2i1vNHu7-KeFrNUsHJUgifeBiArF4lb-V0Txpg2cS8W-t77hLRYkg8Dh38jaQRyU5n61vwvtg50qi2vO7PbDvtsEfAmTJeX6B8MI22K0O8UtSP5fnZtiz8HVQKhLFlXbTn6OkvrfPMr-USKkFLSN2HkThOwurGpiMrAS5H7KnITEqNFj_sX4fTwXVB39hZbfo2nSjvG1F9S16EUrHzrWdmEbprEsF3jUPcT91OWxLv66WYgZgURY', available: true },
    { id: 7, name: 'Insulated Water Bottle', points: '1200 PTS', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy0M_Lg9AQjwzKCm0chwa_yuc0O6o0brRB4TDi4b__hgGlo1RWt3d5c2Ew11NC3IPjKWAV-Ckb8Vh2qVfgxcCZmgzhvjKl0VKtQPywXXmfo8irwOVZ_cJ02K0MDexbyj5g_TFH3ZoOHZnujTuFf1HK-f0QiRySc1SaL1yYSqEBXSdbWnWG_CRffKVCBcWN4QhsVHPNIIxxmC1q8Fg1OX-cP4kLR9rnSzOFInqnTzcuuqJMUau2dac89HKqV8HjKpJDggIfv8cMnVc', available: true },
    { id: 8, name: 'Concert Tickets', points: '5000 PTS', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6EF4Oexp44DrgsUyNIWcTd7HKImrPQp4crj69_P30UsurGVpWxEzr1lzMkHxEoPQW0YoB4b5-5PN7mL9r_AU4GIYxNV4vEY7sX9yCCJ_btQaVE-8EEp9IqKnsx3rDQpEsNgvZ4gJLGgtAULPltVNYorVXnm-QaEaa9aTns10xlFrhfEh-tNxGRg71lcEa39WhDYn7PDo4YYVsa5Sa5PgePTslY_ywx06dLbPwMZSMY2AeW1pkZ6ao3JcThPxADaT1vaBQ1PB-cgk', available: false },
  ];

  const chips = ['All', 'Digital', 'Physical', 'Experiences', 'Donations'];

  return (
    <View style={styles.container}>
      <Navbar title='Rewards Store'
        leftNode={<History color={colors.text} size={size.icon} />}
        rightNode={
          <TouchableOpacity onPress={() => router.push('/editReward')}>
            <Plus color={colors.text} size={size.icon} />
          </TouchableOpacity>
        }
      />
      <ScrollView >
        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsCardContent}>
            <View>
              <Text style={styles.yourPointsText}>Your Points</Text>
              <Text style={styles.pointsText}>1,250 PTS</Text>
            </View>
            <View style={styles.premiumIconContainer}>
              <Star size={32} color="#fff" fill="#fff" />
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9ca3af" style={styles.searchIcon} />
            <CustomInput
              style={styles.searchInput}
              placeholder="Search for rewards"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScrollView}>
          <View style={styles.chipsContainer}>
            {chips.map((chip) => (
              <TouchableOpacity
                key={chip}
                style={[
                  styles.chip,
                  selectedChip === chip ? styles.selectedChip : styles.unselectedChip
                ]}
                onPress={() => setSelectedChip(chip)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedChip === chip ? styles.selectedChipText : styles.unselectedChipText
                  ]}
                >
                  {chip}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Rewards Grid */}
        <View style={styles.rewardsGrid}>
          {rewards.map((reward) => (
            <View key={reward.id} style={styles.rewardCard}>
              <Image
                source={{ uri: reward.image }}
                style={[
                  styles.rewardImage,
                  !reward.available && styles.rewardImageDisabled
                ]}
                resizeMode="cover"
              />
              <View style={styles.rewardInfo}>
                <Text style={[
                  styles.rewardName,
                  !reward.available && styles.rewardTextDisabled
                ]}>
                  {reward.name}
                </Text>
                <Text style={[
                  styles.rewardPoints,
                  !reward.available && styles.rewardTextDisabled
                ]}>
                  {reward.points}
                </Text>
              </View>
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
  },
  pointsCard: {
    marginVertical: 16,
    borderRadius: 12,
    backgroundColor: '#2b8cee4d', // 30% opacity of primary color in dark mode
    padding: 16,
  },
  pointsCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yourPointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  pointsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  premiumIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2b8cee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#1f2937',
    borderRadius: 12,
  },
  searchIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
  chipScrollView: {
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  chip: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedChip: {
    backgroundColor: '#2b8cee',
  },
  unselectedChip: {
    backgroundColor: '#1f2937',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#fff',
  },
  unselectedChipText: {
    color: '#fff',
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 16,
  },
  rewardCard: {
    width: (width - 46) / 2, // Two columns with 16px gap and 16px padding
  },
  rewardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  rewardImageDisabled: {
    opacity: 0.5,
  },
  rewardInfo: {
    marginTop: 8,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  rewardPoints: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#9ca3af',
  },
  rewardTextDisabled: {
    opacity: 0.5,
  },
});

export default Shop;
