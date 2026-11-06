
import { useState } from "react";
import {
  MessageCircle,
  CalendarDays,
  Headphones,
  ChevronDown,
  ChevronRight,
  Search,
  Send,
  Clock,
  CheckCircle2,
  Sprout,
  Droplets,
  Cpu,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";

const faqs = [
  {
    category: "Irrigação",
    question: "Como saber o momento adequado para irrigar?",
    answer:
      "O acompanhamento da umidade do solo, das condições climáticas e das necessidades da cultura ajuda a identificar o momento mais adequado para realizar a irrigação.",
  },
  {
    category: "Sensores",
    question: "Qual é a função dos sensores no sistema?",
    answer:
      "Os sensores permitem acompanhar informações como umidade e temperatura do solo, fornecendo dados importantes para o gerenciamento da irrigação.",
  },
  {
    category: "Talhões",
    question: "Posso acompanhar diferentes áreas de cultivo?",
    answer:
      "Sim. A plataforma foi projetada para organizar os talhões individualmente, permitindo acompanhar as características e condições de cada área.",
  },
  {
    category: "Plataforma",
    question: "Como o IRRIGATEC pode ajudar a economizar água?",
    answer:
      "A proposta é reunir informações do solo e do clima para auxiliar no planejamento da irrigação, evitando aplicações desnecessárias de água.",
  },
  {
    category: "Consultoria",
    question: "Posso receber orientação de um especialista?",
    answer:
      "Sim. Você pode solicitar uma consultoria para esclarecer dúvidas e receber orientações relacionadas ao gerenciamento da irrigação agrícola.",
  },
];

export default function Consultoria() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [category, setCategory] = useState("Todas");
  const [sent, setSent] = useState(false);

  const filteredFaqs = faqs.filter(
    (faq) => category === "Todas" || faq.category === category
  );

  return (
    <div className="consult-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .consult-page {
          font-family: 'DM Sans', sans-serif;
          color: #edf4ef;
          width: 100%;
        }

        .consult-page * { box-sizing: border-box; }

        .consult-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 24px;
        }

        .consult-header h1 {
          font-size: 27px;
          margin: 0 0 7px;
          letter-spacing: -.8px;
        }

        .consult-header p {
          color: #8e9e94;
          font-size: 13px;
          margin: 0;
        }

        .consult-status {
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

        .consult-hero {
          background: linear-gradient(115deg, #254b35, #1d3429 65%, #202d28);
          border: 1px solid #42644a;
          border-radius: 15px;
          padding: 27px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .consult-hero-content { max-width: 620px; }

        .consult-hero-label {
          color: #a9d8b4;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .consult-hero h2 {
          font-size: 23px;
          line-height: 1.35;
          margin: 0 0 10px;
        }

        .consult-hero p {
          color: #b1c8b7;
          font-size: 12px;
          line-height: 1.7;
          margin: 0;
        }

        .consult-hero-icon {
          width: 76px;
          height: 76px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          color: #a6d9b3;
          background: #ffffff12;
          border: 1px solid #ffffff20;
          border-radius: 22px;
        }

        .consult-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr);
          gap: 18px;
          align-items: start;
        }

        .consult-card {
          background: #202a27;
          border: 1px solid #303d37;
          border-radius: 13px;
          padding: 20px;
          min-width: 0;
        }

        .consult-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 17px;
        }

        .consult-section-title h3 {
          font-size: 15px;
          margin: 0;
        }

        .consult-icon {
          width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          background: #2d4538;
          color: #83c995;
          border-radius: 9px;
        }

        .consult-subtitle {
          color: #87988d;
          font-size: 11px;
          margin: -8px 0 17px 45px;
        }

        .consult-filters {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .consult-filter {
          border: 1px solid #38473e;
          background: #19221f;
          color: #a5b4aa;
          border-radius: 20px;
          padding: 7px 11px;
          font-size: 10px;
          cursor: pointer;
          font-family: inherit;
        }

        .consult-filter.active {
          background: #315b3e;
          color: #b6e4c0;
          border-color: #507d5b;
        }

        .consult-faq {
          border: 1px solid #303d37;
          background: #19221f;
          border-radius: 10px;
          margin-bottom: 9px;
          overflow: hidden;
        }

        .consult-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: transparent;
          border: 0;
          color: #e2ebe4;
          padding: 15px;
          text-align: left;
          font: inherit;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .consult-question svg {
          color: #83c995;
          flex-shrink: 0;
        }

        .consult-answer {
          color: #98a99e;
          font-size: 11px;
          line-height: 1.7;
          padding: 0 15px 15px;
        }

        .consult-form {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .consult-field label {
          display: block;
          color: #a8b7ad;
          font-size: 10px;
          font-weight: 600;
          margin-bottom: 7px;
        }

        .consult-field input,
        .consult-field select,
        .consult-field textarea {
          width: 100%;
          background: #19221f;
          border: 1px solid #38473e;
          border-radius: 8px;
          padding: 11px 12px;
          color: #e4eee6;
          font: inherit;
          font-size: 11px;
          outline: none;
        }

        .consult-field input:focus,
        .consult-field select:focus,
        .consult-field textarea:focus {
          border-color: #73b987;
        }

        .consult-field input::placeholder,
        .consult-field textarea::placeholder {
          color: #718178;
        }

        .consult-field textarea {
          resize: vertical;
          min-height: 85px;
        }

        .consult-field select option {
          background: #19221f;
        }

        .consult-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          background: #68a978;
          color: #102018;
          border: 0;
          border-radius: 8px;
          padding: 12px;
          font: inherit;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: .2s;
        }

        .consult-submit:hover {
          background: #83c995;
        }

        .consult-info {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          background: #233b31;
          border: 1px solid #385a43;
          border-radius: 9px;
          padding: 12px;
          color: #a6cbb0;
          font-size: 10px;
          line-height: 1.6;
          margin-top: 15px;
        }

        .consult-bottom {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 13px;
          margin-top: 18px;
        }

        .consult-feature {
          background: #202a27;
          border: 1px solid #303d37;
          border-radius: 11px;
          padding: 16px;
        }

        .consult-feature svg {
          color: #83c995;
          margin-bottom: 10px;
        }

        .consult-feature strong {
          display: block;
          font-size: 11px;
          margin-bottom: 5px;
        }

        .consult-feature p {
          color: #89998f;
          font-size: 10px;
          line-height: 1.5;
          margin: 0;
        }

        .consult-success {
          text-align: center;
          padding: 25px 10px;
          color: #a9d8b4;
        }

        .consult-success h3 {
          color: #edf4ef;
          font-size: 16px;
          margin: 12px 0 7px;
        }

        .consult-success p {
          color: #91a197;
          font-size: 11px;
          line-height: 1.6;
        }

        @media(max-width: 900px) {
          .consult-grid { grid-template-columns: 1fr; }
        }

        @media(max-width: 600px) {
          .consult-header h1 { font-size: 23px; }
          .consult-hero { padding: 19px; }
          .consult-hero h2 { font-size: 19px; }
          .consult-hero-icon { width: 55px; height: 55px; }
          .consult-bottom { grid-template-columns: 1fr; }
          .consult-card { padding: 15px; }
        }
      `}</style>

      <header className="consult-header">
        <div>
          <h1>Atendimento e Consultoria</h1>
          <p>Estamos aqui para ajudar você a cuidar melhor da sua produção.</p>
        </div>

        <div className="consult-status">
          <Headphones size={15} />
          Central de atendimento
        </div>
      </header>

      <section className="consult-hero">
        <div className="consult-hero-content">
          <div className="consult-hero-label">
            IRRIGATEC • SUPORTE AO PRODUTOR
          </div>
          <h2>Tem dúvidas sobre sua irrigação? Conte com a gente.</h2>
          <p>
            Encontre respostas para suas principais dúvidas ou solicite
            uma consultoria especializada para receber orientações
            sobre o gerenciamento da irrigação agrícola.
          </p>
        </div>

        <div className="consult-hero-icon">
          <MessageCircle size={36} />
        </div>
      </section>

      <section className="consult-grid">
        <div className="consult-card">
          <div className="consult-section-title">
            <div className="consult-icon">
              <MessageCircle size={18} />
            </div>
            <h3>Tire suas dúvidas</h3>
          </div>

          <p className="consult-subtitle">
            Confira respostas para perguntas frequentes.
          </p>

          <div className="consult-filters">
            {["Todas", "Irrigação", "Sensores", "Talhões", "Plataforma", "Consultoria"].map(
              (item) => (
                <button
                  key={item}
                  className={`consult-filter ${category === item ? "active" : ""}`}
                  onClick={() => {
                    setCategory(item);
                    setOpenFaq(null);
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>

          {filteredFaqs.map((faq) => {
            const index = faqs.indexOf(faq);
            const isOpen = openFaq === index;

            return (
              <div className="consult-faq" key={faq.question}>
                <button
                  className="consult-question"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  {faq.question}
                  {isOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {isOpen && (
                  <div className="consult-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <p className="consult-answer">Nenhuma pergunta encontrada.</p>
          )}
        </div>

        <div className="consult-card">
          <div className="consult-section-title">
            <div className="consult-icon">
              <CalendarDays size={18} />
            </div>
            <h3>Agende uma consultoria</h3>
          </div>

          <p className="consult-subtitle">
            Solicite atendimento com um especialista.
          </p>

          {sent ? (
            <div className="consult-success">
              <CheckCircle2 size={42} />
              <h3>Solicitação registrada!</h3>
              <p>
                Sua solicitação foi demonstrada com sucesso.
                Em uma versão operacional, nossa equipe entraria
                em contato para confirmar o atendimento.
              </p>
              <button
                className="consult-submit"
                onClick={() => setSent(false)}
              >
                Nova solicitação
              </button>
            </div>
          ) : (
            <form
              className="consult-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="consult-field">
                <label>Nome completo</label>
                <input required placeholder="Digite seu nome" />
              </div>

              <div className="consult-field">
                <label>E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                />
              </div>

              <div className="consult-field">
                <label>Telefone / WhatsApp</label>
                <input required placeholder="(00) 00000-0000" />
              </div>

              <div className="consult-field">
                <label>Assunto da consultoria</label>
                <select required defaultValue="">
                  <option value="" disabled>Selecione um assunto</option>
                  <option>Planejamento da irrigação</option>
                  <option>Monitoramento do solo</option>
                  <option>Uso de sensores</option>
                  <option>Gestão de talhões</option>
                  <option>Economia de água</option>
                  <option>Outros assuntos</option>
                </select>
              </div>

              <div className="consult-field">
                <label>Descreva sua dúvida</label>
                <textarea
                  placeholder="Conte um pouco sobre o que você precisa..."
                />
              </div>

              <button type="submit" className="consult-submit">
                Solicitar consultoria
                <Send size={14} />
              </button>
            </form>
          )}

          <div className="consult-info">
            <Clock size={16} />
            <span>
              Após a solicitação, a equipe poderá entrar em contato
              para combinar o melhor horário de atendimento.
            </span>
          </div>
        </div>
      </section>

      <section className="consult-bottom">
        <div className="consult-feature">
          <Sprout size={21} />
          <strong>Orientação agrícola</strong>
          <p>Informações para apoiar o manejo e o planejamento da produção.</p>
        </div>

        <div className="consult-feature">
          <Droplets size={21} />
          <strong>Gestão da irrigação</strong>
          <p>Suporte para compreender melhor o uso dos recursos hídricos.</p>
        </div>

        <div className="consult-feature">
          <User size={21} />
          <strong>Atendimento especializado</strong>
          <p>Um canal para esclarecer dúvidas e solicitar orientação.</p>
        </div>A
      </section>
    </div>
  );
}
