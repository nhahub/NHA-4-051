const { useState, useEffect } = React;

// Data
const COMPLAINTS_DATA = [
  { id: 'SHK-2024-0012', title: 'إنارة الشوارع معطلة', category: 'كهرباء', categoryEn: 'Electricity', location: 'المعادي، القاهرة', date: 'قبل يومين', priority: 9.2, sentiment: 'negative', status: 'review', evidence: '📸', color: '#D4AF37' },
  { id: 'SHK-2024-0011', title: 'تراكم القمامة في الشارع', category: 'نظافة', categoryEn: 'Sanitation', location: 'حلوان، القاهرة', date: 'قبل 3 أيام', priority: 8.5, sentiment: 'negative', status: 'submitted', evidence: '🎥', color: '#2E8B57' },
  { id: 'SHK-2024-0010', title: 'حفرة خطيرة في الطريق', category: 'طرق', categoryEn: 'Roads', location: 'الدقي، الجيزة', date: 'قبل 4 أيام', priority: 7.8, sentiment: 'negative', status: 'progress', evidence: '📸', color: '#1B6B93' },
  { id: 'SHK-2024-0009', title: 'انقطاع المياه منذ أسبوع', category: 'مياه', categoryEn: 'Water', location: 'المنصورة، الدقهلية', date: 'قبل أسبوع', priority: 6.4, sentiment: 'neutral', status: 'progress', evidence: '—', color: '#E6A8D7' },
  { id: 'SHK-2024-0008', title: 'إصلاح حديقة المنطقة', category: 'خدمات عامة', categoryEn: 'Services', location: 'الإسكندرية', date: 'قبل أسبوعين', priority: 4.1, sentiment: 'neutral', status: 'resolved', evidence: '📸', color: '#2E8B57' },
  { id: 'SHK-2024-0007', title: 'ضوضاء ورشة قريبة', category: 'بيئة', categoryEn: 'Environment', location: 'مدينة نصر', date: 'قبل 5 أيام', priority: 5.3, sentiment: 'negative', status: 'submitted', evidence: '🎥', color: '#E6A8D7' },
];

const CATEGORIES = ['نظافة', 'طرق ومواصلات', 'مياه وصرف صحي', 'كهرباء', 'صحة', 'تعليم', 'خدمات حكومية', 'بيئة', 'أخرى'];
const CATEGORIES_EN = ['Sanitation', 'Roads & Transport', 'Water & Sewage', 'Electricity', 'Healthcare', 'Education', 'Gov. Services', 'Environment', 'Other'];

// Utils
function getSentiment(text) {
  const negative = ['معطل', 'خطير', 'سيء', 'مشكلة', 'ضعيف', 'broken', 'bad', 'terrible', 'horrible', 'dangerous', 'انقطع', 'تراكم', 'حفرة'];
  const positive = ['جيد', 'ممتاز', 'شكرا', 'رائع', 'good', 'great', 'excellent', 'thanks', 'resolved'];
  const txt = text.toLowerCase();
  if (negative.some(w => txt.includes(w))) return 'negative';
  if (positive.some(w => txt.includes(w))) return 'positive';
  if (text.length > 20) return 'neutral';
  return 'none';
}

function getSentimentDisplay(s, lang) {
  if (s === 'negative') return { emoji: '😠', label: lang === 'ar' ? 'سلبي' : 'Negative', color: '#DC2626' };
  if (s === 'positive') return { emoji: '😊', label: lang === 'ar' ? 'إيجابي' : 'Positive', color: '#2E8B57' };
  if (s === 'neutral') return { emoji: '😐', label: lang === 'ar' ? 'محايد' : 'Neutral', color: '#D4AF37' };
  return { emoji: '💬', label: lang === 'ar' ? 'اكتب شكواك...' : 'Start typing...', color: '#94a3b8' };
}

// Navbar
function Navbar({ page, setPage, lang, setLang }) {
  const t = {
    ar: { brand: 'شكوى', home: 'الرئيسية', register: 'تسجيل', login: 'دخول', submit: 'أبلغ عن مشكلة', dashboard: 'لوحتي', admin: 'الإدارة' },
    en: { brand: 'Shakwa', home: 'Home', register: 'Register', login: 'Login', submit: 'Report Issue', dashboard: 'My Dashboard', admin: 'Admin' }
  }[lang];
  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setPage('home')}>
        {t.brand} <span>| {lang === 'ar' ? 'صوتك مسموع' : 'Your Voice Heard'}</span>
      </div>
      <div className="nav-links">
        {page !== 'home' && <button className="nav-btn ghost" onClick={() => setPage('home')}>{t.home}</button>}
        {page !== 'dashboard' && <button className="nav-btn ghost" onClick={() => setPage('dashboard')}>{t.dashboard}</button>}
        {page !== 'admin' && <button className="nav-btn outline" onClick={() => setPage('admin')}>{t.admin}</button>}
        {page !== 'register' && <button className="nav-btn ghost" onClick={() => setPage('register')}>{t.register}</button>}
        {page !== 'submit' && <button className="nav-btn primary" onClick={() => setPage('submit')}>{t.submit}</button>}
        <button className="lang-toggle" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
          {lang === 'ar' ? 'EN' : 'ع'}
        </button>
      </div>
    </nav>
  );
}

// Homepage
function HomePage({ setPage, lang }) {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const targets = [12847, 94, 27];
    const steps = 60;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      setCount1(Math.round((targets[0] / steps) * frame));
      setCount2(Math.round((targets[1] / steps) * frame));
      setCount3(Math.round((targets[2] / steps) * frame));
      if (frame >= steps) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, []);

  const t = lang === 'ar' ? {
    badge: '🇪🇬 المبادرة الرقمية للحكومة المصرية',
    title1: 'شارك شكواك.',
    title2: 'ساهم في بناء',
    title3: 'مصر',
    sub: 'منصة ذكية تستخدم تعلم الآلة لتحليل شكاوى المواطنين وتحويلها إلى رؤى حقيقية لصانعي القرار.',
    cta1: 'أبلغ عن مشكلة',
    cta2: 'تعرف على المزيد',
    stat1: 'مشكلة تمت معالجتها', stat2: 'مواطن مشارك', stat3: 'جهة حكومية',
    how: 'كيف يعمل؟', howSub: 'ثلاث خطوات بسيطة للوصول إلى صانع القرار',
    feat: 'المميزات', featSub: 'نظام متكامل مدعوم بتقنيات الذكاء الاصطناعي',
    steps: [
      { num: '01', icon: '📝', title: 'قدم شكواك', desc: 'اكتب شكواك وأرفق الأدلة المرئية بسهولة تامة' },
      { num: '02', icon: '🤖', title: 'تحليل ذكي', desc: 'يحلل النظام النص ويحدد الأولوية والفئة تلقائياً' },
      { num: '03', icon: '📊', title: 'رؤى قابلة للتنفيذ', desc: 'تصل الشكوى للجهة المعنية بأعلى درجات الأولوية' }
    ],
    features: [
      { icon: '🆔', title: 'التحقق بالبطاقة الشخصية', desc: 'تسجيل آمن عبر الرقم القومي المصري ومطابقة الوجه' },
      { icon: '🤖', title: 'تصنيف ذكي بالـ ML', desc: 'تصنيف تلقائي للشكاوى وتحليل المشاعر فوري' },
      { icon: '📍', title: 'تتبع جغرافي', desc: 'خريطة تفاعلية لتحديد نقاط الساخنة' },
      { icon: '📸', title: 'رفع الأدلة', desc: 'صور وفيديوهات كأدلة قوية لدعم شكواك' },
      { icon: '📡', title: 'متابعة لحظية', desc: 'تتبع حالة شكواك خطوة بخطوة' },
      { icon: '🎤', title: 'إدخال صوتي', desc: 'قل شكواك بالكلام وسيتحول تلقائياً لنص' }
    ]
  } : {
    badge: '🇪🇬 Egyptian Government Digital Initiative',
    title1: 'Share Your Complaint.',
    title2: 'Help Build',
    title3: 'Egypt',
    sub: 'An AI-powered platform that analyzes citizen complaints using machine learning and turns them into actionable insights for decision-makers.',
    cta1: 'Report an Issue',
    cta2: 'Learn More',
    stat1: 'Issues Resolved', stat2: 'Citizens Active', stat3: 'Gov. Partners',
    how: 'How It Works', howSub: 'Three simple steps to reach the decision-maker',
    feat: 'Features', featSub: 'A complete system powered by artificial intelligence',
    steps: [
      { num: '01', icon: '📝', title: 'Submit Your Complaint', desc: 'Write your complaint and attach visual evidence easily' },
      { num: '02', icon: '🤖', title: 'Smart Analysis', desc: 'The system analyzes text and assigns priority and category automatically' },
      { num: '03', icon: '📊', title: 'Actionable Insights', desc: 'Your complaint reaches the right authority with highest priority' }
    ],
    features: [
      { icon: '🆔', title: 'National ID Verification', desc: 'Secure registration via Egyptian National ID with face matching' },
      { icon: '🤖', title: 'ML Smart Classification', desc: 'Automatic complaint classification and real-time sentiment analysis' },
      { icon: '📍', title: 'Geographic Tracking', desc: 'Interactive map to identify complaint hotspots' },
      { icon: '📸', title: 'Evidence Upload', desc: 'Photos and videos as strong evidence to support your complaint' },
      { icon: '📡', title: 'Live Tracking', desc: 'Follow your complaint status step by step' },
      { icon: '🎤', title: 'Voice Input', desc: 'Speak your complaint and it converts to text automatically' }
    ]
  };

  return (
    <div className="page page-transition">
      <section className="hero">
        <div className="hero-pattern" />
        <div className="hero-glow" />
        <div className="float-icon" style={{ top: '20%', right: '10%', animationDelay: '0s' }}>🏛️</div>
        <div className="float-icon" style={{ bottom: '25%', left: '8%', animationDelay: '1s' }}>🌊</div>
        <div className="float-icon" style={{ top: '40%', left: '5%', animationDelay: '2s', fontSize: '1.5rem' }}>⚙️</div>

        <div className="hero-badge">✦ {t.badge}</div>
        <h1 className="hero-title">
          {t.title1}<br />
          {t.title2} <span className="gold">{t.title3}</span>
        </h1>
        <p className="hero-sub">{t.sub}</p>
        <div className="hero-cta">
          <button className="btn-gold" onClick={() => setPage('submit')}>{t.cta1} →</button>
          <button className="btn-ghost-white" onClick={() => setPage('register')}>{t.cta2}</button>
        </div>
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-num">{count1.toLocaleString()}</div>
            <div className="stat-label">{t.stat1}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{count2}%</div>
            <div className="stat-label">{t.stat2}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{count3}</div>
            <div className="stat-label">{t.stat3}</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <span className="section-tag">⚡ {t.how}</span>
          <h2 className="section-title">{t.how}</h2>
          <p className="section-sub">{t.howSub}</p>
          <div className="how-grid">
            {t.steps.map((s, i) => (
              <div key={i} className="how-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="how-num">{s.num}</div>
                <div className="how-icon">{s.icon}</div>
                <div className="how-title">{s.title}</div>
                <div className="how-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--papyrus)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <span className="section-tag">🚀 {t.feat}</span>
          <h2 className="section-title">{t.feat}</h2>
          <p className="section-sub">{t.featSub}</p>
          <div className="features-grid">
            {t.features.map((f, i) => (
              <div key={i} className="feature-card fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, var(--nile-dark), var(--nile))', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.8rem' }}>
          {lang === 'ar' ? 'جاهز للبدء؟' : 'Ready to Start?'}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.8rem' }}>
          {lang === 'ar' ? 'سجّل الآن باستخدام رقمك القومي وابدأ في تقديم شكواك' : 'Register now using your National ID and start submitting complaints'}
        </p>
        <button className="btn-gold" onClick={() => setPage('register')}>
          {lang === 'ar' ? 'سجّل مجاناً ←' : 'Register Free →'}
        </button>
      </section>

      <footer className="footer">
        <div className="brand">شكوى | Shakwa</div>
        <p style={{ marginTop: '0.5rem' }}>
          {lang === 'ar' ? '© 2024 مشروع تخرج — جامعة مصر. جميع الحقوق محفوظة.' : '© 2024 Graduation Project — Egypt University. All Rights Reserved.'}
        </p>
      </footer>
    </div>
  );
}

// Registration
function RegisterPage({ setPage, lang }) {
  const [step, setStep] = useState(1);
  const [nationalId, setNationalId] = useState('');
  const [idError, setIdError] = useState('');
  const [idValid, setIdValid] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  const [selfieReady, setSelfieReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [governate, setGovernate] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const GOVS = ['القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحيرة', 'الشرقية', 'المنيا', 'أسيوط', 'الفيوم', 'سوهاج', 'قنا', 'أسوان', 'الأقصر'];
  const GOVS_EN = ['Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Beheira', 'Sharqia', 'Minya', 'Asyut', 'Faiyum', 'Sohag', 'Qena', 'Aswan', 'Luxor'];

  const validateId = (val) => {
    setNationalId(val);
    if (val.length === 14 && /^\d{14}$/.test(val)) {
      setIdError(''); setIdValid(true);
    } else if (val.length > 0) {
      setIdError(lang === 'ar' ? 'الرقم القومي يجب أن يكون 14 رقماً' : 'National ID must be 14 digits');
      setIdValid(false);
    } else { setIdError(''); setIdValid(false); }
  };

  const handleSelfie = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSelfieReady(true); }, 2200);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1800);
  };

  const t = lang === 'ar' ? {
    title: 'إنشاء حساب جديد',
    steps: ['الرقم القومي', 'التحقق', 'بيانات الحساب', 'مراجعة'],
    s1title: 'أدخل رقمك القومي',
    s1sub: 'سيتم استخدامه للتحقق من هويتك فقط ولن يُشارك مع أي جهة',
    s1label: 'الرقم القومي (14 رقماً)',
    s1hint: 'نصيحة: الأرقام الثلاثة الأولى تمثل تاريخ الميلاد',
    s2title: 'التحقق من الهوية',
    idUpload: 'صوّر بطاقتك الشخصية',
    selfieTitle: 'التقط صورة شخصية',
    selfieHint: 'يُرجى الابتسام 😊 للتحقق من أنك شخص حقيقي',
    s3title: 'أكمل بياناتك',
    nameLbl: 'الاسم الكامل',
    phoneLbl: 'رقم الهاتف',
    govLbl: 'المحافظة',
    passLbl: 'كلمة المرور',
    confirmLbl: 'تأكيد كلمة المرور',
    s4title: 'مراجعة البيانات',
    confirm: 'أقر بصحة المعلومات وأوافق على الشروط والأحكام',
    submit: 'إنشاء الحساب ✓',
    doneTitle: '🎉 تم إنشاء حسابك بنجاح!',
    doneSub: 'يمكنك الآن تقديم شكاواك',
    doneBtn: 'أبلغ عن مشكلة الآن →',
  } : {
    title: 'Create New Account',
    steps: ['National ID', 'Verification', 'Account Info', 'Review'],
    s1title: 'Enter Your National ID',
    s1sub: 'Used for identity verification only and will not be shared',
    s1label: 'National ID (14 digits)',
    s1hint: 'Tip: First 3 digits represent your birth date century',
    s2title: 'Identity Verification',
    idUpload: 'Capture Your ID Card',
    selfieTitle: 'Take a Selfie',
    selfieHint: 'Please smile 😊 to verify you\'re a real person',
    s3title: 'Complete Your Profile',
    nameLbl: 'Full Name',
    phoneLbl: 'Phone Number',
    govLbl: 'Governate',
    passLbl: 'Password',
    confirmLbl: 'Confirm Password',
    s4title: 'Review Your Information',
    confirm: 'I certify the information is accurate and agree to Terms & Conditions',
    submit: 'Create Account ✓',
    doneTitle: '🎉 Account Created Successfully!',
    doneSub: 'You can now submit your complaints',
    doneBtn: 'Report an Issue Now →',
  };

  if (done) return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--papyrus)', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'fadeUp 0.5s ease both' }}>🎉</div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>{t.doneTitle}</h2>
        <p style={{ color: 'var(--text-mid)', marginBottom: '2rem' }}>{t.doneSub}</p>
        <button className="btn-gold" style={{ marginLeft: '1rem' }} onClick={() => setPage('submit')}>{t.doneBtn}</button>
        <button onClick={() => setPage('dashboard')} style={{ marginTop: '1rem', display: 'block', width: '100%', padding: '0.7rem', background: 'transparent', border: '1.5px solid var(--nile)', borderRadius: '10px', color: 'var(--nile)', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer' }}>
          {lang === 'ar' ? 'الذهاب للوحة التحكم' : 'Go to Dashboard'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="page page-transition" style={{ background: 'var(--papyrus)', padding: '2rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: 620, margin: '2rem auto' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.3rem' }}>{t.title}</h2>
        <p style={{ color: 'var(--text-mid)', marginBottom: '2rem', fontSize: '0.9rem' }}>شكوى | Shakwa</p>

        <div className="steps-bar" style={{ marginBottom: '2.5rem' }}>
          {t.steps.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                <div className={`step-dot ${i + 1 < step ? 'done' : i + 1 === step ? 'active' : 'pending'}`}>
                  {i + 1 < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.68rem', color: i + 1 === step ? 'var(--nile)' : '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < t.steps.length - 1 && <div className={`step-line ${i + 1 < step ? 'done' : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="form-card" style={{ animation: 'stepPop 0.3s cubic-bezier(.22,.68,0,1.2) both' }}>
          {step === 1 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', fontSize: '1.2rem' }}>{t.s1title}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.8rem' }}>{t.s1sub}</p>
              <label className="form-label">{t.s1label}</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <input className={`form-input ${idError ? 'error' : ''}`} value={nationalId} onChange={e => validateId(e.target.value)} maxLength={14} placeholder="29801011234567" style={{ textAlign: 'center', letterSpacing: '3px', fontSize: '1.1rem', fontFamily: 'JetBrains Mono, monospace' }} />
                  {idError && <p style={{ color: 'var(--red)', fontSize: '0.78rem', marginTop: '0.3rem' }}>{idError}</p>}
                  {idValid && <p style={{ color: 'var(--green)', fontSize: '0.78rem', marginTop: '0.3rem' }}>✓ {lang === 'ar' ? 'رقم صالح' : 'Valid ID'}</p>}
                </div>
              </div>

              {idValid && (
                <div className="id-card-visual" style={{ marginTop: '1.2rem' }}>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{lang === 'ar' ? 'جمهورية مصر العربية — بطاقة الرقم القومي' : 'Arab Republic of Egypt — National ID'}</div>
                  <div className="id-card-num">{nationalId}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.3rem' }}>
                    {lang === 'ar' ? 'المحافظة: القاهرة' : 'Governate: Cairo'}
                  </div>
                </div>
              )}

              <div className="alert alert-info" style={{ marginTop: '1.2rem' }}>
                <span>ℹ️</span><span>{t.s1hint}</span>
              </div>
              <button className="btn-gold" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => idValid && setStep(2)} disabled={!idValid}>
                {lang === 'ar' ? 'التالي ←' : 'Next →'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', fontSize: '1.2rem' }}>{t.s2title}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.8rem' }}>
                {lang === 'ar' ? 'خطوتان للتحقق من هويتك بأمان تام' : 'Two steps to verify your identity securely'}
              </p>
              <div className="grid-2">
                <div>
                  <p style={{ fontWeight: 700, marginBottom: '0.8rem', fontSize: '0.9rem' }}>{t.idUpload}</p>
                  <div className={`upload-zone ${idUploaded ? 'drag' : ''}`} onClick={() => setIdUploaded(true)}>
                    {idUploaded ? (
                      <div>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
                        <p style={{ color: 'var(--green)', fontWeight: 700 }}>{lang === 'ar' ? 'تم التحميل' : 'Uploaded'}</p>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🪪</div>
                        <p style={{ fontWeight: 700, marginBottom: '0.3rem', fontSize: '0.88rem' }}>{lang === 'ar' ? 'انقر لالتقاط صورة البطاقة' : 'Click to capture ID photo'}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-mid)' }}>{lang === 'ar' ? 'تأكد من وضوح الصورة' : 'Ensure image is clear'}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: '0.8rem', fontSize: '0.9rem' }}>{t.selfieTitle}</p>
                  <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div className="selfie-circle" onClick={handleSelfie} style={{ cursor: 'pointer' }}>
                      <div className="selfie-pulse" />
                      {loading ? <div className="spinner" style={{ width: 50, height: 50 }} /> :
                        selfieReady ? '✅' : '📷'}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-mid)' }}>{t.selfieHint}</p>
                    {selfieReady && <p style={{ color: 'var(--green)', fontWeight: 700, fontSize: '0.82rem', marginTop: '0.3rem' }}>✓ {lang === 'ar' ? 'تم التحقق بنجاح' : 'Verified successfully'}</p>}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)' }}>
                  {lang === 'ar' ? '← رجوع' : '← Back'}
                </button>
                <button className="btn-gold" style={{ flex: 2 }} onClick={() => setStep(3)} disabled={!idUploaded || !selfieReady}>
                  {lang === 'ar' ? 'التالي ←' : 'Next →'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', fontSize: '1.2rem' }}>{t.s3title}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.8rem' }}>
                {lang === 'ar' ? 'أكمل بياناتك لإنشاء حسابك' : 'Complete your details to create your account'}
              </p>
              <div className="grid-2" style={{ marginBottom: '1rem' }}>
                <div>
                  <label className="form-label">{t.nameLbl}</label>
                  <input className="form-input" value={fullName} onChange={e => setFullName(e.target.value)} placeholder={lang === 'ar' ? 'فاطمة أحمد' : 'Fatma Ahmed'} />
                </div>
                <div>
                  <label className="form-label">{t.phoneLbl}</label>
                  <input className="form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="010XXXXXXXX" />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label">{t.govLbl}</label>
                <select className="form-select" value={governate} onChange={e => setGovernate(e.target.value)}>
                  <option value="">{lang === 'ar' ? 'اختر محافظتك' : 'Select your governate'}</option>
                  {GOVS.map((g, i) => <option key={i} value={g}>{lang === 'ar' ? g : GOVS_EN[i]}</option>)}
                </select>
              </div>
              <div className="grid-2">
                <div>
                  <label className="form-label">{t.passLbl}</label>
                  <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                </div>
                <div>
                  <label className="form-label">{t.confirmLbl}</label>
                  <input className={`form-input ${confirmPass && confirmPass !== password ? 'error' : ''}`} type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="••••••••" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)' }}>
                  {lang === 'ar' ? '← رجوع' : '← Back'}
                </button>
                <button className="btn-gold" style={{ flex: 2 }} onClick={() => setStep(4)} disabled={!fullName || !governate || !password || password !== confirmPass}>
                  {lang === 'ar' ? 'التالي ←' : 'Next →'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', fontSize: '1.2rem' }}>{t.s4title}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.8rem' }}>
                {lang === 'ar' ? 'تأكد من صحة بياناتك قبل الإرسال' : 'Verify your information before submitting'}
              </p>
              <div style={{ background: 'var(--papyrus)', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.2rem' }}>
                {[
                  [lang === 'ar' ? 'الرقم القومي' : 'National ID', nationalId.replace(/(\d{4})(\d{6})(\d{4})/, '$1-$2-$3')],
                  [lang === 'ar' ? 'الاسم الكامل' : 'Full Name', fullName],
                  [lang === 'ar' ? 'الهاتف' : 'Phone', phone],
                  [lang === 'ar' ? 'المحافظة' : 'Governate', governate],
                  [lang === 'ar' ? 'التحقق من الهوية' : 'ID Verification', '✅ ' + (lang === 'ar' ? 'تم التحقق' : 'Verified')],
                  [lang === 'ar' ? 'الصورة الشخصية' : 'Selfie', '✅ ' + (lang === 'ar' ? 'تم التحقق' : 'Verified')],
                ].map(([label, value], i) => (
                  <div key={i} className="review-row">
                    <span className="review-label">{label}</span>
                    <span className="review-value" style={{ fontFamily: i === 0 ? 'JetBrains Mono, monospace' : 'inherit' }}>{value}</span>
                  </div>
                ))}
              </div>
              <label className="checkbox-wrap" style={{ marginBottom: '1.5rem' }}>
                <input type="checkbox" className="checkbox-input" id="agree" />
                <span className="checkbox-text">{t.confirm}</span>
              </label>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button onClick={() => setStep(3)} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)' }}>
                  {lang === 'ar' ? '← رجوع' : '← Back'}
                </button>
                <button className="btn-gold" style={{ flex: 2 }} onClick={handleSubmit}>
                  {loading ? <span className="spinner" style={{ width: 20, height: 20, display: 'inline-block', borderWidth: 2 }} /> : t.submit}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Submit complaint
function SubmitPage({ setPage, lang }) {
  const [step, setStep] = useState(1);
  const [locationPinned, setLocationPinned] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [description, setDescription] = useState('');
  const [sentiment, setSentiment] = useState('none');
  const [evidence, setEvidence] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [refNum, setRefNum] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  useEffect(() => {
    setSentiment(getSentiment(description));
    if (description.length > 30 && Math.random() > 0.6) setDuplicateWarning(true);
    else setDuplicateWarning(false);
  }, [description]);

  const handleVoice = () => {
    setIsRecording(r => !r);
    if (!isRecording) {
      setTimeout(() => {
        setDescription(prev => prev + (lang === 'ar' ? ' الشارع مظلم تماماً منذ أسبوعين ولا توجد إنارة على الإطلاق' : ' The street has been completely dark for two weeks with no lighting at all'));
        setIsRecording(false);
      }, 3000);
    }
  };

  const addEvidence = (emoji) => {
    if (evidence.length < 5) setEvidence(prev => [...prev, emoji]);
  };

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRefNum('SHK-2024-' + String(Math.floor(Math.random() * 9000) + 1000));
      setDone(true);
    }, 2000);
  };

  const sentDisp = getSentimentDisplay(sentiment, lang);
  const cats = lang === 'ar' ? CATEGORIES : CATEGORIES_EN;
  const filteredCats = cats.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase()));
  const STEPS = lang === 'ar' ? ['الموقع', 'الفئة', 'التفاصيل', 'الأدلة', 'مراجعة'] : ['Location', 'Category', 'Details', 'Evidence', 'Review'];

  if (done) return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--papyrus)', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          {lang === 'ar' ? 'تم إرسال شكواك بنجاح!' : 'Complaint Submitted Successfully!'}
        </h2>
        <p style={{ color: 'var(--text-mid)', marginBottom: '1rem' }}>
          {lang === 'ar' ? 'رقم متابعتك:' : 'Your tracking number:'}
        </p>
        <div style={{ background: 'var(--dark)', color: 'var(--gold)', fontFamily: 'JetBrains Mono, monospace', fontSize: '1.4rem', fontWeight: 700, padding: '1rem 2rem', borderRadius: '12px', marginBottom: '2rem', letterSpacing: '2px' }}>
          {refNum}
        </div>
        <div className="alert alert-success" style={{ textAlign: 'right' }}>
          <span>🚀</span>
          <span>{lang === 'ar' ? 'شكواك ستُعالج خلال 48 ساعة. ستصلك إشعارات بكل تحديث.' : 'Your complaint will be processed within 48 hours. You\'ll receive notifications for every update.'}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
          <button className="btn-gold" style={{ flex: 1 }} onClick={() => setPage('dashboard')}>
            {lang === 'ar' ? 'تابع شكواي ←' : 'Track My Complaint →'}
          </button>
          <button onClick={() => { setStep(1); setDone(false); setDescription(''); setEvidence([]); setSelectedCategory(''); setLocationPinned(false); }}
            style={{ flex: 1, padding: '0.9rem', background: 'transparent', border: '1.5px solid var(--nile)', borderRadius: '12px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--nile)' }}>
            {lang === 'ar' ? '+ شكوى جديدة' : '+ New Complaint'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page page-transition" style={{ background: 'var(--sand)', padding: '2rem', minHeight: '100vh' }}>
      <div style={{ maxWidth: 680, margin: '2rem auto' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.3rem' }}>
          {lang === 'ar' ? 'تقديم شكوى جديدة' : 'Submit New Complaint'}
        </h2>
        <p style={{ color: 'var(--text-mid)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          {lang === 'ar' ? 'الخطوة ' + step + ' من 5' : `Step ${step} of 5`}
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <div className="progress-wrap">
            <div className="progress-fill" style={{ width: `${(step / 5) * 100}%`, background: `linear-gradient(90deg, var(--nile), var(--gold))` }} />
          </div>
          <div className="steps-bar" style={{ marginTop: '0.8rem' }}>
            {STEPS.map((s, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                  <div className={`step-dot ${i + 1 < step ? 'done' : i + 1 === step ? 'active' : 'pending'}`} style={{ width: 28, height: 28, fontSize: '0.75rem' }}>
                    {i + 1 < step ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: '0.62rem', color: i + 1 === step ? 'var(--nile)' : '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`step-line ${i + 1 < step ? 'done' : ''}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="form-card">
          {step === 1 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem' }}>{lang === 'ar' ? '📍 تحديد الموقع' : '📍 Select Location'}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{lang === 'ar' ? 'حدد مكان المشكلة على الخريطة أو أدخل العنوان' : 'Pin the location of the issue on the map or enter the address'}</p>
              <div className="map-placeholder" onClick={() => setLocationPinned(true)}>
                <div className="map-grid" />
                <div className="map-pin">{locationPinned ? '📍' : '🗺️'}</div>
                <p style={{ color: locationPinned ? 'var(--gold)' : '#64748b', fontWeight: 700, zIndex: 1, marginTop: '0.5rem', fontSize: '0.88rem' }}>
                  {locationPinned ? (lang === 'ar' ? '✓ تم تحديد الموقع — شارع التحرير، القاهرة' : '✓ Location pinned — Tahrir St., Cairo') : (lang === 'ar' ? 'انقر لتحديد الموقع' : 'Click to pin location')}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', alignItems: 'center' }}>
                <input className="form-input" style={{ flex: 1 }} placeholder={lang === 'ar' ? 'أو اكتب العنوان هنا...' : 'Or type address here...'} />
                <button style={{ padding: '0.75rem 1.2rem', background: 'var(--nile)', color: '#fff', border: 'none', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.85rem' }} onClick={() => setLocationPinned(true)}>
                  {lang === 'ar' ? '📡 موقعي' : '📡 My Location'}
                </button>
              </div>
              <button className="btn-gold" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setStep(2)} disabled={!locationPinned}>
                {lang === 'ar' ? 'التالي ←' : 'Next →'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem' }}>{lang === 'ar' ? '🏷️ نوع المشكلة' : '🏷️ Complaint Category'}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{lang === 'ar' ? 'اكتب لتصفية الفئات أو اختر مباشرة — الذكاء الاصطناعي سيساعدك!' : 'Type to filter or select directly — AI will help you!'}</p>
              <input className="form-input" value={categorySearch} onChange={e => setCategorySearch(e.target.value)} placeholder={lang === 'ar' ? 'ابحث عن فئة... (مثال: كهرباء)' : 'Search category... (e.g. electricity)'} />
              <div className="chips-wrap">
                {filteredCats.map((c, i) => (
                  <div key={i} className={`chip ${selectedCategory === c ? 'selected' : 'default'}`} onClick={() => setSelectedCategory(c)}>{c}</div>
                ))}
              </div>
              {selectedCategory && (
                <div className="alert alert-success" style={{ marginTop: '1rem' }}>
                  <span>🤖</span>
                  <span>{lang === 'ar' ? `الذكاء الاصطناعي اقترح: "${selectedCategory}" — هل هذا صحيح؟` : `AI Suggested: "${selectedCategory}" — Is this correct?`}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)' }}>
                  {lang === 'ar' ? '← رجوع' : '← Back'}
                </button>
                <button className="btn-gold" style={{ flex: 2 }} onClick={() => setStep(3)} disabled={!selectedCategory}>
                  {lang === 'ar' ? 'التالي ←' : 'Next →'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem' }}>{lang === 'ar' ? '✍️ وصف المشكلة' : '✍️ Describe the Problem'}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{lang === 'ar' ? 'كلما كانت التفاصيل أكثر، كانت المعالجة أسرع' : 'More details = faster processing'}</p>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <textarea
                  className="form-textarea"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={lang === 'ar' ? 'صف المشكلة بالتفصيل... (الحد الأدنى 10 أحرف)' : 'Describe the problem in detail... (minimum 10 characters)'}
                  style={{ flex: 1 }}
                />
                <button className={`voice-btn ${isRecording ? 'recording' : ''}`} onClick={handleVoice} title={lang === 'ar' ? 'إدخال صوتي' : 'Voice Input'}>
                  {isRecording ? '⏹' : '🎤'}
                </button>
              </div>
              <div style={{ display: 'flex', justify: 'space-between', marginTop: '0.3rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{description.length}/1000</span>
                {isRecording && <span style={{ fontSize: '0.75rem', color: 'var(--red)', fontWeight: 700, animation: 'pulse 1s infinite' }}>⏺ {lang === 'ar' ? 'جارٍ التسجيل...' : 'Recording...'}</span>}
              </div>

              {description.length > 0 && (
                <div className="sentiment-bar">
                  <span className="sentiment-emoji">{sentDisp.emoji}</span>
                  <div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-mid)', fontWeight: 600 }}>{lang === 'ar' ? 'نبرة الشكوى' : 'Complaint Tone'}</p>
                    <p className="sentiment-label" style={{ color: sentDisp.color }}>{sentDisp.label}</p>
                  </div>
                </div>
              )}

              {duplicateWarning && (
                <div className="alert alert-warning">
                  <span>⚠️</span>
                  <span>{lang === 'ar' ? '⚠️ 34 شخصاً أبلغوا عن مشكلة مماثلة في منطقتك — شكواك ستُضاف لمجموعة الشكاوى لتسريع المعالجة' : '⚠️ 34 people reported a similar issue in your area — your complaint will be grouped for faster processing'}</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)' }}>
                  {lang === 'ar' ? '← رجوع' : '← Back'}
                </button>
                <button className="btn-gold" style={{ flex: 2 }} onClick={() => setStep(4)} disabled={description.length < 10}>
                  {lang === 'ar' ? 'التالي ←' : 'Next →'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem' }}>{lang === 'ar' ? '📎 إضافة الأدلة (اختياري)' : '📎 Add Evidence (Optional)'}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{lang === 'ar' ? 'صور أو فيديوهات تساعد في معالجة شكواك أسرع (حتى 5 ملفات، 50 ميجا)' : 'Photos or videos help process your complaint faster (up to 5 files, 50MB)'}</p>
              <div
                className="upload-zone"
                onDragOver={e => e.preventDefault()}
                onClick={() => addEvidence(['📸', '🎥', '📷'][Math.floor(Math.random() * 3)])}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📁</div>
                <p style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{lang === 'ar' ? 'انقر أو اسحب الملفات هنا' : 'Click or drag files here'}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-mid)' }}>PNG, JPG, MP4 — {lang === 'ar' ? 'حتى 50 ميجا' : 'up to 50MB'}</p>
              </div>
              {evidence.length > 0 && (
                <div className="evidence-gallery">
                  {evidence.map((e, i) => (
                    <div key={i} className="evidence-thumb">
                      {e}
                      <button className="remove-btn" onClick={() => setEvidence(prev => prev.filter((_, j) => j !== i))}>×</button>
                    </div>
                  ))}
                </div>
              )}
              <p style={{ fontSize: '0.78rem', color: 'var(--text-mid)', marginTop: '0.8rem' }}>
                {evidence.length}/5 {lang === 'ar' ? 'ملفات' : 'files'}
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button onClick={() => setStep(3)} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)' }}>
                  {lang === 'ar' ? '← رجوع' : '← Back'}
                </button>
                <button className="btn-gold" style={{ flex: 2 }} onClick={() => setStep(5)}>
                  {lang === 'ar' ? 'التالي ←' : 'Next →'}
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem' }}>{lang === 'ar' ? '✅ مراجعة وتأكيد' : '✅ Review & Confirm'}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{lang === 'ar' ? 'راجع بياناتك قبل الإرسال النهائي' : 'Review your data before final submission'}</p>
              <div style={{ background: 'var(--papyrus)', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.2rem' }}>
                {[
                  [lang === 'ar' ? 'الموقع' : 'Location', lang === 'ar' ? '📍 شارع التحرير، القاهرة' : '📍 Tahrir St., Cairo'],
                  [lang === 'ar' ? 'الفئة' : 'Category', '🏷️ ' + selectedCategory],
                  [lang === 'ar' ? 'نبرة الشكوى' : 'Sentiment', sentDisp.emoji + ' ' + sentDisp.label],
                  [lang === 'ar' ? 'الأدلة' : 'Evidence', evidence.length + (lang === 'ar' ? ' ملفات' : ' files')],
                  [lang === 'ar' ? 'وصف المشكلة' : 'Description', description.slice(0, 80) + (description.length > 80 ? '...' : '')],
                ].map(([label, value], i) => (
                  <div key={i} className="review-row">
                    <span className="review-label">{label}</span>
                    <span className="review-value">{value}</span>
                  </div>
                ))}
              </div>
              <label className="checkbox-wrap" style={{ marginBottom: '1.5rem' }}>
                <input type="checkbox" className="checkbox-input" id="confirm-submit" />
                <span className="checkbox-text">{lang === 'ar' ? 'أقر بصحة المعلومات وأنها لا تحتوي على بيانات مضللة' : 'I certify the information is accurate and contains no misleading data'}</span>
              </label>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <button onClick={() => setStep(4)} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)' }}>
                  {lang === 'ar' ? '← رجوع' : '← Back'}
                </button>
                <button className="btn-gold" style={{ flex: 2, fontSize: '1rem' }} onClick={submit}>
                  {loading ? <span style={{ display: 'inline-block' }}>⏳</span> : (lang === 'ar' ? '🚀 إرسال الشكوى' : '🚀 Submit Complaint')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// User dashboard
function DashboardPage({ setPage, lang }) {
  const [activeTab, setActiveTab] = useState('all');
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const cols = lang === 'ar' ? [
    { id: 'submitted', title: 'مُقدمة', color: 'var(--nile)', badge: '#1B6B93' },
    { id: 'review', title: 'قيد المراجعة', color: 'var(--gold)', badge: '#D4AF37' },
    { id: 'progress', title: 'قيد التنفيذ', color: '#c084fc', badge: '#7c3aed' },
    { id: 'resolved', title: 'تم الحل', color: 'var(--green)', badge: '#2E8B57' },
  ] : [
    { id: 'submitted', title: 'Submitted', color: 'var(--nile)', badge: '#1B6B93' },
    { id: 'review', title: 'Under Review', color: 'var(--gold)', badge: '#D4AF37' },
    { id: 'progress', title: 'In Progress', color: '#c084fc', badge: '#7c3aed' },
    { id: 'resolved', title: 'Resolved', color: 'var(--green)', badge: '#2E8B57' },
  ];

  const filtered = activeTab === 'all' ? COMPLAINTS_DATA : COMPLAINTS_DATA.filter(c => c.status === activeTab);

  return (
    <div className="page page-transition" style={{ background: 'var(--papyrus)', minHeight: '100vh' }}>
      {showToast && (
        <div className="toast">
          📡 {lang === 'ar' ? 'تحديث: شكواك SHK-2024-0010 انتقلت إلى "قيد التنفيذ"' : 'Update: Your complaint SHK-2024-0010 moved to "In Progress"'}
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, var(--dark), var(--dark2))', padding: '2.5rem 2rem', paddingTop: '5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{lang === 'ar' ? '👋 مرحباً يعود,' : '👋 Welcome back,'}</p>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900 }}>{lang === 'ar' ? 'أندرو محمد' : 'Andrew Mohamed'}</h2>
            <p style={{ color: '#475569', fontSize: '0.82rem', marginTop: '0.2rem' }}>ID: 298010XXXXXXXX</p>
          </div>
          <button className="btn-gold" onClick={() => setPage('submit')}>
            {lang === 'ar' ? '+ شكوى جديدة' : '+ New Complaint'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: lang === 'ar' ? 'إجمالي الشكاوى' : 'Total Complaints', val: 6, icon: '📋', color: 'var(--nile)' },
            { label: lang === 'ar' ? 'قيد المراجعة' : 'Under Review', val: 1, icon: '🔍', color: 'var(--gold)' },
            { label: lang === 'ar' ? 'قيد التنفيذ' : 'In Progress', val: 2, icon: '⚙️', color: '#c084fc' },
            { label: lang === 'ar' ? 'تم الحل' : 'Resolved', val: 1, icon: '✅', color: 'var(--green)' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '1.2rem', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '10px', background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-mid)', fontWeight: 600 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[['all', lang === 'ar' ? 'الكل' : 'All'], ...cols.map(c => [c.id, c.title])].map(([id, title]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              padding: '0.4rem 1rem', borderRadius: '20px', border: '1.5px solid',
              borderColor: activeTab === id ? 'var(--nile)' : '#e2e8f0',
              background: activeTab === id ? 'var(--nile)' : '#fff',
              color: activeTab === id ? '#fff' : 'var(--text-mid)',
              fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem',
              transition: 'all 0.2s'
            }}>{title}</button>
          ))}
        </div>

        <div className="kanban-board">
          {cols.map(col => {
            const colComplaints = filtered.filter(c => c.status === col.id);
            return (
              <div key={col.id} className="kanban-col">
                <div className="kanban-col-header">
                  <span className="kanban-col-title" style={{ color: col.color }}>{col.title}</span>
                  <div className="kanban-badge" style={{ background: col.badge }}>{colComplaints.length}</div>
                </div>
                {colComplaints.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8', fontSize: '0.8rem' }}>
                    {lang === 'ar' ? 'لا توجد شكاوى' : 'No complaints'}
                  </div>
                ) : colComplaints.map(c => (
                  <div key={c.id} className="complaint-card">
                    <div className="card-category-chip" style={{ background: c.color + '15', color: c.color }}>{lang === 'ar' ? c.category : c.categoryEn}</div>
                    <div className="card-title">{c.title}</div>
                    <div className="card-meta">📍 {c.location}</div>
                    <div className="card-meta">🕒 {c.date}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                      <div className="card-priority" style={{ background: c.priority > 7 ? 'rgba(220,38,38,0.1)' : c.priority > 5 ? 'rgba(212,175,55,0.1)' : 'rgba(46,139,87,0.1)', color: c.priority > 7 ? 'var(--red)' : c.priority > 5 ? '#b07d0f' : 'var(--green)' }}>
                        🔥 {c.priority}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-mid)' }}>{c.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Admin dashboard
function AdminPage({ lang }) {
  const [activeNav, setActiveNav] = useState('overview');
  const [filterGov, setFilterGov] = useState('all');

  const navItems = lang === 'ar' ? [
    { id: 'overview', icon: '📊', label: 'نظرة عامة' },
    { id: 'complaints', icon: '📋', label: 'الشكاوى' },
    { id: 'analytics', icon: '📈', label: 'التحليلات' },
    { id: 'priority', icon: '🚨', label: 'الأولويات' },
    { id: 'settings', icon: '⚙️', label: 'الإعدادات' },
  ] : [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'complaints', icon: '📋', label: 'Complaints' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'priority', icon: '🚨', label: 'Priority Queue' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  const kpis = [
    { label: lang === 'ar' ? 'شكاوى اليوم' : 'Today\'s Complaints', val: '247', change: '+12%', color: 'var(--gold)', icon: '📋', up: true },
    { label: lang === 'ar' ? 'أولوية عالية' : 'High Priority', val: '34', change: '+3', color: 'var(--red)', icon: '🚨', up: true },
    { label: lang === 'ar' ? 'متوسط وقت المعالجة' : 'Avg. Resolution', val: '2.4d', change: '-18%', color: 'var(--green)', icon: '⏱', up: false },
    { label: lang === 'ar' ? 'معدل الرضا' : 'Satisfaction', val: '87%', change: '+5%', color: 'var(--nile-light)', icon: '⭐', up: true },
  ];

  const barData = [
    { label: lang === 'ar' ? 'نظافة' : 'Sanitation', val: 89, color: '#2E8B57' },
    { label: lang === 'ar' ? 'طرق' : 'Roads', val: 64, color: '#1B6B93' },
    { label: lang === 'ar' ? 'كهرباء' : 'Power', val: 54, color: '#D4AF37' },
    { label: lang === 'ar' ? 'مياه' : 'Water', val: 48, color: '#3aad6c' },
    { label: lang === 'ar' ? 'صحة' : 'Health', val: 32, color: '#E6A8D7' },
    { label: lang === 'ar' ? 'أخرى' : 'Other', val: 21, color: '#64748b' },
  ];
  const maxBar = Math.max(...barData.map(d => d.val));

  const priorityQueue = [
    { score: 9.4, title: lang === 'ar' ? 'كسر خط مياه رئيسي' : 'Major water pipe burst', location: lang === 'ar' ? 'الزيتون، القاهرة' : 'El Zeitoun, Cairo', cat: lang === 'ar' ? 'مياه' : 'Water', color: '#DC2626' },
    { score: 8.9, title: lang === 'ar' ? 'انهيار جزئي في طريق سريع' : 'Partial highway collapse', location: lang === 'ar' ? 'أكتوبر، الجيزة' : 'October City, Giza', cat: lang === 'ar' ? 'طرق' : 'Roads', color: '#DC2626' },
    { score: 8.2, title: lang === 'ar' ? 'انقطاع كهرباء يومان' : 'Power outage for 2 days', location: lang === 'ar' ? 'الإسكندرية' : 'Alexandria', cat: lang === 'ar' ? 'كهرباء' : 'Power', color: '#D4AF37' },
    { score: 7.8, title: lang === 'ar' ? 'تلوث مياه الشرب' : 'Drinking water contamination', location: lang === 'ar' ? 'المنصورة' : 'Mansoura', cat: lang === 'ar' ? 'صحة' : 'Health', color: '#D4AF37' },
  ];

  const donutData = [
    { label: lang === 'ar' ? 'سلبي' : 'Negative', val: 62, color: '#DC2626' },
    { label: lang === 'ar' ? 'محايد' : 'Neutral', val: 27, color: '#D4AF37' },
    { label: lang === 'ar' ? 'إيجابي' : 'Positive', val: 11, color: '#2E8B57' },
  ];
  const circumference = 2 * Math.PI * 40;
  let donutOffset = 0;

  return (
    <div className="page page-transition">
      <div className="admin-layout">
        <div className="admin-sidebar">
          <div className="sidebar-logo">⚙ {lang === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}</div>
          <div className="sidebar-section">{lang === 'ar' ? 'القائمة الرئيسية' : 'MAIN MENU'}</div>
          {navItems.map(item => (
            <div key={item.id} className={`sidebar-item ${activeNav === item.id ? 'active' : ''}`} onClick={() => setActiveNav(item.id)}>
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="divider" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
          <div className="sidebar-section">{lang === 'ar' ? 'الفلاتر' : 'FILTERS'}</div>
          <select style={{ width: '100%', padding: '0.6rem', background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94a3b8', fontFamily: 'Cairo', fontSize: '0.82rem', cursor: 'pointer' }} value={filterGov} onChange={e => setFilterGov(e.target.value)}>
            <option value="all">{lang === 'ar' ? 'كل المحافظات' : 'All Governates'}</option>
            {['القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية'].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <div className="sidebar-item" style={{ color: '#e2e8f0', background: 'rgba(212,175,55,0.1)' }}>
              <span className="icon">👤</span>
              <span>{lang === 'ar' ? 'أحمد — مدير' : 'Ahmed — Admin'}</span>
            </div>
          </div>
        </div>

        <div className="admin-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ color: '#e2e8f0', fontSize: '1.4rem', fontWeight: 900 }}>
                {navItems.find(n => n.id === activeNav)?.icon} {navItems.find(n => n.id === activeNav)?.label}
              </h2>
              <p style={{ color: '#475569', fontSize: '0.8rem' }}>
                {lang === 'ar' ? 'مركز تحليل الشكاوى — آخر تحديث: منذ دقيقتين' : 'Complaint Analytics Center — Last updated: 2 min ago'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ padding: '0.5rem 1rem', background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94a3b8', fontFamily: 'Cairo', fontSize: '0.82rem', cursor: 'pointer' }}>
                {lang === 'ar' ? '📥 تصدير CSV' : '📥 Export CSV'}
              </button>
              <button style={{ padding: '0.5rem 1rem', background: 'var(--nile)', border: 'none', borderRadius: '8px', color: '#fff', fontFamily: 'Cairo', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700 }}>
                {lang === 'ar' ? '🤖 إعادة تدريب ML' : '🤖 Retrain ML'}
              </button>
            </div>
          </div>

          <div className="kpi-grid">
            {kpis.map((k, i) => (
              <div key={i} className="kpi-card">
                <div className="kpi-icon">{k.icon}</div>
                <div className="kpi-label">{k.label}</div>
                <div className="kpi-value" style={{ color: k.color }}>{k.val}</div>
                <div className="kpi-change" style={{ color: k.up ? '#2E8B57' : '#2E8B57' }}>
                  {k.up ? '↑' : '↓'} {k.change}
                </div>
              </div>
            ))}
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-title">{lang === 'ar' ? '📊 الشكاوى حسب الفئة' : '📊 Complaints by Category'}</div>
              <div className="bar-chart">
                {barData.map((b, i) => (
                  <div key={i} className="bar-wrap">
                    <div className="bar-val">{b.val}</div>
                    <div className="bar" style={{ height: `${(b.val / maxBar) * 90}px`, background: `linear-gradient(180deg, ${b.color}, ${b.color}88)` }} />
                    <div className="bar-label">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title">{lang === 'ar' ? '😠 توزيع المشاعر' : '😠 Sentiment Distribution'}</div>
              <div className="donut-wrap">
                <svg className="donut-svg" viewBox="0 0 100 100" width="120" height="120">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--dark3)" strokeWidth="16" />
                  {donutData.map((d, i) => {
                    const dasharray = (d.val / 100) * circumference;
                    const el = (
                      <circle key={i} cx="50" cy="50" r="40" fill="none"
                        stroke={d.color} strokeWidth="16"
                        strokeDasharray={`${dasharray} ${circumference - dasharray}`}
                        strokeDashoffset={-donutOffset}
                        transform="rotate(-90 50 50)"
                        strokeLinecap="round"
                        className="score-ring"
                      />
                    );
                    donutOffset += dasharray;
                    return el;
                  })}
                  <text x="50" y="55" textAnchor="middle" fill="var(--gold)" fontSize="14" fontWeight="bold">62%</text>
                </svg>
                <div className="donut-legend">
                  {donutData.map((d, i) => (
                    <div key={i} className="legend-item">
                      <div className="legend-dot" style={{ background: d.color }} />
                      <span>{d.label}: <strong style={{ color: '#e2e8f0' }}>{d.val}%</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-title">{lang === 'ar' ? '🗺️ خريطة الكثافة — مصر' : '🗺️ Density Map — Egypt'}</div>
              <div className="egypt-map">
                <div style={{ color: '#475569', fontSize: '0.82rem', position: 'absolute', top: '0.8rem', left: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
                  {lang === 'ar' ? 'انقر محافظة للفلترة' : 'Click governate to filter'}
                </div>
                {[
                  { x: '48%', y: '28%', size: 80 },
                  { x: '44%', y: '30%', size: 60 },
                  { x: '25%', y: '20%', size: 50 },
                  { x: '55%', y: '35%', size: 40 },
                  { x: '50%', y: '45%', size: 30 },
                  { x: '52%', y: '55%', size: 20 },
                ].map((d, i) => (
                  <div key={i} className="map-heat-dot" style={{ left: d.x, top: d.y, width: d.size, height: d.size, transform: 'translate(-50%,-50%)' }} />
                ))}
                <div style={{ color: '#64748b', fontSize: '3rem', opacity: 0.15 }}>🗺️</div>
                <p style={{ color: '#475569', fontSize: '0.8rem', position: 'absolute', bottom: '0.8rem' }}>
                  {lang === 'ar' ? 'القاهرة: 247 شكوى | الجيزة: 128 | الإسكندرية: 94' : 'Cairo: 247 | Giza: 128 | Alexandria: 94'}
                </p>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title">{lang === 'ar' ? '📈 اتجاهات آخر 30 يوم' : '📈 Trends — Last 30 Days'}</div>
              <svg viewBox="0 0 300 100" style={{ width: '100%', height: 110 }}>
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B6B93" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#1B6B93" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,80 L30,65 L60,70 L90,50 L120,55 L150,35 L180,40 L210,25 L240,30 L270,15 L300,20" fill="none" stroke="#1B6B93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M0,80 L30,65 L60,70 L90,50 L120,55 L150,35 L180,40 L210,25 L240,30 L270,15 L300,20 L300,100 L0,100 Z" fill="url(#trendGrad)" />
                <path d="M0,90 L30,82 L60,85 L90,75 L120,72 L150,65 L180,68 L210,60 L240,62 L270,55 L300,58" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4,2" />
                <circle cx="270" cy="15" r="4" fill="#1B6B93" />
                <circle cx="270" cy="55" r="3" fill="#D4AF37" />
              </svg>
              <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.5rem' }}>
                <div className="legend-item"><div className="legend-dot" style={{ background: '#1B6B93' }} /><span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{lang === 'ar' ? 'الشكاوى' : 'Complaints'}</span></div>
                <div className="legend-item"><div className="legend-dot" style={{ background: '#D4AF37' }} /><span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{lang === 'ar' ? 'المحلولة' : 'Resolved'}</span></div>
              </div>
            </div>
          </div>

          <div className="chart-card" style={{ background: 'var(--dark2)' }}>
            <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ animation: 'pulse 1.5s infinite', color: 'var(--red)' }}>🔴</span>
              {lang === 'ar' ? 'الشكاوى ذات الأولوية القصوى' : 'Top Priority Complaints'}
            </div>
            {priorityQueue.map((p, i) => (
              <div key={i} className="priority-card">
                <div className="priority-score" style={{ background: p.color + '20', color: p.color, fontFamily: 'JetBrains Mono, monospace' }}>
                  {p.score}
                </div>
                <div className="priority-content">
                  <div className="priority-title">{p.title}</div>
                  <div className="priority-meta">📍 {p.location} · 🏷️ {p.cat}</div>
                </div>
                <div className="priority-thumb">{i % 2 === 0 ? '📸' : '🎥'}</div>
                <button style={{ padding: '0.4rem 0.8rem', background: 'var(--nile)', border: 'none', borderRadius: '8px', color: '#fff', fontFamily: 'Cairo', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {lang === 'ar' ? 'تعيين ←' : 'Assign →'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// App root
function App() {
  const [page, setPage] = useState('home');
  const [lang, setLang] = useState('ar');

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} lang={lang} />;
      case 'register': return <RegisterPage setPage={setPage} lang={lang} />;
      case 'submit': return <SubmitPage setPage={setPage} lang={lang} />;
      case 'dashboard': return <DashboardPage setPage={setPage} lang={lang} />;
      case 'admin': return <AdminPage lang={lang} />;
      default: return <HomePage setPage={setPage} lang={lang} />;
    }
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar page={page} setPage={setPage} lang={lang} setLang={setLang} />
      {renderPage()}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

