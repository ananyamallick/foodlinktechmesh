🔗 **Live Demo**: [FoodLink Dashboard](https://foodlinktechmesh-bc7c831wp-ananyamallick2006-8238s-projects.vercel.app/)
# 🍽️ FoodLink Dashboard - AI-Powered Food Waste Reduction Platform

A comprehensive Next.js dashboard for managing food donations, NGO needs, and logistics with AI-powered matching and packaging assistance.

![Dashboard Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Enabled-orange?style=for-the-badge&logo=google)

## 🌟 Features

### 🤖 AI-Powered Matching
- **Smart Food Matching**: AI analyzes food items and matches them with NGO needs
- **Real-time Recommendations**: Instant suggestions for optimal food distribution
- **Impact Tracking**: Monitor food waste reduction and environmental impact

### 📊 Comprehensive Dashboard
- **Overview Analytics**: Real-time statistics and performance metrics
- **Logistics Management**: Track deliveries, packaging, and supplier performance
- **Impact Visualization**: Beautiful charts showing environmental and social impact

### 🎯 Indian Market Focus
- **Localized Content**: Indian food types, NGO names, and regional data
- **Regional Distribution**: Coverage across major Indian cities
- **Cultural Integration**: Indian cuisine and dietary preferences

### 💬 AI Chatbot Assistant
- **Packaging Guidance**: Expert advice on food preservation and packaging
- **Gemini AI Integration**: Powered by Google's Gemini AI
- **Fallback System**: Intelligent responses even when API limits are reached

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/foodlink-dashboard.git
   cd foodlink-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
foodlink-dashboard/
├── app/
│   ├── api/
│   │   └── gemini/          # Gemini AI API routes
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── ai-chatbot.tsx       # AI chatbot component
│   ├── food-upload-modal.tsx
│   ├── ngo-needs-modal.tsx
│   └── ai-matching-details.tsx
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
└── public/                  # Static assets
```

## 🎨 Key Components

### Dashboard Sections

1. **Overview Tab**
   - Real-time statistics
   - Recent activities
   - Quick actions

2. **Logistics & Delivery Tab**
   - Packaging operations
   - Supplier performance
   - Cost optimization

3. **Impact Tab**
   - Environmental metrics
   - Food waste reduction trends
   - Regional distribution

### AI Features

- **Food Upload Modal**: Upload and analyze food items
- **NGO Needs Modal**: Submit and manage NGO requirements
- **AI Matching Details**: View AI-powered recommendations
- **Packaging Assistant**: Get expert packaging advice

## 🔧 Configuration

### Gemini AI Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your environment variables
3. The chatbot will automatically use it for AI responses

### Customization

- **Themes**: Modify colors in `globals.css`
- **Data**: Update mock data in component files
- **Styling**: Customize with Tailwind CSS classes

## 📱 Responsive Design

- **Mobile-first**: Optimized for all screen sizes
- **Touch-friendly**: Intuitive mobile interactions
- **Progressive Enhancement**: Works without JavaScript

## 🎯 Features in Detail

### AI-Powered Food Matching
```typescript
// Example: AI analyzes food and suggests matches
const analyzeFood = async (foodItem: string) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    body: JSON.stringify({ message: foodItem })
  });
  return response.json();
};
```

### Real-time Analytics
- Live tracking of food donations
- Environmental impact calculations
- Performance metrics and KPIs

### Packaging Optimization
- Cost analysis and recommendations
- Supplier performance tracking
- Eco-friendly packaging suggestions

## 🌍 Environmental Impact

- **Food Waste Reduction**: Track kilograms of food saved
- **Carbon Footprint**: Monitor environmental benefits
- **Regional Coverage**: Impact across Indian cities
- **Sustainability Metrics**: Eco-friendly packaging usage


<div align="center">

**Made with ❤️ for reducing food waste in India**


</div>
