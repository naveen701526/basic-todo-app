import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('token');

    if (authToken) {
      const fetchDetails = async () => {
        try {
          // Make a GET request with authentication token in headers
          const getResponse = await axios.get('http://localhost:8080/api/todos', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setTodos(getResponse.data);
        } catch (error) {
          localStorage.removeItem('token');
          console.log(error);
          navigate('/login');
        }
      };

      fetchDetails();
    } else {
      navigate('/login');
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (description === '') {
      setDescription('');
      alert('add some text in todo....')
      return;
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the Authorization header with Bearer token
        'Content-Type': 'application/json' // Set content type as JSON
      }
    };
    if (!isEdit) {



      try {
        await axios.post('http://localhost:8080/api/todos/new', { description }, config);
        const authToken = localStorage.getItem('token');
        const getResponse = await axios.get('http://localhost:8080/api/todos', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTodos(getResponse.data);



      } catch (error) {

        console.log(error);
      } finally {
        setDescription('')
      }
    }
    else {
      try {
        const putResponse = await axios.put('http://localhost:8080/api/todos/update/' + updateId, { description }, config);
        const tempTodos = todos;
        console.log(putResponse.data)
        const result = tempTodos.map(temp => {
          if (temp.id === putResponse.data.id) {
            return putResponse.data;
          }
          return temp;
        });
        console.log(result);
        setTodos(result)
        setIsEdit(false)
      } catch (error) {
        console.log(error);
      } finally {

        setDescription('')

      }
    }

  }

  const handleEdit = (description, id) => {
    setDescription(description);
    setUpdateId(Number(id))
    setIsEdit(true)
  }

  const handleDeleteTodo = async (id) => {
    const authToken = localStorage.getItem('token');
    try {
      const deleteResponse = await axios.delete('http://localhost:8080/api/todos/delete/' + id, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTodos(todos.filter(todo => deleteResponse.data.id !== todo.id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)} method="post">
        <div>
          <label>{isEdit ? 'Update Todo' : 'Add Todo'}:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">{isEdit ? 'Update Todo' : 'Add Todo'}</button>
      </form>
      {todos.length > 0 ? (
        <ul>
          {
            todos.map((todo) => (
              <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '30px',
              }} key={todo.id}>
                <li >{todo.description}</li>
                <button onClick={() => handleEdit(todo.description, todo.id)}>update</button> <button onClick={() => handleDeleteTodo(todo.id)}>delete</button></div>
            ))}

        </ul>
      ) : 'No Todos are available'}
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Todos;