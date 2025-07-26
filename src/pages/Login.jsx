import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import depedLogo from "../assets/deped_logo.png";
import depedImage from "../assets/Logo-DepEd-1.png";
import bagongPilipinasLogo from "../assets/Bagong-Pilipinas-Logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Translations object
  const translations = {
    en: {
      title: "IABIDE",
      subtitle: "IMUS ADMINISTRATIVE BULLETIN FOR INTEGRATED DOCUMENT EXCHANGE",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot your password?",
      signIn: "Sign in",
      signingIn: "Signing in...",
      aboutUs: "About Us",
      citizensCharter: "Citizen's Charter",
      feedback: "Feedback",
      noAccount: "Don't have an account?",
      contactAdmin: "Contact administrator",
      copyright: "© SDO - Imus City 2025",
    },
    tl: {
      title: "IABIDE",
      subtitle: "IMUS ADMINISTRATIVE BULLETIN FOR INTEGRATED DOCUMENT EXCHANGE",
      emailLabel: "Email Address",
      emailPlaceholder: "Ilagay ang iyong email",
      passwordLabel: "Password",
      passwordPlaceholder: "Ilagay ang iyong password",
      rememberMe: "Tandaan ako",
      forgotPassword: "Nakalimutan ang password?",
      signIn: "Mag-sign in",
      signingIn: "Nag-sign in...",
      aboutUs: "Tungkol sa Amin",
      citizensCharter: "Citizen's Charter",
      feedback: "Feedback",
      noAccount: "Walang account?",
      contactAdmin: "Makipag-ugnayan sa administrator",
      copyright: "© SDO - Imus City 2025",
    },
    es: {
      title: "IABIDE",
      subtitle: "IMUS ADMINISTRATIVE BULLETIN FOR INTEGRATED DOCUMENT EXCHANGE",
      emailLabel: "Dirección de Correo",
      emailPlaceholder: "Ingrese su correo electrónico",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "Ingrese su contraseña",
      rememberMe: "Recuérdame",
      forgotPassword: "¿Olvidó su contraseña?",
      signIn: "Iniciar sesión",
      signingIn: "Iniciando sesión...",
      aboutUs: "Acerca de Nosotros",
      citizensCharter: "Carta de Ciudadanos",
      feedback: "Comentarios",
      noAccount: "¿No tiene cuenta?",
      contactAdmin: "Contactar administrador",
      copyright: "© SDO - Imus City 2025",
    },
    zh: {
      title: "IABIDE",
      subtitle: "IMUS ADMINISTRATIVE BULLETIN FOR INTEGRATED DOCUMENT EXCHANGE",
      emailLabel: "电子邮件地址",
      emailPlaceholder: "输入您的电子邮件",
      passwordLabel: "密码",
      passwordPlaceholder: "输入您的密码",
      rememberMe: "记住我",
      forgotPassword: "忘记密码？",
      signIn: "登录",
      signingIn: "正在登录...",
      aboutUs: "关于我们",
      citizensCharter: "公民宪章",
      feedback: "反馈",
      noAccount: "没有账户？",
      contactAdmin: "联系管理员",
      copyright: "© SDO - Imus City 2025",
    },
    ja: {
      title: "IABIDE",
      subtitle: "IMUS ADMINISTRATIVE BULLETIN FOR INTEGRATED DOCUMENT EXCHANGE",
      emailLabel: "メールアドレス",
      emailPlaceholder: "メールアドレスを入力してください",
      passwordLabel: "パスワード",
      passwordPlaceholder: "パスワードを入力してください",
      rememberMe: "ログイン情報を保存",
      forgotPassword: "パスワードを忘れた場合",
      signIn: "ログイン",
      signingIn: "ログイン中...",
      aboutUs: "私たちについて",
      citizensCharter: "市民憲章",
      feedback: "フィードバック",
      noAccount: "アカウントをお持ちでない場合",
      contactAdmin: "管理者にお問い合わせ",
      copyright: "© SDO - Imus City 2025",
    },
    ko: {
      title: "IABIDE",
      subtitle: "IMUS ADMINISTRATIVE BULLETIN FOR INTEGRATED DOCUMENT EXCHANGE",
      emailLabel: "이메일 주소",
      emailPlaceholder: "이메일을 입력하세요",
      passwordLabel: "비밀번호",
      passwordPlaceholder: "비밀번호를 입력하세요",
      rememberMe: "로그인 정보 저장",
      forgotPassword: "비밀번호를 잊으셨나요?",
      signIn: "로그인",
      signingIn: "로그인 중...",
      aboutUs: "회사 소개",
      citizensCharter: "시민 헌장",
      feedback: "피드백",
      noAccount: "계정이 없으신가요?",
      contactAdmin: "관리자에게 문의",
      copyright: "© SDO - Imus City 2025",
    },
  };

  const t = translations[currentLanguage];

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials
      if (
        formData.email === "admin@gmail.com" &&
        formData.password === "Admin@12345"
      ) {
        // Use auth context to login
        login(formData.email);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setErrors({
          general: "Invalid email or password. Please try again.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-indigo-600 rounded-full -ml-48 -mb-48"></div>
      </div>

      {/* Navigation Links - Top Left */}
      <div className="absolute top-6 left-6 flex space-x-6 z-10">
        <a
          href="/about-us"
          className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
        >
          {t.aboutUs}
        </a>
        <a
          href="https://wp.depedimuscity.com/?page_id=70"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
        >
          {t.citizensCharter}
        </a>
        <a
          href="https://csm.depedimuscity.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
        >
          {t.feedback}
        </a>
      </div>

      {/* Top Right Features */}
      <div className="absolute top-6 right-6 flex items-center space-x-4 z-10">
        {/* Language Selector */}
        <div className="relative group">
          <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors focus:outline-none">
            <span>
              {currentLanguage === "en"
                ? "English (UK)"
                : currentLanguage === "tl"
                ? "Filipino"
                : currentLanguage === "es"
                ? "Español"
                : currentLanguage === "zh"
                ? "中文"
                : currentLanguage === "ja"
                ? "日本語"
                : currentLanguage === "ko"
                ? "한국어"
                : "English (UK)"}
            </span>
            <svg
              className="h-3 w-3 text-gray-400 group-hover:text-gray-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
            <div className="py-2">
              <button
                onClick={() => handleLanguageChange("en")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                English (UK)
              </button>
              <button
                onClick={() => handleLanguageChange("tl")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Filipino
              </button>
              <button
                onClick={() => handleLanguageChange("es")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Español
              </button>
              <button
                onClick={() => handleLanguageChange("zh")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                中文
              </button>
              <button
                onClick={() => handleLanguageChange("ja")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                日本語
              </button>
              <button
                onClick={() => handleLanguageChange("ko")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                한국어
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logos - Bottom Right */}
      <div className="absolute bottom-6 right-6 flex items-center space-x-4 z-10">
        <img
          src={depedImage}
          alt="DepEd"
          className="h-12 w-auto object-contain"
        />
        <img
          src={bagongPilipinasLogo}
          alt="Bagong Pilipinas"
          className="h-16 w-auto object-contain"
        />
        <img
          src={depedLogo}
          alt="DepEd Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-6">
            <img
              src={depedLogo}
              alt="DepEd Logo"
              className="h-16 w-16 object-contain rounded-full"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h2>
          <p className="text-gray-700 mb-1">{t.subtitle}</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{errors.general}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t.emailLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder={t.emailPlaceholder}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t.passwordLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.password
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder={t.passwordPlaceholder}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  {t.rememberMe}
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  {t.forgotPassword}
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t.signingIn}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    {t.signIn}
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">{t.copyright}</p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">
            {t.noAccount}{" "}
            <a
              href="#"
              className="font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t.contactAdmin}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
