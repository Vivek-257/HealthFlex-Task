import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import TimerItem from './TimerItem';

const TimerList = ({ timers }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <View>
      {Object.keys(groupedTimers).map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => toggleCategory(category)}>
            <Text style={styles.categoryHeader}>
              {category} {expandedCategories[category] ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>

          {expandedCategories[category] && (
            <FlatList
              data={groupedTimers[category]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <TimerItem name={item.name} duration={item.duration} />}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 10,
  },
  categoryHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#DDD',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default TimerList;
