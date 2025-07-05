import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Trash2, Clock } from 'lucide-react'
import { ConversionResult } from '../lib/utils'

interface ConversionHistoryProps {
  history: ConversionResult[]
  onClearHistory: () => void
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({
  history,
  onClearHistory,
}) => {
  const formatCurrency = (amount: number, currency: string) =>
    `${amount.toFixed(2)} ${currency}`

  const formatRawValue = (amount: number, currency: string) => {
    const formatted = amount.toFixed(5).replace(/\.?0+$/, '')
    
    // Highlight the third digit after decimal point
    const parts = formatted.split('.')
    if (parts.length === 2 && parts[1].length >= 3) {
      const beforeThird = parts[1].substring(0, 2)
      const thirdDigit = parts[1].substring(2, 3)
      const afterThird = parts[1].substring(3)
      
      return (
        <span>
          {parts[0]}.{beforeThird}
          <span className="font-bold">{thirdDigit}</span>
          {afterThird} {currency}
        </span>
      )
    }
    
    return `${formatted} ${currency}`
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="break-words">
            История на конверсиите ({history.length})
          </span>
        </CardTitle>
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearHistory}
            className="hover:bg-destructive hover:text-destructive-foreground w-full sm:w-auto h-9 sm:h-8"
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Изчисти
          </Button>
        )}
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="space-y-2 max-h-64 sm:max-h-80 overflow-y-auto scrollbar-thin" style={{ maxHeight: 'calc(5 * 5rem)' }}>
          <AnimatePresence>
            {history.length === 0 ? (
              <p className="text-muted-foreground text-center py-6 sm:py-8 text-sm sm:text-base">
                Няма записи в историята
              </p>
            ) : (
              history.slice().reverse().map((conversion, index) => {
                const fromCurrency = conversion.direction === 'BGN_TO_EUR' ? 'BGN' : 'EUR'
                const toCurrency = conversion.direction === 'BGN_TO_EUR' ? 'EUR' : 'BGN'
                
                return (
                  <motion.div
                    key={`${conversion.input}-${conversion.direction}-${index}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 sm:p-4 bg-muted/50 rounded-lg border"
                  >
                    <div className="space-y-2 sm:space-y-3">
                      {/* Main conversion display */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="text-sm sm:text-base font-medium break-all">
                          {formatCurrency(conversion.input, fromCurrency)} →{' '}
                          {formatCurrency(conversion.rounded, toCurrency)}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground break-words order-last sm:order-none">
                          {conversion.explanation}
                        </div>
                      </div>
                      
                      {/* Raw value */}
                      <div className="text-xs sm:text-sm text-muted-foreground break-all">
                        <span className="font-medium">Сурова стойност:</span>{' '}
                        {formatRawValue(conversion.raw, toCurrency)}
                      </div>
                    </div>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}

export default ConversionHistory 