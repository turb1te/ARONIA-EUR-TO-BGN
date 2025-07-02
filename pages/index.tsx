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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">BGN ↔ EUR Конвертор</h1>
          <p className="text-muted-foreground text-lg">
            Конвертиране между български лева и евро съгласно българското законодателство
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Converter */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <CurrencyConverter onConversion={handleConversion} />
          </motion.div>

          {/* History */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
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
          className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground"
        >
          <p>
            Официален курс: 1 EUR = 1.95583 BGN | 
            Закръгляването се извършва съгласно чл. 13 от българското законодателство
          </p>
          <p className="mt-2">
            Made with ❤️ by Martin Kirekchiev
          </p>
        </motion.footer>
      </div>
    </div>
  )
} 