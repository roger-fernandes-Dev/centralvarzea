"use client"

import { useState } from "react"

function Card({ tipo }: { tipo: "jogador" | "time" }) {
  const isJogador = tipo === "jogador"
  const [tab, setTab] = useState<"login" | "cadastro">("login")

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
          {isJogador ? "👤" : "🛡️"}
        </div>

        <h2 className="text-2xl font-bold">
          {isJogador ? "JOGADOR" : "TIME"}
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          {isJogador
            ? "Mostre seu talento para o mundo"
            : "Gerencie seu time e conquiste mais"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 pb-2 ${
            tab === "login"
              ? "border-b-2 border-orange-500 text-orange-500 font-medium"
              : "text-gray-400"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setTab("cadastro")}
          className={`flex-1 pb-2 ${
            tab === "cadastro"
              ? "border-b-2 border-orange-500 text-orange-500 font-medium"
              : "text-gray-400"
          }`}
        >
          Cadastro
        </button>
      </div>

      {/* LOGIN */}
      {tab === "login" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Email ou telefone"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Lembrar de mim
            </label>

            <span className="text-orange-500 cursor-pointer">
              Esqueci minha senha
            </span>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg">
            Entrar como {isJogador ? "jogador" : "time"}
          </button>
        </div>
      )}

      {/* CADASTRO */}
      {tab === "cadastro" && (
        <div className="space-y-3">
          {isJogador ? (
            <>
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full border rounded-lg px-4 py-2"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Nome do time"
                className="w-full border rounded-lg px-4 py-2"
              />
            </>
          )}

          <input
            type="text"
            placeholder="Telefone"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full border rounded-lg px-4 py-2"
          />

          <button className="w-full bg-black text-white py-3 rounded-lg">
            Criar conta como {isJogador ? "jogador" : "time"}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white flex justify-between items-center px-6 py-4">
        <span className="font-semibold">Central Várzea</span>

        <span className="hidden md:block text-sm">
          Futebol de várzea em destaque
        </span>
      </div>

      <div className="text-center mt-6 px-4 md:hidden">
        <h1 className="text-xl font-bold">
          FAÇA PARTE DA CENTRAL VÁRZEA
        </h1>
        <p className="text-gray-500 text-sm">
          Escolha como você deseja continuar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Card tipo="jogador" />
        <Card tipo="time" />
      </div>
    </div>
  )
}