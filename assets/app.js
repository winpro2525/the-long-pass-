
        // ==========================================================
        //              تركيب العناصر المشتركة (رأس/نوافذ/تذييل)
        // ==========================================================
        const HTM = {
            header: `<header class="sticky top-0 z-40 backdrop-blur-xl border-b" style="background: color-mix(in srgb, var(--bg) 80%, transparent); border-color: var(--border)">
    <div class="max-w-6xl mx-auto px-3 py-2.5 flex items-center justify-between gap-2">
        <a href="students.html" class="flex items-center gap-2.5 shrink-0">
            <div class="w-2.5 h-8 skew-x-[-14deg]" style="background: linear-gradient(var(--gold), var(--violet))"></div>
            <div>
                <div class="font-tech text-base md:text-lg font-black tracking-widest">THE LONG <span class="gold">PASS</span></div>
                <div class="text-[9px] gold tracking-[.2em] font-bold hidden sm:block">منصة تعليمية</div>
            </div>
        </a>
        <div class="flex items-center gap-1.5">
            <button id="theme-btn" type="button" class="btn btn-soft btn-icon" aria-label="تبديل الوضع"><span>☀️</span></button>
            <button id="admin-btn" type="button" class="btn btn-ghost btn-sm font-tech hidden">[ ADMIN ]</button>
            <button id="notif-btn" type="button" class="btn btn-soft btn-icon relative" aria-label="الإشعارات" title="الإشعارات">🔔<span id="notif-count" class="badge-dot hide"></span></button>
            <div id="user-chip" class="hidden items-center gap-2 cursor-pointer px-2 py-1.5 frame" style="background: var(--panel2)" title="ملفي">
                <div class="w-8 h-8 rounded-full overflow-hidden grid place-items-center font-black text-sm shrink-0" style="background: rgba(var(--gold-rgb),.18); color: var(--gold)" id="chip-avatar"></div>
                <div class="hidden sm:block leading-tight"><div class="text-[11px] font-black" id="chip-name"></div><div class="text-[9.5px] gold font-bold" id="chip-level"></div></div>
                <div class="text-[11px] font-tech font-black gold ps-1" id="chip-points"></div>
            </div>
            <button id="auth-btn" type="button" class="btn btn-gold btn-sm">دخول</button>
            <button id="menu-btn" type="button" class="btn btn-soft btn-icon lg:hidden" aria-label="القائمة">☰</button>
        </div>
    </div>
    <nav class="hidden lg:flex items-center justify-center gap-0.5 text-[12.5px] max-w-6xl mx-auto px-3 pb-1.5" id="main-nav"></nav>
    <div id="mobile-menu" class="hidden lg:hidden px-3 pb-2.5 text-sm font-bold grid grid-cols-2 gap-1"></div>
</header>`,
            footer: `<footer class="border-t mt-12 py-6" style="border-color: var(--border)">
    <div class="max-w-6xl mx-auto px-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div class="font-tech font-black tracking-widest">THE LONG <span class="gold">PASS</span></div>
        <div class="flex flex-wrap gap-x-4 gap-y-1 muted justify-center">
            <a href="students.html">الرئيسية</a><a href="announcements.html">الإعلانات</a><a href="content.html">المحتوى</a>
            <a href="members.html">الأعضاء</a><a href="hall.html">لوحة الشرف</a><a href="chat.html">الدردشة</a><a href="index.html">الموقع</a>
        </div>
        <div class="muted">© <span id="year"></span> THE LONG PASS</div>
    </div>
</footer>`,
            notif: `<!-- ======================= لوحة الإشعارات ======================= -->
    <aside id="notif-panel" aria-label="الإشعارات">
        <div class="flex items-center justify-between p-3.5 border-b" style="border-color: var(--border)">
            <div>
                <div class="kicker">// الإشعارات</div>
                <div class="font-black">الإشعارات</div>
            </div>
            <div class="flex gap-1.5">
                <button id="notif-readall" class="btn btn-soft btn-sm">قرأت الكل</button>
                <button id="notif-close" class="btn btn-soft btn-sm">✕</button>
            </div>
        </div>
        <div id="notif-list" class="flex-1 overflow-y-auto"></div>
    </aside>

    `,
            post: `<!-- ======================= نافذة المنشور ======================= -->
    <div id="post-modal" class="overlay fixed inset-0 z-50 hidden items-center justify-center p-3">
        <div class="frame max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 md:p-6" style="border-color: rgba(var(--gold-rgb),.6)">
            <div class="flex justify-between items-center pb-3 mb-4 border-b" style="border-color: var(--border)">
                <div class="flex items-center gap-2">
                    <span id="modal-sec" class="chip chip-gold font-tech"></span>
                    <span id="modal-filebadge" class="chip hide"></span>
                </div>
                <div class="flex gap-2">
                    <button type="button" id="share-btn" class="btn btn-soft btn-sm">🔗 مشاركة <span class="gold">+3</span></button>
                    <button type="button" data-close="post-modal" class="btn btn-danger btn-sm">✕</button>
                </div>
            </div>
            <h2 id="modal-title" class="text-2xl font-black mb-3"></h2>
            <div id="modal-meta" class="flex flex-wrap gap-2 mb-4 text-xs"></div>
            <div id="modal-media" class="mb-4 overflow-hidden" style="background:#000"></div>
            <p id="modal-content" class="leading-relaxed whitespace-pre-line mb-5"></p>

            <div id="modal-files-wrap" class="mb-5" hidden>
                <h3 class="font-black mb-2.5">📥 الملفات المرفقة <span id="modal-files-count" class="chip"></span></h3>
                <div id="modal-files" class="flex flex-col gap-2"></div>
            </div>
            <div id="modal-link-box" class="mb-5"></div>

            <div class="flex items-center gap-3 mb-5 pb-4 border-b" style="border-color: var(--border)">
                <button type="button" id="like-btn" class="like-btn"><span class="heart">🤍</span> <span id="like-count">0</span></button>
                <span class="text-[11px] muted">الإعجاب يمنحك نقطة</span>
                <div id="modal-admin-box" class="hidden gap-2 ms-auto">
                    <button type="button" id="sedit-btn" class="btn btn-cyan btn-sm">✏️</button>
                    <button type="button" id="sdelete-btn" class="btn btn-danger btn-sm">🗑</button>
                </div>
            </div>

            <h3 class="font-black mb-2.5">💬 التعليقات <span id="comments-count" class="chip"></span></h3>
            <div id="comments-list" class="flex flex-col gap-2 mb-4"></div>
            <div id="comment-form" class="hidden">
                <div id="c-file-preview" class="file-row mb-2 hidden">
                    <div class="file-ico">📎</div>
                    <div class="flex-1 text-sm font-bold truncate" id="c-file-name"></div>
                    <button type="button" id="c-file-remove" class="btn btn-danger btn-sm">✕</button>
                </div>
                <div class="flex items-end gap-2">
                    <textarea id="c-input" rows="2" class="field resize-none flex-1" placeholder="اكتب تعليقاً..." maxlength="1000"></textarea>
                    <div class="flex flex-col gap-1.5">
                        <button type="button" id="c-attach" class="btn btn-soft btn-sm" title="إرفاق">📎</button>
                        <input type="file" id="c-file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" class="hidden">
                        <button type="button" id="c-send" class="btn btn-gold btn-sm font-tech">➤</button>
                    </div>
                </div>
            </div>
            <p id="comment-guest-hint" class="muted text-sm">سجّل الدخول لتكتب تعليقاً وتكسب نقاطاً.</p>
        </div>
    </div>

    `,
            auth: `<!-- ======================= نافذة الدخول ======================= -->
    <div id="auth-modal" class="overlay fixed inset-0 z-50 hidden items-center justify-center p-3">
        <div class="frame max-w-md w-full p-5" style="border-color: rgba(var(--gold-rgb),.55)">
            <div class="flex justify-between items-center pb-3 mb-4 border-b" style="border-color: var(--border)">
                <h2 class="font-tech text-base gold font-bold">// الدخول</h2>
                <button type="button" data-close="auth-modal" class="btn btn-soft btn-sm">✕</button>
            </div>
            <div class="flex gap-1 mb-4 border-b" style="border-color: var(--border)">
                <button type="button" class="tab-btn active" data-atab="login">دخول</button>
                <button type="button" class="tab-btn" data-atab="signup">حساب جديد</button>
            </div>
            <form id="login-form" class="space-y-3">
                <div><label class="label">البريد الإلكتروني</label><input type="email" id="l-email" required autocomplete="username" dir="ltr" class="field"></div>
                <div><label class="label">كلمة المرور</label><input type="password" id="l-pass" required autocomplete="current-password" dir="ltr" class="field"></div>
                <button type="submit" id="login-btn" class="btn btn-gold w-full font-tech tracking-widest">LOGIN</button>
            </form>
            <form id="signup-form" class="space-y-3 hidden">
                <div class="grid grid-cols-2 gap-2.5">
                    <div><label class="label">الاسم المعروض</label><input type="text" id="u-display" required maxlength="30" class="field" placeholder="يوسف"></div>
                    <div><label class="label">اسم المستخدم</label><input type="text" id="u-username" required maxlength="20" pattern="[a-zA-Z0-9_]{3,20}" dir="ltr" class="field" placeholder="yousef_g"></div>
                </div>
                <div><label class="label">البريد الإلكتروني</label><input type="email" id="u-email" required autocomplete="username" dir="ltr" class="field"></div>
                <div><label class="label">كلمة المرور (6+)</label><input type="password" id="u-pass" required minlength="6" autocomplete="new-password" dir="ltr" class="field"></div>
                <button type="submit" id="signup-btn" class="btn btn-violet w-full font-tech tracking-widest">CREATE</button>
            </form>
            <p id="auth-status" class="text-center text-xs font-bold mt-3"></p>
            <button type="button" id="resend-btn" class="btn btn-soft w-full mt-2.5 hidden text-xs">📧 إرسال رابط تأكيد البريد</button>
        </div>
    </div>

    `,
            prof: `<!-- ======================= نافذة الملف الشخصي ======================= -->
    <div id="profile-modal" class="overlay fixed inset-0 z-50 hidden items-center justify-center p-3">
        <div class="frame max-w-md w-full p-5" style="border-color: rgba(var(--gold-rgb),.55)">
            <div class="flex justify-between items-center pb-3 mb-4 border-b" style="border-color: var(--border)">
                <h2 class="font-tech text-base gold font-bold">// MY SIGIL</h2>
                <button type="button" data-close="profile-modal" class="btn btn-soft btn-sm">✕</button>
            </div>
            <form id="profile-form" class="space-y-3">
                <div class="flex items-center gap-3">
                    <div class="w-16 h-16 rounded-full overflow-hidden grid place-items-center font-black text-xl shrink-0" style="background: rgba(var(--gold-rgb),.16); color: var(--gold)" id="pf-avatar-preview"></div>
                    <div class="flex-1"><label class="label">صورة الملف (حتى 4 م.ب)</label><input type="file" id="pf-avatar" accept="image/*" class="field text-xs"></div>
                </div>
                <div><label class="label">الاسم المعروض</label><input type="text" id="pf-display" maxlength="30" required class="field"></div>
                <div><label class="label">اسم المستخدم</label><input type="text" id="pf-username" maxlength="20" pattern="[a-zA-Z0-9_]{3,20}" dir="ltr" required class="field"></div>
                <button type="submit" id="pf-save" class="btn btn-gold w-full">حفظ</button>
            </form>
        </div>
    </div>

    `,
            pwa: `<button id="pwa-install" type="button" hidden>📲 ثبّت التطبيق</button>
<div id="pwa-tip" hidden><div class="box">
    <h3>📲 التثبيت على iPhone</h3>
    <p>اضغط زر المشاركة في Safari ثم «إضافة إلى الشاشة الرئيسية».</p>
    <button type="button" id="pwa-tip-close">فهمت</button>
</div></div>`
        };
        const NAV = [
            ['home', 'students.html', '🏠', 'الرئيسية'],
            ['ann', 'announcements.html', '📣', 'الإعلانات'],
            ['content', 'content.html', '🗂', 'المحتوى'],
            ['exams', 'exams.html', '📝', 'الامتحانات'],
            ['homework', 'homework.html', '📥', 'الواجبات'],
            ['results', 'results.html', '📊', 'النتائج'],
            ['members', 'members.html', '👥', 'الأعضاء'],
            ['hall', 'hall.html', '🏆', 'لوحة الشرف'],
            ['chat', 'chat.html', '💬', 'الدردشة'],
            ['contact', 'contact.html', '✉️', 'تواصل معي']
        ];
        (function mountComponents() {
            const page = document.body.dataset.page || 'home';
            const link = (p, href, ic, label, cls) => '<a href="' + href + '" class="' + cls + (p === page ? ' active' : '') + '">' + ic + ' ' + label + '</a>';
            document.body.insertAdjacentHTML('afterbegin', HTM.header + HTM.notif);
            document.body.insertAdjacentHTML('beforeend', HTM.post + HTM.auth + HTM.prof + HTM.pwa + HTM.footer);
            const nav = document.getElementById('main-nav');
            if (nav) nav.innerHTML = NAV.map(n => link(n[0], n[1], n[2], n[3], 'nav-link')).join('') +
                (page === 'admin' ? '<a href="admin.html" class="nav-link active">⚙️ لوحة التحكم</a>' : '');
            const hdr = document.querySelector('header');
            const setHdr = () => document.documentElement.style.setProperty('--header-h', hdr.offsetHeight + 'px');
            setHdr(); window.addEventListener('resize', setHdr);
            window.addEventListener('load', setHdr); setTimeout(setHdr, 400);
            if (window.ResizeObserver) new ResizeObserver(setHdr).observe(hdr);
            const mm = document.getElementById('mobile-menu');
            if (mm) mm.innerHTML = NAV.map(n => link(n[0], n[1], n[2], n[3], 'block px-3 py-2 muted frame')).join('') +
                '<a id="admin-menu-link" href="admin.html" class="hidden px-3 py-2 gold frame">⚙️ لوحة التحكم</a>' +
                '<a href="index.html" class="block px-3 py-2 muted frame">← الرئيسية</a>';
        })();


        // ==========================================================
        // الإعدادات (نفس الموقع الرئيسي)
        // ==========================================================
        const CONFIG = {
            supabaseUrl: 'https://zlpxqwufqevkjomqohdp.supabase.co',
            supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpscHhxd3VmcWV2a2pvbXFvaGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1NTMwMzksImV4cCI6MjExMDEyOTAzOX0.Yidf7PC0vrYkJy1DmrvYS2s-7-Cm_w24Q3CrU73ibI0',
            adminEmail: 'winprowink@gmail.com',
            mediaBucket: 'gaming-media',    // منشورات الأدمن
            studentBucket: 'student-media', // صور البروفايل ومرفقات الطلاب (صور + PDF فقط)
            maxStudentFile: 3 * 1024 * 1024,   // 3MB للحفاظ على مساحة الموقع
            maxAdminFile: 50 * 1024 * 1024     // 50MB لمنشورات الأدمن
        };

        const SECTIONS = {
            guides: { name: 'شروحات',  icon: '📘' },
            files:  { name: 'ملفات',   icon: '📦' },
            videos: { name: 'فيديوهات', icon: '🎬' }
        };
        const POINTS = { daily: 2, like: 1, comment: 2, share: 3 };

        const sb = supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
        const $ = (id) => document.getElementById(id);
        const on = (id, ev, fn, opts) => { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn, opts); };
        const has = (id) => !!document.getElementById(id);

        let me = null;             // صف الملف الشخصي
        let session = null;
        let isAdmin = false;
        let posts = [];
        let levels = [];
        let likesByPost = {};      // post_id -> count
        let myLikes = new Set();
        let currentPost = null;
        let currentSection = 'ALL';
        let editingPost = null;
        let pendingFiles = [];
        let keptAttachments = [];
        let cFile = null;          // مرفق التعليق
        let chatFile = null;       // مرفق الدردشة

        // ---------------------------------------------------------- أدوات
        function esc(str) { return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
        function safeUrl(u) {
            const s = String(u || '').trim();
            if (/^data:image\/(jpeg|png|webp|gif);base64,[a-z0-9+/=]+$/i.test(s)) return s;
            try { const x = new URL(s); return (x.protocol === 'http:' || x.protocol === 'https:') ? x.href : null; } catch { return null; }
        }
        function fmtSize(b) { if (!b && b !== 0) return ''; const u = ['B','KB','MB','GB']; let i = 0, n = b; while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; } return (i === 0 ? n : n.toFixed(1)) + ' ' + u[i]; }
        function fileIcon(name) { const ext = (name.split('.').pop() || '').toLowerCase();
            if (['zip','rar','7z'].includes(ext)) return '🗜️'; if (['pdf'].includes(ext)) return '📕';
            if (['png','jpg','jpeg','gif','webp'].includes(ext)) return '🖼️'; if (['mp4','webm','mkv'].includes(ext)) return '🎬';
            return '📄'; }
        function youtubeEmbed(url) { try { const u = new URL(url); let id = null;
            if (u.hostname.includes('youtu.be')) id = u.pathname.slice(1);
            else if (u.hostname.includes('youtube.com')) id = u.searchParams.get('v') || (u.pathname.startsWith('/embed/') ? u.pathname.split('/')[2] : null);
            return id && /^[\w-]{6,15}$/.test(id) ? 'https://www.youtube.com/embed/' + id : null; } catch { return null; } }
        function storagePathFromUrl(url) { if (!url) return null; const marker = '/object/public/'; const i = url.indexOf(marker); if (i === -1) return null; return decodeURIComponent(url.substring(i + marker.length).split('?')[0]); }
        function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

        function toast(msg, type) {
            const el = document.createElement('div'); el.className = 'toast ' + (type || ''); el.textContent = msg;
            $('toasts').appendChild(el);
            setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, 3800);
        }

        // ترجمة أخطاء الحسابات إلى رسائل عربية مفهومة
        function authError(err) {
            const c = (err && (err.code || err.error_code)) || '';
            const m = String((err && err.message) || err || '');
            if (c === 'email_not_confirmed' || /email not confirmed/i.test(m))
                return 'لم تؤكّد بريدك بعد — افتح رسالة التأكيد في بريدك (وانظر مجلد Spam)، أو اضغط «إرسال رابط تأكيد البريد»';
            if (c === 'invalid_credentials' || /invalid login credentials/i.test(m))
                return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
            if (c === 'over_email_send_rate_limit' || /rate limit|too many/i.test(m))
                return 'محاولات كثيرة — انتظر دقيقة ثم أعد المحاولة';
            if (c === 'user_already_exists' || /already registered|already been registered/i.test(m))
                return 'هذا البريد مسجّل مسبقاً — استخدم تبويب «دخول»';
            if (c === 'weak_password' || /password should be/i.test(m))
                return 'كلمة المرور ضعيفة — استخدم 6 أحرف على الأقل';
            if (/invalid email/i.test(m)) return 'صيغة البريد الإلكتروني غير صحيحة';
            if (/fetch|network|failed to fetch/i.test(m)) return 'تعذّر الاتصال بالخادم — تحقق من الإنترنت';
            return m;
        }
        let lastAuthEmail = '';
        function authMsg(msg, isError) {
            const el = $('auth-status');
            el.className = 'text-center text-xs font-bold mt-3 ' + (isError ? 'text-red-500' : 'accent2');
            el.textContent = msg;
        }
        async function resendConfirmation() {
            const email = lastAuthEmail || $('l-email').value.trim() || $('u-email').value.trim();
            if (!email) { authMsg('اكتب بريدك أولاً في الحقل أعلاه', true); $('resend-btn').classList.remove('hidden'); return; }
            lastAuthEmail = email;
            const btn = $('resend-btn'); btn.disabled = true; btn.textContent = '⏳ جاري الإرسال...';
            const { error } = await sb.auth.resend({ type: 'signup', email });
            btn.disabled = false; btn.textContent = '📧 إرسال رابط تأكيد البريد';
            if (error) { authMsg('تعذّر الإرسال: ' + authError(error), true); return; }
            authMsg('✅ أُرسل رابط التأكيد إلى ' + email + ' — افتح الرسالة ثم عد وسجّل الدخول', false);
        }
        on('resend-btn', 'click', resendConfirmation);
        function dbError(err) {
            const m = String((err && err.message) || err || '');
            if (/row-level security|policy|AccessDenied|Unauthorized/i.test(m))
                return 'المساحة مرفوضة — شغّل ملف "sql الثالث" في Supabase ثم أعد المحاولة';
            if (/Bucket not found|NoSuchBucket/i.test(m))
                return 'المخزن غير موجود — شغّل ملف "sql الثالث" في Supabase';
            if (/rate limit/i.test(m))
                return 'محاولات كثيرة — انتظر بضع دقائق ثم أعد المحاولة';
            if (/UPLOAD_TIMEOUT/i.test(m))
                return 'المخزن لم يستجب في الوقت المتوقع — تحقق من اتصالك';
            if (/duplicate key/i.test(m))
                return 'هذا الاسم مستخدم مسبقاً — اختر اسماً آخر';
            if (/mime type .* is not supported/i.test(m))
                return 'نوع هذا الملف غير مسموح في المخزن — اسمح بـ PDF من إعدادات المخزن أو شغّل ملف SQL الشامل';
            if (/exceeded the maximum allowed size|too large/i.test(m))
                return 'حجم الملف أكبر من الحد المسموح في المخزن';
            return m;
        }
        // مؤقت أمان: أي رفع لا يستغرق أكثر من 60 ثانية
        function withTimeout(p, ms, msg) {
            return Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(msg)), ms))]);
        }
        // ضغط الصور: محمي بمهلة — إن تعثّر الضغط نرفع الملف الأصلي كما هو (مثل الصفحة الرئيسية)
        async function compressImage(file, maxDim, quality) {
            if (!file.type || !file.type.startsWith('image/') || file.type === 'image/gif') return file;
            try {
                return await withTimeout(_compress(file, maxDim, quality), 8000, 'COMPRESS_TIMEOUT');
            } catch { return file; }
        }
        async function _compress(file, maxDim, quality) {
            const img = await createImageBitmap(file);
            const scale = Math.min(1, (maxDim || 512) / Math.max(img.width, img.height));
            if (scale === 1 && file.size < 300 * 1024) return file;
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(img.width * scale));
            canvas.height = Math.max(1, Math.round(img.height * scale));
            canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
            const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', quality || 0.85));
            if (!blob || blob.size >= file.size) return file;
            return new File([blob], (file.name.replace(/\.[^.]+$/, '') || 'image') + '.jpg', { type: 'image/jpeg' });
        }

        // رفع ملف إلى مخزن الطلاب: يعيد بيانات المرفق، ويطلق استثناءً عند الفشل
        async function uploadStudentFile(file, folder, maxDim, quality, ms) {
            let f = file;
            try { f = await compressImage(file, maxDim || 1280, quality || 0.85); } catch {}
            const ext = (f.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
            const path = folder + '/' + me.id + '/' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + '.' + ext;
            const { error } = await withTimeout(
                sb.storage.from(CONFIG.studentBucket).upload(path, f, { contentType: f.type || 'application/octet-stream', upsert: true }),
                ms || 45000, 'UPLOAD_TIMEOUT');
            if (error) throw error;
            return { name: f.name, path, size: f.size, type: f.type };
        }
        // نسخة مدمجة من الصورة (تعمل حتى لو تعذّر الوصول للمخزن)
        function toDataUrl(file, maxBytes) {
            return new Promise(res => {
                if (!file || file.size > (maxBytes || 140000)) return res(null);
                const r = new FileReader();
                r.onload = () => res(typeof r.result === 'string' && r.result.startsWith('data:image/') ? r.result : null);
                r.onerror = () => res(null);
                r.readAsDataURL(file);
            });
        }

        function applyTheme(t, animate) {
            document.documentElement.setAttribute('data-theme', t);
            const tb = $('theme-btn');
            if (tb) tb.firstElementChild.textContent = t === 'dark' ? '☀️' : '🌙';
            const mt = document.querySelector('meta[name="theme-color"]');
            if (mt) mt.setAttribute('content', t === 'dark' ? '#090b0e' : '#f1f4f9');
            try { localStorage.setItem('tlp-theme', t); } catch {}
            if (animate && tb) { tb.classList.add('spin'); setTimeout(() => tb.classList.remove('spin'), 500); }
        }
        on('theme-btn', 'click', () => applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));
        applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');

        on('menu-btn', 'click', () => $('mobile-menu').classList.toggle('hidden'));

        // ---------------------------------------------------------- النوافذ
        const openModals = new Set(), closeTimers = {};
        function openModal(id) {
            const ov = $(id); if (!ov) return;
            const box = ov.firstElementChild;
            clearTimeout(closeTimers[id]);
            ov.classList.remove('hidden'); ov.classList.add('flex');
            box.classList.remove('modal-exit'); box.classList.add('modal-enter');
            openModals.add(id); document.body.classList.add('lock');
        }
        function closeModal(id) {
            const ov = $(id); if (!ov || ov.classList.contains('hidden')) return;
            const box = ov.firstElementChild;
            box.classList.remove('modal-enter'); box.classList.add('modal-exit');
            ov.querySelectorAll('video').forEach(v => v.pause());
            closeTimers[id] = setTimeout(() => {
                ov.classList.add('hidden'); ov.classList.remove('flex');
                openModals.delete(id); if (!openModals.size) document.body.classList.remove('lock');
                if (id === 'post-modal') {
                    if ($('modal-media')) $('modal-media').innerHTML = '';
                    if (location.hash.startsWith('#post-')) history.replaceState(null, '', location.pathname + location.search);
                }
            }, 240);
        }
        document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(b.dataset.close)));
        ['post-modal','auth-modal','profile-modal'].forEach(id => { const el = $(id); if (el) el.addEventListener('mousedown', (e) => { if (e.target.id === id) closeModal(id); }); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                ['post-modal','auth-modal','profile-modal'].forEach(closeModal);
                const np = document.getElementById('notif-panel');
                if (np) np.classList.remove('open');
            }
        });

        // تبويبات نوافذ الدخول والإدارة
        document.querySelectorAll('[data-atab]').forEach(b => b.addEventListener('click', () => {
            document.querySelectorAll('[data-atab]').forEach(x => x.classList.toggle('active', x === b));
            $('login-form').classList.toggle('hidden', b.dataset.atab !== 'login');
            $('signup-form').classList.toggle('hidden', b.dataset.atab !== 'signup');
        }));
        document.querySelectorAll('[data-mtab]').forEach(b => b.addEventListener('click', () => {
            document.querySelectorAll('[data-mtab]').forEach(x => x.classList.toggle('active', x === b));
            document.querySelectorAll('.mtab-pane').forEach(p => p.classList.toggle('hidden', p.id !== b.dataset.mtab));
        }));

        // ---------------------------------------------------------- المستويات
        // الوسم والميدالية يحددهما الأدمن يدوياً — لا شيء تلقائي
        function designation(p) {
            const medal = p && p.medal ? String(p.medal).trim() : '';
            const tag = p && p.tag ? String(p.tag).trim() : '';
            return { medal, tag, text: [medal, tag].filter(Boolean).join(' ') };
        }
        function renderProfile() {
            const logged = !!me;
            const setT = (id, v) => { const e = $(id); if (e) e.textContent = v; };
            const pc = $('profile-card'), pg = $('profile-guest'), chip = $('user-chip'), ab = $('auth-btn');
            if (pc) pc.classList.toggle('hidden', !logged);
            if (pg) pg.classList.toggle('hidden', logged);
            if (chip) { chip.classList.toggle('hidden', !logged); chip.classList.toggle('flex', logged); }
            if (ab) ab.classList.toggle('hidden', logged);
            if (!logged) return;
            const d = designation(me);
            setT('chip-name', me.display_name || me.username || '');
            setT('chip-level', d.text || 'طالب');
            setT('chip-points', me.points + ' PT');
            const ca = $('chip-avatar');
            if (ca) {
                const av = safeUrl(me.avatar_url);
                ca.innerHTML = av ? '<img src="' + esc(av) + '" alt="" class="w-full h-full object-cover">' : esc((me.display_name || me.username || '?').charAt(0));
            }
            setT('prof-name', me.display_name || me.username || '');
            setT('prof-username', '@' + (me.username || ''));
            setT('prof-lvl', d.text || 'طالب');
            setT('prof-points', me.points + ' نقطة');
            setT('prof-visits', (me.visits || 0) + ' زيارة');
            const pa = $('prof-avatar');
            if (pa) {
                const av2 = safeUrl(me.avatar_url);
                pa.innerHTML = av2 ? '<img src="' + esc(av2) + '" alt="" class="w-full h-full object-cover">' : esc((me.display_name || me.username || '?').charAt(0));
            }
        }
        // ---------------------------------------------------------- الجلسة والحسابات
        async function loadProfile(uid) {
            const { data } = await sb.from('profiles').select('*').eq('id', uid).maybeSingle();
            if (data) return data;
            // ترميم ذاتي: إن فقد الملف أنشئه من بيانات الحساب (مع إعادة محاولة عند تضارب الاسم)
            const base = ('user_' + (session.user.email || uid).split('@')[0]).replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 16) || 'student';
            let uname = base;
            for (let i = 0; i < 5; i++) {
                const r = await sb.from('profiles').insert({ id: uid, username: uname, display_name: uname }).select().single();
                if (!r.error) return r.data;
                if (/duplicate/i.test(r.error.message || '') || r.error.code === '23505') {
                    uname = (base + '_' + Math.random().toString(36).slice(2, 6)).slice(0, 20);
                    continue;
                }
                toast('تعذّر إنشاء ملفك الشخصي: ' + dbError(r.error), 'error');
                return null;
            }
            toast('تعذّر إنشاء ملفك الشخصي — أعد المحاولة لاحقاً', 'error');
            return null;
        }

        async function refreshMe() {
            if (!session || !session.user) { me = null; renderProfile(); return; }
            me = await loadProfile(session.user.id);
            if (me && me.is_banned) { await sb.auth.signOut(); me = null; toast('حسابك محظور حالياً. تواصل مع الإدارة.', 'error'); }
            renderProfile();
            if (me && !me.is_banned) {
                sb.rpc('claim_daily_visit').then(async () => {
                    if (!isAdmin) await loadMeRefresh();
                    renderRanking();
                }).catch(() => {});
            }
        }
        async function loadMeRefresh() { if (session) { const d = await sb.from('profiles').select('*').eq('id', session.user.id).maybeSingle(); if (d.data) { me = d.data; renderProfile(); } } }

        function updateAuthUI() {
            isAdmin = !!(session && session.user && session.user.email === CONFIG.adminEmail);
            const ab = $('admin-btn');
            if (ab) { ab.classList.toggle('hidden', !isAdmin); ab.textContent = '[ ADMIN ✓ ]'; }
            const al = $('admin-link'); if (al) al.classList.toggle('hidden', !isAdmin);
            const aml = $('admin-menu-link'); if (aml) aml.classList.toggle('hidden', !isAdmin);
            const ax = $('ann-admin-box'); if (ax) ax.classList.toggle('hidden', !isAdmin);
            const hint = $('chat-login-hint'), box = $('chat-box'), join = $('chat-join');
            if (hint) hint.classList.toggle('hidden', !!session);
            if (box) box.classList.toggle('hidden', !session);
            if (join) join.classList.toggle('hidden', !!session);
            if ($('chat-list')) { if (session) loadChat(); else $('chat-list').innerHTML = '<p class="muted text-sm text-center py-6">سجّل الدخول لرؤية الدردشة والمشاركة فيها.</p>'; }
            if (isAdmin) loadAdminData();
            loadNotifications();
        }
        on('auth-btn', 'click', () => openModal('auth-modal'));
        on('guest-join', 'click', () => openModal('auth-modal'));
        on('chat-join', 'click', () => openModal('auth-modal'));
        function openProfileEditor() {
            $('pf-display').value = me?.display_name || '';
            $('pf-username').value = me?.username || '';
            $('pf-avatar').value = '';
            $('pf-avatar-preview').textContent = (me?.display_name || '?').charAt(0);
            const av = safeUrl(me?.avatar_url);
            if (av) $('pf-avatar-preview').innerHTML = '<img src="' + esc(av) + '" alt="" class="w-full h-full object-cover">';
            openModal('profile-modal');
        }
        on('user-chip', 'click', openProfileEditor);
        on('notif-panel', 'click', (e) => { if (e.target.id === 'notif-panel') closeNotif(); });
        on('edit-profile-btn', 'click', openProfileEditor);

        on('login-form', 'submit', async (e) => {
            e.preventDefault();
            const btn = $('login-btn'); btn.disabled = true; authMsg('');
            const email = $('l-email').value.trim();
            const { error } = await sb.auth.signInWithPassword({ email, password: $('l-pass').value });
            btn.disabled = false;
            if (error) {
                lastAuthEmail = email;
                authMsg(authError(error), true);
                if (/not confirmed|rate limit/i.test(authError(error))) $('resend-btn').classList.remove('hidden');
                return;
            }
            $('resend-btn').classList.add('hidden');
            $('login-form').reset(); closeModal('auth-modal'); toast('أهلاً بعودتك! 🎉', 'ok');
        });

        on('signup-form', 'submit', async (e) => {
            e.preventDefault();
            const btn = $('signup-btn'); btn.disabled = true; authMsg('');
            const username = $('u-username').value.trim();
            if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) { btn.disabled = false; authMsg('اسم المستخدم: 3-20 حرفاً إنجليزياً/أرقام/شرطة سفلية فقط', true); return; }
            const email = $('u-email').value.trim();
            lastAuthEmail = email;
            const { data, error } = await sb.auth.signUp({
                email, password: $('u-pass').value,
                options: { data: { username, display_name: $('u-display').value.trim() } }
            });
            btn.disabled = false;
            if (error) { authMsg(authError(error), true); if (/rate limit/i.test(authError(error))) $('resend-btn').classList.remove('hidden'); return; }
            $('signup-form').reset(); closeModal('auth-modal');
            if (data.session) { toast('مرحباً بك! 🎉 +2 نقطة دخول', 'ok'); }
            else {
                authMsg('✅ تم إنشاء حسابك! أرسلنا رابط تأكيد إلى ' + email + ' — افتحه ثم سجّل الدخول.', false);
                $('resend-btn').classList.remove('hidden');
                toast('تم إنشاء الحساب — أكّد بريدك ثم سجّل الدخول', 'ok');
            }
        });

        on('logout-btn', 'click', async () => { await sb.auth.signOut(); toast('تم تسجيل الخروج'); });

        // تعديل الملف الشخصي
        on('pf-avatar', 'change', () => {
            const f = $('pf-avatar').files[0];
            if (f && f.size > CONFIG.maxStudentFile) { toast('الصورة أكبر من 3 ميغابايت', 'error'); $('pf-avatar').value = ''; return; }
            if (f) { const url = URL.createObjectURL(f); $('pf-avatar-preview').innerHTML = '<img src="' + url + '" alt="" class="w-full h-full object-cover">'; }
        });
        on('profile-form', 'submit', async (e) => {
            e.preventDefault();
            if (!me) { toast('انتهت الجلسة — سجّل الدخول من جديد', 'error'); openModal('auth-modal'); return; }
            const btn = $('pf-save'); btn.disabled = true; btn.textContent = '⏳ جاري الحفظ...';
            // حارس عام: الزر لا يبقى معلقاً أبداً
            const watchdog = setTimeout(() => {
                btn.disabled = false; btn.textContent = 'حفظ التغييرات';
                toast('استغرقت العملية وقتاً طويلاً — تحقق من اتصالك ثم أعد المحاولة', 'error');
            }, 95000);
            const display = $('pf-display').value.trim(), username = $('pf-username').value.trim();
            const f = $('pf-avatar').files[0];
            let note = '';
            try {
                // 1) البيانات النصية تُحفظ أولاً — لا يعتمد حفظها على الصورة أبداً
                const { data, error } = await sb.from('profiles').update({ display_name: display, username }).eq('id', me.id).select().single();
                if (error) throw error;
                me = data;
                // 2) الصورة بعدها: محاولة رفع، وإن فشلت نستخدم نسخة مدمجة
                if (f) {
                    btn.textContent = '⏳ جاري رفع الصورة...';
                    let avatar_url = me.avatar_url || null;
                    let saved = false;
                    try {
                        let att = null;
                        for (let attempt = 0; attempt < 2 && !att; attempt++) {
                            try { att = await uploadStudentFile(f, 'avatars', attempt ? 200 : 256, attempt ? 0.6 : 0.7, attempt ? 60000 : 25000); }
                            catch (e) { if (attempt === 1) throw e; }
                        }
                        const old = storagePathFromUrl(avatar_url);
                        if (old) sb.storage.from(CONFIG.studentBucket).remove([old]).catch(() => {});
                        avatar_url = sb.storage.from(CONFIG.studentBucket).getPublicUrl(att.path).data.publicUrl;
                        saved = true;
                    } catch (upErr) {
                        let small = f;
                        try { small = await compressImage(f, 200, 0.6); } catch {}
                        const inline = await toDataUrl(small, 140000);
                        if (inline) { avatar_url = inline; saved = true; note = ' — حُفظت صورتك بنسخة مدمجة.'; }
                        else note = ' — تعذّر رفع الصورة: ' + dbError(upErr);
                    }
                    if (saved) {
                        const r2 = await sb.from('profiles').update({ avatar_url }).eq('id', me.id).select().single();
                        if (r2.error) note = ' — حُفظت بياناتك لكن الصورة لم تُحفظ: ' + dbError(r2.error);
                        else me = r2.data;
                    }
                }
                renderProfile(); closeModal('profile-modal');
                toast('تم تحديث ملفك الشخصي' + note, 'ok');
            } catch (err) { toast('فشل الحفظ: ' + dbError(err), 'error'); }
            clearTimeout(watchdog);
            btn.disabled = false; btn.textContent = 'حفظ التغييرات';
        });

        // ---------------------------------------------------------- المنشورات
        let fetching = false;
        async function fetchAll() {
            if (fetching) return; fetching = true;
            try {
            const [p, lk, aw] = await Promise.all([
                sb.from('student_posts').select('*').order('created_at', { ascending: false }),
                sb.from('post_likes').select('post_id, user_id'),
                sb.from('weekly_awards').select('*, profiles(username, display_name, avatar_url)').order('created_at', { ascending: false }).limit(1)
            ]);
            if (p.error && $('posts-grid')) {
                $('posts-grid').innerHTML = '<p class="text-red-500 col-span-full text-center">تعذّر تحميل المنشورات. تأكد من تشغيل ملف SQL الثالث في Supabase.<br><span class="text-xs muted" dir="ltr">' + esc(p.error.message) + '</span></p>';
            }
            posts = (p.data || []).map(x => ({ ...x, attachments: Array.isArray(x.attachments) ? x.attachments : [] }));
            likesByPost = {}; myLikes = new Set();
            (lk.data || []).forEach(r => { likesByPost[r.post_id] = (likesByPost[r.post_id] || 0) + 1; if (session && r.user_id === session.user.id) myLikes.add(r.post_id); });
            const award = (aw.data || [])[0];
            const ab = $('award-banner');
            if (ab) {
                ab.classList.toggle('hide', !award);
                if (award) {
                    $('award-title').textContent = award.title || '⭐ طالب الأسبوع';
                    $('award-user').textContent = award.profiles ? (award.profiles.display_name || award.profiles.username) : '';
                    $('award-note').textContent = (award.week_label ? award.week_label + ' · ' : '') + (award.note || '');
                }
            }
            renderProfile();
            if (!p.error) renderPosts();
            renderRanking(); renderMembers(); loadAnnouncements(); loadNotifications();
            const m = location.hash.match(/^#post-(\d+)$/);
            if (m) { const p2 = posts.find(x => String(x.id) === m[1]); if (p2) openPost(p2); }
            if (isAdmin && $('a-posts-list')) renderAdminLists();
            } finally { fetching = false; }
        }
        function cardMedia(p) {
            const img = safeUrl(p.image_url);
            const sec = SECTIONS[p.section] || {};
            const bg = img
                ? '<img src="' + esc(img) + '" alt="" loading="lazy" class="w-full h-full object-cover">'
                : '<div class="w-full h-full grid place-items-center text-5xl" style="background: linear-gradient(135deg, rgba(var(--accent-rgb),.25), rgba(var(--accent2-rgb),.2))">' + (sec.icon || '🎮') + '</div>';
            return bg + '<span class="absolute font-bold text-[10px] px-2 py-1" style="top:10px;right:10px;background:rgba(0,0,0,.75);color:var(--accent2);border:1px solid rgba(var(--accent2-rgb),.5)">' + sec.icon + ' ' + sec.name + '</span>' +
                (p.attachments.length ? '<span class="absolute font-bold text-[10px] px-2 py-1" style="bottom:10px;left:10px;background:rgba(0,0,0,.75);color:#fff">📎 ' + p.attachments.length + '</span>' : '');
        }

        function renderPosts() {
            const grid = $('posts-grid'); if (!grid) return;
            grid.innerHTML = '';
            let list = posts.filter(p => currentSection === 'ALL' || p.section === currentSection);
            if (fileFilter) list = list.filter(p => String(p.file_no || '') === fileFilter);
            if (!list.length) { grid.innerHTML = '<div class="col-span-full text-center py-14 muted"><div class="text-5xl mb-2">📭</div>' + (fileFilter ? 'لا يوجد منشور بهذا الرقم بعد.' : 'لا توجد منشورات في هذا القسم بعد.') + '</div>'; return; }
            list.forEach(p => {
                const el = document.createElement('article');
                el.className = 'card cursor-pointer flex flex-col overflow-hidden';
                const liked = myLikes.has(p.id);
                el.innerHTML =
                    '<div class="relative h-44 overflow-hidden bg-black cursor-pointer" data-open>' + cardMedia(p) + '</div>' +
                    '<div class="p-4 flex-1 flex flex-col">' +
                    (p.file_no ? '<span class="chip chip-gold mb-1.5 self-start font-tech" data-fno="' + esc(p.file_no) + '">ملف #' + esc(p.file_no) + '</span>' : '') +
                    '<h3 class="text-lg font-black mb-1 line-clamp-2" data-open>' + esc(p.title) + '</h3>' +
                    '<p class="muted text-sm line-clamp-3 flex-1">' + esc(p.content) + '</p>' +
                    '<div class="flex items-center justify-between mt-3 pt-3 border-t" style="border-color: var(--border)">' +
                    '<button type="button" class="like-btn ' + (liked ? 'liked' : '') + '" data-like="' + p.id + '"><span class="heart">' + (liked ? '❤️' : '🤍') + '</span> <span>' + (likesByPost[p.id] || 0) + '</span></button>' +
                    '<span class="text-xs muted">💬 <span data-c="' + p.id + '">…</span> · ' + new Date(p.created_at).toLocaleDateString('ar-DZ') + '</span>' +
                    '</div></div>';
                el.querySelectorAll('[data-open]').forEach(x => x.addEventListener('click', () => openPost(p)));
                const fno = el.querySelector('[data-fno]');
                if (fno) fno.addEventListener('click', (e) => { e.stopPropagation(); filterByFile(p.file_no); });
                const lb = el.querySelector('[data-like]');
                lb.addEventListener('click', (e) => { e.stopPropagation(); toggleLike(p, lb); });
                grid.appendChild(el);
            });
            // عدد التعليقات لكل منشور
            sb.from('comments').select('post_id').then(({ data }) => {
                const cnt = {};
                (data || []).forEach(c => cnt[c.post_id] = (cnt[c.post_id] || 0) + 1);
                document.querySelectorAll('[data-c]').forEach(el => { el.textContent = cnt[el.dataset.c] || 0; });
            });
        }

        let fileFilter = null;
        function filterByFile(no) {
            if (!document.getElementById('posts-grid')) { location.href = 'content.html?file=' + encodeURIComponent(no); return; }
            fileFilter = String(no);
            currentSection = 'ALL';
            $('section-nav').querySelectorAll('button').forEach(x => { x.classList.toggle('btn-gold', x.dataset.sec === 'ALL'); x.classList.toggle('btn-soft', x.dataset.sec !== 'ALL'); });
            $('file-filter').classList.remove('hide');
            $('file-filter-no').textContent = '#' + no;
            renderPosts();
            document.getElementById('feed').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        on('file-filter-clear', 'click', () => { fileFilter = null; $('file-filter').classList.add('hide'); renderPosts(); });

        on('section-nav', 'click', (e) => {
            const b = e.target.closest('[data-sec]'); if (!b) return;
            currentSection = b.dataset.sec;
            $('section-nav').querySelectorAll('button').forEach(x => { x.classList.toggle('btn-primary', x === b); x.classList.toggle('btn-soft', x !== b); });
            renderPosts();
        });

        // ---------------------------------------------------------- الإعجابات
        async function toggleLike(p, btn) {
            if (!session) { toast('سجّل الدخول أولاً للإعجاب', 'error'); openModal('auth-modal'); return; }
            const liked = myLikes.has(p.id);
            if (liked) {
                const { error } = await sb.from('post_likes').delete().eq('post_id', p.id).eq('user_id', session.user.id);
                if (!error) { myLikes.delete(p.id); likesByPost[p.id] = Math.max(0, (likesByPost[p.id] || 1) - 1); }
            } else {
                const { error } = await sb.from('post_likes').insert({ post_id: p.id, user_id: session.user.id });
                if (error) { toast('تعذّر الإعجاب: ' + dbError(error), 'error'); return; }
                myLikes.add(p.id); likesByPost[p.id] = (likesByPost[p.id] || 0) + 1;
                toast('❤️ +1 نقطة! إعجابك سُجّل', 'ok');
            }
            if (btn) { btn.classList.toggle('liked', myLikes.has(p.id)); btn.querySelector('.heart').textContent = myLikes.has(p.id) ? '❤️' : '🤍'; btn.querySelector('span:last-child').textContent = likesByPost[p.id] || 0; }
            renderPosts();
            if (currentPost && currentPost.id === p.id) updateLikeBtn();
            loadMeRefresh(); renderRanking();
        }
        function updateLikeBtn() {
            const liked = currentPost && myLikes.has(currentPost.id);
            $('like-btn').classList.toggle('liked', !!liked);
            $('like-btn').querySelector('.heart').textContent = liked ? '❤️' : '🤍';
            $('like-count').textContent = likesByPost[currentPost.id] || 0;
        }
        // زر الإعجاب داخل نافذة المنشور
        on('like-btn', 'click', () => { if (currentPost) toggleLike(currentPost, null); });

        // ---------------------------------------------------------- المشاركة
        on('share-btn', 'click', async () => {
            if (!currentPost) return;
            const url = location.origin + location.pathname.replace(/[^/]*$/, '') + 'students.html#post-' + currentPost.id;
            try {
                if (navigator.share) await navigator.share({ title: currentPost.title, url });
                else { await navigator.clipboard.writeText(url); toast('تم نسخ رابط المنشور', 'ok'); }
                if (session) { await sb.rpc('award_share', { p_post_id: currentPost.id }); loadMeRefresh(); toast('🔗 +3 نقاط للمشاركة!', 'ok'); }
            } catch { /* أغلق المستخدم النافذة */ }
        });

        // ---------------------------------------------------------- نافذة المنشور + التعليقات
        async function openPost(p) {
            currentPost = p;
            const sec = SECTIONS[p.section] || {};
            $('modal-sec').textContent = (sec.icon || '') + ' ' + (sec.name || p.section);
            $('modal-title').textContent = p.title;
            $('modal-content').textContent = p.content || '';
            $('modal-meta').innerHTML = '<span class="chip">📅 ' + new Date(p.created_at).toLocaleDateString('ar-DZ') + '</span>' +
                (p.attachments.length ? '<span class="chip">⬇ ' + (p.downloads || 0) + ' تحميل</span>' : '');
            $('modal-filebadge').textContent = p.file_no ? 'ملف #' + p.file_no : '';
            $('modal-filebadge').classList.toggle('hide', !p.file_no);
            $('modal-admin-box').classList.toggle('hidden', !isAdmin);
            $('modal-admin-box').classList.toggle('flex', isAdmin);

            const mediaBox = $('modal-media'); mediaBox.innerHTML = '';
            const vid = safeUrl(p.video_url), img = safeUrl(p.image_url), yt = youtubeEmbed(p.external_link || '');
            if (vid) { const v = document.createElement('video'); v.src = vid; v.controls = true; v.playsInline = true; v.className = 'w-full max-h-[400px]'; mediaBox.appendChild(v); }
            else if (yt) { const f = document.createElement('iframe'); f.src = yt; f.className = 'w-full aspect-video'; f.allowFullscreen = true; f.setAttribute('loading', 'lazy'); mediaBox.appendChild(f); }
            else if (img) { const i = document.createElement('img'); i.src = img; i.alt = ''; i.className = 'w-full max-h-[450px] object-contain mx-auto'; mediaBox.appendChild(i); }
            mediaBox.style.display = mediaBox.children.length ? '' : 'none';

            const filesBox = $('modal-files'); filesBox.innerHTML = '';
            $('modal-files-wrap').hidden = p.attachments.length === 0;
            $('modal-files-count').textContent = p.attachments.length;
            p.attachments.forEach(att => {
                const row = document.createElement('div'); row.className = 'file-row';
                row.innerHTML = '<div class="file-ico">' + fileIcon(att.name) + '</div><div class="flex-1 min-w-0"><div class="font-bold text-sm truncate" dir="ltr" style="text-align:right">' + esc(att.name) + '</div><div class="text-xs muted">' + fmtSize(att.size) + '</div></div>';
                const a = document.createElement('a');
                a.href = sb.storage.from(CONFIG.mediaBucket).getPublicUrl(att.path, { download: att.name }).data.publicUrl;
                a.className = 'btn btn-primary btn-sm'; a.textContent = '⬇ تحميل';
                a.addEventListener('click', () => {
                    try { if (sessionStorage.getItem('tlp-sdl-' + p.id)) return; sessionStorage.setItem('tlp-sdl-' + p.id, '1'); } catch {}
                    sb.from('student_posts').update({ downloads: (p.downloads || 0) + 1 }).eq('id', p.id).then(({ error }) => {
                        if (error) return;
                        p.downloads = (p.downloads || 0) + 1;
                        $('modal-meta').innerHTML = '<span class="chip">📅 ' + new Date(p.created_at).toLocaleDateString('ar-DZ') + '</span>' +
                            (p.attachments.length ? '<span class="chip">⬇ ' + p.downloads + ' تحميل</span>' : '');
                    });
                });
                row.appendChild(a); filesBox.appendChild(row);
            });

            $('modal-link-box').innerHTML = '';
            const link = safeUrl(p.external_link);
            if (link) {
                const a = document.createElement('a'); a.href = link; a.target = '_blank'; a.rel = 'noopener noreferrer';
                a.className = 'btn btn-cyan'; a.textContent = 'فتح الرابط المرفق ↗'; $('modal-link-box').appendChild(a);
            }

            updateLikeBtn();
            $('comment-form').classList.toggle('hidden', !session);
            $('comment-guest-hint').classList.toggle('hidden', !!session);
            cFile = null; $('c-file-preview').classList.add('hidden'); $('c-input').value = '';
            history.replaceState(null, '', '#post-' + p.id);
            openModal('post-modal');
            loadComments(p.id);
        }

        async function loadComments(postId) {
            const { data } = await sb.from('comments').select('*, profiles(username, display_name, avatar_url, points)').eq('post_id', postId).order('created_at');
            const box = $('comments-list'); box.innerHTML = '';
            const list = data || [];
            $('comments-count').textContent = list.length;
            if (!list.length) { box.innerHTML = '<p class="muted text-sm text-center py-4">لا تعليقات بعد — كن أول المتعلقين!</p>'; return; }
            list.forEach(c => box.appendChild(commentEl(c)));
        }
        function commentEl(c) {
            const el = document.createElement('div'); el.className = 'comment-item';
            const pr = c.profiles || {};
            const av = safeUrl(pr.avatar_url);
            el.innerHTML = '<div class="c-avatar">' + (av ? '<img src="' + esc(av) + '" alt="" class="w-full h-full object-cover">' : esc((pr.display_name || pr.username || '?').charAt(0))) + '</div>' +
                '<div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap"><b class="text-sm">' + esc(pr.display_name || pr.username) + '</b>' +
                '<span class="chip">' + (pr.points || 0) + ' PT</span>' +
                '<span class="text-[10px] muted">' + new Date(c.created_at).toLocaleDateString('ar-DZ') + '</span></div>' +
                '<p class="text-sm mt-1 whitespace-pre-line break-words">' + esc(c.content) + '</p>' +
                (c.attachment ? attachmentLine(c.attachment, CONFIG.studentBucket) : '') + '</div>';
            const mine = session && c.user_id === session.user.id;
            if (mine || isAdmin) {
                const d = document.createElement('button'); d.type = 'button'; d.className = 'btn btn-danger btn-sm self-start'; d.textContent = '🗑';
                d.addEventListener('click', async () => {
                    if (c.attachment && c.attachment.path) sb.storage.from(CONFIG.studentBucket).remove([c.attachment.path]).catch(() => {});
                    const { error } = await sb.from('comments').delete().eq('id', c.id);
                    if (error) toast('تعذّر الحذف: ' + error.message, 'error');
                    else { toast('تم الحذف'); loadComments(c.post_id); renderPosts(); if (isAdmin) renderAdminLists(); }
                });
                el.appendChild(d);
            }
            return el;
        }
        function attachmentLine(att, bucket) {
            const url = sb.storage.from(bucket).getPublicUrl(att.path).data.publicUrl;
            const isImg = (att.type || '').startsWith('image/');
            const isAudio = (att.type || '').startsWith('audio/');
            return '<div class="mt-2 border p-2 inline-flex items-center gap-2" style="border-color: var(--border)">' +
                (isImg ? '<img src="' + esc(url) + '" alt="" class="max-h-32 cursor-pointer" onclick="window.open(\'' + url.replace(/'/g, '') + '\',\'_blank\')">' : '') +
                (isAudio ? '<audio controls preload="metadata" src="' + esc(url) + '" style="height:34px;max-width:230px"></audio>' : '') +
                '<a href="' + esc(url) + '" target="_blank" rel="noopener" class="text-xs accent2 font-bold">' + (isAudio ? '🎤 ' : fileIcon(att.name) + ' ') + esc(isAudio ? 'صوتية' : att.name) + ' (' + fmtSize(att.size) + ')</a></div>';
        }
        window.attachmentLine = attachmentLine;

        // مرفق التعليق
        on('c-attach', 'click', () => $('c-file').click());
        on('c-file', 'change', () => {
            const f = $('c-file').files[0]; $('c-file').value = '';
            if (!f) return;
            if (f.size > CONFIG.maxStudentFile) { toast('الملف أكبر من 3 ميغابايت', 'error'); return; }
            if (!['image/jpeg','image/png','image/webp','image/gif','application/pdf'].includes(f.type)) { toast('يُسمح بالصور و PDF فقط', 'error'); return; }
            cFile = f; $('c-file-name').textContent = f.name + ' (' + fmtSize(f.size) + ')'; $('c-file-preview').classList.remove('hidden');
        });
        on('c-file-remove', 'click', () => { cFile = null; $('c-file-preview').classList.add('hidden'); });

        on('c-send', 'click', async () => {
            if (!session || !currentPost) return;
            const content = $('c-input').value.trim();
            if (!content && !cFile) { toast('اكتب تعليقاً أو أرفق ملفاً', 'error'); return; }
            const btn = $('c-send'); btn.disabled = true;
            let upMsg = '';
            try {
                let attachment = null;
                if (cFile) {
                    try { attachment = await uploadStudentFile(cFile, 'attachments', 1280, 0.85, 45000); }
                    catch (upErr) { upMsg = dbError(upErr); }
                    if (!attachment && !content) { toast('تعذّر رفع المرفق: ' + upMsg, 'error'); btn.disabled = false; return; }
                }
                const { error } = await sb.from('comments').insert({ post_id: currentPost.id, user_id: me.id, content: content || '📎 مرفق', attachment });
                if (error) throw error;
                $('c-input').value = ''; cFile = null; $('c-file-preview').classList.add('hidden');
                toast(upMsg ? 'نُشر تعليقك بدون المرفق: ' + upMsg : '💬 +2 نقطة! نُشر تعليقك', upMsg ? 'error' : 'ok');
                loadComments(currentPost.id); loadMeRefresh();
            } catch (err) { toast('فشل النشر: ' + dbError(err), 'error'); }
            btn.disabled = false;
        });

        // ---------------------------------------------------------- الدردشة
        function renderChatComposer() {
            $('chat-login-hint').classList.toggle('hidden', !!session);
            $('chat-box').classList.toggle('hidden', !session);
        }
        function dayLabel(d) {
            const t = new Date(); const x = new Date(d);
            const same = (a,b) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
            if (same(x,t)) return 'اليوم';
            const y = new Date(t); y.setDate(y.getDate()-1);
            if (same(x,y)) return 'أمس';
            return x.toLocaleDateString('ar-DZ');
        }
        let lastSender = null, lastStamp = 0;
        async function loadChat() {
            const { data } = await sb.from('chat_messages').select('*, profiles(username, display_name, avatar_url, points)').order('created_at', { ascending: false }).limit(120);
            const box = $('chat-list');
            const list = (data || []).reverse();
            if (!list.length) { box.innerHTML = '<div class="text-center py-10 muted text-sm"><div class="text-4xl mb-2">👋</div>لا رسائل بعد — ابدأ الحوار</div>'; return; }
            const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 90;
            box.innerHTML = '';
            let day = null;
            lastSender = null; lastStamp = 0;
            list.forEach(m => {
                const d = new Date(m.created_at);
                const dl = dayLabel(d);
                if (dl !== day) {
                    day = dl; lastSender = null;
                    const sep = document.createElement('div'); sep.className = 'day-sep';
                    sep.innerHTML = '<span>' + esc(dl) + '</span>'; box.appendChild(sep);
                }
                box.appendChild(chatEl(m));
                lastSender = m.user_id; lastStamp = d.getTime();
            });
            if (atBottom || box.dataset.init !== '1') { box.scrollTop = box.scrollHeight; box.dataset.init = '1'; }
            $('chat-jump').classList.toggle('hide', atBottom);
        }
        function chatEl(m) {
            const mine = session && m.user_id === session.user.id;
            const pr = m.profiles || {};
            const grouped = lastSender === m.user_id && (new Date(m.created_at).getTime() - lastStamp) < 120000;
            const row = document.createElement('div');
            row.className = 'brow' + (mine ? ' mine' : '') + (grouped ? ' grouped' : '');
            const av = safeUrl(pr.avatar_url);
            const body = m.content ? '<span class="ctext">' + esc(m.content) + '</span>' : '';
            const media = m.attachment ? bubbleAttachment(m.attachment) : '';
            row.innerHTML =
                '<div class="bav' + (grouped ? ' ph' : '') + '">' + (av ? '<img src="' + esc(av) + '" alt="" class="w-full h-full object-cover">' : esc((pr.display_name || pr.username || '?').charAt(0))) + '</div>' +
                '<div class="bwrap">' +
                (grouped || mine ? '' : '<div class="bname">' + esc(pr.display_name || pr.username) + '</div>') +
                '<div class="bubble">' + body + media +
                '<span class="btime">' + new Date(m.created_at).toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' }) + '</span>' +
                (mine || isAdmin ? '<button type="button" class="del" title="حذف">✕</button>' : '') +
                '</div></div>';
            const del = row.querySelector('.del');
            if (del) del.addEventListener('click', async () => {
                if (m.attachment && m.attachment.path) sb.storage.from(CONFIG.studentBucket).remove([m.attachment.path]).catch(() => {});
                const { error } = await sb.from('chat_messages').delete().eq('id', m.id);
                if (error) toast('تعذّر الحذف: ' + error.message, 'error');
                else { loadChat(); if (isAdmin) renderAdminLists(); }
            });
            return row;
        }
        function bubbleAttachment(att) {
            const url = sb.storage.from(CONFIG.studentBucket).getPublicUrl(att.path).data.publicUrl;
            if ((att.type || '').startsWith('audio/')) return '<audio controls preload="metadata" src="' + esc(url) + '"></audio>';
            if ((att.type || '').startsWith('image/')) return '<img class="ph-img" src="' + esc(url) + '" alt="" onclick="window.open(this.src,\'_blank\')">';
            return '<a class="bfile" href="' + esc(url) + '" target="_blank" rel="noopener">' + fileIcon(att.name) + ' ' + esc(att.name) + '</a>';
        }

        on('chat-jump', 'click', () => { const b = $('chat-list'); b.scrollTop = b.scrollHeight; $('chat-jump').classList.add('hide'); });
        on('chat-list', 'scroll', () => {
            const b = $('chat-list');
            $('chat-jump').classList.toggle('hide', b.scrollHeight - b.scrollTop - b.clientHeight < 90);
        });
        on('chat-attach', 'click', () => $('chat-file').click());

        // ======================= التعليقات الصوتية =======================
        const REC_MAX_MS = 60000; // 60 ثانية
        const recMime = (() => {
            const cands = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
            if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) return '';
            for (const m of cands) { try { if (MediaRecorder.isTypeSupported(m)) return m; } catch {} }
            return '';
        })();
        let recorder = null, recChunks = [], recTicker = null, recStartAt = 0, recStream = null;

        function recUI(on, label) {
            const b = $('chat-mic');
            b.textContent = on ? '⏹' : '🎤';
            b.classList.toggle('btn-danger', on);
            b.classList.toggle('btn-soft', !on);
            if (label) { $('chat-file-info').textContent = label; $('chat-file-info').classList.remove('hidden'); }
        }
        function stopRecording() {
            try { if (recorder && recorder.state !== 'inactive') recorder.stop(); } catch {}
            clearInterval(recTicker); recTicker = null;
        }

        on('chat-mic', 'click', async () => {
            if (!session || !me) { toast('سجّل الدخول أولاً للتسجيل', 'error'); openModal('auth-modal'); return; }
            if (!window.MediaRecorder || !navigator.mediaDevices) {
                toast('متصفحك لا يدعم التسجيل الصوتي — جرّب Chrome', 'error'); return;
            }
            if (recorder && recorder.state === 'recording') { stopRecording(); return; }
            try {
                recStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            } catch (err) {
                toast('تعذّر الوصول للميكروفون — اسمح بالإذن من المتصفح', 'error'); return;
            }
            recChunks = [];
            try {
                recorder = new MediaRecorder(recStream, recMime ? { mimeType: recMime } : undefined);
            } catch {
                try { recorder = new MediaRecorder(recStream); } catch { toast('تعذّر بدء التسجيل', 'error'); return; }
            }
            recorder.ondataavailable = (ev) => { if (ev.data && ev.data.size) recChunks.push(ev.data); };
            recorder.onstop = async () => {
                try { recStream.getTracks().forEach(t => t.stop()); } catch {}
                const rawType = (recorder && recorder.mimeType) || recMime || 'audio/webm';
                const type = rawType.split(';')[0];
                const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
                const blob = new Blob(recChunks, { type });
                const secs = Math.max(1, Math.round((Date.now() - recStartAt) / 1000));
                recUI(false, '');
                $('chat-file-info').classList.add('hidden');
                if (blob.size < 800) { toast('التسجيل قصير جداً — حاول مرة أخرى', 'error'); return; }
                if (blob.size > 4.5 * 1024 * 1024) { toast('التسجيل كبير جداً — اجعله أقصر', 'error'); return; }
                chatFile = new File([blob], 'voice_' + Date.now() + '.' + ext, { type });
                const kb = (blob.size / 1024).toFixed(0);
                $('chat-file-info').innerHTML = '🎤 رسالة صوتية جاهزة (' + secs + 'ث · ' + kb + 'KB) — اضغط SEND للإرسال';
                $('chat-file-info').classList.remove('hidden');
                toast('🎤 التسجيل جاهز — اضغط SEND', 'ok');
            };
            recStartAt = Date.now();
            recorder.start();
            recUI(true, '⏺ جاري التسجيل... 0s');
            recTicker = setInterval(() => {
                const s = Math.floor((Date.now() - recStartAt) / 1000);
                $('chat-file-info').textContent = '⏺ جاري التسجيل... ' + s + 's (الحد 60s) — اضغط ⏹ للإيقاف';
                if (s >= 60) stopRecording();
            }, 500);
        });
        on('chat-file', 'change', () => {
            const f = $('chat-file').files[0]; $('chat-file').value = '';
            if (!f) return;
            if (f.size > 4624220) { toast('الملف أكبر من 4.4 ميغابايت', 'error'); return; }
            const okTypes = ['image/jpeg','image/png','image/webp','image/gif','application/pdf','audio/webm','audio/mp4','audio/ogg','audio/mpeg','audio/aac','audio/wav','audio/x-m4a'];
            if (!okTypes.includes(f.type)) { toast('يُسمح بالصور و PDF والصوت فقط', 'error'); return; }
            chatFile = f; $('chat-file-info').textContent = '📎 ' + f.name + ' (' + fmtSize(f.size) + ')'; $('chat-file-info').classList.remove('hidden');
        });
        on('chat-send', 'click', sendChat);
        on('chat-input', 'keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } });
        async function sendChat() {
            if (!session || !me) { toast('سجّل الدخول أولاً للمشاركة في الدردشة', 'error'); return; }
            const content = $('chat-input').value.trim();
            if (!content && !chatFile) return;
            const btn = $('chat-send'); btn.disabled = true;
            let upMsg = '';
            try {
                let attachment = null;
                if (chatFile) {
                    try { attachment = await uploadStudentFile(chatFile, 'attachments', 1280, 0.85, 45000); }
                    catch (upErr) { upMsg = dbError(upErr); }
                    if (!attachment && !content) { toast('تعذّر رفع المرفق: ' + upMsg, 'error'); btn.disabled = false; return; }
                }
                const { error } = await sb.from('chat_messages').insert({ user_id: me.id, content: content || null, attachment });
                if (error) throw error;
                $('chat-input').value = ''; chatFile = null; $('chat-file-info').classList.add('hidden');
                if (upMsg) toast('أُرسلت الرسالة بدون المرفق: ' + upMsg, 'error');
                loadChat();
            } catch (err) { toast('فشل الإرسال: ' + dbError(err), 'error'); }
            btn.disabled = false;
        }

        // تحديث فوري للدردشة (إن كان Realtime مفعّلاً في Supabase)
        try {
            sb.channel('chat-live')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, () => { if (session) { loadChat(); loadNotifications(); } })
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, () => { if (session) loadNotifications(); })
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'announcements' }, () => { loadAnnouncements(); })
                .subscribe();
        } catch (e) { /* بدون realtime نستخدم التحميل اليدوي */ }


        // ==========================================================
        //                        الإعلانات
        // ==========================================================
        let announcements = [];
        async function loadAnnouncements() {
            const { data, error } = await sb.from('announcements')
                .select('*').order('is_pinned', { ascending: false }).order('created_at', { ascending: false }).limit(30);
            const box = $('ann-grid');
            announcements = data || [];
            if (error) { box.innerHTML = '<p class="muted text-sm col-span-full text-center">تعذّر تحميل الإعلانات — شغّل ملف SQL الرابع.</p>'; return; }
            if (!announcements.length) { box.innerHTML = '<div class="col-span-full text-center py-10 muted text-sm"><div class="text-4xl mb-2">📜</div>لا إعلانات بعد</div>'; return; }
            box.innerHTML = '';
            announcements.forEach(a => {
                const el = document.createElement('article');
                el.className = 'card frame';
                const img = safeUrl(a.image_url);
                el.innerHTML =
                    (img ? '<div class="h-40 overflow-hidden bg-black"><img src="' + esc(img) + '" alt="" class="w-full h-full object-cover" loading="lazy"></div>' : '') +
                    '<div class="p-4">' +
                    (a.is_pinned ? '<span class="chip chip-gold mb-2">📌 مثبّت</span> ' : '') +
                    '<h3 class="text-lg font-black mb-1">' + esc(a.title) + '</h3>' +
                    '<p class="muted text-sm whitespace-pre-line line-clamp-4">' + esc(a.content || '') + '</p>' +
                    '<div class="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t" style="border-color: var(--border)">' +
                    (a.file_no ? '<button type="button" class="btn btn-gold btn-sm" data-go="' + esc(a.file_no) + '">📦 اذهب إلى الملف #' + esc(a.file_no) + '</button>' : '') +
                    '<span class="text-[10.5px] muted">' + new Date(a.created_at).toLocaleDateString('ar-DZ') + '</span>' +
                    (isAdmin ? '<button type="button" class="btn btn-danger btn-sm ms-auto" data-del="' + a.id + '">🗑</button>' : '') +
                    '</div></div>';
                const go = el.querySelector('[data-go]');
                if (go) go.addEventListener('click', () => filterByFile(go.dataset.go));
                const del = el.querySelector('[data-del]');
                if (del) del.addEventListener('click', async () => {
                    if (!confirm('حذف الإعلان؟')) return;
                    await sb.from('announcements').delete().eq('id', a.id);
                    toast('حُذف الإعلان', 'ok'); loadAnnouncements(); renderAdminLists();
                });
                box.appendChild(el);
            });
        }

        on('an-image', 'change', () => {
            const f = $('an-image').files[0], pv = $('an-image-preview');
            if (f) { pv.src = URL.createObjectURL(f); pv.classList.remove('hidden'); } else pv.classList.add('hidden');
        });

        on('ann-form', 'submit', async (e) => {
            e.preventDefault();
            if (!isAdmin) { toast('سجّل الدخول كأدمن', 'error'); return; }
            const btn = $('an-submit'); btn.disabled = true;
            try {
                let image_url = null;
                const f = $('an-image').files[0];
                if (f) {
                    const img = await compressImage(f, 1400, 0.85);
                    const att = await uploadStudentFile(img, 'attachments', 1400, 0.85, 45000);
                    image_url = sb.storage.from(CONFIG.studentBucket).getPublicUrl(att.path).data.publicUrl;
                }
                const { error } = await sb.from('announcements').insert({
                    title: $('an-title').value.trim(), content: $('an-content').value.trim() || null,
                    image_url, file_no: $('an-fileno').value.trim() || null, is_pinned: $('an-pinned').checked
                });
                if (error) throw error;
                $('ann-form').reset(); $('an-image-preview').classList.add('hidden');
                toast('📣 نُشر الإعلان', 'ok');
                loadAnnouncements(); loadNotifications(); renderAdminLists();
            } catch (err) { $('an-status').textContent = 'ERROR: ' + dbError(err); }
            btn.disabled = false;
        });

        // ==========================================================
        //                        الإشعارات
        // ==========================================================
        let notifUnread = 0;
        function renderNotifBadge(n) {
            notifUnread = n;
            const b = $('notif-count');
            b.textContent = n > 9 ? '9+' : n;
            b.classList.toggle('hide', !n);
        }
        async function loadNotifications() {
            if (!session) { renderNotifBadge(0); return; }
            const { data } = await sb.from('notifications').select('*').order('created_at', { ascending: false }).limit(40);
            const list = data || [];
            renderNotifBadge(list.filter(x => !x.is_read).length);
            const box = $('notif-list'); box.innerHTML = '';
            if (!list.length) { box.innerHTML = '<p class="muted text-xs text-center py-8">لا إشعارات بعد.</p>'; return; }
            list.forEach(n => {
                const el = document.createElement('div');
                el.className = 'notif-item' + (n.is_read ? '' : ' unread');
                el.innerHTML = '<div class="text-lg">' + (n.kind === 'chat' ? '💬' : n.kind === 'award' ? '🏆' : n.kind === 'announcement' ? '📣' : n.kind === 'welcome' ? '🎉' : n.kind === 'comment' ? '✍️' : '📦') + '</div>' +
                    '<div class="flex-1 min-w-0"><div class="font-bold">' + esc(n.title) + '</div>' +
                    (n.body ? '<div class="muted text-[11.5px] truncate">' + esc(n.body) + '</div>' : '') +
                    '<div class="text-[10px] muted mt-0.5">' + new Date(n.created_at).toLocaleString('ar-DZ', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) + '</div></div>';
                el.addEventListener('click', async () => {
                    if (!n.is_read) { await sb.from('notifications').update({ is_read: true }).eq('id', n.id); loadNotifications(); }
                    closeNotif();
                    if (n.kind === 'exam') location.href = 'exams.html';
                    else if (n.kind === 'result') location.href = 'results.html';
                    else if (n.kind === 'submission') location.href = 'homework.html';
                    else if (n.kind === 'chat') location.href = 'chat.html';
                    else if (n.kind === 'award') document.getElementById('hall').scrollIntoView({ behavior: 'smooth' });
                    else if (n.kind === 'announcement') document.getElementById('ann').scrollIntoView({ behavior: 'smooth' });
                    else if (n.ref_id && (n.kind === 'comment' || n.kind === 'post')) {
                        const p = posts.find(x => String(x.id) === String(n.ref_id)); if (p) openPost(p);
                    }
                });
                box.appendChild(el);
            });
        }
        function openNotif() { $('notif-panel').classList.add('open'); loadNotifications(); }
        function closeNotif() { $('notif-panel').classList.remove('open'); }
        on('notif-btn', 'click', () => $('notif-panel').classList.contains('open') ? closeNotif() : openNotif());
        on('notif-close', 'click', closeNotif);
        on('notif-readall', 'click', async () => {
            if (!session) return;
            await sb.from('notifications').update({ is_read: true }).eq('user_id', me.id).eq('is_read', false);
            loadNotifications();
        });

        // ==========================================================
        //                        الأعضاء + ترحيب
        // ==========================================================
        async function renderMembers() {
            const box = $('members-grid'); if (!box) return;
            const { data } = await sb.from('profiles').select('*').order('created_at', { ascending: false }).limit(60);
            box.innerHTML = '';
            const list = data || [];
            if (!list.length) { box.innerHTML = '<p class="muted text-sm col-span-full text-center py-8">لا أعضاء بعد.</p>'; return; }
            const weekAgo = Date.now() - 7 * 86400000;
            const newbies = list.filter(p => new Date(p.created_at).getTime() > weekAgo);
            const ws = $('welcome-strip');
            if (ws) {
                if (newbies.length) {
                    ws.classList.remove('hide');
                    $('welcome-names').textContent = newbies.slice(0, 6).map(p => p.display_name || p.username).join(' · ');
                } else ws.classList.add('hide');
            }
            list.forEach(p => {
                const d = designation(p);
                const av = safeUrl(p.avatar_url);
                const el = document.createElement('div');
                el.className = 'card member' + (new Date(p.created_at).getTime() > weekAgo ? ' new' : '');
                el.innerHTML =
                    '<div class="orbit-wrap">' +
                        '<i class="orbit path"><b>✦</b></i>' +
                        '<i class="orbit two"><b>✦</b></i>' +
                        '<div class="mav">' + (av ? '<img src="' + esc(av) + '" alt="" class="w-full h-full object-cover">' : esc((p.display_name || p.username || '?').charAt(0))) + '</div>' +
                    '</div>' +
                    '<div class="font-black text-[12.5px] truncate">' + esc(p.display_name || p.username) + (p.is_banned ? ' ⛔' : '') + '</div>' +
                    (d.text ? '<div class="desig-tag truncate">' + esc(d.text) + '</div>' : '') +
                    '<div class="text-[10.5px] font-tech font-black mt-0.5">' + p.points + ' PT</div>';
                el.addEventListener('click', () => {
                    if (isAdmin) { openMemberInfo(p.id); return; }
                    toast((p.display_name || p.username) + ' · ' + p.points + ' نقطة · ' + (p.visits || 0) + ' زيارة');
                });
                box.appendChild(el);
            });
        }
        // ==========================================================
        //                        لوحة الشرف
        // ==========================================================
        function buildConfetti() {
            const box = $('confetti'); if (!box || box.children.length) return;
            const cols = ['var(--gold)', 'var(--violet)', 'var(--cyan)'];
            for (let i = 0; i < 26; i++) {
                const c = document.createElement('i');
                c.style.left = Math.random() * 100 + '%';
                c.style.background = cols[i % 3];
                c.style.animationDuration = (3 + Math.random() * 3.5) + 's';
                c.style.animationDelay = (-Math.random() * 4) + 's';
                box.appendChild(c);
            }
        }

        // ---------------------------------------------------------- الترتيب
        async function renderRanking() {
            const box = $('ranking-list'); if (!box) return;
            const { data } = await sb.from('profiles').select('*').order('points', { ascending: false }).limit(20);
            const pod = $('podium');
            box.innerHTML = ''; if (pod) pod.innerHTML = '';
            const list = (data || []).filter(p => !p.is_banned);
            if (!list.length) { box.innerHTML = '<p class="muted text-sm text-center py-6">لا طلاب بعد.</p>'; return; }
            // المنصة: فقط من حددهم الأدمن (منصة ١/٢/٣) — لا شيء تلقائي
            const seated = list.filter(p => p.podium_rank).sort((a, b) => a.podium_rank - b.podium_rank);
            const podNote = $('podium-note');
            if (podNote) podNote.classList.toggle('hide', !!seated.length);
            [2, 1, 3].forEach(rank => {
                if (!pod) return;
                const p = seated.find(x => Number(x.podium_rank) === rank);
                if (!p) return;
                const d = designation(p);
                const av = safeUrl(p.avatar_url);
                const el = document.createElement('div');
                el.className = 'p' + (rank === 1 ? ' first' : '');
                el.innerHTML = (d.medal ? '<div class="medal">' + esc(d.medal) + '</div>' : '<div class="medal muted text-xs">—</div>') +
                    '<div class="w-11 h-11 rounded-full overflow-hidden mx-auto my-1 grid place-items-center font-black" style="background: rgba(var(--gold-rgb),.18); color: var(--gold)">' +
                    (av ? '<img src="' + esc(av) + '" alt="" class="w-full h-full object-cover">' : esc((p.display_name || '?').charAt(0))) + '</div>' +
                    '<div class="text-[11px] font-black truncate">' + esc(p.display_name || p.username) + '</div>' +
                    (d.text ? '<div class="text-[9.5px] muted truncate">' + esc(d.text) + '</div>' : '') +
                    '<div class="text-[11px] font-tech font-black gold mt-0.5">' + p.points + ' PT</div>';
                pod.appendChild(el);
            });
            list.forEach((p, i) => {
                const d = designation(p);
                const av = safeUrl(p.avatar_url);
                const medal = d.medal ? '<span class="text-lg">' + esc(d.medal) + '</span>' : '<span class="text-[11px] muted font-tech">#' + (i + 1) + '</span>';
                const el = document.createElement('div');
                el.className = 'file-row';
                if (me && p.id === me.id) el.style.borderColor = 'var(--gold)';
                el.innerHTML = '<div class="w-8 text-center font-black">' + medal + '</div>' +
                    '<div class="c-avatar">' + (av ? '<img src="' + esc(av) + '" alt="" class="w-full h-full object-cover">' : esc((p.display_name || '?').charAt(0))) + '</div>' +
                    '<div class="flex-1 min-w-0"><div class="font-bold text-sm truncate">' + esc(p.display_name || p.username) + '</div>' +
                    '<div class="text-[10.5px] muted">' + esc(d.text || 'طالب') + ' · ' + (p.visits || 0) + ' زيارة</div></div>' +
                    '<div class="font-tech font-black gold">' + p.points + ' PT</div>';
                box.appendChild(el);
            });
            buildConfetti();
        }
        // ==========================================================
        //                        لوحة الإدارة
        // ==========================================================
        on('admin-btn', 'click', () => { location.href = 'admin.html'; });

        async function loadAdminData() {
            const { data } = await sb.from('profiles').select('id, username, display_name, points, podium_rank, is_banned').order('points', { ascending: false });
            const list = (data || []).filter(p => !p.is_banned);
            if ($('aw-user')) $('aw-user').innerHTML = list.map(p => '<option value="' + p.id + '">' + esc(p.display_name || p.username) + ' (' + p.points + ' PT)</option>').join('');
            [1, 2, 3].forEach(rank => {
                const sel = $('pod-' + rank); if (!sel) return;
                const cur = (list.find(p => Number(p.podium_rank) === rank) || {}).id || '';
                sel.innerHTML = '<option value="">— لا أحد —</option>' + list.map(p =>
                    '<option value="' + p.id + '"' + (p.id === cur ? ' selected' : '') + '>' + esc(p.display_name || p.username) + '</option>').join('');
            });
        }

        on('podium-save', 'click', async () => {
            if (!isAdmin) return;
            const ids = [1, 2, 3].map(r => ($('pod-' + r) || {}).value || '');
            const chosen = ids.filter(Boolean);
            if (new Set(chosen).size !== chosen.length) { toast('لا يمكن اختيار نفس الطالب في مركزين', 'error'); return; }
            const st = $('podium-status'); if (st) st.textContent = 'جارٍ الحفظ...';
            const clear = await sb.from('profiles').update({ podium_rank: null }).not('podium_rank', 'is', null);
            if (clear.error) { toast('فشل: ' + dbError(clear.error), 'error'); if (st) st.textContent = ''; return; }
            for (let i = 0; i < 3; i++) {
                if (!ids[i]) continue;
                const r = await sb.from('profiles').update({ podium_rank: i + 1 }).eq('id', ids[i]);
                if (r.error) { toast('فشل: ' + dbError(r.error), 'error'); if (st) st.textContent = ''; return; }
            }
            if (st) st.textContent = '✅ تم حفظ المنصة';
            toast('تم تحديث منصة أفضل ثلاثة', 'ok');
            await loadAdminData(); renderRanking();
        });

        async function renderAdminLists() {
            loadAdminData();
            $('a-manage-count').textContent = posts.length;
            // المنشورات
            const pl = $('a-posts-list'); pl.innerHTML = '';
            if (!posts.length) pl.innerHTML = '<p class="muted text-sm text-center py-6">لا منشورات بعد.</p>';
            posts.forEach(p => {
                const sec = SECTIONS[p.section] || {};
                const r = document.createElement('div'); r.className = 'file-row';
                const th = safeUrl(p.image_url);
                r.innerHTML = (th ? '<img src="' + esc(th) + '" alt="" class="w-12 h-12 object-cover shrink-0">' : '<div class="file-ico">' + (sec.icon || '📄') + '</div>') +
                    '<div class="flex-1 min-w-0"><div class="font-bold text-sm truncate">' + esc(p.title) + '</div>' +
                    '<div class="text-xs muted">' + (sec.icon || '') + ' ' + (sec.name || p.section) + (p.file_no ? ' · ملف #' + esc(p.file_no) : '') + ' · ❤️ ' + (likesByPost[p.id] || 0) + '</div></div>';
                const e = document.createElement('button'); e.type = 'button'; e.className = 'btn btn-cyan btn-sm'; e.textContent = '✏️'; e.title = 'تعديل';
                e.addEventListener('click', () => startPostEdit(p));
                const d = document.createElement('button'); d.type = 'button'; d.className = 'btn btn-danger btn-sm'; d.textContent = '🗑'; d.title = 'حذف';
                d.addEventListener('click', () => deletePost(p));
                r.appendChild(e); r.appendChild(d); pl.appendChild(r);
            });

            // الطلاب: النقاط + الوسم + الميدالية + الحظر
            const { data: students } = await sb.from('profiles').select('*').order('points', { ascending: false });
            if ($('a-students-count')) $('a-students-count').textContent = (students || []).length;
            const sl = $('a-students-list'); sl.innerHTML = '';
            const MEDALS = ['', '🥇', '🥈', '🥉', '🏅', '🌟', '⭐', '💎', '🔥', '📚', '🧠', '💡', '🎯', '🚀', '⚡', '🌱', '🎓', '🤝', '🖊️', '🔬'];
            (students || []).forEach(p => {
                const r = document.createElement('div'); r.className = 'file-row flex-wrap';
                const av = safeUrl(p.avatar_url);
                r.innerHTML = '<div class="c-avatar">' + (av ? '<img src="' + esc(av) + '" class="w-full h-full object-cover" alt="">' : esc((p.display_name || '?').charAt(0))) + '</div>' +
                    '<div class="flex-1 min-w-0"><div class="font-bold text-sm truncate">' + esc(p.display_name || p.username) + (p.is_banned ? ' <span class="text-red-500">⛔ محظور</span>' : '') + '</div>' +
                    '<div class="text-xs muted" dir="ltr">@' + esc(p.username) + ' · ' + p.points + ' PT</div></div>';
                const pk = document.createElement('select'); pk.className = 'field w-24 text-center'; pk.style.padding = '.3rem'; pk.title = 'المنصة (أفضل 3)';
                pk.innerHTML = [['', '—'], ['1', 'المركز ١'], ['2', 'المركز ٢'], ['3', 'المركز ٣']].map(function (o) {
                    return '<option value="' + o[0] + '"' + (String(p.podium_rank || '') === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
                }).join('');
                const md = document.createElement('select'); md.className = 'field w-20 text-center'; md.style.padding = '.3rem';
                md.innerHTML = MEDALS.map(m => '<option value="' + m + '"' + ((p.medal || '') === m ? ' selected' : '') + '>' + (m || '—') + '</option>').join('');
                md.title = 'الميدالية';
                const tg = document.createElement('input'); tg.type = 'text'; tg.value = p.tag || ''; tg.className = 'field w-32';
                tg.style.padding = '.3rem'; tg.placeholder = 'الوسم (مثال: متفوق)'; tg.maxLength = 24;
                const save = document.createElement('button'); save.type = 'button'; save.className = 'btn btn-gold btn-sm'; save.textContent = '💾'; save.title = 'حفظ الوسم والميدالية';
                save.addEventListener('click', async () => {
                    const { error } = await sb.from('profiles').update({ medal: md.value || null, tag: tg.value.trim() || null, podium_rank: pk.value ? Number(pk.value) : null }).eq('id', p.id);
                    if (error) toast('فشل: ' + dbError(error), 'error');
                    else { toast('تم الحفظ ✓ ' + (p.display_name || p.username), 'ok'); renderAdminLists(); renderMembers(); renderRanking(); }
                });
                const pts = document.createElement('input'); pts.type = 'number'; pts.value = p.points; pts.className = 'field w-20 text-center'; pts.style.padding = '.3rem'; pts.title = 'النقاط';
                const psave = document.createElement('button'); psave.type = 'button'; psave.className = 'btn btn-primary btn-sm'; psave.textContent = '💾'; psave.title = 'حفظ النقاط';
                psave.addEventListener('click', async () => {
                    const v = parseInt(pts.value, 10); if (isNaN(v) || v < 0) { toast('قيمة غير صالحة', 'error'); return; }
                    const { error } = await sb.from('profiles').update({ points: v }).eq('id', p.id);
                    if (error) toast('فشل: ' + error.message, 'error');
                    else { toast('النقاط → ' + v, 'ok'); renderAdminLists(); }
                });
                const ban = document.createElement('button'); ban.type = 'button'; ban.className = 'btn ' + (p.is_banned ? 'btn-soft' : 'btn-ghost') + ' btn-sm'; ban.textContent = p.is_banned ? '✅' : '⛔';
                ban.title = p.is_banned ? 'رفع الحظر' : 'حظر';
                ban.addEventListener('click', async () => {
                    const { error } = await sb.from('profiles').update({ is_banned: !p.is_banned }).eq('id', p.id);
                    if (error) toast('فشل: ' + error.message, 'error'); else { toast(p.is_banned ? 'تم رفع الحظر' : 'تم الحظر', 'ok'); renderAdminLists(); renderRanking(); renderMembers(); }
                });
                const del = document.createElement('button'); del.type = 'button'; del.className = 'btn btn-danger btn-sm'; del.textContent = '🗑'; del.title = 'حذف الملف';
                del.addEventListener('click', async () => {
                    if (!confirm('حذف ملف الطالب "' + (p.display_name || p.username) + '"؟ (لن يُحذف بريده من نظام الحسابات)')) return;
                    const { error } = await sb.from('profiles').delete().eq('id', p.id);
                    if (error) toast('فشل: ' + error.message, 'error'); else { toast('تم حذف الملف', 'ok'); renderAdminLists(); renderRanking(); renderMembers(); }
                });
                r.appendChild(pk); r.appendChild(md); r.appendChild(tg); r.appendChild(save);
                r.appendChild(pts); r.appendChild(psave); r.appendChild(ban); r.appendChild(del);
                sl.appendChild(r);
            });

            // الإعلانات
            const anl = $('an-list'); anl.innerHTML = '';
            if (!announcements.length) anl.innerHTML = '<p class="muted text-xs">لا إعلانات.</p>';
            announcements.forEach(a => {
                const r = document.createElement('div'); r.className = 'file-row';
                const th = safeUrl(a.image_url);
                r.innerHTML = (th ? '<img src="' + esc(th) + '" alt="" class="w-10 h-10 object-cover shrink-0">' : '<div class="file-ico">📣</div>') +
                    '<div class="flex-1 min-w-0"><div class="font-bold text-sm truncate">' + esc(a.title) + '</div>' +
                    '<div class="text-[11px] muted">' + (a.file_no ? 'ملف #' + esc(a.file_no) + ' · ' : '') + new Date(a.created_at).toLocaleDateString('ar-DZ') + '</div></div>';
                const d = document.createElement('button'); d.type = 'button'; d.className = 'btn btn-danger btn-sm'; d.textContent = '🗑';
                d.addEventListener('click', async () => { await sb.from('announcements').delete().eq('id', a.id); toast('حُذف الإعلان', 'ok'); loadAnnouncements(); renderAdminLists(); });
                r.appendChild(d); anl.appendChild(r);
            });

            // المستويات
            // الألقاب السابقة
            const { data: awards } = await sb.from('weekly_awards').select('*, profiles(username, display_name)').order('created_at', { ascending: false }).limit(10);
            const al = $('aw-list'); al.innerHTML = '';
            (awards || []).forEach(a => {
                const r = document.createElement('div'); r.className = 'file-row';
                r.innerHTML = '<div class="text-xl">🏆</div><div class="flex-1 min-w-0"><div class="font-bold text-sm">' + esc(a.title) + ' — ' + esc(a.profiles ? (a.profiles.display_name || a.profiles.username) : '—') + '</div><div class="text-xs muted">' + esc(a.week_label || '') + '</div></div>';
                const d = document.createElement('button'); d.type = 'button'; d.className = 'btn btn-danger btn-sm'; d.textContent = '🗑';
                d.addEventListener('click', async () => { await sb.from('weekly_awards').delete().eq('id', a.id); toast('حُذف اللقب', 'ok'); renderAdminLists(); fetchAll(); });
                r.appendChild(d); al.appendChild(r);
            });

            // الإشراف
            const [mc, mch] = await Promise.all([
                sb.from('comments').select('*, profiles(username, display_name)').order('created_at', { ascending: false }).limit(20),
                sb.from('chat_messages').select('*, profiles(username, display_name)').order('created_at', { ascending: false }).limit(20)
            ]);
            const mcl = $('mod-comments'); mcl.innerHTML = '';
            (mc.data || []).forEach(c => {
                const r = document.createElement('div'); r.className = 'file-row';
                r.innerHTML = '<div class="flex-1 min-w-0"><div class="text-xs muted">' + esc((c.profiles || {}).display_name || (c.profiles || {}).username) + ' · ' + new Date(c.created_at).toLocaleDateString('ar-DZ') + '</div><div class="text-sm truncate">' + esc(c.content) + '</div></div>';
                const d = document.createElement('button'); d.type = 'button'; d.className = 'btn btn-danger btn-sm'; d.textContent = '🗑';
                d.addEventListener('click', async () => {
                    if (c.attachment && c.attachment.path) sb.storage.from(CONFIG.studentBucket).remove([c.attachment.path]).catch(() => {});
                    await sb.from('comments').delete().eq('id', c.id); toast('حُذف التعليق', 'ok'); renderAdminLists();
                });
                r.appendChild(d); mcl.appendChild(r);
            });
            if (!(mc.data || []).length) mcl.innerHTML = '<p class="muted text-xs">لا تعليقات.</p>';
            const mhl = $('mod-chat'); mhl.innerHTML = '';
            (mch.data || []).forEach(m => {
                const r = document.createElement('div'); r.className = 'file-row';
                r.innerHTML = '<div class="flex-1 min-w-0"><div class="text-xs muted">' + esc((m.profiles || {}).display_name || (m.profiles || {}).username) + ' · ' + new Date(m.created_at).toLocaleString('ar-DZ') + '</div><div class="text-sm truncate">' + esc(m.content || '📎 مرفق') + '</div></div>';
                const d = document.createElement('button'); d.type = 'button'; d.className = 'btn btn-danger btn-sm'; d.textContent = '🗑';
                d.addEventListener('click', async () => {
                    if (m.attachment && m.attachment.path) sb.storage.from(CONFIG.studentBucket).remove([m.attachment.path]).catch(() => {});
                    await sb.from('chat_messages').delete().eq('id', m.id); toast('حُذفت الرسالة', 'ok'); renderAdminLists(); if (session) loadChat();
                });
                r.appendChild(d); mhl.appendChild(r);
            });
            if (!(mch.data || []).length) mhl.innerHTML = '<p class="muted text-xs">لا رسائل.</p>';
        }

        // ---------------------------------------------------------- نشر/تعديل منشور طالب (أدمن)
        if ($('sp-max-size')) $('sp-max-size').textContent = fmtSize(CONFIG.maxAdminFile);
        const spdz = $('sp-dropzone');
        if (spdz) {
            spdz.addEventListener('click', () => $('sp-files').click());
            ['dragenter','dragover'].forEach(ev => spdz.addEventListener(ev, (e) => { e.preventDefault(); spdz.classList.add('drag'); }));
            ['dragleave','drop'].forEach(ev => spdz.addEventListener(ev, (e) => { e.preventDefault(); spdz.classList.remove('drag'); }));
            spdz.addEventListener('drop', (e) => addSpFiles(e.dataTransfer.files));
        }
        on('sp-files', 'change', (e) => { addSpFiles(e.target.files); e.target.value = ''; });
        function addSpFiles(fileList) {
            Array.from(fileList).forEach(f => {
                if (f.size > CONFIG.maxAdminFile) { toast('الملف أكبر من ' + fmtSize(CONFIG.maxAdminFile) + ': ' + f.name, 'error'); return; }
                if (pendingFiles.some(x => x.name === f.name && x.size === f.size)) return;
                pendingFiles.push(f);
            });
            renderSpFiles();
        }
        function renderSpFiles() {
            const box = $('sp-file-list'); box.innerHTML = '';
            const mk = (name, size, tag, onRemove) => {
                const r = document.createElement('div'); r.className = 'file-row';
                r.innerHTML = '<div class="file-ico">' + fileIcon(name) + '</div><div class="flex-1 min-w-0"><div class="font-bold text-sm truncate" dir="ltr" style="text-align:right">' + esc(name) + '</div><div class="text-xs muted">' + fmtSize(size) + ' ' + tag + '</div></div>';
                const b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-danger btn-sm'; b.textContent = '✕'; b.addEventListener('click', onRemove);
                r.appendChild(b); box.appendChild(r);
            };
            keptAttachments.forEach((a, i) => mk(a.name, a.size, '· <span class="accent2">مرفوع سابقاً</span>', () => { keptAttachments.splice(i, 1); renderSpFiles(); }));
            pendingFiles.forEach((f, i) => mk(f.name, f.size, '· <span class="accent">جديد</span>', () => { pendingFiles.splice(i, 1); renderSpFiles(); }));
        }
        on('sp-image', 'change', () => {
            const f = $('sp-image').files[0], pv = $('sp-image-preview');
            if (f) { pv.src = URL.createObjectURL(f); pv.classList.remove('hidden'); } else pv.classList.add('hidden');
        });

        function resetSpForm() {
            editingPost = null; pendingFiles = []; keptAttachments = [];
            $('spublish-form').reset(); $('sp-image-preview').classList.add('hidden');
            $('s-edit-banner').classList.add('hidden'); $('s-edit-banner').classList.remove('flex');
            $('sp-submit').textContent = 'DEPLOY // نشر الآن';
            $('sp-status').textContent = ''; $('sp-progress-wrap').classList.add('hidden'); $('sp-progress-bar').style.width = '0';
            $('sp-fileno').value = '';
            renderSpFiles();
        }
        on('s-cancel-edit', 'click', resetSpForm);

        function startPostEdit(p) {
            resetSpForm(); editingPost = p;
            $('sp-title').value = p.title; $('sp-section').value = p.section; $('sp-content').value = p.content || '';
            $('sp-fileno').value = p.file_no || '';
            $('sp-link').value = p.external_link || '';
            keptAttachments = p.attachments.slice(); renderSpFiles();
            if (p.image_url) { $('sp-image-preview').src = p.image_url; $('sp-image-preview').classList.remove('hidden'); }
            $('s-edit-label').textContent = p.title;
            $('s-edit-banner').classList.remove('hidden'); $('s-edit-banner').classList.add('flex');
            $('sp-submit').textContent = 'SAVE // حفظ التعديلات';
            closeModal('post-modal'); setTimeout(() => { location.href = 'admin.html?tab=a-new'; }, 260);
        }

        async function deletePost(p) {
            if (!confirm('حذف "' + p.title + '" نهائياً مع ملفاته وتعليقاته وإعجاباته؟')) return;
            const { error } = await sb.from('student_posts').delete().eq('id', p.id);
            if (error) { toast('فشل الحذف: ' + error.message, 'error'); return; }
            const paths = [storagePathFromUrl(p.image_url), storagePathFromUrl(p.video_url), ...p.attachments.map(a => a.path)].filter(Boolean);
            if (paths.length) await sb.storage.from(CONFIG.mediaBucket).remove(paths);
            toast('تم حذف المنشور', 'ok'); closeModal('post-modal'); fetchAll();
        }
        on('sdelete-btn', 'click', () => currentPost && deletePost(currentPost));
        on('sedit-btn', 'click', () => currentPost && startPostEdit(currentPost));

        on('spublish-form', 'submit', async (e) => {
            e.preventDefault();
            const btn = $('sp-submit'), status = $('sp-status'), bar = $('sp-progress-bar');
            if (!isAdmin) { toast('سجّل الدخول كأدمن', 'error'); return; }
            const link = $('sp-link').value.trim();
            if (link && !safeUrl(link)) { status.textContent = 'ERROR: الرابط يجب أن يبدأ بـ http(s)'; return; }
            const editing = editingPost;
            const imgFile = $('sp-image').files[0], vidFile = $('sp-video').files[0];
            const total = (imgFile ? 1 : 0) + (vidFile ? 1 : 0) + pendingFiles.length;
            let done = 0;
            const step = () => { done++; bar.style.width = (total ? (done / total) * 90 : 90) + '%'; };
            btn.disabled = true; $('sp-progress-wrap').classList.remove('hidden'); bar.style.width = '4%';
            status.textContent = total ? 'UPLOADING FILES...' : 'SAVING...';
            const uploaded = [], toDelete = [];
            try {
                let image_url = editing ? editing.image_url : null, video_url = editing ? editing.video_url : null;
                const publicUrl = (path) => sb.storage.from(CONFIG.mediaBucket).getPublicUrl(path).data.publicUrl;
                const uploadRaw = async (file, folder) => {
                    const ext = ((file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '')) || 'bin';
                    const path = folder + '/' + Date.now() + '_' + Math.random().toString(36).slice(2, 10) + '.' + ext;
                    const { error } = await sb.storage.from(CONFIG.mediaBucket).upload(path, file, { contentType: file.type || 'application/octet-stream' });
                    if (error) throw error;
                    uploaded.push(path); return path;
                };
                if (imgFile) { if (image_url) toDelete.push(storagePathFromUrl(image_url)); image_url = publicUrl(await uploadRaw(imgFile, 'student-images')); step(); }
                if (vidFile) { if (video_url) toDelete.push(storagePathFromUrl(video_url)); video_url = publicUrl(await uploadRaw(vidFile, 'student-videos')); step(); }
                const newAtts = [];
                for (const f of pendingFiles) {
                    status.textContent = 'UPLOADING: ' + f.name;
                    const path = await uploadRaw(f, 'student-files');
                    newAtts.push({ name: f.name, path, size: f.size, type: f.type || '' });
                    step();
                }
                if (editing) editing.attachments.filter(a => !keptAttachments.some(k => k.path === a.path)).forEach(a => toDelete.push(a.path));
                const payload = {
                    title: $('sp-title').value.trim(), section: $('sp-section').value, content: $('sp-content').value.trim(),
                    external_link: link || null, image_url, video_url, attachments: [...keptAttachments, ...newAtts],
                    file_no: ($('sp-fileno').value.trim() || null)
                };
                status.textContent = 'SAVING DATA...';
                let res;
                if (editing) res = await sb.from('student_posts').update(payload).eq('id', editing.id).select('id');
                else res = await sb.from('student_posts').insert([payload]).select('id');
                if (res.error) throw res.error;
                const dead = toDelete.filter(Boolean);
                if (dead.length) await sb.storage.from(CONFIG.mediaBucket).remove(dead);
                bar.style.width = '100%';
                toast(editing ? 'تم حفظ التعديلات' : 'تم نشر المنشور', 'ok');
                resetSpForm(); closeModal('admin-modal'); await fetchAll();
            } catch (err) {
                if (uploaded.length) await sb.storage.from(CONFIG.mediaBucket).remove(uploaded);
                status.textContent = 'ERROR: ' + dbError(err);
                toast('فشلت العملية: ' + dbError(err), 'error');
            } finally { btn.disabled = false; }
        });

        // ---------------------------------------------------------- لقب الأسبوع (أدمن)
        on('award-form', 'submit', async (e) => {
            e.preventDefault();
            if (!isAdmin) return;
            const uid = $('aw-user').value;
            if (!uid) { toast('لا يوجد طلاب بعد', 'error'); return; }
            const { error } = await sb.from('weekly_awards').insert({
                user_id: uid, title: $('aw-title').value.trim() || '⭐ طالب الأسبوع',
                week_label: $('aw-week').value.trim() || null, note: $('aw-note').value.trim() || null
            });
            if (error) { toast('فشل: ' + error.message, 'error'); return; }
            toast('🏆 تم منح اللقب!', 'ok'); $('award-form').reset(); $('aw-title').value = '⭐ طالب الأسبوع';
            renderAdminLists(); fetchAll();
        });

        // ---------------------------------------------------------- بدء التشغيل
        // نستخدم onAuthStateChange وحده (يعطي INITIAL_SESSION مرة واحدة) لتجنّب
        // تشغيل التهيئة مرتين وتحديثين متزامنين للتوكن بسبب تعليق الطلبات.
        // ==========================================================
        //              رفع أي ملف (بدون تحديد صيغة)
        // ==========================================================
        async function uploadAny(file, folder, bucket, maxBytes) {
            const limit = maxBytes || 10 * 1024 * 1024;
            if (file.size > limit) throw new Error('الملف أكبر من ' + fmtSize(limit));
            const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
            const b = bucket || CONFIG.studentBucket;
            const path = folder + '/' + ((me && me.id) || 'admin') + '/' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + '.' + ext;
            const { error } = await withTimeout(
                sb.storage.from(b).upload(path, file, { contentType: file.type || 'application/octet-stream', upsert: true }),
                120000, 'UPLOAD_TIMEOUT');
            if (error) throw error;
            return {
                name: file.name, path, size: file.size, type: file.type || 'application/octet-stream',
                bucket: b, url: sb.storage.from(b).getPublicUrl(path).data.publicUrl
            };
        }
        function fileUrl(f) {
            if (!f) return null;
            if (f.url) return f.url;
            if (f.path) return sb.storage.from(f.bucket || CONFIG.studentBucket).getPublicUrl(f.path).data.publicUrl;
            return null;
        }
        const EFFORT_CLASS = { 'جيد': 'chip-green', 'متوسط': 'chip-gold', 'رديء': 'chip-rose' };
        const KIND_LABEL = { exam: 'امتحان', homework: 'واجب', solution: 'حل' };

        // ==========================================================
        //                        الامتحانات
        // ==========================================================
        let exams = [];
        async function loadExams() {
            const box = $('exams-grid'); if (!box) return;
            const { data, error } = await sb.from('exams').select('*').order('created_at', { ascending: false });
            exams = data || [];
            const ab = $('exam-admin-box'); if (ab) ab.classList.toggle('hidden', !isAdmin);
            const sel = $('hw-exam');
            if (sel) sel.innerHTML = '<option value="">— بدون ربط —</option>' + exams.map(e => '<option value="' + e.id + '">' + esc(e.title) + '</option>').join('');
            if (error) { box.innerHTML = '<p class="muted text-sm col-span-full text-center">تعذّر التحميل — شغّل ملف SQL السادس.</p>'; return; }
            box.innerHTML = '';
            if (!exams.length) { box.innerHTML = '<div class="col-span-full text-center py-12 muted text-sm"><div class="text-4xl mb-2">📝</div>لا امتحانات منشورة بعد</div>'; return; }
            exams.forEach(e => {
                const f = e.file || null, u = fileUrl(f);
                const el = document.createElement('article');
                el.className = 'card frame';
                el.innerHTML = '<div class="p-4">' +
                    '<div class="flex items-start justify-between gap-2">' +
                    '<h3 class="text-lg font-black leading-tight">' + esc(e.title) + '</h3>' +
                    '<span class="chip chip-gold shrink-0 font-tech">من ' + e.max_score + '</span></div>' +
                    (e.lesson ? '<p class="muted text-[12.5px] mt-1">📚 ' + esc(e.lesson) + '</p>' : '') +
                    (e.note ? '<p class="muted text-sm mt-2 whitespace-pre-line">' + esc(e.note) + '</p>' : '') +
                    '<div class="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t" style="border-color: var(--border)">' +
                    (u ? '<a class="btn btn-cyan btn-sm" href="' + esc(u) + '" target="_blank" rel="noopener">⤓ تحميل الملف</a>' : '<span class="text-[11px] muted">بدون ملف</span>') +
                    '<span class="text-[10.5px] muted">' + new Date(e.created_at).toLocaleDateString('ar-DZ') + '</span>' +
                    (isAdmin ? '<button type="button" class="btn btn-danger btn-sm ms-auto" data-edel="' + e.id + '">🗑</button>' : '') +
                    '</div></div>';
                const d = el.querySelector('[data-edel]');
                if (d) d.addEventListener('click', async () => {
                    if (!confirm('حذف الامتحان "' + e.title + '"؟')) return;
                    const { error } = await sb.from('exams').delete().eq('id', e.id);
                    if (error) toast('فشل: ' + dbError(error), 'error');
                    else { toast('حُذف الامتحان', 'ok'); loadExams(); }
                });
                box.appendChild(el);
            });
        }
        on('exam-form', 'submit', async (ev) => {
            ev.preventDefault();
            if (!isAdmin) return;
            const btn = $('exam-submit'); btn.disabled = true;
            const st = $('exam-status'); if (st) st.textContent = '';
            try {
                let file = null;
                const f = $('exam-file').files[0];
                if (f) file = await uploadAny(f, 'exams', CONFIG.mediaBucket, 50 * 1024 * 1024);
                const { error } = await sb.from('exams').insert({
                    title: $('exam-title').value.trim(),
                    lesson: $('exam-lesson').value.trim() || null,
                    max_score: Number($('exam-max').value),
                    file, note: $('exam-note').value.trim() || null
                });
                if (error) throw error;
                $('exam-form').reset();
                if (st) st.textContent = '✅ نُشر الامتحان';
                toast('📝 نُشر الامتحان', 'ok');
                loadExams(); loadNotifications();
            } catch (err) { if (st) st.textContent = 'ERR: ' + dbError(err); }
            btn.disabled = false;
        });

        // ==========================================================
        //                  رفع الواجبات / الامتحانات المحلولة
        // ==========================================================
        function subStatusChip(s) {
            const map = { 'مقبول': 'chip-green', 'يحتاج تعديل': 'chip-rose', 'قيد المراجعة': 'chip-gold' };
            return '<span class="chip ' + (map[s] || 'chip-gold') + '">' + esc(s) + '</span>';
        }
        async function loadSubmissions() {
            const box = $('subs-list'); if (!box) return;
            const hint = $('subs-login-hint'); if (hint) hint.classList.toggle('hidden', !!session);
            const form = $('sub-form-wrap'); if (form) form.classList.toggle('hidden', !session);
            if (!session) { box.innerHTML = ''; return; }
            let qy = sb.from('submissions').select('*, profiles(username, display_name, avatar_url)').order('created_at', { ascending: false }).limit(80);
            if (!isAdmin) qy = qy.eq('student_id', me.id);
            const { data, error } = await qy;
            box.innerHTML = '';
            if (error) { box.innerHTML = '<p class="muted text-sm text-center py-6">تعذّر التحميل — شغّل ملف SQL السادس.<br><span class="text-xs" dir="ltr">' + esc(error.message) + '</span></p>'; return; }
            const list = data || [];
            if (!list.length) { box.innerHTML = '<div class="text-center py-10 muted text-sm"><div class="text-4xl mb-2">📥</div>' + (isAdmin ? 'لا يوجد رفع بعد' : 'لم ترفع شيئاً بعد') + '</div>'; return; }
            list.forEach(s => {
                const f = s.file, u = fileUrl(f);
                const pr = s.profiles || {};
                const el = document.createElement('div');
                el.className = 'file-row flex-wrap';
                el.innerHTML =
                    '<div class="file-ico">' + (s.kind === 'exam' ? '📝' : '📒') + '</div>' +
                    '<div class="flex-1 min-w-0">' +
                    '<div class="font-bold text-sm truncate">' + esc(s.title) + (s.subject ? ' <span class="muted text-[11px]">· ' + esc(s.subject) + '</span>' : '') + '</div>' +
                    '<div class="text-[11px] muted">' + (s.kind === 'exam' ? 'امتحان محلول' : 'واجب') + ' · ' +
                    (isAdmin ? esc(pr.display_name || pr.username || '') + ' · ' : '') + new Date(s.created_at).toLocaleDateString('ar-DZ') + '</div>' +
                    (s.note ? '<div class="text-[11.5px] muted mt-0.5">' + esc(s.note) + '</div>' : '') + '</div>' +
                    '<div class="flex items-center gap-1.5 flex-wrap">' + subStatusChip(s.status) +
                    (u ? '<a class="btn btn-soft btn-sm" href="' + esc(u) + '" target="_blank" rel="noopener">⤓</a>' : '') + '</div>';
                if (isAdmin) {
                    const row = document.createElement('div');
                    row.className = 'flex flex-wrap items-center gap-1.5 w-full mt-1';
                    const sc = document.createElement('select'); sc.className = 'field text-xs w-36'; sc.style.padding = '.3rem';
                    sc.innerHTML = ['قيد المراجعة', 'مقبول', 'يحتاج تعديل'].map(x => '<option' + (x === s.status ? ' selected' : '') + '>' + x + '</option>').join('');
                    const mx = document.createElement('select'); mx.className = 'field text-xs w-24'; mx.style.padding = '.3rem';
                    mx.innerHTML = [20, 10, 5].map(x => '<option value="' + x + '"' + ((s.max_score || 20) === x ? ' selected' : '') + '>من ' + x + '</option>').join('');
                    const gr = document.createElement('input'); gr.type = 'number'; gr.min = 0; gr.value = s.score == null ? '' : s.score;
                    gr.placeholder = 'النقطة'; gr.className = 'field text-xs w-24'; gr.style.padding = '.3rem';
                    const ef = document.createElement('select'); ef.className = 'field text-xs w-28'; ef.style.padding = '.3rem';
                    ef.innerHTML = '<option value="">المجهود</option>' + ['جيد', 'متوسط', 'رديء'].map(x => '<option' + (x === s.effort ? ' selected' : '') + '>' + x + '</option>').join('');
                    const sv = document.createElement('button'); sv.type = 'button'; sv.className = 'btn btn-gold btn-sm'; sv.textContent = '💾';
                    sv.title = 'حفظ التقييم (يضيف نتيجة أيضاً)';
                    sv.addEventListener('click', async () => {
                        const score = gr.value === '' ? null : Number(gr.value);
                        if (score != null && (score < 0 || score > Number(mx.value))) { toast('النقطة أكبر من السقف', 'error'); return; }
                        const up = await sb.from('submissions').update({ status: sc.value, score, max_score: Number(mx.value) }).eq('id', s.id);
                        if (up.error) { toast('فشل: ' + dbError(up.error), 'error'); return; }
                        if (score != null) {
                            await sb.from('results').insert({
                                item_kind: s.kind === 'exam' ? 'solution' : 'homework',
                                item_title: s.title, subject: s.subject,
                                student_id: s.student_id, score, max_score: Number(mx.value),
                                effort: ef.value || null, note: 'من تقييم الرفع'
                            });
                        }
                        toast('تم حفظ التقييم', 'ok'); loadSubmissions();
                    });
                    const del = document.createElement('button'); del.type = 'button'; del.className = 'btn btn-danger btn-sm'; del.textContent = '🗑';
                    del.addEventListener('click', async () => {
                        if (!confirm('حذف الرفع؟')) return;
                        if (s.file && s.file.path) sb.storage.from(s.file.bucket || CONFIG.studentBucket).remove([s.file.path]).catch(() => {});
                        await sb.from('submissions').delete().eq('id', s.id);
                        toast('حُذف', 'ok'); loadSubmissions();
                    });
                    row.appendChild(sc); row.appendChild(mx); row.appendChild(gr); row.appendChild(ef); row.appendChild(sv); row.appendChild(del);
                    el.appendChild(row);
                } else {
                    const del = document.createElement('button'); del.type = 'button'; del.className = 'btn btn-soft btn-sm'; del.textContent = '🗑';
                    del.title = 'حذف رفعي';
                    del.addEventListener('click', async () => {
                        if (!confirm('حذف هذا الرفع؟')) return;
                        if (s.file && s.file.path) sb.storage.from(s.file.bucket || CONFIG.studentBucket).remove([s.file.path]).catch(() => {});
                        await sb.from('submissions').delete().eq('id', s.id);
                        toast('حُذف', 'ok'); loadSubmissions();
                    });
                    el.querySelector('.flex.items-center').appendChild(del);
                }
                box.appendChild(el);
            });
        }
        on('sub-form', 'submit', async (ev) => {
            ev.preventDefault();
            if (!session) { toast('سجّل الدخول أولاً', 'error'); return; }
            const btn = $('sub-submit'); btn.disabled = true;
            const st = $('sub-status'); if (st) st.textContent = '';
            try {
                const f = $('sub-file').files[0];
                if (!f) throw new Error('اختر ملف الواجب');
                const file = await uploadAny(f, 'submissions', CONFIG.studentBucket, 10 * 1024 * 1024);
                const kind = $('sub-kind').value;
                const { error } = await sb.from('submissions').insert({
                    kind, title: $('sub-title').value.trim(), subject: $('sub-subject').value.trim() || null,
                    exam_id: kind === 'exam' ? ($('hw-exam').value || null) : null,
                    student_id: me.id, file, note: $('sub-note').value.trim() || null
                });
                if (error) throw error;
                $('sub-form').reset();
                if (st) st.textContent = '✅ تم الرفع';
                toast('📥 تم رفع ملفك', 'ok');
                loadSubmissions();
            } catch (err) { if (st) st.textContent = 'ERR: ' + dbError(err); }
            btn.disabled = false;
        });

        // ==========================================================
        //                        النتائج
        // ==========================================================
        let results = [];
        let resultFilter = 'ALL';
        async function loadResults() {
            const box = $('results-list'); if (!box) return;
            const ab = $('result-admin-box'); if (ab) ab.classList.toggle('hidden', !isAdmin);
            const { data, error } = await sb.from('results').select('*, profiles(username, display_name, avatar_url)').order('created_at', { ascending: false }).limit(200);
            results = data || [];
            if (error) { box.innerHTML = '<p class="muted text-sm text-center py-6">تعذّر التحميل — شغّل ملف SQL السادس.</p>'; return; }
            const list = results.filter(r => resultFilter === 'ALL' || r.item_kind === resultFilter);
            box.innerHTML = '';
            if (!list.length) { box.innerHTML = '<div class="text-center py-10 muted text-sm"><div class="text-4xl mb-2">📊</div>لا نتائج بعد</div>'; return; }
            list.forEach(r => {
                const pr = r.profiles || {};
                const el = document.createElement('div');
                el.className = 'file-row';
                el.innerHTML =
                    '<div class="w-8 text-center font-black gold font-tech"></div>' +
                    '<div class="c-avatar">' + (safeUrl(pr.avatar_url) ? '<img src="' + esc(safeUrl(pr.avatar_url)) + '" class="w-full h-full object-cover" alt="">' : esc((pr.display_name || '?').charAt(0))) + '</div>' +
                    '<div class="flex-1 min-w-0"><div class="font-bold text-sm truncate">' + esc(pr.display_name || pr.username || '—') + '</div>' +
                    '<div class="text-[11px] muted truncate">' + (KIND_LABEL[r.item_kind] || '') + ' · ' + esc(r.item_title) + (r.subject ? ' · ' + esc(r.subject) : '') + '</div></div>' +
                    '<div class="text-center"><div class="font-tech font-black ' + (r.score != null && r.score < r.max_score / 2 ? 'text-rose-500' : 'gold') + '">' + (r.score == null ? '—' : r.score) + '/' + r.max_score + '</div>' +
                    (r.effort ? '<div class="text-[10px] muted">' + esc(r.effort) + '</div>' : '') + '</div>' +
                    (isAdmin ? '<button type="button" class="btn btn-danger btn-sm">🗑</button>' : '');
                const del = el.querySelector('button');
                if (del) del.addEventListener('click', async () => {
                    if (!confirm('حذف النتيجة؟')) return;
                    await sb.from('results').delete().eq('id', r.id);
                    toast('حُذفت النتيجة', 'ok'); loadResults();
                });
                box.appendChild(el);
            });
        }
        document.querySelectorAll('[data-rfilter]').forEach(b => b.addEventListener('click', () => {
            resultFilter = b.dataset.rfilter;
            document.querySelectorAll('[data-rfilter]').forEach(x => { x.classList.toggle('btn-gold', x === b); x.classList.toggle('btn-soft', x !== b); });
            loadResults();
        }));
        on('result-form', 'submit', async (ev) => {
            ev.preventDefault();
            if (!isAdmin) return;
            const btn = $('result-submit'); btn.disabled = true;
            const st = $('result-status'); if (st) st.textContent = '';
            try {
                const uid = $('rs-student').value;
                if (!uid) throw new Error('اختر الطالب');
                const max = Number($('rs-max').value);
                const score = $('rs-score').value === '' ? null : Number($('rs-score').value);
                if (score != null && (score < 0 || score > max)) throw new Error('النقطة يجب أن تكون بين 0 و ' + max);
                const { error } = await sb.from('results').insert({
                    item_kind: $('rs-kind').value, item_title: $('rs-title').value.trim(),
                    subject: $('rs-subject').value.trim() || null, student_id: uid,
                    score, max_score: max, effort: $('rs-effort').value || null,
                    note: $('rs-note').value.trim() || null
                });
                if (error) throw error;
                $('result-form').reset();
                if (st) st.textContent = '✅ أُضيفت النتيجة';
                toast('📊 أُضيفت النتيجة', 'ok');
                loadResults(); loadNotifications();
            } catch (err) { if (st) st.textContent = 'ERR: ' + dbError(err); }
            btn.disabled = false;
        });
        async function fillStudentSelect(sel, withEmpty) {
            if (!sel) return;
            const { data } = await sb.from('profiles').select('id, username, display_name').order('display_name');
            sel.innerHTML = (withEmpty ? '<option value="">— اختر طالباً —</option>' : '') +
                (data || []).map(p => '<option value="' + p.id + '">' + esc(p.display_name || p.username) + '</option>').join('');
        }

        // ==========================================================
        //                  التواصل الخاص مع الأستاذ
        // ==========================================================
        let contactUser = null;
        async function loadContact() {
            const box = $('thread'); if (!box) return;
            const hint = $('contact-login-hint'); if (hint) hint.classList.toggle('hidden', !!session);
            const pick = $('contact-admin-pick'); if (pick) pick.classList.toggle('hidden', !(session && isAdmin));
            const wrap = $('contact-wrap'); if (wrap) wrap.classList.toggle('hidden', !session);
            if (!session) return;
            if (isAdmin) {
                const sel = $('contact-students');
                if (sel) {
                    const { data } = await sb.from('profiles').select('id, username, display_name').order('display_name');
                    const cur = contactUser || new URLSearchParams(location.search).get('u') || '';
                    sel.innerHTML = '<option value="">— اختر طالباً —</option>' + (data || []).map(p =>
                        '<option value="' + p.id + '"' + (p.id === cur ? ' selected' : '') + '>' + esc(p.display_name || p.username) + '</option>').join('');
                    contactUser = cur || null;
                }
            } else contactUser = me.id;
            if (!contactUser) { box.innerHTML = '<p class="muted text-sm text-center py-8">اختر طالباً لعرض المحادثة.</p>'; return; }
            const { data } = await sb.from('admin_messages').select('*').eq('user_id', contactUser).order('created_at').limit(200);
            box.innerHTML = '';
            const rows = data || [];
            if (!rows.length) { box.innerHTML = '<div class="text-center py-10 muted text-sm"><div class="text-3xl mb-2">✉️</div>لا رسائل بعد — ابدأ الحديث</div>'; }
            rows.forEach(m => {
                const mine = isAdmin ? m.from_admin : !m.from_admin;
                const el = document.createElement('div');
                el.className = 'brow' + (mine ? ' mine' : '');
                el.innerHTML = '<div class="bwrap"><div class="bubble">' +
                    (m.body ? '<span class="ctext">' + esc(m.body) + '</span>' : '') +
                    (m.attachment ? bubbleAttachment(m.attachment) : '') +
                    '<span class="btime">' + new Date(m.created_at).toLocaleString('ar-DZ', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) + '</span>' +
                    '</div></div>';
                box.appendChild(el);
            });
            box.scrollTop = box.scrollHeight;
        }
        let contactFile = null;
        on('contact-file', 'change', () => {
            contactFile = $('contact-file').files[0] || null;
            const info = $('contact-file-info');
            if (info) { info.textContent = contactFile ? '📎 ' + contactFile.name : ''; info.classList.toggle('hidden', !contactFile); }
        });
        on('contact-attach', 'click', () => { const el = $('contact-file'); if (el) el.click(); });
        async function sendContact() {
            if (!session || !contactUser) return;
            const ta = $('contact-input'); const text = (ta.value || '').trim();
            if (!text && !contactFile) return;
            const btn = $('contact-send'); btn.disabled = true;
            try {
                let attachment = null;
                if (contactFile) { attachment = await uploadAny(contactFile, 'contact', CONFIG.studentBucket, 10 * 1024 * 1024); contactFile = null; }
                const { error } = await sb.from('admin_messages').insert({
                    user_id: isAdmin ? contactUser : me.id,
                    from_admin: isAdmin, body: text || null, attachment
                });
                if (error) throw error;
                ta.value = ''; if ($('contact-file')) $('contact-file').value = '';
                if ($('contact-file-info')) $('contact-file-info').classList.add('hidden');
                await loadContact();
            } catch (err) { toast('فشل الإرسال: ' + dbError(err), 'error'); }
            btn.disabled = false;
        }
        on('contact-send', 'click', sendContact);
        on('contact-input', 'keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendContact(); } });
        on('contact-students', 'change', () => { contactUser = $('contact-students').value || null; loadContact(); });

        // ==========================================================
        //              بطاقة معلومات العضو (للأدمن)
        // ==========================================================
        async function openMemberInfo(uid) {
            const body = $('member-info-body'); if (!body) return;
            body.innerHTML = '<p class="muted text-sm text-center py-6">جارٍ التحميل...</p>';
            openModal('member-modal');
            const [{ data: p }, subs, res] = await Promise.all([
                sb.from('profiles').select('*').eq('id', uid).maybeSingle(),
                sb.from('submissions').select('id', { count: 'exact', head: true }).eq('student_id', uid),
                sb.from('results').select('id', { count: 'exact', head: true }).eq('student_id', uid)
            ]);
            if (!p) { body.innerHTML = '<p class="muted text-sm">لا بيانات.</p>'; return; }
            const d = designation(p);
            const av = safeUrl(p.avatar_url);
            body.innerHTML =
                '<div class="flex items-center gap-4 mb-4">' +
                '<div class="w-16 h-16 rounded-full overflow-hidden grid place-items-center font-black text-xl" style="background: rgba(var(--gold-rgb),.18); color: var(--gold)">' +
                (av ? '<img src="' + esc(av) + '" class="w-full h-full object-cover" alt="">' : esc((p.display_name || '?').charAt(0))) + '</div>' +
                '<div><div class="font-black text-lg">' + esc(p.display_name || p.username) + '</div>' +
                '<div class="muted text-xs" dir="ltr">@' + esc(p.username) + '</div>' +
                (d.text ? '<div class="desig-tag">' + esc(d.text) + '</div>' : '') + '</div></div>' +
                '<div class="grid grid-cols-2 gap-2 text-sm">' +
                '<div class="frame p-2.5"><div class="muted text-[10.5px]">النقاط</div><div class="font-tech font-black gold">' + p.points + ' PT</div></div>' +
                '<div class="frame p-2.5"><div class="muted text-[10.5px]">الزيارات</div><div class="font-tech font-black">' + (p.visits || 0) + '</div></div>' +
                '<div class="frame p-2.5"><div class="muted text-[10.5px]">الرفعات</div><div class="font-tech font-black">' + (subs.count || 0) + '</div></div>' +
                '<div class="frame p-2.5"><div class="muted text-[10.5px]">النتائج</div><div class="font-tech font-black">' + (res.count || 0) + '</div></div>' +
                '<div class="frame p-2.5"><div class="muted text-[10.5px]">المنصة</div><div class="font-black">' + (p.podium_rank ? 'المركز ' + p.podium_rank : '—') + '</div></div>' +
                '<div class="frame p-2.5"><div class="muted text-[10.5px]">الحالة</div><div class="font-black">' + (p.is_banned ? '⛔ محظور' : '✅ نشط') + '</div></div>' +
                '</div>' +
                '<div class="muted text-[11px] mt-3">انضم: ' + new Date(p.created_at).toLocaleString('ar-DZ') + '</div>' +
                '<div class="flex gap-2 mt-4"><a class="btn btn-gold btn-sm flex-1" href="contact.html?u=' + p.id + '">✉️ مراسلة خاصة</a>' +
                '<a class="btn btn-soft btn-sm" href="admin.html?tab=a-students">🎓 إدارة</a></div>';
        }

        on('ct-join', 'click', () => openModal('auth-modal'));
        on('hw-join', 'click', () => openModal('auth-modal'));
        function pageEls() { return document.body.dataset.page || 'home'; }

        async function homeStats() {
            const [pr, po, an] = await Promise.all([
                sb.from('profiles').select('id', { count: 'exact', head: true }),
                sb.from('student_posts').select('id', { count: 'exact', head: true }),
                sb.from('announcements').select('id', { count: 'exact', head: true })
            ]);
            const set = (id, v) => { const e = $(id); if (e) e.textContent = v; };
            set('st-members', pr.count == null ? '—' : pr.count);
            set('st-posts', po.count == null ? '—' : po.count);
            set('st-ann', an.count == null ? '—' : an.count);
            set('st-points', me ? me.points : '—');
        }

        async function pageLoad() {
            const page = pageEls();
            if (page === 'home') { renderRanking(); await homeStats(); }
            else if (page === 'ann') { await loadAnnouncements(); }
            else if (page === 'content') { await fetchAll(); const fno = new URLSearchParams(location.search).get('file'); if (fno) filterByFile(fno); }
            else if (page === 'members') { await renderMembers(); }
            else if (page === 'hall') { await fetchAll(); await renderRanking(); }

            else if (page === 'chat') { if (session) await loadChat(); }
            else if (page === 'exams') { await loadExams(); }
            else if (page === 'homework') { await loadExams(); await loadSubmissions(); }
            else if (page === 'results') { await fillStudentSelect($('rs-student'), true); await loadResults(); }
            else if (page === 'contact') { await loadContact(); }
            else if (page === 'admin') {
                if (!isAdmin) { toast('هذه الصفحة للإدارة فقط', 'error'); setTimeout(() => location.href = 'students.html', 900); return; }
                await fetchAll(); await loadAnnouncements(); await renderAdminLists();
                const t = new URLSearchParams(location.search).get('tab');
                if (t) { const b = document.querySelector('[data-mtab="' + t + '"]'); if (b) b.click(); }
                const ed = new URLSearchParams(location.search).get('edit');
                if (ed) { const p = posts.find(x => String(x.id) === ed); if (p) startPostEdit(p); }
            }
        }

        (async function init() {
            const y = $('year'); if (y) y.textContent = new Date().getFullYear();
            let first = true, seq = 0;
            sb.auth.onAuthStateChange((evt, s) => {
                const prevId = session && session.user ? session.user.id : null;
                const nextId = s && s.user ? s.user.id : null;
                if (!first && evt === 'TOKEN_REFRESHED' && prevId === nextId) return;
                first = false;
                const my = ++seq;
                session = s;
                // الخروج من قفل المصادقة قبل أي طلب (يمنع التعليق)
                setTimeout(async () => {
                    try {
                        await refreshMe();
                        if (my !== seq) return;
                        updateAuthUI();
                        if (my !== seq) return;
                        await pageLoad();
                    } catch (e) { console.error(e); }
                }, 0);
            });
        })();
    

        (function () {
            if (!('serviceWorker' in navigator)) return; if (/^(localhost|127[.]0[.]0[.]1)$/.test(location.hostname)) return;
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('sw.js', { scope: './' }).catch(function () {});
            });

            var btn = document.getElementById('pwa-install');
            var tip = document.getElementById('pwa-tip');
            var deferred = null;
            var standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
            var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

            window.addEventListener('beforeinstallprompt', function (e) {
                e.preventDefault(); deferred = e; if (!standalone) btn.hidden = false;
            });

            btn.addEventListener('click', async function () {
                if (deferred) {
                    deferred.prompt();
                    var choice = await deferred.userChoice.catch(function () { return {}; });
                    if (choice && choice.outcome === 'accepted') btn.hidden = true;
                    deferred = null;
                    return;
                }
                tip.hidden = false;
            });

            document.getElementById('pwa-tip-close').addEventListener('click', function () { tip.hidden = true; });

            if (isIOS && !standalone) {
                setTimeout(function () { btn.hidden = false; }, 1200);
            }
            window.addEventListener('appinstalled', function () { btn.hidden = true; });
        })();
    
    