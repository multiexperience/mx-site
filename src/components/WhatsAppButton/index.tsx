import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showNotification, setShowNotification] = useState(true)
  const [hasUnread, setHasUnread] = useState(false)

  const handleClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in learning more about Multiexperience's services. Can we schedule a consultation?"
    )
    const whatsappNumber = "5513996773215" // Replace with actual WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(whatsappURL, '_blank')
    
    // Clear notification badge when clicked
    setHasUnread(false)
  }

  const handleCloseNotification = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowNotification(false)
    setHasUnread(true) // Show badge when notification is closed
  }

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 2, 
          type: "spring", 
          stiffness: 200, 
          damping: 20 
        }}
      >
        <div className="relative">
          <motion.button
            onClick={handleClick}
            onMouseEnter={() => {
              setIsHovered(true)
              setShowTooltip(true)
            }}
            onMouseLeave={() => {
              setIsHovered(false)
              setTimeout(() => setShowTooltip(false), 200)
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <motion.svg 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              animate={{ 
                rotate: isHovered ? 10 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
            </motion.svg>
            
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
            
            {/* Notification badge */}
            <AnimatePresence>
              {hasUnread && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-xs font-bold">1</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
              >
                Start a conversation!
                <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Notification bubble */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed bottom-24 right-6 z-40"
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0 }}
            transition={{ delay: 4, duration: 0.5 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl p-4 max-w-xs border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">M</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Multiexperience Team</p>
                  <p className="text-xs text-gray-600">👋 Hi! Need help with your project? Let's chat!</p>
                </div>
                <motion.button
                  onClick={handleCloseNotification}
                  className="text-gray-400 hover:text-gray-600 text-sm p-1 -m-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsAppButton