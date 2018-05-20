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
  title: 'Noble Computers',
  description: '',
  date: '',
  address: '',
  urgency: 1,
  status: 1,
  user: 1,

},
{
  id: 2,
  title: 'Noble Computers',
  description: '',
  date: '',
  address: '',
  urgency: 1,
  status: 1,
  user: 1,

},
{
  id: 3,
  title: 'Noble Computers',
  description: '',
  date: '',
  address: '',
  urgency: 1,
  status: 1,
  user: 1,

},
{
  id: 4,
  title: 'Noble Computers',
  description: '',
  date: '',
  address: '',
  urgency: 1,
  status: 1,
  user: 1,
},
];


export default db;
