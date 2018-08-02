var express = require('express');
var router = express.Router();

router.get('/encrypt', async (req, res) => {
  try {
    const message = req.query.message.toLowerCase();
    const keyword = req.query.keyword.toLowerCase();

    if (keyword.length == 0) {
      throw new Error("Keyword length 0");
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let encrypted = "";

    for (let i = 0; i < message.length; i++) {
      if (alphabet.indexOf(message[i]) >= 0) { // only encrypt if letter
        let shiftAmount = alphabet.indexOf(keyword[i % keyword.length]);
        encrypted += alphabet[(alphabet.indexOf(message[i]) + shiftAmount) % alphabet.length];
      } else {
        encrypted += message[i]; // don't bother to encrypt
      }
    }

    res.json({
      success: true,
      encrypted: encrypted,
      message: 'Message was encrypted successfully'
    });

  } catch (err) {
    console.log(err.message);
    res.status(400);

    res.json({
      success: false,
      message: 'Message could not be encrypted.'
    });
  }
});

router.get('/decrypt', async (req, res) => {
  try {
    const message = req.query.message.toLowerCase();
    const keyword = req.query.keyword.toLowerCase();
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let decrypted = "";

    if (keyword.length == 0) {
      throw new Error("Keyword length 0");
    }

    for (let i = 0; i < message.length; i++) {
      if (alphabet.indexOf(message[i]) >= 0) { // only decrypt if letter
        let shiftAmount = alphabet.indexOf(keyword[i % keyword.length]);
        decrypted += alphabet[(alphabet.indexOf(message[i]) - shiftAmount + alphabet.length) % alphabet.length];
      } else {
        decrypted += message[i]; // don't bother to decrypt
      }
    }

    res.json({
      success: true,
      decrypted: decrypted,
      message: 'Message was decrypted successfully'
    })
    
  } catch (err) {
    console.log(err.message);
    res.status(400);

    res.json({
      success: false,
      message: 'Message could not be decrypted.'
    });
  }
});

module.exports = router;