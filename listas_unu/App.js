import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, CheckBox } from 'react-native';

const App = () => {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  useEffect(() => {
    const loadedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
  <View style={{ flex: 1, padding: 12, backgroundColor: '#fff' }}>
      <TextInput
        style={{height: 50, borderWidth: 1, borderColor: '#ccc', marginBottom: 7, marginTop: 15, paddingHorizontal: 50,}}
        placeholder="Escribe una tarea"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="Agregar tarea" onPress={handleAddTask} />
      <FlatList
        style={{marginTop: 7}}
        data={tasks}
        renderItem={({ item }) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 7, borderRadius: 5,}}>
            <CheckBox
              value={item.completed}
              onValueChange={() => handleToggleTask(item.id)}
            />
            <Text style={item.completed ? styles.completedTask : styles.taskText}>
              {item.text}
            </Text>
            <Button title="Eliminar" onPress={() => handleDeleteTask(item.id)} color="red" />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskText: {
    flex: 1,
    marginLeft: 10,
  },
  completedTask: {
    flex: 1,
    marginLeft: 10,
    textDecorationLine: 'line-through',
  },
});

export default App;