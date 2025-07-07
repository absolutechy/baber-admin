import { useState } from 'react';
import { Modal, Alert, Button, Input, SearchInput } from '../components/common';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  totalVisits: number;
  totalSpent: number;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      lastVisit: '2023-06-15',
      totalVisits: 8,
      totalSpent: 240,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 234-5678',
      lastVisit: '2023-06-20',
      totalVisits: 12,
      totalSpent: 360,
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '(555) 345-6789',
      lastVisit: '2023-06-18',
      totalVisits: 5,
      totalSpent: 150,
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '(555) 456-7890',
      lastVisit: '2023-06-22',
      totalVisits: 3,
      totalSpent: 90,
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '(555) 567-8901',
      lastVisit: '2023-06-10',
      totalVisits: 15,
      totalSpent: 450,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [clientToEdit, setClientToEdit] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string; show: boolean }>({
    type: 'success',
    message: '',
    show: false,
  });
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [editClient, setEditClient] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Filter clients based on search term
  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  );

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message, show: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleAddClient = () => {
    // Validate form
    if (!newClient.name.trim()) {
      showAlert('error', 'Client name is required');
      return;
    }

    if (!newClient.email.trim()) {
      showAlert('error', 'Email is required');
      return;
    }

    // In a real app, this would make an API call
    const client: Client = {
      id: (clients.length + 1).toString(),
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      lastVisit: 'Never',
      totalVisits: 0,
      totalSpent: 0,
    };
    
    setClients([...clients, client]);
    resetForm();
    setIsAddClientModalOpen(false);
    showAlert('success', 'Client added successfully');
  };

  const confirmDeleteClient = (id: string) => {
    setClientToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteClient = () => {
    if (!clientToDelete) return;
    
    // In a real app, this would make an API call
    setClients(clients.filter((client) => client.id !== clientToDelete));
    setIsDeleteModalOpen(false);
    setClientToDelete(null);
    showAlert('success', 'Client deleted successfully');
  };

  const openEditClientModal = (id: string) => {
    const client = clients.find(c => c.id === id);
    if (client) {
      setEditClient({
        name: client.name,
        email: client.email,
        phone: client.phone,
      });
      setClientToEdit(id);
      setIsEditClientModalOpen(true);
    }
  };

  const handleEditClient = () => {
    // Validate form
    if (!editClient.name.trim()) {
      showAlert('error', 'Client name is required');
      return;
    }

    if (!editClient.email.trim()) {
      showAlert('error', 'Email is required');
      return;
    }

    if (!clientToEdit) return;

    // In a real app, this would make an API call
    setClients(clients.map(client => {
      if (client.id === clientToEdit) {
        return {
          ...client,
          name: editClient.name,
          email: editClient.email,
          phone: editClient.phone,
        };
      }
      return client;
    }));

    setIsEditClientModalOpen(false);
    setClientToEdit(null);
    showAlert('success', 'Client updated successfully');
  };

  const resetForm = () => {
    setNewClient({ name: '', email: '', phone: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Clients</h3>
        <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-3">
          <div className="w-64">
            <SearchInput
              placeholder="Search clients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setIsAddClientModalOpen(true)}
            icon={
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Add Client
          </Button>
        </div>
      </div>

      {/* Client list */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Visit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Visits
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{client.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.email}</div>
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.lastVisit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.totalVisits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${client.totalSpent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openEditClientModal(client.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmDeleteClient(client.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        title="Add New Client"
        primaryActionLabel="Add"
        onPrimaryAction={handleAddClient}
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            required
          />
          <Input
            label="Phone"
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
          />
        </div>
      </Modal>

      {/* Edit Client Modal */}
      <Modal
        isOpen={isEditClientModalOpen}
        onClose={() => setIsEditClientModalOpen(false)}
        title="Edit Client"
        primaryActionLabel="Save"
        onPrimaryAction={handleEditClient}
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={editClient.name}
            onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={editClient.email}
            onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
            required
          />
          <Input
            label="Phone"
            value={editClient.phone}
            onChange={(e) => setEditClient({ ...editClient, phone: e.target.value })}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Client"
        primaryActionLabel="Delete"
        onPrimaryAction={handleDeleteClient}
      >
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this client? This action cannot be undone.
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