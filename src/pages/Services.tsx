import { useState } from 'react';
import { Modal, Alert, Button, Input, Select, Card, Badge, SearchInput } from '../components/common';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: 'haircut' | 'beard' | 'styling' | 'color' | 'other';
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Haircut',
      description: 'Classic haircut with scissors and clippers',
      duration: 30,
      price: 30,
      category: 'haircut',
    },
    {
      id: '2',
      name: 'Beard Trim',
      description: 'Beard shaping and trimming',
      duration: 20,
      price: 20,
      category: 'beard',
    },
    {
      id: '3',
      name: 'Haircut + Beard Trim',
      description: 'Complete hair and beard service',
      duration: 45,
      price: 45,
      category: 'haircut',
    },
    {
      id: '4',
      name: 'Hair Styling',
      description: 'Hair styling with products',
      duration: 30,
      price: 25,
      category: 'styling',
    },
    {
      id: '5',
      name: 'Hair Coloring',
      description: 'Full hair coloring service',
      duration: 90,
      price: 80,
      category: 'color',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string; show: boolean }>({
    type: 'success',
    message: '',
    show: false,
  });
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    duration: 30,
    price: 25,
    category: 'haircut',
  });

  // Filter services based on search term and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message, show: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleAddService = () => {
    // Validate form
    if (!newService.name.trim()) {
      showAlert('error', 'Service name is required');
      return;
    }

    // In a real app, this would make an API call
    const service: Service = {
      id: (services.length + 1).toString(),
      ...newService,
    };
    
    setServices([...services, service]);
    resetForm();
    setIsAddServiceModalOpen(false);
    showAlert('success', 'Service added successfully');
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      category: service.category,
    });
    setIsAddServiceModalOpen(true);
  };

  const handleUpdateService = () => {
    if (!editingService) return;

    // Validate form
    if (!newService.name.trim()) {
      showAlert('error', 'Service name is required');
      return;
    }

    // In a real app, this would make an API call
    setServices(
      services.map((service) =>
        service.id === editingService.id
          ? { ...service, ...newService }
          : service
      )
    );
    
    setEditingService(null);
    resetForm();
    setIsAddServiceModalOpen(false);
    showAlert('success', 'Service updated successfully');
  };

  const confirmDeleteService = (id: string) => {
    setServiceToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteService = () => {
    if (!serviceToDelete) return;
    
    // In a real app, this would make an API call
    setServices(services.filter((service) => service.id !== serviceToDelete));
    setIsDeleteModalOpen(false);
    setServiceToDelete(null);
    showAlert('success', 'Service deleted successfully');
  };

  const getCategoryLabel = (category: Service['category']) => {
    switch (category) {
      case 'haircut':
        return 'Haircut';
      case 'beard':
        return 'Beard';
      case 'styling':
        return 'Styling';
      case 'color':
        return 'Color';
      case 'other':
        return 'Other';
      default:
        return 'Unknown';
    }
  };

  const getCategoryBadgeVariant = (category: Service['category']): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch (category) {
      case 'haircut':
        return 'info';
      case 'beard':
        return 'success';
      case 'styling':
        return 'warning';
      case 'color':
        return 'error';
      case 'other':
        return 'default';
      default:
        return 'default';
    }
  };

  const handleCloseModal = () => {
    setIsAddServiceModalOpen(false);
    setEditingService(null);
    resetForm();
  };

  const resetForm = () => {
    setNewService({
      name: '',
      description: '',
      duration: 30,
      price: 25,
      category: 'haircut',
    });
  };

  const openAddServiceModal = () => {
    resetForm();
    setIsAddServiceModalOpen(true);
  };

  const serviceCategories = [
    { value: 'haircut', label: 'Haircut' },
    { value: 'beard', label: 'Beard' },
    { value: 'styling', label: 'Styling' },
    { value: 'color', label: 'Color' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Services</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-3">
          <div className="w-64">
            <SearchInput
              placeholder="Search services"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={openAddServiceModal}
            icon={
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Add Service
          </Button>
        </div>
      </div>

      {/* Category filter */}
      <div className="max-w-xs">
        <Select
          label="Category"
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'haircut', label: 'Haircut' },
            { value: 'beard', label: 'Beard' },
            { value: 'styling', label: 'Styling' },
            { value: 'color', label: 'Color' },
            { value: 'other', label: 'Other' },
          ]}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service.id} bodyClassName="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{service.name}</h3>
              <Badge variant={getCategoryBadgeVariant(service.category)}>
                {getCategoryLabel(service.category)}
              </Badge>
            </div>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>{service.description}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-500">{service.duration} min</span>
                </div>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-500">${service.price}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEditService(service)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => confirmDeleteService(service.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Service Modal */}
      <Modal
        isOpen={isAddServiceModalOpen}
        onClose={handleCloseModal}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        primaryActionLabel={editingService ? 'Update' : 'Add'}
        onPrimaryAction={editingService ? handleUpdateService : handleAddService}
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duration (minutes)"
              type="number"
              value={newService.duration}
              onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) })}
            />
            
            <Input
              label="Price ($)"
              type="number"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: parseInt(e.target.value) })}
            />
          </div>
          
          <Select
            label="Category"
            options={serviceCategories}
            value={newService.category}
            onChange={(value) => setNewService({ ...newService, category: value as Service['category'] })}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Service"
        primaryActionLabel="Delete"
        onPrimaryAction={handleDeleteService}
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this service? This action cannot be undone.
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