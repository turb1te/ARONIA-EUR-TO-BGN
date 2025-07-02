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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          История на конверсиите ({history.length})
        </CardTitle>
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearHistory}
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Изчисти
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-80 overflow-y-auto" style={{ maxHeight: 'calc(5 * 5rem)' }}>
          <AnimatePresence>
            {history.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
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
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border min-w-0"
                  >
                    <div className="flex flex-col space-y-1 flex-1 min-w-0">
                      <div className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                        {formatCurrency(conversion.input, fromCurrency)} →{' '}
                        {formatCurrency(conversion.rounded, toCurrency)}
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                        Сурова стойност: {formatRawValue(conversion.raw, toCurrency)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right ml-2 flex-shrink-0">
                      {conversion.explanation}
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