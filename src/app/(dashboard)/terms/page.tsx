"use client";

import { FiFileText, FiInfo, FiShield, FiCreditCard, FiAlertTriangle, FiMessageSquare } from "react-icons/fi";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Kullanım Koşulları</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiFileText className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Kullanım Koşullarımız</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Son güncelleme: 1 Haziran 2023
          </p>
          
          <p className="mb-4">
            Abonelik Takip web sitesini ve hizmetlerini kullanarak, bu Kullanım Koşulları&apos;nı kabul etmiş olursunuz. Lütfen bu koşulları dikkatlice okuyun.
          </p>
          
          <p className="mb-4">
            Bu Kullanım Koşulları, Abonelik Takip (&quot;biz&quot;, &quot;bizim&quot; veya &quot;şirketimiz&quot;) ile web sitemizi ve hizmetlerimizi kullanan kişiler (&quot;siz&quot;, &quot;kullanıcı&quot;) arasındaki anlaşmayı düzenler.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiInfo className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Hizmet Tanımı</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Abonelik Takip, kullanıcıların dijital ve fiziksel aboneliklerini takip etmelerine, yönetmelerine ve analiz etmelerine olanak sağlayan bir web uygulamasıdır. Hizmetlerimiz şunları içerir:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Abonelik bilgilerinin kaydedilmesi ve yönetilmesi</li>
            <li>Abonelik yenileme tarihlerinin takibi</li>
            <li>Abonelik harcamalarının analizi</li>
            <li>Yaklaşan ödemeler için bildirimler</li>
            <li>Abonelik kategorilerine göre raporlama</li>
          </ul>
          
          <p className="mb-4">
            Hizmetlerimizin bazı özellikleri ücretsiz olarak sunulurken, bazı gelişmiş özellikler ücretli abonelik gerektirebilir.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiShield className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Hesap Oluşturma ve Güvenlik</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Hizmetlerimizi kullanabilmek için bir hesap oluşturmanız gerekir. Hesap oluştururken doğru, güncel ve eksiksiz bilgiler sağlamakla yükümlüsünüz.
          </p>
          
          <p className="mb-4">
            Hesap güvenliğinizden siz sorumlusunuz. Şifrenizi gizli tutmalı ve hesabınızla ilgili herhangi bir yetkisiz erişimi bize bildirmelisiniz.
          </p>
          
          <p className="mb-4">
            Aşağıdaki durumlarda hesabınızı askıya alabilir veya sonlandırabiliriz:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Bu Kullanım Koşulları&apos;nı ihlal etmeniz</li>
            <li>Yanlış veya yanıltıcı bilgiler sağlamanız</li>
            <li>Hizmetlerimizi kötüye kullanmanız</li>
            <li>Uzun süre hesabınızı kullanmamanız</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiCreditCard className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Ödeme ve Abonelikler</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Ücretli özellikleri kullanmak için geçerli bir ödeme yöntemi sağlamanız gerekir. Tüm ücretler, aksi belirtilmedikçe Türk Lirası (TRY) cinsindendir ve vergiler dahildir.
          </p>
          
          <p className="mb-4">
            Abonelikler, iptal edilmediği sürece otomatik olarak yenilenir. Aboneliğinizi istediğiniz zaman hesap ayarlarınızdan iptal edebilirsiniz. İptal işlemi, mevcut fatura döneminin sonunda geçerli olur.
          </p>
          
          <p className="mb-4">
            Fiyatlarımızı değiştirme hakkını saklı tutarız. Fiyat değişiklikleri olması durumunda, size en az 30 gün önceden bildirim yapacağız.
          </p>
          
          <p className="mb-4">
            İade politikamız: Aboneliğinizi satın aldıktan sonraki 14 gün içinde iptal ederseniz, tam iade alabilirsiniz. 14 günden sonra yapılan iptallerde iade yapılmaz.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiAlertTriangle className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Kullanım Kısıtlamaları</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Hizmetlerimizi kullanırken aşağıdaki eylemleri gerçekleştirmemeyi kabul edersiniz:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Yasalara aykırı içerik oluşturmak veya paylaşmak</li>
            <li>Başkalarının fikri mülkiyet haklarını ihlal etmek</li>
            <li>Virüs veya zararlı kod yaymak</li>
            <li>Hizmetlerimize zarar verecek şekilde kullanmak</li>
            <li>Hizmetlerimize yetkisiz erişim sağlamaya çalışmak</li>
            <li>Diğer kullanıcıları taciz etmek veya tehdit etmek</li>
            <li>Hizmetlerimizi otomatik araçlarla kullanmak (API kullanımı hariç)</li>
          </ul>
          
          <p className="mb-4">
            Bu kısıtlamaları ihlal etmeniz durumunda, hesabınızı askıya alabilir veya sonlandırabiliriz.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <div className="flex items-center mb-6">
          <FiMessageSquare className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">İçerik ve Fikri Mülkiyet</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Abonelik Takip&apos;in tüm içeriği, logoları, tasarımları, yazılımı ve diğer materyalleri bizim fikri mülkiyetimizdir ve telif hakkı, ticari marka ve diğer fikri mülkiyet yasaları tarafından korunmaktadır.
          </p>
          
          <p className="mb-4">
            Hesabınıza eklediğiniz içerikler (abonelik bilgileri vb.) sizin mülkiyetinizde kalır. Ancak, bu içerikleri hizmetlerimizi sağlamak ve geliştirmek için kullanma hakkına sahip olduğumuzu kabul edersiniz.
          </p>
          
          <p className="mb-4">
            Hizmetlerimizi kullanarak oluşturduğunuz veya paylaştığınız içeriklerin yasal olduğunu ve başkalarının haklarını ihlal etmediğini garanti edersiniz.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex items-center mb-6">
          <FiInfo className="text-blue-600 h-6 w-6 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Genel Hükümler</h2>
        </div>
        
        <div className="prose max-w-none text-gray-600">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Sorumluluk Reddi</h3>
          <p className="mb-4">
            Hizmetlerimiz &quot;olduğu gibi&quot; ve &quot;mevcut olduğu şekilde&quot; sunulmaktadır. Hizmetlerimizin kesintisiz, hatasız veya güvenli olacağını garanti etmiyoruz.
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mb-3">Değişiklikler</h3>
          <p className="mb-4">
            Bu Kullanım Koşulları&apos;nı zaman zaman güncelleyebiliriz. Önemli değişiklikler olması durumunda, size e-posta göndererek veya hizmetlerimizde bir bildirim yayınlayarak haber vereceğiz.
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mb-3">İletişim</h3>
          <p className="mb-4">
            Bu Kullanım Koşulları hakkında sorularınız veya endişeleriniz varsa, lütfen bizimle iletişime geçin:
          </p>
          
          <p className="mb-4">
            <strong>E-posta:</strong> <a href="mailto:terms@abonelik-takip.com" className="text-blue-600 hover:text-blue-800">terms@abonelik-takip.com</a>
          </p>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-6">
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
              Gizlilik Politikası
            </Link>
            
            <Link href="/help" className="text-blue-600 hover:text-blue-800">
              Yardım ve Destek
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 