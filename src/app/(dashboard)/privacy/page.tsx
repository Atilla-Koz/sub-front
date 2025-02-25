"use client";

import { FiShield, FiInfo, FiLock, FiEye, FiTrash2, FiAlertCircle } from "react-icons/fi";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Gizlilik Politikası</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiShield className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Gizlilik Politikamız</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Son güncelleme: 1 Haziran 2023
          </p>
          
          <p className="mb-4">
            Abonelik Takip (&quot;biz&quot;, &quot;bizim&quot; veya &quot;şirketimiz&quot;) olarak, gizliliğinize saygı duyuyoruz ve kişisel verilerinizin korunmasını önemsiyoruz. Bu Gizlilik Politikası, hizmetlerimizi kullanırken toplanan, işlenen ve saklanan kişisel verilerinizle ilgili uygulamalarımızı açıklamaktadır.
          </p>
          
          <p className="mb-4">
            Hizmetlerimizi kullanarak, bu politikada belirtilen uygulamaları kabul etmiş olursunuz. Lütfen bu politikayı dikkatlice okuyun.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiInfo className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Topladığımız Bilgiler</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Kişisel Bilgiler</h3>
          <p className="mb-4">
            Hizmetlerimizi kullanabilmeniz için aşağıdaki kişisel bilgileri toplayabiliriz:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Ad ve soyadı</li>
            <li>E-posta adresi</li>
            <li>Şifre (güvenli bir şekilde şifrelenir)</li>
            <li>Profil bilgileri (isteğe bağlı)</li>
          </ul>
          
          <h3 className="text-lg font-medium text-gray-800 mb-3">Abonelik Bilgileri</h3>
          <p className="mb-4">
            Aboneliklerinizi yönetebilmeniz için aşağıdaki bilgileri toplayabiliriz:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Abonelik adları</li>
            <li>Abonelik fiyatları</li>
            <li>Fatura döngüleri</li>
            <li>Yenileme tarihleri</li>
            <li>Kategori bilgileri</li>
          </ul>
          
          <h3 className="text-lg font-medium text-gray-800 mb-3">Otomatik Olarak Toplanan Bilgiler</h3>
          <p className="mb-4">
            Hizmetlerimizi kullanırken, aşağıdaki bilgileri otomatik olarak toplayabiliriz:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>IP adresi</li>
            <li>Tarayıcı türü ve versiyonu</li>
            <li>Cihaz bilgileri</li>
            <li>Kullanım istatistikleri</li>
            <li>Çerezler ve benzer teknolojiler aracılığıyla toplanan bilgiler</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiLock className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Bilgilerin Kullanımı</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Topladığımız bilgileri aşağıdaki amaçlar için kullanabiliriz:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Hesabınızı oluşturmak ve yönetmek</li>
            <li>Aboneliklerinizi takip etmenizi sağlamak</li>
            <li>Size bildirimler göndermek (yaklaşan yenileme tarihleri vb.)</li>
            <li>Hizmetlerimizi iyileştirmek ve geliştirmek</li>
            <li>Teknik sorunları çözmek</li>
            <li>Güvenlik önlemleri uygulamak</li>
            <li>Yasal yükümlülüklere uymak</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiEye className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Bilgilerin Paylaşımı</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Kişisel bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmayız:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Açık izniniz olduğunda</li>
            <li>Hizmet sağlayıcılarımızla (veri depolama, analiz vb.)</li>
            <li>Yasal bir yükümlülüğümüz olduğunda (mahkeme kararı vb.)</li>
            <li>Şirketimizin satılması veya birleşmesi durumunda</li>
          </ul>
          
          <p className="mb-4">
            Hizmet sağlayıcılarımızla paylaşılan bilgiler, bu Gizlilik Politikası&apos;na uygun olarak işlenir ve sadece belirtilen amaçlar için kullanılır.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiTrash2 className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Veri Saklama ve Silme</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Kişisel verilerinizi, hizmetlerimizi sağlamak için gerekli olduğu sürece saklarız. Hesabınızı sildiğinizde, kişisel verileriniz ve abonelik bilgileriniz sistemlerimizden kalıcı olarak silinir (yasal yükümlülüklerimiz gereği saklanması gereken bilgiler hariç).
          </p>
          
          <p className="mb-4">
            Hesabınızı silmek için Profil sayfasındaki &quot;Hesabımı Sil&quot; seçeneğini kullanabilirsiniz.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiAlertCircle className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Haklarınız</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Verilerinize erişim hakkı</li>
            <li>Verilerinizi düzeltme hakkı</li>
            <li>Verilerinizin silinmesini talep etme hakkı</li>
            <li>Veri işlemeyi kısıtlama hakkı</li>
            <li>Veri taşınabilirliği hakkı</li>
            <li>İtiraz etme hakkı</li>
          </ul>
          
          <p className="mb-4">
            Bu haklarınızı kullanmak için <a href="mailto:privacy@abonelik-takip.com" className="text-blue-600 hover:text-blue-800">privacy@abonelik-takip.com</a> adresine e-posta gönderebilirsiniz.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex items-center mb-6">
          <FiInfo className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Değişiklikler ve İletişim</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Gizlilik Politikası Değişiklikleri</h3>
          <p className="mb-4">
            Bu Gizlilik Politikası&apos;nı zaman zaman güncelleyebiliriz. Önemli değişiklikler olması durumunda, size e-posta göndererek veya hizmetlerimizde bir bildirim yayınlayarak haber vereceğiz.
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mb-3">İletişim</h3>
          <p className="mb-4">
            Bu Gizlilik Politikası hakkında sorularınız veya endişeleriniz varsa, lütfen bizimle iletişime geçin:
          </p>
          
          <p className="mb-4">
            <strong>E-posta:</strong> <a href="mailto:privacy@abonelik-takip.com" className="text-blue-600 hover:text-blue-800">privacy@abonelik-takip.com</a>
          </p>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link href="/help" className="text-blue-600 hover:text-blue-800">
              Yardım ve Destek Sayfasına Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 