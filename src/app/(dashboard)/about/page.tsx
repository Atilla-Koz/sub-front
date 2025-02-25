"use client";

import { FiUsers, FiTarget, FiAward, FiHeart, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import Link from "next/link";

export default function AboutPage() {
  // Takım üyeleri
  const teamMembers = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      role: "Kurucu & CEO",
      bio: "Ahmet, 10 yılı aşkın yazılım geliştirme deneyimine sahip bir girişimci. Abonelik Takip'i kendi aboneliklerini yönetmekte zorlandığı için geliştirmeye başladı.",
      image: "/team/ahmet.jpg", // Gerçek resimler eklenecek
      social: {
        twitter: "https://twitter.com/ahmetyilmaz",
        linkedin: "https://linkedin.com/in/ahmetyilmaz",
        github: "https://github.com/ahmetyilmaz"
      }
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      role: "Ürün Tasarımcısı",
      bio: "Ayşe, kullanıcı deneyimi ve arayüz tasarımı konusunda uzman. Abonelik Takip'in kullanıcı dostu arayüzünün arkasındaki yaratıcı beyin.",
      image: "/team/ayse.jpg", // Gerçek resimler eklenecek
      social: {
        twitter: "https://twitter.com/aysekaya",
        linkedin: "https://linkedin.com/in/aysekaya",
        github: "https://github.com/aysekaya"
      }
    },
    {
      id: 3,
      name: "Mehmet Demir",
      role: "Yazılım Geliştirici",
      bio: "Mehmet, modern web teknolojileri konusunda uzmanlaşmış bir full-stack geliştirici. Abonelik Takip'in teknik altyapısını geliştiriyor.",
      image: "/team/mehmet.jpg", // Gerçek resimler eklenecek
      social: {
        twitter: "https://twitter.com/mehmetdemir",
        linkedin: "https://linkedin.com/in/mehmetdemir",
        github: "https://github.com/mehmetdemir"
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Hakkımızda</h1>
      
      {/* Hikayemiz */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Hikayemiz</h2>
        
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            Abonelik Takip, 2023 yılında dijital ve fiziksel aboneliklerin sayısının artmasıyla birlikte, insanların aboneliklerini takip etmekte zorlandığını fark eden bir grup yazılım geliştiricisi tarafından kuruldu.
          </p>
          <p className="mb-4">
            Kurucu ekibimiz, kendi hayatlarında da birçok aboneliğe sahipti ve bunları takip etmek, ne zaman yenileneceğini hatırlamak ve toplam maliyeti görmek giderek zorlaşıyordu. Bu sorunu çözmek için Abonelik Takip&apos;i geliştirdik.
          </p>
          <p>
            Misyonumuz, kullanıcıların tüm aboneliklerini tek bir yerden kolayca yönetmelerini, gereksiz harcamaları azaltmalarını ve bütçelerini daha iyi kontrol etmelerini sağlamaktır. Vizyonumuz ise, abonelik ekonomisinde tüketicilerin en güvenilir yardımcısı olmaktır.
          </p>
        </div>
      </div>
      
      {/* Değerlerimiz */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Değerlerimiz</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-4">
              <FiUsers className="text-blue-600 h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Kullanıcı Odaklılık</h3>
            </div>
            <p className="text-gray-600">
              Her kararımızda kullanıcılarımızın ihtiyaçlarını ve deneyimlerini ön planda tutuyoruz.
            </p>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-4">
              <FiTarget className="text-blue-600 h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Basitlik</h3>
            </div>
            <p className="text-gray-600">
              Karmaşık sorunları basit ve anlaşılır çözümlerle ele alıyoruz.
            </p>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-4">
              <FiAward className="text-blue-600 h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Kalite</h3>
            </div>
            <p className="text-gray-600">
              Her özelliği en yüksek kalite standartlarında geliştirmeye özen gösteriyoruz.
            </p>
          </div>
        </div>
      </div>
      
      {/* Ekibimiz */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ekibimiz</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <span className="text-gray-500 text-2xl">{member.name.charAt(0)}</span>
                </div>
                {/* Gerçek resimler eklendiğinde aşağıdaki kodu kullanabilirsiniz */}
                {/* <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover"
                /> */}
              </div>
              
              <h3 className="text-lg font-medium text-gray-800">{member.name}</h3>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
              
              <div className="flex justify-center space-x-3">
                {member.social.github && (
                  <a 
                    href={member.social.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <FiGithub />
                  </a>
                )}
                {member.social.twitter && (
                  <a 
                    href={member.social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <FiTwitter />
                  </a>
                )}
                {member.social.linkedin && (
                  <a 
                    href={member.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <FiLinkedin />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* İletişim ve Bağlantılar */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bize Ulaşın</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 mb-4">
              Sorularınız, önerileriniz veya iş birliği teklifleriniz için bizimle iletişime geçebilirsiniz.
            </p>
            
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>E-posta:</strong>{" "}
                <a href="mailto:info@abonelik-takip.com" className="text-blue-600 hover:text-blue-800">
                  info@abonelik-takip.com
                </a>
              </p>
              
              <p className="text-gray-600">
                <strong>Adres:</strong> İstanbul, Türkiye
              </p>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <a 
                href="https://twitter.com/aboneliktakip" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                <FiTwitter />
              </a>
              <a 
                href="https://linkedin.com/company/aboneliktakip" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                <FiLinkedin />
              </a>
              <a 
                href="https://github.com/aboneliktakip" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                <FiGithub />
              </a>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <FiHeart className="text-red-500 h-5 w-5 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">Bizi Destekleyin</h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              Abonelik Takip, açık kaynaklı bir projedir ve geliştirilmesine katkıda bulunabilirsiniz.
            </p>
            
            <div className="space-y-4">
              <Link href="/help" className="text-blue-600 hover:text-blue-800 block">
                Geri Bildirim Gönderin
              </Link>
              
              <a 
                href="https://github.com/aboneliktakip" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 block"
              >
                GitHub&apos;da Projeye Katkıda Bulunun
              </a>
              
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 block"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Bağış özelliği yakında eklenecektir.");
                }}
              >
                Projeyi Bağışla Destekleyin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 