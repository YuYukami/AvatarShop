/* ============================================================
   RimoStudio 多語系（中文 / 日文）
   - 中文＝原文，直接寫在 HTML，不需維護；只維護下方日文字典。
   - 要翻譯的元素加 data-i18n="key"；輸入框提示加 data-i18n-ph="key"。
   - 首次載入依瀏覽器語言自動選，之後記住使用者選擇。
   ============================================================ */

window.I18N = {
  ja: {
    /* 導覽列 */
    'nav.home': 'ホーム',
    'nav.gallery': 'ギャラリー',
    'nav.team': 'チーム紹介',
    'nav.terms': '依頼規約',
    'nav.glossary': '用語説明',
    'nav.faq': 'よくある質問',
    'nav.schedule': '制作スケジュール',
    'nav.estimate': '料金見積り',

    /* 首頁 Hero */
    'hero.tag': '✦ VRChat アバターのカスタマイズ',
    'hero.h1': 'あなただけの<br>オリジナルアバターを',
    'hero.p1': 'RimoStudio は VRChat アバターのカスタマイズサービスを提供しています ——',
    'hero.p2': '衣装・髪型・機能導入・顔型など、幅広いカスタマイズであなたのアバターを唯一無二に。',
    'hero.btn1': '料金見積りを始める →',
    'hero.btn2': '作品を見る',

    /* 服務項目 */
    'sec.services': 'サービス内容',
    'services.lead': '基本から応用まで、アバターのカスタマイズをワンストップで。',
    'feat.1t': '衣装と髪型', 'feat.1d': '衣装・髪型・小物の着せ替えで理想のスタイルに。',
    'feat.2t': '色替えと顔型', 'feat.2d': '簡易・応用の色替え、顔型・体型の修正。',
    'feat.3t': '機能導入', 'feat.3d': 'ハンドメニュー・便利ツール・各種機能。',
    'feat.4t': 'おまかせ / OC', 'feat.4d': 'あなたのデザイン、または全てお任せ（通霊）でオリジナルキャラを制作。',

    /* 作品集 */
    'sec.gallery': 'ギャラリー',
    'gallery.lead': 'カスタマイズ事例の一部 —— 左右にスワイプ、クリックで拡大。',

    /* 團隊 */
    'sec.team': '制作チーム',
    'team.lead': 'RimoStudio は店主と専門メンバーで構成され、モデリング・アニメーション・色替え・機能導入など各分野のプロがあなたのアバターを制作します。',
    'team.note': '店主と専門メンバー、それぞれ得意分野あり（メンバー拡大中）',
    'team.btn': 'チームを見る →',

    /* 委託須知（導引） */
    'sec.terms': '依頼規約',
    'terms.lead': 'ご依頼前に必ず規約をお読みいただき、同意後に見積り・ご注文へお進みください。',
    'terms.body': '<strong>制作時間・支払い方法・前金とキャンセル規定・データ保管・モデル利用制限</strong>などの重要事項を含みます。<br>全文をお読みのうえ同意にチェックすると、料金見積りを開始できます。',
    'terms.btn': '規約を読んで始める →',

    /* FAQ */
    'sec.faq': 'よくある質問',
    'faq.lead': 'VRChat アバター改変のご依頼に関するよくある質問。',
    'faq.q1': 'VRChat の改変（アバターカスタマイズ）はいくらかかりますか？',
    'faq.a1': '料金はプランと追加項目により異なります：アップロード代行 NT$250、セットプランは NT$1,200〜（フレンドプラン）、おまかせ／OC は NT$4,500〜。<a href="estimate.html">料金見積り</a> ページでプランと追加項目を選ぶと、その場で概算できます。',
    'faq.q2': '依頼の流れは？',
    'faq.a2': '3ステップ：① <a href="terms.html">依頼規約</a> を読んで同意 → ② <a href="estimate.html">料金見積り</a> で概算 → ③ <a href="https://discord.gg/tzbvaHy9Kx" target="_blank" rel="noopener">Discord</a> で店主に連絡して確定。',
    'faq.q3': '「通霊（おまかせ）」とは？',
    'faq.a3': '「通霊」とは、明確なデザインを用意せず、スタイルを店主にお任せしてオリジナルキャラを制作することです。もちろんデザイン画や好みのスタイル（スタイルプラン）をご提供いただくことも可能です。用語は <a href="glossary.html">用語説明</a> をご覧ください。',
    'faq.q4': '自分のアバター用ではない衣装・髪型も導入できますか？（非対応）',
    'faq.a4': '可能です。他のキャラ向けに作られた商品を自分のモデルに導入する場合を「非対応」と呼び、追加の調整が必要なため「対応キャラ」より料金が高くなります。見積りページで対応・非対応の数量を別々に選べます。',
    'faq.q5': '制作期間・制作時間は？',
    'faq.a5': '制作時間は平日 20:00〜22:00（休日はお休み）。実際の期間は内容の複雑さによります。正確な日程はご依頼時に店主と確認します。現在の空き状況はトップの「制作スケジュール」をご覧ください。',
    'faq.q6': '前金は必要ですか？支払い方法は？',
    'faq.a6': '現在 <b>銀行／ATM 振込</b> に対応、海外のお客様は <b>PayPal</b> をご利用いただけます。振込先や QR コードは Discord でのご連絡後にお伝えします。制作前に前金（総額の 50%）または全額のお支払いが必要です。制作開始前はキャンセル可能ですが、開始後は進行度に応じてキャンセル料が発生します。詳しくは <a href="terms.html">依頼規約</a> をご覧ください。',
    'faq.q7': '保証はありますか？',
    'faq.a7': 'はい。標準保証は納品確認後 7 日以内、制作上の不具合（貫通・ウェイト異常など）を無償で修正します。保証の追加購入も可能で、月額 NT$700・最大 6 か月。詳しくは <a href="glossary.html">保証について</a> をご覧ください。',
    'faq.q8': 'お受けできないご依頼は？',
    'faq.a8': '現在、欧米系／ケモノ（Furry）モデルはお受けしておりません（今後開放を検討）。また、当スタジオが制作したモデルの共有・配布は禁止です。',

    /* 排程 */
    'sec.schedule': '制作スケジュール',
    'schedule.lead': '現在の制作・空き状況。',

    /* 頁尾 */
    'footer.estimate': '料金見積り',

    /* ===== 委託試算頁（靜態） ===== */
    'est.title': '料金見積り',
    'est.sub': 'プランと追加項目を選ぶと、ご依頼料金をその場で概算できます（新台湾ドル TWD）',
    'est.step1': '<b>1.</b> プランを選ぶ', 'est.step2': '<b>2.</b> 追加項目を選ぶ', 'est.step3': '<b>3.</b> 店主に連絡',
    'est.glossHint': '用語がわからない？まずは <a href="glossary.html">用語説明</a> をご覧ください',
    'est.h.plan': 'プランを選ぶ', 'est.sub.plan': '表示価格はプラン総額で、記載の項目をすべて含みます',
    'est.h.addon': '追加項目', 'est.sub.addon': '必要に応じて自由に追加、数量は即座に合計へ反映',
    'est.h.rush': '特急制作', 'est.rushnote': '上記すべての項目の小計に対して加算、2種いずれか一つ；もう一度押すと解除。',
    'est.h.util': '便利機能',
    'est.h.nsfw': 'NSFW システム', 'est.sub.nsfw': '標準位置：口・胸・穴・お尻・両手；位置を追加するごとに +$100',
    'est.h.booth': 'Booth 代理購入', 'est.sub.booth': '商品の日本円金額で区分、商品1点ごとに追加',
    'est.h.warranty': '保証の追加', 'est.sub.warranty': '1か月あたり $700、各プラン最大 6 か月まで（一部プランは保証込み）',
    'est.summary': '見積り明細', 'est.codePh': '割引コード（任意）', 'est.apply': '適用',
    'est.total': '見積り合計', 'est.cta': '店主に連絡して依頼を確定 →', 'est.glossLink': '📖 用語説明を見る',
    'est.gate.h': '見積りの前に、まず依頼規約をお読みください',
    'est.gate.p': '依頼規約には<strong>制作時間・支払い方法・前金とキャンセル規定・データ保管・モデル利用制限</strong>などの重要事項が含まれます。お読みのうえ同意にチェックすると見積りを開始できます。',
    'est.gate.btn1': '依頼規約を読む →', 'est.gate.btn2': 'ホームへ戻る',
    'est.rm.title': '見積り結果',
    'est.rm.note': '※ これは概算金額です。実際の料金は店主の確認によります。<br><strong>この結果をスクリーンショットまたはコピー</strong>し、Discord で店主にご連絡ください。',
    'est.rm.discord': 'Discord で店主に連絡 →', 'est.rm.copy': '📋 明細をコピー', 'est.rm.back': '修正に戻る',

    /* ===== 委託須知頁 ===== */
    'terms.h': '依頼規約',
    'terms.leadFull': '以下の規約を<strong>最後までスクロールして</strong>お読みいただき、同意にチェックすると料金見積りを開始できます。',
    'terms.li1': '現在、<span class="hl">欧米系 / ケモノ（Furry）モデル</span>のご依頼はお受けしておりません（今後開放を検討）。',
    'terms.li2': '休日は制作をお休みし、制作時間は平日 <span class="hl">20:00〜22:00</span> です。',
    'terms.li3': '当スタジオはお客様に代わって購入代行が可能です。制作完了・確認後、当スタジオ側の未購入ファイルは削除します。',
    'terms.li4': 'カスタム品は提出後 <span class="hl">15 日</span>で作業ファイルを削除しますので、その期間内に確認を済ませてください。',
    'terms.li5': '<span class="hl">1 か月</span>以内の〔再制作・修正〕などは1か月無料で保管します。超過する場合は保管料として1体あたり <span class="hl">NTD 250</span> を頂きます。',
    'terms.li6': '制作前に〔<span class="hl">前金（総額の 50%）／全額</span>〕をお支払いいただくと制作を開始します。<br><span style="color:var(--muted)">支払い方法：銀行／ATM 振込、海外のお客様は PayPal 可；振込先はご連絡後にお伝えします。</span>',
    'terms.li7': '前金<span class="hl">（全額の50%）</span>または全額のお支払い後に着手します。1体あたり約1週間で完成します<span class="hl">（土・日を除く）</span>',
    'terms.li8': '開始前であればキャンセル可能ですが、開始後はキャンセル料（前金）を頂きます！<br><span class="warn">（制作開始 1日目 前金50%、2日目 80%、3日目 100%）</span>',
    'terms.li9': '<span class="hl">VRC アカウント／パスワード</span>をご提供いただき、こちらでアップロードを代行します。',
    'terms.li10': 'ほとんどのプランでは〔完成／未完成〕の作業ファイルは提供しておらず、特別プランのみ提供します！',
    'terms.li11': '<span class="warn">当スタジオが制作したモデルの共有を禁止します。</span>',
    'terms.li12': '当スタジオは以上すべての規約について最終解釈権を有します。',
    'terms.agree': '上記すべての規約を読み、同意します',
    'terms.btnHome': 'ホームへ戻る', 'terms.btnAgree': '同意して見積りを始める →',
    'terms.hint': '👇 規約を最後までスクロールすると同意にチェックできます',

    /* ===== 用詞說明頁 ===== */
    'gl.h': '用語説明',
    'gl.lead': 'ご依頼前にこれらの用語を知っておくと、自分に合ったプランや追加項目を選びやすくなります。',
    'gl.sec1': '各種用語の説明',
    'gl.t.button': 'ボタン',
    'gl.button.on': '<b>オン／オフボタン：</b>衣装・髪色・瞳色・アクセサリーの表示／非表示、その他あらゆるオブジェクトの切り替えができます。',
    'gl.button.dial': '<b>ダイヤルボタン：</b>胸の大きさ、オブジェクトの色、一部の可動範囲などを調整できます。',
    'gl.t.plan': '自訂プラン vs スタイルプラン',
    'gl.plan.custom': '<b>自訂プラン：</b>ボタン数・色替えの有無・顔型調整の有無などを自由に決められます。',
    'gl.plan.style': '<b>スタイルプラン：</b>店主の既定スタイルを選ぶか、好みのスタイル／OC デザイン画をご提供いただきます。',
    'gl.t.nonc': '非対応',
    'gl.nonc.d': '購入した商品があなたのモデルと互換でない場合（例：商品はキャラ B 用だが、あなたはキャラ A を使用）を「非対応／非適合」と呼びます。',
    'gl.t.recolor': '簡易 画像／色替え vs 応用 画像／色替え',
    'gl.recolor.s': '<b>簡易色替え：</b>基本の調整ツールで色・明暗を調整します。',
    'gl.recolor.a': '<b>応用 画像調整：</b>Photoshop などの専門ソフトでテクスチャの細部まで調整します。',
    'gl.t.face': '顔型修正',
    'gl.face.d': '目の大きさ、あご（長さ・幅）、輪郭の丸み・シャープさなど、顔に関わる調整は顔型修正に含まれます。',
    'gl.t.body': '体型修正',
    'gl.body.d': '脚（太もも・ふくらはぎ）の長さ、腰／お尻の幅、頭の大きさなど、体の各部位を調整できます。',
    'gl.t.opt': '最適化',
    'gl.opt.d': 'VRChat で自分も他人も快適に（重くならないように）過ごせるよう、1体につき衣装1つ・髪型1つを推奨します。モデルが大きすぎると他人には表示されないこともあります！',
    'gl.sec2': 'NSFW システム説明',
    'gl.sec2lead': '以下は成人向け機能システムの用語説明です。',
    'gl.sps': 'SPS は柱状オブジェクトを吸着させるシステムで、貫通や不自然な揺れを防ぎます。',
    'gl.spsd': 'SPS-D は挿入する側のオブジェクトです。',
    'gl.pcs': 'PCS は音が出る機能で、例えば手で触れると水音、口では喉の音が鳴ります。',
    'gl.sec3': '保証について',
    'gl.sec3lead': 'どのプランでも保証を追加でき、各プラン最大 6 か月までです。',
    'gl.std': '標準保証',
    'gl.std.term': '<b>期間：</b>納品確認後 7 日以内。',
    'gl.std.scope': '<b>範囲：</b>制作上の不具合（貫通・ウェイト異常・表示バグなど）を無償で修正。',
    'gl.std.note': '<b>注意：</b>見た目・配色は確認段階で承認済みのため、この修正範囲には含まれません。',
    'gl.add': '追加保証',
    'gl.add.1': '<b>優先トラブル対応：</b>アバターの各種不具合に全力で対応します。',
    'gl.add.2': '<b>簡易変更枠：</b>「簡易オブジェクトの交換／削除」を2回まで無償で対応（同価格帯かつプラン総額内に限る）。',
    'gl.add.3': '<b>応用修正サポート：</b>複雑な構造変更は状況に応じて別途お見積り。',
    'gl.over': '保証切れ後の修理',
    'gl.over.d': '⚠️ 保証期間が過ぎても、「保証プランの再購入」でいつでも上記の修理・修正サービスを再開できます。',
    'gl.btnEstimate': '料金見積りへ →',

    /* ===== 團隊介紹頁（結構文字） ===== */
    'tm.h': 'チーム紹介',
    'tm.lead': 'RimoStudio のメンバー、得意分野、作品をご紹介します。',
    'tm.role.owner': '店長', 'tm.role.chief': 'チーフデザイナー', 'tm.role.designer': 'スタイルデザイナー',
    'tm.l.skill': '得意分野', 'tm.l.style': '得意なスタイル', 'tm.l.weak': '苦手', 'tm.l.avoid': '対応不可', 'tm.l.works': '作品',
    'tm.hiring.title': '募集停止中', 'tm.hiring.desc': 'RimoStudio は現在メンバー募集を停止しています。次のお知らせをお待ちください',
    'tm.hiring.label': ' ', 'tm.hiring.apply': '応募方法', 'tm.hiring.btn': 'Discord を見る →',
    'tm.btnEstimate': '料金見積りへ →',
  }
};

(function () {
  var KEY = 'rimo_lang';
  var SUPPORTED = ['zh', 'ja'];
  var orig = {}, origPh = {};

  function detect() {
    try { var s = localStorage.getItem(KEY); if (SUPPORTED.indexOf(s) >= 0) return s; } catch (e) {}
    var n = (navigator.language || '').toLowerCase();
    return n.indexOf('ja') === 0 ? 'ja' : 'zh';
  }

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) < 0) lang = 'zh';
    var ja = (window.I18N && window.I18N.ja) || {};
    document.documentElement.setAttribute('lang', lang === 'ja' ? 'ja' : 'zh-Hant');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (!(k in orig)) orig[k] = el.innerHTML;              // 首次快照中文原文
      el.innerHTML = (lang === 'ja' && ja[k] != null) ? ja[k] : orig[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (!(k in origPh)) origPh[k] = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', (lang === 'ja' && ja[k] != null) ? ja[k] : origPh[k]);
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    window.__rimoLang = lang;
    // 通知動態頁面（如試算頁）重繪 JS 產生的文字
    document.dispatchEvent(new CustomEvent('rimo:lang', { detail: lang }));
  }

  function init() {
    apply(detect());
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-lang-btn')); });
    });
  }

  window.RimoI18n = { apply: apply, detect: detect };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
