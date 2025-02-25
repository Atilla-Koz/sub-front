import Image from "next/image";
import Link from "next/link";
import { FiCreditCard, FiBarChart2, FiBell, FiCheckCircle } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">Subscription Tracker</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="btn-outline">
              Giriş Yap
            </Link>
            <Link href="/register" className="btn-primary">
              Üye Ol
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Aboneliklerinizi Kolayca Yönetin</h2>
              <p className="text-xl mb-8">
                Dijital aboneliklerinizi takip edin, ödeme tarihlerini hatırlayın ve gereksiz harcamalardan kurtulun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors text-center">
                  Hemen Başlayın
                </Link>
                <Link href="#features" className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-md transition-colors text-center">
                  Özellikler
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image 
                src="/hero-image.svg" 
                alt="Subscription Management" 
                width={500} 
                height={400}
                className="max-w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Neler Sunuyoruz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FiCreditCard className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Abonelik Takibi</h3>
              <p className="text-gray-600">
                Tüm dijital aboneliklerinizi tek bir yerden takip edin ve ödeme tarihlerini kaçırmayın.
              </p>
            </div>
            <div className="card flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FiBarChart2 className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Harcama Analizi</h3>
              <p className="text-gray-600">
                Abonelik harcamalarınızı analiz edin ve bütçenizi daha iyi yönetin.
              </p>
            </div>
            <div className="card flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <FiBell className="text-yellow-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Akıllı Hatırlatıcılar</h3>
              <p className="text-gray-600">
                Yaklaşan ödemeler için e-posta bildirimleri alın ve hiçbir ödemeyi kaçırmayın.
              </p>
            </div>
            <div className="card flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <FiCheckCircle className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimizasyon Önerileri</h3>
              <p className="text-gray-600">
                Kullanılmayan abonelikler için öneriler alın ve tasarruf fırsatlarını keşfedin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Aboneliklerinizi Ekleyin</h3>
              <p className="text-gray-600">
                Tüm dijital aboneliklerinizi platforma ekleyin ve kategorilere ayırın.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Hatırlatıcıları Ayarlayın</h3>
              <p className="text-gray-600">
                Ödeme tarihlerinden önce ne zaman bildirim almak istediğinizi belirleyin.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Tasarruf Edin</h3>
              <p className="text-gray-600">
                Analitik raporları inceleyin ve gereksiz aboneliklerden kurtularak tasarruf edin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Aboneliklerinizi Yönetmeye Başlayın</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ücretsiz hesap oluşturun ve dijital aboneliklerinizi daha akıllı bir şekilde yönetin.
          </p>
          <Link href="/register" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors inline-block">
            Hemen Üye Olun
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscription Tracker</h3>
              <p className="text-gray-400">
                Dijital aboneliklerinizi takip etmenin en kolay yolu.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Bağlantılar</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Ana Sayfa</Link></li>
                <li><Link href="#features" className="text-gray-400 hover:text-white">Özellikler</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white">Giriş Yap</Link></li>
                <li><Link href="/register" className="text-gray-400 hover:text-white">Üye Ol</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Yasal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Gizlilik Politikası</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Kullanım Koşulları</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">İletişim</h3>
              <p className="text-gray-400">
                info@subscriptiontracker.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Subscription Tracker. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
