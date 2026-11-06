
import { useState } from "react";
import {
  Bell,
  AlertTriangle,
  Droplets,
  CloudRain,
  WifiOff,
  CheckCircle2,
  Info,
  Check,
  Filter,
  Clock3,
  ArrowUpRight,
  Trash2,
} from "lucide-react";

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  category: "Irrigação" | "Sensores" | "Clima" | "Sistema";
  priority: "Alta" | "Média" | "Baixa";
  read: boolean;
  icon: typeof Bell;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Umidade do solo abaixo do ideal",
    description:
      "O Talhão 03 apresenta umidade de 24%. Recomenda-se avaliar a necessidade de irrigação.",
    time: "Há 8 minutos",
    category: "Irrigação",
    priority: "Alta",
    read: false,
    icon: Droplets,
  },
  {
    id: 2,
    title: "Sensor desconectado",
    description:
      "O sensor S-204 do Talhão 02 perdeu a conexão com a central de monitoramento.",
    time: "Há 32 minutos",
    category: "Sensores",
    priority: "Alta",
    read: false,
    icon: WifiOff,
  },
  {
    id: 3,
    title: "Previsão de chuva detectada",
    description:
      "Há previsão de precipitação de 18 mm nas próximas 24 horas. Considere ajustar o cronograma.",
    time: "Há 1 hora",
    category: "Clima",
    priority: "Média",
    read: false,
    icon: CloudRain,
  },
  {
    id: 4,
    title: "Irrigação concluída",
    description:
      "O ciclo de irrigação do Talhão 01 foi finalizado com sucesso.",
    time: "Há 2 horas",
    category: "Irrigação",
    priority: "Baixa",
    read: true,
    icon: CheckCircle2,
  },
  {
    id: 5,
    title: "Recomendação de manejo disponível",
    description:
      "A análise dos dados indica uma oportunidade de otimização no consumo de água do Talhão 04.",
    time: "Há 4 horas",
    category: "Sistema",
    priority: "Média",
    read: true,
    icon: Info,
  },
  {
    id: 6,
    title: "Monitoramento normalizado",
    description:
      "O sensor S-198 voltou a transmitir dados normalmente.",
    time: "Ontem, 16:42",
    category: "Sensores",
    priority: "Baixa",
    read: true,
    icon: CheckCircle2,
  },
];

const filters = ["Todas", "Não lidas", "Irrigação", "Sensores", "Clima", "Sistema"];

export default function Notificacoes() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState("Todas");

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "Não lidas") return !item.read;
    if (activeFilter === "Todas") return true;
    return item.category === activeFilter;
  });

  function markAsRead(id: number) {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true }))
    );
  }

  function removeNotification(id: number) {
    setNotifications((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  return (
    <main className="ir-notifications">
      <style>{`
        .ir-notifications {
          color: #edf3ef;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          animation: irFade .35s ease;
        }

        @keyframes irFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ir-notifications * { box-sizing: border-box; }

        .ir-notifications .ir-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 28px;
        }

        .ir-notifications .ir-eyebrow {
          color: #83c998;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.7px;
          text-transform: uppercase;
          margin-bottom: 9px;
        }

        .ir-notifications h1 {
          font-size: clamp(25px, 3vw, 32px);
          letter-spacing: -1px;
          margin: 0;
          font-weight: 700;
        }

        .ir-notifications .ir-subtitle {
          color: #899991;
          font-size: 13px;
          margin-top: 8px;
          line-height: 1.6;
        }

        .ir-notifications button {
          font-family: inherit;
          cursor: pointer;
        }

        .ir-notifications .ir-mark-all {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #34443b;
          background: #202a25;
          color: #b6c7bc;
          padding: 11px 15px;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 600;
          transition: .2s;
        }

        .ir-notifications .ir-mark-all:hover {
          border-color: #70bd88;
          color: #8ed6a3;
        }

        .ir-notifications .ir-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .ir-notifications .ir-stat {
          background: #202a25;
          border: 1px solid #303e36;
          border-radius: 13px;
          padding: 19px;
          min-width: 0;
        }

        .ir-notifications .ir-stat-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #91a097;
          font-size: 12px;
          gap: 8px;
        }

        .ir-notifications .ir-stat-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: #293c31;
          color: #83c998;
          border-radius: 9px;
        }

        .ir-notifications .ir-stat-value {
          font-size: 27px;
          font-weight: 700;
          margin-top: 13px;
          letter-spacing: -.7px;
        }

        .ir-notifications .ir-stat-caption {
          font-size: 11px;
          color: #718078;
          margin-top: 4px;
        }

        .ir-notifications .ir-filter-area {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .ir-notifications .ir-filter-title {
          font-size: 14px;
          font-weight: 650;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .ir-notifications .ir-filters {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }

        .ir-notifications .ir-filter {
          background: #202a25;
          border: 1px solid #344139;
          color: #91a097;
          padding: 8px 12px;
          border-radius: 7px;
          font-size: 11px;
          transition: .2s;
        }

        .ir-notifications .ir-filter.active {
          background: #294633;
          border-color: #4b825b;
          color: #a0dfb1;
        }

        .ir-notifications .ir-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ir-notifications .ir-notification {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          background: #202a25;
          border: 1px solid #303e36;
          border-radius: 12px;
          padding: 18px;
          transition: .2s;
        }

        .ir-notifications .ir-notification:hover {
          border-color: #496351;
          transform: translateY(-1px);
        }

        .ir-notifications .ir-notification.unread {
          background: linear-gradient(110deg, #24342b, #202a25);
          border-color: #3c5544;
        }

        .ir-notifications .ir-notification-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 11px;
          display: grid;
          place-items: center;
        }

        .ir-notifications .icon-high {
          color: #e8a17f;
          background: #4a302a;
        }

        .ir-notifications .icon-medium {
          color: #e3c17b;
          background: #463d29;
        }

        .ir-notifications .icon-low {
          color: #83c998;
          background: #294333;
        }

        .ir-notifications .ir-notification-content {
          flex: 1;
          min-width: 0;
        }

        .ir-notifications .ir-notification-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }

        .ir-notifications .ir-notification-heading strong {
          font-size: 13px;
          font-weight: 650;
        }

        .ir-notifications .ir-description {
          color: #93a198;
          font-size: 12px;
          line-height: 1.65;
          margin: 0;
        }

        .ir-notifications .ir-meta {
          display: flex;
          align-items: center;
          gap: 13px;
          flex-wrap: wrap;
          margin-top: 12px;
          color: #718078;
          font-size: 10px;
        }

        .ir-notifications .ir-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ir-notifications .ir-priority {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .5px;
          padding: 4px 7px;
          border-radius: 5px;
        }

        .ir-notifications .priority-high {
          color: #e8a17f;
          background: #4a302a;
        }

        .ir-notifications .priority-medium {
          color: #e3c17b;
          background: #463d29;
        }

        .ir-notifications .priority-low {
          color: #83c998;
          background: #294333;
        }

        .ir-notifications .ir-unread-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #7dcb91;
        }

        .ir-notifications .ir-actions {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ir-notifications .ir-icon-button {
          border: 0;
          background: transparent;
          color: #718078;
          padding: 7px;
          border-radius: 7px;
          transition: .2s;
        }

        .ir-notifications .ir-icon-button:hover {
          color: #a1d9b0;
          background: #304137;
        }

        .ir-notifications .ir-empty {
          padding: 55px 20px;
          text-align: center;
          border: 1px dashed #3a4a40;
          border-radius: 12px;
          color: #829087;
        }

        .ir-notifications .ir-empty-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 14px;
          display: grid;
          place-items: center;
          background: #293c31;
          color: #83c998;
          border-radius: 50%;
        }

        .ir-notifications .ir-empty strong {
          display: block;
          color: #dce8df;
          font-size: 14px;
          margin-bottom: 6px;
        }

        .ir-notifications .ir-empty p {
          font-size: 12px;
          margin: 0;
        }

        .ir-notifications .ir-footer-note {
          margin-top: 20px;
          padding: 13px 15px;
          border-radius: 9px;
          background: #1d2822;
          border: 1px solid #303e36;
          color: #829087;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .ir-notifications .ir-footer-note svg {
          color: #83c998;
          flex-shrink: 0;
        }

        @media (max-width: 700px) {
          .ir-notifications .ir-page-header {
            flex-direction: column;
          }

          .ir-notifications .ir-summary {
            gap: 9px;
          }

          .ir-notifications .ir-stat {
            padding: 13px;
          }

          .ir-notifications .ir-stat-value {
            font-size: 22px;
          }

          .ir-notifications .ir-stat-top {
            font-size: 10px;
          }

          .ir-notifications .ir-notification {
            padding: 13px;
            gap: 10px;
          }

          .ir-notifications .ir-notification-icon {
            width: 36px;
            height: 36px;
          }

          .ir-notifications .ir-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 420px) {
          .ir-notifications .ir-summary {
            grid-template-columns: 1fr 1fr;
          }

          .ir-notifications .ir-summary .ir-stat:last-child {
            grid-column: span 2;
          }
        }
      `}</style>

      <div className="ir-page-header">
        <div>
          <div className="ir-eyebrow">Central de monitoramento</div>
          <h1>Notificações</h1>
          <p className="ir-subtitle">
            Acompanhe os acontecimentos e alertas da sua propriedade.
          </p>
        </div>

        <button className="ir-mark-all" onClick={markAllAsRead}>
          <Check size={15} />
          Marcar todas como lidas
        </button>
      </div>

      <section className="ir-summary">
        <div className="ir-stat">
          <div className="ir-stat-top">
            Total de notificações
            <div className="ir-stat-icon"><Bell size={17} /></div>
          </div>
          <div className="ir-stat-value">{notifications.length}</div>
          <div className="ir-stat-caption">Registros disponíveis</div>
        </div>

        <div className="ir-stat">
          <div className="ir-stat-top">
            Não lidas
            <div className="ir-stat-icon"><AlertTriangle size={17} /></div>
          </div>
          <div className="ir-stat-value">{unreadCount}</div>
          <div className="ir-stat-caption">Precisam da sua atenção</div>
        </div>

        <div className="ir-stat">
          <div className="ir-stat-top">
            Alta prioridade
            <div className="ir-stat-icon"><ArrowUpRight size={17} /></div>
          </div>
          <div className="ir-stat-value">
            {notifications.filter((item) => item.priority === "Alta" && !item.read).length}
          </div>
          <div className="ir-stat-caption">Alertas prioritários não lidos</div>
        </div>
      </section>

      <section>
        <div className="ir-filter-area">
          <div className="ir-filter-title">
            <Filter size={16} color="#83c998" />
            Atividade recente
          </div>

          <div className="ir-filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`ir-filter ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
                {filter === "Não lidas" && unreadCount > 0 && (
                  <span style={{ marginLeft: 6 }}>({unreadCount})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="ir-list">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            const priorityClass =
              notification.priority === "Alta"
                ? "high"
                : notification.priority === "Média"
                  ? "medium"
                  : "low";

            return (
              <article
                key={notification.id}
                className={`ir-notification ${!notification.read ? "unread" : ""}`}
              >
                <div className={`ir-notification-icon icon-${priorityClass}`}>
                  <Icon size={19} />
                </div>

                <div className="ir-notification-content">
                  <div className="ir-notification-heading">
                    <strong>{notification.title}</strong>
                    <span className={`ir-priority priority-${priorityClass}`}>
                      {notification.priority}
                    </span>
                    {!notification.read && (
                      <span className="ir-unread-dot" title="Não lida" />
                    )}
                  </div>

                  <p className="ir-description">{notification.description}</p>

                  <div className="ir-meta">
                    <span><Clock3 size={12} />{notification.time}</span>
                    <span>{notification.category}</span>
                  </div>
                </div>

                <div className="ir-actions">
                  {!notification.read && (
                    <button
                      className="ir-icon-button"
                      title="Marcar como lida"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    className="ir-icon-button"
                    title="Remover notificação"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            );
          })}

          {filteredNotifications.length === 0 && (
            <div className="ir-empty">
              <div className="ir-empty-icon"><Bell size={22} /></div>
              <strong>Nenhuma notificação encontrada</strong>
              <p>Não há notificações nesta categoria no momento.</p>
            </div>
          )}
        </div>
      </section>

      <div className="ir-footer-note">
        <Info size={15} />
        As notificações exibidas são dados demonstrativos do protótipo IRRIGATEC.
      </div>
    </main>
  );
}
