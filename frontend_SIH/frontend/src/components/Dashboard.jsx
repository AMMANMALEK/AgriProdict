import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useLanguage, useUser } from '../App';
import { 
  mockWeatherData, 
  mockCropData, 
  mockSoilData, 
  mockRecommendations 
} from '../mockData';
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  TrendingUp,
  Leaf,
  Bug,
  Calendar,
  Target,
  AlertTriangle
} from 'lucide-react';

const Dashboard = () => {
  const { t } = useLanguage();
  const { userData } = useUser();

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'irrigation': return Droplets;
      case 'fertilizer': return Leaf;
      case 'pest': return Bug;
      case 'weather': return CloudRain;
      default: return AlertTriangle;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-800">{t('dashboard')}</h1>
          {userData && (
            <p className="text-gray-600 mt-1">
              Welcome back, <span className="font-medium text-green-700">{userData.fullName}</span>
              {userData.farmName && userData.farmName !== `${userData.fullName}'s Farm` && (
                <span> - {userData.farmName}</span>
              )}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Farm Overview Card - Show if user data is available */}
      {userData && (
        <div className="mb-6">
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-green-800 mb-2">
                    {userData.farmName || `${userData.fullName}'s Farm`}
                  </h2>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <div className="font-medium text-green-700">{userData.location}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Farm Size:</span>
                      <div className="font-medium text-green-700">{userData.farmSize} hectares</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Experience:</span>
                      <div className="font-medium text-green-700">{userData.experienceYears}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Farming Type:</span>
                      <div className="font-medium text-green-700">{userData.farmingTypeDisplay}</div>
                    </div>
                  </div>
                  {userData.primaryCrops && userData.primaryCrops.length > 0 && (
                    <div className="mt-3">
                      <span className="text-gray-600 text-sm">Primary Crops: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {userData.primaryCrops.map((crop, index) => (
                          <Badge key={index} className="bg-green-200 text-green-800 text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="hidden md:block">
                  <Target className="h-16 w-16 text-green-600 opacity-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Weather and Crop Prediction */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <CloudRain className="h-5 w-5" />
                <span>{t('currentWeather')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-6 w-6 text-orange-500" />
                  <span className="text-2xl font-bold">{mockWeatherData.temperature}°C</span>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {mockWeatherData.condition}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span>Humidity: {mockWeatherData.humidity}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span>Wind: {mockWeatherData.windSpeed} km/h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-4 w-4 text-blue-600" />
                  <span>Rainfall: {mockWeatherData.rainfall} mm</span>
                </div>
              </div>

              {/* 5-day forecast */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-2">5-Day Forecast</h4>
                <div className="space-y-2">
                  {mockWeatherData.forecast.map((day, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-medium">{day.day}</span>
                      <div className="flex items-center space-x-2">
                        <span>{day.temp}°C</span>
                        <Badge variant="secondary" className="text-xs">
                          {day.condition}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crop Yield Prediction */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <TrendingUp className="h-5 w-5" />
                <span>{t('yieldPrediction')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {mockCropData.predictedYield} T/Ha
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {userData?.primaryCrops?.[0] || mockCropData.selectedCrop} - {mockCropData.growthStage}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Confidence Level</span>
                  <span className="text-sm font-medium">{mockCropData.confidence}%</span>
                </div>
                <Progress value={mockCropData.confidence} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                  <div>
                    <span className="text-gray-600">Expected Harvest:</span>
                    <div className="font-medium">{mockCropData.expectedHarvest}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Days to Harvest:</span>
                    <div className="font-medium">{mockCropData.daysToHarvest} days</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Soil Health */}
        <div>
          <Card className="border-green-200 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Target className="h-5 w-5" />
                <span>{t('soilHealth')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {mockSoilData.healthScore}/100
                </div>
                <Badge className="bg-green-100 text-green-800">Good Health</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>pH Level</span>
                    <span className="font-medium">{mockSoilData.ph}</span>
                  </div>
                  <Progress value={(mockSoilData.ph / 14) * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Nitrogen (N)</span>
                    <span className="font-medium">{mockSoilData.nitrogen}%</span>
                  </div>
                  <Progress value={mockSoilData.nitrogen} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Phosphorus (P)</span>
                    <span className="font-medium">{mockSoilData.phosphorus}%</span>
                  </div>
                  <Progress value={mockSoilData.phosphorus} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Potassium (K)</span>
                    <span className="font-medium">{mockSoilData.potassium}%</span>
                  </div>
                  <Progress value={mockSoilData.potassium} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                  <div>
                    <span className="text-gray-600">Moisture:</span>
                    <div className="font-medium">{mockSoilData.moisture}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Temperature:</span>
                    <div className="font-medium">{mockSoilData.temperature}°C</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recommendations */}
        <div>
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">{t('recommendations')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecommendations.map((rec) => {
                const Icon = getRecommendationIcon(rec.type);
                return (
                  <div key={rec.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{rec.title}</h4>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Productivity Tracker */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Productivity Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">92%</div>
              <div className="text-sm text-gray-600">Crop Health</div>
              <Progress value={92} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">78%</div>
              <div className="text-sm text-gray-600">Water Efficiency</div>
              <Progress value={78} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">85%</div>
              <div className="text-sm text-gray-600">Nutrient Level</div>
              <Progress value={85} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">96%</div>
              <div className="text-sm text-gray-600">Pest Control</div>
              <Progress value={96} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;