"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FiCalendar, 
  FiDollarSign, 
  FiClock, 
  FiTag, 
  FiGlobe, 
  FiArrowLeft, 
  FiEdit, 
  FiTrash2, 
  FiAlertCircle 
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
  description?: string;
  website?: string;
  logo?: string;
  reminderDays?: number;
  createdAt: string;
};

export default function SubscriptionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        // Gerçek API'ye bağlanacak şekilde güncellenecek
        // Şimdilik örnek veri kullanıyoruz
        const mockSubscription: Subscription = {
          id: params.id,
          name: "Netflix",
          price: 49.90,
          billingCycle: "monthly",
          nextBillingDate: "2023-12-15",
          category: "Eğlence",
          description: "Premium plan with 4K streaming",
          website: "https://netflix.com",
          logo: "https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg",
          reminderDays: 3,
          createdAt: "2023-01-15",
        };

        setSubscription(mockSubscription);
        setIsLoading(false);
      } catch (error) {
        console.error("Abonelik detayları yüklenirken hata:", error);
        toast.error("Abonelik detayları yüklenemedi.");
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [params.id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Gerçek API'ye bağlanacak şekilde güncellenecek
      // Şimdilik sadece simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Abonelik başarıyla silindi!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Abonelik silme hatası:", error);
      toast.error("Abonelik silinirken bir hata oluştu. Lütfen tekrar deneyin.");
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Tarih formatını düzenleyen yardımcı fonksiyon
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  // Fatura döngüsünü Türkçe'ye çeviren yardımcı fonksiyon
  const formatBillingCycle = (cycle: string) => {
    switch (cycle) {
      case "monthly": return "Aylık";
      case "yearly": return "Yıllık";
      case "weekly": return "Haftalık";
      default: return cycle;
    }
  };

  // Yıllık maliyeti hesaplayan yardımcı fonksiyon
  const calculateYearlyCost = (price: number, cycle: string) => {
    switch (cycle) {
      case "monthly": return price * 12;
      case "yearly": return price;
      case "weekly": return price * 52;
      default: return price;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Abonelik Bulunamadı</h2>
          <p className="text-gray-600 mb-6">İstediğiniz abonelik detayları bulunamadı.</p>
          <Link href="/dashboard" className="btn-primary">
            Dashboard&apos;a Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-2" /> Geri Dön
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              {subscription.logo && (
                <div className="mr-4 h-16 w-16 flex-shrink-0">
                  <img 
                    src={subscription.logo} 
                    alt={subscription.name} 
                    className="h-16 w-16 object-contain"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{subscription.name}</h1>
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 mt-1">
                  {subscription.category}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link
                href={`/subscriptions/${subscription.id}/edit`}
                className="btn-outline flex items-center"
              >
                <FiEdit className="mr-2" /> Düzenle
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="btn-outline text-red-600 border-red-600 hover:bg-red-50 flex items-center"
              >
                <FiTrash2 className="mr-2" /> Sil
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Abonelik Bilgileri</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <FiDollarSign className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Fiyat</h3>
                    <p className="text-base font-medium text-gray-900">
                      {subscription.price.toFixed(2)} ₺ ({formatBillingCycle(subscription.billingCycle)})
                    </p>
                    <p className="text-sm text-gray-500">
                      Yıllık: {calculateYearlyCost(subscription.price, subscription.billingCycle).toFixed(2)} ₺
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <FiCalendar className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Sonraki Fatura Tarihi</h3>
                    <p className="text-base font-medium text-gray-900">
                      {formatDate(subscription.nextBillingDate)}
                    </p>
                  </div>
                </div>

                {subscription.reminderDays !== undefined && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 mt-1">
                      <FiAlertCircle className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Hatırlatma</h3>
                      <p className="text-base font-medium text-gray-900">
                        Fatura tarihinden {subscription.reminderDays} gün önce
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 mt-1">
                    <FiClock className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Oluşturulma Tarihi</h3>
                    <p className="text-base font-medium text-gray-900">
                      {formatDate(subscription.createdAt)}
                    </p>
                  </div>
                </div>

                {subscription.website && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 mt-1">
                      <FiGlobe className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Web Sitesi</h3>
                      <a 
                        href={subscription.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-base font-medium text-blue-600 hover:text-blue-800"
                      >
                        {subscription.website}
                      </a>
                    </div>
                  </div>
                )}

                {subscription.category && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 mt-1">
                      <FiTag className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-500">Kategori</h3>
                      <p className="text-base font-medium text-gray-900">
                        {subscription.category}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Açıklama</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                {subscription.description ? (
                  <p className="text-gray-700 whitespace-pre-line">{subscription.description}</p>
                ) : (
                  <p className="text-gray-500 italic">Açıklama bulunmuyor.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Silme Onay Modalı */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Aboneliği Sil</h3>
            <p className="text-gray-500 mb-6">
              <strong>{subscription.name}</strong> aboneliğini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-outline"
                disabled={isDeleting}
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                className="btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500"
                disabled={isDeleting}
              >
                {isDeleting ? "Siliniyor..." : "Evet, Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 