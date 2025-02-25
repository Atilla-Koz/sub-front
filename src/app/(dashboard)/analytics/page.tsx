"use client";

import { useState, useEffect } from "react";
import { 
  FiDollarSign, 
  FiPieChart, 
  FiBarChart2, 
  FiCalendar,
  FiFilter
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

// Kategori bazlı harcama tipi
type CategorySpending = {
  category: string;
  amount: number;
  percentage: number;
  count: number;
};

// Aylık harcama tipi
type MonthlySpending = {
  month: string;
  amount: number;
};

export default function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [categorySpending, setCategorySpending] = useState<CategorySpending[]>([]);
  const [monthlySpending, setMonthlySpending] = useState<MonthlySpending[]>([]);
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [totalYearly, setTotalYearly] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

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
          {
            id: "4",
            name: "YouTube Premium",
            price: 29.99,
            billingCycle: "monthly",
            nextBillingDate: "2023-12-05",
            category: "Eğlence",
            logo: "https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg",
          },
          {
            id: "5",
            name: "Microsoft 365",
            price: 399.99,
            billingCycle: "yearly",
            nextBillingDate: "2024-01-15",
            category: "Yazılım",
            logo: "https://www.logo.wine/a/logo/Microsoft_Office/Microsoft_Office-Logo.wine.svg",
          },
        ];

        setSubscriptions(mockSubscriptions);
        
        // Kategorileri çıkar
        const uniqueCategories = Array.from(new Set(mockSubscriptions.map(sub => sub.category)));
        setCategories(uniqueCategories);
        
        // Kategori bazlı harcamaları hesapla
        calculateCategorySpending(mockSubscriptions);
        
        // Aylık harcamaları hesapla
        calculateMonthlySpending(mockSubscriptions);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
        toast.error("Analitik verileri yüklenirken bir hata oluştu.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Kategori filtresini değiştirdiğimizde yeniden hesapla
  useEffect(() => {
    if (subscriptions.length > 0) {
      const filteredSubscriptions = filterCategory === "all" 
        ? subscriptions 
        : subscriptions.filter(sub => sub.category === filterCategory);
      
      calculateCategorySpending(filteredSubscriptions);
      calculateMonthlySpending(filteredSubscriptions);
    }
  }, [filterCategory, subscriptions]);

  // Kategori bazlı harcamaları hesaplayan fonksiyon
  const calculateCategorySpending = (subs: Subscription[]) => {
    const categoryMap = new Map<string, { amount: number; count: number }>();
    let total = 0;
    
    subs.forEach(sub => {
      // Aylık maliyeti hesapla
      let monthlyAmount = sub.price;
      if (sub.billingCycle === "yearly") {
        monthlyAmount = sub.price / 12;
      } else if (sub.billingCycle === "weekly") {
        monthlyAmount = sub.price * 4.33; // Ortalama hafta sayısı
      }
      
      // Kategori toplamını güncelle
      const current = categoryMap.get(sub.category) || { amount: 0, count: 0 };
      categoryMap.set(sub.category, {
        amount: current.amount + monthlyAmount,
        count: current.count + 1
      });
      
      total += monthlyAmount;
    });
    
    // Yüzdeleri hesapla ve sırala
    const result: CategorySpending[] = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      amount: data.amount,
      percentage: total > 0 ? (data.amount / total) * 100 : 0,
      count: data.count
    }));
    
    // Tutara göre azalan sıralama
    result.sort((a, b) => b.amount - a.amount);
    
    setCategorySpending(result);
    setTotalMonthly(total);
    setTotalYearly(total * 12);
  };

  // Aylık harcamaları hesaplayan fonksiyon
  const calculateMonthlySpending = (subs: Subscription[]) => {
    // Şu anki ay ve sonraki 11 ay için veri oluştur
    const months: MonthlySpending[] = [];
    const now = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const monthName = date.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });
      months.push({
        month: monthName,
        amount: 0
      });
    }
    
    // Her abonelik için aylık tutarları hesapla
    subs.forEach(sub => {
      const nextBillingDate = new Date(sub.nextBillingDate);
      
      // Aboneliğin aylık maliyetini hesapla
      let monthlyAmount = sub.price;
      if (sub.billingCycle === "yearly") {
        monthlyAmount = sub.price / 12;
      } else if (sub.billingCycle === "weekly") {
        monthlyAmount = sub.price * 4.33;
      }
      
      // Aboneliğin fatura döngüsüne göre gelecek aylar için tutarları ekle
      for (let i = 0; i < months.length; i++) {
        const currentMonth = new Date(now.getFullYear(), now.getMonth() + i, 1);
        
        // Yıllık abonelikler için sadece fatura ayında ekle
        if (sub.billingCycle === "yearly") {
          const billingMonth = nextBillingDate.getMonth();
          const billingYear = nextBillingDate.getFullYear();
          
          if (currentMonth.getMonth() === billingMonth && 
              (currentMonth.getFullYear() === billingYear || 
               currentMonth.getFullYear() === billingYear + 1)) {
            months[i].amount += sub.price;
          }
        } 
        // Aylık ve haftalık abonelikler için her ay ekle
        else {
          months[i].amount += monthlyAmount;
        }
      }
    });
    
    setMonthlySpending(months);
  };

  // Kategori renklerini belirleyen fonksiyon
  const getCategoryColor = (category: string, opacity: number = 1) => {
    const colors: Record<string, string> = {
      "Eğlence": `rgba(239, 68, 68, ${opacity})`, // red
      "Müzik": `rgba(59, 130, 246, ${opacity})`, // blue
      "Alışveriş": `rgba(16, 185, 129, ${opacity})`, // green
      "Yazılım": `rgba(139, 92, 246, ${opacity})`, // purple
      "Video": `rgba(245, 158, 11, ${opacity})`, // amber
      "Oyun": `rgba(236, 72, 153, ${opacity})`, // pink
      "Bulut Depolama": `rgba(14, 165, 233, ${opacity})`, // sky
      "Eğitim": `rgba(168, 85, 247, ${opacity})`, // purple
      "Fitness": `rgba(34, 197, 94, ${opacity})`, // green
      "Yemek": `rgba(249, 115, 22, ${opacity})`, // orange
    };
    
    return colors[category] || `rgba(107, 114, 128, ${opacity})`; // Default gray
  };

  // Pasta grafiği için maksimum yükseklik hesaplama
  const getMaxBarHeight = () => {
    if (monthlySpending.length === 0) return 0;
    return Math.max(...monthlySpending.map(item => item.amount));
  };
  
  const maxBarHeight = getMaxBarHeight();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Abonelik Analizi</h1>
      
      {/* Filtreler */}
      <div className="mb-8 flex items-center">
        <div className="flex items-center">
          <FiFilter className="mr-2 text-gray-500" />
          <span className="mr-2 text-gray-700">Kategori Filtresi:</span>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="form-input py-1 px-2 text-sm"
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Özet Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FiDollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Aylık Harcama</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalMonthly.toFixed(2)} ₺</p>
          <p className="text-sm text-gray-500 mt-2">
            {subscriptions.length} aktif abonelik
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FiBarChart2 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Yıllık Harcama</h2>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalYearly.toFixed(2)} ₺</p>
          <p className="text-sm text-gray-500 mt-2">
            Yıllık toplam maliyet
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <FiPieChart className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">En Yüksek Kategori</h2>
          </div>
          {categorySpending.length > 0 ? (
            <>
              <p className="text-3xl font-bold text-gray-900">{categorySpending[0].category}</p>
              <p className="text-sm text-gray-500 mt-2">
                {categorySpending[0].amount.toFixed(2)} ₺ ({categorySpending[0].percentage.toFixed(1)}%)
              </p>
            </>
          ) : (
            <p className="text-gray-500">Veri bulunamadı</p>
          )}
        </div>
      </div>
      
      {/* Kategori Dağılımı */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Kategori Dağılımı</h2>
          
          {categorySpending.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Veri bulunamadı</p>
          ) : (
            <div className="space-y-4">
              {categorySpending.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {item.amount.toFixed(2)} ₺ ({item.count} abonelik)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: getCategoryColor(item.category)
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Pasta Grafiği (Basit Görselleştirme) */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Kategori Payları</h2>
          
          {categorySpending.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Veri bulunamadı</p>
          ) : (
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                {categorySpending.map((item, index) => {
                  // Basit bir pasta grafiği için CSS conic-gradient kullanıyoruz
                  // Her kategori için başlangıç ve bitiş açılarını hesaplıyoruz
                  let startAngle = 0;
                  for (let i = 0; i < index; i++) {
                    startAngle += categorySpending[i].percentage * 3.6; // 360 derece üzerinden
                  }
                  const endAngle = startAngle + item.percentage * 3.6;
                  
                  return (
                    <div 
                      key={item.category}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(${getCategoryColor(item.category)} ${startAngle}deg, ${getCategoryColor(item.category)} ${endAngle}deg, transparent ${endAngle}deg)`,
                        clipPath: 'circle(50%)'
                      }}
                    ></div>
                  );
                })}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-full w-32 h-32"></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Kategori Renk Açıklamaları */}
          <div className="mt-8 grid grid-cols-2 gap-2">
            {categorySpending.map((item) => (
              <div key={item.category} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                ></div>
                <span className="text-xs text-gray-700">{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Aylık Harcama Grafiği */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Aylık Harcama Tahmini</h2>
        
        {monthlySpending.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Veri bulunamadı</p>
        ) : (
          <div className="relative h-80">
            <div className="flex h-64 items-end space-x-2">
              {monthlySpending.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t-md hover:bg-blue-600 transition-all"
                    style={{ 
                      height: `${maxBarHeight > 0 ? (item.amount / maxBarHeight) * 100 : 0}%`,
                      minHeight: '4px'
                    }}
                  ></div>
                </div>
              ))}
            </div>
            
            {/* X Ekseni (Aylar) */}
            <div className="flex justify-between mt-2">
              {monthlySpending.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                  <span className="text-xs text-gray-500 block whitespace-nowrap overflow-hidden text-ellipsis" title={item.month}>
                    {item.month.split(' ')[0].substring(0, 3)}
                  </span>
                  <span className="text-xs font-medium block whitespace-nowrap overflow-hidden text-ellipsis" title={`${item.amount.toFixed(2)} ₺`}>
                    {item.amount.toFixed(0)} ₺
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Abonelik Listesi */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Abonelikler</h2>
        </div>
        
        {subscriptions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Henüz abonelik eklenmemiş.</p>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions
                  .filter(sub => filterCategory === "all" || sub.category === filterCategory)
                  .map((subscription) => (
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
                        <span 
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{
                            backgroundColor: getCategoryColor(subscription.category, 0.2),
                            color: getCategoryColor(subscription.category, 1)
                          }}
                        >
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
                          {new Date(subscription.nextBillingDate).toLocaleDateString('tr-TR')}
                        </div>
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