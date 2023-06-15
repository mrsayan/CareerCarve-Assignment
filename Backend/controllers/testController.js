import { UserResponse } from '../models/Test.js';
import { Test } from '../models/Question.js';

// @desc    Submit a test
// @route   POST /api/submit-test
const submitTest = async (req, res) => {
  try {
    const { user_id, test_id, responses } = req.body;
    
    // const user_id = req.user._id;

    // Check if the user has already taken the test
    const existingResponse = await UserResponse.findOne({ userID: user_id, testID: test_id });
    if (existingResponse) {
      return res.status(400).json({ message: 'User has already taken this test.' });
    }

    // Fetch the test details
    const test = await Test.findOne({ testID: test_id });
    if (!test) {
      return res.status(404).json({ message: 'Test not found.' });
    }

    // Calculate the score
    let score = 0;
    responses.forEach(response => {
      const question = test.questions.find(q => q.questionID === response.questionID);
      if (question && JSON.stringify(question.correctAnswer) === JSON.stringify(response.answers)) {
        score++;
      }
    });

    // Store the user's responses and score
    const userResponse = new UserResponse({
      userID: user_id,
      testID: test_id,
      score: score,
    });

    await userResponse.save();

    // Return the response
    res.status(200).json({
      userID: user_id,
      testID: test_id,
      score: score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export { submitTest };


/*
Request:
{
  "user_id": "1",
  "test_id": "525",
  "responses": [
    {
      "questionID": "Q1",
      "answers": [
        "Yes"
      ]
    },
    {
      "questionID": "Q2",
      "answers": [
        "Python",
        "Java",
        "C++"
      ]
    }
  ]
}
*/

/*
Response:
{
  "userID": "1",
  "testID": "525",
  "score": 2
}
*/
