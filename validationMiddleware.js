const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and password',
    });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password',
    });
  }
  next();
};

const validateFAQ = (req, res, next) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both question and answer',
    });
  }
  next();
};

const validateAIAnswer = (req, res, next) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a question for AI processing',
    });
  }
  next();
};

const validateAIFaq = (req, res, next) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a topic for FAQ generation',
    });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateFAQ,
  validateAIAnswer,
  validateAIFaq,
};