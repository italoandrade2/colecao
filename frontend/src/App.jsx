import { useEffect, useState } from 'react';
import './App.css';

const API = 'http://127.0.0.1:8000/api/series/';

function App() {
  const [series, setSeries] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [ano, setAno] = useState('');
  const [avaliacao, setAvaliacao] = useState('');

  function carregarSeries() {
    fetch(API)
      .then((res) => res.json())
      .then((dados) => setSeries(dados));
  }

  useEffect(() => {
    carregarSeries();
  }, []);

  function cadastrar(evento) {
    evento.preventDefault();

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, plataforma, ano: Number(ano), avaliacao: Number(avaliacao) }),
    }).then(() => {
      setTitulo('');
      setPlataforma('');
      setAno('');
      setAvaliacao('');
      carregarSeries();
    });
  }

  return (
    <div className='pagina'>
      <h1>Cadastro de séries</h1>

      <form onSubmit={cadastrar}>
        <input
          placeholder='Título'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          placeholder='Plataforma'
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
          required
        />
        <input
          placeholder='Ano'
          type='number'
          step='1'
          min='1900'
          max='2026'
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
        <input
          placeholder='Avaliação'
          type='number'
          step='0.1'
          min='0'
          max='10'
          value={avaliacao}
          onChange={(e) => setAvaliacao(e.target.value)}
        />
        <button type='submit'>Cadastrar</button>
      </form>

      <h2>Séries cadastradas</h2>
      <ul>
        {series.map((serie) => (
          <li key={serie.id}>
            {serie.titulo} · {serie.plataforma} · {serie.ano} · nota {serie.avaliacao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;