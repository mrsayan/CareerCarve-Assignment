import mongoose from 'mongoose';
const { Schema } = mongoose;

const TestSchema = new Schema({
  testID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionID: {
        type: String,
        required: true,
      },
      questionText: {
        type: String,
        required: true,
      },
      answers: {
        type: Array,
        required: true,
      },
      correctAnswer: {
        type: Array,
        required: true,
      }
    },
  ]
});
  
const Test = mongoose.model('Test', TestSchema);
export { Test };

/* Test Schema
{
  "testID": "525",
  "title": "Sample Test",
  "questions": [
    {
      "questionID": "Q1",
      "questionText": "Am I getting hired?",
      "answers": [
        "Yes",
        "No"
      ],
      "correctAnswer": [
        "Yes"
      ]
    },
    {
      "questionID": "Q2",
      "questionText": "Which of the following are programming languages?",
      "answers": [
        "Python",
        "Java",
        "C++",
        "English"
      ],
      "correctAnswer": [
        "Python",
        "Java",
        "C++"
      ]
    }
  ]
}
*/


