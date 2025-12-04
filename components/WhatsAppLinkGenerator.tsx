import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  MessageSquareText, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  RefreshCw, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Share2
} from 'lucide-react';
import { FloatingInput } from './FloatingInput';

interface ResultState {
  url: string;
  isActive: boolean;
}

export const WhatsAppLinkGenerator: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<ResultState>({ url: '', isActive: false });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [copied, setCopied] = useState(false);
  
  const resultRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast({ msg, type });
    timeoutRef.current = window.setTimeout(() => setToast(null), 3000);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    let cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.length === 0) {
      showToast('נא להזין מספר טלפון', 'error');
      return;
    }

    if (cleanPhone.startsWith('0')) {
      cleanPhone = '972' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('972') && cleanPhone.length === 9) {
      cleanPhone = '972' + cleanPhone;
    }

    const encodedMessage = encodeURIComponent(message);
    let generatedUrl = `https://wa.me/${cleanPhone}`;
    if (encodedMessage) {
      generatedUrl += `?text=${encodedMessage}`;
    }

    setResult({ url: generatedUrl, isActive: true });
    setCopied(false);

    setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCopy = () => {
    if (!result.url) return;
    navigator.clipboard.writeText(result.url)
      .then(() => {
        showToast('הקישור הועתק ללוח!');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => showToast('שגיאה בהעתקה', 'error'));
  };

  const handleReset = () => {
    setPhone('');
    setMessage('');
    setResult({ url: '', isActive: false });
    setCopied(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="w-full md:max-w-[440px] bg-surface md:bg-transparent min-h-screen md:min-h-0 flex flex-col">
        <div className="bg-white md:rounded-3xl shadow-none md:shadow-card overflow-hidden flex-1 md:flex-none flex flex-col">
          
          {/* Header */}
          <header className="bg-primary text-white p-6 pt-8 md:p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_120%,#fff,transparent)]" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <MessageSquareText className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
              </div>
              <div>
                <h1 className="font-bold text-2xl md:text-3xl mb-1 tracking-tight">
                  ווטסאפ בקליק
                </h1>
                <p className="text-white/90 font-light text-sm md:text-base">
                  צור קישור ישיר לוואטסאפ במהירות
                </p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-5 md:p-8 bg-white rounded-t-[24px] -mt-4 md:mt-0 relative z-20">
            <form onSubmit={handleGenerate} className="flex flex-col gap-6">
              
              <FloatingInput
                id="phone"
                label="מספר טלפון (לדוגמה: 050-1234567)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                required
                icon={<Phone className="w-5 h-5" />}
              />

              <FloatingInput
                id="message"
                label="הודעה (אופציונלי)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                icon={<MessageSquareText className="w-5 h-5" />}
              />

              <button 
                type="submit" 
                className="group w-full bg-primary text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:bg-primary-dark active:scale-[0.98] transition-all duration-200 mt-2"
              >
                <LinkIcon className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
                צור קישור
              </button>
            </form>

            {/* Result Section */}
            {result.isActive && (
              <div 
                  ref={resultRef}
                  className="mt-8 pt-8 border-t border-dashed border-gray-200 animate-slideUp"
              >
                  <div className="bg-primary-container/50 rounded-2xl p-6 text-center border border-primary/10">
                      <div className="bg-white p-3 rounded-xl inline-block mb-4 shadow-sm">
                          <QRCodeSVG 
                              value={result.url} 
                              size={160} 
                              level="Q"
                              fgColor="#111b21"
                              bgColor="#ffffff"
                              imageSettings={{
                                src: "",
                                height: 24,
                                width: 24,
                                excavate: true,
                              }}
                          />
                      </div>

                      <div className="text-xs text-secondary break-all font-mono mb-6 bg-white/50 p-2 rounded-lg border border-primary/5 select-all" dir="ltr">
                          {result.url}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                          <button 
                              onClick={handleCopy}
                              className={`
                                col-span-2 md:col-span-1
                                py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 
                                transition-all duration-200 active:scale-95
                                ${copied 
                                  ? 'bg-primary text-white shadow-md' 
                                  : 'bg-white text-primary border border-primary/20 hover:border-primary hover:bg-primary/5'}
                              `}
                          >
                              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              {copied ? 'הועתק' : 'העתק'}
                          </button>

                          <button 
                              onClick={() => {
                                if (navigator.share) {
                                  navigator.share({
                                    title: 'WhatsApp Link',
                                    text: 'קישור לווטסאפ: ' + message,
                                    url: result.url
                                  }).catch(console.error);
                                } else {
                                  window.open(result.url, '_blank');
                                }
                              }}
                              className="col-span-2 md:col-span-1 bg-white text-secondary border border-gray-200 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all"
                          >
                              <Share2 className="w-4 h-4" />
                              שתף
                          </button>

                          <button 
                              onClick={handleReset}
                              className="col-span-2 text-sm text-secondary py-3 flex items-center justify-center gap-1.5 hover:text-primary transition-colors mt-2 opacity-70 hover:opacity-100"
                          >
                              <RefreshCw className="w-3.5 h-3.5" />
                              יצירת קישור חדש
                          </button>
                      </div>
                  </div>
              </div>
            )}
          </main>
          
          <div className="p-4 text-center text-[10px] md:text-xs text-secondary/60 bg-gray-50 md:bg-transparent">
            תומך במספרים ישראלים ובינלאומיים באופן אוטומטי
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${toast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        {toast && (
            <div className={`
              flex items-center gap-3 pl-6 pr-5 py-3.5 rounded-full shadow-2xl text-white text-sm font-medium backdrop-blur-md
              ${toast.type === 'error' ? 'bg-error/90' : 'bg-[#111b21]/90'}
            `}>
                {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                <span>{toast.msg}</span>
            </div>
        )}
      </div>
    </>
  );
};