const ai = require('../services/geminiService');

// @desc    Generate AI Answer for a custom question
// @route   POST /api/ai/answer
const generateAIAnswer = async (req, res, next) => {
  try {
    const { question } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a clear, direct, and helpful answer to the following support question:\n\nQuestion: ${question}`,
    });

    res.status(200).json({
      success: true,
      data: {
        question,
        answer: response.text,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate FAQ Pair (Question, Answer, Category) from a Topic
// @route   POST /api/ai/generate-faq
const generateAIFAQ = async (req, res, next) => {
  try {
    const { topic } = req.body;

    const prompt = `Based on the topic "${topic}", generate a structured JSON object representing a Frequently Asked Question (FAQ).
The output must strictly be a JSON object with three fields: "question", "answer", and "category" (choose category strictly from: Technology, Education, Health, Banking, General).
Do not include any Markdown code block formatting or backticks in your output.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let cleanedText = response.text.trim();
    cleanedText = cleanedText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim();

    const faqData = JSON.parse(cleanedText);

    res.status(200).json({
      success: true,
      data: faqData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateAIAnswer,
  generateAIFAQ,
};