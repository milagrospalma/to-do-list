import React, { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  ButtonGroup,
  IconButton,
  TextField,
  Button,
} from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [list, setList] = useState([
    { id: 1, description: "Tarea inicial", status: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add
  const addTask = () => {
    if (newTask) {
      let num = list.length + 1;
      let newItem = { id: num, description: newTask, status: false };
      setList([...list, newItem]);
      setNewTask("");
    }
  };

  // Delete
  const deleteTask = (id) => {
    let newList = list.filter((task) => task.id !== id);
    setList(newList);
  };

  // Completed
  const completedTask = (id) => {
    let newTask = list.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setList(newTask);
  };

  // Edit task
  const editTask = (e) => {
    let newDescription = {
      id: updateData.id,
      description: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newDescription);
  };

  // Cancel edit
  const cancelEdit = () => {
    setUpdateData("");
  };

  // Update description task
  const updateTask = () => {
    let filterTasks = [...list].filter((task) => task.id !== updateData.id);
    let updatedObj = [...filterTasks, updateData];
    setList(updatedObj);
    setUpdateData("");
  };

  return (
    <div className="App">
      <h1>To-do List App</h1>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          {updateData && updateData ? (
            <TextField
              variant="outlined"
              value={updateData && updateData.description}
              onChange={(e) => editTask(e)}
            />
          ) : (
            <TextField
              variant="outlined"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          )}
        </Grid>
        <Grid item xs={6} md={6} container justifyContent="center" alignItems="center">
          {updateData && updateData ? (
            <React.Fragment>
              <Button variant="contained" onClick={updateTask}>
                Actualizar
              </Button>
              <Button variant="outline" onClick={cancelEdit}>
                Cancelar
              </Button>
            </React.Fragment>
          ) : (
            <Button variant="contained" onClick={addTask}>
              Agregar
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={12}>
          <List>
            {list && list.length ? "" : "No hay tareas..."}
            {list &&
              list
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map((task, index) => {
                  return (
                    <ListItem disablePadding key={index}>
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Chip label={index + 1} />
                        <ListItemText
                          primary={task.description}
                          className={task.status ? "completed" : ""}
                        />
                      </Stack>
                      <ButtonGroup>
                        <IconButton
                          aria-label="done"
                          title="Completada / Por hacer"
                          onClick={() => completedTask(task.id)}
                        >
                          {task.status ? (
                            <CheckCircleIcon />
                          ) : (
                            <CheckCircleOutlineIcon />
                          )}
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          title="Editar"
                          onClick={() =>
                            setUpdateData({
                              id: task.id,
                              description: task.description,
                              status: task.status ? true : false,
                            })
                          }
                          disabled={task.status}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          title="Eliminar"
                          onClick={() => deleteTask(task.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ButtonGroup>
                    </ListItem>
                  );
                })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
