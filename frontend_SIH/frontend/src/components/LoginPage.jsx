import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useLanguage, useUser } from '../App';
import { Sprout, Eye, EyeOff, Phone, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const { t, currentLanguage, changeLanguage, languages, handleLogin } = useLanguage();
  const { updateUserData } = useUser();
  const [formData, setFormData] = useState({
    loginMethod: 'email',
    email: '',
    phone: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login process
    setTimeout(() => {
      console.log('Login attempt:', formData);
      
      // Mock existing user data for demonstration
      const existingUser = {
        fullName: "Farmer Demo User",
        email: formData.email || formData.phone,
        phone: formData.phone || "+91 9876543210",
        farmName: "Demo Agriculture Farm",
        location: "Punjab, India",
        farmSize: "4.5",
        experience: "experienced",
        primaryCrops: ["Rice", "Wheat"],
        farmingType: "conventional",
        language: currentLanguage,
        notifications: true,
        joinedDate: "2023-01-15T00:00:00.000Z",
        userId: "demo123",
        experienceYears: "3-10 years",
        farmingTypeDisplay: "Conventional Farming"
      };
      
      // Update user data in context
      updateUserData(existingUser);
      
      // Login with user data
      handleLogin(existingUser);
      setIsLoading(false);
    }, 1500);
  };

  const getTranslation = (key) => {
    const loginTranslations = {
      en: {
        loginTitle: "Login to AgriPredict",
        loginSubtitle: "Access your farming dashboard",
        emailLogin: "Email Address",
        phoneLogin: "Phone Number",
        loginWith: "Login with",
        password: "Password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot Password?",
        loginButton: "Login",
        noAccount: "Don't have an account?",
        registerHere: "Register here",
        orContinueWith: "Or continue with",
        loginSuccess: "Login successful! Redirecting...",
        invalidCredentials: "Invalid credentials. Please try again.",
        enterEmail: "Enter your email address",
        enterPhone: "Enter your phone number",
        enterPassword: "Enter your password"
      },
      hi: {
        loginTitle: "AgriPredict में लॉगिन करें",
        loginSubtitle: "अपने खेती डैशबोर्ड तक पहुंचें",
        emailLogin: "ईमेल पता",
        phoneLogin: "फोन नंबर",
        loginWith: "लॉगिन करें",
        password: "पासवर्ड",
        rememberMe: "मुझे याद रखें",
        forgotPassword: "पासवर्ड भूल गए?",
        loginButton: "लॉगिन करें",
        noAccount: "कोई खाता नहीं है?",
        registerHere: "यहाँ पंजीकरण करें",
        orContinueWith: "या जारी रखें",
        loginSuccess: "लॉगिन सफल! रीडायरेक्ट हो रहा है...",
        invalidCredentials: "गलत प्रमाण पत्र। कृपया पुनः प्रयास करें।",
        enterEmail: "अपना ईमेल पता दर्ज करें",
        enterPhone: "अपना फोन नंबर दर्ज करें",
        enterPassword: "अपना पासवर्ड दर्ज करें"
      },
      gu: {
        loginTitle: "AgriPredict માં લોગિન કરો",
        loginSubtitle: "તમારા ખેતી ડેશબોર્ડ સુધી પહોંચો",
        emailLogin: "ઈમેલ સરનામું",
        phoneLogin: "ફોન નંબર",
        loginWith: "લોગિન કરો",
        password: "પાસવર્ડ",
        rememberMe: "મને યાદ રાખો",
        forgotPassword: "પાસવર્ડ ભૂલી ગયા?",
        loginButton: "લોગિન કરો",
        noAccount: "કોઈ એકાઉન્ટ નથી?",
        registerHere: "અહીં નોંધણી કરો",
        orContinueWith: "અથવા ચાલુ રાખો",
        loginSuccess: "લોગિન સફળ! રીડાયરેક્ટ થઈ રહ્યું છે...",
        invalidCredentials: "ખોટી માહિતી. કૃપા કરીને ફરી પ્રયાસ કરો.",
        enterEmail: "તમારું ઈમેલ સરનામું દાખલ કરો",
        enterPhone: "તમારો ફોન નંબર દાખલ કરો",
        enterPassword: "તમારો પાસવર્ડ દાખલ કરો"
      },
      pa: {
        loginTitle: "AgriPredict ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ",
        loginSubtitle: "ਆਪਣੇ ਖੇਤੀ ਡੈਸ਼ਬੋਰਡ ਤੱਕ ਪਹੁੰਚ ਕਰੋ",
        emailLogin: "ਈਮੇਲ ਪਤਾ",
        phoneLogin: "ਫੋਨ ਨੰਬਰ",
        loginWith: "ਲਾਗਇਨ ਕਰੋ",
        password: "ਪਾਸਵਰਡ",
        rememberMe: "ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ",
        forgotPassword: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
        loginButton: "ਲਾਗਇਨ ਕਰੋ",
        noAccount: "ਕੋਈ ਖਾਤਾ ਨਹੀਂ ਹੈ?",
        registerHere: "ਇੱਥੇ ਰਜਿਸਟਰ ਕਰੋ",
        orContinueWith: "ਜਾਂ ਜਾਰੀ ਰੱਖੋ",
        loginSuccess: "ਲਾਗਇਨ ਸਫਲ! ਰੀਡਾਇਰੈਕਟ ਹੋ ਰਿਹਾ ਹੈ...",
        invalidCredentials: "ਗਲਤ ਪ੍ਰਮਾਣ ਪੱਤਰ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
        enterEmail: "ਆਪਣਾ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ",
        enterPhone: "ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ",
        enterPassword: "ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ"
      },
      or: {
        loginTitle: "AgriPredict ରେ ଲଗଇନ କରନ୍ତୁ",
        loginSubtitle: "ଆପଣଙ୍କ ଚାଷ ଡ୍ୟାସବୋର୍ଡକୁ ପ୍ରବେଶ କରନ୍ତୁ",
        emailLogin: "ଇମେଲ ଠିକଣା",
        phoneLogin: "ଫୋନ ନମ୍ବର",
        loginWith: "ଲଗଇନ କରନ୍ତୁ",
        password: "ପାସୱାର୍ଡ",
        rememberMe: "ମୋତେ ମନେ ରଖନ୍ତୁ",
        forgotPassword: "ପାସୱାର୍ଡ ଭୁଲି ଗଲେ?",
        loginButton: "ଲଗଇନ କରନ୍ତୁ",
        noAccount: "କୌଣସି ଖାତା ନାହିଁ?",
        registerHere: "ଏଠାରେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ",
        orContinueWith: "କିମ୍ବା ଚାଲୁ ରଖନ୍ତୁ",
        loginSuccess: "ଲଗଇନ ସଫଳ! ପୁନଃନିର୍ଦ୍ଦେଶ କରାଯାଉଛି...",
        invalidCredentials: "ଭୁଲ ପ୍ରମାଣପତ୍ର। ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।",
        enterEmail: "ଆପଣଙ୍କ ଇମେଲ ଠିକଣା ପ୍ରବେଶ କରନ୍ତୁ",
        enterPhone: "ଆପଣଙ୍କ ଫୋନ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ",
        enterPassword: "ଆପଣଙ୍କ ପାସୱାର୍ଡ ପ୍ରବେଶ କରନ୍ତୁ"
      }
    };
    return loginTranslations[currentLanguage]?.[key] || loginTranslations.en[key] || key;
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

      {/* Login Form */}
      <div className="w-full max-w-md mt-20">
        <Card className="border-green-200 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">
              {getTranslation('loginTitle')}
            </CardTitle>
            <p className="text-gray-600">{getTranslation('loginSubtitle')}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Login Method Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {getTranslation('loginWith')}
                </Label>
                <Select value={formData.loginMethod} onValueChange={(value) => handleInputChange('loginMethod', value)}>
                  <SelectTrigger className="border-green-200 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{getTranslation('emailLogin')}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="phone">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{getTranslation('phoneLogin')}</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email/Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="loginId" className="text-sm font-medium text-gray-700">
                  {formData.loginMethod === 'email' ? getTranslation('emailLogin') : getTranslation('phoneLogin')}
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {formData.loginMethod === 'email' ? (
                      <Mail className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Phone className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <Input
                    id="loginId"
                    type={formData.loginMethod === 'email' ? 'email' : 'tel'}
                    placeholder={formData.loginMethod === 'email' ? getTranslation('enterEmail') : getTranslation('enterPhone')}
                    value={formData.loginMethod === 'email' ? formData.email : formData.phone}
                    onChange={(e) => handleInputChange(formData.loginMethod, e.target.value)}
                    className="pl-10 border-green-200 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                    {getTranslation('rememberMe')}
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-800">
                  {getTranslation('forgotPassword')}
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : getTranslation('loginButton')}
              </Button>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {getTranslation('noAccount')}{' '}
                  <Link to="/register" className="text-green-600 hover:text-green-800 font-medium">
                    {getTranslation('registerHere')}
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

export default LoginPage;