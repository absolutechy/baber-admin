import { useState } from 'react';
import { Modal, Alert, Button, Input, Select, Card } from '../components/common';

interface ShopSettings {
  shopName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  notifications: {
    emailReminders: boolean;
    smsReminders: boolean;
    appointmentConfirmation: boolean;
    marketingEmails: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    primaryColor: string;
  };
}

export default function Settings() {
  const [settings, setSettings] = useState<ShopSettings>({
    shopName: 'Classic Barber Shop',
    address: '123 Main Street, City, State 12345',
    phone: '(555) 123-4567',
    email: 'contact@barber.com',
    website: 'www.classicbarbershop.com',
    openingHours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '10:00 AM - 6:00 PM',
      sunday: 'Closed',
    },
    socialMedia: {
      facebook: 'facebook.com/classicbarbershop',
      instagram: 'instagram.com/classicbarbershop',
      twitter: 'twitter.com/classicbarber',
    },
    notifications: {
      emailReminders: true,
      smsReminders: true,
      appointmentConfirmation: true,
      marketingEmails: false,
    },
    appearance: {
      theme: 'light',
      primaryColor: '#f97316', // orange-600
    },
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleGeneralInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleOpeningHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      openingHours: {
        ...settings.openingHours,
        [name]: value,
      },
    });
  };

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      socialMedia: {
        ...settings.socialMedia,
        [name]: value,
      },
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [name]: checked,
      },
    });
  };

  const handleThemeChange = (value: string) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        theme: value as 'light' | 'dark' | 'system',
      },
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        primaryColor: e.target.value,
      },
    });
  };

  const confirmSaveSettings = () => {
    setIsConfirmModalOpen(true);
  };

  const handleSaveSettings = () => {
    setIsConfirmModalOpen(false);
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedMessage(true);
      
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 3000);
    }, 1000);
  };

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Settings</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Button
            onClick={confirmSaveSettings}
            disabled={isSaving}
            icon={isSaving ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : undefined}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>

      {/* Settings tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['general', 'hours', 'notifications', 'appearance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <Card
              title="Shop Information"
              subtitle="Basic information about your barber shop."
            >
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <Input
                    label="Shop Name"
                    name="shopName"
                    id="shopName"
                    value={settings.shopName}
                    onChange={handleGeneralInfoChange}
                  />
                </div>

                <div className="col-span-6">
                  <Input
                    label="Address"
                    name="address"
                    id="address"
                    value={settings.address}
                    onChange={handleGeneralInfoChange}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Input
                    label="Phone"
                    name="phone"
                    id="phone"
                    value={settings.phone}
                    onChange={handleGeneralInfoChange}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    value={settings.email}
                    onChange={handleGeneralInfoChange}
                  />
                </div>

                <div className="col-span-6">
                  <Input
                    label="Website"
                    name="website"
                    id="website"
                    value={settings.website}
                    onChange={handleGeneralInfoChange}
                  />
                </div>
              </div>
            </Card>

            <Card
              title="Social Media"
              subtitle="Your barber shop's social media profiles."
            >
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <Input
                    label="Facebook"
                    name="facebook"
                    id="facebook"
                    value={settings.socialMedia.facebook}
                    onChange={handleSocialMediaChange}
                    leftIcon={
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                      </svg>
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <Input
                    label="Instagram"
                    name="instagram"
                    id="instagram"
                    value={settings.socialMedia.instagram}
                    onChange={handleSocialMediaChange}
                    leftIcon={
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.087.278 3.45.525a4.897 4.897 0 00-1.771 1.153A4.88 4.88 0 00.525 3.45C.278 4.087.109 4.813.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.049 1.064.218 1.79.465 2.427a4.897 4.897 0 001.153 1.771 4.88 4.88 0 001.772 1.153c.637.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.79-.218 2.427-.465a4.897 4.897 0 001.771-1.153 4.88 4.88 0 001.153-1.771c.247-.637.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.79-.465-2.427a4.897 4.897 0 00-1.153-1.771A4.88 4.88 0 0016.55.525C15.913.278 15.187.11 14.123.06 13.056.012 12.716 0 10 0zm0 1.8c2.67 0 2.986.01 4.04.058.976.045 1.505.207 1.858.345.466.182.8.399 1.15.748.35.35.566.684.748 1.15.138.353.3.882.345 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.207 1.505-.345 1.858-.182.466-.399.8-.748 1.15-.35.35-.684.566-1.15.748-.353.138-.882.3-1.857.345-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.976-.045-1.505-.207-1.858-.345a3.097 3.097 0 01-1.15-.748 3.098 3.098 0 01-.748-1.15c-.138-.353-.3-.882-.345-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.207-1.505.345-1.858.182-.466.399-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.138.882-.3 1.857-.345 1.055-.048 1.37-.058 4.041-.058zm0 3.064A5.136 5.136 0 004.864 10 5.136 5.136 0 0010 15.136 5.136 5.136 0 0015.136 10 5.136 5.136 0 0010 4.864zm0 8.468A3.332 3.332 0 016.668 10 3.332 3.332 0 0110 6.668 3.332 3.332 0 0113.332 10 3.332 3.332 0 0110 13.332zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" />
                      </svg>
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <Input
                    label="Twitter"
                    name="twitter"
                    id="twitter"
                    value={settings.socialMedia.twitter}
                    onChange={handleSocialMediaChange}
                    leftIcon={
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {/* Hours Settings */}
        {activeTab === 'hours' && (
          <Card
            title="Opening Hours"
            subtitle="Set your barber shop's operating hours."
          >
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(settings.openingHours).map(([day, hours]) => (
                <div key={day} className="grid grid-cols-6 gap-4 items-center">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {day}
                    </label>
                  </div>
                  <div className="col-span-4">
                    <Input
                      name={day}
                      value={hours}
                      onChange={handleOpeningHoursChange}
                      placeholder="9:00 AM - 5:00 PM"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
        
        {/* Notifications Settings */}
        {activeTab === 'notifications' && (
          <Card
            title="Notification Preferences"
            subtitle="Configure how and when notifications are sent."
          >
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="emailReminders"
                    name="emailReminders"
                    type="checkbox"
                    checked={settings.notifications.emailReminders}
                    onChange={handleNotificationChange}
                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="emailReminders" className="font-medium text-gray-700">Email Reminders</label>
                  <p className="text-gray-500">Send appointment reminders via email.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="smsReminders"
                    name="smsReminders"
                    type="checkbox"
                    checked={settings.notifications.smsReminders}
                    onChange={handleNotificationChange}
                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="smsReminders" className="font-medium text-gray-700">SMS Reminders</label>
                  <p className="text-gray-500">Send appointment reminders via SMS.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="appointmentConfirmation"
                    name="appointmentConfirmation"
                    type="checkbox"
                    checked={settings.notifications.appointmentConfirmation}
                    onChange={handleNotificationChange}
                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="appointmentConfirmation" className="font-medium text-gray-700">Appointment Confirmation</label>
                  <p className="text-gray-500">Send confirmation when an appointment is booked.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="marketingEmails"
                    name="marketingEmails"
                    type="checkbox"
                    checked={settings.notifications.marketingEmails}
                    onChange={handleNotificationChange}
                    className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="marketingEmails" className="font-medium text-gray-700">Marketing Emails</label>
                  <p className="text-gray-500">Send promotional emails and special offers.</p>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <Card
            title="Appearance"
            subtitle="Customize the look and feel of your barber shop admin panel."
          >
            <div className="space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <Select
                    label="Theme"
                    id="theme"
                    options={themeOptions}
                    value={settings.appearance.theme}
                    onChange={handleThemeChange}
                  />
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                    Primary Color
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="color"
                      id="primaryColor"
                      name="primaryColor"
                      value={settings.appearance.primaryColor}
                      onChange={handleColorChange}
                      className="h-8 w-8 border border-gray-300 rounded-md shadow-sm"
                    />
                    <span className="ml-2 text-sm text-gray-500">{settings.appearance.primaryColor}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900">Preview</h4>
                <div className="mt-3 flex space-x-4">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Save Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Save Settings"
        primaryActionLabel="Save"
        onPrimaryAction={handleSaveSettings}
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to save these settings? This will update your barber shop configuration.
        </p>
      </Modal>

      {/* Saved Message */}
      {showSavedMessage && (
        <Alert
          type="success"
          message="Settings saved successfully!"
          show={showSavedMessage}
          onClose={() => setShowSavedMessage(false)}
        />
      )}
    </div>
  );
}