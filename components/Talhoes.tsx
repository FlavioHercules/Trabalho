
import React from "react";

const talhoes = [
  {
    id: "TL-001",
    name: "Talhão A",
    culture: "Milho",
    area: "12,5 ha",
    humidity: 72,
    temperature: "24°C",
    status: "Saudável",
    color: "green",
    irrigation: "Irrigação programada",
  },
  {
    id: "TL-002",
    name: "Talhão B",
    culture: "Soja",
    area: "8,2 ha",
    humidity: 42,
    temperature: "27°C",
    status: "Atenção",
    color: "orange",
    irrigation: "Necessita irrigação",
  },
  {
    id: "TL-003",
    name: "Talhão C",
    culture: "Feijão",
    area: "10,8 ha",
    humidity: 68,
    temperature: "23°C",
    status: "Saudável",
    color: "green",
    irrigation: "Umidade adequada",
  },
  {
    id: "TL-004",
    name: "Talhão D",
    culture: "Milho",
    area: "6,4 ha",
    humidity: 29,
    temperature: "29°C",
    status: "Crítico",
    color: "red",
    irrigation: "Irrigação urgente",
  },
];

export default function Talhoes() {
  return (
    <div className="talhoes-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .talhoes-page {
          min-height: 100vh;
          background: #101715;
          color: #e7eee9;
          font-family: 'DM Sans', sans-serif;
          padding: 28px 30px;
        }

        .talhoes-page * { box-sizing: border-box; }

        .page-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .page-heading h1 {
          font-size: 23px;
          margin: 0 0 6px;
          letter-spacing: -.5px;
        }

        .page-heading p {
          color: #899990;
          font-size: 12px;
          margin: 0;
        }

        .add-button {
          border: 0;
          border-radius: 7px;
          background: #397c57;
          color: white;
          padding: 12px 17px;
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
        }

        .add-button:hover { background: #478f65; }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 20px;
        }

        .stat-card {
          background: #202a28;
          border: 1px solid #303c38;
          border-radius: 11px;
          padding: 18px;
        }

        .stat-top {
          display: flex;
          justify-content: space-between;
          color: #9aa99f;
          font-size: 12px;
          margin-bottom: 13px;
        }

        .stat-icon {
          font-size: 19px;
          color: #79b58a;
        }

        .stat-value {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-description {
          font-size: 10px;
          color: #84958a;
        }

        .green-text { color: #75c591; }
        .orange-text { color: #e7a54d; }
        .red-text { color: #e47c70; }

        .layout-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }

        .panel {
          background: #202a28;
          border: 1px solid #303c38;
          border-radius: 11px;
          padding: 19px;
          min-width: 0;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .panel-header h2 {
          font-size: 14px;
          margin: 0;
        }

        .panel-header span {
          color: #91a096;
          font-size: 11px;
        }

        .property-map {
          height: 265px;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          background:
            linear-gradient(35deg, transparent 45%, #456144 46%, #456144 48%, transparent 49%),
            repeating-linear-gradient(135deg, #193a27 0px, #193a27 12px, #1c422b 12px, #1c422b 24px);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .map-road {
          position: absolute;
          width: 120%;
          height: 17px;
          background: #9b916e;
          opacity: .55;
          transform: rotate(-19deg);
          top: 48%;
        }

        .map-area {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
          width: 72%;
          height: 76%;
          z-index: 1;
          transform: rotate(-7deg);
        }

        .map-field {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 2px solid rgba(255,255,255,.25);
          border-radius: 5px;
          color: #15251a;
          font-weight: 800;
          font-size: 14px;
          position: relative;
        }

        .map-field small {
          font-size: 9px;
          font-weight: 600;
          margin-top: 4px;
        }

        .map-field.a { background: #4bb77b; }
        .map-field.b { background: #d3c84f; }
        .map-field.c { background: #65aa70; }
        .map-field.d { background: #e4a044; }

        .map-caption {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: white;
          font-size: 9px;
          background: #12251b;
          padding: 7px 9px;
          border-radius: 5px;
          z-index: 2;
        }

        .map-legend {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-top: 13px;
          color: #a3b0a7;
          font-size: 10px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .legend-color {
          height: 8px;
          width: 8px;
          border-radius: 2px;
        }

        .overview-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .overview-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 13px;
          border-bottom: 1px solid #34413a;
        }

        .overview-item:last-child {
          border: 0;
          padding-bottom: 0;
        }

        .overview-name {
          font-weight: 600;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .overview-desc {
          color: #89988e;
          font-size: 10px;
        }

        .overview-value {
          font-weight: 700;
          font-size: 16px;
        }

        .table-panel { padding: 0; overflow: hidden; }

        .table-heading {
          padding: 19px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-heading h2 {
          font-size: 14px;
          margin: 0;
        }

        .search-box {
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

        .table-scroll { overflow-x: auto; }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 680px;
        }

        th {
          background: #19231f;
          color: #84958b;
          font-size: 10px;
          font-weight: 600;
          text-align: left;
          padding: 13px 19px;
        }

        td {
          padding: 15px 19px;
          border-top: 1px solid #303c36;
          font-size: 11px;
          color: #d1dbd3;
        }

        .field-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .field-avatar {
          width: 31px;
          height: 31px;
          background: #304b39;
          border-radius: 7px;
          display: grid;
          place-items: center;
          color: #8ec89c;
        }

        .field-id {
          font-size: 9px;
          color: #839188;
          margin-top: 3px;
        }

        .humidity {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .humidity-bar {
          width: 65px;
          height: 6px;
          background: #131d18;
          border-radius: 10px;
          overflow: hidden;
        }

        .humidity-fill {
          height: 100%;
          border-radius: 10px;
        }

        .status {
          padding: 5px 9px;
          border-radius: 5px;
          font-size: 9px;
          font-weight: 600;
        }

        .status.green {
          color: #7dcc94;
          background: #294637;
        }

        .status.orange {
          color: #e9b46d;
          background: #493a28;
        }

        .status.red {
          color: #e88b7f;
          background: #482e2c;
        }

        .action {
          color: #9caea2;
          font-size: 17px;
          cursor: pointer;
          background: transparent;
          border: none;
        }

        @media(max-width: 950px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .layout-grid { grid-template-columns: 1fr; }
        }

        @media(max-width: 600px) {
          .talhoes-page { padding: 20px 13px; }
          .page-heading { align-items: flex-start; flex-direction: column; }
          .stats-grid { gap: 9px; }
          .stat-card { padding: 13px; }
          .stat-value { font-size: 22px; }
          .table-heading { align-items: flex-start; flex-direction: column; gap: 12px; }
          .search-box { width: 100%; }
        }
      `}</style>

      {/* CABEÇALHO */}
      <header className="page-heading">
        <div>
          <h1>Talhões</h1>
          <p>Gerencie suas áreas de cultivo e acompanhe as condições de cada plantação.</p>
        </div>
        <button className="add-button">＋ Novo Talhão</button>
      </header>

      {/* INDICADORES */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            Total de Talhões <span className="stat-icon">▦</span>
          </div>
          <div className="stat-value">04</div>
          <div className="stat-description">Áreas cadastradas</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            Área Total <span className="stat-icon">⌖</span>
          </div>
          <div className="stat-value">37,9 ha</div>
          <div className="stat-description">Área de cultivo cadastrada</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            Umidade Média <span className="stat-icon">♧</span>
          </div>
          <div className="stat-value">52,8%</div>
          <div className="stat-description green-text">Monitoramento atualizado</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            Áreas em Atenção <span className="stat-icon">⚠</span>
          </div>
          <div className="stat-value orange-text">02</div>
          <div className="stat-description">Necessitam de acompanhamento</div>
        </div>
      </section>

      {/* MAPA E RESUMO */}
      <section className="layout-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Mapa da Propriedade</h2>
            <span>Fazenda Monte Alegre ⌄</span>
          </div>

          <div className="property-map">
            <div className="map-road" />
            <div className="map-area">
              <div className="map-field a">
                Talhão A <small>72% umidade</small>
              </div>
              <div className="map-field b">
                Talhão B <small>42% umidade</small>
              </div>
              <div className="map-field c">
                Talhão C <small>68% umidade</small>
              </div>
              <div className="map-field d">
                Talhão D <small>29% umidade</small>
              </div>
            </div>
            <div className="map-caption">Fazenda Monte Alegre · 37,9 ha</div>
          </div>

          <div className="map-legend">
            <span className="legend-item">
              <i className="legend-color" style={{background:"#4bb77b"}} />
              Umidade adequada
            </span>
            <span className="legend-item">
              <i className="legend-color" style={{background:"#d3c84f"}} />
              Atenção
            </span>
            <span className="legend-item">
              <i className="legend-color" style={{background:"#e4a044"}} />
              Crítico
            </span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Condição dos Talhões</h2>
            <span>Agora</span>
          </div>

          <div className="overview-list">
            {talhoes.map((field) => (
              <div className="overview-item" key={field.id}>
                <div>
                  <div className="overview-name">{field.name}</div>
                  <div className="overview-desc">{field.culture} · {field.area}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className={`overview-value ${
                    field.color === "green" ? "green-text" :
                    field.color === "orange" ? "orange-text" : "red-text"
                  }`}>
                    {field.humidity}%
                  </div>
                  <div className="overview-desc">Umidade do solo</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABELA */}
      <section className="panel table-panel">
        <div className="table-heading">
          <h2>Todos os Talhões</h2>
          <input
            className="search-box"
            placeholder="⌕  Buscar talhão..."
            type="text"
          />
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>TALHÃO</th>
                <th>CULTURA</th>
                <th>ÁREA</th>
                <th>UMIDADE</th>
                <th>TEMPERATURA</th>
                <th>SITUAÇÃO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>

            <tbody>
              {talhoes.map((field) => (
                <tr key={field.id}>
                  <td>
                    <div className="field-cell">
                      <div className="field-avatar">♧</div>
                      <div>
                        <strong>{field.name}</strong>
                        <div className="field-id">{field.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{field.culture}</td>
                  <td>{field.area}</td>
                  <td>
                    <div className="humidity">
                      <strong>{field.humidity}%</strong>
                      <div className="humidity-bar">
                        <div
                          className={`humidity-fill ${
                            field.color === "green" ? "green" :
                            field.color === "orange" ? "orange" : "red"
                          }`}
                          style={{width:`${field.humidity}%`}}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{field.temperature}</td>
                  <td>
                    <span className={`status ${field.color}`}>
                      {field.status}
                    </span>
                  </td>
                  <td>
                    <button className="action">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
