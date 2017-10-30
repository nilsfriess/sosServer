let mongoose = require('mongoose')
let Contact = mongoose.model('Contact')
let request = require('request')

exports.listAllContacts = (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) 
      res.send(err)
    res.json(contacts)
  })
}

exports.createContact = (req, res) => {
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
      let newContact = new Contact(req.body)
      newContact.save((err, contact) => {
        if (err) 
          res.send(err)
        res.json(contact)
      })
    }
  })

}
