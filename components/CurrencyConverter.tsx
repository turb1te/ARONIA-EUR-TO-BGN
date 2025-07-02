import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { ArrowRightLeft, Calculator } from 'lucide-react'
import { convertCurrency, ConversionDirection, ConversionResult, FIXED_RATE } from '../lib/utils'

interface CurrencyConverterProps {
  onConversion: (result: ConversionResult) => void
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ onConversion }) => {
  const [amount, setAmount] = useState<string>('')
  const [direction, setDirection] = useState<ConversionDirection>('BGN_TO_EUR')
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleConvert = () => {
    const numericAmount = parseFloat(amount)
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setResult({
        input: numericAmount,
        raw: 0,
        rounded: 0,
        thirdDigit: 0,
        direction,
        explanation: 'Моля въведете валидна сума',
        isValid: false
      })
      return
    }

    setIsAnimating(true)
    const conversionResult = convertCurrency(numericAmount, direction)
    setResult(conversionResult)
    onConversion(conversionResult)
    
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleDirectionChange = (newDirection: ConversionDirection) => {
    setDirection(newDirection)
    setResult(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConvert()
    }
  }

  const formatNumber = (num: number, precision: number = 5) => {
    const formatted = num.toFixed(precision).replace(/\.?0+$/, '')
    
    // Highlight the third digit after decimal point
    const parts = formatted.split('.')
    if (parts.length === 2 && parts[1].length >= 3) {
      const beforeThird = parts[1].substring(0, 2)
      const thirdDigit = parts[1].substring(2, 3)
      const afterThird = parts[1].substring(3)
      
      return (
        <span>
          {parts[0]}.{beforeThird}
          <span className="font-bold text-lg">{thirdDigit}</span>
          {afterThird}
        </span>
      )
    }
    
    return formatted
  }

  const fromCurrency = direction === 'BGN_TO_EUR' ? 'BGN' : 'EUR'
  const toCurrency = direction === 'BGN_TO_EUR' ? 'EUR' : 'BGN'

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6" />
          BGN ↔ EUR Конвертор
        </CardTitle>
        <p className="text-muted-foreground">
          Официален курс: 1 EUR = {FIXED_RATE} BGN
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs 
          value={direction} 
          onValueChange={(value) => handleDirectionChange(value as ConversionDirection)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="BGN_TO_EUR" className="flex items-center gap-2">
              BGN → EUR
            </TabsTrigger>
            <TabsTrigger value="EUR_TO_BGN" className="flex items-center gap-2">
              EUR → BGN
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={direction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Сума в {fromCurrency}
              </label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder={`Въведете сума в ${fromCurrency}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-lg"
                aria-label={`Amount in ${fromCurrency}`}
              />
            </div>
            
            <Button 
              onClick={handleConvert} 
              className="w-full h-12 text-lg"
              disabled={isAnimating}
            >
              <motion.div
                animate={isAnimating ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={isAnimating ? { x: [0, 3, -3, 0] } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRightLeft className="h-5 w-5" />
                </motion.div>
                Конвертирай
              </motion.div>
            </Button>
          </TabsContent>
        </Tabs>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className={`p-4 rounded-lg border ${result.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              {result.isValid ? (
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Резултат</div>
                    <div className="text-3xl font-bold">
                      {result.rounded.toFixed(2)} {toCurrency}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Сурова стойност:</span>
                      <div className="text-muted-foreground">
                        {formatNumber(result.raw)} {toCurrency}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Закръгляване:</span>
                      <div className="text-muted-foreground">
                        {result.explanation}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                    Съгласно чл. 13 от българското законодателство
                  </div>
                </div>
              ) : (
                <div className="text-center text-red-600">
                  {result.explanation}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

export default CurrencyConverter 