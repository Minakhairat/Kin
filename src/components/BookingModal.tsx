import React, { useState } from 'react';
import { COMPANY_INFO, PODCAST_PACKAGES, REELS_PACKAGES } from '../data/content';
import { Language, BookingFormData } from '../types';
import { X, Send, CheckCircle2, Phone, MessageCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  initialPackageId?: string;
  initialAddons?: string[];
  calculatedTotal?: number;
  lang: Language;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  initialPackageId,
  initialAddons = [],
  calculatedTotal,
  lang,
  onClose,
}) => {
  const allPackages = [...PODCAST_PACKAGES, ...REELS_PACKAGES];
  
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    service: initialPackageId?.startsWith('reels') ? 'reels' : 'podcasts',
    packageId: initialPackageId || 'podcast-doubleday',
    preferredDate: '',
    addons: initialAddons,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const ref = 'KIN-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmitted(true);

    const selectedPkg = allPackages.find((p) => p.id === formData.packageId);
    const msg =
      lang === 'ar'
        ? `طلب حجز استوديو KIN جديد [${ref}]:\n- الاسم: ${formData.fullName}\n- رقم الهاتف: ${formData.phone}\n- الباقة: ${selectedPkg?.name || 'مخصصة'}\n- التاريخ: ${formData.preferredDate || 'أقرب ميعاد متاح'}\n${formData.notes ? `- ملاحظات: ${formData.notes}\n` : ''}أرجو تأكيد الحجز وإرسال تفاصيل جلسة التصوير.`
        : `New KIN Studio Booking Request [${ref}]:\n- Name: ${formData.fullName}\n- Phone: ${formData.phone}\n- Package: ${selectedPkg?.name || 'Custom'}\n- Date: ${formData.preferredDate || 'Earliest available'}\n${formData.notes ? `- Notes: ${formData.notes}\n` : ''}Please confirm availability.`;

    const waUrl = `https://wa.me/${COMPANY_INFO.whatsappNumbers[0]}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-xl bg-white text-[#141211] rounded-2xl overflow-hidden border border-black/10 shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C82626]" />
            <h3 className="text-base font-bold text-[#141211]">
              {lang === 'ar' ? 'حجز جلسة في استوديو KIN' : 'Book a Session at KIN Studio'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-black/60 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#141211]">
                {lang === 'ar' ? 'تم استلام طلبك وتوجيهه إلى واتساب!' : 'Request Sent to WhatsApp!'}
              </h4>
              <p className="text-xs font-mono text-[#C82626] font-bold">
                {bookingRef}
              </p>
              <p className="text-xs text-[#141211]/70 max-w-sm mx-auto">
                {lang === 'ar'
                  ? 'تم تجهيز رسالتك مع تفاصيل الحجز، وسيقوم فريق الاستوديو بالرد عليك فوراً لتأكيد الحجز.'
                  : 'Your booking details are prepared. Our team will verify slot availability promptly.'}
              </p>
              <div className="pt-4 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#141211] hover:bg-[#C82626] rounded transition-colors"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1">
                  {lang === 'ar' ? 'الاسم بالكامل *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'ar' ? 'مثال: كريم سامح' : 'Your name'}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm focus:outline-none focus:border-[#C82626]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1">
                  {lang === 'ar' ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder={lang === 'ar' ? '010XXXXXXXX' : '+20 10X XXX XXXX'}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm focus:outline-none focus:border-[#C82626] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">
                    {lang === 'ar' ? 'نوع الخدمة' : 'Service'}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => {
                      const s = e.target.value;
                      setFormData({
                        ...formData,
                        service: s,
                        packageId: s === 'podcasts' ? 'podcast-doubleday' : 'reels-pro',
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-lg border border-black/15 text-xs bg-white focus:outline-none focus:border-[#C82626]"
                  >
                    <option value="podcasts">{lang === 'ar' ? 'بودكاست ولقاءات' : 'Podcasts'}</option>
                    <option value="reels">{lang === 'ar' ? 'ريلز شهرية' : 'Monthly Reels'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141211] mb-1">
                    {lang === 'ar' ? 'الباكدج' : 'Package'}
                  </label>
                  <select
                    value={formData.packageId}
                    onChange={(e) => setFormData({ ...formData, packageId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-black/15 text-xs bg-white focus:outline-none focus:border-[#C82626]"
                  >
                    {formData.service === 'podcasts' ? (
                      <>
                        <option value="podcast-solo">Solo (10,000 ج)</option>
                        <option value="podcast-duo">Duo (15,000 ج)</option>
                        <option value="podcast-doubleday">Double Day (24,000 ج)</option>
                        <option value="podcast-monthly">Monthly Show (44,000 ج)</option>
                      </>
                    ) : (
                      <>
                        <option value="reels-basic">Basic (12,000 ج)</option>
                        <option value="reels-pro">Pro (15,000 ج)</option>
                        <option value="reels-premium">Premium (22,000 ج)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1">
                  {lang === 'ar' ? 'الميعاد المقترح' : 'Preferred Date'}
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-xs focus:outline-none focus:border-[#C82626]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#141211] mb-1">
                  {lang === 'ar' ? 'ملاحظات إضافية' : 'Notes'}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'ar' ? 'أي تفاصيل عن الفكرة أو عدد الضيوف...' : 'Additional project details...'}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-black/15 text-xs focus:outline-none focus:border-[#C82626]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold text-white bg-[#C82626] hover:bg-[#a31d1d] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إرسال الحجز لواتساب الاستوديو' : 'Send to Studio WhatsApp'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
