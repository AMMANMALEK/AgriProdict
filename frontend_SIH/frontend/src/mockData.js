// Mock data for the Crop Yield Prediction app

export const mockWeatherData = {
  temperature: 28,
  humidity: 65,
  rainfall: 12,
  windSpeed: 15,
  condition: "Partly Cloudy",
  forecast: [
    { day: "Today", temp: 28, condition: "Partly Cloudy" },
    { day: "Tomorrow", temp: 31, condition: "Sunny" },
    { day: "Day 3", temp: 26, condition: "Rainy" },
    { day: "Day 4", temp: 29, condition: "Sunny" },
    { day: "Day 5", temp: 25, condition: "Cloudy" }
  ]
};

export const mockCropData = {
  selectedCrop: "Rice",
  predictedYield: 6.2,
  expectedHarvest: "3.2 tonnes/hectare",
  confidence: 85,
  growthStage: "Flowering",
  daysToHarvest: 45
};

export const mockSoilData = {
  ph: 6.8,
  nitrogen: 45,
  phosphorus: 32,
  potassium: 28,
  organicMatter: 3.2,
  moisture: 68,
  temperature: 24,
  healthScore: 78
};

export const mockRecommendations = [
  {
    id: 1,
    type: "irrigation",
    title: "Irrigation Schedule",
    description: "Increase watering frequency. Next irrigation recommended in 2 days.",
    priority: "high",
    icon: "droplets"
  },
  {
    id: 2,
    type: "fertilizer",
    title: "Nutrient Management",
    description: "Apply phosphorus-rich fertilizer to boost flowering stage.",
    priority: "medium",
    icon: "leaf"
  },
  {
    id: 3,
    type: "pest",
    title: "Pest Control",
    description: "Monitor for brown planthopper. Preventive spray recommended.",
    priority: "low",
    icon: "bug"
  },
  {
    id: 4,
    type: "weather",
    title: "Weather Alert",
    description: "Heavy rainfall expected in 3 days. Prepare drainage systems.",
    priority: "high",
    icon: "cloud-rain"
  }
];

export const mockNotifications = [
  {
    id: 1,
    type: "weather",
    title: "Rain Alert",
    message: "Heavy rainfall expected tomorrow. Secure your crops.",
    time: "2 hours ago",
    priority: "high",
    icon: "cloud-rain"
  },
  {
    id: 2,
    type: "pest",
    title: "Pest Risk Alert",
    message: "Brown planthopper activity detected in nearby farms.",
    time: "6 hours ago",
    priority: "medium",
    icon: "bug"
  },
  {
    id: 3,
    type: "irrigation",
    title: "Irrigation Reminder",
    message: "Time to water your rice crop. Soil moisture is at 45%.",
    time: "1 day ago",
    priority: "low",
    icon: "droplets"
  },
  {
    id: 4,
    type: "harvest",
    title: "Harvest Update",
    message: "Your rice crop will be ready for harvest in 45 days.",
    time: "2 days ago",
    priority: "low",
    icon: "wheat"
  }
];

export const mockChartData = {
  yieldTrend: [
    { month: "Jan", yield: 5.2 },
    { month: "Feb", yield: 5.8 },
    { month: "Mar", yield: 6.1 },
    { month: "Apr", yield: 5.9 },
    { month: "May", yield: 6.3 },
    { month: "Jun", yield: 6.7 }
  ],
  soilHealth: [
    { nutrient: "Nitrogen", value: 45 },
    { nutrient: "Phosphorus", value: 32 },
    { nutrient: "Potassium", value: 28 },
    { nutrient: "Organic Matter", value: 65 }
  ],
  weatherPattern: [
    { day: "Mon", temperature: 28, rainfall: 0 },
    { day: "Tue", temperature: 31, rainfall: 2 },
    { day: "Wed", temperature: 26, rainfall: 15 },
    { day: "Thu", temperature: 29, rainfall: 5 },
    { day: "Fri", temperature: 25, rainfall: 8 },
    { day: "Sat", temperature: 27, rainfall: 0 },
    { day: "Sun", temperature: 30, rainfall: 3 }
  ]
};

export const mockCrops = [
  { id: 1, name: "Rice", variety: "Basmati", season: "Kharif" },
  { id: 2, name: "Wheat", variety: "Durum", season: "Rabi" },
  { id: 3, name: "Maize", variety: "Sweet Corn", season: "Kharif" },
  { id: 4, name: "Cotton", variety: "Bt Cotton", season: "Kharif" },
  { id: 5, name: "Sugarcane", variety: "Co-86032", season: "Annual" },
  { id: 6, name: "Soybean", variety: "JS-335", season: "Kharif" },
  { id: 7, name: "Groundnut", variety: "TMV-2", season: "Kharif" },
  { id: 8, name: "Mustard", variety: "Pusa Bold", season: "Rabi" }
];

export const mockFarmerProfile = {
  name: "Ramesh Kumar",
  location: "Punjab, India",
  farmSize: "5.2 hectares",
  experience: "15 years",
  primaryCrops: ["Rice", "Wheat", "Maize"],
  phone: "+91 98765 43210",
  email: "ramesh.farmer@email.com",
  language: "English",
  joinedDate: "2020-03-15"
};

export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" }
];

export const translations = {
  en: {
    dashboard: "Dashboard",
    cropSelection: "Crop Selection",
    reports: "Reports & Insights",
    notifications: "Notifications",
    profile: "Profile",
    settings: "Settings",
    welcome: "Welcome to AgriPredict",
    loginAsFramer: "Login as Farmer",
    registerAsFramer: "Register as Farmer",
    currentWeather: "Current Weather",
    soilHealth: "Soil Health",
    recommendations: "Recommendations",
    yieldPrediction: "Yield Prediction"
  },
  hi: {
    dashboard: "डैशबोर्ड",
    cropSelection: "फसल चयन",
    reports: "रिपोर्ट और अंतर्दृष्टि",
    notifications: "अधिसूचनाएं",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",
    welcome: "AgriPredict में आपका स्वागत है",
    loginAsFramer: "किसान के रूप में लॉगिन करें",
    registerAsFramer: "किसान के रूप में पंजीकरण करें",
    currentWeather: "वर्तमान मौसम",
    soilHealth: "मिट्टी की स्वास्थ्य",
    recommendations: "सिफारिशें",
    yieldPrediction: "उत्पादन पूर्वानुमान"
  },
  gu: {
    dashboard: "ડેશબોર્ડ",
    cropSelection: "પાક પસંદગી",
    reports: "રિપોર્ટ અને આંતરદૃષ્ટિ",
    notifications: "સૂચનાઓ",
    profile: "પ્રોફાઇલ",
    settings: "સેટિંગ્સ",
    welcome: "AgriPredict માં આપનું સ્વાગત છે",
    loginAsFramer: "ખેડૂત તરીકે લોગિન કરો",
    registerAsFramer: "ખેડૂત તરીકે નોંધણી કરો",
    currentWeather: "વર્તમાન હવામાન",
    soilHealth: "માટીનું સ્વાસ્થ્य", 
    recommendations: "ભલામણો",
    yieldPrediction: "ઉત્પાદન અનુમાન"
  },
  pa: {
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    cropSelection: "ਫਸਲ ਚੋਣ",
    reports: "ਰਿਪੋਰਟਾਂ ਅਤੇ ਸੂਝ",
    notifications: "ਸੂਚਨਾਵਾਂ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    settings: "ਸੈਟਿੰਗਾਂ",
    welcome: "AgriPredict ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
    loginAsFramer: "ਕਿਸਾਨ ਵਜੋਂ ਲਾਗਇਨ ਕਰੋ",
    registerAsFramer: "ਕਿਸਾਨ ਵਜੋਂ ਰਜਿਸਟਰ ਕਰੋ",
    currentWeather: "ਮੌਜੂਦਾ ਮੌਸਮ",
    soilHealth: "ਮਿੱਟੀ ਦੀ ਸਿਹਤ",
    recommendations: "ਸਿਫਾਰਸ਼ਾਂ",
    yieldPrediction: "ਪੈਦਾਵਾਰ ਦੀ ਭਵਿੱਖਬਾਣੀ"
  },
  or: {
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    cropSelection: "ଫସଲ ଚୟନ",
    reports: "ରିପୋର୍ଟ ଏବଂ ଅନ୍ତର୍ଦୃଷ୍ଟି",
    notifications: "ବିଜ୍ଞପ୍ତି",
    profile: "ପ୍ରୋଫାଇଲ",
    settings: "ସେଟିଂସ",
    welcome: "AgriPredict ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ",
    loginAsFramer: "କୃଷକ ଭାବରେ ଲଗଇନ କରନ୍ତୁ",
    registerAsFramer: "କୃଷକ ଭାବରେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ",
    currentWeather: "ବର୍ତ୍ତମାନର ପାଗ",
    soilHealth: "ମାଟିର ସ୍ୱାସ୍ଥ୍ୟ",
    recommendations: "ସୁପାରିଶ",
    yieldPrediction: "ଅମଳ ପୂର୍ବାନୁମାନ"
  }
};