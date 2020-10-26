import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRespoitories] = useState([]);

  async function handleAddRepository() {
    const repositorie = {
      title: `Repositório ${repositories.length + 1}`,
      url: 'http://www.wernerjr.dev',
      techs: ['NodeJs', 'ReactJS', 'ReactNative']
    }

    const response = await api.post('/repositories', repositorie);

    setRespoitories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRespoitories(repositories.filter(repositorie => repositorie.id !== id));
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRespoitories(response.data);
    });
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositorie => (        
        <li>
          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
