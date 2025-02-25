"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  FiDollarSign, 
  FiCalendar, 
  FiTag, 
  FiArrowLeft, 
  FiSave 
} from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

// Form şeması
const subscriptionSchema = z.object({
  name: z.string().min(1, "Abonelik adı gereklidir"),
  price: z.string().min(1, "Fiyat gereklidir"),
  billingCycle: z.enum(["monthly", "yearly", "quarterly"], {
    required_error: "Fatura döngüsü seçilmelidir",
  }),
  category: z.enum(["entertainment", "productivity", "utilities", "other"], {
    required_error: "Kategori seçilmelidir",
  }),
  nextBillingDate: z.string().min(1, "Sonraki fatura tarihi gereklidir"),
  description: z.string().optional(),
  website: z.string().optional(),
  logo: z.string().optional(),
  reminderDays: z.string().optional(),
  paymentMethod: z.string().min(1, "Ödeme yöntemi gereklidir"),
  currency: z.string().default("TRY"),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

// Kategori seçenekleri
const categoryOptions = [
  { value: "entertainment", label: "Eğlence" },
  { value: "productivity", label: "Verimlilik" },
  { value: "utilities", label: "Hizmetler" },
  { value: "other", label: "Diğer" },
];

// Ödeme yöntemi seçenekleri
const paymentMethodOptions = [
  "Kredi Kartı",
  "Banka Kartı",
  "Havale/EFT",
  "PayPal",
  "Diğer",
];

export default function AddSubscriptionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      price: "",
      billingCycle: "monthly",
      category: "entertainment",
      nextBillingDate: new Date().toISOString().split("T")[0],
      description: "",
      website: "",
      logo: "",
      reminderDays: "3",
      paymentMethod: "Kredi Kartı",
      currency: "TRY",
    },
  });

  const onSubmit = async (data: SubscriptionFormValues) => {
    setIsLoading(true);
    try {
      // Veriyi backend'in beklediği formata dönüştür
      const { price, ...rest } = data;
      const formattedData = {
        ...rest,
        amount: parseFloat(price), // price -> amount
        reminderDays: data.reminderDays ? parseInt(data.reminderDays) : 3,
        notificationSettings: {
          reminderDays: data.reminderDays ? parseInt(data.reminderDays) : 3,
          email: true,
          sms: false
        },
        status: "active",
        autoRenewal: true
      };

      // Backend API'ye gönder
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Oturum süresi dolmuş. Lütfen tekrar giriş yapın.");
        router.push("/login");
        return;
      }

      await axios.post(
        "http://localhost:3000/api/subscriptions", 
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      toast.success("Abonelik başarıyla eklendi!");
      reset();
      router.push("/dashboard");
    } catch (error) {
      console.error("Abonelik ekleme hatası:", error);
      toast.error("Abonelik eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Yeni Abonelik Ekle</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Abonelik Adı */}
            <div>
              <label htmlFor="name" className="form-label">
                Abonelik Adı <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className={`form-input ${errors.name ? "border-red-500" : ""}`}
                placeholder="Netflix, Spotify, vb."
              />
              {errors.name && (
                <p className="form-error">{errors.name.message}</p>
              )}
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="category" className="form-label">
                Kategori <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiTag className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="category"
                  {...register("category")}
                  className={`form-input pl-10 ${errors.category ? "border-red-500" : ""}`}
                >
                  <option value="">Kategori Seçin</option>
                  {categoryOptions.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className="form-error">{errors.category.message}</p>
              )}
            </div>

            {/* Fiyat */}
            <div>
              <label htmlFor="price" className="form-label">
                Fiyat <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price")}
                  className={`form-input pl-10 ${errors.price ? "border-red-500" : ""}`}
                  placeholder="29.99"
                />
              </div>
              {errors.price && (
                <p className="form-error">{errors.price.message}</p>
              )}
            </div>

            {/* Fatura Döngüsü */}
            <div>
              <label htmlFor="billingCycle" className="form-label">
                Fatura Döngüsü <span className="text-red-500">*</span>
              </label>
              <select
                id="billingCycle"
                {...register("billingCycle")}
                className={`form-input ${errors.billingCycle ? "border-red-500" : ""}`}
              >
                <option value="monthly">Aylık</option>
                <option value="quarterly">Üç Aylık</option>
                <option value="yearly">Yıllık</option>
              </select>
              {errors.billingCycle && (
                <p className="form-error">{errors.billingCycle.message}</p>
              )}
            </div>

            {/* Sonraki Fatura Tarihi */}
            <div>
              <label htmlFor="nextBillingDate" className="form-label">
                Sonraki Fatura Tarihi <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="nextBillingDate"
                  type="date"
                  {...register("nextBillingDate")}
                  className={`form-input pl-10 ${errors.nextBillingDate ? "border-red-500" : ""}`}
                />
              </div>
              {errors.nextBillingDate && (
                <p className="form-error">{errors.nextBillingDate.message}</p>
              )}
            </div>

            {/* Hatırlatma Günleri */}
            <div>
              <label htmlFor="reminderDays" className="form-label">
                Hatırlatma (Gün Önce)
              </label>
              <input
                id="reminderDays"
                type="number"
                min="0"
                max="30"
                {...register("reminderDays")}
                className="form-input"
                placeholder="3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Fatura tarihinden kaç gün önce hatırlatma almak istediğinizi belirtin.
              </p>
            </div>

            {/* Web Sitesi */}
            <div>
              <label htmlFor="website" className="form-label">
                Web Sitesi
              </label>
              <input
                id="website"
                type="url"
                {...register("website")}
                className="form-input"
                placeholder="https://example.com"
              />
            </div>

            {/* Logo URL */}
            <div>
              <label htmlFor="logo" className="form-label">
                Logo URL
              </label>
              <input
                id="logo"
                type="url"
                {...register("logo")}
                className="form-input"
                placeholder="https://example.com/logo.png"
              />
            </div>

            {/* Ödeme Yöntemi */}
            <div>
              <label htmlFor="paymentMethod" className="form-label">
                Ödeme Yöntemi <span className="text-red-500">*</span>
              </label>
              <select
                id="paymentMethod"
                {...register("paymentMethod")}
                className={`form-input ${errors.paymentMethod ? "border-red-500" : ""}`}
              >
                {paymentMethodOptions.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
              {errors.paymentMethod && (
                <p className="form-error">{errors.paymentMethod.message}</p>
              )}
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label htmlFor="description" className="form-label">
              Açıklama
            </label>
            <textarea
              id="description"
              rows={3}
              {...register("description")}
              className="form-input"
              placeholder="Abonelik hakkında notlar..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center"
            >
              {isLoading ? (
                "Kaydediliyor..."
              ) : (
                <>
                  <FiSave className="mr-2" /> Kaydet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 