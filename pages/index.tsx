import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CurrencyConverter from '../components/CurrencyConverter'
import ConversionHistory from '../components/ConversionHistory'
import { ConversionResult } from '../lib/utils'

export default function Home() {
  const [history, setHistory] = useState<ConversionResult[]>([])

  const handleConversion = (result: ConversionResult) => {
    if (result.isValid) {
      setHistory(prev => [...prev, result])
    }
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">BGN ↔ EUR — Валутен Калкулатор</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-2 sm:px-4">
            Конвертиране между български лева и евро съгласно българското законодателство за приемане на еврото в България
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-1 xl:grid-cols-5 lg:gap-6">
          {/* Converter */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="xl:col-span-3"
          >
            <CurrencyConverter onConversion={handleConversion} />
          </motion.div>

          {/* History */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:col-span-2"
          >
            <ConversionHistory 
              history={history}
              onClearHistory={handleClearHistory}
            />
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t text-center text-xs sm:text-sm text-muted-foreground"
        >
          <p className="px-2 sm:px-4">
            Официален фиксиран курс: 1 EUR = 1.95583 BGN, приет със закон през октомври 2022 година
          </p>
          <p className="mt-2">
            Made with ❤️ by Martin Kirekchiev
          </p>
        </motion.footer>
      </div>
    </div>
  )
} 