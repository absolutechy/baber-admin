import { useState } from 'react';
import { Modal, Alert, Button, Input, SearchInput, Select, Badge, Card } from '../components/common';

interface Appointment {
  id: string;
  clientName: string;
  clientId: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  staffName: string;
  price: number;
}

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

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: 'haircut' | 'beard' | 'styling' | 'color' | 'other';
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientName: 'John Doe',
      clientId: '1',
      service: 'Haircut',
      date: '2023-07-01',
      time: '10:00 AM',
      duration: 30,
      status: 'confirmed',
      staffName: 'Mike Smith',
      price: 30,
    },
    {
      id: '2',
      clientName: 'Sarah Johnson',
      clientId: '2',
      service: 'Haircut + Beard Trim',
      date: '2023-07-01',
      time: '11:00 AM',
      duration: 45,
      status: 'confirmed',
      staffName: 'Mike Smith',
      price: 45,
    },
    {
      id: '3',
      clientName: 'Michael Brown',
      clientId: '3',
      service: 'Hair Styling',
      date: '2023-07-01',
      time: '1:30 PM',
      duration: 60,
      status: 'confirmed',
      staffName: 'Jessica Lee',
      price: 50,
    },
    {
      id: '4',
      clientName: 'Emily Davis',
      clientId: '4',
      service: 'Haircut',
      date: '2023-07-02',
      time: '2:00 PM',
      duration: 30,
      status: 'confirmed',
      staffName: 'Mike Smith',
      price: 30,
    },
    {
      id: '5',
      clientName: 'David Wilson',
      clientId: '5',
      service: 'Beard Trim',
      date: '2023-07-02',
      time: '3:30 PM',
      duration: 20,
      status: 'confirmed',
      staffName: 'Jessica Lee',
      price: 20,
    },
  ]);

  const [staffMembers] = useState<Staff[]>([
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
  ]);

  const [services] = useState<Service[]>([
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
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
  const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string; show: boolean }>({
    type: 'success',
    message: '',
    show: false,
  });
  const [newAppointment, setNewAppointment] = useState({
    clientName: '',
    service: '',
    date: '',
    time: '',
    duration: 30,
    staffName: '',
    price: 0,
  });
  const [editAppointment, setEditAppointment] = useState({
    service: '',
    date: '',
    time: '',
    duration: 0,
    staffName: '',
    price: 0,
    status: '' as Appointment['status'],
  });

  const serviceOptions = [
    { value: '', label: 'Select a service' },
    ...services.map(service => ({
      value: service.id,
      label: service.name,
    }))
  ];

  const getServiceById = (id: string) => {
    return services.find(service => service.id === id);
  };

  const getAvailableStaff = (serviceId: string) => {
    const service = getServiceById(serviceId);
    
    // If no service selected, show all staff
    if (!service) {
      return [
        { value: '', label: 'Select a staff member' },
        ...staffMembers.map(staff => ({
          value: staff.name,
          label: `${staff.name} (${staff.position})`,
        }))
      ];
    }

    // Filter staff based on service category
    const filteredStaff = staffMembers.filter(staff => {
      switch (service.category) {
        case 'haircut':
        case 'beard':
          return staff.position === 'barber';
        case 'styling':
        case 'color':
          return staff.position === 'stylist';
        default:
          return staff.position === 'barber' || staff.position === 'stylist';
      }
    });

    // Return staff options with default option
    return [
      { value: '', label: `Select staff for ${service.name}` },
      ...filteredStaff.map(staff => ({
        value: staff.name,
        label: `${staff.name} (${staff.position})`,
      }))
    ];
  };

  const handleServiceChange = (serviceId: string) => {
    if (!serviceId) {
      // Reset appointment details if no service selected
      setNewAppointment({
        ...newAppointment,
        service: '',
        duration: 30,
        price: 0,
        staffName: '', // Reset staff selection when service changes
      });
      return;
    }

    const service = getServiceById(serviceId);
    if (service) {
      setNewAppointment({
        ...newAppointment,
        service: service.name,
        duration: service.duration,
        price: service.price,
        staffName: '', // Reset staff selection when service changes
      });
    }
  };

  // Filter appointments based on search term, date, and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = dateFilter === 'all' || appointment.date === dateFilter;
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Get unique dates for the date filter
  const uniqueDates = Array.from(new Set(appointments.map((appointment) => appointment.date)));

  // Create options for date filter
  const dateOptions = [
    { value: 'all', label: 'All Dates' },
    ...uniqueDates.map(date => ({ value: date, label: date }))
  ];

  // Create options for status filter
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
    { value: 'no-show', label: 'No Show' }
  ];

  // Create options for appointment status in edit modal
  const appointmentStatusOptions = [
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
    { value: 'no-show', label: 'No Show' }
  ];

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message, show: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleAddAppointment = () => {
    // Basic validation
    if (!newAppointment.clientName || !newAppointment.service || !newAppointment.date || !newAppointment.time || !newAppointment.staffName) {
      showAlert('error', 'Please fill all required fields.');
      return;
    }

    const appointmentToAdd: Appointment = {
      ...newAppointment,
      id: `${appointments.length + 1}`,
      clientId: `${appointments.length + 1}`,
      status: 'confirmed',
    };

    setAppointments([appointmentToAdd, ...appointments]);
    setIsAddAppointmentModalOpen(false);
    showAlert('success', 'Appointment added successfully');
    setNewAppointment({
      clientName: '',
      service: '',
      date: '',
      time: '',
      duration: 30,
      staffName: '',
      price: 0,
    });
  };

  const openEditAppointmentModal = (id: string) => {
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
      setEditAppointment({
        service: appointment.service,
        date: appointment.date,
        time: appointment.time,
        duration: appointment.duration,
        staffName: appointment.staffName,
        price: appointment.price,
        status: appointment.status,
      });
      setAppointmentToEdit(id);
      setIsEditAppointmentModalOpen(true);
    }
  };

  const handleEditAppointment = () => {
    // Validate form
    if (!editAppointment.service.trim()) {
      showAlert('error', 'Service is required');
      return;
    }

    if (!editAppointment.date.trim()) {
      showAlert('error', 'Date is required');
      return;
    }

    if (!editAppointment.time.trim()) {
      showAlert('error', 'Time is required');
      return;
    }

    if (!appointmentToEdit) return;

    // In a real app, this would make an API call
    setAppointments(appointments.map(appointment => {
      if (appointment.id === appointmentToEdit) {
        return {
          ...appointment,
          service: editAppointment.service,
          date: editAppointment.date,
          time: editAppointment.time,
          duration: editAppointment.duration,
          staffName: editAppointment.staffName,
          price: editAppointment.price,
          status: editAppointment.status,
        };
      }
      return appointment;
    }));

    setIsEditAppointmentModalOpen(false);
    setAppointmentToEdit(null);
    showAlert('success', 'Appointment updated successfully');
  };

  const getStatusVariant = (status: Appointment['status']): 'success' | 'error' | 'warning' | 'info' | 'default' => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'info';
      case 'no-show':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'cancelled':
        return 'Cancelled';
      case 'completed':
        return 'Completed';
      case 'no-show':
        return 'No Show';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Appointments</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-3">
          <div className="w-64">
            <SearchInput
              placeholder="Search appointments"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setIsAddAppointmentModalOpen(true)}
            icon={
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Add Appointment
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Date"
          options={dateOptions}
          value={dateFilter}
          onChange={setDateFilter}
        />
        <Select
          label="Status"
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      {/* Appointments table */}
      <Card>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Staff
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium">
                                {appointment.clientName.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{appointment.clientName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.service}</div>
                          <div className="text-sm text-gray-500">${appointment.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.date}</div>
                          <div className="text-sm text-gray-500">{appointment.time} ({appointment.duration} min)</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {appointment.staffName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={getStatusVariant(appointment.status)}>
                            {getStatusLabel(appointment.status)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${appointment.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => openEditAppointmentModal(appointment.id)}
                            >
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Add Appointment Modal */}
      <Modal
        isOpen={isAddAppointmentModalOpen}
        onClose={() => setIsAddAppointmentModalOpen(false)}
        title="Add New Appointment"
        primaryActionLabel="Add"
        onPrimaryAction={handleAddAppointment}
      >
        <div className="space-y-4">
          <Input
            label="Client Name"
            value={newAppointment.clientName}
            onChange={(e) => setNewAppointment({ ...newAppointment, clientName: e.target.value })}
            required
          />
          <Select
            label="Service"
            options={serviceOptions}
            value={services.find(s => s.name === newAppointment.service)?.id || ''}
            onChange={handleServiceChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              required
            />
            <Input
              label="Time"
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duration (minutes)"
              type="number"
              value={newAppointment.duration}
              onChange={(e) => setNewAppointment({ ...newAppointment, duration: Number(e.target.value) })}
              disabled
            />
            <Input
              label="Price ($)"
              type="number"
              value={newAppointment.price}
              onChange={(e) => setNewAppointment({ ...newAppointment, price: Number(e.target.value) })}
              disabled
            />
          </div>
          <Select
            label="Staff Member"
            options={getAvailableStaff(services.find(s => s.name === newAppointment.service)?.id || '')}
            value={newAppointment.staffName}
            onChange={(value) => setNewAppointment({ ...newAppointment, staffName: value })}
          />
        </div>
      </Modal>

      {/* Edit Appointment Modal */}
      <Modal
        isOpen={isEditAppointmentModalOpen}
        onClose={() => setIsEditAppointmentModalOpen(false)}
        title="Edit Appointment"
        primaryActionLabel="Save Changes"
        onPrimaryAction={handleEditAppointment}
      >
        <div className="space-y-4">
          <Input
            label="Service"
            id="service"
            value={editAppointment.service}
            onChange={(e) => setEditAppointment({ ...editAppointment, service: e.target.value })}
            error={!editAppointment.service.trim() ? "Service is required" : ""}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              id="date"
              type="date"
              value={editAppointment.date}
              onChange={(e) => setEditAppointment({ ...editAppointment, date: e.target.value })}
              error={!editAppointment.date.trim() ? "Date is required" : ""}
            />
            <Input
              label="Time"
              id="time"
              value={editAppointment.time}
              onChange={(e) => setEditAppointment({ ...editAppointment, time: e.target.value })}
              error={!editAppointment.time.trim() ? "Time is required" : ""}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duration (minutes)"
              id="duration"
              type="number"
              value={editAppointment.duration.toString()}
              onChange={(e) => setEditAppointment({ ...editAppointment, duration: parseInt(e.target.value) || 0 })}
            />
            <Input
              label="Price ($)"
              id="price"
              type="number"
              value={editAppointment.price.toString()}
              onChange={(e) => setEditAppointment({ ...editAppointment, price: parseInt(e.target.value) || 0 })}
            />
          </div>
          <Input
            label="Staff Member"
            id="staffName"
            value={editAppointment.staffName}
            onChange={(e) => setEditAppointment({ ...editAppointment, staffName: e.target.value })}
          />
          <Select
            label="Status"
            id="status"
            options={appointmentStatusOptions}
            value={editAppointment.status}
            onChange={(value) => setEditAppointment({ ...editAppointment, status: value as Appointment['status'] })}
          />
        </div>
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