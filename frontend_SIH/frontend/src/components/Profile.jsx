import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { useLanguage, useUser } from '../App';
import { mockFarmerProfile } from '../mockData';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Edit3,
  Save,
  Settings,
  Globe,
  Wheat,
  BarChart3
} from 'lucide-react';

const Profile = () => {
  const { t, currentLanguage, changeLanguage, languages } = useLanguage();
  const { userData, updateUserData } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  // Use actual user data if available, otherwise fall back to mock data
  const [profileData, setProfileData] = useState(() => {
    if (userData) {
      return {
        name: userData.fullName || mockFarmerProfile.name,
        location: userData.location || mockFarmerProfile.location,
        farmSize: userData.farmSize ? `${userData.farmSize} hectares` : mockFarmerProfile.farmSize,
        experience: userData.experienceYears || mockFarmerProfile.experience,
        primaryCrops: userData.primaryCrops || mockFarmerProfile.primaryCrops,
        phone: userData.phone || mockFarmerProfile.phone,
        email: userData.email || mockFarmerProfile.email,
        language: userData.language || mockFarmerProfile.language,
        joinedDate: userData.joinedDate || mockFarmerProfile.joinedDate,
        farmName: userData.farmName || mockFarmerProfile.name,
        farmingType: userData.farmingTypeDisplay || 'Mixed Farming'
      };
    }
    return mockFarmerProfile;
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    
    // Update user data in context if userData exists
    if (userData) {
      const updatedUserData = {
        ...userData,
        fullName: profileData.name,
        location: profileData.location,
        farmSize: parseFloat(profileData.farmSize.replace(' hectares', '')),
        phone: profileData.phone,
        email: profileData.email,
        language: profileData.language,
        farmName: profileData.farmName
      };
      updateUserData(updatedUserData);
    }
    
    console.log('Profile updated:', profileData);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-800">{t('profile')}</h1>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-green-200 focus:border-green-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-md">
                      {profileData.name}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Location
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="border-green-200 focus:border-green-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-md flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{profileData.location}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="border-green-200 focus:border-green-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-md flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="border-green-200 focus:border-green-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-md flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{profileData.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farm Information */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Wheat className="h-5 w-5" />
                <span>Farm Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Farm Size
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.farmSize}
                      onChange={(e) => handleInputChange('farmSize', e.target.value)}
                      className="border-green-200 focus:border-green-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-md">
                      {profileData.farmSize}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Farming Experience
                  </label>
                  {isEditing ? (
                    <Input
                      value={profileData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="border-green-200 focus:border-green-500"
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded-md">
                      {profileData.experience}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Primary Crops
                </label>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(profileData.primaryCrops) ? profileData.primaryCrops : []).map((crop, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Farming Type - Show if available from registration */}
              {userData?.farmingTypeDisplay && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Farming Type
                    </label>
                    <div className="p-2 bg-gray-50 rounded-md">
                      {userData.farmingTypeDisplay}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Settings className="h-5 w-5" />
                <span>{t('settings')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  <Globe className="h-4 w-4 inline mr-2" />
                  Language Preference
                </label>
                <Select value={currentLanguage} onValueChange={changeLanguage}>
                  <SelectTrigger className="w-full border-green-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.nativeName} ({lang.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Statistics and Quick Info */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg text-green-800">{profileData.name}</h3>
                <p className="text-gray-600">{profileData.location}</p>
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Member Since:</span>
                  <span className="text-sm font-medium">
                    {new Date(profileData.joinedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Farm Size:</span>
                  <span className="text-sm font-medium">{profileData.farmSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Experience:</span>
                  <span className="text-sm font-medium">{profileData.experience}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Farm Statistics */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <BarChart3 className="h-5 w-5" />
                <span>Farm Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">42</div>
                <div className="text-sm text-gray-600">Total Predictions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">89%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">25%</div>
                <div className="text-sm text-gray-600">Yield Improvement</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start border-green-200 hover:bg-green-50"
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Farming Calendar
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-green-200 hover:bg-green-50"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Download Reports
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-green-200 hover:bg-green-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Notification Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;