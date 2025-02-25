"use client";

import { useState } from "react";
import { FiHelpCircle, FiMessageSquare, FiChevronDown, FiChevronUp, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

// SSS verileri
const faqData = [
  {
    id: 1,
    question: "Abonelik Takip uygulaması nedir?",
    answer: "Abonelik Takip, tüm dijital ve fiziksel aboneliklerinizi tek bir yerden yönetmenize, takip etmenize ve analiz etmenize olanak sağlayan bir web uygulamasıdır. Aylık ve yıllık harcamalarınızı görselleştirmenize, yaklaşan ödemeleri takip etmenize ve abonelik bütçenizi kontrol altında tutmanıza yardımcı olur."
  },
  {
    id: 2,
    question: "Aboneliklerimi nasıl ekleyebilirim?",
    answer: "Aboneliklerinizi eklemek için, Dashboard sayfasındaki 'Abonelik Ekle' butonuna tıklayın. Açılan formda abonelik adı, fiyatı, fatura döngüsü, kategori ve diğer bilgileri girin. Tüm zorunlu alanları doldurduktan sonra 'Aboneliği Ekle' butonuna tıklayarak aboneliğinizi kaydedebilirsiniz."
  },
  {
    id: 3,
    question: "Abonelik bildirimlerini nasıl ayarlayabilirim?",
    answer: "Bildirim ayarlarınızı Profil sayfasından yapabilirsiniz. 'Bildirim Ayarları' bölümünde, fatura tarihinden kaç gün önce bildirim almak istediğinizi seçebilir ve e-posta veya tarayıcı bildirimleri gibi bildirim türlerini etkinleştirebilirsiniz."
  },
  {
    id: 4,
    question: "Aboneliklerimi kategorilere göre nasıl filtreleyebilirim?",
    answer: "Dashboard ve Analiz sayfalarında, aboneliklerinizi kategorilere göre filtrelemek için kategori seçeneklerini kullanabilirsiniz. Bu, belirli kategorilerdeki harcamalarınızı daha kolay görmenizi sağlar."
  },
  {
    id: 5,
    question: "Abonelik verilerimi dışa aktarabilir miyim?",
    answer: "Evet, Ayarlar sayfasındaki 'Veri Yönetimi' bölümünden tüm abonelik verilerinizi CSV formatında indirebilirsiniz. Bu, verilerinizi başka uygulamalarda kullanmanıza veya yedeklemenize olanak tanır."
  },
  {
    id: 6,
    question: "Şifremi unuttum, ne yapmalıyım?",
    answer: "Giriş sayfasındaki 'Şifremi Unuttum' bağlantısına tıklayarak şifre sıfırlama sürecini başlatabilirsiniz. Kayıtlı e-posta adresinize bir sıfırlama bağlantısı gönderilecektir. Bu bağlantıyı takip ederek yeni bir şifre oluşturabilirsiniz."
  },
  {
    id: 7,
    question: "Abonelik Takip uygulaması ücretsiz mi?",
    answer: "Evet, Abonelik Takip uygulamasının temel özellikleri ücretsizdir. İlerleyen dönemlerde, daha gelişmiş özellikler ve analitik araçlar içeren premium bir plan sunmayı planlıyoruz."
  },
  {
    id: 8,
    question: "Hesabımı nasıl silebilirim?",
    answer: "Hesabınızı silmek için Profil sayfasının alt kısmındaki 'Hesabımı Sil' butonunu kullanabilirsiniz. Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinir."
  }
];

// FAQ bileşeni
const FAQItem = ({ question, answer, isOpen, toggleOpen }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  toggleOpen: () => void 
}) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-800 focus:outline-none"
        onClick={toggleOpen}
      >
        <span>{question}</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function HelpPage() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Gerçek API'ye bağlanacak şekilde güncellenecek
      // Şimdilik sadece simüle ediyoruz
      console.log("İletişim formu gönderiliyor:", contactForm);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("İletişim formu gönderilirken hata:", error);
      toast.error("Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SSS filtreleme
  const filteredFaqs = searchQuery.trim() === "" 
    ? faqData 
    : faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Yardım ve Destek</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Sık Sorulan Sorular */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center mb-6">
              <FiHelpCircle className="text-blue-600 h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Sık Sorulan Sorular</h2>
            </div>
            
            {/* Arama */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="SSS içinde ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input w-full"
              />
            </div>
            
            {/* SSS Listesi */}
            <div className="space-y-2">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map(faq => (
                  <FAQItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaqId === faq.id}
                    toggleOpen={() => toggleFaq(faq.id)}
                  />
                ))
              ) : (
                <p className="text-gray-600 py-4">Aramanızla eşleşen soru bulunamadı.</p>
              )}
            </div>
          </div>

          {/* İletişim Formu */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex items-center mb-6">
              <FiMessageSquare className="text-blue-600 h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Bize Ulaşın</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Sorularınız veya geri bildirimleriniz için aşağıdaki formu doldurabilirsiniz. En kısa sürede size dönüş yapacağız.
            </p>
            
            <form onSubmit={handleContactFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* İsim */}
                <div>
                  <label htmlFor="name" className="form-label">
                    İsim <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={handleContactFormChange}
                    className="form-input"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                
                {/* E-posta */}
                <div>
                  <label htmlFor="email" className="form-label">
                    E-posta <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={handleContactFormChange}
                    className="form-input"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>
              
              {/* Konu */}
              <div>
                <label htmlFor="subject" className="form-label">
                  Konu <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={contactForm.subject}
                  onChange={handleContactFormChange}
                  className="form-input"
                >
                  <option value="">Konu Seçin</option>
                  <option value="Teknik Destek">Teknik Destek</option>
                  <option value="Özellik İsteği">Özellik İsteği</option>
                  <option value="Hata Bildirimi">Hata Bildirimi</option>
                  <option value="Fatura ve Ödeme">Fatura ve Ödeme</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              
              {/* Mesaj */}
              <div>
                <label htmlFor="message" className="form-label">
                  Mesaj <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={contactForm.message}
                  onChange={handleContactFormChange}
                  rows={5}
                  className="form-input"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center"
                >
                  {isSubmitting ? (
                    "Gönderiliyor..."
                  ) : (
                    <>
                      <FiSend className="mr-2" /> Mesajı Gönder
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Yan Bilgi Paneli */}
        <div className="md:col-span-1">
          {/* İletişim Bilgileri */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">İletişim Bilgileri</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">E-posta</h3>
                <a 
                  href="mailto:destek@abonelik-takip.com" 
                  className="text-blue-600 hover:text-blue-800"
                >
                  destek@abonelik-takip.com
                </a>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Yanıt Süresi</h3>
                <p className="text-gray-700">24-48 saat içinde</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Çalışma Saatleri</h3>
                <p className="text-gray-700">Pazartesi - Cuma: 09:00 - 18:00</p>
              </div>
            </div>
          </div>
          
          {/* Hızlı Yardım Bağlantıları */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Hızlı Yardım</h2>
            
            <div className="space-y-3">
              <a 
                href="#" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFaqId(1);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }}
              >
                Abonelik Takip nedir?
              </a>
              
              <a 
                href="#" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFaqId(2);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }}
              >
                Abonelik ekleme
              </a>
              
              <a 
                href="#" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFaqId(3);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }}
              >
                Bildirim ayarları
              </a>
              
              <a 
                href="#" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFaqId(6);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }}
              >
                Şifremi unuttum
              </a>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Daha fazla yardım için <a href="#" className="text-blue-600 hover:text-blue-800">kullanım kılavuzumuzu</a> inceleyebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 