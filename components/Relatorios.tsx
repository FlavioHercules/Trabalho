
import {
  Download,
  FileText,
  Droplets,
  TrendingDown,
  Sprout,
  Activity,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Leaf,
  Clock3,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

const monthlyData = [
  { month: "Mai", value: 68 },
  { month: "Jun", value: 82 },
  { month: "Jul", value: 59 },
  { month: "Ago", value: 91 },
  { month: "Set", value: 74 },
  { month: "Out", value: 53 },
  { month: "Nov", value: 39 },
];

const fields = [
  { name: "Talhão A", crop: "Milho", water: "8.450 L", efficiency: 88, status: "Excelente" },
  { name: "Talhão B", crop: "Soja", water: "6.200 L", efficiency: 79, status: "Bom" },
  { name: "Talhão C", crop: "Feijão", water: "7.100 L", efficiency: 92, status: "Excelente" },
  { name: "Talhão D", crop: "Milho", water: "9.300 L", efficiency: 65, status: "Atenção" },
];

const history = [
  { date: "05 Nov 2026", title: "Relatório de consumo hídrico", detail: "Consumo e eficiência da irrigação", type: "Consumo" },
  { date: "01 Nov 2026", title: "Análise mensal da propriedade", detail: "Desempenho geral dos talhões", type: "Análise" },
  { date: "28 Out 2026", title: "Relatório de sensores", detail: "Monitoramento e condições do solo", type: "Sensores" },
];

export default function Relatorios() {
  return (
    <div className="reports-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .reports-page {
          font-family: 'DM Sans', sans-serif;
          color: #edf4ef;
          width: 100%;
        }

        .reports-page * { box-sizing: border-box; }

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 25px;
        }

        .reports-header h1 {
          font-size: 27px;
          margin: 0 0 7px;
          letter-spacing: -.8px;
        }

        .reports-header p {
          color: #8e9e94;
          font-size: 13px;
          margin: 0;
        }

        .reports-actions {
          display: flex;
          gap: 9px;
        }

        .reports-btn {
          border: 1px solid #3d7655;
          background: #326b49;
          color: #fff;
          border-radius: 9px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font: inherit;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .reports-btn.secondary {
          background: #202b27;
          border-color: #35443c;
          color: #c6d4ca;
        }

        .reports-btn:hover { filter: brightness(1.15); }

        .reports-filters {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 19px;
        }

        .reports-filter {
          background: #202a27;
          border: 1px solid #35443c;
          border-radius: 8px;
          color: #b7c5bb;
          padding: 9px 12px;
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 10px;
        }

        .reports-card {
          background: #202a27;
          border: 1px solid #303d37;
          border-radius: 13px;
          padding: 19px;
          min-width: 0;
        }

        .reports-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 19px;
        }

        .reports-metric-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .reports-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #2c4438;
          color: #83c995;
          display: grid;
          place-items: center;
        }

        .reports-muted { color: #829187; }

        .reports-label {
          color: #91a197;
          font-size: 11px;
          margin-bottom: 7px;
        }

        .reports-value {
          font-size: 25px;
          font-weight: 700;
          letter-spacing: -.8px;
        }

        .reports-foot {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: #7fc994;
          margin-top: 8px;
        }

        .reports-section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 18px;
        }

        .reports-section-title h2 {
          margin: 0;
          font-size: 15px;
        }

        .reports-section-title span {
          font-size: 10px;
          color: #87988d;
        }

        .reports-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(260px, 1fr);
          gap: 17px;
          margin-bottom: 18px;
        }

        .reports-chart {
          width: 100%;
          height: 195px;
          margin-top: 10px;
          overflow: visible;
        }

        .reports-chart-labels {
          display: flex;
          justify-content: space-between;
          color: #829187;
          font-size: 10px;
          margin-top: 5px;
        }

        .reports-chart-legend {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #91a197;
          font-size: 10px;
        }

        .reports-chart-legend span {
          width: 8px;
          height: 8px;
          background: #70bd88;
          border-radius: 50%;
        }

        .reports-comparison {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .reports-comparison-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .reports-comparison-item strong {
          display: block;
          font-size: 12px;
          margin-bottom: 4px;
        }

        .reports-comparison-item small {
          color: #89998f;
          font-size: 10px;
        }

        .reports-comparison-value {
          text-align: right;
          font-size: 13px;
          font-weight: 700;
        }

        .reports-comparison-value small {
          display: block;
          color: #7fc994;
          font-size: 9px;
          margin-top: 4px;
        }

        .reports-highlight {
          background: #243d30;
          border: 1px solid #395a43;
          border-radius: 10px;
          padding: 14px;
          margin-top: 20px;
        }

        .reports-highlight strong {
          display: block;
          color: #8dcea0;
          font-size: 12px;
          margin-bottom: 6px;
        }

        .reports-highlight p {
          color: #a9c2af;
          font-size: 10px;
          line-height: 1.6;
          margin: 0;
        }

        .reports-table-wrap { overflow-x: auto; }

        .reports-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 500px;
        }

        .reports-table th {
          text-align: left;
          color: #829187;
          font-size: 10px;
          font-weight: 500;
          padding: 12px 10px;
          border-bottom: 1px solid #344139;
        }

        .reports-table td {
          padding: 14px 10px;
          font-size: 11px;
          border-bottom: 1px solid #303d37;
          color: #c4d0c7;
        }

        .reports-table tr:last-child td { border: 0; }

        .reports-field {
          display: flex;
          align-items: center;
          gap: 9px;
          font-weight: 600;
        }

        .reports-field-icon {
          width: 30px;
          height: 30px;
          background: #2b4436;
          color: #83c995;
          border-radius: 8px;
          display: grid;
          place-items: center;
        }

        .reports-progress {
          width: 75px;
          height: 5px;
          background: #354139;
          border-radius: 8px;
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
          margin-right: 7px;
        }

        .reports-progress-fill {
          height: 100%;
          background: #70bd88;
          border-radius: 8px;
        }

        .reports-tag {
          display: inline-block;
          padding: 5px 8px;
          border-radius: 20px;
          font-size: 9px;
          background: #294333;
          color: #83c995;
        }

        .reports-tag.warning {
          background: #443a29;
          color: #e4bd75;
        }

        .reports-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 17px;
          margin-top: 18px;
        }

        .reports-history {
          display: flex;
          flex-direction: column;
        }

        .reports-history-item {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px 0;
          border-bottom: 1px solid #303d37;
        }

        .reports-history-item:last-child { border: 0; }

        .reports-file-icon {
          width: 34px;
          height: 34px;
          background: #2c4438;
          color: #82c994;
          border-radius: 9px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .reports-history-content { flex: 1; min-width: 0; }

        .reports-history-content strong {
          font-size: 11px;
          display: block;
          margin-bottom: 4px;
        }

        .reports-history-content small {
          font-size: 9px;
          color: #87988d;
        }

        .reports-history-date {
          color: #87988d;
          font-size: 9px;
          white-space: nowrap;
        }

        .reports-impact {
          display: flex;
          align-items: center;
          gap: 13px;
          margin: 15px 0;
        }

        .reports-impact-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          background: #2c4438;
          color: #83c995;
          border-radius: 11px;
        }

        .reports-impact strong {
          font-size: 23px;
          display: block;
        }

        .reports-impact small {
          color: #91a197;
          font-size: 10px;
        }

        .reports-impact-copy {
          color: #9cac9f;
          font-size: 10px;
          line-height: 1.6;
          margin-top: 12px;
        }

        @media (max-width: 1050px) {
          .reports-metrics { grid-template-columns: repeat(2, 1fr); }
          .reports-main-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 650px) {
          .reports-header h1 { font-size: 23px; }
          .reports-card { padding: 14px; }
          .reports-metrics { gap: 9px; }
          .reports-value { font-size: 21px; }
          .reports-bottom-grid { grid-template-columns: 1fr; }
          .reports-actions { width: 100%; }
          .reports-actions button { flex: 1; justify-content: center; }
        }
      `}</style>

      <header className="reports-header">
        <div>
          <h1>Relatórios e Resultados</h1>
          <p>Acompanhe o desempenho da propriedade e a utilização dos recursos.</p>
        </div>

        <div className="reports-actions">
          <button className="reports-btn secondary">
            <CalendarDays size={14} />
            Período
            <ChevronDown size={13} />
          </button>
          <button className="reports-btn">
            <Download size={14} />
            Exportar relatório
          </button>
        </div>
      </header>

      <div className="reports-filters">
        <div className="reports-filter">
          <CalendarDays size={14} />
          01 Nov — 05 Nov 2026
          <ChevronDown size={12} />
        </div>
        <div className="reports-filter">
          Todos os talhões
          <ChevronDown size={12} />
        </div>
        <div className="reports-filter">
          <CheckCircle2 size={13} color="#7fc994" />
          Dados demonstrativos
        </div>
      </div>

      <section className="reports-metrics">
        <div className="reports-card">
          <div className="reports-metric-top">
            <div className="reports-icon"><Droplets size={18} /></div>
          </div>
          <div className="reports-label">Consumo total de água</div>
          <div className="reports-value">31.050 L</div>
          <div className="reports-foot"><ArrowDownRight size={12} /> 12% em relação ao período anterior</div>
        </div>

        <div className="reports-card">
          <div className="reports-metric-top">
            <div className="reports-icon"><TrendingDown size={18} /></div>
          </div>
          <div className="reports-label">Economia estimada</div>
          <div className="reports-value">18%</div>
          <div className="reports-foot"><ArrowUpRight size={12} /> Potencial de otimização</div>
        </div>

        <div className="reports-card">
          <div className="reports-metric-top">
            <div className="reports-icon"><Sprout size={18} /></div>
          </div>
          <div className="reports-label">Talhões monitorados</div>
          <div className="reports-value">04</div>
          <div className="reports-foot">Toda a propriedade</div>
        </div>

        <div className="reports-card">
          <div className="reports-metric-top">
            <div className="reports-icon"><Activity size={18} /></div>
          </div>
          <div className="reports-label">Eficiência média</div>
          <div className="reports-value">81%</div>
          <div className="reports-foot"><ArrowUpRight size={12} /> Indicador demonstrativo</div>
        </div>
      </section>

      <section className="reports-main-grid">
        <div className="reports-card">
          <div className="reports-section-title">
            <h2><BarChart3 size={16} style={{verticalAlign: "middle", marginRight: 7}} />Histórico de consumo hídrico</h2>
            <div className="reports-chart-legend">
              <span /> Consumo de água
            </div>
          </div>

          <svg className="reports-chart" viewBox="0 0 500 190" preserveAspectRatio="none">
            {[25, 65, 105, 145].map((y) => (
              <line key={y} x1="0" y1={y} x2="500" y2={y}
                stroke="#354139" strokeWidth="1" strokeDasharray="4 5" />
            ))}

            <defs>
              <linearGradient id="reportsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#70bd88" stopOpacity=".3" />
                <stop offset="100%" stopColor="#70bd88" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 90 L83 60 L166 103 L250 35 L333 76 L416 112 L500 135 L500 180 L0 180 Z"
              fill="url(#reportsGradient)"
            />

            <path
              d="M0 90 L83 60 L166 103 L250 35 L333 76 L416 112 L500 135"
              fill="none"
              stroke="#70bd88"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {monthlyData.map((item, i) => (
              <circle
                key={item.month}
                cx={i * (500 / 6)}
                cy={160 - item.value * 1.35}
                r="3.5"
                fill="#70bd88"
                stroke="#202a27"
                strokeWidth="2"
              />
            ))}
          </svg>

          <div className="reports-chart-labels">
            {monthlyData.map((item) => <span key={item.month}>{item.month}</span>)}
          </div>
        </div>

        <div className="reports-card">
          <div className="reports-section-title">
            <h2>Comparativo do período</h2>
            <span>Indicadores</span>
          </div>

          <div className="reports-comparison">
            <div className="reports-comparison-item">
              <div>
                <strong>Consumo de água</strong>
                <small>Uso total no período</small>
              </div>
              <div className="reports-comparison-value">
                31.050 L
                <small><ArrowDownRight size={10} style={{verticalAlign: "middle"}} /> 12%</small>
              </div>
            </div>

            <div className="reports-comparison-item">
              <div>
                <strong>Tempo de irrigação</strong>
                <small>Duração acumulada</small>
              </div>
              <div className="reports-comparison-value">
                18h 40m
                <small>Período atual</small>
              </div>
            </div>

            <div className="reports-comparison-item">
              <div>
                <strong>Umidade média</strong>
                <small>Condição do solo</small>
              </div>
              <div className="reports-comparison-value">
                52%
                <small>Todos os talhões</small>
              </div>
            </div>
          </div>

          <div className="reports-highlight">
            <strong><Leaf size={14} style={{verticalAlign: "middle", marginRight: 6}} />Oportunidade de melhoria</strong>
            <p>
              O acompanhamento da umidade e a programação da irrigação
              podem ajudar a reduzir desperdícios e melhorar a gestão hídrica.
            </p>
          </div>
        </div>
      </section>

      <section className="reports-card">
        <div className="reports-section-title">
          <h2><Sprout size={16} style={{verticalAlign: "middle", marginRight: 7}} />Desempenho por talhão</h2>
          <span>Resumo da propriedade</span>
        </div>

        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Talhão</th>
                <th>Cultura</th>
                <th>Consumo</th>
                <th>Eficiência</th>
                <th>Classificação</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.name}>
                  <td>
                    <div className="reports-field">
                      <div className="reports-field-icon"><Sprout size={14} /></div>
                      {field.name}
                    </div>
                  </td>
                  <td>{field.crop}</td>
                  <td>{field.water}</td>
                  <td>
                    <span className="reports-progress">
                      <span className="reports-progress-fill" style={{display: "block", width: `${field.efficiency}%`}} />
                    </span>
                    {field.efficiency}%
                  </td>
                  <td>
                    <span className={`reports-tag ${field.status === "Atenção" ? "warning" : ""}`}>
                      {field.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="reports-bottom-grid">
        <div className="reports-card">
          <div className="reports-section-title">
            <h2><Clock3 size={16} style={{verticalAlign: "middle", marginRight: 7}} />Relatórios recentes</h2>
            <span>Histórico</span>
          </div>

          <div className="reports-history">
            {history.map((item) => (
              <div className="reports-history-item" key={item.title}>
                <div className="reports-file-icon"><FileText size={17} /></div>
                <div className="reports-history-content">
                  <strong>{item.title}</strong>
                  <small>{item.detail} • {item.type}</small>
                </div>
                <span className="reports-history-date">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reports-card">
          <div className="reports-section-title">
            <h2><Leaf size={16} style={{verticalAlign: "middle", marginRight: 7}} />Impacto da gestão inteligente</h2>
            <span>Estimativa</span>
          </div>

          <div className="reports-impact">
            <div className="reports-impact-icon"><Droplets size={22} /></div>
            <div>
              <strong>18%</strong>
              <small>Potencial de economia hídrica</small>
            </div>
          </div>

          <div className="reports-impact">
            <div className="reports-impact-icon"><Activity size={22} /></div>
            <div>
              <strong>24h</strong>
              <small>Monitoramento contínuo dos dados</small>
            </div>
          </div>

          <p className="reports-impact-copy">
            O IRRIGATEC reúne informações dos sensores e indicadores
            agrícolas para apoiar decisões mais conscientes sobre o uso
            da água e o manejo da propriedade.
          </p>
        </div>
      </section>
    </div>
  );
}
