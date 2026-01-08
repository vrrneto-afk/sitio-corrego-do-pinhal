/* ======================================================
   CONFIG GERAL — SÍTIO CÓRREGO DO PINHAL
   Este arquivo governa TODAS as regras do sistema
====================================================== */

const CONFIG = {

  /* =========================
     INTERFACE / VISUAL
  ========================= */
  ui: {
    fontePadrao: "Inter, system-ui, Arial, Helvetica, sans-serif",
    tamanhoTitulo: "20px",
    tamanhoTexto: "15px",
    bordaCard: "12px",
    sombraCard: "0 2px 6px rgba(0,0,0,.06)"
  },

  /* =========================
     CORES DO SISTEMA
  ========================= */
  cores: {
    ok: "#2f6b2f",
    atencao: "#e0a800",
    alerta: "#e67e22",
    urgente: "#c0392b",
    fundo: "#f6efe7",
    header: "#D0B485",
    menu: "#7b3f2a"
  },

  /* =========================
     CRIAS / VACAS A CRIAR
  ========================= */
  crias: {
    prazos: {
      ok_acima_dias: 60,
      atencao_ate_dias: 60,
      alerta_ate_dias: 30,
      urgente_ate_dias: 15
    },

    mensagens: {
      desmamar: "⚠️ Desmamar",
      atencao: "⚠️ Atenção",
      urgente: "🚨 Urgente",
      atrasada: "🚨 Passou {dias} dias da data prevista."
    },

    alertaRapido: {
      incluirSeDiasMenorIgual: 15,
      incluirSeAtrasada: true
    }
  },

  /* =========================
     VACINAS
  ========================= */
  vacinas: {
    mensagens: {
      hoje: "🚨 Aplicar hoje.",
      atrasada: "⚠️ Atrasada há {dias} dias",
      futura: "⏳ Reaplicar em {dias} dias"
    },

    alertaRapido: {
      incluirSeDiasMenorIgual: 0
    }
  },

  /* =========================
     LEMBRETES
  ========================= */
  lembretes: {
    tipos: {
      compra: {
        icone: "📝",
        titulo: "Itens a Comprar"
      },
      tarefa: {
        icone: "⏰",
        titulo: "Tarefas"
      }
    },
    mostrarNoBanner: true
  },

  /* =========================
     ALERTAS (OVERLAY / BANNER)
  ========================= */
  alertas: {
    mostrarOverlayAoCarregar: true,
    textoSemAlertas: "🔔 Nenhum alerta no momento"
  },

  /* =========================
     MENU
  ========================= */
  menu: {
    usarMenuAtivo: true
  }

};
