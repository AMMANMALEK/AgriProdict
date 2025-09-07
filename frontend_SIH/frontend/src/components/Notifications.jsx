import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage } from '../App';
import { mockNotifications } from '../mockData';
import { 
  Bell, 
  CloudRain, 
  Bug, 
  Droplets, 
  Wheat,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';

const Notifications = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'weather': return CloudRain;
      case 'pest': return Bug;
      case 'irrigation': return Droplets;
      case 'harvest': return Wheat;
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

  const getPriorityIconColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-green-800">{t('notifications')}</h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-100 text-red-800">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <Button 
          onClick={markAllAsRead}
          variant="outline"
          size="sm"
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <Filter className="h-5 w-5" />
                <span>Filter Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={filter === 'all' ? 'default' : 'ghost'}
                size="sm"
                className={`w-full justify-start ${
                  filter === 'all' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-green-50 text-gray-700'
                }`}
                onClick={() => setFilter('all')}
              >
                <Bell className="h-4 w-4 mr-2" />
                All Notifications
              </Button>
              <Button
                variant={filter === 'weather' ? 'default' : 'ghost'}
                size="sm"
                className={`w-full justify-start ${
                  filter === 'weather' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-green-50 text-gray-700'
                }`}
                onClick={() => setFilter('weather')}
              >
                <CloudRain className="h-4 w-4 mr-2" />
                Weather Alerts
              </Button>
              <Button
                variant={filter === 'pest' ? 'default' : 'ghost'}
                size="sm"
                className={`w-full justify-start ${
                  filter === 'pest' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-green-50 text-gray-700'
                }`}
                onClick={() => setFilter('pest')}
              >
                <Bug className="h-4 w-4 mr-2" />
                Pest Alerts
              </Button>
              <Button
                variant={filter === 'irrigation' ? 'default' : 'ghost'}
                size="sm"
                className={`w-full justify-start ${
                  filter === 'irrigation' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-green-50 text-gray-700'
                }`}
                onClick={() => setFilter('irrigation')}
              >
                <Droplets className="h-4 w-4 mr-2" />
                Irrigation
              </Button>
              <Button
                variant={filter === 'harvest' ? 'default' : 'ghost'}
                size="sm"
                className={`w-full justify-start ${
                  filter === 'harvest' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-green-50 text-gray-700'
                }`}
                onClick={() => setFilter('harvest')}
              >
                <Wheat className="h-4 w-4 mr-2" />
                Harvest Updates
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-green-200 mt-6">
            <CardHeader>
              <CardTitle className="text-green-800">Alert Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">High Priority:</span>
                <Badge className="bg-red-100 text-red-800">
                  {notifications.filter(n => n.priority === 'high').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Medium Priority:</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {notifications.filter(n => n.priority === 'medium').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Low Priority:</span>
                <Badge className="bg-green-100 text-green-800">
                  {notifications.filter(n => n.priority === 'low').length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Notifications List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="border-green-200">
              <CardContent className="p-8 text-center">
                <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Notifications</h3>
                <p className="text-gray-600">You're all caught up! No {filter !== 'all' ? filter : ''} notifications at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <Card 
                  key={notification.id}
                  className={`border-2 transition-all hover:shadow-md ${
                    notification.read 
                      ? 'border-gray-200 bg-gray-50' 
                      : 'border-green-200 bg-white'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 p-2 rounded-full ${
                        notification.priority === 'high' ? 'bg-red-100' :
                        notification.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-green-100'
                      }`}>
                        <Icon className={`h-5 w-5 ${getPriorityIconColor(notification.priority)}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold ${
                            notification.read ? 'text-gray-700' : 'text-gray-900'
                          }`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        
                        <p className={`mb-3 ${
                          notification.read ? 'text-gray-600' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{notification.time}</span>
                          </div>
                          
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(notification.id)}
                              className="border-green-200 text-green-700 hover:bg-green-50"
                            >
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;