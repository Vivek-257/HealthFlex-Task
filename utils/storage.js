import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMERS_KEY = 'timers';

export const saveTimers = async (timers) => {
  try {
    await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
  } catch (error) {
    console.error('Error saving timers:', error);
  }
};


export const loadTimers = async () => {
  try {
    const timers = await AsyncStorage.getItem(TIMERS_KEY);
    return timers ? JSON.parse(timers) : [];
  } catch (error) {
    console.error('Error loading timers:', error);
    return [];
  }
};
