
import React from "react";
import {
  Activity,
  Bell,
  Headphones,
  LayoutDashboard,
  LogIn,
  Sprout,
  Droplets,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type DashboardPage =
  | "Dashboard"
  | "Talhões"
  | "Sensores"
  | "Irrigação"
  | "Consultoria"
  | "Relatórios"
  | "Notificações"
  | "Configurações";

type DashboardProps = {
  activePage: DashboardPage;
  onNavigate: (page: DashboardPage) => void;
  onOpenLogin: () => void;
  content: React.ReactNode;
};

const fields = [
  { name: "Talhão A", value: 68, status: "Ótimo", color: "green" },
  { name: "Talhão B", value: 55, status: "Alerta", color: "orange" },
  { name: "Talhão C", value: 72, status: "Bom", color: "green" },
];

const weather = [
  { day: "Hoje", icon: "☁", max: "24°", min: "19°" },
  { day: "Ter", icon: "☁", max: "24°", min: "18°" },
  { day: "Qua", icon: "☀", max: "24°", min: "19°" },
  { day: "Qui", icon: "🌤", max: "24°", min: "12°" },
  { day: "Sex", icon: "☁", max: "24°", min: "12°" },
];

const rain = [
  { day: "Seg", value: 15, label: "15mm" },
  { day: "Ter", value: 5, label: "5mm" },
  { day: "Qua", value: 0, label: "0mm" },
  { day: "Qui", value: 18, label: "18mm" },
  { day: "Sex", value: 2, label: "2mm" },
  { day: "Sáb", value: 0, label: "" },
  { day: "Dom", value: 0, label: "" },
];

const menu: { icon: LucideIcon; name: DashboardPage }[] = [
  { icon: LayoutDashboard, name: "Dashboard" },
  { icon: Sprout, name: "Talhões" },
  { icon: Activity, name: "Sensores" },
  { icon: Droplets, name: "Irrigação" },
  { icon: Headphones, name: "Consultoria" },
  { icon: BarChart3, name: "Relatórios" },
  { icon: Bell, name: "Notificações" },
  { icon: Settings, name: "Configurações" },
];

const pageTitles: Record<DashboardPage, string> = {
  Dashboard: "Painel principal",
  "Talhões": "Talhões",
  Sensores: "Sensores",
  "Irrigação": "Irrigação",
  Consultoria: "Consultoria",
  Relatórios: "Relatórios",
  Notificações: "Notificações",
  Configurações: "Configurações",
};

export default function Dashboard({
  activePage,
  onNavigate,
  onOpenLogin,
  content,
}: DashboardProps) {
  return (
    <div className="irrigatec">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        .irrigatec {
          min-height: 100vh;
          background: #101715;
          color: #e7eee9;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          font-size: 13px;
        }

        .sidebar {
          width: 245px;
          min-width: 245px;
          background: #102d21;
          border-right: 1px solid #263b30;
          padding: 25px 16px;
          display: flex;
          flex-direction: column;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 5px 34px;
          color: #f2f6f1;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -.6px;
        }

        .brand-icon {
          color: #75ad83;
          font-size: 29px;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .menu-item {
          width: 100%;
          border: 0;
          background: transparent;
          font-family: inherit;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 12px 13px;
          color: #a5b6aa;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: .2s;
        }

        .menu-item:hover, .menu-item.active {
          color: white;
          background: #314b3b;
        }

        .menu-icon {
          width: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-login {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding: 12px 13px;
          border: 1px solid #31483a;
          border-radius: 7px;
          background: transparent;
          color: #b6c7ba;
          font: inherit;
          cursor: pointer;
        }

        .sidebar-login:hover {
          background: #243d2d;
          color: #fff;
        }

        .main {
          flex: 1;
          min-width: 0;
        }

        .topbar {
          height: 68px;
          border-bottom: 1px solid #28342e;
          background: #17251f;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
        }

        .topbar-title {
          font-size: 18px;
          font-weight: 700;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 22px;
          color: #bdc9c0;
        }

        .notification {
          position: relative;
          display: grid;
          place-items: center;
          padding: 5px;
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }

        .notification::after {
          content: '';
          position: absolute;
          right: -2px;
          top: 0;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e56c57;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .profile-button {
          border: 0;
          padding: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          cursor: pointer;
        }

        .avatar {
          width: 31px;
          height: 31px;
          border-radius: 50%;
          background: #75b78a;
          color: #163526;
          display: grid;
          place-items: center;
          font-weight: 800;
        }

        .content {
          padding: 23px 30px 35px;
          max-width: 1700px;
          margin: auto;
        }

        .prototype-notice {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 30px;
          border-bottom: 1px solid #604f2d;
          background: #30291c;
          color: #e6d5aa;
          font-size: 11px;
          line-height: 1.5;
        }

        .prototype-notice strong {
          color: #f0c66f;
          white-space: nowrap;
        }

        .content.page-content {
          padding-top: 21px;
        }

        .page-content > .talhoes-page,
        .page-content > .sensors-page {
          min-height: auto;
          padding: 0;
          background: transparent;
        }

        .welcome {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 15px;
        }

        .welcome h1 {
          font-size: 21px;
          margin: 0 0 5px;
          font-weight: 700;
          letter-spacing: -.5px;
        }

        .subtitle {
          color: #87968c;
          font-size: 11px;
        }

        .date-select {
          background: #1b2923;
          border: 1px solid #34453b;
          padding: 9px 13px;
          border-radius: 7px;
          color: #c8d2cb;
          font-family: inherit;
          font-size: 12px;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .card {
          background: #202a28;
          border: 1px solid #303c38;
          border-radius: 12px;
          padding: 16px;
          min-width: 0;
          overflow: hidden;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 17px;
        }

        .card-title {
          font-size: 13px;
          font-weight: 700;
          color: #e5ebe7;
        }

        .arrow {
          color: #84968a;
          font-size: 19px;
        }

        .field {
          margin-bottom: 15px;
        }

        .field:last-child {
          margin-bottom: 0;
        }

        .field-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 7px;
          font-size: 12px;
        }

        .field-name {
          font-weight: 600;
          color: #e1e9e3;
        }

        .field-value {
          color: #d0dcd3;
        }

        .field-value strong {
          font-weight: 700;
        }

        .status-good { color: #78c38e; }
        .status-alert { color: #e9a34f; }

        .progress {
          width: 100%;
          height: 10px;
          background: #131d19;
          border-radius: 20px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 20px;
        }

        .green { background: linear-gradient(90deg, #397d5c, #62bd8b); }
        .orange { background: linear-gradient(90deg, #bd7a31, #f3ad4b); }

        .weather-current {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 17px;
        }

        .weather-icon {
          font-size: 35px;
        }

        .temperature {
          font-size: 25px;
          font-weight: 700;
          line-height: 1.1;
        }

        .weather-description {
          font-size: 11px;
          color: #9eada4;
          margin-top: 3px;
        }

        .weather-tag {
          margin-left: auto;
          background: #304d3b;
          color: #8dcc9d;
          padding: 6px 9px;
          border-radius: 5px;
          font-size: 10px;
        }

        .forecast {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          text-align: center;
          gap: 5px;
        }

        .forecast-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          color: #9daaa1;
          font-size: 10px;
        }

        .forecast-icon {
          font-size: 19px;
          height: 23px;
        }

        .forecast-temp {
          color: #e0e8e2;
          font-weight: 600;
          line-height: 1.6;
        }

        .rain-chart {
          height: 130px;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          border-bottom: 1px solid #39443f;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 31px,
            #34403a 32px
          );
          padding: 0 5px;
        }

        .rain-item {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          flex: 1;
          position: relative;
          gap: 5px;
        }

        .rain-bar {
          width: 58%;
          max-width: 23px;
          min-height: 2px;
          background: linear-gradient(180deg, #6cce91, #367d5a);
          border-radius: 4px 4px 0 0;
        }

        .rain-label {
          position: absolute;
          bottom: calc(100% - 4px);
          font-size: 9px;
          color: #c5d4c9;
          white-space: nowrap;
        }

        .rain-day {
          font-size: 10px;
          color: #87968d;
          margin-top: 7px;
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: 1.85fr 1fr;
          gap: 12px;
          margin-top: 12px;
        }

        .history-card {
          min-height: 320px;
        }

        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 12px 0 5px;
          font-size: 10px;
          color: #aab6ae;
        }

        .legend-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          margin-right: 5px;
        }

        .history-chart {
          width: 100%;
          height: 230px;
          overflow: visible;
        }

        .chart-label {
          fill: #9ba9a0;
          font-size: 10px;
        }

        .side-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .recommendation {
          background: #28332f;
          border: 1px solid #3b4941;
          padding: 12px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 9px;
        }

        .recommendation.active {
          border-color: #638e69;
          background: #293b31;
          box-shadow: inset 0 0 0 1px #395944;
        }

        .rec-icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: grid;
          place-items: center;
          background: #34483a;
          font-size: 15px;
        }

        .rec-content {
          flex: 1;
          min-width: 0;
        }

        .rec-title {
          font-size: 11px;
          font-weight: 600;
          color: #e2e9e4;
          margin-bottom: 4px;
        }

        .rec-subtitle {
          color: #9caaa0;
          font-size: 10px;
        }

        .rec-alert {
          font-size: 16px;
          white-space: nowrap;
        }

        .map-card {
          min-height: 170px;
        }

        .field-map {
          height: 105px;
          position: relative;
          background: #142e20;
          border-radius: 7px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding-top: 12px;
        }

        .map-bg {
          position: absolute;
          inset: 0;
          opacity: .4;
          background: repeating-linear-gradient(
            135deg,
            #264b30 0px,
            #264b30 8px,
            #1b3b27 8px,
            #1b3b27 16px
          );
        }

        .plot {
          z-index: 1;
          height: 85px;
          width: 21%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #14251a;
          font-weight: 800;
          font-size: 11px;
          border: 2px solid #244c34;
          transform: skew(-9deg) rotate(7deg);
          border-radius: 3px;
        }

        .plot-a { background: #43bd83; }
        .plot-b { background: #c2d84b; }
        .plot-c { background: #eea13c; }

        .map-legend {
          position: absolute;
          top: 8px;
          left: 8px;
          z-index: 2;
          background: #17251e;
          padding: 5px 7px;
          border-radius: 5px;
          font-size: 9px;
          color: #d5e0d8;
          line-height: 1.6;
        }

        .legend-square {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-right: 4px;
          border-radius: 2px;
        }

        @media (max-width: 1050px) {
          .sidebar {
            width: 190px;
            min-width: 190px;
          }
          .dashboard-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .irrigatec { display: block; }
          .sidebar {
            width: 100%;
            min-width: 0;
            padding: 12px;
          }
          .brand { padding: 0 5px 12px; }
          .menu {
            flex-direction: row;
            overflow-x: auto;
            gap: 5px;
          }
          .menu-item {
            padding: 9px;
            white-space: nowrap;
            width: auto;
          }
          .sidebar-login { margin-top: 10px; }
          .topbar { padding: 0 15px; }
          .prototype-notice { padding: 9px 15px; align-items: flex-start; }
          .prototype-notice strong { white-space: normal; }
          .content { padding: 18px 13px; }
          .dashboard-grid { grid-template-columns: 1fr; }
          .welcome { align-items: flex-start; flex-direction: column; }
          .top-actions { gap: 10px; }
        }
      `}</style>

      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">♧</span>
          IRRIGATEC
        </div>

        <nav className="menu">
          {menu.map((item) => (
            <button
              type="button"
              key={item.name}
              className={`menu-item ${item.name === activePage ? "active" : ""}`}
              aria-current={item.name === activePage ? "page" : undefined}
              onClick={() => onNavigate(item.name)}
            >
              <span className="menu-icon"><item.icon size={17} /></span>
              {item.name}
            </button>
          ))}
        </nav>
        <button type="button" className="sidebar-login" onClick={onOpenLogin}>
          <LogIn size={17} />
          Acesso demonstrativo
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-title">{pageTitles[activePage]}</div>

          <div className="top-actions">
            <button
              type="button"
              className="notification"
              aria-label="Abrir notificações"
              onClick={() => onNavigate("Notificações")}
            >
              <Bell size={18} />
            </button>
            <button
              type="button"
              className="profile profile-button"
              onClick={onOpenLogin}
              aria-label="Acessar tela de login demonstrativa"
            >
              <span className="avatar">JG</span>
              <span>João Gomes</span>
              <span aria-hidden="true">⌄</span>
            </button>
          </div>
        </header>

        <div className="prototype-notice" role="note">
          <strong>Protótipo · dados demonstrativos</strong>
          <span>
            Sensores reais, integração climática e recomendações de IA ainda
            precisam ser conectados e validados.
          </span>
        </div>

        <div className={`content ${content ? "page-content" : ""}`}>
          {content ?? (
            <>
          <section className="welcome">
            <div>
              <h1>Bem-vindo, Fazenda Monte Alegre</h1>
              <div className="subtitle">
                Quinta-feira, 05 de Novembro de 2026 &nbsp; • &nbsp;
                Fazenda Monte Alegre
              </div>
            </div>

            <button className="date-select">▣ &nbsp; Novembro &nbsp;⌄</button>
          </section>

          <section className="dashboard-grid">

            {/* UMIDADE DO SOLO */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Umidade do Solo Atual</span>
                <span className="arrow">›</span>
              </div>

              {fields.map((field) => (
                <div className="field" key={field.name}>
                  <div className="field-info">
                    <span className="field-name">{field.name}</span>
                    <span className="field-value">
                      <strong>{field.value}%</strong>{" "}
                      <span className={
                        field.color === "orange"
                          ? "status-alert"
                          : "status-good"
                      }>
                        ({field.status})
                      </span>
                    </span>
                  </div>

                  <div className="progress">
                    <div
                      className={`progress-fill ${field.color}`}
                      style={{ width: `${field.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* TEMPERATURA */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Temperatura & Condições</span>
                <span className="arrow">›</span>
              </div>

              <div className="weather-current">
                <span className="weather-icon">☁️</span>
                <div>
                  <div className="temperature">24°C</div>
                  <div className="weather-description">Nublado</div>
                </div>
                <span className="weather-tag">Nublado</span>
              </div>

              <div className="forecast">
                {weather.map((item) => (
                  <div className="forecast-item" key={item.day}>
                    <span>{item.day}</span>
                    <span className="forecast-icon">{item.icon}</span>
                    <span className="forecast-temp">
                      {item.max}<br />{item.min}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PREVISÃO DE CHUVA */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">
                  Previsão de Chuva (Próx. 7 Dias)
                </span>
                <span className="arrow">›</span>
              </div>

              <div className="rain-chart">
                {rain.map((item) => (
                  <div className="rain-item" key={item.day}>
                    {item.label && (
                      <span
                        className="rain-label"
                        style={{
                          bottom: `calc(${(item.value / 20) * 100}% + 7px)`,
                        }}
                      >
                        {item.label}
                      </span>
                    )}
                    <div
                      className="rain-bar"
                      style={{ height: `${(item.value / 20) * 100}%` }}
                    />
                    <span className="rain-day">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bottom-grid">

            {/* HISTÓRICO DE UMIDADE */}
            <div className="card history-card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    Histórico de Umidade do Solo
                  </div>
                  <div className="subtitle">Últimos 7 dias</div>
                </div>
                <button className="date-select">65% - 76% ⌄</button>
              </div>

              <div className="chart-legend">
                <span>
                  <i className="legend-dot" style={{ background: "#70c394" }} />
                  Campo A
                </span>
                <span>
                  <i className="legend-dot" style={{ background: "#d4b36d" }} />
                  Campo B
                </span>
              </div>

              <svg
                className="history-chart"
                viewBox="0 0 600 250"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#68bd8d" stopOpacity=".36" />
                    <stop offset="100%" stopColor="#68bd8d" stopOpacity=".02" />
                  </linearGradient>
                  <linearGradient id="yellowArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d7b56e" stopOpacity=".25" />
                    <stop offset="100%" stopColor="#d7b56e" stopOpacity=".01" />
                  </linearGradient>
                </defs>

                {[35, 80, 125, 170, 215].map((y, i) => (
                  <g key={y}>
                    <line
                      x1="45" y1={y} x2="590" y2={y}
                      stroke="#35423b"
                      strokeWidth="1"
                      strokeDasharray="3 4"
                    />
                    <text x="3" y={y + 4} className="chart-label">
                      {[85, 75, 50, 25, 0][i]}%
                    </text>
                  </g>
                ))}

                <path
                  d="M45 175 C80 160 90 65 145 82 S205 175 255 145 S330 115 370 93 S430 72 470 83 S530 65 590 96 L590 215 L45 215 Z"
                  fill="url(#greenArea)"
                />
                <path
                  d="M45 175 C80 160 90 65 145 82 S205 175 255 145 S330 115 370 93 S430 72 470 83 S530 65 590 96"
                  fill="none"
                  stroke="#70bd90"
                  strokeWidth="3"
                />

                <path
                  d="M45 192 C85 165 105 140 145 151 S205 185 255 163 S325 132 370 121 S430 104 470 119 S540 130 590 85 L590 215 L45 215 Z"
                  fill="url(#yellowArea)"
                />
                <path
                  d="M45 192 C85 165 105 140 145 151 S205 185 255 163 S325 132 370 121 S430 104 470 119 S540 130 590 85"
                  fill="none"
                  stroke="#d4b36d"
                  strokeWidth="3"
                />

                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(
                  (day, i) => (
                    <text
                      key={day}
                      x={45 + i * 90}
                      y="240"
                      className="chart-label"
                      textAnchor="middle"
                    >
                      {day}
                    </text>
                  )
                )}
              </svg>
            </div>

            <div className="side-stack">

              {/* RECOMENDAÇÕES */}
              <div className="card">
                <div className="card-header">
                  <span className="card-title">
                    Recomendações de Irrigação
                  </span>
                  <span className="arrow">›</span>
                </div>

                <div className="recommendation active">
                  <div className="rec-icon">♧</div>
                  <div className="rec-content">
                    <div className="rec-title">
                      Campo A: Ligar (Próx. 3h)
                    </div>
                    <div className="rec-subtitle">
                      2,6 mm/hora · Duração: 00:30
                    </div>
                  </div>
                  <span className="rec-alert">⚠️</span>
                </div>

                <div className="recommendation">
                  <div className="rec-icon">▣</div>
                  <div className="rec-content">
                    <div className="rec-title">
                      Campo B: Agendar (Amanhã 06:00)
                    </div>
                    <div className="rec-subtitle">
                      1,5 mm/hora · Programado
                    </div>
                  </div>
                </div>
              </div>

              {/* MAPA DOS TALHÕES */}
              <div className="card map-card">
                <div className="card-header">
                  <span className="card-title">Mapa de Talhões</span>
                  <span className="arrow">›</span>
                </div>

                <div className="field-map">
                  <div className="map-bg" />

                  <div className="map-legend">
                    <strong>Umidade</strong><br />
                    <span>
                      <i className="legend-square" style={{ background: "#43bd83" }} />
                      72%
                    </span><br />
                    <span>
                      <i className="legend-square" style={{ background: "#eea13c" }} />
                      55%
                    </span>
                  </div>

                  <div className="plot plot-a">72%</div>
                  <div className="plot plot-b">68%</div>
                  <div className="plot plot-c">55%</div>
                </div>
              </div>

            </div>
          </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
