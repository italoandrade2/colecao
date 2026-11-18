function Formulario({
    titulo,
    setTitulo,
    plataforma,
    setPlataforma,
    ano,
    setAno,
    avaliacao,
    setAvaliacao,
    cadastrar
}) {
    return (
        <section>
            <h2>Cadastro de séries</h2>

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
        </section>
    );
}

export default Formulario;