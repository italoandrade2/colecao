function Resumo({ resumo }) {
    return (
        <section>
            <h2>Resumo da coleção</h2>
            <ul>
                <li>Total de séries: {resumo.total}</li>
                <li>Média das avaliações: {resumo.media_avaliacao}</li>
                <li>Maior avaliação: {resumo.melhor}</li>
            </ul>

        </section>
    )
}

export default Resumo;