// src/components/NotaCartao.tsx
import { Link } from 'react-router-dom';
import type { Nota } from '../types/Nota';

type Props = { nota: Nota };

export function NotaCartao({ nota }: Props) {
  const previa = nota.conteudo.slice(0, 120);
  const truncado = nota.conteudo.length > 120;
  const atualizada = new Date(nota.atualizadaEm).toLocaleDateString('pt-BR');

  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title h5">
          <Link
            to={`/nota/${nota.id}`}
            className="stretched-link text-decoration-none"
          >
            {nota.titulo || '(sem título)'}
          </Link>
        </h3>
        <p className="card-text text-secondary mb-0">
          {previa}
          {truncado ? '…' : ''}
        </p>
      </div>

      <div className="card-footer bg-transparent d-flex flex-wrap align-items-center gap-2">
        <small className="text-secondary me-auto">atualizada em {atualizada}</small>
        {(nota.tags ?? []).map((t) => (
          <span key={t} className="badge text-bg-secondary">
            #{t}
          </span>
        ))}
      </div>
    </article>
  );
}