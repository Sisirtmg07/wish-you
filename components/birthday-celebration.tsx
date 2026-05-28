"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Heart, Home } from "lucide-react"
import { HeartTree } from "@/components/heart-tree"
import { TypewriterEffect } from "@/components/typewriter-effect"

export default function BirthdayCelebration() {
  const [showMessages, setShowMessages] = useState(false)
  const [showQuotes, setShowQuotes] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch((err) => {
        console.log("[v0] Autoplay prevented:", err)
      })
    }
  }, [isMuted])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
      if (!isMuted) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const handleHeartClick = () => {
    setShowMessages(true)
  }

  const handleHome = () => {
    setShowMessages(false)
    setShowQuotes(false)
  }

  const handleShowQuotes = () => {
    setShowQuotes(true)
  }

  const messages = [
    "Hey sunshine ☀️",
    "Happy Birthday 🎂🎈",
    "May God bless you 🍀",
    "And give u many happiness 💕",
    "Just saying... you're pretty awesome 😍",
    "Wishing you laughs, cake, and zero stress 💖",
    "Hope your day feels as special as it should 😉",
  ]

  const birthdayQuote =
    "Pemsang ji 💖, Happy Birthday to my love, the most special and beautiful person in my life! 🎉✨ I want you to know how much you mean to me and how deeply I care about you. Sometimes you may forget me or be a little careless 😅, but my love for you never changes. Your smile makes everything brighter, and your presence makes my world happier. 💕 May Buddha bless you with endless happiness, joy, peace, and all the beautiful moments you truly deserve. 🍀🎈 Enjoy your special day to the fullest, my love, and always remember how precious and wonderful you are to me! ❤️😘"

  const footerMessage = "Thanks for being you, with me 💖"

  const quotes = ["Happy birthday."]

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black">
      <audio ref={audioRef} loop>
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aud-04CqTUWj0syriA2zsNqYTBPNbMDrDG.mp3" type="audio/mp3" />
      </audio>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-2 md:gap-3 safe-area-top safe-area-right"
      >
        {(showMessages || showQuotes) && (
          <Button
            onClick={handleHome}
            size="icon"
            variant="ghost"
            className="rounded-full bg-transparent hover:bg-white/10 w-11 h-11 md:w-12 md:h-12 text-white"
          >
            <Home className="h-5 w-5 md:h-5 md:w-5" />
          </Button>
        )}
        {!showQuotes && (
          <Button
            onClick={toggleMute}
            size="icon"
            variant="ghost"
            className="rounded-full bg-transparent hover:bg-white/10 w-11 h-11 md:w-12 md:h-12 text-white"
          >
            {isMuted ? <VolumeX className="h-5 w-5 md:h-5 md:w-5" /> : <Volume2 className="h-5 w-5 md:h-5 md:w-5" />}
          </Button>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {!showMessages ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex h-full items-center justify-center px-4 safe-area-left safe-area-right"
          >
            <button
              onClick={handleHeartClick}
              className="group flex flex-col sm:flex-row items-center gap-4 sm:gap-6 cursor-pointer bg-transparent border-none"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="gpu-accelerated"
              >
                <Heart className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-pink-400 fill-pink-400" />
              </motion.div>

              <div className="text-center sm:text-left">
                <p className="text-white text-xl sm:text-2xl md:text-3xl font-light">Click Me :)</p>
                <p className="text-white text-xl sm:text-2xl md:text-3xl font-light mt-1">Birthday Queen !</p>
                <motion.div
                  className="h-0.5 bg-white mt-2 mx-auto sm:mx-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </button>
          </motion.div>
        ) : !showQuotes ? (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-full overflow-y-auto"
          >
            <HeartTree />

            <div className="relative z-10 flex min-h-full items-center justify-center px-4 sm:px-6 md:px-8 py-16 sm:py-20 safe-area-left safe-area-right safe-area-bottom">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl"
              >
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.5 + 1, duration: 0.3 }}
                      className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed break-words hyphens-auto"
                      style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
                    >
                      <TypewriterEffect
                        text={message}
                        delay={index * 1000 + 500}
                        speed={100}
                        className="inline-block"
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: messages.length * 1 + 2, duration: 0.5 }}
                    className="pt-6 sm:pt-8 md:pt-10"
                  >
                    <Button
                      onClick={handleShowQuotes}
                      variant="outline"
                      size="lg"
                      className="bg-pink-500/20 hover:bg-pink-500/30 border-pink-400 text-white backdrop-blur-sm text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full"
                    >
                      Click Me
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quotes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-full overflow-y-auto"
          >
            <HeartTree />

            <div className="relative z-10 flex flex-col min-h-full py-8 sm:py-12 md:py-16 safe-area-top safe-area-bottom">
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 safe-area-left safe-area-right">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-6xl w-full"
                >
                  <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="flex-shrink-0"
                    >
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 sm:border-[5px] border-pink-300 shadow-2xl">
                        <img src="/birthday.jpg" alt="Birthday celebration" className="w-full h-full object-cover" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="w-full max-w-4xl"
                    >
                      <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-lg border-2 border-pink-400/40 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl">
                        <p
                          className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light leading-relaxed text-center italic"
                          style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            hyphens: "auto",
                            maxWidth: "100%",
                          }}
                        >
                          {birthdayQuote}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="relative z-10 pb-6 sm:pb-8 px-4 sm:px-6 safe-area-left safe-area-right"
              >
                <div className="max-w-6xl mx-auto">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-center shadow-lg">
                    <p
                      className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg font-light italic break-words"
                      style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
                    >
                      {footerMessage}
                    </p>
                  </div>
                </div>
              </motion.footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
