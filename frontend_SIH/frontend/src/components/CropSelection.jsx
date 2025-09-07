import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useLanguage } from '../App';
import { mockCrops, mockCropData } from '../mockData';
import { Search, Wheat, Calendar, TrendingUp, MapPin } from 'lucide-react';

const CropSelection = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState(null);

  const filteredCrops = mockCrops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.variety.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = selectedSeason === 'all' || crop.season === selectedSeason;
    return matchesSearch && matchesSeason;
  });

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
  };

  const seasons = [...new Set(mockCrops.map(crop => crop.season))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-800">{t('cropSelection')}</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Search and Filters */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter Section */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Search className="h-5 w-5" />
                <span>Find Your Crop</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search crops by name or variety..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className="w-40 border-green-200">
                    <SelectValue placeholder="Season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Seasons</SelectItem>
                    {seasons.map((season) => (
                      <SelectItem key={season} value={season}>
                        {season}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Crops Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCrops.map((crop) => (
              <Card 
                key={crop.id} 
                className={`border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedCrop?.id === crop.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-green-200 hover:border-green-300'
                }`}
                onClick={() => handleCropSelect(crop)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Wheat className="h-6 w-6 text-green-600" />
                      <h3 className="font-semibold text-green-800">{crop.name}</h3>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      {crop.season}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Variety:</span> {crop.variety}
                  </p>
                  <Button 
                    size="sm" 
                    className={`w-full ${
                      selectedCrop?.id === crop.id 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {selectedCrop?.id === crop.id ? 'Selected' : 'Select Crop'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCrops.length === 0 && (
            <Card className="border-green-200">
              <CardContent className="p-8 text-center">
                <Wheat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No crops found matching your criteria.</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Selected Crop Info */}
        <div className="space-y-6">
          {selectedCrop ? (
            <>
              {/* Selected Crop Details */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-800">
                    <TrendingUp className="h-5 w-5" />
                    <span>Crop Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Wheat className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-800">{selectedCrop.name}</h3>
                    <p className="text-gray-600">{selectedCrop.variety}</p>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Season:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {selectedCrop.season}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Growth Duration:</span>
                      <span className="text-sm font-medium">90-120 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Soil Type:</span>
                      <span className="text-sm font-medium">Loamy, Well-drained</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Water Requirement:</span>
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Prediction for Selected Crop */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-800">
                    <Calendar className="h-5 w-5" />
                    <span>Yield Prediction</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {selectedCrop.name === 'Rice' ? '6.2' : selectedCrop.name === 'Wheat' ? '4.8' : '5.5'} T/Ha
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {selectedCrop.name === 'Rice' ? '85%' : selectedCrop.name === 'Wheat' ? '78%' : '82%'} Confidence
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expected Revenue:</span>
                      <span className="text-sm font-medium text-green-600">
                        ₹{selectedCrop.name === 'Rice' ? '1,24,000' : selectedCrop.name === 'Wheat' ? '96,000' : '1,10,000'}/Ha
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Best Planting Time:</span>
                      <span className="text-sm font-medium">
                        {selectedCrop.season === 'Kharif' ? 'June-July' : selectedCrop.season === 'Rabi' ? 'Nov-Dec' : 'Year Round'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Harvest Time:</span>
                      <span className="text-sm font-medium">
                        {selectedCrop.season === 'Kharif' ? 'Oct-Nov' : selectedCrop.season === 'Rabi' ? 'Mar-Apr' : 'Seasonal'}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">
                    Apply This Crop to Dashboard
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-800">
                    <MapPin className="h-5 w-5" />
                    <span>Growing Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Ensure proper drainage during monsoon</li>
                    <li>• Monitor soil pH levels regularly</li>
                    <li>• Apply organic fertilizer before planting</li>
                    <li>• Watch for pest activity during flowering</li>
                    <li>• Maintain adequate spacing between plants</li>
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-green-200">
              <CardContent className="p-8 text-center">
                <Wheat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">Select a Crop</h3>
                <p className="text-gray-600">Choose a crop from the list to see detailed information and yield predictions.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropSelection;