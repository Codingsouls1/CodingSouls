const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const LoginModel = require("../Models/LoginModel");
const authenticate = require("../MiddleWare/Middleware");
const { EventModel, MemberModel } = require("../Models/Eventmodel")
const toggleModel = require("../Models/Toggle")
const nodemailer = require("nodemailer")
/* for post Admin id and pass */
router.post("/SushilaDeviBansalCollegeOfTechnologyIndore", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({ message: "Fill Details" })
        }
        const user = await LoginModel.findOne({ $or: [{ name }, { email }, { password }] })
        if (user) {
            return res.status(400).send("Already Exist");
        }
        const newLogin = new LoginModel({ name, email, password });
        newLogin.password = await bcrypt.hash(newLogin.password, 12);
        await newLogin.save();
        res.status(201).send("Successful");

    } catch (err) {
        res.status(404).send(err);
    }

})
/* for check Login requist */
router.post("/Login", async (req, res) => {
    try {
        const { email, password } = req.body
        if (!(password && email)) {
            return res.status(400).send("Invalid Detail");
        }
        const data = await LoginModel.findOne({ email });
        const check = await bcrypt.compare(password, data.password);
        if (data && check) {
            const token = await data.generateAutoToken();
            res.cookie("bansal", token, {
                expires: new Date(Date.now() + 10368000),
                httpOnly: true,
            });
            res.status(201).send("Login Successful");
        }
        else {
            res.status(400).send("Login Failled");
        }

    } catch (err) {
        res.status(400).send(err);
    }
})
/* for authentification of Admin home */
router.get("/AdminHome", authenticate, (req, res) => {
    res.status(201).send(req.rootuser);
})
/* for post event data */
router.post("/Event", async (req, res) => {
    try {
        const { fname, lname, enrollment_number, email, contact, gender, college, branch, year, semester, section, language,hacker, tdate, time, tid, check } = req.body
        if (!fname || !lname || !enrollment_number || !email || !contact || !gender || !college || !branch || !year || !semester || !section || !language || !tdate || !time || !tid || !check) {
            return res.status(400).send("missing Details");
        }
        const exist = await EventModel.findOne({ $or: [{ enrollment_number, email, contact, tid }] })
        if (exist) {
            return req.status(401).send("Already Register");
        }
        const newEventReg = new EventModel({ fname, lname, enrollment_number, email, contact, gender, college, branch, year, semester, section, language,hacker, tdate, time, tid, check })
        await newEventReg.save();
        res.status(201).send("Register Successful");
        const transpoter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        await transpoter.sendMail({
            from: "coding.souls@sdbc.ac.in",
            to: email,
            subject: "Successful Event Registration",
            html: `<h2>Hi ${fname.charAt(0).toUpperCase() + fname.slice(1)} ${lname.charAt(0).toUpperCase() + lname.slice(1)},</h2>
              <p style="font-size:19px">You are Registered Successfully.</p>
              <p style="font-size:17px">Email:<a href="mailto:coding.souls@sdbc.ac.in">coding.souls@sdbc.ac.in</a>
              <p style="font-size:17px">For any other query contact us at:<a href="tel:8966826889">8966826889</a></p>
              <h2>Thanks and regards!<h2>
              <h2>Team Coding Souls</h2>`

        });
    } catch (err) {
        res.status(400).send(err);
    }
})
/* for post member data */
router.post("/Member", async (req, res) => {
    try {
        const { fname, lname, enrollment_number, email, contact, gender, college, branch, year, semester, section, language, tdate, time, tid, check } = req.body
        if (!fname || !lname || !enrollment_number || !email || !contact || !gender || !college || !branch || !year || !semester || !section || !language || !tdate || !time || !tid || !check) {
            return res.status(400).send("missing Details");
        }
        const exist = await MemberModel.findOne({ $or: [{ enrollment_number, email, contact, tid }] })
        if (exist) {
            return req.status(401).send("Already Register");
        }
        const newMemberReg = new MemberModel({ fname, lname, enrollment_number, email, contact, gender, college, branch, year, semester, section, language, tdate, time, tid, check })
        await newMemberReg.save();
        res.status(201).send("Register Successful");
        const transpoter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        await transpoter.sendMail({
            from: "coding.souls@sdbc.ac.in",
            to: email,
            subject: "Successful Member Registration",
            html: `<h2>Hi ${fname.charAt(0).toUpperCase() + fname.slice(1)} ${lname.charAt(0).toUpperCase() + lname.slice(1)},</h2>
              <p style="font-size:19px">You are Registered Successfully For As A Member Of Coding Souls Of BGI.</p>
              <p style="font-size:17px">Email:<a href="mailto:coding.souls@sdbc.ac.in">coding.souls@sdbc.ac.in</a>
              <p style="font-size:17px">For any other query contact us at:<a href="tel:8966826889">8966826889</a></p>
              <h2>Thanks and regards!<h2>
              <h2>Team Coding Souls</h2>`
        });
    } catch (err) {
        res.status(400).send(err);
    }
})
/* for post initial form data open or not */
router.post("/toggle", async (req, res) => {
    try {
        const { Event, Member } = req.body
        const newtoggle = new toggleModel({ Event, Member });
        await newtoggle.save();
        res.status(201).send("successful");
    } catch (err) {
        res.status(400).send(err);
    }
})
/* for update form data open or not */
router.patch("/toggle", async (req, res) => {
    try {
        await toggleModel.findByIdAndUpdate({ _id: "6309da44654ee7e173049e0a" }, req.body)
        res.status(201).send("Successful")

    } catch (err) {
        res.status(400).send(err);
    }
})
/* for get form dtat open or not */
router.get("/toggle", async (req, res) => {
    try {
        const data = await toggleModel.find();
        res.status(201).send(data);
    } catch (err) {
        res.status(400).send(err);
    }
})
/* for logout requist */
router.get("/Logout", (req, res) => {
    req.res.clearCookie("bansal");
    res.status(201).send("Logout Successful");
})

/* for get event data */
router.get("/EventData", authenticate, async (req, res) => {
    try {
        const data = await EventModel.find();
        res.status(201).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
})
/* for get member data */
router.get("/MemberData", authenticate, async (req, res) => {
    try {
        const data = await MemberModel.find();
        res.status(201).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
})
/* for search event data and send response */
router.post("/EventSearch", async (req, res) => {
    try {
        const { fname, lname, enrollment_number, email, contact, gender, college, branch, year, semester, section, language,hacker, tdate, time, tid, check } = req.body
        const data = await EventModel.find({ $or: [{ fname }, { lname }, { enrollment_number }, { email }, { contact }, { gender }, { college }, { branch }, { year }, { semester }, { section }, { language },{ hacker },{ tdate }, { time }, { tid }, { check }] })
        res.status(201).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
})
/* for search member data and send response */
router.post("/MemberSearch", async (req, res) => {
    try {
        const { fname, lname, enrollment_number, email, contact, gender, college, branch, year, semester, section, language, tdate, time, tid, check } = req.body
        const data = await MemberModel.find({ $or: [{ fname }, { lname }, { enrollment_number }, { email }, { contact }, { gender }, { college }, { branch }, { year }, { semester }, { section }, { language }, { tdate }, { time }, { tid }, { check }] })
        res.status(201).send(data)
    } catch (err) {
        res.status(400).send(err);
    }
})
/* send mail to all event participants */
router.post("/Eventmail", async (req, res) => {
    try {
        if (!req.body.message || !req.body.subject) {
            return res.status(400).send("plz fill detail")
        }
        const member = await MemberModel.find();
        const transpoter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        member.forEach(async (value, index) => {
            await transpoter.sendMail({
                from: "coding.souls@sdbc.ac.in",
                to: member[index].email,
                subject: `${req.body.subject}`,
                html: `<h2>Hi ${(member[index].fname).charAt(0).toUpperCase() + (member[index].fname).slice(1)} ${(member[index].lname).charAt(0).toUpperCase() + member[index].lname.slice(1)},</h2>
                  <p style="font-size:19px">${req.body.message}</p>
                  <p style="font-size:17px">Email:<a href="mailto:coding.souls@sdbc.ac.in">coding.souls@sdbc.ac.in</a>
                  <p style="font-size:17px">For any other query contact us at:<a href="tel:8966826889">8966826889</a></p>
                  <h2>Thanks and regards!<h2>
                  <h2>Team Coding Souls</h2>`
            });
        })
        res.status(201).send("success")
    } catch (err) {
        res.status(400).send(err);
    }
})
/* send mail to all Members of conding souls */
router.post("/Membermail", async (req, res) => {
    try {
        if (!req.body.message || !req.body.subject) {
            return res.status(400).send("plz fill detail")
        }
        const member = await MemberModel.find();

        const transpoter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
        member.forEach(async (value, index) => {
            await transpoter.sendMail({
                from: "coding.souls@sdbc.ac.in",
                to: member[index].email,
                subject: `${req.body.subject}`,
                html: `<h2>Hi ${(member[index].fname).charAt(0).toUpperCase() + (member[index].fname).slice(1)} ${(member[index].lname).charAt(0).toUpperCase() + member[index].lname.slice(1)},</h2>
                 <p style="font-size:19px">${req.body.message}</p>
                 <p style="font-size:17px">Email:<a href="mailto:coding.souls@sdbc.ac.in">coding.souls@sdbc.ac.in</a>
                 <p style="font-size:17px">For any other query contact us at:<a href="tel:8966826889">8966826889</a></p>
                 <h3>Thanks and regards!<h3>
                 <h3>Team Coding Souls</h3>`
            });
        })

        res.status(201).send("success")
    } catch (err) {
        res.status(400).send(err);
    }
})
module.exports = router;
