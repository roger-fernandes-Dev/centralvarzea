"use client"

import { useEffect, useState, type ReactNode } from "react"
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
  UserRound,
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

type InviteStatus = "pending" | "accepted" | "rejected" | "cancelled" | string

type TeamProfileModalProps = {
  time: TeamProfile
  onClose: () => void
  onInvite?: (time: TeamProfile) => void
  inviteStatus?: InviteStatus | null
  inviteLoading?: boolean
}

type TeamCategoryDetail = {
  id: string
  category_id: string
  category_name: string
  needs_players: boolean
  wanted_positions: string[]
  staff: {
    id: string
    name: string
    role: "coach" | "staff" | string
    phone?: string | null
    notes?: string | null
  }[]
}

export function TeamProfileModal({
  time,
  onClose,
  onInvite,
  inviteStatus,
  inviteLoading,
}: TeamProfileModalProps) {
  const [detailsLoading, setDetailsLoading] = useState(true)
  const [teamCategories, setTeamCategories] = useState<TeamCategoryDetail[]>(
    []
  )

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

  useEffect(() => {
    async function loadProfileDetails() {
      if (!time.id) return

      setDetailsLoading(true)

      const response = await fetch(`/api/team/profile-details?teamId=${time.id}`)
      const result = response.ok ? await response.json() : { categories: [] }

      setTeamCategories(result.categories || [])
      setDetailsLoading(false)
    }

    loadProfileDetails()
  }, [time.id])

  function getInviteButtonText() {
    if (inviteLoading) return "Enviando..."

    if (!inviteStatus) return "Convite"

    if (inviteStatus === "accepted") return "Convite aceito"
    if (inviteStatus === "rejected") return "Convite recusado"
    if (inviteStatus === "cancelled") return "Convite cancelado"

    return "Convite enviado"
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 p-3 md:p-6 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil do ${nomeTime}`}
    >
      <div className="bg-white w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[32px] shadow-2xl">
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
                {teamCategories.length > 0 ? (
                  teamCategories.slice(0, 4).map((category) => (
                    <span
                      key={category.id}
                      className="px-3 py-1 rounded-full bg-[#edf3ef] text-[#0f3b2e] text-xs font-semibold"
                    >
                      {category.category_name}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 rounded-full bg-[#edf3ef] text-[#0f3b2e] text-xs font-semibold">
                    Sem categoria
                  </span>
                )}

                {time.precisajogador && (
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold">
                    Recrutando jogadores
                  </span>
                )}

                {time.precisapatrocinio && (
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold">
                    Busca patrocínio
                  </span>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-zinc-900">
                {nomeTime}
              </h2>

              <p className="mt-2 text-zinc-500 flex items-center gap-2">
                <MapPin size={16} />
                {localizacao || "Localização não informada"}
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
                  "Este time ainda não adicionou uma descrição completa ao perfil."}
              </p>
            </section>

            <section className="rounded-[28px] border border-zinc-200 p-5 md:p-6">
              <h3 className="text-lg font-black text-zinc-900">
                Informações
              </h3>

              <div className="mt-4 space-y-3">
                <InfoLinha
                  icon={<Shield size={16} />}
                  label="Bairro"
                  value={time.bairro || "-"}
                />

                <InfoLinha
                  icon={<Trophy size={16} />}
                  label="Categorias"
                  value={
                    teamCategories.length > 0
                      ? `${teamCategories.length} cadastrada(s)`
                      : "Não informadas"
                  }
                />

                <InfoLinha
                  icon={<Users size={16} />}
                  label="Status"
                  value={time.precisajogador ? "Recrutando" : "Ativo"}
                />

                <InfoLinha
                  icon={<HandHeart size={16} />}
                  label="Patrocínio"
                  value={time.precisapatrocinio ? "Procurando" : "-"}
                />
              </div>
            </section>
          </div>

          <section className="mt-5 rounded-[28px] border border-zinc-200 p-5 md:p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="text-lg font-black text-zinc-900">
                  Categorias e responsáveis
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  Veja as categorias do time, posições procuradas e quem cuida
                  de cada uma.
                </p>
              </div>

              <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-[#edf3ef] text-[#0f3b2e] text-xs font-bold">
                {teamCategories.length} categoria(s)
              </span>
            </div>

            {detailsLoading && (
              <div className="rounded-2xl bg-[#f7f8fa] p-4 text-sm text-zinc-500">
                Carregando categorias...
              </div>
            )}

            {!detailsLoading && teamCategories.length === 0 && (
              <div className="rounded-2xl bg-[#f7f8fa] p-4 text-sm text-zinc-500">
                Este time ainda não informou categorias.
              </div>
            )}

            {!detailsLoading && teamCategories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamCategories.map((category) => {
                  const coaches = category.staff.filter(
                    (person) => person.role === "coach"
                  )

                  const staff = category.staff.filter(
                    (person) => person.role !== "coach"
                  )

                  return (
                    <article
                      key={category.id}
                      className="rounded-[24px] bg-[#f7f8fa] border border-zinc-100 p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[2px] text-[#0f3b2e] font-bold">
                            Categoria
                          </p>

                          <h4 className="text-2xl font-black text-zinc-900 mt-1">
                            {category.category_name}
                          </h4>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            category.needs_players
                              ? "bg-[#edf3ef] text-[#0f3b2e]"
                              : "bg-white text-zinc-500"
                          }`}
                        >
                          {category.needs_players
                            ? "Recrutando"
                            : "Elenco ativo"}
                        </span>
                      </div>

                      {category.needs_players &&
                        category.wanted_positions.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs text-zinc-500 mb-2">
                              Posições procuradas
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {category.wanted_positions.map((position) => (
                                <span
                                  key={position}
                                  className="px-3 py-1 rounded-full bg-white text-zinc-700 text-xs font-semibold border border-zinc-200"
                                >
                                  {position}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      <div className="mt-5 space-y-4">
                        <PeopleBlock
                          title="Técnico"
                          emptyText="Técnico não informado"
                          people={coaches}
                          icon="coach"
                        />

                        <PeopleBlock
                          title="Comissão técnica"
                          emptyText="Comissão não informada"
                          people={staff}
                          icon="staff"
                        />
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-[24px] bg-[#f7f8fa] p-5">
              <Calendar className="text-[#0f3b2e]" size={20} />
              <p className="text-xs text-zinc-500 mt-3">Disponível para</p>
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
                {time.whatsapp ? "WhatsApp disponível" : "Não informado"}
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
                {getInviteButtonText()}
              </button>
            )}

            <a
              href={whatsappUrl || undefined}
              target={whatsappUrl ? "_blank" : undefined}
              rel={whatsappUrl ? "noreferrer" : undefined}
              aria-disabled={!whatsappUrl}
              className={`h-12 px-6 rounded-2xl bg-[#0f3b2e] text-white font-medium flex items-center justify-center gap-2 transition ${
                whatsappUrl
                  ? "hover:opacity-90"
                  : "opacity-50 pointer-events-none"
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

function PeopleBlock({
  title,
  emptyText,
  people,
  icon,
}: {
  title: string
  emptyText: string
  people: TeamCategoryDetail["staff"]
  icon: "coach" | "staff"
}) {
  return (
    <div>
      <p className="text-xs text-zinc-500 mb-2">{title}</p>

      {people.length === 0 ? (
        <p className="rounded-2xl bg-white p-3 text-sm text-zinc-400">
          {emptyText}
        </p>
      ) : (
        <div className="space-y-2">
          {people.map((person) => (
            <div
              key={person.id}
              className="rounded-2xl bg-white border border-zinc-100 p-3 flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-full bg-[#edf3ef] text-[#0f3b2e] flex items-center justify-center">
                {icon === "coach" ? (
                  <UserRound size={16} />
                ) : (
                  <Users size={16} />
                )}
              </span>

              <div>
                <p className="text-sm font-bold text-zinc-900">
                  {person.name}
                </p>

                {person.phone && (
                  <p className="text-xs text-zinc-500">{person.phone}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
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
