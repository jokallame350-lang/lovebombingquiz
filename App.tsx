import React, { useState } from 'react';
import { Question } from './types';
import { generateBonusQuestion } from './services/gemini';

// Initial 30 Questions Data
const INITIAL_QUESTIONS: Question[] = [
  // Deep Questions
  { id: 1, text: "Bir günlüğüne ağzını yesem değiştirebilseydik, benim hakkımda neyi daha iyi anlardın?", isCompleted: false, category: 'deep' },
  { id: 2, text: "Çocukluğundan kalma, seni bugün olduğun kişi yapan en belirgin anı nedir?", isCompleted: false, category: 'deep' },
  { id: 3, text: "İlişkimizde seni en çok güvende hissettiren an hangisiydi?", isCompleted: false, category: 'deep' },
  { id: 4, text: "Eğer kimse yargılamayacak olsaydı, hayatında neyi değiştirmek isterdin?", isCompleted: false, category: 'deep' },
  { id: 5, text: "Benimle ilgili en büyük korkun nedir?", isCompleted: false, category: 'deep' },
  { id: 6, text: "Sence aşk bir 'his' mi yoksa bir 'seçim' mi? Neden?", isCompleted: false, category: 'deep' },
  { id: 7, text: "Hayatının sonuna kadar sadece tek bir anımızı hatırlayabilecek olsan, bu hangisi olurdu?", isCompleted: false, category: 'deep' },
  { id: 8, text: "Sence bizi diğer çiftlerden ayıran en özel şey ne?", isCompleted: false, category: 'deep' },
  { id: 9, text: "Kendinde en çok sevdiğin ve en az sevdiğin özellik nedir?", isCompleted: false, category: 'deep' },
  { id: 10, text: "Bana söylemek istediğin ama tepkimden çekindiğin bir şey var mı?", isCompleted: false, category: 'deep' },

  // Fun Questions
  { id: 11, text: "Eğer bir zombi istilası olsaydı, beni kurtarır mıydın yoksa kendini mi kurtarırdın? (Dürüst ol!)", isCompleted: false, category: 'fun' },
  { id: 12, text: "Piyangodan büyük ikramiyeyi kazansak, yapacağın ilk saçma harcama ne olurdu?", isCompleted: false, category: 'fun' },
  { id: 13, text: "Birlikte bir banka soyacak olsak, hangimiz planı yapar hangimiz parayı kasadan alırdı?", isCompleted: false, category: 'fun' },
  { id: 14, text: "Eğer hayatımız bir film olsaydı, türü ne olurdu? (Komedi, Dram, Aksiyon?)", isCompleted: false, category: 'fun' },
  { id: 15, text: "Benimle ilgili en komik veya utanç verici ilk izlenimin neydi?", isCompleted: false, category: 'fun' },
  { id: 16, text: "Eğer bir hayvan olsaydım, sence hangisi olurdum ve neden?", isCompleted: false, category: 'fun' },
  { id: 17, text: "Sence hangimiz daha iyi yalan söyler?", isCompleted: false, category: 'fun' },
  { id: 18, text: "Bir süper gücün olsa benim üzerimde hangisini kullanmak isterdin? (Zihin okuma yasak!)", isCompleted: false, category: 'fun' },
  { id: 19, text: "Eğer beni bir yemeğe benzetecek olsan bu ne olurdu?", isCompleted: false, category: 'fun' },
  { id: 20, text: "Telefonumdaki tarayıcı geçmişine bakmana izin verir miydim?", isCompleted: false, category: 'fun' },

  // Future Questions
  { id: 21, text: "10 yıl sonra, şu anki hayatımıza baktığımızda en çok neyi özleyeceğiz?", isCompleted: false, category: 'future' },
  { id: 22, text: "Birlikte yaşlanınca en çok ne yapmaktan keyif alacağımızı düşünüyorsun?", isCompleted: false, category: 'future' },
  { id: 23, text: "Eğer dünyanın herhangi bir yerinde yaşama şansımız olsa, nereyi seçerdin?", isCompleted: false, category: 'future' },
  { id: 24, text: "İlişkimiz için belirlediğin en büyük hedef nedir?", isCompleted: false, category: 'future' },
  { id: 25, text: "Bir yıl sonra bugün, hayatımızda neyin değişmiş olmasını istersin?", isCompleted: false, category: 'future' },
  { id: 26, text: "Emekliliğimizde nasıl bir evde oturduğumuzu hayal ediyorsun?", isCompleted: false, category: 'future' },
  { id: 27, text: "Birlikte öğrenmek istediğin yeni bir beceri veya hobi var mı?", isCompleted: false, category: 'future' },
  { id: 28, text: "Gelecekteki çocuklarımıza (veya yeğenlerimize) benim hakkımda anlatacağın ilk şey ne olurdu?", isCompleted: false, category: 'future' },
  { id: 29, text: "Yapılacaklar listende (Bucket List) benimle gerçekleştirmek istediğin en uçuk hayal ne?", isCompleted: false, category: 'future' },
  { id: 30, text: "Sence 50 yıl sonra bile birbirimize hala neden aşık olacağız?", isCompleted: false, category: 'future' },
];

// Styles mapped by category
const CATEGORY_STYLES = {
  deep: {
    bg: 'bg-indigo-500',
    text: 'text-indigo-300',
    border: 'border-indigo-500/30',
    glow: 'group-hover:shadow-indigo-500/20',
    gradient: 'from-indigo-400 to-purple-400'
  },
  fun: {
    bg: 'bg-pink-500',
    text: 'text-pink-300',
    border: 'border-pink-500/30',
    glow: 'group-hover:shadow-pink-500/20',
    gradient: 'from-pink-400 to-rose-400'
  },
  future: {
    bg: 'bg-cyan-500',
    text: 'text-cyan-300',
    border: 'border-cyan-500/30',
    glow: 'group-hover:shadow-cyan-500/20',
    gradient: 'from-cyan-400 to-blue-400'
  },
  spicy: { // Fallback/Extra
    bg: 'bg-red-500',
    text: 'text-red-300',
    border: 'border-red-500/30',
    glow: 'group-hover:shadow-red-500/20',
    gradient: 'from-red-400 to-orange-400'
  }
};

// Icons
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white/90 drop-shadow-lg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 3v4"/><path d="M3 5h4"/><path d="M3 9h4"/></svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);

export default function App() {
  const [questions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuestion, setAiQuestion] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isFinished = currentIndex >= questions.length;
  const currentQuestion = !isFinished ? questions[currentIndex] : null;

  // Determine current style based on category
  const currentStyle = currentQuestion && currentQuestion.category 
    ? CATEGORY_STYLES[currentQuestion.category] 
    : CATEGORY_STYLES.deep; // Default

  const handleNext = () => {
    if (currentIndex < questions.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setAiQuestion(null); // Reset AI state if going back
    }
  };

  const handleReset = () => {
    if (window.confirm("Başa dönmek istediğine emin misin?")) {
      setCurrentIndex(0);
      setAiQuestion(null);
    }
  };

  const handleGenerateAI = async () => {
    setAiLoading(true);
    const newQ = await generateBonusQuestion();
    setAiQuestion(newQ);
    setAiLoading(false);
  };

  const handleCopy = () => {
    const textToCopy = aiQuestion || currentQuestion?.text;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 relative transition-colors duration-1000">
      
      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="absolute top-6 w-full max-w-sm flex justify-between items-center px-2 z-10">
        <div className="flex items-center gap-2">
           <HeartIcon />
           <span className="font-semibold text-lg tracking-wide text-white/90">LoveQuest</span>
        </div>
        <button onClick={handleReset} className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors">
          <RefreshIcon />
        </button>
      </div>

      {/* Main Card Area */}
      <div className="w-full max-w-sm flex-1 flex items-center justify-center relative">
        
        {/* Standard Question Card */}
        {!isFinished && currentQuestion && (
          <div 
            key={currentQuestion.id} 
            className="w-full animate-slide-up"
          >
            <div className={`glass-panel rounded-3xl p-8 min-h-[420px] flex flex-col justify-between relative overflow-hidden group transition-all duration-500 ${currentStyle.border} hover:shadow-2xl ${currentStyle.glow}`}>
              
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <HeartIcon />
              </div>

              {/* Top Meta */}
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                <span className="text-white/40">SORU {currentIndex + 1} / {questions.length}</span>
                <span className={`${currentStyle.text} px-2 py-1 rounded bg-white/5 border border-white/5`}>{currentQuestion.category}</span>
              </div>

              {/* Question Text */}
              <div className="flex-1 flex flex-col items-center justify-center py-6 relative">
                <p className="text-2xl md:text-3xl font-medium text-center leading-snug bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  {currentQuestion.text}
                </p>
                
                {/* Copy Button */}
                <button 
                  onClick={handleCopy}
                  className="mt-6 text-white/20 hover:text-white/80 transition-colors flex items-center gap-1.5 text-xs font-medium"
                >
                  {copied ? <span className="text-green-400">Kopyalandı!</span> : <><CopyIcon /> Kopyala</>}
                </button>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-1 mb-6 overflow-hidden">
                {questions.map((q, idx) => (
                  <div 
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? `w-4 ${currentStyle.bg}` : 
                      idx < currentIndex ? 'w-1 bg-white/40' : 'w-1 bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {/* Back Button */}
                <button 
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`glass-button p-4 rounded-xl flex items-center justify-center text-white transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}
                >
                  <ArrowLeftIcon />
                </button>

                {/* Next Button */}
                <button 
                  onClick={handleNext}
                  className="flex-1 glass-button group relative py-4 px-6 rounded-xl flex items-center justify-center gap-2 font-medium text-white shadow-lg overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${currentStyle.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10">Devam Et</span>
                  <span className="relative z-10"><ArrowRightIcon /></span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Finished State / AI Card */}
        {isFinished && (
          <div className="w-full animate-slide-up">
            <div className="glass-panel rounded-3xl p-8 min-h-[420px] flex flex-col justify-center items-center text-center relative overflow-hidden border-yellow-500/30">
              
              {!aiQuestion ? (
                // Completion Screen
                <>
                  <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-xl floating">
                    <SparklesIcon />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-indigo-200">
                    Harika!
                  </h2>
                  <p className="text-white/70 mb-8 max-w-[250px]">
                    Hazırladığımız tüm soruları tamamladınız. Devam etmek ister misin?
                  </p>
                  
                  <button 
                    onClick={handleGenerateAI}
                    disabled={aiLoading}
                    className="w-full glass-button py-4 px-6 rounded-xl font-medium text-white shadow-lg hover:shadow-yellow-500/20 mb-3 flex items-center justify-center gap-2"
                  >
                     {aiLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     ) : (
                       <>
                         <SparklesIcon />
                         <span>AI Joker Soru Çek</span>
                       </>
                     )}
                  </button>

                  <div className="flex gap-4 mt-2">
                    <button 
                      onClick={() => setCurrentIndex(0)}
                      className="text-sm text-white/40 hover:text-white transition-colors py-2"
                    >
                      Başa Dön
                    </button>
                    <button 
                      onClick={handlePrev}
                      className="text-sm text-white/40 hover:text-white transition-colors py-2"
                    >
                      Son Soruyu Gör
                    </button>
                  </div>
                </>
              ) : (
                // AI Question Card Layout
                <div className="flex flex-col h-full w-full animate-slide-up">
                   <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="mb-4 text-xs font-bold text-yellow-400 uppercase tracking-widest border border-yellow-400/30 px-3 py-1 rounded-full bg-yellow-400/10">
                        AI Joker
                      </div>
                      <p className="text-2xl md:text-3xl font-medium text-center leading-snug">
                        {aiQuestion}
                      </p>
                      
                       <button 
                          onClick={handleCopy}
                          className="mt-6 text-white/20 hover:text-white/80 transition-colors flex items-center gap-1.5 text-xs font-medium"
                        >
                          {copied ? <span className="text-green-400">Kopyalandı!</span> : <><CopyIcon /> Kopyala</>}
                        </button>
                   </div>
                   
                   <button 
                    onClick={handleGenerateAI}
                    className="mt-8 w-full glass-button py-4 px-6 rounded-xl font-medium text-white flex items-center justify-center gap-2"
                  >
                     {aiLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     ) : (
                       <span>Bir Tane Daha</span>
                     )}
                  </button>
                </div>
              )}
              
            </div>
          </div>
        )}

      </div>
      
    </div>
  );
}