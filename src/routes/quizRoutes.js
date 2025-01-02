const express = require('express');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');

const router = express.Router();

// Create Quiz
router.post('/quizzes', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Quiz
router.get('/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const sanitizedQuiz = {
      ...quiz.toObject(),
      questions: quiz.questions.map(q => ({
        id: q._id,
        text: q.text,
        options: q.options,
      })),
    };

    res.json(sanitizedQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit Answer
router.post('/quizzes/:quizId/questions/:questionId/answer', async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { selected_option, user_id } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const question = quiz.questions.id(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const is_correct = question.correct_option === selected_option;
 
    const result = await Result.findOneAndUpdate(
      { quiz_id: quizId, user_id },
      { $push: { answers: { question_id: questionId, selected_option, is_correct } } },
      { new: true, upsert: true }
    );

    res.json({ is_correct, correct_option: question.correct_option });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Results
router.get('/quizzes/:quizId/results/:userId', async (req, res) => {
  try {
    const { quizId, userId } = req.params;
    const result = await Result.findOne({ quiz_id: quizId, user_id: userId });

    if (!result) return res.status(404).json({ error: 'Result not found' });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
