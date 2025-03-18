import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const AddTimerForm = ({ onAddTimer }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (name && duration && category) {
      onAddTimer({ name, duration: parseInt(duration, 10), category });
      setName("");
      setDuration("");
      setCategory("");
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Timer Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (seconds)"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Add Timer" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddTimerForm;
