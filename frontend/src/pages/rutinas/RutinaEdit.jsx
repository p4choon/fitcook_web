import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const RutinasEdit = () => {
  const [formData, setFormData] = useState({
    user_id: 0,
    title: '',
    description: '',
    level: 'intermediate',
    duration: 0,
    muscle_groups: '',
    exercises: [],
  });
  const { id } = useParams();
  const [exerciseOptions, setExerciseOptions] = useState([]);

  useEffect(() => {
    // Obtener los ejercicios existentes de la API
    fetch('http://127.0.0.1:8000/api/exercises')
      .then((response) => response.json())
      .then((data) => {
        setExerciseOptions(data.exercises);
      })
      .catch((error) => {
        console.error('Error al obtener los ejercicios:', error);
      });

    // Obtener la rutina existente de la API
    fetch( "http://127.0.0.1:8000/api/routines/" + id)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data.routine);
      })
      .catch((error) => {
        console.error('Error al obtener la rutina:', error);
      });
  });

  const handleExerciseChange = (index, propertyName, value) => {
    setFormData((prevData) => {
      const updatedExercises = prevData.exercises.map((exercise, i) => {
        if (i === index) {
          return {
            ...exercise,
            [propertyName]: value,
          };
        }
        return exercise;
      });

      return {
        ...prevData,
        exercises: updatedExercises,
      };
    });
  };

  const handleAddExercise = () => {
    setFormData((prevData) => ({
      ...prevData,
      exercises: [
        ...prevData.exercises,
        {
          id: '',
          sets: 0,
          repetitions: 0,
          rest_time: 0,
          tips: '',
        },
      ],
    }));
  };

  const handleRemoveExercise = (index) => {
    setFormData((prevData) => {
      const updatedExercises = prevData.exercises.filter(
        (_, i) => i !== index
      );

      return {
        ...prevData,
        exercises: updatedExercises,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realizar la llamada PUT a la API con formData

    // Ejemplo de llamada fetch:
    fetch(`http://127.0.0.1:8000/api/routines/`+ id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Procesar la respuesta de la API si es necesario
        console.log('Respuesta del servidor:', data);
      })
      .catch((error) => {
        console.error('Error al actualizar la rutina:', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

return (
    <div>
      <h1>Update Routine</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Level:
          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <br />
        <label>
          Duration:
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Muscle Groups:
          <input
            type="text"
            name="muscle_groups"
            value={formData.muscle_groups}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* Ejercicios */}
        <h2>Exercises</h2>
        {formData.exercises.map((exercise, index) => (
          <div key={index}>
            <h3>Exercise {index + 1}</h3>
            <label>
              Exercise:
              <select
                value={exercise.id}
                onChange={(event) =>
                  handleExerciseChange(index, 'id', event.target.value)
                }
              >
                <option value="">Select an exercise</option>
                {exerciseOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Sets:
              <input
                type="number"
                value={exercise.sets}
                onChange={(event) =>
                  handleExerciseChange(index, 'sets', event.target.value)
                }
              />
            </label>
            <br />
            <label>
              Repetitions:
              <input
                type="number"
                value={exercise.repetitions}
                onChange={(event) =>
                  handleExerciseChange(index, 'repetitions', event.target.value)
                }
              />
            </label>
            <br />
            <label>
              Rest Time:
              <input
                type="number"
                value={exercise.rest_time}
                onChange={(event) =>
                  handleExerciseChange(index, 'rest_time', event.target.value)
                }
              />
            </label>
            <br />
            <label>
              Tips:
              <input
                type="text"
                value={exercise.tips}
                onChange={(event) =>
                  handleExerciseChange(index, 'tips', event.target.value)
                }
              />
            </label>
            <br />
            <button type="button" onClick={() => handleRemoveExercise(index)}>
              Remove Exercise
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={handleAddExercise}>
          Add Exercise
        </button>
        <br />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default RutinasEdit;