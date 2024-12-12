import React, { useState } from 'react';
import { 
  Truck, User, Phone, MapPin, Mail, Star, CreditCard 
} from 'lucide-react';

// Dummy data for transporters
const dummyTransporters = [
  {
    id: 'T001',
    name: 'John Logistics',
    contactPerson: 'John Smith',
    phone: '+1 (555) 123-4567',
    email: 'john@johnlogistics.com',
    address: '123 Transport Lane, Logistics City, LC 12345',
    // rating: 4.7,
    totalTrips: 250,
    specializations: ['Seed Transportation', 'Refrigerated Cargo']
  },
  {
    id: 'T002',
    name: 'Green Movers',
    contactPerson: 'Emily Green',
    phone: '+1 (555) 987-6543',
    email: 'emily@greenmovers.com',
    address: '456 Eco Road, Sustainable City, SC 67890',
    // rating: 4.9,
    totalTrips: 180,
    specializations: ['Organic Goods', 'Long-Distance Shipping']
  }
];

const dummyOrderDetails = [
  {
    id: 'OR001',
    seedName: 'Wheat Variety A',
    price: 150,
    quantity:100,
    contactPerson: 'John Smith',
    phone: '+1 (555) 123-4567',
    email: 'john@johnlogistics.com',
    address: '123 Transport Lane, Logistics City, LC 12345',
    // rating: 4.7,
    specializations: ['Seed Transportation', 'Refrigerated Cargo']
  },
  {
    id: 'OR002',
    seedName: 'Corn Hybrid X',
    price: 200,
    quantity:120,
    contactPerson: 'John Smith',
    phone: '+1 (555) 123-4567',
    email: 'john@johnlogistics.com',
    address: '123 Transport Lane, Logistics City, LC 12345',
    // rating: 4.7,
    specializations: ['Seed Transportation', 'Refrigerated Cargo']
  },
]

const TransporterDetails = () => {
  const [transporters, setTransporters] = useState(dummyTransporters);
  const [orders, setOrders] = useState(dummyOrderDetails);

  const [selectedTransporter, setSelectedTransporter] = useState(null);

  const handleTransporterSelect = (transporter) => {
    setSelectedTransporter(transporter);
  };

  return (
    <>
    <div className="p-4 bg-white">
            {/* <h1 className='text-3xl font-bold text-center mb-8 text-green-80'>TransportationDetails</h1> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-[15%] mt-[-13%]">
        {/* Transporters List */}
        <div className="md:col-span-1 bg-green-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Truck className="mr-2 text-green-600" /> Transporters
          </h2>
          <div className="space-y-4">
            {transporters.map((transporter) => (
              <div
                key={transporter.id}
                onClick={() => handleTransporterSelect(transporter)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 
                  ${selectedTransporter?.id === transporter.id 
                    ? 'bg-green-200 border-2 border-green-600' 
                    : 'bg-white hover:bg-green-100'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-green-800">{transporter.name}</h3>
                    <p className="text-sm text-gray-600">{transporter.contactPerson}</p>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {/* <Star className="w-4 h-4 mr-1" /> */}
                    {/* <span className="text-sm">{transporter.rating}</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transporter Details */}
        <div className="md:col-span-2 bg-green-50 rounded-lg shadow-md p-6">
          {selectedTransporter ? (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-green-800 flex items-center">
                <Truck className="mr-3 text-green-600" /> 
                {selectedTransporter.name} Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="mr-3 text-green-600" />
                    <div>
                      <p className="font-semibold">Contact Person</p>
                      <p>{selectedTransporter.contactPerson}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-3 text-green-600" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p>{selectedTransporter.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-3 text-green-600" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p>{selectedTransporter.email}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="mr-3 text-green-600" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p>{selectedTransporter.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {/* <Star className="mr-3 text-yellow-500" /> */}
                    <div>
                      <p className="font-semibold">Performance</p>
                      {/* <p>Rating: {selectedTransporter.rating} | Total Trips: {selectedTransporter.totalTrips}</p> */}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="mr-3 text-green-600" />
                    <div>
                      <p className="font-semibold">Specializations</p>
                      <p>{selectedTransporter.specializations.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 p-6">
              <Truck className="mx-auto mb-4 w-16 h-16 text-green-300" />
              <p>Select a transporter to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
    
    </>
  );
};

export default TransporterDetails;