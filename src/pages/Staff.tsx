import { useState } from 'react';
import { Modal, Alert, Button, Input, Select, Card, Badge, SearchInput } from '../components/common';

interface Staff {
  id: string;
  name: string;
  position: 'barber' | 'stylist' | 'assistant' | 'manager';
  email: string;
  phone: string;
  hireDate: string;
  bio: string;
  image: string;
}

export default function Staff() {
  const [staffMembers, setStaffMembers] = useState<Staff[]>([
    {
      id: '1',
      name: 'Mike Smith',
      position: 'barber',
      email: 'mike@barber.com',
      phone: '(555) 123-4567',
      hireDate: '2020-01-15',
      bio: 'Experienced barber with over 10 years of experience in classic cuts.',
      image: '',
    },
    {
      id: '2',
      name: 'Jessica Lee',
      position: 'stylist',
      email: 'jessica@barber.com',
      phone: '(555) 234-5678',
      hireDate: '2021-03-10',
      bio: 'Specializes in modern styling and coloring techniques.',
      image: '',
    },
    {
      id: '3',
      name: 'David Johnson',
      position: 'barber',
      email: 'david@barber.com',
      phone: '(555) 345-6789',
      hireDate: '2019-11-05',
      bio: 'Expert in beard grooming and traditional shaves.',
      image: '',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      position: 'assistant',
      email: 'sarah@barber.com',
      phone: '(555) 456-7890',
      hireDate: '2022-05-20',
      bio: 'Friendly assistant helping with all aspects of the shop.',
      image: '',
    },
    {
      id: '5',
      name: 'Robert Brown',
      position: 'manager',
      email: 'robert@barber.com',
      phone: '(555) 567-8901',
      hireDate: '2018-08-12',
      bio: 'Shop manager with a background in business and barbering.',
      image: '',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string; show: boolean }>({
    type: 'success',
    message: '',
    show: false,
  });
  const [newStaff, setNewStaff] = useState<Omit<Staff, 'id'>>({
    name: '',
    position: 'barber',
    email: '',
    phone: '',
    hireDate: new Date().toISOString().split('T')[0],
    bio: '',
    image: '',
  });

  // Filter staff based on search term and position
  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = positionFilter === 'all' || staff.position === positionFilter;
    
    return matchesSearch && matchesPosition;
  });

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message, show: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleAddStaff = () => {
    // Validate form
    if (!newStaff.name.trim()) {
      showAlert('error', 'Staff name is required');
      return;
    }

    if (!newStaff.email.trim()) {
      showAlert('error', 'Email is required');
      return;
    }

    // In a real app, this would make an API call
    const staff: Staff = {
      id: (staffMembers.length + 1).toString(),
      ...newStaff,
    };
    
    setStaffMembers([...staffMembers, staff]);
    resetForm();
    setIsAddStaffModalOpen(false);
    showAlert('success', 'Staff member added successfully');
  };

  const handleEditStaff = (staff: Staff) => {
    setEditingStaff(staff);
    setNewStaff({
      name: staff.name,
      position: staff.position,
      email: staff.email,
      phone: staff.phone,
      hireDate: staff.hireDate,
      bio: staff.bio,
      image: staff.image,
    });
    setIsAddStaffModalOpen(true);
  };

  const handleUpdateStaff = () => {
    if (!editingStaff) return;

    // Validate form
    if (!newStaff.name.trim()) {
      showAlert('error', 'Staff name is required');
      return;
    }

    if (!newStaff.email.trim()) {
      showAlert('error', 'Email is required');
      return;
    }

    // In a real app, this would make an API call
    setStaffMembers(
      staffMembers.map((staff) =>
        staff.id === editingStaff.id
          ? { ...staff, ...newStaff }
          : staff
      )
    );
    
    setEditingStaff(null);
    resetForm();
    setIsAddStaffModalOpen(false);
    showAlert('success', 'Staff member updated successfully');
  };

  const confirmDeleteStaff = (id: string) => {
    setStaffToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteStaff = () => {
    if (!staffToDelete) return;
    
    // In a real app, this would make an API call
    setStaffMembers(staffMembers.filter((staff) => staff.id !== staffToDelete));
    setIsDeleteModalOpen(false);
    setStaffToDelete(null);
    showAlert('success', 'Staff member deleted successfully');
  };

  const getPositionLabel = (position: Staff['position']) => {
    switch (position) {
      case 'barber':
        return 'Barber';
      case 'stylist':
        return 'Stylist';
      case 'assistant':
        return 'Assistant';
      case 'manager':
        return 'Manager';
      default:
        return 'Unknown';
    }
  };

  const getPositionBadgeVariant = (position: Staff['position']): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch (position) {
      case 'barber':
        return 'info';
      case 'stylist':
        return 'warning';
      case 'assistant':
        return 'success';
      case 'manager':
        return 'error';
      default:
        return 'default';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleCloseModal = () => {
    setIsAddStaffModalOpen(false);
    setEditingStaff(null);
    resetForm();
  };

  const resetForm = () => {
    setNewStaff({
      name: '',
      position: 'barber',
      email: '',
      phone: '',
      hireDate: new Date().toISOString().split('T')[0],
      bio: '',
      image: '',
    });
  };

  const openAddStaffModal = () => {
    resetForm();
    setIsAddStaffModalOpen(true);
  };

  const staffPositions = [
    { value: 'barber', label: 'Barber' },
    { value: 'stylist', label: 'Stylist' },
    { value: 'assistant', label: 'Assistant' },
    { value: 'manager', label: 'Manager' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Staff</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-3">
          <div className="w-64">
            <SearchInput
              placeholder="Search staff"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={openAddStaffModal}
            icon={
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Add Staff
          </Button>
        </div>
      </div>

      {/* Position filter */}
      <div className="max-w-xs">
        <Select
          label="Position"
          options={[
            { value: 'all', label: 'All Positions' },
            { value: 'barber', label: 'Barber' },
            { value: 'stylist', label: 'Stylist' },
            { value: 'assistant', label: 'Assistant' },
            { value: 'manager', label: 'Manager' },
          ]}
          value={positionFilter}
          onChange={setPositionFilter}
        />
      </div>

      {/* Staff grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStaff.map((staff) => (
          <Card key={staff.id}>
            <div className="flex items-center px-4 py-5 sm:px-6">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium text-gray-600">
                {getInitials(staff.name)}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{staff.name}</h3>
                  <Badge variant={getPositionBadgeVariant(staff.position)}>
                    {getPositionLabel(staff.position)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{staff.email}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
              <div className="text-sm text-gray-500 mb-3">{staff.bio}</div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Hired: {new Date(staff.hireDate).toLocaleDateString()}
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEditStaff(staff)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmDeleteStaff(staff.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Staff Modal */}
      <Modal
        isOpen={isAddStaffModalOpen}
        onClose={handleCloseModal}
        title={editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
        primaryActionLabel={editingStaff ? 'Update' : 'Add'}
        onPrimaryAction={editingStaff ? handleUpdateStaff : handleAddStaff}
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            required
          />
          
          <Select
            label="Position"
            options={staffPositions}
            value={newStaff.position}
            onChange={(value) => setNewStaff({ ...newStaff, position: value as Staff['position'] })}
          />
          
          <Input
            label="Email"
            type="email"
            value={newStaff.email}
            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
            required
          />
          
          <Input
            label="Phone"
            value={newStaff.phone}
            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
          />
          
          <Input
            label="Hire Date"
            type="date"
            value={newStaff.hireDate}
            onChange={(e) => setNewStaff({ ...newStaff, hireDate: e.target.value })}
          />
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              value={newStaff.bio}
              onChange={(e) => setNewStaff({ ...newStaff, bio: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Staff Member"
        primaryActionLabel="Delete"
        onPrimaryAction={handleDeleteStaff}
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this staff member? This action cannot be undone.
        </p>
      </Modal>

      {/* Alert Component */}
      <Alert
        type={alert.type}
        message={alert.message}
        show={alert.show}
        onClose={() => setAlert(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
} 