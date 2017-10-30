module.exports = (app) => {
  let contactList = require('../controllers/contactController')

  app.route('/contact')
    .get(contactList.listAllContacts)
    .post(contactList.createContact)
}