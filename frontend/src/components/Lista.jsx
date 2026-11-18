function Lista({ series }) {
    return (
        <section>
            <h2>Séries cadastradas</h2>
            <ul>
                {series.map((serie) => (
                <li key={serie.id}>
                    {serie.titulo} · {serie.plataforma} · {serie.ano} · nota {serie.avaliacao}
                </li>
                ))}
            </ul>
        </section>
    );
}

export default Lista;