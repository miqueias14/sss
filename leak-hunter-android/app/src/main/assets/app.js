const statConfigs = [
  {
    key: "vpip",
    title: "VPIP",
    phase: "Pre-flop",
    min: 5,
    max: 45,
    step: 1,
    defaultValue: 22,
    suffix: "%",
    helper: "Quanto o vilao entra nos potes voluntariamente.",
    rules: [
      ["Muito tight", (value) => value < 15, "Entra pouco e costuma carregar forca real quando se envolve.", "Blefe mais em potes pequenos e pressione a passividade dele.", "aggressive"],
      ["Muito loose", (value) => value > 25, "Participa demais e leva ranges fracos para varias ruas.", "Aposte mais por valor e simplifique o plano com maos fortes.", "cautious"],
      ["Faixa equilibrada", () => true, "Perfil sem exagero claro entre selecao e volume.", "Siga a leitura combinando posicao, stack e dinamica recente.", "balanced"],
    ],
  },
  {
    key: "pfr",
    title: "PFR",
    phase: "Pre-flop",
    min: 5,
    max: 30,
    step: 1,
    defaultValue: 15,
    suffix: "%",
    helper: "Frequencia com que abre ou aumenta pre-flop.",
    rules: [
      ["Passivo", (value) => value < 12, "Os raises aparecem pouco e representam forca com mais frequencia.", "Respeite os raises e reduza hero calls pre-flop sem premium.", "cautious"],
      ["Agressivo", (value) => value > 18, "Abre bastante e pressiona ranges mais amplos.", "Defenda melhor as maos boas e escolha spots de 3-bet com criterio.", "balanced"],
      ["Padrao", () => true, "Frequencia normal de abertura para um regular.", "Ajuste mais pela posicao e pelo historico recente do que pelo numero puro.", "balanced"],
    ],
  },
  {
    key: "steal",
    title: "Steal",
    phase: "Pre-flop",
    min: 10,
    max: 55,
    step: 1,
    defaultValue: 30,
    suffix: "%",
    helper: "Tentativas de roubo em SB, BB e BTN.",
    rules: [
      ["Rouba pouco", (value) => value < 25, "Nao explora tanto os blinds e costuma desistir cedo dessa guerra.", "Pressione mais quando ele estiver nos blinds e roube com frequencia.", "aggressive"],
      ["Rouba demais", (value) => value > 35, "Ataca blinds o tempo todo e abre margem para contra-ataque.", "Defenda com maos decentes e adicione 3-bets light na mistura.", "aggressive"],
      ["Roubo controlado", () => true, "Nao entrega um leak obvio nessa zona.", "Escolha spots conforme blockers, stack efetivo e leitura da mesa.", "balanced"],
    ],
  },
  {
    key: "threeBet",
    title: "3-Bet",
    phase: "Pre-flop",
    min: 3,
    max: 18,
    step: 0.5,
    defaultValue: 9,
    suffix: "%",
    helper: "Re-raise pre-flop.",
    rules: [
      ["Range forte", (value) => value < 9, "As 3-bets tendem a ser pesadas e pouco criativas.", "Evite confrontos marginais e pague menos fora de posicao.", "cautious"],
      ["Range amplo", (value) => value > 12, "Mistura valor com blefes com mais liberdade.", "Defenda melhor maos medias e considere 4-bet blefado nos melhores spots.", "balanced"],
      ["Faixa media", () => true, "Agressao sem exagero claro.", "Use leitura de posicao e sizing para decidir entre call, fold e 4-bet.", "balanced"],
    ],
  },
  {
    key: "foldVs3Bet",
    title: "Fold vs 3-Bet",
    phase: "Pre-flop",
    min: 35,
    max: 85,
    step: 1,
    defaultValue: 65,
    suffix: "%",
    helper: "Quanto abandona para 3-bet.",
    rules: [
      ["Nao larga facil", (value) => value < 60, "Continua bastante e pune blefes vazios.", "Corte blefes ruins e concentre sua pressao em range de valor.", "cautious"],
      ["Larga demais", (value) => value > 70, "Entrega muito pote sem lutar quando recebe pressao.", "Abuse de 3-bets light e pressione opens previsiveis.", "aggressive"],
      ["Resposta neutra", () => true, "Nao ha excesso gritante em nenhuma direcao.", "Mantenha frequencias honestas e escolha bem os blockers.", "balanced"],
    ],
  },
  {
    key: "cbet",
    title: "C-Bet",
    phase: "Pos-flop",
    min: 20,
    max: 90,
    step: 1,
    defaultValue: 62,
    suffix: "%",
    helper: "Frequencia com que continua apostando no flop.",
    rules: [
      ["Baixa frequencia", (value) => value < 45, "Nao atira automatico e deixa turn livre com certa frequencia.", "Flutue mais em posicao e prepare blefes nas ruas seguintes.", "aggressive"],
      ["Alta frequencia", (value) => value > 65, "C-beta quase tudo e pode carregar ar demais.", "Defenda melhor maos medias e escolha raises de protecao/blefe.", "balanced"],
      ["Frequencia media", () => true, "Padrao mais seletivo e menos exploravel de imediato.", "Use textura do board e posicao para calibrar sua resposta.", "balanced"],
    ],
  },
  {
    key: "foldVsCbet",
    title: "Fold vs C-Bet",
    phase: "Pos-flop",
    min: 20,
    max: 70,
    step: 1,
    defaultValue: 44,
    suffix: "%",
    helper: "Quanto desiste contra continuation bet.",
    rules: [
      ["Folda muito", (value) => value > 50, "Entrega flops demais quando sofre a primeira pressao.", "Blefe mais em boards secos e cobre bem o range percebido.", "aggressive"],
      ["Defende bem", (value) => value < 40, "Nao se assusta facil e continua com parte relevante do range.", "Aposte mais por valor e corte blefes sem equidade.", "cautious"],
      ["Resposta media", () => true, "Sem leak evidente nesse ponto.", "Continue guiando a decisao pela textura do board e blockers.", "balanced"],
    ],
  },
  {
    key: "checkRaise",
    title: "Check-Raise",
    phase: "Pos-flop",
    min: 4,
    max: 24,
    step: 1,
    defaultValue: 12,
    suffix: "%",
    helper: "Quanto responde com check-raise.",
    rules: [
      ["Muito forte", (value) => value < 16, "Costuma reservar o movimento para maos bem fortes.", "Respeite mais a linha e evite barrelar blefes em cima dela.", "cautious"],
      ["Inclui blefes", (value) => value > 16, "A linha pode carregar presses artificiais e sem showdown.", "Induza blefes e continue mais vezes com maos medias robustas.", "balanced"],
      ["Zona neutra", () => true, "Frequencia mais padrao para regs.", "Considere stack, board e blockers antes de superajustar.", "balanced"],
    ],
  },
  {
    key: "wtsd",
    title: "WTSD",
    phase: "Showdown",
    min: 15,
    max: 45,
    step: 1,
    defaultValue: 29,
    suffix: "%",
    helper: "Com que frequencia vai ate o showdown.",
    rules: [
      ["Evita showdown", (value) => value < 25, "Larga antes do fim e protege pouco o bluff-catch.", "Aumente os blefes bem escolhidos, principalmente em rivers assustadores.", "aggressive"],
      ["Vai ate o fim", (value) => value > 35, "Paga mais e realiza showdown com frequencia alta.", "Diminua blefes e maximize thin value quando tiver showdown value.", "cautious"],
      ["Showdown equilibrado", () => true, "Nao se entrega facil nem hero-calla demais por padrao.", "Planeje linhas completas em vez de depender de um ajuste simples.", "balanced"],
    ],
  },
  {
    key: "wsd",
    title: "W$SD",
    phase: "Showdown",
    min: 35,
    max: 65,
    step: 1,
    defaultValue: 50,
    suffix: "%",
    helper: "Taxa de vitoria quando chega ao showdown.",
    rules: [
      ["Perde muito", (value) => value < 50, "Chega mal ao showdown ou paga alem da conta.", "Aposte mais por valor e ataque calls marginais dele.", "aggressive"],
      ["Ganha bastante", (value) => value > 50, "Seleciona melhor as maos que mostram cartas.", "Evite blefes teimosos e respeite mais a linha de showdown dele.", "cautious"],
      ["Faixa neutra", () => true, "Sem indicio claro de erro no showdown.", "Cruze esse numero com WTSD antes de tirar conclusoes fortes.", "balanced"],
    ],
  },
];

const heroTargets = [
  ["BB/100", "10", "Meta de lucro por 100 maos."],
  ["Raise First SB", "60", "Roube com frequencia."],
  ["Raise First EP", "18", "Range tight."],
  ["Raise First MP", "24", "Range medio."],
  ["Raise First CO", "34", "Range mais solto."],
  ["Raise First BTN", "52", "Roubo agressivo."],
  ["3-Bet PF", "12", "Pressao equilibrada."],
  ["C-Bet IP", "80", "Alta frequencia em posicao."],
  ["C-Bet OOP", "35", "Mais seletivo fora de posicao."],
  ["Check-Raise Eff.", "2.5", "Frequencia saudavel."],
  ["Call PF 2-Bet SB", "9.5", "Evite pagar fora de posicao."],
  ["Call PF 2-Bet BB", "55", "Defesa ampla do blind."],
  ["Call PF 2-Bet BTN", "15", "Selecao melhor em posicao."],
  ["Check-Raise Flop", "16", "Frequencia ideal."],
  ["Float Flop/Turn", "51", "Leitura e blefe bem calibrados."],
  ["Probe Turn", "51", "Agressividade no turn."],
  ["3-Bet Steal", "17", "Re-raise contra roubos."],
];

const values = Object.fromEntries(statConfigs.map((stat) => [stat.key, stat.defaultValue]));

function getRule(stat, value) {
  return stat.rules.find((rule) => rule[1](value)) || stat.rules[stat.rules.length - 1];
}

function toneClass(tone) {
  return `tone-${tone}`;
}

function renderTargets() {
  const targetTable = document.getElementById("target-table");
  targetTable.innerHTML = heroTargets
    .map(
      ([stat, ideal, note]) => `
        <article class="target-row">
          <div>
            <p class="target-name">${stat}</p>
            <p class="target-note">${note}</p>
          </div>
          <strong>${ideal}</strong>
        </article>
      `,
    )
    .join("");
}

function renderPlan(readings) {
  const planStack = document.getElementById("plan-stack");
  const topActions = readings.filter((item) => item.rule[4] !== "balanced").slice(0, 4);

  planStack.innerHTML = topActions
    .map(
      ({ stat, value, rule }) => `
        <article class="plan-card ${toneClass(rule[4])}">
          <div>
            <p class="plan-title">${stat.title} ${value}${stat.suffix || ""}</p>
            <p class="plan-subtitle">${rule[0]}</p>
          </div>
          <p>${rule[3]}</p>
        </article>
      `,
    )
    .join("");
}

function renderStats() {
  const statGrid = document.getElementById("stat-grid");
  const readings = statConfigs.map((stat) => ({
    stat,
    value: values[stat.key],
    rule: getRule(stat, values[stat.key]),
  }));

  statGrid.innerHTML = readings
    .map(
      ({ stat, value, rule }) => `
        <article class="stat-card ${toneClass(rule[4])}">
          <div class="stat-top">
            <div>
              <p class="stat-phase">${stat.phase}</p>
              <h3>${stat.title}</h3>
            </div>
            <div class="stat-value">${value}${stat.suffix || ""}</div>
          </div>
          <p class="stat-helper">${stat.helper}</p>
          <p class="chip">${rule[0]}</p>
          <label class="slider-wrap" for="${stat.key}">
            <span>Ajustar leitura</span>
            <input
              id="${stat.key}"
              type="range"
              min="${stat.min}"
              max="${stat.max}"
              step="${stat.step}"
              value="${value}"
            />
          </label>
          <p class="stat-insight">${rule[2]}</p>
          <p class="stat-action">${rule[3]}</p>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll(".stat-grid input[type='range']").forEach((input) => {
    input.addEventListener("input", (event) => {
      values[event.target.id] = Number(event.target.value);
      renderStats();
    });
  });

  renderPlan(readings);
}

renderTargets();
renderStats();
