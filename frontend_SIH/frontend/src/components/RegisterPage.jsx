import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { useLanguage, useUser } from '../App';
import { mockCrops } from '../mockData';
import { 
  Sprout, 
  Eye, 
  EyeOff, 
  Phone, 
  Mail, 
  Lock, 
  User, 
  MapPin,
  Wheat
} from 'lucide-react';

const RegisterPage = () => {
  const { t, currentLanguage, changeLanguage, languages, handleLogin } = useLanguage();
  const { updateUserData } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Farm Information
    farmName: '',
    location: '',
    farmSize: '',
    experience: '',
    primaryCrops: [],
    farmingType: '',
    
    // Preferences
    language: currentLanguage,
    notifications: true,
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCropSelection = (cropName) => {
    setFormData(prev => ({
      ...prev,
      primaryCrops: prev.primaryCrops.includes(cropName)
        ? prev.primaryCrops.filter(crop => crop !== cropName)
        : [...prev.primaryCrops, cropName]
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock registration process
    setTimeout(() => {
      console.log('Registration data:', formData);
      
      // Create user object from form data
      const newUser = {
        // Personal Information
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        
        // Farm Information
        farmName: formData.farmName || `${formData.fullName}'s Farm`,
        location: formData.location,
        farmSize: formData.farmSize,
        experience: formData.experience,
        primaryCrops: formData.primaryCrops,
        farmingType: formData.farmingType,
        
        // Preferences
        language: formData.language,
        notifications: formData.notifications,
        
        // Generated fields
        joinedDate: new Date().toISOString(),
        userId: Date.now().toString(),
        
        // Additional computed fields
        experienceYears: formData.experience === 'new' ? '0-2 years' : 
                        formData.experience === 'experienced' ? '3-10 years' : '10+ years',
        farmingTypeDisplay: formData.farmingType === 'organic' ? 'Organic Farming' :
                           formData.farmingType === 'conventional' ? 'Conventional Farming' : 'Mixed Farming'
      };
      
      // Update user data in context
      updateUserData(newUser);
      
      // Login with user data
      handleLogin(newUser);
      setIsLoading(false);
    }, 2000);
  };

  const getTranslation = (key) => {
    const registerTranslations = {
      en: {
        registerTitle: "Create Your Account",
        registerSubtitle: "Join thousands of farmers using AgriPredict",
        personalInfo: "Personal Information",
        farmInfo: "Farm Information",
        preferences: "Preferences",
        fullName: "Full Name",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        password: "Password",
        confirmPassword: "Confirm Password",
        farmName: "Farm Name",
        location: "Location",
        farmSize: "Farm Size (in hectares)",
        experience: "Farming Experience",
        primaryCrops: "Primary Crops",
        farmingType: "Farming Type",
        selectCrops: "Select your primary crops (max 5)",
        languagePreference: "Language Preference",
        notifications: "Receive notifications",
        terms: "I agree to the Terms of Service and Privacy Policy",
        nextStep: "Next Step",
        prevStep: "Previous",
        registerButton: "Create Account",
        alreadyAccount: "Already have an account?",
        loginHere: "Login here",
        enterFullName: "Enter your full name",
        enterEmail: "Enter your email address",
        enterPhone: "Enter your phone number",
        enterPassword: "Enter your password",
        confirmPass: "Confirm your password",
        enterFarmName: "Enter your farm name",
        enterLocation: "Enter your location",
        enterFarmSize: "e.g., 2.5",
        selectExperience: "Select experience level",
        selectFarmingType: "Select farming type",
        newFarmer: "New Farmer (0-2 years)",
        experienced: "Experienced (3-10 years)",
        expert: "Expert (10+ years)",
        organic: "Organic Farming",
        conventional: "Conventional Farming",
        mixed: "Mixed Farming",
        step: "Step"
      },
      hi: {
        registerTitle: "अपना खाता बनाएं",
        registerSubtitle: "AgriPredict का उपयोग करने वाले हजारों किसानों से जुड़ें",
        personalInfo: "व्यक्तिगत जानकारी",
        farmInfo: "खेत की जानकारी",
        preferences: "प्राथमिकताएं",
        fullName: "पूरा नाम",
        emailAddress: "ईमेल पता",
        phoneNumber: "फोन नंबर",
        password: "पासवर्ड",
        confirmPassword: "पासवर्ड की पुष्टि करें",
        farmName: "खेत का नाम",
        location: "स्थान",
        farmSize: "खेत का आकार (हेक्टेयर में)",
        experience: "खेती का अनुभव",
        primaryCrops: "मुख्य फसलें",
        farmingType: "खेती का प्रकार",
        selectCrops: "अपनी मुख्य फसलें चुनें (अधिकतम 5)",
        languagePreference: "भाषा प्राथमिकता",
        notifications: "सूचनाएं प्राप्त करें",
        terms: "मैं सेवा की शर्तों और गोपनीयता नीति से सहमत हूं",
        nextStep: "अगला चरण",
        prevStep: "पिछला",
        registerButton: "खाता बनाएं",
        alreadyAccount: "पहले से खाता है?",
        loginHere: "यहाँ लॉगिन करें",
        enterFullName: "अपना पूरा नाम दर्ज करें",
        enterEmail: "अपना ईमेल पता दर्ज करें",
        enterPhone: "अपना फोन नंबर दर्ज करें",
        enterPassword: "अपना पासवर्ड दर्ज करें",
        confirmPass: "अपने पासवर्ड की पुष्टि करें",
        enterFarmName: "अपने खेत का नाम दर्ज करें",
        enterLocation: "अपना स्थान दर्ज करें",
        enterFarmSize: "उदा., 2.5",
        selectExperience: "अनुभव स्तर चुनें",
        selectFarmingType: "खेती का प्रकार चुनें",
        newFarmer: "नया किसान (0-2 साल)",
        experienced: "अनुभवी (3-10 साल)",
        expert: "विशेषज्ञ (10+ साल)",
        organic: "जैविक खेती",
        conventional: "पारंपरिक खेती",
        mixed: "मिश्रित खेती",
        step: "चरण"
      },
      gu: {
        registerTitle: "તમારું એકાઉન્ટ બનાવો",
        registerSubtitle: "AgriPredict વાપરતા હજારો ખેડૂતો સાથે જોડાઓ",
        personalInfo: "વ્યક્તિગત માહિતી",
        farmInfo: "ખેતરની માહિતી",
        preferences: "પસંદગીઓ",
        fullName: "પૂરું નામ",
        emailAddress: "ઈમેલ સરનામું",
        phoneNumber: "ફોન નંબર",
        password: "પાસવર્ડ",
        confirmPassword: "પાસવર્ડ ની પુષ્ટિ કરો",
        farmName: "ખેતરનું નામ",
        location: "સ્થાન",
        farmSize: "ખેતરનું માપ (હેક્ટરમાં)",
        experience: "ખેતીનો અનુભવ",
        primaryCrops: "મુખ્ય પાકો",
        farmingType: "ખેતીનો પ્રકાર",
        selectCrops: "તમારા મુખ્ય પાકો પસંદ કરો (મહત્તમ 5)",
        languagePreference: "ભાષા પસંદગી",
        notifications: "સૂચનાઓ મેળવો",
        terms: "હું સેવાની શરતો અને ગોપનીયતા નીતિ સાથે સંમત છું",
        nextStep: "આગળનું પગલું",
        prevStep: "પાછળ",
        registerButton: "એકાઉન્ટ બનાવો",
        alreadyAccount: "પહેલેથી એકાઉન્ટ છે?",
        loginHere: "અહીં લોગિન કરો",
        enterFullName: "તમારું પૂરું નામ દાખલ કરો",
        enterEmail: "તમારું ઈમેલ સરનામું દાખલ કરો",
        enterPhone: "તમારો ફોન નંબર દાખલ કરો",
        enterPassword: "તમારો પાસવર્ડ દાખલ કરો",
        confirmPass: "તમારા પાસવર્ડની પુષ્ટિ કરો",
        enterFarmName: "તમારા ખેતરનું નામ દાખલ કરો",
        enterLocation: "તમારું સ્થાન દાખલ કરો",
        enterFarmSize: "દા.ત., 2.5",
        selectExperience: "અનુભવ સ્તર પસંદ કરો",
        selectFarmingType: "ખેતીનો પ્રકાર પસંદ કરો",
        newFarmer: "નવા ખેડૂત (0-2 વર્ષ)",
        experienced: "અનુભવી (3-10 વર્ષ)",
        expert: "નિષ્ણાત (10+ વર્ષ)",
        organic: "જૈવિક ખેતી",
        conventional: "પરંપરાગત ખેતી",
        mixed: "મિશ્ર ખેતી",
        step: "પગલું"
      },
      pa: {
        registerTitle: "ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ",
        registerSubtitle: "AgriPredict ਵਰਤਣ ਵਾਲੇ ਹਜ਼ਾਰਾਂ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ",
        personalInfo: "ਨਿੱਜੀ ਜਾਣਕਾਰੀ",
        farmInfo: "ਖੇਤ ਦੀ ਜਾਣਕਾਰੀ",
        preferences: "ਤਰਜੀਹਾਂ",
        fullName: "ਪੂਰਾ ਨਾਮ",
        emailAddress: "ਈਮੇਲ ਪਤਾ",
        phoneNumber: "ਫੋਨ ਨੰਬਰ",
        password: "ਪਾਸਵਰਡ",
        confirmPassword: "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
        farmName: "ਖੇਤ ਦਾ ਨਾਮ",
        location: "ਸਥਾਨ",
        farmSize: "ਖੇਤ ਦਾ ਅਕਾਰ (ਹੈਕਟੇਅਰ ਵਿੱਚ)",
        experience: "ਖੇਤੀ ਦਾ ਤਜਰਬਾ",
        primaryCrops: "ਮੁੱਖ ਫਸਲਾਂ",
        farmingType: "ਖੇਤੀ ਦੀ ਕਿਸਮ",
        selectCrops: "ਆਪਣੀਆਂ ਮੁੱਖ ਫਸਲਾਂ ਚੁਣੋ (ਵੱਧ ਤੋਂ ਵੱਧ 5)",
        languagePreference: "ਭਾਸ਼ਾ ਦੀ ਤਰਜੀਹ",
        notifications: "ਸੂਚਨਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ",
        terms: "ਮੈਂ ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ ਅਤੇ ਗੋਪਨੀਯਤਾ ਨੀਤੀ ਨਾਲ ਸਹਿਮਤ ਹਾਂ",
        nextStep: "ਅਗਲਾ ਕਦਮ",
        prevStep: "ਪਿਛਲਾ",
        registerButton: "ਖਾਤਾ ਬਣਾਓ",
        alreadyAccount: "ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?",
        loginHere: "ਇੱਥੇ ਲਾਗਇਨ ਕਰੋ",
        enterFullName: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
        enterEmail: "ਆਪਣਾ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ",
        enterPhone: "ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ",
        enterPassword: "ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
        confirmPass: "ਆਪਣੇ ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
        enterFarmName: "ਆਪਣੇ ਖੇਤ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ",
        enterLocation: "ਆਪਣਾ ਸਥਾਨ ਦਰਜ ਕਰੋ",
        enterFarmSize: "ਜਿਵੇਂ, 2.5",
        selectExperience: "ਤਜਰਬੇ ਦਾ ਪੱਧਰ ਚੁਣੋ",
        selectFarmingType: "ਖੇਤੀ ਦੀ ਕਿਸਮ ਚੁਣੋ",
        newFarmer: "ਨਵਾਂ ਕਿਸਾਨ (0-2 ਸਾਲ)",
        experienced: "ਤਜਰਬੇਕਾਰ (3-10 ਸਾਲ)",
        expert: "ਮਾਹਿਰ (10+ ਸਾਲ)",
        organic: "ਜੈਵਿਕ ਖੇਤੀ",
        conventional: "ਰਵਾਇਤੀ ਖੇਤੀ",
        mixed: "ਮਿਸ਼ਰਿਤ ਖੇਤੀ",
        step: "ਕਦਮ"
      },
      or: {
        registerTitle: "ଆପଣଙ୍କ ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ",
        registerSubtitle: "AgriPredict ବ୍ୟବହାର କରୁଥିବା ହଜାରେ କୃଷକଙ୍କ ସହ ଯୋଗ ଦିଅନ୍ତୁ",
        personalInfo: "ବ୍ୟକ୍ତିଗତ ସୂଚନା",
        farmInfo: "ଚାଷ ସୂଚନା",
        preferences: "ପସନ୍ଦ",
        fullName: "ପୂର୍ଣ୍ଣ ନାମ",
        emailAddress: "ଇମେଲ ଠିକଣା",
        phoneNumber: "ଫୋନ ନମ୍ବର",
        password: "ପାସୱାର୍ଡ",
        confirmPassword: "ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ",
        farmName: "ଚାଷର ନାମ",
        location: "ସ୍ଥାନ",
        farmSize: "ଚାଷର ଆକାର (ହେକ୍ଟରରେ)",
        experience: "ଚାଷ ଅଭିଜ୍ଞତା",
        primaryCrops: "ମୁଖ୍ୟ ଫସଲ",
        farmingType: "ଚାଷର ପ୍ରକାର",
        selectCrops: "ଆପଣଙ୍କ ମୁଖ୍ୟ ଫସଲ ଚୟନ କରନ୍ତୁ (ସର୍ବାଧିକ 5)",
        languagePreference: "ଭାଷା ପସନ୍ଦ",
        notifications: "ବିଜ୍ଞପ୍ତି ପାଆନ୍ତୁ",
        terms: "ମୁଁ ସେବା ସର୍ତ୍ତ ଏବଂ ଗୋପନୀୟତା ନୀତି ସହ ସହମତ",
        nextStep: "ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ",
        prevStep: "ପୂର୍ବବର୍ତ୍ତୀ",
        registerButton: "ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ",
        alreadyAccount: "ପୂର୍ବରୁ ଖାତା ଅଛି?",
        loginHere: "ଏଠାରେ ଲଗଇନ କରନ୍ତୁ",
        enterFullName: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ପ୍ରବେଶ କରନ୍ତୁ",
        enterEmail: "ଆପଣଙ୍କ ଇମେଲ ଠିକଣା ପ୍ରବେଶ କରନ୍ତୁ",
        enterPhone: "ଆପଣଙ୍କ ଫୋନ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ",
        enterPassword: "ଆପଣଙ୍କ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ",
        confirmPass: "ଆପଣଙ୍କ ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ",
        enterFarmName: "ଆପଣଙ୍କ ଚାଷର ନାମ ପ୍ରବେଶ କରନ୍ତୁ",
        enterLocation: "ଆପଣଙ୍କ ସ୍ଥାନ ପ୍ରବେଶ କରନ୍ତୁ",
        enterFarmSize: "ଯେପରି, 2.5",
        selectExperience: "ଅଭିଜ୍ଞତା ସ୍ତର ଚୟନ କରନ୍ତୁ",
        selectFarmingType: "ଚାଷ ପ୍ରକାର ଚୟନ କରନ୍ତୁ",
        newFarmer: "ନୂତନ କୃଷକ (0-2 ବର୍ଷ)",
        experienced: "ଅଭିଜ୍ଞ (3-10 ବର୍ଷ)",
        expert: "ବିଶେଷଜ୍ଞ (10+ ବର୍ଷ)",
        organic: "ଜୈବିକ ଚାଷ",
        conventional: "ପାରମ୍ପରିକ ଚାଷ",
        mixed: "ମିଶ୍ରିତ ଚାଷ",
        step: "ପଦକ୍ଷେପ"
      }
    };
    return registerTranslations[currentLanguage]?.[key] || registerTranslations.en[key] || key;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              {getTranslation('personalInfo')}
            </h3>
            
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                {getTranslation('fullName')}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={getTranslation('enterFullName')}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                {getTranslation('emailAddress')}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder={getTranslation('enterEmail')}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                {getTranslation('phoneNumber')}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={getTranslation('enterPhone')}
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                {getTranslation('password')}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={getTranslation('enterPassword')}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10 border-green-200 focus:border-green-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                {getTranslation('confirmPassword')}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={getTranslation('confirmPass')}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10 pr-10 border-green-200 focus:border-green-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              {getTranslation('farmInfo')}
            </h3>

            {/* Farm Name */}
            <div className="space-y-2">
              <Label htmlFor="farmName" className="text-sm font-medium text-gray-700">
                {getTranslation('farmName')}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Wheat className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="farmName"
                  type="text"
                  placeholder={getTranslation('enterFarmName')}
                  value={formData.farmName}
                  onChange={(e) => handleInputChange('farmName', e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                {getTranslation('location')}
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="location"
                  type="text"
                  placeholder={getTranslation('enterLocation')}
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="pl-10 border-green-200 focus:border-green-500"
                  required
                />
              </div>
            </div>

            {/* Farm Size */}
            <div className="space-y-2">
              <Label htmlFor="farmSize" className="text-sm font-medium text-gray-700">
                {getTranslation('farmSize')}
              </Label>
              <Input
                id="farmSize"
                type="number"
                step="0.1"
                placeholder={getTranslation('enterFarmSize')}
                value={formData.farmSize}
                onChange={(e) => handleInputChange('farmSize', e.target.value)}
                className="border-green-200 focus:border-green-500"
                required
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {getTranslation('experience')}
              </Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue placeholder={getTranslation('selectExperience')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">{getTranslation('newFarmer')}</SelectItem>
                  <SelectItem value="experienced">{getTranslation('experienced')}</SelectItem>
                  <SelectItem value="expert">{getTranslation('expert')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Farming Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {getTranslation('farmingType')}
              </Label>
              <Select value={formData.farmingType} onValueChange={(value) => handleInputChange('farmingType', value)}>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue placeholder={getTranslation('selectFarmingType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">{getTranslation('organic')}</SelectItem>
                  <SelectItem value="conventional">{getTranslation('conventional')}</SelectItem>
                  <SelectItem value="mixed">{getTranslation('mixed')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Primary Crops */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {getTranslation('primaryCrops')}
              </Label>
              <p className="text-xs text-gray-500 mb-2">{getTranslation('selectCrops')}</p>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-2">
                {mockCrops.slice(0, 8).map((crop) => (
                  <div key={crop.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`crop-${crop.id}`}
                      checked={formData.primaryCrops.includes(crop.name)}
                      onCheckedChange={() => handleCropSelection(crop.name)}
                      disabled={formData.primaryCrops.length >= 5 && !formData.primaryCrops.includes(crop.name)}
                    />
                    <Label htmlFor={`crop-${crop.id}`} className="text-sm">
                      {crop.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              {getTranslation('preferences')}
            </h3>

            {/* Language Preference */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                {getTranslation('languagePreference')}
              </Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger className="border-green-200 focus:border-green-500">
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

            {/* Notifications */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notifications"
                checked={formData.notifications}
                onCheckedChange={(checked) => handleInputChange('notifications', checked)}
              />
              <Label htmlFor="notifications" className="text-sm text-gray-700">
                {getTranslation('notifications')}
              </Label>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => handleInputChange('terms', checked)}
                required
              />
              <Label htmlFor="terms" className="text-sm text-gray-700">
                {getTranslation('terms')}
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">AgriPredict</h1>
            </Link>
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
      </div>

      {/* Registration Form */}
      <div className="w-full max-w-lg mt-20">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              {getTranslation('registerTitle')}
            </CardTitle>
            <p className="text-gray-600">{getTranslation('registerSubtitle')}</p>
            
            {/* Step Indicator */}
            <div className="flex justify-center space-x-2 pt-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep
                      ? 'bg-green-600 text-white'
                      : step < currentStep
                      ? 'bg-green-200 text-green-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {getTranslation('step')} {currentStep} of 3
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 space-x-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    {getTranslation('prevStep')}
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-green-600 hover:bg-green-700 text-white ml-auto"
                  >
                    {getTranslation('nextStep')}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white ml-auto"
                    disabled={isLoading || !formData.terms}
                  >
                    {isLoading ? 'Creating...' : getTranslation('registerButton')}
                  </Button>
                )}
              </div>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  {getTranslation('alreadyAccount')}{' '}
                  <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">
                    {getTranslation('loginHere')}
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;