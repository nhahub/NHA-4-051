/* global React, ReactDOM */

const { useEffect, useRef, useState, useCallback } = React;

function HomePage({ lang }) {
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
    badge: 'المبادرة الرقمية للحكومة المصرية',
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
      { num: '01', icon: 'file-text', title: 'قدم شكواك', desc: 'اكتب شكواك وأرفق الأدلة المرئية بسهولة تامة' },
      { num: '02', icon: 'bot', title: 'تحليل ذكي', desc: 'يحلل النظام النص ويحدد الأولوية والفئة تلقائياً' },
      { num: '03', icon: 'bar-chart-3', title: 'رؤى قابلة للتنفيذ', desc: 'تصل الشكوى للجهة المعنية بأعلى درجات الأولوية' }
    ],
    features: [
      { icon: 'id-card', title: 'التحقق بالبطاقة الشخصية', desc: 'تسجيل آمن عبر الرقم القومي المصري ومطابقة الوجه' },
      { icon: 'sparkles', title: 'تصنيف ذكي بالـ ML', desc: 'تصنيف تلقائي للشكاوى وتحليل المشاعر فوري' },
      { icon: 'map-pin', title: 'تتبع جغرافي', desc: 'خريطة تفاعلية لتحديد نقاط الساخنة' },
      { icon: 'camera', title: 'رفع الأدلة', desc: 'صور وفيديوهات كأدلة قوية لدعم شكواك' },
      { icon: 'radar', title: 'متابعة لحظية', desc: 'تتبع حالة شكواك خطوة بخطوة' },
      { icon: 'mic', title: 'إدخال صوتي', desc: 'قل شكواك بالكلام وسيتحول تلقائياً لنص' }
    ]
  } : {
    badge: 'Egyptian Government Digital Initiative',
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
      { num: '01', icon: 'file-text', title: 'Submit Your Complaint', desc: 'Write your complaint and attach visual evidence easily' },
      { num: '02', icon: 'bot', title: 'Smart Analysis', desc: 'The system analyzes text and assigns priority and category automatically' },
      { num: '03', icon: 'bar-chart-3', title: 'Actionable Insights', desc: 'Your complaint reaches the right authority with highest priority' }
    ],
    features: [
      { icon: 'id-card', title: 'National ID Verification', desc: 'Secure registration via Egyptian National ID with face matching' },
      { icon: 'sparkles', title: 'ML Smart Classification', desc: 'Automatic complaint classification and real-time sentiment analysis' },
      { icon: 'map-pin', title: 'Geographic Tracking', desc: 'Interactive map to identify complaint hotspots' },
      { icon: 'camera', title: 'Evidence Upload', desc: 'Photos and videos as strong evidence to support your complaint' },
      { icon: 'radar', title: 'Live Tracking', desc: 'Follow your complaint status step by step' },
      { icon: 'mic', title: 'Voice Input', desc: 'Speak your complaint and it converts to text automatically' }
    ]
  };

  return (
    <div className="page page-transition">
      <section className="hero">
        <div className="hero-pattern" />
        <div className="hero-glow" />
        <div className="float-icon" style={{ top: '20%', right: '10%', animationDelay: '0s' }}><Icon name="landmark" className="icon icon-xl icon-gold" /></div>
        <div className="float-icon" style={{ bottom: '25%', left: '8%', animationDelay: '1s' }}><Icon name="waves" className="icon icon-xl icon-nile" /></div>
        <div className="float-icon" style={{ top: '40%', left: '5%', animationDelay: '2s', fontSize: '1.5rem' }}><Icon name="settings" className="icon icon-lg icon-muted" /></div>

        <div className="hero-badge"><Icon name="sparkles" className="icon icon-sm icon-gold icon-inline" /> {t.badge}</div>
        <h1 className="hero-title">
          {t.title1}<br />
          {t.title2} <span className="gold">{t.title3}</span>
        </h1>
        <p className="hero-sub">{t.sub}</p>
        <div className="hero-cta">
          <a className="btn-gold" href={pageHref('submit')} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{t.cta1} <Icon name="arrow-left" size={16} color="#1a1a1a" style={{marginRight:'0.2rem'}} /></a>
          <a className="btn-ghost-white" href={pageHref('register')} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{t.cta2}</a>
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
          <span className="section-tag"><Icon name="zap" className="icon icon-sm icon-nile icon-inline" /> {t.how}</span>
          <h2 className="section-title">{t.how}</h2>
          <p className="section-sub">{t.howSub}</p>
          <div className="how-grid">
            {t.steps.map((s, i) => (
              <div key={i} className="how-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="how-num">{s.num}</div>
                <div className="how-icon"><Icon name={s.icon} className="icon icon-xl icon-nile" /></div>
                <div className="how-title">{s.title}</div>
                <div className="how-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--papyrus)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <span className="section-tag"><Icon name="rocket" className="icon icon-sm icon-nile icon-inline" /> {t.feat}</span>
          <h2 className="section-title">{t.feat}</h2>
          <p className="section-sub">{t.featSub}</p>
          <div className="features-grid">
            {t.features.map((f, i) => (
              <div key={i} className="feature-card fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="feature-icon"><Icon name={f.icon} className="icon icon-xl icon-nile" /></div>
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
        <a className="btn-gold" href={pageHref('register')} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          {lang === 'ar' ? 'سجّل مجاناً' : 'Register Free'}
        </a>
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

// ─── CLOUDFLARE TURNSTILE: HOW IT WORKS ────────────────────────────────────────
//
//  FRONTEND (this file):
//    1. Load the Turnstile script (already added to all HTML <head> sections):
//         <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
//    2. Render a <div class="cf-turnstile" data-sitekey="YOUR_SITE_KEY"> widget.
//       Turnstile renders a challenge and, on success, writes a token into a hidden
//       input named "cf-turnstile-response".
//    3. Read that token from the DOM and include it in your registration POST body.
//
//  BACKEND (Python/FastAPI — you implement this):
//    POST /api/register receives the token and verifies it with Cloudflare:
//
//      import httpx
//      async def verify_turnstile(token: str, remote_ip: str) -> bool:
//          async with httpx.AsyncClient() as client:
//              r = await client.post(
//                  "https://challenges.cloudflare.com/turnstile/v0/siteverify",
//                  data={
//                      "secret":   "YOUR_SECRET_KEY",   # from Cloudflare dashboard — NEVER expose this
//                      "response": token,
//                      "remoteip": remote_ip,           # optional but recommended
//                  }
//              )
//          return r.json().get("success", False)
//
//  HOW TO GET KEYS:
//    1. Go to https://dash.cloudflare.com → Turnstile → Add site
//    2. Site Key  → paste into data-sitekey below (public, safe to expose)
//    3. Secret Key → store in your .env / secrets manager (NEVER in frontend code)
//
//  NOTE: Verifying only on the frontend is NOT secure. Bots can skip it.
//        Always verify server-side before creating the user in the database.
// ───────────────────────────────────────────────────────────────────────────────


// ─── IMAGE COMPRESSION ─────────────────────────────────────────────────────
function compressImage(dataURL, maxWidth, quality) {
  if (!maxWidth) maxWidth = 800;
  if (!quality) quality = 0.75;
  return new Promise(function(resolve) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var w = img.width, h = img.height;
      if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = dataURL;
  });
}


// ─── CAMERA STEP COMPONENT ─────────────────────────────────────────────────
// Reusable camera capture step. Used for Steps 2 (ID Front), 3 (ID Back), 4 (Selfie).
// Icons used: camera, check-circle-2, x, refresh-cw, alert-circle, user, id-card
function CameraStep(props) {
  var lang             = props.lang;
  var title            = props.title;
  var subtitle         = props.subtitle;
  var hint             = props.hint;
  var facingMode       = props.facingMode      || 'environment';
  var guideType        = props.guideType       || 'rect';
  var useFaceDetection = props.useFaceDetection || false;
  var faceModelsLoaded = props.faceModelsLoaded || false;
  var captured         = props.captured;
  var preview          = props.preview;
  var onCapture        = props.onCapture;
  var onRetake         = props.onRetake;
  var onBack           = props.onBack;
  var onNext           = props.onNext;
  var nextDisabled     = props.nextDisabled;

  var videoRef   = useRef(null);
  var overlayRef = useRef(null);
  var streamRef  = useRef(null);
  var detIntRef  = useRef(null);
  var cntDwnRef  = useRef(null);

  var _s0 = useState(false);  var cameraActive = _s0[0]; var setCameraActive = _s0[1];
  var _s1 = useState('none'); var detStatus    = _s1[0]; var setDetStatus    = _s1[1];
  var _s2 = useState('');     var detMessage   = _s2[0]; var setDetMessage   = _s2[1];
  var _s3 = useState(0);      var countdown    = _s3[0]; var setCountdown    = _s3[1];

  var statusColor = detStatus === 'good' ? 'var(--green)' : 'var(--red)';

  var stopCamera = useCallback(function() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(function(t) { t.stop(); });
      streamRef.current = null;
    }
    if (detIntRef.current) { clearInterval(detIntRef.current); detIntRef.current = null; }
    if (cntDwnRef.current) { clearInterval(cntDwnRef.current); cntDwnRef.current = null; }
    setCameraActive(false);
    setCountdown(0);
  }, []);

  useEffect(function() { return function() { stopCamera(); }; }, [stopCamera]);

  var drawIDGuide = useCallback(function(canvas, video, status) {
    if (!canvas || !video || video.videoWidth === 0) return;
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var m = Math.floor(canvas.width * 0.08);
    var rw = canvas.width - m * 2, rh = Math.round(rw * 0.63);
    var rx = m, ry = Math.floor((canvas.height - rh) / 2);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(rx, ry, rw, rh);
    var color = status === 'good' ? '#2E8B57' : status === 'poor' ? '#DC2626' : '#D4AF37';
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.strokeRect(rx, ry, rw, rh);
    var cL = 22; ctx.lineWidth = 5; ctx.strokeStyle = '#D4AF37';
    ctx.beginPath(); ctx.moveTo(rx+cL,ry); ctx.lineTo(rx,ry); ctx.lineTo(rx,ry+cL); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rx+rw-cL,ry); ctx.lineTo(rx+rw,ry); ctx.lineTo(rx+rw,ry+cL); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rx,ry+rh-cL); ctx.lineTo(rx,ry+rh); ctx.lineTo(rx+cL,ry+rh); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rx+rw-cL,ry+rh); ctx.lineTo(rx+rw,ry+rh); ctx.lineTo(rx+rw,ry+rh-cL); ctx.stroke();
    ctx.font = 'bold 14px Cairo, sans-serif'; ctx.fillStyle = color; ctx.textAlign = 'center';
    ctx.fillText(lang === 'ar' ? 'ضع البطاقة هنا' : 'Place card here', canvas.width/2, ry+rh/2);
  }, [lang]);

  var drawFaceGuide = useCallback(function(canvas, video, detection, status) {
    if (!canvas || !video || video.videoWidth === 0) return;
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var cx = canvas.width/2, cy = canvas.height/2;
    var rx = canvas.width*0.28, ry = canvas.height*0.38;
    var color = status === 'good' ? '#2E8B57' : status === 'poor' ? '#DC2626' : '#D4AF37';
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.save(); ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.clip();
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.restore();
    ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);
    ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.setLineDash([8,5]); ctx.stroke(); ctx.setLineDash([]);
    if (detection) {
      var box = detection.detection ? detection.detection.box : detection.box;
      if (box) { ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(box.x,box.y,box.width,box.height); }
    }
  }, []);

  var capturePhoto = useCallback(function() {
    var video = videoRef.current; if (!video) return;
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    compressImage(canvas.toDataURL('image/jpeg', 0.95), 800, 0.75).then(function(compressed) {
      stopCamera(); onCapture(compressed);
    });
  }, [stopCamera, onCapture]);

  var startIDDetection = useCallback(function(video, overlay) {
    var tmp = document.createElement('canvas');
    detIntRef.current = setInterval(function() {
      if (!video || video.videoWidth === 0) return;
      tmp.width = video.videoWidth; tmp.height = video.videoHeight;
      var ctx = tmp.getContext('2d'); ctx.drawImage(video, 0, 0);
      var m = Math.floor(video.videoWidth*0.1), sW = video.videoWidth-m*2;
      var sH = Math.round(sW*0.63), sY = Math.floor((video.videoHeight-sH)/2);
      try {
        var data = ctx.getImageData(m,sY,sW,sH).data, bright=0, count=0;
        for (var i=0;i<data.length;i+=16){bright+=(data[i]+data[i+1]+data[i+2])/3;count++;}
        var avg=bright/count, status=(avg>50&&avg<240)?'good':'poor';
        setDetStatus(status);
        setDetMessage(status==='good'?(lang==='ar'?'✓ البطاقة مرئية — اضغط التقاط':'✓ Card visible — press Capture'):(lang==='ar'?'ضع البطاقة داخل الإطار الذهبي':'Place card inside the gold frame'));
        drawIDGuide(overlay, video, status);
      } catch(e) {}
    }, 150);
  }, [lang, drawIDGuide]);

  var startFaceDetectionLoop = useCallback(function(video, overlay) {
    if (!window.faceapi) return;
    var goodFrames = 0;
    detIntRef.current = setInterval(function() {
      if (!video || video.videoWidth === 0) return;
      window.faceapi.detectSingleFace(video, new window.faceapi.TinyFaceDetectorOptions({inputSize:224, scoreThreshold:0.5}))
        .then(function(det) {
          var status = det&&det.score>0.85?'good':det&&det.score>0.6?'medium':'poor';
          var ds = status==='medium'?'poor':status;
          setDetStatus(ds);
          setDetMessage(status==='good'?(lang==='ar'?'✓ وجهك مرئي — سيتم الالتقاط تلقائياً':'✓ Face detected — auto-capturing'):status==='medium'?(lang==='ar'?'اقترب أكثر من الكاميرا':'Move closer to camera'):(lang==='ar'?'لم يتم اكتشاف وجه — انظر للكاميرا':'No face detected — look at camera'));
          drawFaceGuide(overlay, video, det, ds);
          if (status==='good') {
            goodFrames++;
            if (goodFrames>=3 && !cntDwnRef.current) {
              var count=3; setCountdown(count);
              cntDwnRef.current = setInterval(function(){
                count--; setCountdown(count);
                if (count<=0){clearInterval(cntDwnRef.current);cntDwnRef.current=null;capturePhoto();}
              }, 1000);
            }
          } else {
            goodFrames=0;
            if (cntDwnRef.current){clearInterval(cntDwnRef.current);cntDwnRef.current=null;setCountdown(0);}
          }
        }).catch(function(){});
    }, 200);
  }, [lang, drawFaceGuide, capturePhoto]);

  var startCamera = useCallback(function() {
    navigator.mediaDevices.getUserMedia({video:{facingMode:facingMode,width:{ideal:1280},height:{ideal:720}}})
      .then(function(stream) {
        streamRef.current = stream;
        var video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = function() {
            if (useFaceDetection && faceModelsLoaded) { startFaceDetectionLoop(video, overlayRef.current); }
            else { startIDDetection(video, overlayRef.current); drawIDGuide(overlayRef.current, video, 'none'); }
          };
        }
        setCameraActive(true);
      }).catch(function() {
        alert(lang==='ar'?'الرجاء السماح بالوصول إلى الكاميرا':'Please allow camera access');
      });
  }, [facingMode, useFaceDetection, faceModelsLoaded, lang, startFaceDetectionLoop, startIDDetection, drawIDGuide]);

  return (
    <div>
      <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', fontSize: '1.2rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{subtitle}</p>

      {!captured ? (
        <div>
          {!cameraActive ? (
            <div className="upload-zone" onClick={startCamera} style={{ cursor: 'pointer', padding: '2.5rem 1rem' }}>
              <div style={{ marginBottom: '0.6rem' }}>
                <Icon name={guideType === 'oval' ? 'user' : 'id-card'} className="icon icon-xl icon-nile" />
              </div>
              <p style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{lang === 'ar' ? 'انقر لفتح الكاميرا' : 'Click to open camera'}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-mid)' }}>{hint}</p>
            </div>
          ) : (
            <div>
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', background: '#000', lineHeight: 0 }}>
                <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', display: 'block', borderRadius: 12 }} />
                <canvas ref={overlayRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
                {countdown > 0 && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '6rem', fontWeight: 900, color: 'var(--gold)', textShadow: '0 0 30px rgba(212,175,55,0.9)', zIndex: 10, lineHeight: 1, pointerEvents: 'none', animation: 'pulse 0.8s infinite' }}>
                    {countdown}
                  </div>
                )}
              </div>
              {detStatus !== 'none' && (
                <div className={'detection-status-bar ' + detStatus} style={{ color: statusColor }}>
                  <Icon name={detStatus === 'good' ? 'check-circle-2' : 'alert-circle'} size={16} color={statusColor} />
                  {detMessage}
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem' }}>
                <button className="btn-gold" style={{ flex: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={capturePhoto}>
                  <Icon name="camera" size={16} color="#1a1a1a" />
                  {lang === 'ar' ? 'التقاط الآن' : 'Capture Now'}
                </button>
                <button onClick={stopCamera} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: 10, fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <Icon name="x" size={15} />
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="upload-zone drag" style={{ padding: '1.5rem' }}>
          <img src={preview} alt="captured" style={{ maxWidth: 220, maxHeight: 160, borderRadius: 10, objectFit: 'cover', border: '2px solid var(--green)', marginBottom: '0.8rem' }} />
          <p style={{ color: 'var(--green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Icon name="check-circle-2" size={18} color="var(--green)" />
            {lang === 'ar' ? 'تم الالتقاط بنجاح' : 'Captured successfully'}
          </p>
          <button onClick={onRetake} style={{ marginTop: '0.5rem', background: 'transparent', border: 'none', color: 'var(--red)', cursor: 'pointer', fontFamily: 'Cairo', fontWeight: 700, fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <Icon name="refresh-cw" size={14} color="var(--red)" />
            {lang === 'ar' ? 'إعادة التصوير' : 'Retake'}
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
        <button onClick={onBack} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <Icon name={lang === 'ar' ? 'arrow-right' : 'arrow-left'} size={15} />
          {lang === 'ar' ? 'رجوع' : 'Back'}
        </button>
        <button className="btn-gold" style={{ flex: 2, opacity: nextDisabled ? 0.6 : 1, cursor: nextDisabled ? 'not-allowed' : 'pointer' }} onClick={onNext} disabled={nextDisabled}>
          {lang === 'ar' ? 'التالي ←' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

function Step4Review({ lang, nationalId, fullName, phone, governate,
                       frontPreview, backPreview, selfiePreview,
                       loading, t, onBack, onSubmit }) {
  const [agreed, setAgreed] = React.useState(false);
  const [turnstileToken, setTurnstileToken] = React.useState(null);
  const [turnstileError, setTurnstileError] = React.useState(false);
  const widgetRef = React.useRef(null);

  React.useEffect(() => {
    // Inject the Turnstile widget once this step mounts.
    // The script (challenges.cloudflare.com/turnstile/v0/api.js) must already be
    // loaded in the page <head> — see register.html.
    const container = widgetRef.current;
    if (!container || !window.turnstile) return;

    // Clear any previous render (e.g. if user navigated back and forward)
    container.innerHTML = '';

    window.turnstile.render(container, {
      // ⚠️  REPLACE THIS with your real Site Key from the Cloudflare dashboard.
      //     Use "1x00000000000000000000AA" for testing (always passes).
      sitekey: '1x00000000000000000000AA',
      theme: 'light',
      language: lang === 'ar' ? 'ar' : 'en',
      callback: (token) => {
        // Token received — user passed the challenge.
        // Send this token to your backend POST /api/register for server-side verification.
        setTurnstileToken(token);
        setTurnstileError(false);
      },
      'error-callback': () => {
        setTurnstileToken(null);
        setTurnstileError(true);
      },
      'expired-callback': () => {
        setTurnstileToken(null);
      },
    });

    // Cleanup on unmount
    return () => { container.innerHTML = ''; };
  }, [lang]);

  const handleSubmit = () => {
    if (!turnstileToken) {
      setTurnstileError(true);
      return;
    }
    // ─── BACKEND INTEGRATION ─────────────────────────────────────────────────
    // When wiring to real backend, replace the mock below with:
    //
    //   const res = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       national_id:      nationalId,
    //       full_name:        fullName,
    //       phone:            phone,
    //       governate:        governate,
    //       turnstile_token:  turnstileToken,   // ← backend verifies this
    //     })
    //   });
    //   if (!res.ok) { /* handle error */ return; }
    //
    // Python backend should:
    //   1. verify_turnstile(turnstile_token)  — see comment block above
    //   2. validate + normalize national_id
    //   3. hash password, store user in PostgreSQL
    //   4. send OTP / welcome SMS via Twilio or Vonage
    //   5. return { user_id, jwt_token }
    // ─────────────────────────────────────────────────────────────────────────
    onSubmit();
  };

  const rows = [
    [lang === 'ar' ? 'الرقم القومي' : 'National ID', nationalId.replace(/(\d{4})(\d{6})(\d{4})/, '$1-$2-$3'), true, false],
    [lang === 'ar' ? 'الاسم الكامل' : 'Full Name', fullName, false, false],
    [lang === 'ar' ? 'الهاتف' : 'Phone', phone, false, false],
    [lang === 'ar' ? 'المحافظة' : 'Governate', governate, false, false],
    [lang === 'ar' ? 'التحقق من الهوية' : 'ID Verification', lang === 'ar' ? 'تم التحقق' : 'Verified', false, true],
    [lang === 'ar' ? 'الصورة الشخصية' : 'Selfie', lang === 'ar' ? 'تم التحقق' : 'Verified', false, true],
  ];

  return (
    <div>
      <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon name="clipboard-check" size={18} color="var(--nile)" />
        {t.s4title}
      </h3>
      <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.8rem' }}>
        {lang === 'ar' ? 'تأكد من صحة بياناتك قبل الإرسال' : 'Verify your information before submitting'}
      </p>


      {/* Captured image thumbnails */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
        {[
          { img: frontPreview,  label: lang === 'ar' ? 'الهوية — أمامي'  : 'ID Front' },
          { img: backPreview,   label: lang === 'ar' ? 'الهوية — خلفي'   : 'ID Back' },
          { img: selfiePreview, label: lang === 'ar' ? 'الصورة الشخصية'  : 'Selfie' },
        ].map((p, i) => p.img && (
          <div key={i} style={{ flex: 1, minWidth: 80, textAlign: 'center' }}>
            <img src={p.img} alt={p.label} style={{ width: '100%', maxWidth: 100, height: 70, objectFit: 'cover', borderRadius: 8, border: '2px solid var(--green)' }} />
            <p style={{ fontSize: '0.68rem', color: 'var(--text-mid)', marginTop: '0.3rem' }}>{p.label}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--papyrus)', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.2rem' }}>
        {rows.map(([label, value, isMono, isVerified], i) => (
          <div key={i} className="review-row">
            <span className="review-label">{label}</span>
            <span className="review-value" style={{ fontFamily: isMono ? 'JetBrains Mono, monospace' : 'inherit', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              {isVerified && <Icon name="shield-check" size={14} color="var(--green)" />}
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Terms checkbox */}
      <label className="checkbox-wrap" style={{ marginBottom: '1.5rem' }}>
        <input type="checkbox" className="checkbox-input" id="agree" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
        <span className="checkbox-text">{t.confirm}</span>
      </label>

      {/* ─── CLOUDFLARE TURNSTILE WIDGET ──────────────────────────────────────
          This renders the "I'm not a robot" challenge.
          Replace data-sitekey with your real key from Cloudflare dashboard.
          The widget is rendered programmatically via window.turnstile.render()
          inside the useEffect above.
          ─────────────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div ref={widgetRef} style={{ minHeight: 65 }} />
        {!window.turnstile && (
          <div style={{ background: 'rgba(27,107,147,0.08)', border: '1.5px dashed var(--nile)', borderRadius: '10px', padding: '0.9rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Icon name="shield" size={18} color="var(--nile)" />
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--nile)', marginBottom: '0.1rem' }}>
                {lang === 'ar' ? 'Cloudflare Turnstile — التحقق من الهوية' : 'Cloudflare Turnstile — Bot Protection'}
              </p>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-mid)' }}>
                {lang === 'ar'
                  ? 'أضف script tag من Cloudflare في <head> لتفعيل هذا الحقل'
                  : 'Add the Cloudflare Turnstile script to <head> to activate this widget'}
              </p>
            </div>
          </div>
        )}
        {turnstileError && (
          <p style={{ color: 'var(--red)', fontSize: '0.78rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Icon name="triangle-alert" size={13} color="var(--red)" />
            {lang === 'ar' ? 'يرجى إتمام التحقق أولاً' : 'Please complete the verification challenge first'}
          </p>
        )}
        {turnstileToken && (
          <p style={{ color: 'var(--green)', fontSize: '0.78rem', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Icon name="shield-check" size={13} color="var(--green)" />
            {lang === 'ar' ? 'تم التحقق بنجاح — جاهز للإرسال' : 'Verification passed — ready to submit'}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.8rem' }}>
        <button onClick={onBack} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <Icon name={lang === 'ar' ? 'arrow-right' : 'arrow-left'} size={15} />
          {lang === 'ar' ? 'رجوع' : 'Back'}
        </button>
        <button
          className="btn-gold"
          style={{ flex: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: (!agreed) ? 0.6 : 1, cursor: (!agreed) ? 'not-allowed' : 'pointer' }}
          onClick={handleSubmit}
          disabled={!agreed || loading}
        >
          {loading
            ? <span className="spinner" style={{ width: 20, height: 20, display: 'inline-block', borderWidth: 2 }} />
            : <><Icon name="user-check" size={16} color="#1a1a1a" /> {t.submit}</>
          }
        </button>
      </div>
    </div>
  );
}

function RegisterPage({ lang }) {
  const [step, setStep] = useState(1);

  // Step 1 — National ID
  const [nationalId, setNationalId] = useState('');
  const [idError,    setIdError]    = useState('');
  const [idValid,    setIdValid]    = useState(false);

  // Step 2 — ID Card Front
  const [frontCaptured, setFrontCaptured] = useState(false);
  const [frontPreview,  setFrontPreview]  = useState(null);
  const [frontImage,    setFrontImage]    = useState(null);

  // Step 3 — ID Card Back
  const [backCaptured, setBackCaptured] = useState(false);
  const [backPreview,  setBackPreview]  = useState(null);
  const [backImage,    setBackImage]    = useState(null);

  // Step 4 — Selfie with face detection
  const [selfieCaptured,    setSelfieCaptured]    = useState(false);
  const [selfiePreview,     setSelfiePreview]      = useState(null);
  const [selfieImage,       setSelfieImage]        = useState(null);
  const [faceModelsLoaded,  setFaceModelsLoaded]   = useState(false);
  const [faceModelsLoading, setFaceModelsLoading]  = useState(false);
  const [autoCaptureCountdown, setAutoCaptureCountdown] = useState(0);

  // OCR extracted data (auto-filled from ID card if Tesseract CDN loaded)
  const [extractedName, setExtractedName] = useState('');
  const [extractedId,   setExtractedId]   = useState('');

  // Step 5 — Account info
  const [fullName,    setFullName]    = useState('');
  const [phone,       setPhone]       = useState('');
  const [governate,   setGovernate]   = useState('');
  const [password,    setPassword]    = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass,    setShowPass]    = useState(false);

  // Step 6 — Submit
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);

  const GOVS    = ['القاهرة','الجيزة','الإسكندرية','الدقهلية','البحيرة','الشرقية','المنيا','أسيوط','الفيوم','سوهاج','قنا','أسوان','الأقصر'];
  const GOVS_EN = ['Cairo','Giza','Alexandria','Dakahlia','Beheira','Sharqia','Minya','Asyut','Faiyum','Sohag','Qena','Aswan','Luxor'];

  // Load face-api.js models on step 4
  useEffect(() => {
    if (step === 4 && !faceModelsLoaded && !faceModelsLoading && window.faceapi) {
      setFaceModelsLoading(true);
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/models';
      Promise.all([
        window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        window.faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]).then(() => {
        setFaceModelsLoaded(true);
        setFaceModelsLoading(false);
      }).catch(() => {
        setFaceModelsLoading(false);
      });
    }
  }, [step, faceModelsLoaded, faceModelsLoading]);

  // OCR auto-fill when ID front is captured (requires Tesseract CDN in register.html)
  useEffect(() => {
    if (!frontImage || !window.Tesseract) return;
    window.Tesseract.recognize(frontImage, 'ara')
      .then(({ data: { text } }) => {
        const nameMatch = text.match(/الاسم[:\s]*([^\n]+)/i);
        const idMatch   = text.match(/\d{14}/);
        if (nameMatch && !fullName)   setFullName(nameMatch[1].trim());
        if (idMatch   && !nationalId) setNationalId(idMatch[0]);
      })
      .catch(() => {});
  }, [frontImage]);

  const validateId = (val) => {
    setNationalId(val);
    if (val.length === 14 && /^\d{14}$/.test(val)) {
      setIdError(''); setIdValid(true);
    } else if (val.length > 0) {
      setIdError(lang === 'ar' ? 'الرقم القومي يجب أن يكون 14 رقماً' : 'National ID must be 14 digits');
      setIdValid(false);
    } else { setIdError(''); setIdValid(false); }
  };

  const passStrength = password.length >= 12 ? 'strong' : password.length >= 8 ? 'medium' : 'weak';
  const passColor    = passStrength === 'strong' ? 'var(--green)' : passStrength === 'medium' ? 'var(--gold)' : 'var(--red)';
  const passLabel    = passStrength === 'strong' ? (lang === 'ar' ? 'قوية' : 'Strong') : passStrength === 'medium' ? (lang === 'ar' ? 'متوسطة' : 'Medium') : (lang === 'ar' ? 'ضعيفة' : 'Weak');

  const handleSubmit = () => {
    setLoading(true);
    // BACKEND INTEGRATION: POST /api/register
    // { national_id, full_name, phone, governate, password, id_front, id_back, selfie, turnstile_token }
    // See Step4Review component for Turnstile token handling
    setTimeout(() => { setLoading(false); setDone(true); }, 1800);
  };

  const t = lang === 'ar' ? {
    title:     'إنشاء حساب جديد',
    steps:     ['الرقم القومي', 'البطاقة (الأمامي)', 'البطاقة (الخلفي)', 'الصورة الشخصية', 'بيانات الحساب', 'مراجعة'],
    s1title:   'أدخل رقمك القومي',
    s1sub:     'سيتم استخدامه للتحقق من هويتك فقط ولن يُشارك مع أي جهة',
    s1label:   'الرقم القومي (14 رقماً)',
    s1hint:    'نصيحة: الأرقام الثلاثة الأولى تمثل تاريخ الميلاد',
    s3title:   'أكمل بياناتك',
    nameLbl:   'الاسم الكامل',
    phoneLbl:  'رقم الهاتف',
    govLbl:    'المحافظة',
    passLbl:   'كلمة المرور',
    confirmLbl:'تأكيد كلمة المرور',
    s4title:   'مراجعة البيانات',
    confirm:   'أقر بصحة المعلومات وأوافق على الشروط والأحكام',
    submit:    'إنشاء الحساب',
    doneTitle: 'تم إنشاء حسابك بنجاح!',
    doneSub:   'يمكنك الآن تقديم شكاواك',
    doneBtn:   'أبلغ عن مشكلة الآن',
  } : {
    title:     'Create New Account',
    steps:     ['National ID', 'ID Front', 'ID Back', 'Selfie', 'Account Info', 'Review'],
    s1title:   'Enter Your National ID',
    s1sub:     'Used for identity verification only and will not be shared',
    s1label:   'National ID (14 digits)',
    s1hint:    'Tip: First 3 digits represent your birth date century',
    s3title:   'Complete Your Profile',
    nameLbl:   'Full Name',
    phoneLbl:  'Phone Number',
    govLbl:    'Governate',
    passLbl:   'Password',
    confirmLbl:'Confirm Password',
    s4title:   'Review Your Information',
    confirm:   'I certify the information is accurate and agree to Terms & Conditions',
    submit:    'Create Account',
    doneTitle: 'Account Created Successfully!',
    doneSub:   'You can now submit your complaints',
    doneBtn:   'Report an Issue Now',
  };

  if (done) return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--papyrus)', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ marginBottom: '1.5rem', animation: 'fadeUp 0.5s ease both' }}>
          <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #f5d66b)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <Icon name="check-circle-2" className="icon" color="#fff" size={44} />
          </div>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>{t.doneTitle}</h2>
        <p style={{ color: 'var(--text-mid)', marginBottom: '2rem' }}>{t.doneSub}</p>
        <a className="btn-gold" style={{ marginLeft: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} href={pageHref('submit')}>
          {t.doneBtn}
          <Icon name="arrow-left" className="icon icon-sm" color="#1a1a1a" />
        </a>
        <a href={pageHref('dashboard')} style={{ marginTop: '1rem', display: 'block', width: '100%', padding: '0.7rem', background: 'transparent', border: '1.5px solid var(--nile)', borderRadius: '10px', color: 'var(--nile)', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', textDecoration: 'none' }}>
          {lang === 'ar' ? 'الذهاب للوحة التحكم' : 'Go to Dashboard'}
        </a>
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
                <div className={`step-dot ${i + 1 < step ? 'done' : i + 1 === step ? 'active' : 'pending'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {i + 1 < step ? <Icon name="check" size={14} color="#fff" /> : i + 1}
                </div>
                <span style={{ fontSize: '0.62rem', color: i + 1 === step ? 'var(--nile)' : '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{s}</span>
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
              <div style={{ flex: 1 }}>
                <input className={`form-input ${idError ? 'error' : ''}`} value={nationalId} onChange={e => validateId(e.target.value)} maxLength={14} placeholder="29801011234567" style={{ textAlign: 'center', letterSpacing: '3px', fontSize: '1.1rem', fontFamily: 'JetBrains Mono, monospace' }} />
                {idError && <p style={{ color: 'var(--red)', fontSize: '0.78rem', marginTop: '0.3rem' }}>{idError}</p>}
                {idValid && <p style={{ color: 'var(--green)', fontSize: '0.78rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Icon name="check-circle-2" size={13} color="var(--green)" /> {lang === 'ar' ? 'رقم صالح' : 'Valid ID'}</p>}
              </div>
              {idValid && (
                <div className="id-card-visual" style={{ marginTop: '1.2rem' }}>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{lang === 'ar' ? 'جمهورية مصر العربية — بطاقة الرقم القومي' : 'Arab Republic of Egypt — National ID'}</div>
                  <div className="id-card-num">{nationalId}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.3rem' }}>{lang === 'ar' ? 'المحافظة: القاهرة' : 'Governate: Cairo'}</div>
                </div>
              )}
              <div className="alert alert-info" style={{ marginTop: '1.2rem' }}>
                <span><Icon name="info" className="icon icon-sm" color="var(--nile)" /></span>
                <span>{t.s1hint}</span>
              </div>
              <button className="btn-gold" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => idValid && setStep(2)} disabled={!idValid}>
                {lang === 'ar' ? 'التالي ←' : 'Next →'}
              </button>
            </div>
          )}

          {step === 2 && (
            <CameraStep
              lang={lang}
              title={lang === 'ar' ? 'صوّر الوجه الأمامي للبطاقة' : 'Capture ID Card — Front Side'}
              subtitle={lang === 'ar' ? 'ضع البطاقة داخل الإطار الذهبي — الجانب الأمامي' : 'Place the front of your ID inside the gold frame'}
              hint={lang === 'ar' ? 'تأكد من وضوح البطاقة وعدم وجود انعكاس ضوئي' : 'Ensure card is clear with no glare'}
              facingMode="environment"
              guideType="rect"
              captured={frontCaptured}
              preview={frontPreview}
              onCapture={(img) => { setFrontImage(img); setFrontPreview(img); setFrontCaptured(true); }}
              onRetake={() => { setFrontCaptured(false); setFrontPreview(null); setFrontImage(null); }}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
              nextDisabled={!frontCaptured}
            />
          )}

          {step === 3 && (
            <CameraStep
              lang={lang}
              title={lang === 'ar' ? 'صوّر الوجه الخلفي للبطاقة' : 'Capture ID Card — Back Side'}
              subtitle={lang === 'ar' ? 'اقلب البطاقة وضع الجانب الخلفي داخل الإطار' : 'Flip the card and place the back side inside the frame'}
              hint={lang === 'ar' ? 'تأكد من ظهور الباركود والبيانات بوضوح' : 'Make sure the barcode and data are clearly visible'}
              facingMode="environment"
              guideType="rect"
              captured={backCaptured}
              preview={backPreview}
              onCapture={(img) => { setBackImage(img); setBackPreview(img); setBackCaptured(true); }}
              onRetake={() => { setBackCaptured(false); setBackPreview(null); setBackImage(null); }}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
              nextDisabled={!backCaptured}
            />
          )}

          {step === 4 && (
            <div>
              {faceModelsLoading && (
                <div className="alert alert-info" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="spinner" style={{ width: 16, height: 16, display: 'inline-block', borderWidth: 2 }} />
                  <span>{lang === 'ar' ? 'جارٍ تحميل نماذج الكشف عن الوجه...' : 'Loading face detection models...'}</span>
                </div>
              )}
              <CameraStep
                lang={lang}
                title={lang === 'ar' ? 'التقط صورة شخصية' : 'Take a Selfie'}
                subtitle={lang === 'ar' ? 'ضع وجهك داخل الإطار البيضاوي — سيتم الالتقاط تلقائياً' : 'Place your face in the oval frame — auto-capture will trigger'}
                hint={lang === 'ar' ? 'ابتسم وانظر مباشرة للكاميرا في إضاءة جيدة' : 'Smile and look directly at the camera in good lighting'}
                facingMode="user"
                guideType="oval"
                useFaceDetection={true}
                faceModelsLoaded={faceModelsLoaded}
                captured={selfieCaptured}
                preview={selfiePreview}
                onCapture={(img) => { setSelfieImage(img); setSelfiePreview(img); setSelfieCaptured(true); }}
                onRetake={() => { setSelfieCaptured(false); setSelfiePreview(null); setSelfieImage(null); }}
                onBack={() => setStep(3)}
                onNext={() => setStep(5)}
                nextDisabled={!selfieCaptured}
              />
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', fontSize: '1.2rem' }}>{t.s3title}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.8rem' }}>
                {lang === 'ar' ? 'أكمل بياناتك لإنشاء حسابك' : 'Complete your details to create your account'}
              </p>
              <div className="grid-2" style={{ marginBottom: '1rem' }}>
                <div>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Icon name="user" size={13} color="var(--nile)" /> {t.nameLbl}
                  </label>
                  <input className="form-input" value={fullName} onChange={e => setFullName(e.target.value)} placeholder={lang === 'ar' ? 'فاطمة أحمد' : 'Fatma Ahmed'} />
                </div>
                <div>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Icon name="phone" size={13} color="var(--nile)" /> {t.phoneLbl}
                  </label>
                  <input className="form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="010XXXXXXXX" />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Icon name="map-pin" size={13} color="var(--nile)" /> {t.govLbl}
                </label>
                <select className="form-select" value={governate} onChange={e => setGovernate(e.target.value)}>
                  <option value="">{lang === 'ar' ? 'اختر محافظتك' : 'Select your governate'}</option>
                  {GOVS.map((g, i) => <option key={i} value={g}>{lang === 'ar' ? g : GOVS_EN[i]}</option>)}
                </select>
              </div>
              <div className="grid-2">
                <div>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Icon name="lock" size={13} color="var(--nile)" /> {t.passLbl}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input className="form-input" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ paddingRight: '2.5rem' }} />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', top: '50%', right: '0.7rem', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Icon name={showPass ? 'eye-off' : 'eye'} size={15} color="var(--text-mid)" />
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div>
                      <div className="strength-bar">
                        <div className="strength-fill" style={{ width: passStrength === 'strong' ? '100%' : passStrength === 'medium' ? '66%' : '33%', background: passColor }} />
                      </div>
                      <p style={{ fontSize: '0.72rem', marginTop: '0.2rem', color: passColor }}>{passLabel}</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="form-label">{t.confirmLbl}</label>
                  <input className={`form-input ${confirmPass && confirmPass !== password ? 'error' : ''}`} type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="••••••••" />
                  {confirmPass && confirmPass !== password && <p style={{ color: 'var(--red)', fontSize: '0.72rem', marginTop: '0.2rem' }}>{lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match'}</p>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button onClick={() => setStep(4)} style={{ flex: 1, padding: '0.75rem', background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--text-mid)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <Icon name={lang === 'ar' ? 'arrow-right' : 'arrow-left'} size={15} />
                  {lang === 'ar' ? 'رجوع' : 'Back'}
                </button>
                <button className="btn-gold" style={{ flex: 2 }} onClick={() => setStep(6)} disabled={!fullName || !governate || !password || password !== confirmPass}>
                  {lang === 'ar' ? 'التالي ←' : 'Next →'}
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <Step4Review
              lang={lang}
              nationalId={nationalId}
              fullName={fullName}
              phone={phone}
              governate={governate}
              frontPreview={frontPreview}
              backPreview={backPreview}
              selfiePreview={selfiePreview}
              loading={loading}
              t={t}
              onBack={() => setStep(5)}
              onSubmit={handleSubmit}
            />
          )}

        </div>
      </div>
    </div>
  );
}


function SubmitPage({ lang }) {
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
    // ─── ML INTEGRATION: Real-time Sentiment Analysis ───────────────────────────
    // Currently using a simple keyword heuristic from shared.js getSentiment().
    // Replace with a debounced API call to your NLP model:
    //
    //   POST /api/ml/sentiment
    //   Body: { text: description, lang: lang }
    //   Response: { sentiment: 'negative' | 'neutral', confidence: 0.0-1.0 }
    //
    // Recommended models (Arabic-aware):
    //   - CAMeL-BERT (Arabic NLP) — https://huggingface.co/CAMeL-Lab/bert-base-arabic-camelbert-da-sentiment
    //   - AraBERT — https://huggingface.co/aubmindlab/bert-large-arabertv02
    //   - Use a debounce of ~500ms so you don't call on every keystroke
    // ─────────────────────────────────────────────────────────────────────────────
    setSentiment(getSentiment(description));

    // ─── ML INTEGRATION: Duplicate/Similar Complaint Detection ──────────────────
    // Currently random. Replace with:
    //   POST /api/ml/duplicate-check
    //   Body: { text: description, location: pinnedLocation, category: selectedCategory }
    //   Response: { is_duplicate: bool, similar_count: number, cluster_id: string }
    //
    // Python backend: use sentence-transformers (paraphrase-multilingual-MiniLM-L12-v2)
    // to embed complaints and find cosine similarity > 0.85 threshold in your DB.
    // ─────────────────────────────────────────────────────────────────────────────
    if (description.length > 30 && Math.random() > 0.6) setDuplicateWarning(true);
    else setDuplicateWarning(false);
  }, [description]);

  const handleVoice = () => {
    setIsRecording(r => !r);
    if (!isRecording) {
      // ─── ML INTEGRATION: Speech-to-Text ─────────────────────────────────────
      // Currently a mock. Replace with:
      //   Option A: Web Speech API (browser-native, free, works in Chrome/Edge):
      //     const recognition = new webkitSpeechRecognition();
      //     recognition.lang = lang === 'ar' ? 'ar-EG' : 'en-US';
      //     recognition.onresult = e => setDescription(prev => prev + e.results[0][0].transcript);
      //     recognition.start();
      //
      //   Option B: Send audio blob to backend:
      //     POST /api/ml/speech-to-text
      //     Body: FormData { audio: Blob, lang: 'ar-EG' }
      //     Response: { transcript: string }
      //     Python: use OpenAI Whisper or AssemblyAI API
      // ─────────────────────────────────────────────────────────────────────────
      setTimeout(() => {
        setDescription(prev => prev + (lang === 'ar' ? ' الشارع مظلم تماماً منذ أسبوعين ولا توجد إنارة على الإطلاق' : ' The street has been completely dark for two weeks with no lighting at all'));
        setIsRecording(false);
      }, 3000);
    }
  };

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newEvidence = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image'
    }));
    setEvidence(prev => [...prev, ...newEvidence].slice(0, 5));
  };

  const removeEvidence = (index) => {
    if (evidence[index] && evidence[index].preview) {
      URL.revokeObjectURL(evidence[index].preview);
    }
    setEvidence(prev => prev.filter((_, i) => i !== index));
  };

  const submit = () => {
    setLoading(true);
    // ─── BACKEND INTEGRATION: Complaint Submission ──────────────────────────────
    // Replace this mock with a real API call:
    //
    //   const formData = new FormData();
    //   formData.append('location', JSON.stringify(pinnedLocation));   // { lat, lng, address }
    //   formData.append('category', selectedCategory);
    //   formData.append('description', description);
    //   formData.append('sentiment', sentiment);
    //   evidenceFiles.forEach(f => formData.append('evidence', f));    // File objects
    //
    //   const res = await fetch('/api/complaints', {
    //     method: 'POST',
    //     headers: { 'Authorization': `Bearer ${jwt}` },
    //     body: formData
    //   });
    //   const { ref_number, priority_score } = await res.json();
    //   setRefNum(ref_number);
    //
    // Python backend pipeline on receipt:
    //   1. Validate + store in PostgreSQL (complaints table)
    //   2. Run ML pipeline:
    //        a. Classify category (if not user-selected) — fine-tuned AraBERT classifier
    //        b. Calculate priority score (0-10):
    //             - Sentiment weight (negative = +3)
    //             - Duplicate cluster size weight (+1 per 10 reports)
    //             - Category urgency weight (e.g. water outage = high)
    //             - Location-based risk weight (from historical data)
    //        c. Named entity extraction (location, infrastructure type)
    //        d. Assign to relevant ministry/governate queue via routing rules
    //   3. Store evidence files in S3/Cloudflare R2
    //   4. Emit WebSocket event to Admin dashboard for real-time update
    //   5. Send SMS confirmation to user (Twilio/Vonage)
    //   6. Return { ref_number: "SHK-2024-XXXX", priority_score: float }
    // ─────────────────────────────────────────────────────────────────────────────
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
        <div style={{ marginBottom: '1rem' }}><Icon name="check-circle-2" className="icon icon-xl" color="var(--green)" /></div>
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
          <span><Icon name="rocket" className="icon icon-sm" color="var(--green)" /></span>
          <span>{lang === 'ar' ? 'شكواك ستُعالج خلال 48 ساعة. ستصلك إشعارات بكل تحديث.' : 'Your complaint will be processed within 48 hours. You\'ll receive notifications for every update.'}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
          <a className="btn-gold" style={{ flex: 1, textDecoration: 'none', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }} href={pageHref('dashboard')}>
            {lang === 'ar' ? 'تابع شكواي' : 'Track My Complaint'}
            <Icon name={lang === 'ar' ? 'arrow-left' : 'arrow-right'} className="icon icon-sm" />
          </a>
          <button onClick={() => { setStep(1); setDone(false); setDescription(''); setEvidence([]); setSelectedCategory(''); setLocationPinned(false); }}
            style={{ flex: 1, padding: '0.9rem', background: 'transparent', border: '1.5px solid var(--nile)', borderRadius: '12px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', color: 'var(--nile)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icon name="plus" className="icon icon-sm" />
              {lang === 'ar' ? 'شكوى جديدة' : 'New Complaint'}
            </span>
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
                  <div className={`step-dot ${i + 1 < step ? 'done' : i + 1 === step ? 'active' : 'pending'}`} style={{ width: 28, height: 28, fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {i + 1 < step ? <Icon name="check" size={13} color="#fff" /> : i + 1}
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
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Icon name="map-pin" className="icon icon-sm icon-nile" /> {lang === 'ar' ? 'تحديد الموقع' : 'Select Location'}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{lang === 'ar' ? 'حدد مكان المشكلة على الخريطة أو أدخل العنوان' : 'Pin the location of the issue on the map or enter the address'}</p>
              <div className="map-placeholder" onClick={() => setLocationPinned(true)}>
                <div className="map-grid" />
                <div className="map-pin">{locationPinned ? <Icon name="map-pin" className="icon icon-xl" color="var(--gold)" /> : <Icon name="map" className="icon icon-xl" color="var(--nile-light)" />}</div>
                <p style={{ color: locationPinned ? 'var(--gold)' : '#64748b', fontWeight: 700, zIndex: 1, marginTop: '0.5rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {locationPinned
                    ? <><Icon name="check-circle-2" size={15} color="var(--gold)" /> {lang === 'ar' ? 'تم تحديد الموقع — شارع التحرير، القاهرة' : 'Location pinned — Tahrir St., Cairo'}</>
                    : <>{lang === 'ar' ? 'انقر لتحديد الموقع' : 'Click to pin location'}</>
                  }
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', alignItems: 'center' }}>
                <input className="form-input" style={{ flex: 1 }} placeholder={lang === 'ar' ? 'أو اكتب العنوان هنا...' : 'Or type address here...'} />
                <button style={{ padding: '0.75rem 1.2rem', background: 'var(--nile)', color: '#fff', border: 'none', borderRadius: '10px', fontFamily: 'Cairo', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }} onClick={() => setLocationPinned(true)}>
                  <Icon name="locate-fixed" className="icon icon-sm" color="#fff" />
                  {lang === 'ar' ? 'موقعي' : 'My Location'}
                </button>
              </div>
              <button className="btn-gold" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setStep(2)} disabled={!locationPinned}>
                {lang === 'ar' ? 'التالي ←' : 'Next →'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Icon name="tag" className="icon icon-sm icon-nile" /> {lang === 'ar' ? 'نوع المشكلة' : 'Complaint Category'}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{lang === 'ar' ? 'اكتب لتصفية الفئات أو اختر مباشرة — الذكاء الاصطناعي سيساعدك!' : 'Type to filter or select directly — AI will help you!'}</p>
              <input className="form-input" value={categorySearch} onChange={e => setCategorySearch(e.target.value)} placeholder={lang === 'ar' ? 'ابحث عن فئة... (مثال: كهرباء)' : 'Search category... (e.g. electricity)'} />
              <div className="chips-wrap">
                {filteredCats.map((c, i) => (
                  <div key={i} className={`chip ${selectedCategory === c ? 'selected' : 'default'}`} onClick={() => setSelectedCategory(c)}>{c}</div>
                ))}
              </div>
              {selectedCategory && (
                <div className="alert alert-success" style={{ marginTop: '1rem' }}>
                  <span><Icon name="sparkles" className="icon icon-sm" color="var(--green)" /></span>
                  <span>{lang === 'ar' ? `الذكاء الاصطناعي اقترح: \"${selectedCategory}\" — هل هذا صحيح؟` : `AI Suggested: \"${selectedCategory}\" — Is this correct?`}</span>
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
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon name="pencil-line" className="icon icon-sm icon-nile" />
                {lang === 'ar' ? 'وصف المشكلة' : 'Describe the Problem'}
              </h3>
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
                  {isRecording ? <Icon name="square" className="icon icon-sm" color="#fff" /> : <Icon name="mic" className="icon icon-sm" color="#fff" />}
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{description.length}/1000</span>
                {isRecording && <span style={{ fontSize: '0.75rem', color: 'var(--red)', fontWeight: 700, animation: 'pulse 1s infinite', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}><Icon name="circle-dot" className="icon icon-sm" color="var(--red)" /> {lang === 'ar' ? 'جارٍ التسجيل...' : 'Recording...'}</span>}
              </div>

              {description.length > 0 && (
                <div className="sentiment-bar">
                  <span className="sentiment-emoji"><Icon name={sentDisp.icon} className="icon icon-lg" color={sentDisp.color} /></span>
                  <div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-mid)', fontWeight: 600 }}>{lang === 'ar' ? 'نبرة الشكوى' : 'Complaint Tone'}</p>
                    <p className="sentiment-label" style={{ color: sentDisp.color }}>{sentDisp.label}</p>
                  </div>
                </div>
              )}

              {duplicateWarning && (
                <div className="alert alert-warning">
                  <span><Icon name="triangle-alert" className="icon icon-sm" color="#b07d0f" /></span>
                  <span>{lang === 'ar' ? '34 شخصاً أبلغوا عن مشكلة مماثلة في منطقتك — شكواك ستُضاف لمجموعة الشكاوى لتسريع المعالجة' : '34 people reported a similar issue in your area — your complaint will be grouped for faster processing'}</span>
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
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon name="paperclip" className="icon icon-sm icon-nile" />
                {lang === 'ar' ? 'إضافة الأدلة (اختياري)' : 'Add Evidence (Optional)'}
              </h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                {lang === 'ar' ? 'صور أو فيديوهات تساعد في معالجة شكواك أسرع (حتى 5 ملفات، 50 ميجا)' : 'Photos or videos help process your complaint faster (up to 5 files, 50MB)'}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*,video/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <div
                className="upload-zone"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ marginBottom: '0.5rem' }}><Icon name="folder-up" className="icon icon-xl icon-nile" /></div>
                <p style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{lang === 'ar' ? 'انقر لاختيار الصور أو الفيديوهات' : 'Click to select photos or videos'}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-mid)' }}>PNG, JPG, MP4 — {lang === 'ar' ? 'حتى 50 ميجا' : 'up to 50MB'}</p>
              </div>
              {evidence.length > 0 && (
                <div className="evidence-gallery">
                  {evidence.map((e, i) => (
                    <div key={i} className="evidence-thumb">
                      {e.type === 'video'
                        ? <video src={e.preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <img src={e.preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="evidence" />
                      }
                      <button className="remove-btn" onClick={() => removeEvidence(i)} aria-label="Remove">
                        <Icon name="x" className="icon icon-sm" color="#fff" />
                      </button>
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
              <h3 style={{ fontWeight: 800, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Icon name="check-circle-2" className="icon icon-sm icon-nile" /> {lang === 'ar' ? 'مراجعة وتأكيد' : 'Review & Confirm'}</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{lang === 'ar' ? 'راجع بياناتك قبل الإرسال النهائي' : 'Review your data before final submission'}</p>
              <div style={{ background: 'var(--papyrus)', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.2rem' }}>
                {[
                  [lang === 'ar' ? 'الموقع' : 'Location', lang === 'ar' ? 'شارع التحرير، القاهرة' : 'Tahrir St., Cairo'],
                  [lang === 'ar' ? 'الفئة' : 'Category', selectedCategory],
                  [lang === 'ar' ? 'نبرة الشكوى' : 'Sentiment', sentDisp.label],
                  [lang === 'ar' ? 'الأدلة' : 'Evidence', evidence.length + (lang === 'ar' ? ' ملفات' : ' files')],
                  [lang === 'ar' ? 'وصف المشكلة' : 'Description', description.slice(0, 80) + (description.length > 80 ? '...' : '')],
                ].map(([label, value], i) => (
                  <div key={i} className="review-row">
                    <span className="review-label">{label}</span>
                    <span className="review-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      {i === 0 && <Icon name="map-pin" className="icon icon-sm icon-muted" />}
                      {i === 1 && <Icon name="tag" className="icon icon-sm icon-muted" />}
                      {i === 2 && <Icon name={sentDisp.icon} className="icon icon-sm" color={sentDisp.color} />}
                      {value}
                    </span>
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
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    {loading ? <Icon name="loader-circle" className="icon icon-sm" /> : <Icon name="rocket" className="icon icon-sm" />}
                    {lang === 'ar' ? 'إرسال الشكوى' : 'Submit Complaint'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ lang }) {
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
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="radar" className="icon icon-sm icon-nile" />
            {lang === 'ar' ? 'تحديث: شكواك SHK-2024-0010 انتقلت إلى \"قيد التنفيذ\"' : 'Update: Your complaint SHK-2024-0010 moved to \"In Progress\"'}
          </span>
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, var(--dark), var(--dark2))', padding: '2.5rem 2rem', paddingTop: '5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}><Icon name="hand" className="icon icon-sm icon-muted" /> {lang === 'ar' ? 'مرحباً يعود,' : 'Welcome back,'}</p>
            <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900 }}>{lang === 'ar' ? 'أندرو محمد' : 'Andrew Mohamed'}</h2>
            <p style={{ color: '#475569', fontSize: '0.82rem', marginTop: '0.2rem' }}>ID: 298010XXXXXXXX</p>
          </div>
          <a className="btn-gold" href={pageHref('submit')} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {lang === 'ar' ? '+ شكوى جديدة' : '+ New Complaint'}
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: lang === 'ar' ? 'إجمالي الشكاوى' : 'Total Complaints', val: 6, icon: 'list', color: 'var(--nile)' },
            { label: lang === 'ar' ? 'قيد المراجعة' : 'Under Review', val: 1, icon: 'search', color: 'var(--gold)' },
            { label: lang === 'ar' ? 'قيد التنفيذ' : 'In Progress', val: 2, icon: 'settings', color: '#c084fc' },
            { label: lang === 'ar' ? 'تم الحل' : 'Resolved', val: 1, icon: 'check-circle-2', color: 'var(--green)' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '1.2rem', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '10px', background: s.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={s.icon} className="icon icon-lg" color={s.color} />
              </div>
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
                    <div className="card-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Icon name="map-pin" className="icon icon-sm icon-muted" /> {c.location}</div>
                    <div className="card-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Icon name="clock" className="icon icon-sm icon-muted" /> {c.date}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                      <div className="card-priority" style={{ background: c.priority > 7 ? 'rgba(220,38,38,0.1)' : c.priority > 5 ? 'rgba(212,175,55,0.1)' : 'rgba(46,139,87,0.1)', color: c.priority > 7 ? 'var(--red)' : c.priority > 5 ? '#b07d0f' : 'var(--green)' }}>
                        <Icon name="flame" className="icon icon-sm" />
                        {c.priority}
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

function AdminPage({ lang }) {
  const [activeNav, setActiveNav] = useState('overview');
  const [filterGov, setFilterGov] = useState('all');

  const navItems = lang === 'ar' ? [
    { id: 'overview', icon: 'layout-dashboard', label: 'نظرة عامة' },
    { id: 'complaints', icon: 'list', label: 'الشكاوى' },
    { id: 'analytics', icon: 'line-chart', label: 'التحليلات' },
    { id: 'priority', icon: 'siren', label: 'الأولويات' },
    { id: 'settings', icon: 'settings', label: 'الإعدادات' },
  ] : [
    { id: 'overview', icon: 'layout-dashboard', label: 'Overview' },
    { id: 'complaints', icon: 'list', label: 'Complaints' },
    { id: 'analytics', icon: 'line-chart', label: 'Analytics' },
    { id: 'priority', icon: 'siren', label: 'Priority Queue' },
    { id: 'settings', icon: 'settings', label: 'Settings' },
  ];

  const kpis = [
    { label: lang === 'ar' ? 'شكاوى اليوم' : 'Today\'s Complaints', val: '247', change: '+12%', color: 'var(--gold)', icon: 'list', up: true },
    { label: lang === 'ar' ? 'أولوية عالية' : 'High Priority', val: '34', change: '+3', color: 'var(--red)', icon: 'siren', up: true },
    { label: lang === 'ar' ? 'متوسط وقت المعالجة' : 'Avg. Resolution', val: '2.4d', change: '-18%', color: 'var(--green)', icon: 'timer', up: false },
    { label: lang === 'ar' ? 'معدل الرضا' : 'Satisfaction', val: '87%', change: '+5%', color: 'var(--nile-light)', icon: 'star', up: true },
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
          <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Icon name="shield" className="icon icon-sm icon-gold" /> {lang === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}</div>
          <div className="sidebar-section">{lang === 'ar' ? 'القائمة الرئيسية' : 'MAIN MENU'}</div>
          {navItems.map(item => (
            <div key={item.id} className={`sidebar-item ${activeNav === item.id ? 'active' : ''}`} onClick={() => setActiveNav(item.id)}>
              <span className="icon"><Icon name={item.icon} className="icon icon-sm" /></span>
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
              <span className="icon"><Icon name="user" className="icon icon-sm" /></span>
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
              <button style={{ padding: '0.5rem 1rem', background: 'var(--dark2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94a3b8', fontFamily: 'Cairo', fontSize: '0.82rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <Icon name="download" className="icon icon-sm" />
                {lang === 'ar' ? 'تصدير CSV' : 'Export CSV'}
              </button>
              <button style={{ padding: '0.5rem 1rem', background: 'var(--nile)', border: 'none', borderRadius: '8px', color: '#fff', fontFamily: 'Cairo', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                <Icon name="refresh-cw" className="icon icon-sm" color="#fff" />
                {lang === 'ar' ? 'إعادة تدريب ML' : 'Retrain ML'}
              </button>
            </div>
          </div>

          <div className="kpi-grid">
            {kpis.map((k, i) => (
              <div key={i} className="kpi-card">
                <div className="kpi-icon"><Icon name={k.icon} className="icon icon-lg" /></div>
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
              <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Icon name="bar-chart-3" className="icon icon-sm icon-nile" /> {lang === 'ar' ? 'الشكاوى حسب الفئة' : 'Complaints by Category'}</div>
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
              <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon name="bar-chart-2" className="icon icon-sm icon-nile" />
                {lang === 'ar' ? 'توزيع المشاعر' : 'Sentiment Distribution'}
              </div>
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
              <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Icon name="map" className="icon icon-sm icon-nile" /> {lang === 'ar' ? 'خريطة الكثافة — مصر' : 'Density Map — Egypt'}</div>
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
                <div style={{ opacity: 0.15 }}><Icon name="map" className="icon icon-xl" color="#64748b" /></div>
                <p style={{ color: '#475569', fontSize: '0.8rem', position: 'absolute', bottom: '0.8rem' }}>
                  {lang === 'ar' ? 'القاهرة: 247 شكوى | الجيزة: 128 | الإسكندرية: 94' : 'Cairo: 247 | Giza: 128 | Alexandria: 94'}
                </p>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Icon name="line-chart" className="icon icon-sm icon-nile" /> {lang === 'ar' ? 'اتجاهات آخر 30 يوم' : 'Trends — Last 30 Days'}</div>
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
              <span style={{ animation: 'pulse 1.5s infinite', color: 'var(--red)' }}><Icon name="dot" className="icon icon-sm" color="var(--red)" /></span>
              {lang === 'ar' ? 'الشكاوى ذات الأولوية القصوى' : 'Top Priority Complaints'}
            </div>
            {priorityQueue.map((p, i) => (
              <div key={i} className="priority-card">
                <div className="priority-score" style={{ background: p.color + '20', color: p.color, fontFamily: 'JetBrains Mono, monospace' }}>
                  {p.score}
                </div>
                <div className="priority-content">
                  <div className="priority-title">{p.title}</div>
                  <div className="priority-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                    <Icon name="map-pin" className="icon icon-sm" />
                    <span>{p.location}</span>
                    <span style={{ opacity: 0.6 }}>·</span>
                    <Icon name="tag" className="icon icon-sm" />
                    <span>{p.cat}</span>
                  </div>
                </div>
                <div className="priority-thumb">{i % 2 === 0 ? <Icon name="camera" className="icon icon-lg icon-muted" /> : <Icon name="video" className="icon icon-lg icon-muted" />}</div>
                <button style={{ padding: '0.4rem 0.8rem', background: 'var(--nile)', border: 'none', borderRadius: '8px', color: '#fff', fontFamily: 'Cairo', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  {lang === 'ar' ? 'تعيين' : 'Assign'}
                  <Icon name={lang === 'ar' ? 'arrow-left' : 'arrow-right'} className="icon icon-sm" color="#fff" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageShell({ current, children }) {
  const [lang, setLang] = useLang();
  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar current={current} lang={lang} setLang={setLang} />
      {children(lang)}
    </div>
  );
}

function mountPage() {
  const root = document.getElementById('root');
  if (!root) return;
  const page = document.body?.dataset?.page || 'home';
  const reactRoot = ReactDOM.createRoot(root);

  switch (page) {
    case 'home':
      reactRoot.render(<PageShell current="home">{(lang) => <HomePage lang={lang} />}</PageShell>);
      return;
    case 'register':
      reactRoot.render(<PageShell current="register">{(lang) => <RegisterPage lang={lang} />}</PageShell>);
      return;
    case 'submit':
      reactRoot.render(<PageShell current="submit">{(lang) => <SubmitPage lang={lang} />}</PageShell>);
      return;
    case 'dashboard':
      reactRoot.render(<PageShell current="dashboard">{(lang) => <DashboardPage lang={lang} />}</PageShell>);
      return;
    case 'admin':
      reactRoot.render(<PageShell current="admin">{(lang) => <AdminPage lang={lang} />}</PageShell>);
      return;
    default:
      reactRoot.render(<PageShell current="home">{(lang) => <HomePage lang={lang} />}</PageShell>);
  }
}

mountPage();

