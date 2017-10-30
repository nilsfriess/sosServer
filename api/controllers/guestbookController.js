let mongoose = require('mongoose')
let Guestbook = mongoose.model('GuestbookEntry')
let request = require('request')

exports.listAllGuestbookEntries = (req, res) => {
  Guestbook.find({}, (err, guestbookEntries) => {
    if (err) 
      res.send(err)
    res.json(guestbookEntries)
  })
}

exports.createGuestbookEntry = (req, res) => {

  request.post('https://www.google.com/recaptcha/api/siteverify', {
    form: {
      'secret': '6LdMYTYUAAAAAGGN6dpMtDeGodwHCHDDd8zfcU3T',
      'response': req.body['g-recaptcha-response']
    }
  }, (error, response, body) => {
    if (error) 
      console.error(error)
    if (JSON.parse(body).success === false) {
      res.json({captcha: false})
    } else {
      let newGuestbookEntry = new Guestbook(req.body)
      newGuestbookEntry.save((err, guestbookEntry) => {
        if (err) 
          res.send(err)
        res.json(guestbookEntry)
      })
    }
  })

}
