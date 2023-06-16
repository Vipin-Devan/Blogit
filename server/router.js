const router = require('express').Router();
const multer = require('multer');

const {
  userPostRouter,
  userGetRouter,
  userLoginRouter,
  userProfileRouter,
  userProfileUpdateRouter,
  userAuthRouter,
  userDeleteRouter,
} = require('./controllers/userController.js');

const { blogGetRouter, blogPostRouter, blogDeleteRouter, blogUpdateRouter, blogGetByIdRouter } = require('./controllers/blogController.js');
const getAuth = require('./middleware/auth');
router.post('/register', userPostRouter);
router.get('/users', userGetRouter);
router.post('/login', userLoginRouter);
router.get('/profile/:id', userProfileRouter);
router.put('/profile/:id', getAuth, userProfileUpdateRouter);
router.get('/auth', getAuth, userAuthRouter);
router.delete('/profile/:id', getAuth, userDeleteRouter);

router.get('/blog', blogGetRouter);
router.get('/blog/:id', blogGetByIdRouter);
router.post('/create', getAuth, blogPostRouter);
router.delete('/blog/:id', getAuth, blogDeleteRouter);
router.put('/edit/:id', getAuth, blogUpdateRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

module.exports = router;
