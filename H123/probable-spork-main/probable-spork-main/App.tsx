import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [editableText, setEditableText] = useState('Click the bear to explore!');
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const [clickedImageMessage, setClickedImageMessage] = useState('');
  
  const bearImageUrl = "https://i.imgur.com/DuvwmDi.png";
  const galleryImages = [
    "https://i.imgur.com/VFJlgRn.jpeg",
    "https://i.imgur.com/uo4aye8.jpeg", 
    "https://i.imgur.com/gwkTw1V.jpeg",
    "https://i.imgur.com/dTzvwgG.jpeg",
    "https://i.imgur.com/sWCiwbQ.jpeg",
    "https://i.imgur.com/PxRiUtn.jpeg"
  ];

  const handleSwipeRight = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'heidy') {
      setIsUnlocked(true);
    } else {
      setPassword('');
      // Could add error shake animation here
    }
  };

  const handleBearClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleHeartClick = () => {
    setShowLoveMessage(!showLoveMessage);
  };

  const handleImageClick = () => {
    setClickedImageMessage('te amo much osita');
    setTimeout(() => {
      setClickedImageMessage('');
    }, 2000);
  };

  // Show lockscreen if not unlocked
  if (!isUnlocked) {
    return (
      <div 
        className="size-full flex items-center justify-center relative"
        style={{ backgroundColor: '#8B4513' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4"
        >
          <div className="text-center mb-6">
            <ImageWithFallback
              src="https://static.vecteezy.com/system/resources/previews/067/221/394/non_2x/cute-3d-cartoon-heart-character-on-transparent-background-free-png.png"
              alt="Heart Lock"
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h2 className="text-2xl text-gray-800 mb-2">Heart Lock</h2>
            <p className="text-gray-600">Enter password and click Enter</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <motion.input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-4 rounded-lg border-2 border-amber-200 focus:border-amber-400 outline-none text-gray-800"
              autoFocus
              animate={password !== '' && password.toLowerCase() !== 'heidy' ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            />
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                boxShadow: ["0 4px 15px rgba(245, 158, 11, 0.4)", "0 8px 25px rgba(245, 158, 11, 0.6)", "0 4px 15px rgba(245, 158, 11, 0.4)"]
              }}
              transition={{ 
                boxShadow: { repeat: Infinity, duration: 2 },
                scale: { duration: 0.2 },
                y: { duration: 0.2 }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                Enter ⏎
                <Heart className="w-4 h-4 fill-current" />
              </span>
            </motion.button>
          </form>
          
          <div className="mt-2 text-center text-sm text-gray-500">
            Hint: Someone special's name 💝
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="size-full overflow-hidden relative"
      style={{ backgroundColor: '#8B4513' }} // Dark brown background
    >
      {/* Clickable Heart in Top Left */}
      <motion.div
        className="absolute top-4 left-4 z-50 cursor-pointer"
        onClick={handleHeartClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ImageWithFallback
          src="https://static.vecteezy.com/system/resources/previews/067/221/394/non_2x/cute-3d-cartoon-heart-character-on-transparent-background-free-png.png"
          alt="Love Heart"
          className="w-12 h-12 drop-shadow-lg"
        />
      </motion.div>

      {/* Love Message Popup */}
      <AnimatePresence>
        {showLoveMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-16 left-4 z-40 bg-white/95 rounded-lg p-4 shadow-xl max-w-xs"
          >
            <div className="text-gray-800">
              <p className="text-sm">
                <span className="text-red-500">Loved by:</span>
              </p>
              <p className="font-medium">Voltairenoel Encarnacion</p>
              <p className="text-sm text-gray-600 mt-1">For Heidy</p>
            </div>
            {/* Small arrow pointing to heart */}
            <div className="absolute -top-2 left-6 w-4 h-4 bg-white/95 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === 0 ? (
          <motion.div
            key="page1"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: -window.innerWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="size-full flex flex-col items-center justify-center p-8 relative"
            onPanEnd={(event, info) => {
              if (info.offset.x < -100) {
                handleSwipeRight();
              }
            }}
          >
            {/* Main Bear Image */}
            <motion.div
              className="relative cursor-pointer"
              onClick={handleBearClick}
              animate={{
                scale: isZoomed ? 2.5 : 1,
                y: isZoomed ? -50 : 0,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                animate={{
                  clipPath: isZoomed 
                    ? 'circle(60px at 50% 65%)' // Focus on mouth/nose area
                    : 'circle(150px at 50% 50%)'
                }}
                transition={{ duration: 0.5 }}
              >
                <ImageWithFallback
                  src={bearImageUrl}
                  alt="Cute Bear"
                  className="w-64 h-64 object-contain"
                />
              </motion.div>
              
              {/* "I love you" text that appears when zoomed */}
              {isZoomed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="bg-white/95 text-red-500 px-4 py-2 rounded-full shadow-lg">
                    I love you
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Editable Text */}
            <motion.div
              className="mt-8 max-w-md w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <textarea
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
                className="w-full p-4 rounded-lg bg-white/90 text-gray-800 resize-none border-2 border-amber-200 focus:border-amber-400 outline-none"
                rows={3}
                placeholder="Write something about this cute bear..."
              />
              
              {/* BEARR text beneath */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-center"
              >
                <span className="text-white text-2xl tracking-widest">BEARR</span>
              </motion.div>
            </motion.div>

            {/* Swipe Hint */}
            <motion.div
              className="absolute bottom-8 right-8 text-white/70 flex items-center gap-2"
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span>Swipe right for more</span>
              <div className="w-6 h-6 border-r-2 border-b-2 border-white/70 rotate-[-45deg]" />
            </motion.div>

            {/* Reset Zoom Hint */}
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full"
              >
                Click bear again to zoom out
              </motion.div>
            )}
          </motion.div>
        ) : currentPage === 1 ? (
          <motion.div
            key="page2"
            initial={{ x: window.innerWidth }}
            animate={{ x: 0 }}
            exit={{ x: window.innerWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="size-full relative overflow-hidden"
            style={{
              backgroundImage: `url(${bearImageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            onPanEnd={(event, info) => {
              if (info.offset.x > 100) {
                handleSwipeLeft();
              } else if (info.offset.x < -100) {
                handleSwipeRight();
              }
            }}
          >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Hearts in corners */}
            <Heart className="absolute top-4 left-4 w-8 h-8 text-red-400 fill-red-400" />
            <Heart className="absolute top-4 right-4 w-8 h-8 text-red-400 fill-red-400" />
            <Heart className="absolute bottom-4 left-4 w-8 h-8 text-red-400 fill-red-400" />
            <Heart className="absolute bottom-4 right-4 w-8 h-8 text-red-400 fill-red-400" />

            {/* Love Message */}
            <div className="relative z-10 size-full p-8 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-white/95 rounded-2xl p-8 shadow-2xl max-w-md mx-auto">
                  <p className="text-gray-800 text-xl leading-relaxed">
                    I love you so much and you mean the world to me
                  </p>
                </div>
              </motion.div>

              {/* Navigation hints */}
              <motion.div
                className="absolute bottom-8 left-8 text-white/70 flex items-center gap-2"
                animate={{ x: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="w-6 h-6 border-l-2 border-b-2 border-white/70 rotate-[45deg]" />
                <span>Swipe left to go back</span>
              </motion.div>
              
              <motion.div
                className="absolute bottom-8 right-8 text-white/70 flex items-center gap-2"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span>Swipe right for gallery</span>
                <div className="w-6 h-6 border-r-2 border-b-2 border-white/70 rotate-[-45deg]" />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="page3"
            initial={{ x: window.innerWidth }}
            animate={{ x: 0 }}
            exit={{ x: window.innerWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="size-full p-8 overflow-auto"
            onPanEnd={(event, info) => {
              if (info.offset.x > 100) {
                handleSwipeLeft();
              }
            }}
          >
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl text-white mb-4"
              >
                Our Gallery
              </motion.h1>
            </div>

            {/* Love Message Popup for Gallery Images */}
            <AnimatePresence>
              {clickedImageMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white/95 rounded-2xl p-6 shadow-2xl"
                >
                  <div className="text-center">
                    <p className="text-red-500 text-xl">
                      {clickedImageMessage}
                    </p>
                    <div className="flex justify-center mt-2">
                      <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gallery Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {galleryImages.map((imageUrl, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: Math.random() * 4 - 2
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleImageClick}
                  className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20 cursor-pointer overflow-hidden"
                >
                  <div className="w-full h-40 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={imageUrl}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Navigation hint */}
            <motion.div
              className="absolute bottom-8 left-8 text-white/70 flex items-center gap-2"
              animate={{ x: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-6 h-6 border-l-2 border-b-2 border-white/70 rotate-[45deg]" />
              <span>Swipe left to go back</span>
            </motion.div>

            {/* Floating Hearts Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 6 }, (_, index) => (
                <motion.div
                  key={`floating-${index}`}
                  className="absolute"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 100,
                    rotate: 0,
                  }}
                  animate={{
                    y: -100,
                    rotate: 360,
                  }}
                  transition={{
                    duration: Math.random() * 8 + 12,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: "linear"
                  }}
                >
                  <Heart className="w-6 h-6 text-red-400/30 fill-red-400/30" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}