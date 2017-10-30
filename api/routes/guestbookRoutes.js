module.exports = (app) => {
  let guestbookList = require('../controllers/guestbookController')

  app.route('/guestbook')
    .get(guestbookList.listAllGuestbookEntries)
    .post(guestbookList.createGuestbookEntry)
}