
import {
  BrainCircuit,
  Sparkles,
  Droplets,
  CloudRain,
  Thermometer,
  Sprout,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  Activity,
  CalendarDays,
  ChevronRight,
  Zap,
  Target,
  Leaf,
} from "lucide-react";

const insights = [
  {
    icon: Droplets,
    title: "Necessidade de irrigação",
    area: "Talhão D • Milho",
    description:
      "A umidade do solo está abaixo do nível recomendado. A irrigação é indicada para evitar estresse hídrico na cultura.",
    priority: "Alta prioridade",
    type: "high",
    action: "Irrigação recomendada",
  },
  {
    icon: CloudRain,
    title: "Possibilidade de chuva",
    area: "Toda a propriedade",
    description:
      "A previsão indica possibilidade de chuva nas próximas 24 horas. Considere ajustar os horários de irrigação.",
    priority: "Atenção",
    type: "medium",
    action: "Revisar programação",
  },
  {
    icon: Sprout,
    title: "Condição favorável",
    area: "Talhão C • Feijão",
    description:
      "A umidade atual está dentro da faixa recomendada. Não há necessidade de irrigação imediata.",
    priority: "Condição estável",
    type: "good",
    action: "Manter monitoramento",
  },
];

const predictions = [
  { day: "Hoje", rain: "10%", temp: "32°", humidity: "38%" },
  { day: "Sexta", rain: "65%", temp: "29°", humidity: "52%" },
  { day: "Sábado", rain: "80%", temp: "27°", humidity: "61%" },
  { day: "Domingo", rain: "25%", temp: "31°", humidity: "43%" },
];

export default function Inteligencia() {
  return (
    <div className="intelligence-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .intelligence-page {
          font-family: 'DM Sans', sans-serif;
          color: #edf4ef;
          width: 100%;
        }

        .intelligence-page * { box-sizing: border-box; }

        .intel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }

        .intel-header h1 {
          font-size: 27px;
          margin: 0 0 7px;
          letter-spacing: -.8px;
        }

        .intel-header p {
          color: #8e9e94;
          font-size: 13px;
          margin: 0;
        }

        .intel-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #203b2c;
          color: #86ca99;
          border: 1px solid #365d43;
          padding: 9px 13px;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 600;
        }

        .intel-pulse {
          width: 7px;
          height: 7px;
          background: #75ca8d;
          border-radius: 50%;
          box-shadow: 0 0 0 4px #75ca8d22;
        }

        .intel-hero {
          background: linear-gradient(115deg, #254b35, #1d3429 65%, #202d28);
          border: 1px solid #42644a;
          border-radius: 15px;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
        }

        .intel-hero::after {
          content: "";
          position: absolute;
          width: 230px;
          height: 230px;
          right: 30px;
          top: -130px;
          border: 1px solid #ffffff12;
          border-radius: 50%;
          box-shadow: 0 0 0 25px #ffffff08, 0 0 0 55px #ffffff05;
        }

        .intel-hero-content { position: relative; z-index: 1; }

        .intel-hero-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a9d8b4;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .intel-hero h2 {
          font-size: 22px;
          line-height: 1.35;
          max-width: 530px;
          margin: 0 0 9px;
        }

        .intel-hero p {
          color: #b1c8b7;
          font-size: 12px;
          line-height: 1.6;
          max-width: 530px;
          margin: 0;
        }

        .intel-hero-icon {
          width: 78px;
          height: 78px;
          border-radius: 22px;
          background: #ffffff12;
          border: 1px solid #ffffff20;
          display: grid;
          place-items: center;
          color: #a6d9b3;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .intel-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }

        .intel-card {
          background: #202a27;
          border: 1px solid #303d37;
          border-radius: 13px;
          padding: 18px;
          min-width: 0;
        }

        .intel-metric-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .intel-icon {
          width: 35px;
          height: 35px;
          border-radius: 9px;
          background: #2d4538;
          color: #83c995;
          display: grid;
          place-items: center;
        }

        .intel-muted { color: #87988d; }

        .intel-metric-label {
          font-size: 11px;
          color: #91a197;
          margin-bottom: 7px;
        }

        .intel-metric-value {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -.7px;
        }

        .intel-metric-foot {
          color: #82c994;
          font-size: 10px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .intel-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(280px, 1fr);
          gap: 17px;
          margin-bottom: 18px;
        }

        .intel-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 17px;
        }

        .intel-section-head h3 {
          margin: 0;
          font-size: 15px;
        }

        .intel-section-head span {
          color: #87988d;
          font-size: 10px;
        }

        .intel-insight-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .intel-insight {
          background: #19221f;
          border: 1px solid #303d37;
          border-radius: 10px;
          padding: 14px;
        }

        .intel-insight-top {
          display: flex;
          gap: 11px;
          align-items: flex-start;
        }

        .intel-insight-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          background: #42352a;
          color: #e2b66c;
        }

        .intel-insight-icon.medium {
          background: #423b2a;
          color: #e5c477;
        }

        .intel-insight-icon.good {
          background: #294333;
          color: #7fc995;
        }

        .intel-insight-main { flex: 1; min-width: 0; }

        .intel-insight-main strong {
          display: block;
          font-size: 12px;
          margin-bottom: 4px;
        }

        .intel-insight-main small {
          color: #89998f;
          font-size: 10px;
        }

        .intel-priority {
          color: #e5ae73;
          font-size: 9px;
          white-space: nowrap;
        }

        .intel-priority.medium { color: #e5c477; }
        .intel-priority.good { color: #80c994; }

        .intel-insight p {
          font-size: 10px;
          color: #a0afa5;
          line-height: 1.6;
          margin: 12px 0;
        }

        .intel-insight-action {
          border: 0;
          background: transparent;
          color: #82c994;
          font: inherit;
          font-size: 10px;
          font-weight: 700;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
        }

        .intel-weather-list {
          display: flex;
          flex-direction: column;
        }

        .intel-weather-row {
          display: grid;
          grid-template-columns: 1fr 55px 55px 55px;
          align-items: center;
          gap: 7px;
          padding: 14px 0;
          border-bottom: 1px solid #303d37;
          font-size: 10px;
        }

        .intel-weather-row:last-child { border: 0; }

        .intel-weather-row.header {
          color: #829187;
          font-size: 9px;
          padding-top: 0;
        }

        .intel-weather-day {
          color: #dce8df;
          font-weight: 600;
        }

        .intel-weather-value {
          color: #a9b8ae;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .intel-weather-value.rain { color: #82bde3; }

        .intel-weather-note {
          background: #233b31;
          border: 1px solid #385a43;
          padding: 12px;
          border-radius: 9px;
          display: flex;
          gap: 9px;
          margin-top: 14px;
          color: #9bc9a7;
          font-size: 10px;
          line-height: 1.5;
        }

        .intel-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 17px;
        }

        .intel-recommendation {
          display: flex;
          gap: 12px;
          padding: 13px 0;
          border-bottom: 1px solid #303d37;
        }

        .intel-recommendation:last-child { border: 0; }

        .intel-rec-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          color: #81c995;
          background: #2b4436;
          flex-shrink: 0;
        }

        .intel-recommendation strong {
          display: block;
          font-size: 11px;
          margin-bottom: 4px;
        }

        .intel-recommendation p {
          color: #89998f;
          font-size: 10px;
          line-height: 1.5;
          margin: 0;
        }

        .intel-score {
          display: flex;
          align-items: center;
          gap: 17px;
          margin: 15px 0;
        }

        .intel-score-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: conic-gradient(#72bd88 0% 86%, #344139 86% 100%);
          flex-shrink: 0;
        }

        .intel-score-inner {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: #202a27;
          display: grid;
          place-items: center;
          text-align: center;
        }

        .intel-score-inner strong {
          font-size: 22px;
          display: block;
        }

        .intel-score-inner small {
          font-size: 9px;
          color: #8e9e94;
        }

        .intel-score-copy strong {
          font-size: 13px;
          display: block;
          margin-bottom: 6px;
        }

        .intel-score-copy p {
          color: #8e9e94;
          font-size: 10px;
          line-height: 1.6;
          margin: 0;
        }

        .intel-disclaimer {
          font-size: 9px;
          color: #718178;
          line-height: 1.5;
          margin-top: 14px;
        }

        @media (max-width: 1050px) {
          .intel-metrics { grid-template-columns: repeat(2, 1fr); }
          .intel-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 650px) {
          .intel-header h1 { font-size: 23px; }
          .intel-hero { padding: 18px; }
          .intel-hero h2 { font-size: 18px; }
          .intel-hero-icon { width: 55px; height: 55px; }
          .intel-metrics { gap: 9px; }
          .intel-card { padding: 14px; }
          .intel-metric-value { font-size: 21px; }
          .intel-bottom { grid-template-columns: 1fr; }
          .intel-weather-row { grid-template-columns: 1fr 48px 48px 48px; }
        }
      `}</style>

      <header className="intel-header">
        <div>
          <h1>Inteligência Agrícola</h1>
          <p>Transformando dados do campo em decisões mais inteligentes.</p>
        </div>

        <div className="intel-status">
          <span className="intel-pulse" />
          Sistema de análise ativo
        </div>
      </header>

      <section className="intel-hero">
        <div className="intel-hero-content">
          <div className="intel-hero-label">
            <Sparkles size={15} />
            IRRIGATEC INTELLIGENCE
          </div>
          <h2>O campo fala. A inteligência ajuda você a decidir.</h2>
          <p>
            Análise integrada de umidade do solo, condições climáticas e
            necessidades das culturas para apoiar o manejo da irrigação.
          </p>
        </div>
        <div className="intel-hero-icon">
          <BrainCircuit size={39} />
        </div>
      </section>

      <section className="intel-metrics">
        <div className="intel-card">
          <div className="intel-metric-top">
            <div className="intel-icon"><Activity size={18} /></div>
          </div>
          <div className="intel-metric-label">Índice de saúde do solo</div>
          <div className="intel-metric-value">86/100</div>
          <div className="intel-metric-foot"><TrendingUp size={12} /> Condição favorável</div>
        </div>

        <div className="intel-card">
          <div className="intel-metric-top">
            <div className="intel-icon"><Droplets size={18} /></div>
          </div>
          <div className="intel-metric-label">Economia estimada</div>
          <div className="intel-metric-value">18%</div>
          <div className="intel-metric-foot"><ArrowUpRight size={12} /> Potencial de economia</div>
        </div>

        <div className="intel-card">
          <div className="intel-metric-top">
            <div className="intel-icon"><Target size={18} /></div>
          </div>
          <div className="intel-metric-label">Recomendações geradas</div>
          <div className="intel-metric-value">12</div>
          <div className="intel-metric-foot">Neste período</div>
        </div>

        <div className="intel-card">
          <div className="intel-metric-top">
            <div className="intel-icon"><Zap size={18} /></div>
          </div>
          <div className="intel-metric-label">Alertas importantes</div>
          <div className="intel-metric-value">02</div>
          <div className="intel-metric-foot" style={{color: "#e3bd6a"}}>Exigem atenção</div>
        </div>
      </section>

      <section className="intel-grid">
        <div className="intel-card">
          <div className="intel-section-head">
            <h3><BrainCircuit size={16} style={{verticalAlign: "middle", marginRight: 7}} />Análises e recomendações</h3>
            <span>03 análises</span>
          </div>

          <div className="intel-insight-list">
            {insights.map((item) => {
              const Icon = item.icon;

              return (
                <article className="intel-insight" key={item.title}>
                  <div className="intel-insight-top">
                    <div className={`intel-insight-icon ${item.type}`}>
                      <Icon size={18} />
                    </div>

                    <div className="intel-insight-main">
                      <strong>{item.title}</strong>
                      <small>{item.area}</small>
                    </div>

                    <span className={`intel-priority ${item.type}`}>
                      {item.priority}
                    </span>
                  </div>

                  <p>{item.description}</p>

                  <button className="intel-insight-action">
                    {item.action}
                    <ChevronRight size={13} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        <div className="intel-card">
          <div className="intel-section-head">
            <h3><CloudRain size={16} style={{verticalAlign: "middle", marginRight: 7}} />Previsão climática</h3>
            <span>Próximos dias</span>
          </div>

          <div className="intel-weather-list">
            <div className="intel-weather-row header">
              <span>Dia</span>
              <span>Chuva</span>
              <span>Temp.</span>
              <span>Umidade</span>
            </div>

            {predictions.map((day) => (
              <div className="intel-weather-row" key={day.day}>
                <span className="intel-weather-day">{day.day}</span>
                <span className="intel-weather-value rain">
                  <CloudRain size={12} /> {day.rain}
                </span>
                <span className="intel-weather-value">
                  <Thermometer size={12} /> {day.temp}
                </span>
                <span className="intel-weather-value">{day.humidity}</span>
              </div>
            ))}
          </div>

          <div className="intel-weather-note">
            <Lightbulb size={17} />
            <span>
              A previsão de chuva para sábado pode reduzir a necessidade
              de irrigação. Considere revisar os agendamentos.
            </span>
          </div>
        </div>
      </section>

      <section className="intel-bottom">
        <div className="intel-card">
          <div className="intel-section-head">
            <h3><Lightbulb size={16} style={{verticalAlign: "middle", marginRight: 7}} />Orientações para o produtor</h3>
            <span>Boas práticas</span>
          </div>

          <div className="intel-recommendation">
            <div className="intel-rec-icon"><Droplets size={16} /></div>
            <div>
              <strong>Priorize áreas com baixa umidade</strong>
              <p>Monitore primeiro os talhões com maior necessidade de água.</p>
            </div>
          </div>

          <div className="intel-recommendation">
            <div className="intel-rec-icon"><CloudRain size={16} /></div>
            <div>
              <strong>Considere as condições climáticas</strong>
              <p>Evite irrigação desnecessária quando houver previsão de chuva.</p>
            </div>
          </div>

          <div className="intel-recommendation">
            <div className="intel-rec-icon"><Leaf size={16} /></div>
            <div>
              <strong>Acompanhe cada cultura</strong>
              <p>As necessidades hídricas variam conforme o tipo e a fase da cultura.</p>
            </div>
          </div>
        </div>

        <div className="intel-card">
          <div className="intel-section-head">
            <h3><Target size={16} style={{verticalAlign: "middle", marginRight: 7}} />Índice de desempenho</h3>
            <span>Propriedade</span>
          </div>

          <div className="intel-score">
            <div className="intel-score-circle">
              <div className="intel-score-inner">
                <div>
                  <strong>86</strong>
                  <small>de 100</small>
                </div>
              </div>
            </div>

            <div className="intel-score-copy">
              <strong>Bom desempenho</strong>
              <p>
                A propriedade apresenta indicadores favoráveis de
                monitoramento e uso dos recursos hídricos.
              </p>
            </div>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#82c994",
            fontSize: 10,
          }}>
            <CheckCircle2 size={14} />
            Monitoramento em acompanhamento
          </div>

          <p className="intel-disclaimer">
            Os indicadores e recomendações apresentados são demonstrativos.
            Resultados reais dependem de sensores, dados climáticos e
            informações específicas de cada propriedade.
          </p>
        </div>
      </section>
    </div>
  );
}
