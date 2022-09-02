require("dotenv").config();
const express = require("express");
const router = express.Router();
const users = require("../models/userSchema.js");
const nodemailer = require("nodemailer");

// Add User
router.post("/add", async (req, res) => {
  const { name, email, phoneNumber, hobbies } = req.body;
  if (!name || !email || !phoneNumber || !hobbies) {
    res.status(404).json("Field cannot be left blank");
  }
  try {
    const preUser = await users.findOne({ email: email });
    if (preUser) {
      res.status(404).json("User with given email already present");
    } else {
      const addUser = new users({
        name,
        email,
        phoneNumber,
        hobbies,
      });
      await addUser.save();
      res.status(201).json(addUser);
      console.log(addUser);
    }
  } catch (error) {
    res.status(404).json("Error Occured");
  }
});

// Get All user
router.get("/getData", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(404).json("Error Occured");
  }
});

// Get User By ID
router.get("/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userIndividual = await users.findById({ _id: id });
    if (!userIndividual) {
      res.status(404).json("No details found");
    } else {
      res.status(201).json(userIndividual);
    }
  } catch (error) {
    res.status(404).json("No details found");
  }
});

//Update data by id
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(404).json("Error Occured");
  }
});

// Delete data by id
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await users.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteUser);
  } catch (error) {
    res.status(404).json("Error Occured");
  }
});

// Sending mail

router.post("/sendEmail", async (req, res) => {
  console.log("Inside send");
  
  try {
    const arr = req.body;
    var dataToSend = "";
    for (var i = 0; i < arr.length; i++) {
      const userData = await users.findById({ _id: arr[i] });
      if (!userData) {
        res.status(404).json("Error Occured");
      } else {
        dataToSend += " Name : \t " + userData.name;
        dataToSend += "\t Email : \t " + userData.email;
        dataToSend += "\t Phone Number : \t " + userData.phoneNumber;
        dataToSend += "\t Hobbies : \t " + userData.hobbies;
      }
      dataToSend += "\n";
    }

    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.EMAIL_TEST_PASS,
      },
    });
    var mail = {
      from: process.env.USER_GMAIL,
      to: process.env.REC_GMAIL,
      subject: "Message from Node JS",
      text: dataToSend,
    };
    transport.sendMail(mail, function (error, info) {
      if (error) {
        res.status(404).send("Error Occured");
      } else {
        res.status(201).send("Send Successfull");
      }
    });

  } catch (error) {
    res.status(404).send("Error Occured");
  }

  
});

module.exports = router;
