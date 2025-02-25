"use client";

import { useState } from "react";
import { FiMoon, FiSun, FiGlobe, FiSave, FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("tr");
  const [isSaving, setIsSaving] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Gerçek API'ye bağlanacak şekilde güncellenecek
      // Şimdilik sadece simüle ediyoruz
      console.log("Ayarlar kaydediliyor:", { theme, language });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Ayarlar başarıyla kaydedildi!");
    } catch (error) {
      console.error("Ayarlar kaydedilirken hata:", error);
      toast.error("Ayarlar kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearCache = async () => {
    setIsClearing(true);
    try {
      // Gerçek API'ye bağlanacak şekilde güncellenecek
      // Şimdilik sadece simüle ediyoruz
      console.log("Önbellek temizleniyor");
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Önbellek başarıyla temizlendi!");
    } catch (error) {
      console.error("Önbellek temizlenirken hata:", error);
      toast.error("Önbellek temizlenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Uygulama Ayarları</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Görünüm Ayarları */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Görünüm Ayarları</h2>
            
            <div className="space-y-6">
              {/* Tema Seçimi */}
              <div>
                <label className="form-label">Tema</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => handleThemeChange("light")}
                    className={`flex items-center justify-center p-4 rounded-lg border ${
                      theme === "light"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FiSun className="mr-2 h-5 w-5" />
                    <span>Açık Tema</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleThemeChange("dark")}
                    className={`flex items-center justify-center p-4 rounded-lg border ${
                      theme === "dark"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <FiMoon className="mr-2 h-5 w-5" />
                    <span>Koyu Tema</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Not: Tema değişiklikleri sayfa yenilendikten sonra tamamen uygulanacaktır.
                </p>
              </div>

              {/* Dil Seçimi */}
              <div>
                <label htmlFor="language" className="form-label">
                  <FiGlobe className="inline-block mr-2" /> Dil
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={handleLanguageChange}
                  className="form-input mt-1"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Not: Dil değişiklikleri sayfa yenilendikten sonra tamamen uygulanacaktır.
                </p>
              </div>
            </div>
          </div>

          {/* Veri Yönetimi */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Veri Yönetimi</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Önbellek Temizleme</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Uygulamanın önbelleğini temizleyerek daha hızlı çalışmasını sağlayabilirsiniz. Bu işlem, oturum bilgilerinizi etkilemez.
                </p>
                <button
                  type="button"
                  onClick={handleClearCache}
                  disabled={isClearing}
                  className="btn-secondary flex items-center"
                >
                  {isClearing ? (
                    "Temizleniyor..."
                  ) : (
                    <>
                      <FiRefreshCw className="mr-2" /> Önbelleği Temizle
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-md font-medium text-gray-700 mb-2">Veri İndirme</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Tüm abonelik verilerinizi CSV formatında indirebilirsiniz.
                </p>
                <button
                  type="button"
                  onClick={() => toast.success("Veriler indiriliyor...")}
                  className="btn-secondary"
                >
                  Verilerimi İndir (CSV)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Yan Bilgi Paneli */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ayarlar Özeti</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Seçili Tema</h3>
                <p className="text-base text-gray-900 flex items-center">
                  {theme === "light" ? (
                    <>
                      <FiSun className="mr-2" /> Açık Tema
                    </>
                  ) : (
                    <>
                      <FiMoon className="mr-2" /> Koyu Tema
                    </>
                  )}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Seçili Dil</h3>
                <p className="text-base text-gray-900 flex items-center">
                  <FiGlobe className="mr-2" />
                  {language === "tr" ? "Türkçe" : 
                   language === "en" ? "English" :
                   language === "de" ? "Deutsch" :
                   language === "fr" ? "Français" :
                   language === "es" ? "Español" : ""}
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isSaving ? (
                "Kaydediliyor..."
              ) : (
                <>
                  <FiSave className="mr-2" /> Ayarları Kaydet
                </>
              )}
            </button>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Ayarlar otomatik olarak tarayıcınızda saklanır ve cihazlar arasında senkronize edilmez.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 