"use client"

import type { ReactNode } from "react"
import {
  Calendar,
  HandHeart,
  MapPin,
  MessageCircle,
  Shield,
  Trophy,
  Users,
  X,
  Send,
} from "lucide-react"

export type TeamProfile = {
  id: string
  userid?: string | null
  nometime?: string | null
  cidade?: string | null
  bairro?: string | null
  estado?: string | null
  categoria?: string | null
  descricao?: string | null
  whatsapp?: string | null
  logo?: string | null
  fototime?: string | null
  fundacao?: string | null
  posicaoprocurada?: string | null
  precisajogador?: boolean | null
  precisapatrocinio?: boolean | null
}

type TeamProfileModalProps = {
  time: TeamProfile
  onClose: () => void
  onInvite?: (time: TeamProfile) => void
  inviteStatus?: string | null
  inviteLoading?: boolean
}

export function TeamProfileModal({
  time,
  onClose,
  onInvite,
  inviteStatus,
  inviteLoading,
}: TeamProfileModalProps) {
  const nomeTime = time.nometime || "Time sem nome"
  const localizacao = [time.cidade, time.estado].filter(Boolean).join("/")
  const iniciais = nomeTime
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase()
  const whatsappUrl = time.whatsapp
    ? `https://wa.me/${time.whatsapp.replace(/\D/g, "")}`
    : null
  const conviteRespondido = Boolean(inviteStatus)

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 p-3 md:p-6 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil do ${nomeTime}`}
    >
      <div className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] shadow-2xl">
        <div
          className="relative h-48 md:h-64 bg-gradient-to-r from-[#0f3b2e] to-[#1d6b52] bg-cover bg-center"
          style={
            time.fototime
              ? { backgroundImage: `url(${time.fototime})` }
              : undefined
          }
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar perfil"
            className="absolute right-4 top-4 z-10 w-11 h-11 rounded-full bg-white/95 text-zinc-900 flex items-center justify-center shadow-lg hover:scale-105 transition"
          >
            <X size={20} />
          </button>

          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="px-5 md:px-8 pb-8">
          <div className="relative -mt-16 md:-mt-20 flex flex-col md:flex-row md:items-end gap-5">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-[#0f3b2e] font-black text-4xl">
              {time.logo ? (
                <span
                  aria-label={`Logo do ${nomeTime}`}
                  role="img"
                  className="h-full w-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${time.logo})` }}
                />
              ) : (
                iniciais || "CV"
              )}
            </div>

            <div className="flex-1 md:pb-3">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#edf3ef] text-[#0f3b2e] text-xs font-semibold">
                  {time.categoria || "Amador"}
                </span>

                {time.precisajogador && (
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold">
                    Recrutando jogadores
                  </span>
                )}

                {time.precisapatrocinio && (
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold">
                    Busca patrocinio
                  </span>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-zinc-900">
                {nomeTime}
              </h2>

              <p className="mt-2 text-zinc-500 flex items-center gap-2">
                <MapPin size={16} />
                {localizacao || "Localizacao nao informada"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5 mt-8">
            <section className="rounded-[28px] border border-zinc-200 p-5 md:p-6">
              <h3 className="text-lg font-black text-zinc-900">
                Sobre o time
              </h3>

              <p className="mt-3 text-sm md:text-base text-zinc-600 leading-relaxed">
                {time.descricao ||
                  "Este time ainda nao adicionou uma descricao completa ao perfil."}
              </p>
            </section>

            <section className="rounded-[28px] border border-zinc-200 p-5 md:p-6">
              <h3 className="text-lg font-black text-zinc-900">
                Informacoes
              </h3>

              <div className="mt-4 space-y-3">
                <InfoLinha
                  icon={<Shield size={16} />}
                  label="Bairro"
                  value={time.bairro || "-"}
                />
                <InfoLinha
                  icon={<Trophy size={16} />}
                  label="Categoria"
                  value={time.categoria || "Amador"}
                />
                <InfoLinha
                  icon={<Users size={16} />}
                  label="Status"
                  value={time.precisajogador ? "Recrutando" : "Ativo"}
                />
                <InfoLinha
                  icon={<HandHeart size={16} />}
                  label="Patrocinio"
                  value={time.precisapatrocinio ? "Procurando" : "-"}
                />
              </div>
            </section>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-[24px] bg-[#f7f8fa] p-5">
              <Calendar className="text-[#0f3b2e]" size={20} />
              <p className="text-xs text-zinc-500 mt-3">Disponivel para</p>
              <h4 className="font-bold mt-1">Amistosos</h4>
            </div>

            <div className="rounded-[24px] bg-[#f7f8fa] p-5">
              <Users className="text-[#0f3b2e]" size={20} />
              <p className="text-xs text-zinc-500 mt-3">Jogadores</p>
              <h4 className="font-bold mt-1">
                {time.precisajogador ? "Recrutando" : "Elenco ativo"}
              </h4>
            </div>

            <div className="rounded-[24px] bg-[#f7f8fa] p-5">
              <MessageCircle className="text-[#0f3b2e]" size={20} />
              <p className="text-xs text-zinc-500 mt-3">Contato</p>
              <h4 className="font-bold mt-1">
                {time.whatsapp ? "WhatsApp disponivel" : "Nao informado"}
              </h4>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-3 md:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-12 px-6 rounded-2xl border border-zinc-200 font-medium hover:bg-zinc-50 transition"
            >
              Voltar
            </button>

            {onInvite && (
              <button
                type="button"
                onClick={() => onInvite(time)}
                disabled={conviteRespondido || inviteLoading}
                className="h-12 px-6 rounded-2xl border border-[#0f3b2e] text-[#0f3b2e] font-medium flex items-center justify-center gap-2 hover:bg-[#edf3ef] transition disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <Send size={16} />
                {inviteLoading
                  ? "Enviando..."
                  : conviteRespondido
                    ? inviteStatus === "aceito"
                      ? "Convite aceito"
                      : inviteStatus === "recusado"
                        ? "Convite recusado"
                        : "Convite enviado"
                    : "Convite"}
              </button>
            )}

            <a
              href={whatsappUrl || undefined}
              target={whatsappUrl ? "_blank" : undefined}
              rel={whatsappUrl ? "noreferrer" : undefined}
              aria-disabled={!whatsappUrl}
              className={`h-12 px-6 rounded-2xl bg-[#0f3b2e] text-white font-medium flex items-center justify-center gap-2 transition ${
                whatsappUrl ? "hover:opacity-90" : "opacity-50 pointer-events-none"
              }`}
            >
              <MessageCircle size={16} />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoLinha({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-9 h-9 rounded-full bg-[#edf3ef] text-[#0f3b2e] flex items-center justify-center">
        {icon}
      </span>

      <div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="font-semibold text-zinc-800">{value}</p>
      </div>
    </div>
  )
}
