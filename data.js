// MISP Haber - Ortak veri yönetimi
// Tüm haberler localStorage'da tutulur; admin paneli yazar, ana site okur.

(function () {
  const STORAGE_KEY = "misp_haber_news_v2";

  const CATEGORIES = [
    { id: "gundem",  name: "Gündem",  color: "#c8102e" },
    { id: "turkiye", name: "Türkiye", color: "#1f4b8a" },
    { id: "kktc",    name: "KKTC",    color: "#0b7a3b" },
    { id: "dunya",   name: "Dünya",   color: "#2a6fdb" },
    { id: "ekonomi", name: "Ekonomi", color: "#a33089" },
  ];

  // v1 -> v2 migrasyonu: eski kategorileri yenilerle eşle
  const CAT_MIGRATE = {
    politika: "gundem",
    spor: "gundem",
    magazin: "gundem",
    saglik: "gundem",
    teknoloji: "ekonomi",
    kultur: "gundem",
  };
  try {
    const oldRaw = localStorage.getItem("misp_haber_news_v1");
    if (oldRaw && !localStorage.getItem("misp_haber_news_v2")) {
      const oldList = JSON.parse(oldRaw);
      if (Array.isArray(oldList)) {
        const migrated = oldList.map(n => ({
          ...n,
          category: CAT_MIGRATE[n.category] || n.category,
        }));
        localStorage.setItem("misp_haber_news_v2", JSON.stringify(migrated));
      }
    }
    localStorage.removeItem("misp_haber_news_v1");
  } catch (e) {}

  // Başlangıç (örnek) haberleri — admin panelinden silinebilir

  const SEED = [
    {
      id: "n-1001",
      title: "Merkez Bankası faiz kararını açıkladı: Piyasalar nasıl tepki verdi?",
      summary: "Merkez Bankası Para Politikası Kurulu yıl sonu beklentilerini de etkileyecek kararını duyurdu. Ekonomistler ne diyor?",
      content: "Merkez Bankası bugün yaptığı toplantıda politika faizini değerlendirdi. Karara ilişkin yapılan açıklamada, enflasyonla mücadelede kararlılığın süreceği vurgulandı.\n\nPiyasa aktörleri kararın ardından ilk tepkilerini verdi. Borsa endeksi gün içinde dalgalı bir seyir izlerken döviz kurlarında sınırlı hareket gözlendi.\n\nEkonomistler, önümüzdeki üç ayın enflasyon görünümü için kritik olacağını belirtiyor. Beklentilerin yönetimi açısından sözlü yönlendirmenin etkili olduğu ifade ediliyor.",
      category: "ekonomi",
      author: "Ekonomi Servisi",
      image: "",
      featured: true,
      published: Date.now() - 1000 * 60 * 35,
    },
    {
      id: "n-1002",
      title: "Yeni eğitim yılında müfredat değişiklikleri: Veliler ne bilmeli?",
      summary: "Milli Eğitim Bakanlığı'nın açıkladığı yeni müfredatla birlikte ders saatleri ve içerik düzenlemeleri başlıyor.",
      content: "Eğitim öğretim yılı yaklaşırken müfredattaki değişiklikler tartışılmaya devam ediyor. Bakanlık yetkilileri yeni dönemde dijital okuryazarlık derslerinin ağırlığının artacağını söylüyor.\n\nVelilere yönelik hazırlanan rehber, okul-aile işbirliğini güçlendirmeyi amaçlıyor. Öğretmenler de hizmet içi eğitim programlarına alınıyor.",
      category: "turkiye",
      author: "Türkiye Servisi",
      image: "",
      featured: true,
      published: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: "n-1003",
      title: "KKTC'de turizm sezonu rekor doluluk oranıyla açıldı",
      summary: "Otelcilik sektörü temsilcileri sezonun ilk ayında doluluk oranlarının yüzde 90'ı geçtiğini açıkladı.",
      content: "KKTC'de turizm sektörü beklentilerin üzerinde bir performansla sezona başladı. Sektör temsilcileri, yabancı ziyaretçi sayısında belirgin bir artış olduğunu vurguladı.\n\nUlusal havayolu şirketleri de sefer sayılarını artırdı. Otelcilik birliği, yaz aylarında doluluk oranlarının daha da yükseleceğini öngörüyor.",
      category: "kktc",
      author: "KKTC Servisi",
      image: "",
      featured: true,
      published: Date.now() - 1000 * 60 * 60 * 4,
    },
    {
      id: "n-1004",
      title: "Yapay zekâ destekli yeni telefon modeli tanıtıldı",
      summary: "Cihaz, görüntü işleme ve dil modeli özellikleriyle dikkat çekiyor. Türkiye satış tarihi de belli oldu.",
      content: "Teknoloji devinin yeni amiral gemisi cihazı, görsel arama ve gerçek zamanlı çeviri özellikleriyle gündeme oturdu. Cihaz, üç farklı renk seçeneğiyle satışa sunulacak.\n\nFiyatlama ülkeye göre değişiklik gösterecek. Türkiye'deki ön satışların önümüzdeki ay başlaması bekleniyor.",
      category: "ekonomi",
      author: "Teknoloji Masası",
      image: "",
      featured: false,
      published: Date.now() - 1000 * 60 * 60 * 6,
    },
    {
      id: "n-1005",
      title: "Akdeniz'de yaz turizmi rekoru: Doluluk oranları yüzde 95'i geçti",
      summary: "Tatil bölgelerinde otel doluluk oranları beklentilerin üzerine çıktı. Sektör temsilcileri memnuniyetlerini dile getirdi.",
      content: "Yaz sezonu boyunca süren yoğunluk, sektör temsilcilerinin yüzünü güldürdü. Yabancı turist sayısındaki artışın yanı sıra iç turizmde de hareketlilik gözleniyor.\n\nUlaşım sektörü de bu yoğunluktan payını alıyor. Havalimanlarındaki yolcu trafiğinin geçen yıla göre belirgin biçimde arttığı bildiriliyor.",
      category: "turkiye",
      author: "Şehir Servisi",
      image: "",
      featured: false,
      published: Date.now() - 1000 * 60 * 60 * 8,
    },
    {
      id: "n-1006",
      title: "Sağlık uzmanlarından mevsim geçişi uyarısı",
      summary: "Doktorlar, mevsim geçişlerinde alınması gereken önlemleri ve beslenme önerilerini paylaştı.",
      content: "Mevsim geçişleriyle birlikte üst solunum yolu enfeksiyonlarında artış gözleniyor. Uzmanlar bol sıvı tüketimi ve düzenli uyku öneriyor.\n\nÇocuklar ve yaşlılar için ayrıca dikkat edilmesi gereken hususlar bulunuyor. Aşı takvimine uyulması da önemle vurgulanıyor.",
      category: "gundem",
      author: "Sağlık Masası",
      image: "",
      featured: false,
      published: Date.now() - 1000 * 60 * 60 * 12,
    },
    {
      id: "n-1007",
      title: "Sinema dünyasında yeni dönem: Festival programı açıklandı",
      summary: "Uluslararası film festivalinin bu yılki programı belli oldu. Açılış filmi de duyuruldu.",
      content: "Festivalin bu yılki kapsamı genişletildi. Yarışmalı bölüme katılacak filmler de açıklandı.\n\nYönetmen sohbetleri ve atölye çalışmaları da program kapsamında olacak. Biletler önümüzdeki hafta satışa çıkıyor.",
      category: "gundem",
      author: "Kültür Masası",
      image: "",
      featured: false,
      published: Date.now() - 1000 * 60 * 60 * 18,
    },
    {
      id: "n-1008",
      title: "Avrupa Parlamentosu kritik oylama için toplanıyor",
      summary: "Gündemdeki yasa tasarısı tartışmalara neden olurken üye ülkelerin tutumu da merak ediliyor.",
      content: "Avrupa Parlamentosu önümüzdeki hafta yapacağı oturumda kritik bir oylama gerçekleştirecek. Tasarı, üye ülkeler arasında farklı görüşlere yol açıyor.\n\nDiplomatik kaynaklara göre son haftada yoğun bir mekik diplomasisi yürütüldü.",
      category: "dunya",
      author: "Dünya Servisi",
      image: "",
      featured: false,
      published: Date.now() - 1000 * 60 * 60 * 22,
    },
    {
      id: "n-1009",
      title: "Ünlü oyuncu yeni dizisinin setinden ilk kareleri paylaştı",
      summary: "Heyecanla beklenen yapımın çekimleri başladı. Dizinin yayın tarihi de yakında belli olacak.",
      content: "Sevilen oyuncu sosyal medya hesabından setteki ilk karelerini paylaştı. Paylaşım kısa sürede binlerce beğeni aldı.\n\nYapımcı şirket, dizinin ilk bölümünün yeni sezonda yayınlanacağını duyurdu.",
      category: "gundem",
      author: "Magazin Masası",
      image: "",
      featured: false,
      published: Date.now() - 1000 * 60 * 60 * 30,
    },
  ];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
        return SEED.slice();
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return SEED.slice();
      return parsed;
    } catch (e) {
      return SEED.slice();
    }
  }

  function save(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    // Aynı sekmedeki diğer dinleyiciler için event
    window.dispatchEvent(new CustomEvent("misp:news-updated"));
  }

  function all() {
    return load().sort((a, b) => b.published - a.published);
  }

  function byId(id) {
    return load().find((n) => n.id === id) || null;
  }

  function byCategory(catId) {
    return all().filter((n) => n.category === catId);
  }

  function featured() {
    return all().filter((n) => n.featured).slice(0, 6);
  }

  function add(news) {
    const list = load();
    const item = Object.assign(
      {
        id: "n-" + Date.now(),
        published: Date.now(),
        image: "",
        featured: false,
      },
      news
    );
    list.unshift(item);
    save(list);
    return item;
  }

  function update(id, patch) {
    const list = load();
    const idx = list.findIndex((n) => n.id === id);
    if (idx === -1) return null;
    list[idx] = Object.assign({}, list[idx], patch);
    save(list);
    return list[idx];
  }

  function remove(id) {
    const list = load().filter((n) => n.id !== id);
    save(list);
  }

  function resetSeed() {
    localStorage.removeItem(STORAGE_KEY);
    return load();
  }

  function categoryById(id) {
    return CATEGORIES.find((c) => c.id === id) || { name: id, color: "#444" };
  }

  function timeAgo(ts) {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return "az önce";
    if (m < 60) return m + " dakika önce";
    const h = Math.floor(m / 60);
    if (h < 24) return h + " saat önce";
    const d = Math.floor(h / 24);
    if (d < 7) return d + " gün önce";
    return new Date(ts).toLocaleDateString("tr-TR");
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Storage event — başka sekmede güncelleme olursa
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      window.dispatchEvent(new CustomEvent("misp:news-updated"));
    }
  });

  window.MISP = {
    CATEGORIES,
    all,
    byId,
    byCategory,
    featured,
    add,
    update,
    remove,
    resetSeed,
    categoryById,
    timeAgo,
    formatDate,
  };
})();
