const DADOS = {
  vacas: [
    {
      id: 1,
      nome: "BARONESA",
      raca: "GIROLANDO",
      touroAtual: "BANGUELA",
      prenhaDesde: "2025-02-22",
      criaPrevista: "2025-11-22",
      status: "criou"
    },
    {
      id: 2,
      nome: "BARQUINHA",
      raca: "JERSOLANDO",
      touroAtual: "BANGUELA",
      prenhaDesde: "2025-03-12",
      criaPrevista: "2025-12-12",
      status: "criou"
    },
    {
      id: 3,
      nome: "BONECA",
      raca: "JERSOLANDO",
      touroAtual: "BANGUELA",
      prenhaDesde: "2025-04-20",
      criaPrevista: "2026-01-20",
      status: "prenhe"
    },
    {
      id: 4,
      nome: "CACHOEIRA",
      raca: "GIROLANDO",
      touroAtual: "FERDINANDO",
      prenhaDesde: "2025-08-02",
      criaPrevista: "2026-05-02",
      status: "prenhe"
    }
  ],

  historicoCrias: [
    {
      id: 1,
      vacaId: 1,
      nomeVaca: "BARONESA",
      dataParto: "2025-11-29",
      nomeCria: "JAMANTA",
      sexo: "M",
      racaCria: "GIROLANDO",
      pai: "BANGUELA"
    },
    {
      id: 2,
      vacaId: 2,
      nomeVaca: "BARQUINHA",
      dataParto: "2025-12-15",
      nomeCria: "PACHOLA",
      sexo: "F",
      racaCria: "JERSOLANDO",
      pai: "BANGUELA"
    },
    {
      id: 3,
      vacaId: 2,
      nomeVaca: "BARQUINHA",
      dataParto: "2025-01-24",
      nomeCria: "JUSCELINO",
      sexo: "M",
      racaCria: "JERSOLANDO",
      pai: "BANGUELA"
    },
    {
      id: 4,
      vacaId: 3,
      nomeVaca: "BONECA",
      dataParto: "2025-02-21",
      nomeCria: "CARRETINHA",
      sexo: "M",
      racaCria: "JERSOLANDO",
      pai: "BANGUELA"
    }
  ],

  bezerros: [
    {
      id: 1,
      nome: "JAMANTA",
      sexo: "M",
      raca: "GIROLANDO",
      dataNascimento: "2025-11-29",
      mae: "BARONESA",
      pai: "BANGUELA",
      origem: "proprio",
      status: "ativo"
    },
    {
      id: 2,
      nome: "PACHOLA",
      sexo: "F",
      raca: "JERSOLANDO",
      dataNascimento: "2025-12-15",
      mae: "BARQUINHA",
      pai: "BANGUELA",
      origem: "proprio",
      status: "ativo"
    }
  ]
};
