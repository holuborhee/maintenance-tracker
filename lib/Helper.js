import validator from 'validator';
import db from './db';

const { classProperties } = db;
/* . This file contains functions of general use to the whole of the app, */

class Helper {
  static propsNotIn(obj, props) {
    return props.filter(p => !Object.prototype.hasOwnProperty.call(obj, p) || obj[p] === '');
  }


  static validateRequiredInRequest(requestBody, required) {
    const notFound = Helper.propsNotIn(requestBody, required);
    const response = {};
    if (notFound.length > 0) {
      response.status = 'fail';
      response.data = {};
      /* eslint array-callback-return: "off" */
      notFound.map((el) => {
        response.data[el] = `${el} is required`;
      });
      return response;
    }

    return true;
  }


  static validateClassProperties(classname, properties) {
    // Should be enhanced to test for other DB Tables
    switch (classname) {
      case 'Request':
        return this.validateRequestProperties(properties);
      default:
        throw new Error('Class name not recognized');
    }
  }

  static validateRequestProperties(properties) {
    // Currently only test for type, it will be enhamced to test for legth of value
    // and required using the validateRequiredInrequestFunction
    const { Request } = classProperties;
    const data = {};
    Object.keys(properties).forEach((key) => {
      if (!this.testType(properties[key], Request[key].type)) { data[key] = `Type of ${key} is incompatitble with required type`; }
    });

    return Object.keys(data).length === 0 ? true : data;
  }

  /**
   * Test request param type if it aligns with database schema declaration
   * Makes use of declaration definition in db.js and compares with the parameters value type
   * @param {string} value
   * @param {string} type
   * @response boolean
   */
  static testType(value, type) {
    switch (type) {
      case 'alphaNumeric':
        return /^[a-z\d\-_\s]+$/i.test(value);
      case 'int':
        return validator.isInt(`${value}`);
      case 'string':
        return true;
      default:
        return false;
    }
  }
}

export default Helper;
