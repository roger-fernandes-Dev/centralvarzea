"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Save,
  Plus,
  Trash2,
  Users,
  UserRound,
} from "lucide-react";
import { supabase } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
};

type TeamCategoryRow = {
  id: string;
  team_id: string;
  category_id: string;
  needs_players: boolean | null;
  wanted_positions: string | null;
};

type StaffRole = "coach" | "staff";

type StaffForm = {
  id: string;
  name: string;
  role: StaffRole;
  phone: string;
  notes: string;
  categoryIds: string[];
};

type CategoryRecruitment = {
  needsPlayers: boolean;
  wantedPositions: string[];
};

function createTempId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function EditarTimePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [nomeTime, setNomeTime] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [precisaPatrocinio, setPrecisaPatrocinio] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [fundacao, setFundacao] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [teamCategories, setTeamCategories] = useState<TeamCategoryRow[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [activeRecruitCategoryId, setActiveRecruitCategoryId] =
    useState<string>("");

  const [categoryRecruitment, setCategoryRecruitment] = useState<
    Record<string, CategoryRecruitment>
  >({});

  const [staffMembers, setStaffMembers] = useState<StaffForm[]>([]);

  useEffect(() => {
    async function load() {
      setPageLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setPageLoading(false);
        return;
      }

      setUserId(user.id);

      const { data: team, error: teamError } = await supabase
        .from("team_profiles")
        .select("*")
        .eq("userid", user.id)
        .maybeSingle();

      if (teamError) {
        console.log("ERRO AO BUSCAR TIME:", teamError);
        setPageLoading(false);
        return;
      }

      if (!team) {
        setPageLoading(false);
        return;
      }

      setTeamId(team.id);
      setNomeTime(team.nometime || "");
      setCidade(team.cidade || "");
      setBairro(team.bairro || "");
      setEstado(team.estado || "");
      setFundacao(team.fundacao || "");
      setPrecisaPatrocinio(team.precisapatrocinio || false);
      setLogoUrl(team.logo || null);

      try {
        const categoriesResponse = await fetch("/api/team/categories", {
          cache: "no-store",
        });

        const categoriesJson = await categoriesResponse.json();

        if (!categoriesResponse.ok) {
          console.log("ERRO AO BUSCAR CATEGORIAS:", categoriesJson);
          setCategories([]);
        } else {
          setCategories(categoriesJson.categories || []);
        }
      } catch (error) {
        console.log("ERRO AO BUSCAR CATEGORIAS:", error);
        setCategories([]);
      }

      const { data: teamCategoriesData, error: teamCategoriesError } =
        await supabase
          .from("team_categories")
          .select("id, team_id, category_id, needs_players, wanted_positions")
          .eq("team_id", team.id);

      const categoryRows = teamCategoriesData || [];

      if (teamCategoriesError) {
        console.log("ERRO AO BUSCAR CATEGORIAS DO TIME:", teamCategoriesError);
      } else {
        setTeamCategories(categoryRows);

        const savedCategoryIds = categoryRows.map((item) => item.category_id);

        setSelectedCategoryIds(savedCategoryIds);
        setActiveRecruitCategoryId(savedCategoryIds[0] || "");

        const recruitmentMap: Record<string, CategoryRecruitment> = {};

        categoryRows.forEach((item) => {
          recruitmentMap[item.category_id] = {
            needsPlayers: Boolean(item.needs_players),
            wantedPositions: item.wanted_positions
              ? item.wanted_positions.split(", ").filter(Boolean)
              : [],
          };
        });

        setCategoryRecruitment(recruitmentMap);
      }

      const { data: staffData, error: staffError } = await supabase
        .from("team_staff")
        .select(
          `
          id,
          name,
          role,
          phone,
          notes,
          team_staff_categories (
            team_category_id
          )
        `,
        )
        .eq("team_id", team.id)
        .eq("active", true)
        .order("created_at", { ascending: true });

      if (staffError) {
        console.log("ERRO AO BUSCAR COMISSAO:", staffError);
      } else {
        const staffFormatted =
          staffData?.map((item: any) => {
            const categoryIds =
              item.team_staff_categories
                ?.map((rel: any) => {
                  const found = categoryRows.find(
                    (row) => row.id === rel.team_category_id,
                  );

                  return found?.category_id;
                })
                .filter(Boolean) || [];

            return {
              id: item.id,
              name: item.name || "",
              role: item.role || "staff",
              phone: item.phone || "",
              notes: item.notes || "",
              categoryIds,
            };
          }) || [];

        setStaffMembers(staffFormatted);
      }

      setPageLoading(false);
    }

    load();
  }, []);

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file || !userId) return;

    e.target.value = "";

    if (file.size > 2 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 2MB");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Use JPG, PNG ou WEBP");
      return;
    }

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      alert("Erro ao processar imagem");
      return;
    }

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 600, 600);

    const scale = Math.min(600 / img.width, 600 / img.height);

    const width = img.width * scale;
    const height = img.height * scale;

    const x = (600 - width) / 2;
    const y = (600 - height) / 2;

    ctx.drawImage(img, x, y, width, height);

    const compressedBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/webp", 0.8);
    });

    if (!compressedBlob) {
      alert("Erro ao processar imagem");
      return;
    }

    const optimizedFile = new File([compressedBlob], "logo.webp", {
      type: "image/webp",
    });

    const filePath = `${userId}/${Date.now()}.webp`;

    const { error: uploadError } = await supabase.storage
      .from("team-logos")
      .upload(filePath, optimizedFile, {
        upsert: false,
      });

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("team-logos").getPublicUrl(filePath);

    setLogoUrl(`${data.publicUrl}?t=${Date.now()}`);
  }

  function toggleCategoria(categoryId: string) {
    const isSelected = selectedCategoryIds.includes(categoryId);

    if (isSelected) {
      const updatedCategoryIds = selectedCategoryIds.filter(
        (id) => id !== categoryId,
      );

      setSelectedCategoryIds(updatedCategoryIds);

      setCategoryRecruitment((current) => {
        const copy = { ...current };
        delete copy[categoryId];
        return copy;
      });

      setStaffMembers((current) =>
        current.map((member) => ({
          ...member,
          categoryIds: member.categoryIds.filter((id) => id !== categoryId),
        })),
      );

      if (activeRecruitCategoryId === categoryId) {
        setActiveRecruitCategoryId(updatedCategoryIds[0] || "");
      }

      return;
    }

    setSelectedCategoryIds((current) => [...current, categoryId]);

    setCategoryRecruitment((current) => ({
      ...current,
      [categoryId]: current[categoryId] || {
        needsPlayers: false,
        wantedPositions: [],
      },
    }));

    if (!activeRecruitCategoryId) {
      setActiveRecruitCategoryId(categoryId);
    }
  }

  function toggleRecruiting(categoryId: string) {
    setCategoryRecruitment((current) => {
      const currentConfig = current[categoryId] || {
        needsPlayers: false,
        wantedPositions: [],
      };

      return {
        ...current,
        [categoryId]: {
          ...currentConfig,
          needsPlayers: !currentConfig.needsPlayers,
        },
      };
    });
  }

  function togglePosicao(categoryId: string, posicao: string) {
    setCategoryRecruitment((current) => {
      const currentConfig = current[categoryId] || {
        needsPlayers: true,
        wantedPositions: [],
      };

      const alreadySelected = currentConfig.wantedPositions.includes(posicao);

      return {
        ...current,
        [categoryId]: {
          ...currentConfig,
          needsPlayers: true,
          wantedPositions: alreadySelected
            ? currentConfig.wantedPositions.filter((item) => item !== posicao)
            : [...currentConfig.wantedPositions, posicao],
        },
      };
    });
  }

  function addStaffMember(role: StaffRole) {
    setStaffMembers((current) => [
      ...current,
      {
        id: createTempId(),
        name: "",
        role,
        phone: "",
        notes: "",
        categoryIds: [],
      },
    ]);
  }

  function updateStaffMember(id: string, data: Partial<StaffForm>) {
    setStaffMembers((current) =>
      current.map((member) =>
        member.id === id ? { ...member, ...data } : member,
      ),
    );
  }

  function removeStaffMember(id: string) {
    setStaffMembers((current) => current.filter((member) => member.id !== id));
  }

  function toggleStaffCategory(staffId: string, categoryId: string) {
    setStaffMembers((current) =>
      current.map((member) => {
        if (member.id !== staffId) return member;

        const alreadySelected = member.categoryIds.includes(categoryId);

        return {
          ...member,
          categoryIds: alreadySelected
            ? member.categoryIds.filter((id) => id !== categoryId)
            : [...member.categoryIds, categoryId],
        };
      }),
    );
  }

  function circleClass(categoryId: string, posicao: string) {
    const selected =
      categoryRecruitment[categoryId]?.wantedPositions.includes(posicao);

    return `
      absolute
      w-14 h-14
      rounded-full
      text-xs
      font-bold
      transition-all
      flex items-center justify-center
      shadow-lg
      ${
        selected
          ? "bg-white text-green-700 scale-110"
          : "bg-white/20 backdrop-blur text-white hover:bg-white/30"
      }
    `;
  }

  function getCategoryName(categoryId: string) {
    return (
      categories.find((category) => category.id === categoryId)?.name || ""
    );
  }

  async function handleSave() {
    if (!userId || !teamId) return;

    if (!nomeTime.trim()) {
      alert("Informe o nome do time.");
      return;
    }

    if (selectedCategoryIds.length === 0) {
      alert("Selecione pelo menos uma categoria para o time.");
      return;
    }

    const recruitingWithoutPosition = selectedCategoryIds.find((categoryId) => {
      const config = categoryRecruitment[categoryId];

      return config?.needsPlayers && config.wantedPositions.length === 0;
    });

    if (recruitingWithoutPosition) {
      alert(
        `Selecione pelo menos uma posição para a categoria ${getCategoryName(
          recruitingWithoutPosition,
        )}.`,
      );
      return;
    }

    const validStaffMembers = staffMembers.filter((member) =>
      member.name.trim(),
    );

    const staffWithoutCategory = validStaffMembers.find(
      (member) => member.categoryIds.length === 0,
    );

    if (staffWithoutCategory) {
      alert(
        `Selecione pelo menos uma categoria para ${staffWithoutCategory.name}.`,
      );
      return;
    }

    setLoading(true);

    const hasRecruitingCategory = selectedCategoryIds.some(
      (categoryId) => categoryRecruitment[categoryId]?.needsPlayers,
    );

    const allWantedPositions = Array.from(
      new Set(
        selectedCategoryIds.flatMap(
          (categoryId) =>
            categoryRecruitment[categoryId]?.wantedPositions || [],
        ),
      ),
    );

    const { error: teamUpdateError } = await supabase
      .from("team_profiles")
      .update({
        nometime: nomeTime,
        cidade,
        bairro,
        estado,
        fundacao,
        precisajogador: hasRecruitingCategory,
        posicaoprocurada: allWantedPositions.join(", "),
        precisapatrocinio: precisaPatrocinio,
        logo: logoUrl,
      })
      .eq("userid", userId);

    if (teamUpdateError) {
      setLoading(false);
      console.log(teamUpdateError);
      alert(teamUpdateError.message);
      return;
    }

    const { data: existingStaff } = await supabase
      .from("team_staff")
      .select("id")
      .eq("team_id", teamId);

    const existingStaffIds = existingStaff?.map((item) => item.id) || [];

    if (existingStaffIds.length > 0) {
      const { error: deleteRelationsError } = await supabase
        .from("team_staff_categories")
        .delete()
        .in("staff_id", existingStaffIds);

      if (deleteRelationsError) {
        setLoading(false);
        console.log(deleteRelationsError);
        alert(deleteRelationsError.message);
        return;
      }

      const { error: deleteStaffError } = await supabase
        .from("team_staff")
        .delete()
        .eq("team_id", teamId);

      if (deleteStaffError) {
        setLoading(false);
        console.log(deleteStaffError);
        alert(deleteStaffError.message);
        return;
      }
    }

    const currentCategoryIds = teamCategories.map((item) => item.category_id);

    const categoriesToInsert = selectedCategoryIds.filter(
      (categoryId) => !currentCategoryIds.includes(categoryId),
    );

    const categoriesToDelete = teamCategories.filter(
      (item) => !selectedCategoryIds.includes(item.category_id),
    );

    if (categoriesToDelete.length > 0) {
      const { error } = await supabase
        .from("team_categories")
        .delete()
        .in(
          "id",
          categoriesToDelete.map((item) => item.id),
        );

      if (error) {
        setLoading(false);
        console.log(error);
        alert(error.message);
        return;
      }
    }

    if (categoriesToInsert.length > 0) {
      const { error } = await supabase.from("team_categories").insert(
        categoriesToInsert.map((categoryId) => ({
          team_id: teamId,
          category_id: categoryId,
          active: true,
          needs_players: categoryRecruitment[categoryId]?.needsPlayers || false,
          wanted_positions:
            categoryRecruitment[categoryId]?.wantedPositions.join(", ") || null,
        })),
      );

      if (error) {
        setLoading(false);
        console.log(error);
        alert(error.message);
        return;
      }
    }

    const existingSelectedCategories = teamCategories.filter((item) =>
      selectedCategoryIds.includes(item.category_id),
    );

    for (const item of existingSelectedCategories) {
      const config = categoryRecruitment[item.category_id] || {
        needsPlayers: false,
        wantedPositions: [],
      };

      const { error } = await supabase
        .from("team_categories")
        .update({
          active: true,
          needs_players: config.needsPlayers,
          wanted_positions: config.wantedPositions.join(", ") || null,
        })
        .eq("id", item.id);

      if (error) {
        setLoading(false);
        console.log(error);
        alert(error.message);
        return;
      }
    }

    const { data: refreshedTeamCategories, error: refreshError } =
      await supabase
        .from("team_categories")
        .select("id, team_id, category_id")
        .eq("team_id", teamId);

    if (refreshError) {
      setLoading(false);
      console.log(refreshError);
      alert(refreshError.message);
      return;
    }

    const categoryIdToTeamCategoryId = new Map<string, string>();

    (refreshedTeamCategories || []).forEach((item) => {
      categoryIdToTeamCategoryId.set(item.category_id, item.id);
    });

    for (const member of validStaffMembers) {
      const { data: insertedStaff, error: staffError } = await supabase
        .from("team_staff")
        .insert({
          team_id: teamId,
          name: member.name.trim(),
          role: member.role,
          phone: member.phone.trim() || null,
          notes: member.notes.trim() || null,
          active: true,
        })
        .select("id")
        .single();

      if (staffError || !insertedStaff) {
        setLoading(false);
        console.log(staffError);
        alert(staffError?.message || "Erro ao salvar equipe técnica.");
        return;
      }

      const relations = member.categoryIds
        .map((categoryId) => {
          const teamCategoryId = categoryIdToTeamCategoryId.get(categoryId);

          if (!teamCategoryId) return null;

          return {
            staff_id: insertedStaff.id,
            team_category_id: teamCategoryId,
          };
        })
        .filter(Boolean);

      if (relations.length > 0) {
        const { error: relationError } = await supabase
          .from("team_staff_categories")
          .insert(relations);

        if (relationError) {
          setLoading(false);
          console.log(relationError);
          alert(relationError.message);
          return;
        }
      }
    }

    setLoading(false);
    router.push("/dashboard/time");
  }

  const inputClass =
    "w-full h-14 px-5 rounded-2xl bg-[#f7f8fa] text-zinc-800 placeholder:text-zinc-400 outline-none transition-all focus:bg-white focus:shadow-md";

  const activeRecruitment = activeRecruitCategoryId
    ? categoryRecruitment[activeRecruitCategoryId] || {
        needsPlayers: false,
        wantedPositions: [],
      }
    : null;

  if (pageLoading) {
    return (
      <main className="flex-1 p-4 md:p-8 bg-[#f3f5f7]">
        <div className="bg-white rounded-[36px] h-[400px] animate-pulse" />
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 md:p-8 bg-[#f3f5f7]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Editar time</h1>
            <p className="text-sm text-zinc-500">
              Atualize as informações do seu clube
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="hidden md:flex h-12 px-6 cursor-pointer rounded-full bg-[#0f3b2e] text-white items-center gap-2 text-sm font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
        >
          <Save size={16} />
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>

      <section className="bg-white rounded-[36px] p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo do time"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#0f3b2e] text-5xl md:text-6xl font-black">
                  {nomeTime?.charAt(0)?.toUpperCase() || "C"}
                </span>
              )}
            </div>

            <label className="absolute bottom-1 right-1 w-12 h-12 rounded-full bg-[#0f3b2e] text-white flex items-center justify-center cursor-pointer shadow-xl hover:scale-105 transition">
              <Camera size={18} />

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </label>
          </div>

          <h2 className="mt-5 text-2xl md:text-3xl font-bold text-zinc-900 text-center">
            {nomeTime || "Seu Clube"}
          </h2>

          <p className="text-zinc-500 mt-1 text-center">
            {cidade || "Cidade"} {estado ? `• ${estado}` : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            value={nomeTime}
            onChange={(e) => setNomeTime(e.target.value)}
            placeholder="Nome do time"
            className={inputClass}
          />

          <input
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Cidade"
            className={inputClass}
          />

          <input
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Bairro"
            className={inputClass}
          />

          <input
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            placeholder="Estado"
            className={inputClass}
          />

          <input
            type="number"
            value={fundacao}
            onChange={(e) => setFundacao(e.target.value)}
            placeholder="Ano de fundação"
            className={inputClass}
          />

          <label className="md:col-span-2 flex items-center gap-3 text-sm font-medium text-zinc-700">
            <input
              type="checkbox"
              checked={precisaPatrocinio}
              onChange={(e) => setPrecisaPatrocinio(e.target.checked)}
              className="w-5 h-5 accent-[#0f3b2e]"
            />
            Procurando patrocinadores
          </label>

          <section className="md:col-span-2 rounded-[28px] bg-[#f7f8fa] p-5">
            <h3 className="font-bold text-zinc-900 mb-2">Categorias do time</h3>

            <p className="text-sm text-zinc-500 mb-4">
              Selecione as categorias que seu time possui. Exemplo: Livre,
              Master, 40+, 50+.
            </p>

            {categories.length === 0 ? (
              <div className="rounded-2xl bg-white border border-red-100 p-4 text-sm text-red-600">
                As categorias não carregaram. Crie o arquivo
                <strong> app/api/team/categories/route.ts </strong>
                que mandei junto com esta página e reinicie o servidor.
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const selected = selectedCategoryIds.includes(category.id);

                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => toggleCategoria(category.id)}
                      className={`h-11 px-4 rounded-full text-sm font-semibold border transition ${
                        selected
                          ? "bg-[#0f3b2e] text-white border-[#0f3b2e]"
                          : "bg-white text-zinc-700 border-zinc-200 hover:border-[#0f3b2e]"
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section className="md:col-span-2 rounded-[28px] bg-[#f7f8fa] p-5">
            <h3 className="font-bold text-zinc-900 mb-2">
              Recrutamento por categoria
            </h3>

            <p className="text-sm text-zinc-500 mb-4">
              Escolha uma categoria do time e marque as posições que ela está
              procurando.
            </p>

            {selectedCategoryIds.length === 0 ? (
              <div className="rounded-2xl bg-white p-4 text-sm text-zinc-500">
                Primeiro selecione as categorias do time acima.
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-3 mb-5">
                  {categories
                    .filter((category) =>
                      selectedCategoryIds.includes(category.id),
                    )
                    .map((category) => {
                      const active = activeRecruitCategoryId === category.id;

                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() =>
                            setActiveRecruitCategoryId(category.id)
                          }
                          className={`h-11 px-4 rounded-full text-sm font-semibold border transition ${
                            active
                              ? "bg-[#0f3b2e] text-white border-[#0f3b2e]"
                              : "bg-white text-zinc-700 border-zinc-200 hover:border-[#0f3b2e]"
                          }`}
                        >
                          {category.name}
                        </button>
                      );
                    })}
                </div>

                {activeRecruitCategoryId && activeRecruitment && (
                  <div className="rounded-[28px] bg-white border border-zinc-200 p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                      <div>
                        <h4 className="font-bold text-zinc-900">
                          {getCategoryName(activeRecruitCategoryId)}
                        </h4>

                        <p className="text-sm text-zinc-500">
                          As posições selecionadas serão salvas para esta
                          categoria.
                        </p>
                      </div>

                      <label className="flex items-center gap-3 text-sm font-medium text-zinc-700">
                        <input
                          type="checkbox"
                          checked={activeRecruitment.needsPlayers}
                          onChange={() =>
                            toggleRecruiting(activeRecruitCategoryId)
                          }
                          className="w-5 h-5 accent-[#0f3b2e]"
                        />
                        Recrutando jogadores
                      </label>
                    </div>

                    <div className="relative mx-auto max-w-[500px] h-[420px] rounded-[32px] overflow-hidden bg-gradient-to-b from-green-500 to-green-700 shadow-lg">
                      <div className="absolute inset-3 border-2 border-white/60 rounded-3xl" />
                      <div className="absolute left-3 right-3 top-1/2 border-t-2 border-white/60" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/60" />

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(activeRecruitCategoryId, "Goleiro")
                        }
                        className={circleClass(
                          activeRecruitCategoryId,
                          "Goleiro",
                        )}
                        style={{
                          bottom: "15px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        GOL
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(activeRecruitCategoryId, "Zagueiro")
                        }
                        className={circleClass(
                          activeRecruitCategoryId,
                          "Zagueiro",
                        )}
                        style={{
                          bottom: "90px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        ZAG
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(
                            activeRecruitCategoryId,
                            "Lateral Esquerdo",
                          )
                        }
                        className={circleClass(
                          activeRecruitCategoryId,
                          "Lateral Esquerdo",
                        )}
                        style={{ bottom: "90px", left: "15%" }}
                      >
                        LE
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(
                            activeRecruitCategoryId,
                            "Lateral Direito",
                          )
                        }
                        className={circleClass(
                          activeRecruitCategoryId,
                          "Lateral Direito",
                        )}
                        style={{ bottom: "90px", right: "15%" }}
                      >
                        LD
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(activeRecruitCategoryId, "Volante")
                        }
                        className={circleClass(
                          activeRecruitCategoryId,
                          "Volante",
                        )}
                        style={{
                          bottom: "170px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        VOL
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(activeRecruitCategoryId, "Meia")
                        }
                        className={circleClass(activeRecruitCategoryId, "Meia")}
                        style={{ bottom: "240px", left: "28%" }}
                      >
                        MEI
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(activeRecruitCategoryId, "Meia")
                        }
                        className={circleClass(activeRecruitCategoryId, "Meia")}
                        style={{ bottom: "240px", right: "28%" }}
                      >
                        MEI
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(
                            activeRecruitCategoryId,
                            "Ponta Esquerda",
                          )
                        }
                        className={circleClass(
                          activeRecruitCategoryId,
                          "Ponta Esquerda",
                        )}
                        style={{ top: "70px", left: "12%" }}
                      >
                        PE
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(
                            activeRecruitCategoryId,
                            "Ponta Direita",
                          )
                        }
                        className={circleClass(
                          activeRecruitCategoryId,
                          "Ponta Direita",
                        )}
                        style={{ top: "70px", right: "12%" }}
                      >
                        PD
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          togglePosicao(activeRecruitCategoryId, "Atacante")
                        }
                        className={circleClass(
                          activeRecruitCategoryId,
                          "Atacante",
                        )}
                        style={{
                          top: "15px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        ATA
                      </button>
                    </div>

                    {activeRecruitment.wantedPositions.length > 0 && (
                      <div className="mt-4 bg-[#f7f8fa] rounded-2xl p-4 text-sm text-zinc-700">
                        <span className="font-semibold">
                          Posições selecionadas para{" "}
                          {getCategoryName(activeRecruitCategoryId)}:
                        </span>{" "}
                        {activeRecruitment.wantedPositions.join(", ")}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </section>

          <section className="md:col-span-2 rounded-[28px] bg-[#f7f8fa] p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <div>
                <h3 className="font-bold text-zinc-900">
                  Técnico e comissão técnica
                </h3>

                <p className="text-sm text-zinc-500 mt-1">
                  Cadastre os responsáveis e selecione em quais categorias cada
                  um atua.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => addStaffMember("coach")}
                  disabled={selectedCategoryIds.length === 0}
                  className="h-11 px-4 rounded-full bg-[#0f3b2e] text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Plus size={16} />
                  Técnico
                </button>

                <button
                  type="button"
                  onClick={() => addStaffMember("staff")}
                  disabled={selectedCategoryIds.length === 0}
                  className="h-11 px-4 rounded-full bg-white border border-zinc-200 text-zinc-700 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Plus size={16} />
                  Comissão
                </button>
              </div>
            </div>

            {selectedCategoryIds.length === 0 && (
              <div className="rounded-2xl bg-white p-4 text-sm text-zinc-500">
                Selecione pelo menos uma categoria do time antes de cadastrar
                técnico ou comissão.
              </div>
            )}

            {staffMembers.length === 0 && selectedCategoryIds.length > 0 && (
              <div className="rounded-2xl bg-white p-4 text-sm text-zinc-500">
                Nenhum técnico ou membro da comissão cadastrado ainda.
              </div>
            )}

            <div className="space-y-4">
              {staffMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-[24px] bg-white border border-zinc-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-11 h-11 rounded-full bg-[#edf3ef] text-[#0f3b2e] flex items-center justify-center">
                        {member.role === "coach" ? (
                          <UserRound size={18} />
                        ) : (
                          <Users size={18} />
                        )}
                      </span>

                      <div>
                        <p className="font-bold text-zinc-900">
                          {member.role === "coach"
                            ? "Técnico"
                            : "Comissão técnica"}
                        </p>

                        <p className="text-xs text-zinc-500">
                          Vincule esta pessoa às categorias.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeStaffMember(member.id)}
                      className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      value={member.name}
                      onChange={(e) =>
                        updateStaffMember(member.id, {
                          name: e.target.value,
                        })
                      }
                      placeholder="Nome"
                      className={inputClass}
                    />

                    <input
                      value={member.phone}
                      onChange={(e) =>
                        updateStaffMember(member.id, {
                          phone: e.target.value,
                        })
                      }
                      placeholder="Telefone opcional"
                      className={inputClass}
                    />

                    <textarea
                      value={member.notes}
                      onChange={(e) =>
                        updateStaffMember(member.id, {
                          notes: e.target.value,
                        })
                      }
                      placeholder="Observação opcional"
                      className="md:col-span-2 min-h-[90px] w-full rounded-2xl bg-[#f7f8fa] p-4 outline-none focus:bg-white focus:shadow-md resize-none"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-zinc-700 mb-3">
                      Categorias em que atua
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {categories
                        .filter((category) =>
                          selectedCategoryIds.includes(category.id),
                        )
                        .map((category) => {
                          const selected = member.categoryIds.includes(
                            category.id,
                          );

                          return (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() =>
                                toggleStaffCategory(member.id, category.id)
                              }
                              className={`h-10 px-4 rounded-full text-sm font-semibold border transition ${
                                selected
                                  ? "bg-[#0f3b2e] text-white border-[#0f3b2e]"
                                  : "bg-white text-zinc-700 border-zinc-200 hover:border-[#0f3b2e]"
                              }`}
                            >
                              {category.name}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="md:col-span-2 flex flex-col md:flex-row gap-3 justify-end pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="h-14 px-8 rounded-2xl border border-zinc-200 font-semibold hover:bg-zinc-50 transition"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="h-14 px-8 rounded-2xl bg-[#0f3b2e] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
