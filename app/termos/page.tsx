export default function TermosPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-800 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-semibold mb-6 text-neutral-900">
          Termos de Uso
        </h1>

        <p className="text-sm text-neutral-500 mb-8">
          Última atualização: 2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-700">

          <section>
            <h2 className="font-medium text-neutral-900 mb-2">1. Sobre a plataforma</h2>
            <p>
              O Central Várzea é uma plataforma informativa sobre jogos, campeonatos,
              equipes e resultados do futebol amador.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-neutral-900 mb-2">2. Uso das informações</h2>
            <p>
              As informações exibidas podem sofrer alterações sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-neutral-900 mb-2">3. Responsabilidade</h2>
            <p>
              Não garantimos precisão total ou atualização em tempo real de todos os dados.
            </p>
          </section>

          <section>
            <h2 className="font-medium text-neutral-900 mb-2">4. Uso indevido</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Uso ilegal da plataforma</li>
              <li>Tentativas de invasão ou ataque</li>
              <li>Copiar conteúdo sem autorização</li>
            </ul>
          </section>

          <section>
            <h2 className="font-medium text-neutral-900 mb-2">5. Alterações</h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}