import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from '../App';
import { Sprout, TrendingUp, CloudRain, Leaf } from 'lucide-react';

const LandingPage = () => {
  const { t, currentLanguage, changeLanguage, languages } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">AgriPredict</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.nativeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-green-800 mb-6">
            {t('welcome')}
          </h2>
          <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
            Empower your farming with AI-driven crop yield predictions, weather insights, and personalized recommendations for optimal agricultural productivity.
          </p>
          
          <div className="flex justify-center space-x-6">
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                {t('loginAsFramer')}
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
              >
                {t('registerAsFramer')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-green-800">Yield Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 text-center">
                AI-powered predictions for optimal crop yields based on historical data and current conditions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CloudRain className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-green-800">Weather Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 text-center">
                Real-time weather monitoring and forecasting to help plan your farming activities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-green-800">Soil Health</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 text-center">
                Comprehensive soil analysis and health monitoring for better crop management.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Sprout className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-green-800">Smart Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 text-center">
                Personalized farming recommendations for irrigation, fertilization, and pest control.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-green-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-green-800 font-medium">Farmers Trust Us</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-green-800 font-medium">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">25%</div>
              <div className="text-green-800 font-medium">Average Yield Increase</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 AgriPredict. Empowering farmers with intelligent agriculture solutions.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;