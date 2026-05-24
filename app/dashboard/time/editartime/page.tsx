"use client"

import {
  ArrowLeft,
  Camera,
  Save,
} from "lucide-react"

export default function EditarTimePage() {
  return (
    <main className="flex-1 p-3 md:p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <div className="flex items-center gap-3">
            <button className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center">
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-2xl md:text-[32px] font-bold text-zinc-900">
                Editar Time
              </h1>

              <p className="text-sm text-zinc-500 mt-1">
                Atualize as informações do seu time.
              </p>
            </div>
          </div>
        </div>

        <button className="hidden md:flex h-12 px-5 rounded-2xl bg-[#0f3b2e] text-white items-center gap-2 text-sm font-medium">
          <Save size={17} />
          Salvar alterações
        </button>
      </div>

      {/* CARD */}
      <section className="bg-white border border-zinc-200 rounded-[30px] p-4 md:p-8">
        {/* LOGO */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative">
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-[32px] bg-[#edf3ef] flex items-center justify-center text-[#0f3b2e] text-3xl md:text-5xl font-bold">
              CV
            </div>

            <button className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-[#0f3b2e] text-white flex items-center justify-center shadow-lg">
              <Camera size={18} />
            </button>
          </div>

          <button className="mt-5 text-sm font-medium text-[#0f3b2e]">
            Alterar logo do time
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <div>
            <label className="text-sm font-medium text-zinc-700 mb-2 block">
              Nome do time
            </label>

            <input
              defaultValue="Central City F.C."
              className="w-full h-14 rounded-2xl border border-zinc-200 px-4 outline-none focus:border-[#0f3b2e] text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 mb-2 block">
              Ano de fundação
            </label>

            <input
              defaultValue="2021"
              className="w-full h-14 rounded-2xl border border-zinc-200 px-4 outline-none focus:border-[#0f3b2e] text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 mb-2 block">
              Cidade
            </label>

            <input
              defaultValue="São Paulo"
              className="w-full h-14 rounded-2xl border border-zinc-200 px-4 outline-none focus:border-[#0f3b2e] text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 mb-2 block">
              Categoria
            </label>

            <select
              defaultValue="Semipro"
              className="w-full h-14 rounded-2xl border border-zinc-200 px-4 outline-none focus:border-[#0f3b2e] text-sm bg-white"
            >
              <option>Amador</option>
              <option value="Semipro">Semipro</option>
              <option>Profissional</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-zinc-700 mb-2 block">
              Descrição do time
            </label>

            <textarea
              rows={5}
              placeholder="Fale um pouco sobre o time..."
              className="w-full rounded-3xl border border-zinc-200 p-4 outline-none focus:border-[#0f3b2e] text-sm resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-zinc-700 mb-2 block">
              Cores do time
            </label>

            <div className="flex gap-3">
              <input
                defaultValue="Verde"
                className="flex-1 h-14 rounded-2xl border border-zinc-200 px-4 outline-none focus:border-[#0f3b2e] text-sm"
              />

              <input
                defaultValue="Branco"
                className="flex-1 h-14 rounded-2xl border border-zinc-200 px-4 outline-none focus:border-[#0f3b2e] text-sm"
              />
            </div>
          </div>
        </div>

        {/* BUTTON MOBILE */}
        <button className="md:hidden mt-8 w-full h-14 rounded-2xl bg-[#0f3b2e] text-white flex items-center justify-center gap-2 text-sm font-medium">
          <Save size={18} />
          Salvar alterações
        </button>
      </section>
    </main>
  )
}