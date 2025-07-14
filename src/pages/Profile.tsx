import { useAuth } from '../hooks/useAuth';
import { Card, Button, Input } from '../components/common';
import { useState } from 'react';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    role: 'Administrator'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Add your save logic here
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Profile</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card title="Personal Information">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Phone Number"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Role"
              name="role"
              value={profileData.role}
              disabled={true}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {isEditing ? (
            <>
              <Button onClick={handleSave}>Save Changes</Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </Card>
    </div>
  );
}