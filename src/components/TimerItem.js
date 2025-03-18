
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const TimerItem = ({ timer, resetAll }) => {
  const [remainingTime, setRemainingTime] = useState(timer.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
      clearInterval(interval);
      setShowModal(true); 
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingTime]);

  
  useEffect(() => {
    setRemainingTime(timer.duration);
    setIsRunning(false);
    setShowModal(false);
  }, [resetAll]);

  return (
    <View style={styles.timerCard}>
      <Text style={styles.timerName}>{timer.name}</Text>
      <Text style={styles.timerDetails}>Remaining: {remainingTime}s</Text>
      <ProgressBar progress={remainingTime / timer.duration} width={200} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={() => setIsRunning(true)}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => setIsRunning(false)}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => setRemainingTime(timer.duration)}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 {timer.name} completed! 🎉</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  timerCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  timerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TimerItem;
