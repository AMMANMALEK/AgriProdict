import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from '../App';
import { mockChartData } from '../mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Download, 
  Calendar, 
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';

const Reports = () => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedChart, setSelectedChart] = useState('yield');

  const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac'];

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting report as ${format}`);
    alert(`Report exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-800">{t('reports')}</h1>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 border-green-200">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExport('pdf')}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExport('excel')}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Chart Selection Tabs */}
      <div className="flex space-x-2 bg-green-50 p-1 rounded-lg w-fit">
        <Button
          variant={selectedChart === 'yield' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedChart('yield')}
          className={selectedChart === 'yield' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-100'}
        >
          <LineChartIcon className="h-4 w-4 mr-2" />
          Yield Trends
        </Button>
        <Button
          variant={selectedChart === 'soil' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedChart('soil')}
          className={selectedChart === 'soil' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-100'}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Soil Analysis
        </Button>
        <Button
          variant={selectedChart === 'weather' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedChart('weather')}
          className={selectedChart === 'weather' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-100'}
        >
          <PieChartIcon className="h-4 w-4 mr-2" />
          Weather Patterns
        </Button>
      </div>

      {/* Main Chart Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <TrendingUp className="h-5 w-5" />
                <span>
                  {selectedChart === 'yield' && 'Crop Yield Trends'}
                  {selectedChart === 'soil' && 'Soil Nutrient Analysis'}
                  {selectedChart === 'weather' && 'Weather Pattern Analysis'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {selectedChart === 'yield' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData.yieldTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#6b7280"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        fontSize={12}
                        label={{ value: 'Yield (T/Ha)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#f9fafb', 
                          border: '1px solid #d1d5db',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="yield" 
                        stroke="#16a34a" 
                        strokeWidth={3}
                        dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}

                {selectedChart === 'soil' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockChartData.soilHealth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="nutrient" 
                        stroke="#6b7280"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        fontSize={12}
                        label={{ value: 'Level (%)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#f9fafb', 
                          border: '1px solid #d1d5db',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        fill="#16a34a"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {selectedChart === 'weather' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockChartData.weatherPattern}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="day" 
                        stroke="#6b7280"
                        fontSize={12}
                      />
                      <YAxis 
                        yAxisId="temp"
                        stroke="#f59e0b"
                        fontSize={12}
                        label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                      />
                      <YAxis 
                        yAxisId="rain"
                        orientation="right"
                        stroke="#3b82f6"
                        fontSize={12}
                        label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#f9fafb', 
                          border: '1px solid #d1d5db',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        yAxisId="temp"
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', r: 3 }}
                      />
                      <Line 
                        yAxisId="rain"
                        type="monotone" 
                        dataKey="rainfall" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Statistics and Summary */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">25%</div>
                <div className="text-sm text-gray-600">Yield Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">18%</div>
                <div className="text-sm text-gray-600">Water Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">15%</div>
                <div className="text-sm text-gray-600">Cost Reduction</div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Best Performing Crop:</span>
                <span className="font-medium text-green-700">Rice</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Yield:</span>
                <span className="font-medium">6.1 T/Ha</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Soil Health Score:</span>
                <span className="font-medium text-green-600">78/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Weather Favorability:</span>
                <span className="font-medium text-blue-600">82%</span>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Based on Data */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Data Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Yield trend shows consistent improvement over 6 months</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Nitrogen levels are optimal for current crop rotation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Weather patterns favor extended growing season</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Consider diversifying crop portfolio for better risk management</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;