
import {
  Droplets,
  Play,
  Pause,
  CalendarDays,
  Clock3,
  Gauge,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  MoreHorizontal,
  ArrowUpRight,
  Waves,
  Sprout,
  Power,
} from "lucide-react";

const areas = [
  {
    name: "Talhão A",
    crop: "Milho",
    status: "Irrigando",
    moisture: 42,
    duration: "00:32:15",
    water: "1.250 L",
    color: "#4caf79",
  },
  {
    name: "Talhão B",
    crop: "Soja",
    status: "Programado",
    moisture: 38,
    duration: "Agendado",
    water: "—",
    color: "#e6b85c",
  },
  {
    name: "Talhão C",
    crop: "Feijão",
    status: "Concluído",
    moisture: 67,
    duration: "00:45:00",
    water: "1.800 L",
    color: "#6ca8dc",
  },
  {
    name: "Talhão D",
    crop: "Milho",
    status: "Atenção",
    moisture: 24,
    duration: "Não iniciado",
    water: "—",
    color: "#e47768",
  },
];

const schedule = [
  { time: "06:00", name: "Talhão A", detail: "Milho • Setor 01", status: "Concluído" },
  { time: "08:30", name: "Talhão C", detail: "Feijão • Setor 03", status: "Concluído" },
  { time: "10:00", name: "Talhão B", detail: "Soja • Setor 02", status: "Em breve" },
  { time: "14:00", name: "Talhão D", detail: "Milho • Setor 04", status: "Pendente" },
];

export default function Irrigacao() {
  return (
    <div className="irrigation-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .irrigation-page {
          font-family: 'DM Sans', sans-serif;
          color: #edf4ef;
          width: 100%;
          min-height: 100%;
        }

        .irrigation-page * { box-sizing: border-box; }

        .irrigation-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .irrigation-top h1 {
          font-size: 27px;
          font-weight: 700;
          margin: 0 0 7px;
          letter-spacing: -0.8px;
        }

        .irrigation-top p {
          color: #8e9e94;
          margin: 0;
          font-size: 13px;
        }

        .irrigation-btn {
          border: 1px solid #3d7655;
          background: #326b49;
          color: #fff;
          border-radius: 9px;
          padding: 11px 16px;
          display: flex;
          align-items: center;
          gap: 9px;
          font: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .irrigation-btn:hover { background: #3e8059; }

        .irrigation-outline {
          background: #202b27;
          border: 1px solid #35443c;
          color: #c6d4ca;
        }

        .irrigation-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 22px;
        }

        .irrigation-card {
          background: #202a27;
          border: 1px solid #303d37;
          border-radius: 13px;
          padding: 19px;
          min-width: 0;
        }

        .irrigation-metric-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .irrigation-icon {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #2c4438;
          color: #73bd8c;
        }

        .irrigation-muted { color: #87988d; }

        .irrigation-metric-label {
          font-size: 12px;
          color: #91a197;
          margin-bottom: 7px;
        }

        .irrigation-metric-value {
          font-size: 25px;
          font-weight: 700;
          letter-spacing: -0.8px;
        }

        .irrigation-metric-foot {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #72c38b;
          font-size: 11px;
          margin-top: 9px;
        }

        .irrigation-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(280px, 1fr);
          gap: 17px;
          margin-bottom: 18px;
        }

        .irrigation-section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 18px;
        }

        .irrigation-section-head h2 {
          font-size: 15px;
          font-weight: 700;
          margin: 0;
        }

        .irrigation-section-head span {
          color: #87988d;
          font-size: 11px;
        }

        .irrigation-area-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .irrigation-area {
          background: #19221f;
          border: 1px solid #303d37;
          border-radius: 10px;
          padding: 14px;
        }

        .irrigation-area-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .irrigation-area-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .irrigation-area-symbol {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: #2b4035;
          border-radius: 9px;
          color: #80c694;
        }

        .irrigation-area-name strong {
          display: block;
          font-size: 12px;
          margin-bottom: 3px;
        }

        .irrigation-area-name small {
          color: #87988d;
          font-size: 10px;
        }

        .irrigation-status {
          font-size: 10px;
          padding: 6px 9px;
          border-radius: 20px;
          background: #293d31;
          color: #82ca96;
          white-space: nowrap;
        }

        .irrigation-status.yellow {
          background: #443b29;
          color: #e5c477;
        }

        .irrigation-status.blue {
          background: #293c4b;
          color: #8dbce3;
        }

        .irrigation-status.red {
          background: #482e2b;
          color: #e58b7d;
        }

        .irrigation-progress-info {
          display: flex;
          justify-content: space-between;
          color: #93a198;
          font-size: 10px;
          margin-bottom: 7px;
        }

        .irrigation-progress {
          width: 100%;
          height: 6px;
          background: #303b35;
          border-radius: 10px;
          overflow: hidden;
        }

        .irrigation-progress-fill {
          height: 100%;
          border-radius: 10px;
        }

        .irrigation-area-bottom {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 12px;
          color: #8e9e94;
          font-size: 10px;
        }

        .irrigation-area-bottom strong {
          color: #dce8df;
          font-weight: 600;
        }

        .irrigation-schedule {
          display: flex;
          flex-direction: column;
        }

        .irrigation-schedule-item {
          display: grid;
          grid-template-columns: 48px 14px 1fr;
          gap: 10px;
          min-height: 68px;
        }

        .irrigation-time {
          font-size: 11px;
          color: #b3c1b7;
          padding-top: 2px;
        }

        .irrigation-timeline {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .irrigation-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #66b880;
          border: 2px solid #294333;
          flex-shrink: 0;
        }

        .irrigation-line {
          width: 1px;
          flex: 1;
          background: #3a4940;
        }

        .irrigation-schedule-content strong {
          font-size: 11px;
          display: block;
          margin-bottom: 4px;
        }

        .irrigation-schedule-content small {
          font-size: 10px;
          color: #84958a;
        }

        .irrigation-schedule-tag {
          display: inline-block;
          margin-top: 5px;
          font-size: 9px;
          color: #82c994;
        }

        .irrigation-bottom-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 17px;
        }

        .irrigation-chart {
          width: 100%;
          height: 150px;
          margin-top: 8px;
        }

        .irrigation-chart-labels {
          display: flex;
          justify-content: space-between;
          color: #829187;
          font-size: 10px;
          margin-top: 5px;
        }

        .irrigation-efficiency {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-top: 8px;
        }

        .irrigation-donut {
          width: 116px;
          height: 116px;
          border-radius: 50%;
          background: conic-gradient(#6fbd88 0% 78%, #34443b 78% 100%);
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .irrigation-donut-inner {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #202a27;
          display: grid;
          place-items: center;
          text-align: center;
        }

        .irrigation-donut-inner strong {
          font-size: 23px;
          display: block;
        }

        .irrigation-donut-inner small {
          font-size: 9px;
          color: #91a197;
        }

        .irrigation-legend {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 11px;
          color: #a6b4aa;
        }

        .irrigation-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .irrigation-legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6fbd88;
        }

        .irrigation-alert {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #3a3024;
          border: 1px solid #665035;
          padding: 13px;
          border-radius: 10px;
          margin-top: 17px;
        }

        .irrigation-alert strong {
          font-size: 11px;
          display: block;
          margin-bottom: 4px;
          color: #e7c17d;
        }

        .irrigation-alert p {
          font-size: 10px;
          line-height: 1.5;
          color: #b7a68a;
          margin: 0;
        }

        @media (max-width: 1050px) {
          .irrigation-metrics { grid-template-columns: repeat(2, 1fr); }
          .irrigation-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 650px) {
          .irrigation-top h1 { font-size: 23px; }
          .irrigation-metrics { gap: 9px; }
          .irrigation-card { padding: 14px; }
          .irrigation-metric-value { font-size: 21px; }
          .irrigation-bottom-grid { grid-template-columns: 1fr; }
          .irrigation-efficiency { flex-wrap: wrap; }
        }
      `}</style>

      <header className="irrigation-top">
        <div>
          <h1>Gestão de Irrigação</h1>
          <p>Controle inteligente do uso da água e programação dos sistemas.</p>
        </div>

        <button className="irrigation-btn">
          <Play size={15} />
          Nova programação
        </button>
      </header>

      <section className="irrigation-metrics">
        <div className="irrigation-card">
          <div className="irrigation-metric-head">
            <div className="irrigation-icon"><Droplets size={19} /></div>
            <span className="irrigation-muted"><MoreHorizontal size={19} /></span>
          </div>
          <div className="irrigation-metric-label">Água utilizada hoje</div>
          <div className="irrigation-metric-value">3.050 L</div>
          <div className="irrigation-metric-foot">
            <TrendingDown size={13} /> 12% menos que ontem
          </div>
        </div>

        <div className="irrigation-card">
          <div className="irrigation-metric-head">
            <div className="irrigation-icon"><Sprout size={19} /></div>
            <span className="irrigation-muted"><MoreHorizontal size={19} /></span>
          </div>
          <div className="irrigation-metric-label">Áreas irrigadas</div>
          <div className="irrigation-metric-value">02 <span style={{fontSize: 13, color: "#829187"}}>/ 04</span></div>
          <div className="irrigation-metric-foot">50% da área total</div>
        </div>

        <div className="irrigation-card">
          <div className="irrigation-metric-head">
            <div className="irrigation-icon"><Gauge size={19} /></div>
            <span className="irrigation-muted"><MoreHorizontal size={19} /></span>
          </div>
          <div className="irrigation-metric-label">Eficiência hídrica</div>
          <div className="irrigation-metric-value">78%</div>
          <div className="irrigation-metric-foot">
            <ArrowUpRight size={13} /> 5% neste mês
          </div>
        </div>

        <div className="irrigation-card">
          <div className="irrigation-metric-head">
            <div className="irrigation-icon"><Clock3 size={19} /></div>
            <span className="irrigation-muted"><MoreHorizontal size={19} /></span>
          </div>
          <div className="irrigation-metric-label">Tempo de irrigação</div>
          <div className="irrigation-metric-value">01h 17m</div>
          <div className="irrigation-metric-foot">Hoje • Tempo acumulado</div>
        </div>
      </section>

      <section className="irrigation-grid">
        <div className="irrigation-card">
          <div className="irrigation-section-head">
            <h2>Status dos sistemas</h2>
            <span>Atualizado agora</span>
          </div>

          <div className="irrigation-area-list">
            {areas.map((area) => (
              <div className="irrigation-area" key={area.name}>
                <div className="irrigation-area-top">
                  <div className="irrigation-area-name">
                    <div className="irrigation-area-symbol">
                      <Waves size={17} />
                    </div>
                    <div>
                      <strong>{area.name}</strong>
                      <small>{area.crop}</small>
                    </div>
                  </div>

                  <span className={`irrigation-status ${
                    area.status === "Programado" ? "yellow" :
                    area.status === "Concluído" ? "blue" :
                    area.status === "Atenção" ? "red" : ""
                  }`}>
                    {area.status}
                  </span>
                </div>

                <div className="irrigation-progress-info">
                  <span>Umidade do solo</span>
                  <strong>{area.moisture}%</strong>
                </div>

                <div className="irrigation-progress">
                  <div
                    className="irrigation-progress-fill"
                    style={{
                      width: `${area.moisture}%`,
                      background: area.color,
                    }}
                  />
                </div>

                <div className="irrigation-area-bottom">
                  <span>Duração: <strong>{area.duration}</strong></span>
                  <span>Consumo: <strong>{area.water}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="irrigation-card">
          <div className="irrigation-section-head">
            <h2><CalendarDays size={16} style={{verticalAlign: "middle", marginRight: 7}} />Programação de hoje</h2>
            <span>05 Nov</span>
          </div>

          <div className="irrigation-schedule">
            {schedule.map((item, index) => (
              <div className="irrigation-schedule-item" key={item.time}>
                <div className="irrigation-time">{item.time}</div>
                <div className="irrigation-timeline">
                  <div className="irrigation-dot" style={{
                    background: item.status === "Pendente" ? "#d58b5f" :
                      item.status === "Em breve" ? "#e3bd6a" : "#69b982"
                  }} />
                  {index !== schedule.length - 1 && <div className="irrigation-line" />}
                </div>
                <div className="irrigation-schedule-content">
                  <strong>{item.name}</strong>
                  <small>{item.detail}</small>
                  <div className="irrigation-schedule-tag">{item.status}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="irrigation-btn irrigation-outline" style={{width: "100%", justifyContent: "center", marginTop: 12}}>
            <CalendarDays size={14} />
            Ver calendário completo
          </button>
        </div>
      </section>

      <section className="irrigation-bottom-grid">
        <div className="irrigation-card">
          <div className="irrigation-section-head">
            <h2>Consumo de água</h2>
            <span>Últimos 7 dias</span>
          </div>

          <svg className="irrigation-chart" viewBox="0 0 500 150" preserveAspectRatio="none">
            {[25, 60, 95, 130].map((y) => (
              <line key={y} x1="0" y1={y} x2="500" y2={y}
                stroke="#344139" strokeWidth="1" strokeDasharray="4 5" />
            ))}

            <defs>
              <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#69b982" stopOpacity=".32" />
                <stop offset="100%" stopColor="#69b982" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 85 C25 75 45 48 75 55 S120 90 150 75 S190 35 225 48 S270 85 300 66 S350 30 375 42 S425 75 450 53 S480 35 500 42 L500 150 L0 150 Z"
              fill="url(#waterGradient)"
            />

            <path
              d="M0 85 C25 75 45 48 75 55 S120 90 150 75 S190 35 225 48 S270 85 300 66 S350 30 375 42 S425 75 450 53 S480 35 500 42"
              fill="none"
              stroke="#70bd88"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <circle cx="375" cy="42" r="4" fill="#70bd88" stroke="#202a27" strokeWidth="2" />
          </svg>

          <div className="irrigation-chart-labels">
            <span>30 Out</span>
            <span>31 Out</span>
            <span>01 Nov</span>
            <span>02 Nov</span>
            <span>03 Nov</span>
            <span>04 Nov</span>
            <span>05 Nov</span>
          </div>
        </div>

        <div className="irrigation-card">
          <div className="irrigation-section-head">
            <h2>Eficiência do uso da água</h2>
            <span>Este mês</span>
          </div>

          <div className="irrigation-efficiency">
            <div className="irrigation-donut">
              <div className="irrigation-donut-inner">
                <div>
                  <strong>78%</strong>
                  <small>Eficiência</small>
                </div>
              </div>
            </div>

            <div className="irrigation-legend">
              <div className="irrigation-legend-item">
                <div className="irrigation-legend-dot" />
                Uso eficiente
              </div>
              <div className="irrigation-legend-item">
                <div className="irrigation-legend-dot" style={{background: "#34443b"}} />
                Oportunidade de melhoria
              </div>
              <strong style={{fontSize: 19, color: "#72c38b"}}>+5,2%</strong>
              <span style={{fontSize: 10}}>em relação ao mês anterior</span>
            </div>
          </div>

          <div className="irrigation-alert">
            <AlertTriangle size={19} color="#e5b86e" />
            <div>
              <strong>Atenção: Talhão D</strong>
              <p>Umidade abaixo do nível recomendado. Verifique a necessidade de irrigação.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
