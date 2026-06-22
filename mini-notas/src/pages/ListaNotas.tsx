// src/pages/ListaNotas.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { listarNotas } from '../api/notas';
import { useApi } from '../hooks/useApi';
import { useDebounce } from '../hooks/useDebounce';
import { NotaCartao } from '../components/NotaCartao';
import { EstadoCarregando } from '../components/EstadoCarregando';
import { EstadoErro } from '../components/EstadoErro';

export function ListaNotas() {
  const [busca, setBusca] = useState('');
  const buscaAtrasada = useDebounce(busca, 400);
  const handleCickTag = (tag: string) => setBusca(tag);

  // A cada novo termo (após debounce), o useApi dispara uma requisição
  // e CANCELA a anterior automaticamente.
  const { dados: notas, carregando, erro, recarregar } = useApi(
    (sinal) => listarNotas(buscaAtrasada, sinal),
    [buscaAtrasada]
  );

  return (
    <section>
      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar notas..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}          
        />

        <Link hidden={busca.trim().length === 0} to="" className="btn btn-outline-secondary text-nowrap" onClick={() => setBusca('')}>
          X
        </Link>

        <Link to="/nova" className="btn btn-primary text-nowrap">
          + Nova nota
        </Link>

      </div>

      <p hidden={carregando}>{'Total: ' + (notas?.length || 0) + (notas?.length !== 1 ? 
        ' notas' : ' nota')}</p>

      {carregando && <EstadoCarregando mensagem="Carregando notas..." />}

      {erro && <EstadoErro mensagem={erro} aoTentarDeNovo={recarregar} />}

      {!carregando && !erro && notas && notas.length === 0 && (
        <p className="text-secondary">Nenhuma nota encontrada.</p>
      )}

      {!carregando && !erro && notas && notas.length > 0 && (
        <div className="row g-3">
          {notas.map((n) => (
            <div className="col-12 col-sm-6 col-lg-4" key={n.id}>
              <NotaCartao nota={n} clickTag={handleCickTag} />
            </div>
          ))}
        </div>
      )}

    </section>
  );
}