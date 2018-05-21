const db = {
  users: null,
  requests: null,
  status: [{
    id: 1,
    title: 'Unresolved',
  }, {
    id: 2,
    title: 'Resolved',
  }, {
    id: 3,
    title: 'Rejected',
  }],
  urgency: [{
    id: 1,
    title: '0 - 24 hours',
  }, {
    id: 2,
    title: '1 - 3 days',
  }, {
    id: 3,
    title: '1 week or less',
  }],
  classProperties: null,

};


db.users = [{
  id: 1,
  name: 'Olubori David',
  phone: '08164488989',
  email: 'daveholuborhee@gmail.com',
  address: '3, Adeona odutola avenu, Ijebu-Ode',
  password: 'password',
},
{
  id: 2,
  name: 'Anderson Bulugbe',
  phone: '07051398099',
  email: 'anderson@gmail.com',
  address: '3, Adeona Gabriel Road, Lagos',
  password: 'password',
},
{
  id: 3,
  name: 'Rosaline Adelarin',
  phone: '08052356173',
  email: 'rosaline@gmail.com',
  address: 'House On the Rock, Ajah',
  password: 'password',
},
{
  id: 4,
  name: 'Chuks Amaobi',
  phone: '09076543221',
  email: 'chuks@gmail.com',
  address: '3 Gwagwalada, FCT Abuja',
  password: 'password',
},
];

db.requests = [{
  id: 1,
  title: 'I have a faulty refridgerator',
  description: 'My refridgerator developed fault this mornign while, beacause of a high voltage from the PHCN, need a quick fix for it. Thanks',
  date: '09-08-2017',
  address: 'Doren Specialist Hospital, Thomas Estate. Ajah',
  urgency: 2,
  status: 2,
  user: 1,

},
{
  id: 2,
  title: 'Routine service on generator',
  description: 'I do a 3 month Routine service on my generator and it is two weeks over three months already I serviced last, yet to see anyone from your company',
  date: '05-06-2018',
  address: '3, Adeogun, Mokola, Ibadan',
  urgency: 1,
  status: 1,
  user: 2,

},
{
  id: 3,
  title: 'Server system needs to be fixed',
  description: 'The system powering the server needs some fix, it no longer accept charge either from AC or DC',
  date: '06-06-2018',
  address: 'Noble Computers, Mbaise Owerri',
  urgency: 1,
  status: 1,
  user: 4,

},
{
  id: 4,
  title: 'Water Dispenser doesn\'t dispense HOT water anymore',
  description: 'Got a new water Dispenser, and in just one week it has refused to dispense hot water anymore. Kindly come help to fix',
  date: '',
  address: '42, Boulvard Avenue, Isheri, Okigwe.',
  urgency: 3,
  status: 3,
  user: 1,
},
];

db.classProperties = {
  Request: {
    title: {
      type: 'alphaNumeric',
      maxlength: 100,
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'alphaNumeric',
      maxlength: 7,
      required: true,
    },
    address: {
      type: 'alphaNumeric',
      maxlength: 50,
      required: true,
    },
    urgency: {
      type: 'int',
      min: 1,
      max: 3,
      required: true,
    },
    status: {
      type: 'int',
      min: 1,
      max: 3,
      required: true,
    },
    user: {
      type: 'int',
      min: 1,
      max: 3,
      required: true,
    },
  },
};


export default db;
