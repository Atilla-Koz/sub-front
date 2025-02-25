"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FiPlus, 
  FiCalendar, 
  FiDollarSign, 
  FiAlertCircle, 
  FiBarChart2, 
  FiCreditCard 
} from "react-icons/fi";
import toast from "react-hot-toast";

// Abonelik tipi tanımı
type Subscription = {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly" | "weekly";
  nextBillingDate: string;
  category: string;
  logo?: string;
};

// Özet bilgiler tipi
type Summary = {
  totalSubscriptions: number;
  monthlySpending: number;
  yearlySpending: number;
  upcomingPayments: number;
};

export default function DashboardPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalSubscriptions: 0,
    monthlySpending: 0,
    yearlySpending: 0,
    upcomingPayments: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gerçek API'ye bağlanacak şekilde güncellenecek
        // Şimdilik örnek veriler kullanıyoruz
        const mockSubscriptions: Subscription[] = [
          {
            id: "1",
            name: "Netflix",
            price: 49.90,
            billingCycle: "monthly",
            nextBillingDate: "2023-12-15",
            category: "Eğlence",
            logo: "https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg",
          },
          {
            id: "2",
            name: "Spotify",
            price: 29.99,
            billingCycle: "monthly",
            nextBillingDate: "2023-12-20",
            category: "Müzik",
            logo: "https://www.logo.wine/a/logo/Spotify/Spotify-Logo.wine.svg",
          },
          {
            id: "3",
            name: "Amazon Prime",
            price: 39.99,
            billingCycle: "monthly",
            nextBillingDate: "2023-12-10",
            category: "Alışveriş",
            logo: "https://www.logo.wine/a/logo/Amazon_Prime/Amazon_Prime-Logo.wine.svg",
          },
        ];

        setSubscriptions(mockSubscriptions);
        
        // Özet bilgileri hesapla
        const monthlyTotal = mockSubscriptions.reduce((total, sub) => {
          if (sub.billingCycle === "monthly") {
            return total + sub.price;
          } else if (sub.billingCycle === "yearly") {
            return total + (sub.price / 12);
          } else if (sub.billingCycle === "weekly") {
            return total + (sub.price * 4.33);
          }
          return total;
        }, 0);

        const yearlyTotal = monthlyTotal * 12;
        
        // Yaklaşan ödemeleri hesapla (önümüzdeki 7 gün içinde)
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        
        const upcomingCount = mockSubscriptions.filter(sub => {
          const billingDate = new Date(sub.nextBillingDate);
          return billingDate >= today && billingDate <= nextWeek;
        }).length;

        setSummary({
          totalSubscriptions: mockSubscriptions.length,
          monthlySpending: monthlyTotal,
          yearlySpending: yearlyTotal,
          upcomingPayments: upcomingCount,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
        toast.error("Abonelikler yüklenirken bir hata oluştu.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Tarih formatını düzenleyen yardımcı fonksiyon
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Abonelik Takibi</h1>
        <Link 
          href="/subscriptions/add" 
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Abonelik Ekle
        </Link>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <FiCreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Toplam Abonelik</p>
            <p className="text-2xl font-bold">{summary.totalSubscriptions}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <FiDollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Aylık Harcama</p>
            <p className="text-2xl font-bold">{summary.monthlySpending.toFixed(2)} ₺</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <FiBarChart2 className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Yıllık Harcama</p>
            <p className="text-2xl font-bold">{summary.yearlySpending.toFixed(2)} ₺</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <FiAlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Yaklaşan Ödemeler</p>
            <p className="text-2xl font-bold">{summary.upcomingPayments}</p>
          </div>
        </div>
      </div>

      {/* Abonelikler Listesi */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Aktif Abonelikler</h2>
        </div>
        
        {isLoading ? (
          <div className="p-6 text-center">
            <p>Yükleniyor...</p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Henüz abonelik eklenmemiş.</p>
            <Link 
              href="/subscriptions/add" 
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <FiPlus className="mr-2" /> İlk aboneliğinizi ekleyin
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abonelik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fatura Döngüsü
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sonraki Ödeme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {subscription.logo && (
                          <div className="flex-shrink-0 h-10 w-10 mr-4">
                            <img 
                              className="h-10 w-10 object-contain" 
                              src={subscription.logo} 
                              alt={subscription.name} 
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {subscription.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {subscription.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.price.toFixed(2)} ₺
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.billingCycle === "monthly" && "Aylık"}
                      {subscription.billingCycle === "yearly" && "Yıllık"}
                      {subscription.billingCycle === "weekly" && "Haftalık"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 text-gray-400" />
                        {formatDate(subscription.nextBillingDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        href={`/subscriptions/${subscription.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Detaylar
                      </Link>
                      <Link 
                        href={`/subscriptions/${subscription.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Düzenle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 