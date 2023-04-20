const isValidEmail = require('../utilsCheck/emailValidator');

test('valid email', () => {
  expect(isValidEmail('john@example.com')).toBe(true);
  expect(isValidEmail('joe123@example.net')).toBe(true);
  expect(isValidEmail('jane.doe@example.co.uk')).toBe(true);
  expect(isValidEmail('first.last@example.com')).toBe(true);
  expect(isValidEmail('user+label@example.com')).toBe(true);
  expect(isValidEmail('user123456789@example.com')).toBe(true);
  expect(isValidEmail('admin@example.org')).toBe(true);
  expect(isValidEmail('info@example.biz')).toBe(true);
    
});

test('invalid email', () => {
  expect(isValidEmail('invalidemail.com')).toBe(false);
  expect(isValidEmail('john@.com')).toBe(false);
  expect(isValidEmail('jane.doe@example')).toBe(false);
  expect(isValidEmail('joe123@example.')).toBe(false);
  expect(isValidEmail('info@example.com ')).toBe(false);
  expect(isValidEmail('@example.com')).toBe(false);
  expect(isValidEmail('admin@ example.com')).toBe(false);

});