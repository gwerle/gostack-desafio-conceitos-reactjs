import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        title: `gostack-desafio-conceitos-reactjs ${new Date().getSeconds()}`,
        url: 'https://github.com/gwerle/gostack-desafio-conceitos-reactjs',
        techs: ['ReactJS', 'axios']
      });

      const repository = response.data;
      setRepositories([...repositories, repository]);
    } catch (error) {
      alert(error)
    }
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(response => {
        if (response.status === 204) {
          setRepositories(repositories.filter(repository => repository.id !== id))
        }
      })
      .catch(err => {
        alert(err);
      });    
  }  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
