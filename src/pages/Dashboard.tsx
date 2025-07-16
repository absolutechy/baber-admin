import { Card, Button, Badge } from '../components/common';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Dashboard</h3>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Welcome to your Barber Admin Dashboard. Here's an overview of your business.
        </p>
      </div>

      {/* Quick Actions Section */}
      <Card title="Quick Actions" headerClassName="px-6 py-4 border-b border-gray-200">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Button 
              className="flex items-center justify-center gap-2 py-3"
              onClick={() => navigate('/appointments')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Appointment
            </Button>
            
            <Button 
              variant="secondary"
              className="flex items-center justify-center gap-2 py-3"
              onClick={() => navigate('/clients')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Add Client
            </Button>
            
            <Button 
              variant="outline"
              className="flex items-center justify-center gap-2 py-3"
              onClick={() => navigate('/clients')}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Client
            </Button>
            
            <Button 
              variant="outline"
              className="flex items-center justify-center gap-2 py-3"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculator
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Today's Appointments */}
        <Card bodyClassName="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-500 rounded-lg p-3">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Today's Appointments</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">12</div>
                  <div className="ml-2 text-sm text-green-600">+3 from yesterday</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" fullWidth className="text-indigo-600 hover:text-indigo-900">
              View All
            </Button>
          </div>
        </Card>

        {/* Total Clients */}
        <Card bodyClassName="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-lg p-3">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">145</div>
                  <div className="ml-2 text-sm text-green-600">+12 this month</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" fullWidth className="text-green-600 hover:text-green-900">
              View All
            </Button>
          </div>
        </Card>

        {/* Monthly Revenue */}
        <Card bodyClassName="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded-lg p-3">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">$6,800</div>
                  <div className="ml-2 text-sm text-yellow-600">68% of goal</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" fullWidth className="text-yellow-600 hover:text-yellow-900">
              View Report
            </Button>
          </div>
        </Card>

        {/* Active Staff */}
        <Card bodyClassName="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-500 rounded-lg p-3">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Staff</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">5</div>
                  <div className="ml-2 text-sm text-green-600">3 available</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" fullWidth className="text-purple-600 hover:text-purple-900">
              Manage Staff
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content Grid - Today's Schedule & Staff Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule - Takes 2/3 of the width */}
        <div className="lg:col-span-2">
          <Card
            title="Today's Schedule"
            subtitle={`${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
            headerClassName="px-6 py-4 border-b border-gray-200"
          >
            <div className="p-6 space-y-4">
              {/* Current/Active appointment */}
              <div className="flex items-center justify-between py-4 px-5 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">9:00 AM - John Smith</div>
                    <div className="text-sm text-gray-600">Haircut + Beard Trim • $45</div>
                  </div>
                </div>
                <Badge variant="success">In Progress</Badge>
              </div>
              
              {/* Upcoming confirmed */}
              <div className="flex items-center justify-between py-4 px-5 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-semibold">
                      SJ
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">10:30 AM - Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Hair Styling • $65</div>
                  </div>
                </div>
                <Badge>Confirmed</Badge>
              </div>
              
              {/* Available slot */}
              <div className="flex items-center justify-between py-4 px-5 border-l-4 border-gray-300 bg-gray-50 rounded-r-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-500">11:30 AM - Available</div>
                    <div className="text-sm text-gray-400">Open slot (60 min)</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Book Now</Button>
              </div>

              {/* Pending appointment */}
              <div className="flex items-center justify-between py-4 px-5 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-sm font-semibold">
                      RJ
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">1:00 PM - Robert Johnson</div>
                    <div className="text-sm text-gray-600">Haircut • $35</div>
                  </div>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>

              {/* Another available slot */}
              <div className="flex items-center justify-between py-4 px-5 border-l-4 border-gray-300 bg-gray-50 rounded-r-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-500">2:30 PM - Available</div>
                    <div className="text-sm text-gray-400">Open slot (90 min)</div>
                  </div>
                </div>
                <Button size="sm" variant="outline">Book Now</Button>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Button variant="outline" fullWidth onClick={() => navigate('/appointments')}>
                View Full Schedule
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Takes 1/3 of the width */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <Card title="Today's Summary" headerClassName="px-6 py-4 border-b border-gray-200">
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Appointments</span>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">3/8 completed</div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Today's Revenue</span>
                <span className="font-semibold text-green-600">$245</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">No-shows</span>
                <span className="font-semibold text-red-600">1</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-500">Available Slots</span>
                <span className="font-semibold text-blue-600">3</span>
              </div>
            </div>
          </Card>
          
          {/* Staff Status */}
          <Card title="Staff Status" headerClassName="px-6 py-4 border-b border-gray-200">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Mike Johnson</div>
                    <div className="text-xs text-gray-500">Senior Barber</div>
                  </div>
                </div>
                <Badge variant="success" size="sm">Available</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Sarah Wilson</div>
                    <div className="text-xs text-gray-500">Hair Stylist</div>
                  </div>
                </div>
                <Badge size="sm">Busy</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Tom Davis</div>
                    <div className="text-xs text-gray-500">Barber</div>
                  </div>
                </div>
                <Badge variant="warning" size="sm">Break</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Lisa Brown</div>
                    <div className="text-xs text-gray-500">Barber</div>
                  </div>
                </div>
                <Badge size="sm">Off Today</Badge>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/staff')}>
                Manage Staff
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Top Customers Section */}
      <Card
        title="Top Customers This Month"
        subtitle="Your most frequent visitors"
        headerClassName="px-6 py-4 border-b border-gray-200"
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center text-white text-lg">
                👑
              </div>
              <div>
                <div className="font-semibold text-gray-900">Marcus Johnson</div>
                <div className="text-sm text-gray-600">8 visits this month • $340 spent</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-yellow-600">VIP</div>
              <div className="text-xs text-gray-500">Next: Tomorrow 2PM</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                DJ
              </div>
              <div>
                <div className="font-semibold text-gray-900">David Johnson</div>
                <div className="text-sm text-gray-600">5 visits this month • $175 spent</div>
              </div>
            </div>
            <Button size="sm" variant="outline">Book Again</Button>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                SW
              </div>
              <div>
                <div className="font-semibold text-gray-900">Sarah Wilson</div>
                <div className="text-sm text-gray-600">4 visits this month • $260 spent</div>
              </div>
            </div>
            <Button size="sm" variant="outline">Book Again</Button>
          </div>
        </div>
      </Card>

      {/* Analytics Grid - Popular Services & Weekly Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Services */}
        <Card
          title="Popular Services"
          subtitle="This month's top services"
          headerClassName="px-6 py-4 border-b border-gray-200"
        >
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  ✂️
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Haircut</div>
                  <div className="text-sm text-gray-500">45 bookings</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">$1,575</div>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  🧔
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Beard Trim</div>
                  <div className="text-sm text-gray-500">28 bookings</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">$560</div>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  💇‍♀️
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Hair Styling</div>
                  <div className="text-sm text-gray-500">18 bookings</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">$1,170</div>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Button variant="outline" size="sm" fullWidth onClick={() => navigate('/services')}>
              Manage Services
            </Button>
          </div>
        </Card>

        {/* Weekly Revenue */}
        <Card
          title="Weekly Revenue"
          subtitle="Last 7 days performance"
          headerClassName="px-6 py-4 border-b border-gray-200"
        >
          <div className="p-6">
            <div className="space-y-4">
              {[
                { day: 'Monday', amount: '$320', width: '80%' },
                { day: 'Tuesday', amount: '$260', width: '65%' },
                { day: 'Wednesday', amount: '$360', width: '90%' },
                { day: 'Thursday', amount: '$300', width: '75%' },
                { day: 'Friday', amount: '$400', width: '100%' },
                { day: 'Saturday', amount: '$380', width: '95%' },
                { day: 'Today', amount: '$245', width: '60%', isToday: true }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className={`text-sm ${item.isToday ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    {item.day}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-28 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.isToday ? 'bg-orange-500' : 'bg-green-500'}`} 
                        style={{ width: item.width }}
                      ></div>
                    </div>
                    <span className={`text-sm font-semibold w-12 text-right ${item.isToday ? 'text-orange-600' : 'text-gray-900'}`}>
                      {item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500">Weekly Total:</span>
                <span className="font-bold text-green-600">$2,265</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Business Insights */}
      <Card
        title="Business Insights"
        headerClassName="px-6 py-4 border-b border-gray-200"
      >
        <div className="p-6 space-y-5">
          {/* Monthly Goal Progress */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-blue-900">Monthly Revenue Goal</h4>
              <span className="text-sm font-medium text-blue-600">68% complete</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3 mb-3">
              <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: '68%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-blue-700">
              <span className="font-medium">$6,800 / $10,000</span>
              <span>12 days left</span>
            </div>
          </div>

          {/* Peak Hours Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-800 mb-1">Peak Hours Alert</h4>
                <p className="text-sm text-yellow-700">
                  Friday 2-4 PM is 90% booked. Consider adding extra staff or extending hours.
                </p>
              </div>
            </div>
          </div>

          {/* Customer Insights */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-800 mb-1">Great Job!</h4>
                <p className="text-sm text-green-700">
                  Customer retention is up 15% this month. Keep up the excellent service!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
  }