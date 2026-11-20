import { useEffect, useState } from 'react';
import './App.css';

import Resumo from './components/Resumo';
import Formulario from './components/Formulario';
import Lista from './components/Lista';

const API = 'http://127.0.0.1:8000/api/series/';

function App() {
  const [series, setSeries] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [ano, setAno] = useState('');
  const [avaliacao, setAvaliacao] = useState('');
  const [resumo, setResumo] = useState({
    total: 0,
    media_avaliacao: 0,
    melhor: null
  });

  function carregarSeries() {
    fetch(API)
      .then((res) => res.json())
      .then((dados) => setSeries(dados));
  }

  function carregarResumo() {
    fetch(API + 'resumo/')
      .then((res) => res.json())
      .then((dados) => setResumo(dados));
  }

  useEffect(() => {
    carregarSeries();
    carregarResumo();
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
      <h1>Minha Coleção</h1>

      <Resumo
        resumo={resumo}
      />

      <Formulario
        titulo={titulo}
        setTitulo={setTitulo}
        plataforma={plataforma}
        setPlataforma={setPlataforma}
        ano={ano}
        setAno={setAno}
        avaliacao={avaliacao}
        setAvaliacao={setAvaliacao}
        cadastrar={cadastrar}
      />

      <Lista
        series={series}
      />
    </div>
  );
}

export default App;