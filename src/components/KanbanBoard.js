import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ColumnPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '200px',
  marginTop: '20%',
  marginLeft: '5%',
  backgroundColor: '#f0f0f0',
  marginRight: theme.spacing(2),
}));

const TaskPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  marginTop: '5%',
  marginLeft: '-3%',
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '4px',
  width: '100%',
}));

const initialData = {
    columns: {
        'column-1': {
          id: 'column-1',
          title: 'To Do',
          taskIds: ['task-1'],
        },
        'column-2': {
          id: 'column-2',
          title: 'In Progress',
          taskIds: ['task-2', 'task-3', 'task-4'],
        },
        'column-3': {
          id: 'column-3',
          title: 'Under Review',
          taskIds: ['task-5', 'task-6'],
        },
        'column-4': {
          id: 'column-4',
          title: 'Done',
          taskIds: ['task-7', 'task-8'],
        },
      },
      tasks: {
        'task-1': { id: 'task-1', content: 'Task 1', column: 'column-1' },
        'task-2': { id: 'task-2', content: 'Task 2', column: 'column-2' },
        'task-3': { id: 'task-3', content: 'Task 3', column: 'column-2' },
        'task-4': { id: 'task-4', content: 'Task 4', column: 'column-2' },
        'task-5': { id: 'task-5', content: 'Task 5', column: 'column-3' },
        'task-6': { id: 'task-6', content: 'Task 6', column: 'column-3' },
        'task-7': { id: 'task-7', content: 'Task 7', column: 'column-4' },
        'task-8': { id: 'task-8', content: 'Task 8', column: 'column-4' },
      },
};

function KanbanBoard() {
  const [data, setData] = useState(initialData);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, columnId) => {
    const taskId = e.dataTransfer.getData('taskId');
    const updatedData = { ...data };
    const sourceColumnId = getColumnIdForTask(taskId);

    if (sourceColumnId !== columnId) {
      // Remove task from the source column
      const sourceColumn = updatedData.columns[sourceColumnId];
      sourceColumn.taskIds = sourceColumn.taskIds.filter((id) => id !== taskId);

      // Add task to the destination column
      const destinationColumn = updatedData.columns[columnId];
      destinationColumn.taskIds.push(taskId);

      // Update the task's column information
      updatedData.tasks[taskId].column = columnId;

      setData(updatedData);
    }
  };

  const getColumnIdForTask = (taskId) => {
    for (const columnId in data.columns) {
      if (data.columns[columnId].taskIds.includes(taskId)) {
        return columnId;
      }
    }
    return null;
  };

  // Convert the task data to JSON response
  const jsonData = {
    columns: data.columns,
  };

  // Function to handle the SAVE button click
  const handleSaveClick = () => {
    // Send updated and initial JSON response data to the console
    console.log('Initial Data:', initialData);
    console.log('Updated Data:', jsonData);
  };

  return (
    <div>
      <div style={{ fontWeight: 'lighter', fontFamily: 'sans-serif', fontSize: '300%', marginTop: '20px' }}>
        Kanban Board
      </div>
      <Grid container spacing={2}>
        {Object.values(data.columns).map((column) => (
          <Grid
            item
            xs={3}
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <ColumnPaper>
              <Typography variant="h6">{column.title}</Typography>
              <div>
                {column.taskIds.map((taskId) => (
                  <TaskPaper
                    key={taskId}
                    draggable
                    onDragStart={(e) => handleDragStart(e, taskId)}
                  >
                    {data.tasks[taskId].content}
                  </TaskPaper>
                ))}
              </div>
            </ColumnPaper>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Button variant="contained" color="primary" onClick={handleSaveClick}>
          SAVE
        </Button>
      </div>
    </div>
  );
}

export default KanbanBoard;
