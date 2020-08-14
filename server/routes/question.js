const router = require('express').Router();
const { addNewQuestion, editQuestion, deleteQuestion, getQuestions, getQuestionById, getQuestionByAuthorId, getQuestionsByCategoryId , getQuestionsByTagId, chooseBestAnswer} = require('../controllers/question');
const { questionValidator } = require('../validators/question');
const { validate } = require('../middlewares/validateError');
router.get('/questions', validate, getQuestions);
router.post('/questions', questionValidator, validate, addNewQuestion);
router.put('/questions/:question_id', questionValidator, validate, editQuestion);
router.put('/questions/:question_id/best_answer/:answer_id', validate, chooseBestAnswer);
router.delete('/questions/:question_id', validate, deleteQuestion);
router.get('/questions/:question_id', validate, getQuestionById);
router.get('/user/questions', validate, getQuestionByAuthorId);
router.get('/questions/categories/:category_id', validate, getQuestionsByCategoryId);
router.get('/questions/tags/:tag_id', validate, getQuestionsByTagId);
module.exports = router;
