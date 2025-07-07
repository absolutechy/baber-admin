import { Card, Button, Badge } from '../components/common';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Dashboard</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Welcome to your Barber Admin Dashboard. Here's an overview of your business.
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <Card
          bodyClassName="p-5"
          footer={
            <div className="text-sm">
              <Button variant="outline" size="sm" className="text-indigo-600 hover:text-indigo-900">
                View all
              </Button>
            </div>
          }
          footerClassName="px-5 py-3"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">12</div>
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        {/* Card 2 */}
        <Card
          bodyClassName="p-5"
          footer={
            <div className="text-sm">
              <Button variant="outline" size="sm" className="text-green-600 hover:text-green-900">
                View all
              </Button>
            </div>
          }
          footerClassName="px-5 py-3"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">145</div>
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        {/* Card 3 */}
        <Card
          bodyClassName="p-5"
          footer={
            <div className="text-sm">
              <Button variant="outline" size="sm" className="text-yellow-600 hover:text-yellow-900">
                View report
              </Button>
            </div>
          }
          footerClassName="px-5 py-3"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Revenue This Month</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">$2,150</div>
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        {/* Card 4 */}
        <Card
          bodyClassName="p-5"
          footer={
            <div className="text-sm">
              <Button variant="outline" size="sm" className="text-purple-600 hover:text-purple-900">
                View all
              </Button>
            </div>
          }
          footerClassName="px-5 py-3"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Staff</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">5</div>
                </dd>
              </dl>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent activity section */}
      <Card
        title="Recent Activity"
        headerClassName="px-4 py-5 sm:px-6 border-b border-gray-200"
        bodyClassName="p-6"
      >
        <ul className="divide-y divide-gray-200">
          <li className="py-4">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">New appointment booked</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <p className="text-sm text-gray-500">John Doe booked for haircut at 3:00 PM</p>
              </div>
            </div>
          </li>
          <li className="py-4">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Payment received</p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
                </div>
                <p className="text-sm text-gray-500">Payment of $50 received from Sarah Johnson</p>
              </div>
            </div>
          </li>
          <li className="py-4">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">New client registered</p>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
                <p className="text-sm text-gray-500">Michael Brown created a new account</p>
              </div>
            </div>
          </li>
        </ul>
      </Card>
      
      {/* Upcoming appointments section */}
      <Card
        title="Upcoming Appointments"
        subtitle="Next 5 appointments for today."
        headerClassName="px-4 py-5 sm:px-6 border-b border-gray-200"
      >
        <ul className="divide-y divide-gray-200">
          <li className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">David Wilson</div>
                  <div className="text-sm text-gray-500">Haircut + Beard Trim</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  11:00 AM
                </div>
                <div>
                  <Badge variant="success" size="sm">Confirmed</Badge>
                </div>
              </div>
            </div>
          </li>
          <li className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">Emily Rodriguez</div>
                  <div className="text-sm text-gray-500">Hair Styling</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  1:30 PM
                </div>
                <div>
                  <Badge variant="success" size="sm">Confirmed</Badge>
                </div>
              </div>
            </div>
          </li>
          <li className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">Robert Johnson</div>
                  <div className="text-sm text-gray-500">Haircut</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  3:00 PM
                </div>
                <div>
                  <Badge variant="warning" size="sm">Pending</Badge>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
} 