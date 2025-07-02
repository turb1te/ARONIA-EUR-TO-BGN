# BGN ↔ EUR Converter

A modern web application for converting between Bulgarian Leva (BGN) and Euro (EUR) according to Bulgarian legal requirements.

## 🌟 Features

- **Official Exchange Rate**: Uses the fixed rate of 1 EUR = 1.95583 BGN
- **Legal Compliance**: Implements Article 13 rounding rules from Bulgarian legislation
- **Bidirectional Conversion**: Convert from BGN to EUR and EUR to BGN
- **Conversion History**: Track all your conversions with detailed explanations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Built with Framer Motion for fluid user experience

## 🔧 Technologies

- **Next.js 15.3.4** with TypeScript
- **React 18** for UI components
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** components for accessibility
- **shadcn/ui** component library

## 🏗️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ARONIA-EUR-TO-BGN.git
cd ARONIA-EUR-TO-BGN
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Build and deploy:
```bash
npm run deploy
```

The app will be available at `https://yourusername.github.io/ARONIA-EUR-TO-BGN/`

### Local Build

To build for production:
```bash
npm run build
```

To export static files:
```bash
npm run export
```

## 📊 Conversion Logic

### Exchange Rate
```typescript
const FIXED_RATE = 1.95583;
```

### BGN to EUR
```typescript
const euroRaw = bgn / FIXED_RATE;
```

### EUR to BGN
```typescript
const bgnRaw = eur * FIXED_RATE;
```

### Rounding Rules (Article 13)
```typescript
function roundToTwoDecimals(value: number) {
  const thirdDigit = Math.floor((value * 1000) % 10);
  const rounded = thirdDigit >= 5
    ? Math.ceil(value * 100) / 100
    : Math.floor(value * 100) / 100;
  return { rounded, thirdDigit };
}
```

## 🧪 Test Cases

### BGN → EUR
- 12.344 BGN → 6.3134 EUR → 6.31 EUR (third digit = 3 < 5)
- 100 BGN → 51.1292 EUR → 51.13 EUR (third digit = 9 ≥ 5)

### EUR → BGN
- 10 EUR → 19.5583 BGN → 19.56 BGN (third digit = 8 ≥ 5)

## 📱 Usage

1. **Select Conversion Direction**: Choose between BGN → EUR or EUR → BGN
2. **Enter Amount**: Input the amount you want to convert
3. **Convert**: Click the convert button or press Enter
4. **View Results**: See the raw result, rounded result, and explanation
5. **Check History**: View all your previous conversions in the history panel

## 🎨 Design Features

- **Modern UI**: Clean, professional design with smooth transitions
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive**: Optimized for all screen sizes
- **Static Export**: Optimized for GitHub Pages deployment
- **Animations**: Subtle animations enhance user experience

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub. 