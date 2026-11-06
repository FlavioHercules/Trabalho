
import { useState } from "react";
import {
  Settings,
  Sprout,
  User,
  MapPin,
  Thermometer,
  Droplets,
  Bell,
  ShieldCheck,
  Wifi,
  Save,
  ChevronRight,
  Check,
  Clock,
  Gauge,
  Mail,
  Smartphone,
  Lock,
  RotateCcw,
} from "lucide-react";

type ToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="cfg-toggle-row">
      <div className="cfg-toggle-info">
        <strong>{label}</strong>
        <span>{description}</span>
      </div>
      <button
        type="button"
        className={`cfg-switch ${checked ? "on" : ""}`}
        onClick={onChange}
        aria-pressed={checked}
      >
        <span />
      </button>
    </div>
  );
}

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("Propriedade");
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    alertMoisture: true,
    alertSensor: true,
    alertWeather: true,
    alertIrrigation: false,
    email: true,
    push: true,
    automaticIrrigation: false,
    smartRecommendations: true,
    monitoring: true,
  });

  const [farmName, setFarmName] = useState("Fazenda São José");
  const [owner, setOwner] = useState("Carlos Henrique");
  const [location, setLocation] = useState("Juazeiro, Bahia");
  const [area, setArea] = useState("48");
  const [crop, setCrop] = useState("Manga");

  function toggle(key: keyof typeof settings) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
    setSaved(false);
  }

  function saveSettings() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const tabs = [
    { name: "Propriedade", icon: Sprout },
    { name: "Monitoramento", icon: Gauge },
    { name: "Notificações", icon: Bell },
    { name: "Segurança", icon: ShieldCheck },
  ];

  return (
    <main className="ir-config">
      <style>{`
        .ir-config {
          color: #edf3ef;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          animation: cfgFade .35s ease;
        }

        .ir-config * { box-sizing: border-box; }

        @keyframes cfgFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ir-config button,
        .ir-config input,
        .ir-config select {
          font-family: inherit;
        }

        .cfg-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 26px;
        }

        .cfg-eyebrow {
          color: #83c998;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          margin-bottom: 9px;
        }

        .cfg-header h1 {
          font-size: clamp(25px, 3vw, 32px);
          letter-spacing: -1px;
          margin: 0;
          font-weight: 700;
        }

        .cfg-header p {
          color: #899991;
          font-size: 13px;
          margin-top: 8px;
          line-height: 1.6;
        }

        .cfg-save {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #75bd89;
          color: #13241a;
          border: none;
          border-radius: 9px;
          padding: 12px 17px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
          white-space: nowrap;
        }

        .cfg-save:hover {
          background: #91d5a4;
          transform: translateY(-1px);
        }

        .cfg-layout {
          display: grid;
          grid-template-columns: 230px minmax(0, 1fr);
          gap: 20px;
          align-items: start;
        }

        .cfg-sidebar {
          background: #202a25;
          border: 1px solid #303e36;
          border-radius: 13px;
          padding: 10px;
        }

        .cfg-sidebar-label {
          font-size: 10px;
          color: #718078;
          font-weight: 700;
          letter-spacing: 1.2px;
          padding: 12px 10px;
          text-transform: uppercase;
        }

        .cfg-tab {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px 11px;
          border: none;
          background: transparent;
          color: #92a097;
          border-radius: 8px;
          text-align: left;
          font-size: 12px;
          cursor: pointer;
          transition: .2s;
          margin-bottom: 3px;
        }

        .cfg-tab:hover {
          background: #29372f;
          color: #d9e7dd;
        }

        .cfg-tab.active {
          background: #304b37;
          color: #a0d9af;
          font-weight: 650;
        }

        .cfg-tab svg:last-child {
          margin-left: auto;
        }

        .cfg-sidebar-bottom {
          margin: 15px 4px 4px;
          padding: 13px 10px;
          border-top: 1px solid #354239;
          color: #77877d;
          font-size: 10px;
          line-height: 1.6;
        }

        .cfg-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }

        .cfg-card {
          background: #202a25;
          border: 1px solid #303e36;
          border-radius: 13px;
          overflow: hidden;
        }

        .cfg-card-header {
          padding: 19px 21px;
          border-bottom: 1px solid #344139;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cfg-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: #293f31;
          color: #83c998;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .cfg-card-header h2 {
          font-size: 14px;
          font-weight: 650;
          margin: 0;
        }

        .cfg-card-header p {
          font-size: 11px;
          color: #829087;
          margin: 4px 0 0;
        }

        .cfg-card-body {
          padding: 21px;
        }

        .cfg-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .cfg-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .cfg-field label {
          font-size: 11px;
          color: #a6b5ab;
          font-weight: 600;
        }

        .cfg-input,
        .cfg-select {
          width: 100%;
          height: 42px;
          border: 1px solid #3b4941;
          border-radius: 8px;
          background: #19221d;
          color: #e3ece5;
          outline: none;
          padding: 0 12px;
          font-size: 12px;
          transition: .2s;
        }

        .cfg-input:focus,
        .cfg-select:focus {
          border-color: #70bd88;
          box-shadow: 0 0 0 2px #70bd8818;
        }

        .cfg-input::placeholder {
          color: #66746b;
        }

        .cfg-input:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        .cfg-field-hint {
          font-size: 10px;
          color: #718078;
        }

        .cfg-profile {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid #354239;
        }

        .cfg-avatar {
          width: 52px;
          height: 52px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          background: linear-gradient(145deg, #41684a, #263c2d);
          color: #b3e2be;
        }

        .cfg-profile strong {
          font-size: 13px;
          display: block;
        }

        .cfg-profile span {
          font-size: 11px;
          color: #829087;
          display: block;
          margin-top: 5px;
        }

        .cfg-status {
          margin-left: auto;
          background: #294333;
          color: #8fd5a1;
          padding: 6px 9px;
          border-radius: 6px;
          font-size: 9px;
          font-weight: 700;
        }

        .cfg-toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          padding: 16px 0;
          border-bottom: 1px solid #344139;
        }

        .cfg-toggle-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .cfg-toggle-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .cfg-toggle-info strong {
          font-size: 12px;
          font-weight: 600;
        }

        .cfg-toggle-info span {
          color: #829087;
          font-size: 11px;
          line-height: 1.5;
        }

        .cfg-switch {
          width: 40px;
          height: 22px;
          border: none;
          border-radius: 20px;
          background: #46534b;
          padding: 3px;
          flex-shrink: 0;
          cursor: pointer;
          transition: .2s;
        }

        .cfg-switch span {
          display: block;
          width: 16px;
          height: 16px;
          background: #d1dbd4;
          border-radius: 50%;
          transition: .2s;
        }

        .cfg-switch.on {
          background: #579b6b;
        }

        .cfg-switch.on span {
          transform: translateX(18px);
          background: white;
        }

        .cfg-info-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #25392c;
          border: 1px solid #3c5a43;
          border-radius: 9px;
          padding: 13px 14px;
          color: #a5c9ad;
          font-size: 11px;
          line-height: 1.6;
          margin-top: 17px;
        }

        .cfg-info-box svg {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .cfg-device {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 15px 0;
          border-bottom: 1px solid #344139;
        }

        .cfg-device:last-child {
          border-bottom: none;
        }

        .cfg-device-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cfg-device-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          background: #293f31;
          color: #83c998;
          border-radius: 9px;
        }

        .cfg-device strong {
          font-size: 12px;
          display: block;
        }

        .cfg-device small {
          display: block;
          color: #829087;
          font-size: 10px;
          margin-top: 4px;
        }

        .cfg-online {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: #86ca98;
        }

        .cfg-online::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #78c68e;
        }

        .cfg-danger {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 17px;
          border: 1px solid #583b37;
          border-radius: 10px;
          background: #382a27;
        }

        .cfg-danger strong {
          color: #e5a18e;
          font-size: 12px;
          display: block;
        }

        .cfg-danger p {
          color: #b88f84;
          font-size: 10px;
          margin: 5px 0 0;
        }

        .cfg-danger button {
          border: 1px solid #86574d;
          background: transparent;
          color: #e5a18e;
          padding: 9px 12px;
          border-radius: 7px;
          font-size: 10px;
          cursor: pointer;
        }

        .cfg-bottom-save {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          margin-top: 4px;
        }

        .cfg-saved {
          color: #8fd5a1;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .cfg-security-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 17px 0;
          border-bottom: 1px solid #344139;
        }

        .cfg-security-row:last-child {
          border-bottom: none;
        }

        .cfg-security-row strong {
          display: block;
          font-size: 12px;
        }

        .cfg-security-row span {
          display: block;
          color: #829087;
          font-size: 10px;
          margin-top: 5px;
        }

        .cfg-secondary {
          display: flex;
          align-items: center;
          gap: 7px;
          border: 1px solid #3d5043;
          background: #29372f;
          color: #a9d8b4;
          border-radius: 7px;
          padding: 9px 12px;
          font-size: 10px;
          cursor: pointer;
        }

        @media(max-width: 850px) {
          .cfg-layout {
            grid-template-columns: 1fr;
          }

          .cfg-sidebar {
            display: flex;
            overflow-x: auto;
            gap: 5px;
          }

          .cfg-sidebar-label,
          .cfg-sidebar-bottom {
            display: none;
          }

          .cfg-tab {
            white-space: nowrap;
            width: auto;
            margin: 0;
          }

          .cfg-tab svg:last-child {
            display: none;
          }
        }

        @media(max-width: 560px) {
          .cfg-header {
            flex-direction: column;
          }

          .cfg-grid {
            grid-template-columns: 1fr;
          }

          .cfg-card-body {
            padding: 16px;
          }

          .cfg-card-header {
            padding: 16px;
          }

          .cfg-danger {
            align-items: flex-start;
            flex-direction: column;
          }

          .cfg-status {
            display: none;
          }
        }
      `}</style>

      <header className="cfg-header">
        <div>
          <div className="cfg-eyebrow">Personalização do sistema</div>
          <h1>Configurações</h1>
          <p>
            Gerencie sua propriedade e personalize o funcionamento do IRRIGATEC.
          </p>
        </div>

        <button className="cfg-save" onClick={saveSettings}>
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Alterações salvas" : "Salvar alterações"}
        </button>
      </header>

      <div className="cfg-layout">
        <aside className="cfg-sidebar">
          <div className="cfg-sidebar-label">Preferências</div>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                className={`cfg-tab ${activeTab === tab.name ? "active" : ""}`}
                onClick={() => setActiveTab(tab.name)}
              >
                <Icon size={17} />
                {tab.name}
                <ChevronRight size={14} />
              </button>
            );
          })}

          <div className="cfg-sidebar-bottom">
            IRRIGATEC<br />
            Plataforma inteligente de gestão agrícola.
            <br /><br />
            Versão 1.0.0 · Demonstração
          </div>
        </aside>

        <section className="cfg-content">
          {activeTab === "Propriedade" && (
            <>
              <div className="cfg-card">
                <div className="cfg-card-header">
                  <div className="cfg-card-icon"><Sprout size={18} /></div>
                  <div>
                    <h2>Dados da propriedade</h2>
                    <p>Informações gerais da sua unidade agrícola.</p>
                  </div>
                </div>

                <div className="cfg-card-body">
                  <div className="cfg-profile">
                    <div className="cfg-avatar"><Sprout size={25} /></div>
                    <div>
                      <strong>{farmName}</strong>
                      <span>Propriedade monitorada pelo IRRIGATEC</span>
                    </div>
                    <div className="cfg-status">ATIVA</div>
                  </div>

                  <div className="cfg-grid">
                    <div className="cfg-field">
                      <label>Nome da propriedade</label>
                      <input
                        className="cfg-input"
                        value={farmName}
                        onChange={(e) => {
                          setFarmName(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>

                    <div className="cfg-field">
                      <label>Responsável</label>
                      <input
                        className="cfg-input"
                        value={owner}
                        onChange={(e) => {
                          setOwner(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>

                    <div className="cfg-field">
                      <label>Localização</label>
                      <div style={{ position: "relative" }}>
                        <MapPin
                          size={15}
                          color="#83c998"
                          style={{ position: "absolute", left: 12, top: 13 }}
                        />
                        <input
                          className="cfg-input"
                          style={{ paddingLeft: 35 }}
                          value={location}
                          onChange={(e) => {
                            setLocation(e.target.value);
                            setSaved(false);
                          }}
                        />
                      </div>
                    </div>

                    <div className="cfg-field">
                      <label>Área total (hectares)</label>
                      <input
                        className="cfg-input"
                        type="number"
                        value={area}
                        onChange={(e) => {
                          setArea(e.target.value);
                          setSaved(false);
                        }}
                      />
                    </div>

                    <div className="cfg-field">
                      <label>Cultura principal</label>
                      <select
                        className="cfg-select"
                        value={crop}
                        onChange={(e) => {
                          setCrop(e.target.value);
                          setSaved(false);
                        }}
                      >
                        <option>Manga</option>
                        <option>Uva</option>
                        <option>Melão</option>
                        <option>Banana</option>
                        <option>Tomate</option>
                        <option>Outra</option>
                      </select>
                    </div>

                    <div className="cfg-field">
                      <label>Identificação</label>
                      <input
                        className="cfg-input"
                        value="IRR-2026-001"
                        disabled
                      />
                      <span className="cfg-field-hint">
                        Código de demonstração
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cfg-card">
                <div className="cfg-card-header">
                  <div className="cfg-card-icon"><User size={18} /></div>
                  <div>
                    <h2>Conta do responsável</h2>
                    <p>Informações de acesso e identificação.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <div className="cfg-grid">
                    <div className="cfg-field">
                      <label>Nome completo</label>
                      <input className="cfg-input" value={owner} disabled />
                    </div>
                    <div className="cfg-field">
                      <label>E-mail cadastrado</label>
                      <input
                        className="cfg-input"
                        value="responsavel@fazenda.com"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "Monitoramento" && (
            <>
              <div className="cfg-card">
                <div className="cfg-card-header">
                  <div className="cfg-card-icon"><Gauge size={18} /></div>
                  <div>
                    <h2>Monitoramento inteligente</h2>
                    <p>Configure como os dados agrícolas são acompanhados.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <Toggle
                    label="Monitoramento automático"
                    description="Manter o acompanhamento dos sensores da propriedade."
                    checked={settings.monitoring}
                    onChange={() => toggle("monitoring")}
                  />
                  <Toggle
                    label="Recomendações inteligentes"
                    description="Permitir que o sistema apresente sugestões com base nos dados coletados."
                    checked={settings.smartRecommendations}
                    onChange={() => toggle("smartRecommendations")}
                  />
                  <Toggle
                    label="Irrigação automática"
                    description="Habilitar a execução automática de ciclos de irrigação."
                    checked={settings.automaticIrrigation}
                    onChange={() => toggle("automaticIrrigation")}
                  />

                  <div className="cfg-info-box">
                    <ShieldCheck size={17} />
                    Na demonstração, esses controles apenas representam as
                    preferências do sistema. Nenhum equipamento será acionado.
                  </div>
                </div>
              </div>

              <div className="cfg-card">
                <div className="cfg-card-header">
                  <div className="cfg-card-icon"><Wifi size={18} /></div>
                  <div>
                    <h2>Dispositivos conectados</h2>
                    <p>Visão geral dos equipamentos cadastrados.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <div className="cfg-device">
                    <div className="cfg-device-left">
                      <div className="cfg-device-icon"><Droplets size={18} /></div>
                      <div>
                        <strong>Sensor de umidade S-201</strong>
                        <small>Talhão 01 · Última leitura: 21:35</small>
                      </div>
                    </div>
                    <span className="cfg-online">Conectado</span>
                  </div>
                  <div className="cfg-device">
                    <div className="cfg-device-left">
                      <div className="cfg-device-icon"><Thermometer size={18} /></div>
                      <div>
                        <strong>Sensor climático C-102</strong>
                        <small>Estação central · Última leitura: 21:34</small>
                      </div>
                    </div>
                    <span className="cfg-online">Conectado</span>
                  </div>
                  <div className="cfg-device">
                    <div className="cfg-device-left">
                      <div className="cfg-device-icon"><Wifi size={18} /></div>
                      <div>
                        <strong>Controlador de irrigação I-003</strong>
                        <small>Talhão 03 · Última leitura: 21:30</small>
                      </div>
                    </div>
                    <span className="cfg-online">Conectado</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "Notificações" && (
            <>
              <div className="cfg-card">
                <div className="cfg-card-header">
                  <div className="cfg-card-icon"><Bell size={18} /></div>
                  <div>
                    <h2>Alertas da propriedade</h2>
                    <p>Escolha quais acontecimentos devem gerar notificações.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <Toggle
                    label="Umidade do solo"
                    description="Avisar quando a umidade estiver abaixo do nível recomendado."
                    checked={settings.alertMoisture}
                    onChange={() => toggle("alertMoisture")}
                  />
                  <Toggle
                    label="Falha de sensores"
                    description="Notificar quando um dispositivo perder conexão."
                    checked={settings.alertSensor}
                    onChange={() => toggle("alertSensor")}
                  />
                  <Toggle
                    label="Condições climáticas"
                    description="Receber avisos sobre chuva, temperatura e mudanças no clima."
                    checked={settings.alertWeather}
                    onChange={() => toggle("alertWeather")}
                  />
                  <Toggle
                    label="Ciclos de irrigação"
                    description="Receber avisos sobre início e conclusão da irrigação."
                    checked={settings.alertIrrigation}
                    onChange={() => toggle("alertIrrigation")}
                  />
                </div>
              </div>

              <div className="cfg-card">
                <div className="cfg-card-header">
                  <div className="cfg-card-icon"><Smartphone size={18} /></div>
                  <div>
                    <h2>Canais de comunicação</h2>
                    <p>Defina onde deseja receber os avisos.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <Toggle
                    label="Notificações no aplicativo"
                    description="Exibir alertas diretamente na plataforma."
                    checked={settings.push}
                    onChange={() => toggle("push")}
                  />
                  <Toggle
                    label="Notificações por e-mail"
                    description="Enviar alertas para o endereço cadastrado."
                    checked={settings.email}
                    onChange={() => toggle("email")}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === "Segurança" && (
            <>
              <div className="cfg-card">
                <div className="cfg-card-header">
                  <div className="cfg-card-icon"><ShieldCheck size={18} /></div>
                  <div>
                    <h2>Segurança da conta</h2>
                    <p>Gerencie as opções de proteção e acesso.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <div className="cfg-security-row">
                    <div>
                      <strong>Endereço de e-mail</strong>
                      <span>responsavel@fazenda.com</span>
                    </div>
                    <Mail size={18} color="#83c998" />
                  </div>

                  <div className="cfg-security-row">
                    <div>
                      <strong>Senha de acesso</strong>
                      <span>Última atualização: não informada</span>
                    </div>
                    <button className="cfg-secondary">
                      <Lock size={13} /> Alterar senha
                    </button>
                  </div>

                  <div className="cfg-security-row">
                    <div>
                      <strong>Autenticação em duas etapas</strong>
                      <span>Proteção adicional para o acesso à conta.</span>
                    </div>
                    <span style={{ color: "#e3c17b", fontSize: 10 }}>
                      Não configurada
                    </span>
                  </div>
                </div>
              </div>

              <div className="cfg-card">
                <div className="cfg-card-header">
                  <div className="cfg-card-icon"><Clock size={18} /></div>
                  <div>
                    <h2>Atividade da conta</h2>
                    <p>Informações sobre o acesso mais recente.</p>
                  </div>
                </div>
                <div className="cfg-card-body">
                  <div className="cfg-security-row">
                    <div>
                      <strong>Último acesso</strong>
                      <span>Hoje, às 20:48 · Dispositivo atual</span>
                    </div>
                    <span className="cfg-online">Ativo</span>
                  </div>
                </div>
              </div>

              <div className="cfg-danger">
                <div>
                  <strong>Redefinir preferências</strong>
                  <p>Restaurar as opções desta demonstração para os valores iniciais.</p>
                </div>
                <button
                  onClick={() => {
                    setSettings({
                      alertMoisture: true,
                      alertSensor: true,
                      alertWeather: true,
                      alertIrrigation: false,
                      email: true,
                      push: true,
                      automaticIrrigation: false,
                      smartRecommendations: true,
                      monitoring: true,
                    });
                    setSaved(false);
                  }}
                >
                  <RotateCcw size={13} style={{ verticalAlign: "middle", marginRight: 5 }} />
                  Restaurar
                </button>
              </div>
            </>
          )}

          <div className="cfg-bottom-save">
            {saved && (
              <span className="cfg-saved">
                <Check size={14} /> Alterações salvas nesta demonstração
              </span>
            )}
            <button className="cfg-save" onClick={saveSettings}>
              <Save size={15} />
              Salvar alterações
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
