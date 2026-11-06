
import React from "react";

const sensors = [
  {
    id: "SEN-001",
    name: "Sensor de Umidade A1",
    field: "Talhão A",
    type: "Umidade do Solo",
    value: "72%",
    battery: 96,
    signal: "Excelente",
    status: "Online",
    color: "green",
    update: "Há 2 minutos",
  },
  {
    id: "SEN-002",
    name: "Sensor de Umidade B1",
    field: "Talhão B",
    type: "Umidade do Solo",
    value: "42%",
    battery: 78,
    signal: "Boa",
    status: "Alerta",
    color: "orange",
    update: "Há 3 minutos",
  },
  {
    id: "SEN-003",
    name: "Sensor de Temperatura C1",
    field: "Talhão C",
    type: "Temperatura",
    value: "23°C",
    battery: 88,
    signal: "Excelente",
    status: "Online",
    color: "green",
    update: "Há 1 minuto",
  },
  {
    id: "SEN-004",
    name: "Sensor de Umidade D1",
    field: "Talhão D",
    type: "Umidade do Solo",
    value: "29%",
    battery: 12,
    signal: "Fraca",
    status: "Crítico",
    color: "red",
    update: "Há 15 minutos",
  },
  {
    id: "SEN-005",
    name: "Sensor Climático Geral",
    field: "Área Central",
    type: "Climático",
    value: "24°C",
    battery: 91,
    signal: "Excelente",
    status: "Online",
    color: "green",
    update: "Há 1 minuto",
  },
];

const history = [
  { time: "06h", humidity: 55, temp: 22 },
  { time: "08h", humidity: 58, temp: 23 },
  { time: "10h", humidity: 62, temp: 25 },
  { time: "12h", humidity: 49, temp: 28 },
  { time: "14h", humidity: 45, temp: 29 },
  { time: "16h", humidity: 52, temp: 27 },
  { time: "18h", humidity: 57, temp: 24 },
  { time: "20h", humidity: 61, temp: 23 },
];

export default function Sensores() {
  return (
    <div className="sensors-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .sensors-page {
          min-height: 100vh;
          padding: 28px 30px;
          background: #101715;
          color: #e7eee9;
          font-family: 'DM Sans', sans-serif;
        }

        .sensors-page * { box-sizing: border-box; }

        .sensor-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .sensor-heading h1 {
          font-size: 23px;
          margin: 0 0 6px;
          letter-spacing: -.5px;
        }

        .sensor-heading p {
          font-size: 12px;
          color: #899990;
          margin: 0;
        }

        .sensor-button {
          background: #397c57;
          color: white;
          border: none;
          padding: 12px 17px;
          border-radius: 7px;
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        .sensor-button:hover { background: #478f65; }

        .sensor-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }

        .sensor-stat {
          background: #202a28;
          border: 1px solid #303c38;
          border-radius: 11px;
          padding: 18px;
        }

        .sensor-stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #9aa99f;
          font-size: 12px;
          margin-bottom: 12px;
        }

        .sensor-stat-icon {
          font-size: 19px;
          color: #79b58a;
        }

        .sensor-stat-value {
          font-size: 27px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .sensor-stat-desc {
          color: #87968d;
          font-size: 10px;
        }

        .sensor-green { color: #75c591; }
        .sensor-orange { color: #e9ad5b; }
        .sensor-red { color: #e47c70; }

        .sensor-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 15px;
          margin-bottom: 18px;
        }

        .sensor-panel {
          background: #202a28;
          border: 1px solid #303c38;
          border-radius: 11px;
          padding: 19px;
          min-width: 0;
        }

        .sensor-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 19px;
          gap: 10px;
        }

        .sensor-panel-header h2 {
          font-size: 14px;
          margin: 0;
        }

        .sensor-muted {
          color: #87968d;
          font-size: 10px;
        }

        .sensor-select {
          background: #18231e;
          border: 1px solid #35453b;
          color: #cbd6ce;
          padding: 8px 10px;
          border-radius: 6px;
          font-family: inherit;
          font-size: 10px;
        }

        .sensor-chart {
          width: 100%;
          height: 225px;
        }

        .sensor-chart-label {
          fill: #87968d;
          font-size: 10px;
        }

        .sensor-legend {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 8px;
          color: #aab6ae;
          font-size: 10px;
        }

        .sensor-dot {
          width: 7px;
          height: 7px;
          display: inline-block;
          border-radius: 50%;
          margin-right: 5px;
        }

        .sensor-health {
          display: flex;
          flex-direction: column;
          gap: 19px;
        }

        .health-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .health-icon {
          width: 39px;
          height: 39px;
          background: #304a39;
          color: #83c394;
          border-radius: 8px;
          display: grid;
          place-items: center;
          font-size: 18px;
        }

        .health-info { flex: 1; }

        .health-title {
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .health-desc {
          color: #87968d;
          font-size: 10px;
        }

        .health-value {
          font-size: 14px;
          font-weight: 700;
        }

        .health-progress {
          height: 6px;
          background: #121c17;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 8px;
        }

        .health-progress-fill {
          height: 100%;
          background: #5db77d;
          border-radius: 10px;
        }

        .alert-box {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          background: #3c3022;
          border: 1px solid #725333;
          border-radius: 8px;
          padding: 13px;
          margin-bottom: 10px;
        }

        .alert-icon {
          font-size: 17px;
          color: #e6a94e;
        }

        .alert-title {
          font-size: 11px;
          font-weight: 700;
          color: #edc183;
          margin-bottom: 5px;
        }

        .alert-description {
          font-size: 10px;
          color: #c2ac8e;
          line-height: 1.5;
        }

        .alert-box.red {
          background: #3c2927;
          border-color: #72413c;
        }

        .alert-box.red .alert-icon,
        .alert-box.red .alert-title {
          color: #e88a7e;
        }

        .alert-box.red .alert-description {
          color: #c9a09a;
        }

        .sensor-table-panel {
          background: #202a28;
          border: 1px solid #303c38;
          border-radius: 11px;
          overflow: hidden;
        }

        .sensor-table-heading {
          padding: 19px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .sensor-table-heading h2 {
          font-size: 14px;
          margin: 0;
        }

        .sensor-search {
          background: #151f1a;
          border: 1px solid #34423a;
          border-radius: 6px;
          color: #b7c4ba;
          padding: 9px 12px;
          font-family: inherit;
          font-size: 11px;
          outline: none;
          width: 190px;
        }

        .sensor-table-scroll { overflow-x: auto; }

        .sensor-table {
          width: 100%;
          min-width: 850px;
          border-collapse: collapse;
        }

        .sensor-table th {
          text-align: left;
          padding: 13px 17px;
          background: #19231f;
          color: #87968d;
          font-size: 9px;
          font-weight: 600;
        }

        .sensor-table td {
          padding: 14px 17px;
          border-top: 1px solid #303c36;
          font-size: 10px;
          color: #d1dbd3;
        }

        .sensor-device {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .sensor-device-icon {
          width: 31px;
          height: 31px;
          background: #304b39;
          color: #8ec89c;
          border-radius: 7px;
          display: grid;
          place-items: center;
          font-size: 15px;
        }

        .sensor-device-name {
          font-weight: 600;
          margin-bottom: 3px;
        }

        .sensor-device-id {
          color: #84948a;
          font-size: 9px;
        }

        .sensor-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 9px;
          border-radius: 5px;
          font-size: 9px;
          font-weight: 600;
        }

        .sensor-status.green {
          background: #294637;
          color: #7dcc94;
        }

        .sensor-status.orange {
          background: #493a28;
          color: #e9b46d;
        }

        .sensor-status.red {
          background: #482e2c;
          color: #e88b7f;
        }

        .sensor-battery {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .battery-outline {
          width: 29px;
          height: 13px;
          border: 1px solid #7f9185;
          border-radius: 3px;
          padding: 2px;
          position: relative;
        }

        .battery-outline::after {
          content: '';
          position: absolute;
          right: -4px;
          top: 3px;
          width: 3px;
          height: 5px;
          background: #7f9185;
          border-radius: 0 2px 2px 0;
        }

        .battery-fill {
          height: 100%;
          background: #69b983;
          border-radius: 1px;
        }

        .battery-fill.low { background: #dc8b55; }

        .sensor-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 15px 19px;
          border-top: 1px solid #303c36;
          color: #85958a;
          font-size: 10px;
        }

        @media(max-width: 1000px) {
          .sensor-stats { grid-template-columns: repeat(2, 1fr); }
          .sensor-layout { grid-template-columns: 1fr; }
        }

        @media(max-width: 600px) {
          .sensors-page { padding: 20px 13px; }
          .sensor-heading { align-items: flex-start; flex-direction: column; }
          .sensor-stats { gap: 9px; }
          .sensor-stat { padding: 13px; }
          .sensor-stat-value { font-size: 22px; }
          .sensor-table-heading { align-items: flex-start; flex-direction: column; }
          .sensor-search { width: 100%; }
        }
      `}</style>

      {/* CABEÇALHO */}
      <header className="sensor-heading">
        <div>
          <h1>Sensores</h1>
          <p>
            Monitore seus dispositivos e acompanhe os dados coletados
            em tempo real.
          </p>
        </div>

        <button className="sensor-button">
          ＋ Adicionar Sensor
        </button>
      </header>

      {/* INDICADORES */}
      <section className="sensor-stats">
        <div className="sensor-stat">
          <div className="sensor-stat-top">
            Total de Sensores
            <span className="sensor-stat-icon">⌁</span>
          </div>
          <div className="sensor-stat-value">05</div>
          <div className="sensor-stat-desc">
            Dispositivos cadastrados
          </div>
        </div>

        <div className="sensor-stat">
          <div className="sensor-stat-top">
            Sensores Online
            <span className="sensor-stat-icon">◉</span>
          </div>
          <div className="sensor-stat-value sensor-green">03</div>
          <div className="sensor-stat-desc">
            Funcionando normalmente
          </div>
        </div>

        <div className="sensor-stat">
          <div className="sensor-stat-top">
            Em Alerta
            <span className="sensor-stat-icon">⚠</span>
          </div>
          <div className="sensor-stat-value sensor-orange">01</div>
          <div className="sensor-stat-desc">
            Precisam de atenção
          </div>
        </div>

        <div className="sensor-stat">
          <div className="sensor-stat-top">
            Sensores Críticos
            <span className="sensor-stat-icon">◉</span>
          </div>
          <div className="sensor-stat-value sensor-red">01</div>
          <div className="sensor-stat-desc">
            Necessitam de verificação
          </div>
        </div>
      </section>

      {/* GRÁFICO E SAÚDE */}
      <section className="sensor-layout">

        <div className="sensor-panel">
          <div className="sensor-panel-header">
            <div>
              <h2>Histórico de Monitoramento</h2>
              <span className="sensor-muted">
                Variação da umidade e temperatura ao longo do dia
              </span>
            </div>
            <select className="sensor-select" defaultValue="today">
              <option value="today">Hoje</option>
              <option value="week">Últimos 7 dias</option>
            </select>
          </div>

          <svg
            className="sensor-chart"
            viewBox="0 0 600 240"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#69bd8b" stopOpacity=".3" />
                <stop offset="100%" stopColor="#69bd8b" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[35, 80, 125, 170, 215].map((y, i) => (
              <g key={y}>
                <line
                  x1="40"
                  y1={y}
                  x2="590"
                  y2={y}
                  stroke="#35423b"
                  strokeDasharray="4 4"
                />
                <text x="3" y={y + 4} className="sensor-chart-label">
                  {[80, 60, 40, 20, 0][i]}%
                </text>
              </g>
            ))}

            <path
              d="M40 100 C80 90 90 82 115 75 S175 92 190 108 S245 125 270 110 S330 85 350 120 S410 135 430 100 S500 65 530 80 S570 85 590 72 L590 215 L40 215 Z"
              fill="url(#humidityGradient)"
            />

            <path
              d="M40 100 C80 90 90 82 115 75 S175 92 190 108 S245 125 270 110 S330 85 350 120 S410 135 430 100 S500 65 530 80 S570 85 590 72"
              fill="none"
              stroke="#70c394"
              strokeWidth="3"
            />

            <path
              d="M40 155 C80 145 90 135 115 140 S175 120 190 125 S245 115 270 110 S330 100 350 105 S410 85 430 90 S500 100 530 95 S570 75 590 85"
              fill="none"
              stroke="#d5b36e"
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />

            {history.map((item, i) => (
              <text
                key={item.time}
                x={40 + i * 78}
                y="235"
                className="sensor-chart-label"
                textAnchor="middle"
              >
                {item.time}
              </text>
            ))}
          </svg>

          <div className="sensor-legend">
            <span>
              <i className="sensor-dot" style={{background:"#70c394"}} />
              Umidade do solo
            </span>
            <span>
              <i className="sensor-dot" style={{background:"#d5b36e"}} />
              Temperatura
            </span>
          </div>
        </div>

        <div className="sensor-panel">
          <div className="sensor-panel-header">
            <h2>Saúde dos Dispositivos</h2>
            <span className="sensor-muted">Resumo geral</span>
          </div>

          <div className="sensor-health">
            <div className="health-item">
              <div className="health-icon">⌁</div>
              <div className="health-info">
                <div className="health-title">Conectividade</div>
                <div className="health-desc">3 de 5 dispositivos online</div>
                <div className="health-progress">
                  <div className="health-progress-fill" style={{width:"60%"}} />
                </div>
              </div>
              <div className="health-value sensor-green">60%</div>
            </div>

            <div className="health-item">
              <div className="health-icon">▣</div>
              <div className="health-info">
                <div className="health-title">Bateria média</div>
                <div className="health-desc">Nível médio dos dispositivos</div>
                <div className="health-progress">
                  <div className="health-progress-fill" style={{width:"73%"}} />
                </div>
              </div>
              <div className="health-value">73%</div>
            </div>

            <div className="health-item">
              <div className="health-icon">◉</div>
              <div className="health-info">
                <div className="health-title">Qualidade dos dados</div>
                <div className="health-desc">Medições recebidas corretamente</div>
                <div className="health-progress">
                  <div className="health-progress-fill" style={{width:"94%"}} />
                </div>
              </div>
              <div className="health-value sensor-green">94%</div>
            </div>
          </div>

          <div style={{marginTop:22}}>
            <div className="alert-box">
              <span className="alert-icon">⚠</span>
              <div>
                <div className="alert-title">Bateria baixa</div>
                <div className="alert-description">
                  O sensor SEN-004 está com apenas 12% de bateria.
                  Verifique o dispositivo.
                </div>
              </div>
            </div>

            <div className="alert-box red">
              <span className="alert-icon">!</span>
              <div>
                <div className="alert-title">Umidade crítica</div>
                <div className="alert-description">
                  O Talhão D apresenta umidade de 29%.
                  Avalie a necessidade de irrigação.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABELA DE SENSORES */}
      <section className="sensor-table-panel">
        <div className="sensor-table-heading">
          <div>
            <h2>Dispositivos Instalados</h2>
            <span className="sensor-muted">
              Acompanhamento dos sensores da propriedade
            </span>
          </div>

          <input
            className="sensor-search"
            placeholder="⌕ Buscar dispositivo..."
          />
        </div>

        <div className="sensor-table-scroll">
          <table className="sensor-table">
            <thead>
              <tr>
                <th>DISPOSITIVO</th>
                <th>TALHÃO</th>
                <th>TIPO</th>
                <th>LEITURA ATUAL</th>
                <th>BATERIA</th>
                <th>SINAL</th>
                <th>STATUS</th>
                <th>ATUALIZAÇÃO</th>
              </tr>
            </thead>

            <tbody>
              {sensors.map((sensor) => (
                <tr key={sensor.id}>
                  <td>
                    <div className="sensor-device">
                      <div className="sensor-device-icon">⌁</div>
                      <div>
                        <div className="sensor-device-name">
                          {sensor.name}
                        </div>
                        <div className="sensor-device-id">
                          {sensor.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{sensor.field}</td>
                  <td>{sensor.type}</td>
                  <td><strong>{sensor.value}</strong></td>

                  <td>
                    <div className="sensor-battery">
                      <div className="battery-outline">
                        <div
                          className={`battery-fill ${
                            sensor.battery < 20 ? "low" : ""
                          }`}
                          style={{width:`${sensor.battery}%`}}
                        />
                      </div>
                      {sensor.battery}%
                    </div>
                  </td>

                  <td>{sensor.signal}</td>

                  <td>
                    <span className={`sensor-status ${sensor.color}`}>
                      ● {sensor.status}
                    </span>
                  </td>

                  <td>{sensor.update}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sensor-footer">
          <span>Exibindo 5 dispositivos cadastrados</span>
          <span>Última atualização: 21:15</span>
        </div>
      </section>
    </div>
  );
}
