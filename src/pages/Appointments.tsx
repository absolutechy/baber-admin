import { useState } from 'react';
import { Modal, Alert, Button, Input, SearchInput, Select, Badge, Card } from '../components/common';
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  EyeSlashIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

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
      status: 'completed',
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
      status: 'cancelled',
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
      status: 'no-show',
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
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
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
    
    if (!service) {
      return [
        { value: '', label: 'Select a staff member' },
        ...staffMembers.map(staff => ({
          value: staff.name,
          label: `${staff.name} (${staff.position})`,
        }))
      ];
    }

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
      setNewAppointment({
        ...newAppointment,
        service: '',
        duration: 30,
        price: 0,
        staffName: '',
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
        staffName: '',
      });
    }
  };

  // Filter appointments
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

  const dateOptions = [
    { value: 'all', label: 'All Dates' },
    ...uniqueDates.map(date => ({ value: date, label: date }))
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
    { value: 'no-show', label: 'No Show' }
  ];

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

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon className="w-4 h-4" />;
      case 'cancelled':
        return <XCircleIcon className="w-4 h-4" />;
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4" />;
      case 'no-show':
        return <EyeSlashIcon className="w-4 h-4" />;
      default:
        return <ExclamationCircleIcon className="w-4 h-4" />;
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

  // Calculate stats
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;
  const totalRevenue = appointments.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="space-y-8">
      {/* Page header with enhanced styling */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
            <p className="text-gray-600">Manage your barbershop appointments efficiently</p>
          </div>
          <div className="mt-6 sm:mt-0 flex items-center space-x-4">
            <div className="w-80">
              <SearchInput
                placeholder="Search by client or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setIsAddAppointmentModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              icon={<PlusIcon className="w-5 h-5" />}
            >
              New Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarIcon className="h-8 w-8 text-blue-100" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-blue-100 truncate">Total Appointments</dt>
                  <dd className="text-3xl font-bold">{totalAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-100" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-green-100 truncate">Confirmed</dt>
                  <dd className="text-3xl font-bold">{confirmedAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-purple-100" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-purple-100 truncate">Completed</dt>
                  <dd className="text-3xl font-bold">{completedAppointments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-orange-100 truncate">Revenue</dt>
                  <dd className="text-3xl font-bold">${totalRevenue}</dd>
                </dl>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Filters */}
      <Card className="shadow-lg border-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">View:</span>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'cards' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Table
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setDateFilter('all');
                  setStatusFilter('all');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Appointments Display */}
      {viewMode === 'cards' ? (
        /* Card View */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {appointment.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.clientName}</h3>
                      <p className="text-sm text-gray-500">{appointment.service}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(appointment.status)} className="flex items-center gap-1">
                    {getStatusIcon(appointment.status)}
                    {getStatusLabel(appointment.status)}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {appointment.time} ({appointment.duration} min)
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                    {appointment.staffName}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-green-600">${appointment.price}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditAppointmentModal(appointment.id)}
                      className="hover:bg-blue-50 hover:border-blue-300"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-50 hover:border-red-300 text-red-600"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Table View */
        <Card className="shadow-lg border-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Staff
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="relative px-6 py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment, index) => (
                  <tr key={appointment.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {appointment.clientName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{appointment.clientName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.service}</div>
                      <div className="text-sm text-gray-500">{appointment.duration} minutes</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.date}</div>
                      <div className="text-sm text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{appointment.staffName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(appointment.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(appointment.status)}
                        {getStatusLabel(appointment.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">${appointment.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditAppointmentModal(appointment.id)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 hover:border-red-300 text-red-600"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {filteredAppointments.length === 0 && (
        <Card className="text-center py-12 shadow-lg border-0">
          <CalendarIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || dateFilter !== 'all' || statusFilter !== 'all' 
              ? 'Try adjusting your filters or search term.' 
              : 'Create your first appointment to get started.'}
          </p>
          <Button 
            onClick={() => setIsAddAppointmentModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Add New Appointment
          </Button>
        </Card>
      )}

      {/* Enhanced Add Appointment Modal */}
      <Modal
        isOpen={isAddAppointmentModalOpen}
        onClose={() => setIsAddAppointmentModalOpen(false)}
        title="Add New Appointment"
        primaryActionLabel="Create Appointment"
        onPrimaryAction={handleAddAppointment}
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-1">New Appointment</h4>
            <p className="text-sm text-blue-600">Fill in the details below to create a new appointment.</p>
          </div>
          
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

      {/* Enhanced Edit Appointment Modal */}
      <Modal
        isOpen={isEditAppointmentModalOpen}
        onClose={() => setIsEditAppointmentModalOpen(false)}
        title="Edit Appointment"
        primaryActionLabel="Save Changes"
        onPrimaryAction={handleEditAppointment}
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-1">Edit Appointment</h4>
            <p className="text-sm text-amber-600">Update the appointment details below.</p>
          </div>
          
          <Input
            label="Service"
            value={editAppointment.service}
            onChange={(e) => setEditAppointment({ ...editAppointment, service: e.target.value })}
            error={!editAppointment.service.trim() ? "Service is required" : ""}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={editAppointment.date}
              onChange={(e) => setEditAppointment({ ...editAppointment, date: e.target.value })}
              error={!editAppointment.date.trim() ? "Date is required" : ""}
            />
            <Input
              label="Time"
              value={editAppointment.time}
              onChange={(e) => setEditAppointment({ ...editAppointment, time: e.target.value })}
              error={!editAppointment.time.trim() ? "Time is required" : ""}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Duration (minutes)"
              type="number"
              value={editAppointment.duration.toString()}
              onChange={(e) => setEditAppointment({ ...editAppointment, duration: parseInt(e.target.value) || 0 })}
            />
            <Input
              label="Price ($)"
              type="number"
              value={editAppointment.price.toString()}
              onChange={(e) => setEditAppointment({ ...editAppointment, price: parseInt(e.target.value) || 0 })}
            />
          </div>
          
          <Input
            label="Staff Member"
            value={editAppointment.staffName}
            onChange={(e) => setEditAppointment({ ...editAppointment, staffName: e.target.value })}
          />
          
          <Select
            label="Status"
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