import React, {useState, useEffect} from "react";

import api from './services/api'


import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      "title": `Novo Projeto ${Date.now()}`,
      "url": "https://github.com/washington93/SemanaOmniStack11",
      "techs": ["Node.js", "ReactJS", "React-native", "Javascript"]
    })

    const repository = response.data

    setRepository([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)

    const updatedRepositories = repositories.filter(repository => repository.id !== id)

    setRepository(updatedRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
            {repositories.map(repository => (
              
              <li key={repository.id}>  
              {repository.title} 
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
              
            ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
