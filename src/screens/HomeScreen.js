
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { loadTimers } from '../../utils/storage';
import TimerItem from '../components/TimerItem';

const HomeScreen = () => {
  const [timers, setTimers] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [resetAll, setResetAll] = useState(false); 
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchTimers = async () => {
        const savedTimers = await loadTimers();
        setTimers(savedTimers);
      };
      fetchTimers();
    }, [])
  );

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Reset all timers in a category
  const resetAllTimers = () => {
    setResetAll((prev) => !prev); // Toggle state to trigger reset in TimerItem
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Timers</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTimer')}>
        <Text style={styles.addButtonText}>+ Add New Timer</Text>
      </TouchableOpacity>

      <FlatList
        data={Object.keys(groupedTimers)}
        keyExtractor={(category) => category}
        renderItem={({ item: category }) => (
          <View style={styles.categoryContainer}>
            <TouchableOpacity onPress={() => toggleCategory(category)}>
              <Text style={styles.categoryHeader}>
                {category} {expandedCategories[category] ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>

            {expandedCategories[category] && (
              <>
                <FlatList
                  data={groupedTimers[category]}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TimerItem timer={item} resetAll={resetAll} />
                  )}
                />
                {/* Bulk Reset Button */}
                <TouchableOpacity style={styles.resetAllButton} onPress={resetAllTimers}>
                  <Text style={styles.resetAllText}>Reset All</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 8,
    backgroundColor: '#DDD',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  resetAllButton: {
    marginTop: 10,
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  resetAllText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
