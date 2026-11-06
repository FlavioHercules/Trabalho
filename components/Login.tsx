
import { useState } from "react";
import {
  Sprout,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Droplets,
  Leaf,
  Activity,
} from "lucide-react";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onLogin();
  }

  return (
    <main className="ir-login">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .ir-login {
          min-height: 100vh;
          width: 100%;
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          background: #111915;
          color: #edf3ef;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        .ir-login * {
          box-sizing: border-box;
        }

        .ir-login .login-visual {
          position: relative;
          min-height: 100vh;
          padding: 42px 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(10,23,15,.25), rgba(10,23,15,.93)),
            linear-gradient(90deg, rgba(12,25,17,.5), transparent),
            url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1500&q=85')
            center / cover;
        }

        .ir-login .login-visual::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(65,111,68,.18), transparent 60%);
          pointer-events: none;
        }

        .ir-login .login-brand,
        .ir-login .login-visual-content,
        .ir-login .login-visual-footer {
          position: relative;
          z-index: 1;
        }

        .ir-login .login-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ir-login .login-brand-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: #75bd89;
          color: #15251a;
        }

        .ir-login .login-brand-name {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -.6px;
        }

        .ir-login .login-brand-name span {
          color: #8ed6a3;
        }

        .ir-login .login-visual-content {
          max-width: 530px;
          margin-bottom: 35px;
        }

        .ir-login .visual-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(173,218,182,.35);
          background: rgba(28,57,37,.48);
          backdrop-filter: blur(10px);
          color: #b8e1c1;
          padding: 8px 12px;
          border-radius: 30px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 23px;
        }

        .ir-login .visual-tag span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #80d295;
          box-shadow: 0 0 10px #80d295;
        }

        .ir-login .login-visual-content h1 {
          font-size: clamp(35px, 4vw, 55px);
          line-height: 1.08;
          letter-spacing: -2px;
          font-weight: 700;
          margin: 0;
          max-width: 520px;
        }

        .ir-login .login-visual-content h1 span {
          color: #8ed6a3;
        }

        .ir-login .login-visual-content p {
          color: #c2d0c4;
          font-size: 14px;
          line-height: 1.8;
          max-width: 420px;
          margin-top: 20px;
        }

        .ir-login .visual-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 35px;
          max-width: 470px;
        }

        .ir-login .visual-metric {
          background: rgba(18,34,23,.58);
          border: 1px solid rgba(194,221,199,.18);
          backdrop-filter: blur(12px);
          border-radius: 11px;
          padding: 14px;
        }

        .ir-login .visual-metric svg {
          color: #8ed6a3;
          margin-bottom: 10px;
        }

        .ir-login .visual-metric strong {
          display: block;
          font-size: 12px;
        }

        .ir-login .visual-metric small {
          display: block;
          color: #a9b9ab;
          font-size: 9px;
          margin-top: 5px;
        }

        .ir-login .login-visual-footer {
          color: #a7b8a9;
          font-size: 10px;
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }

        .ir-login .login-form-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 45px 35px;
          position: relative;
        }

        .ir-login .login-form-container {
          width: 100%;
          max-width: 390px;
        }

        .ir-login .mobile-brand {
          display: none;
        }

        .ir-login .form-eyebrow {
          color: #83c998;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.7px;
          margin-bottom: 12px;
        }

        .ir-login .login-form-container h2 {
          font-size: 30px;
          letter-spacing: -1px;
          margin: 0;
          font-weight: 700;
        }

        .ir-login .form-description {
          color: #899991;
          font-size: 12px;
          line-height: 1.7;
          margin: 10px 0 32px;
        }

        .ir-login .form-group {
          margin-bottom: 19px;
        }

        .ir-login .form-group label {
          display: block;
          color: #bdc9c0;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 9px;
        }

        .ir-login .input-wrapper {
          height: 48px;
          border: 1px solid #39483e;
          background: #1b251f;
          border-radius: 9px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          gap: 11px;
          transition: .2s;
        }

        .ir-login .input-wrapper:focus-within {
          border-color: #75bd89;
          box-shadow: 0 0 0 3px rgba(117,189,137,.1);
        }

        .ir-login .input-wrapper > svg {
          color: #829589;
          flex-shrink: 0;
        }

        .ir-login .input-wrapper input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #edf3ef;
          font-size: 12px;
          font-family: inherit;
        }

        .ir-login .input-wrapper input::placeholder {
          color: #68766d;
        }

        .ir-login .password-toggle {
          display: grid;
          place-items: center;
          border: none;
          background: transparent;
          color: #829589;
          cursor: pointer;
          padding: 4px;
        }

        .ir-login .password-toggle:hover {
          color: #a5d9b1;
        }

        .ir-login .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin: 4px 0 25px;
        }

        .ir-login .remember-option {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #9ca99f;
          font-size: 10px;
          cursor: pointer;
        }

        .ir-login .remember-option input {
          accent-color: #75bd89;
          width: 14px;
          height: 14px;
          cursor: pointer;
        }

        .ir-login .forgot-link {
          color: #8ed6a3;
          font-size: 10px;
          text-decoration: none;
        }

        .ir-login .forgot-link:hover {
          text-decoration: underline;
        }

        .ir-login .login-submit {
          width: 100%;
          height: 49px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          border-radius: 9px;
          background: #75bd89;
          color: #14251a;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: .2s;
        }

        .ir-login .login-submit:hover {
          background: #91d5a4;
          transform: translateY(-1px);
        }

        .ir-login .login-divider {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #65746a;
          font-size: 10px;
          margin: 25px 0;
        }

        .ir-login .login-divider::before,
        .ir-login .login-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #344139;
        }

        .ir-login .demo-button {
          width: 100%;
          height: 46px;
          border: 1px solid #3d5043;
          background: #202a25;
          color: #b8d5bf;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: .2s;
        }

        .ir-login .demo-button:hover {
          border-color: #75bd89;
          background: #26372c;
        }

        .ir-login .login-security {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          color: #718078;
          font-size: 10px;
          margin-top: 27px;
        }

        .ir-login .login-security svg {
          color: #83c998;
        }

        .ir-login .login-bottom {
          position: absolute;
          bottom: 20px;
          color: #637168;
          font-size: 9px;
          text-align: center;
        }

        @media(max-width: 900px) {
          .ir-login {
            grid-template-columns: .85fr 1.15fr;
          }

          .ir-login .login-visual {
            padding: 32px;
          }

          .ir-login .login-form-side {
            padding: 35px 25px;
          }

          .ir-login .visual-metrics {
            grid-template-columns: 1fr;
            max-width: 210px;
          }

          .ir-login .visual-metric {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
          }

          .ir-login .visual-metric svg {
            margin: 0;
          }
        }

        @media(max-width: 650px) {
          .ir-login {
            display: block;
            min-height: 100vh;
          }

          .ir-login .login-visual {
            display: none;
          }

          .ir-login .login-form-side {
            min-height: 100vh;
            padding: 35px 23px 55px;
          }

          .ir-login .mobile-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 50px;
          }

          .ir-login .mobile-brand .login-brand-icon {
            width: 38px;
            height: 38px;
          }

          .ir-login .mobile-brand strong {
            font-size: 16px;
          }

          .ir-login .login-form-container h2 {
            font-size: 27px;
          }

          .ir-login .login-bottom {
            bottom: 15px;
            width: 100%;
            left: 0;
          }
        }
      `}</style>

      <section className="login-visual">
        <div className="login-brand">
          <div className="login-brand-icon">
            <Sprout size={25} />
          </div>
          <div className="login-brand-name">
            IRRIGA<span>TEC</span>
          </div>
        </div>

        <div className="login-visual-content">
          <div className="visual-tag">
            <span />
            Tecnologia para o campo
          </div>

          <h1>
            Cultivar melhor começa com <span>decisões inteligentes.</span>
          </h1>

          <p>
            Monitore sua propriedade, acompanhe as condições do solo e
            otimize o uso da água com uma gestão agrícola mais eficiente.
          </p>

          <div className="visual-metrics">
            <div className="visual-metric">
              <Droplets size={19} />
              <div>
                <strong>Gestão hídrica</strong>
                <small>Uso consciente da água</small>
              </div>
            </div>

            <div className="visual-metric">
              <Activity size={19} />
              <div>
                <strong>Monitoramento</strong>
                <small>Dados em acompanhamento</small>
              </div>
            </div>

            <div className="visual-metric">
              <Leaf size={19} />
              <div>
                <strong>Inteligência agrícola</strong>
                <small>Decisões orientadas por dados</small>
              </div>
            </div>
          </div>
        </div>

        <div className="login-visual-footer">
          <span>IRRIGATEC · Gestão agrícola inteligente</span>
          <span>© 2026</span>
        </div>
      </section>

      <section className="login-form-side">
        <div className="login-form-container">
          <div className="mobile-brand">
            <div className="login-brand-icon">
              <Sprout size={22} />
            </div>
            <strong>IRRIGATEC</strong>
          </div>

          <div className="form-eyebrow">Bem-vindo de volta</div>
          <h2>Acesse sua conta</h2>
          <p className="form-description">
            Entre na plataforma para acompanhar sua propriedade e gerenciar
            suas atividades agrícolas.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="login-email">E-mail</label>
              <div className="input-wrapper">
                <Mail size={17} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Senha</label>
              <div className="input-wrapper">
                <Lock size={17} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Manter conectado
              </label>

              <a
                href="#recuperar-senha"
                className="forgot-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Recuperação de senha ainda não implementada.");
                }}
              >
                Esqueceu a senha?
              </a>
            </div>

            <button type="submit" className="login-submit">
              Entrar na demonstração
              <ArrowRight size={17} />
            </button>
          </form>

          <div className="login-divider">ou</div>

          <button
            className="demo-button"
            onClick={() => {
              setEmail("demo@irrigatec.com");
              setPassword("demo123");
            }}
          >
            Preencher acesso de demonstração
          </button>

          <div className="login-security">
            <ShieldCheck size={15} />
            Ambiente demonstrativo · Autenticação não conectada
          </div>
        </div>

        <div className="login-bottom">
          IRRIGATEC · Todos os direitos reservados · 2026
        </div>
      </section>
    </main>
  );
}
