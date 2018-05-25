const schema = {
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


  User: {
    firstName: {
      type: 'alpha',
      maxlength: 100,
      required: true,
    },
    lastName: {
      type: 'alpha',
      maxlength: 100,
      required: true,
    },
    phone: {
      type: 'alphaNumeric',
      maxlength: 35,
      required: true,
    },
    address: {
      type: 'alphaNumeric',
      maxlength: 255,
      required: false,
    },
    email: {
      type: 'alphaNumeric',
      maxlength: 255,
      required: true,
    },
    password: {
      type: 'alphaNumeric',
      maxlength: 255,
      required: true,
    },
  },
};


export default schema;
