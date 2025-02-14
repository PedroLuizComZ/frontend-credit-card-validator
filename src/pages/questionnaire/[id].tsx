import { createPrivateApiServer, privateApiClient } from "@/services/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

interface Question {
  id: string;
  questionId: string;
  question: {
    questionText: string;
    type: "input" | "mcq-single" | "mcq-multiple";
    options?: string[];
    userAnswer: {
      answerText: string | null;
      selectedOptions: string[] | null;
    } | null;
  };
}

interface Props {
  questionnaireId: string;
  questions: Question[];
  previousAnswers: Record<string, string | string[]>;
}

const QuestionnairePage: React.FC<Props> = ({ questions, previousAnswers }) => {
  const router = useRouter();
  const [answers, setAnswers] =
    useState<Record<string, string | string[]>>(previousAnswers);
  const [error, setError] = useState("");

  const handleChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const validateAnswers = () => {
    return questions.every((q) => {
      const answer = answers[q.questionId];
      if (
        !answer ||
        (typeof answer === "string" && answer.trim() === "") ||
        answer.length === 0
      ) {
        return false;
      }
      return true;
    });
  };

  const handleSubmit = async () => {
    if (!validateAnswers()) {
      setError("All fields must be filled.");
      return;
    }

    try {
      await privateApiClient.post(
        `/questionnaire/${router.query.id}/responses`,
        {
          responses: Object.entries(answers).map(([questionId, answer]) => ({
            questionId: parseInt(questionId),
            answerText: typeof answer === "string" ? answer : null,
            selectedOptions: typeof answer === "object" ? answer : [],
          })),
        }
      );

      router.push("/questionnaire");
    } catch (error) {
      setError("Failed to submit answers. Please try again.");
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Questionnaire</h1>
      <div className="w-full max-w-lg space-y-6">
        {questions.map((q) => {
          const { questionText, type, options } = q.question;
          return (
            <div key={q.questionId} className="bg-gray-800 p-4 rounded-lg">
              <label className="block text-lg mb-2">{questionText}</label>
              {type === "input" && (
                <input
                  type="text"
                  value={(answers[q.questionId] as string) || ""}
                  onChange={(e) => handleChange(q.questionId, e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
              )}
              {type === "mcq-single" && options && (
                <select
                  value={(answers[q.questionId] as string) || ""}
                  onChange={(e) => handleChange(q.questionId, e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                >
                  <option value="">Select an option</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {type === "mcq-multiple" && options && (
                <div className="flex flex-col space-y-2">
                  {options.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={
                          (answers[q.questionId] as string[])?.includes(
                            option
                          ) || false
                        }
                        onChange={(e) => {
                          const newValues = e.target.checked
                            ? [
                                ...((answers[q.questionId] as string[]) || []),
                                option,
                              ]
                            : (
                                (answers[q.questionId] as string[]) || []
                              ).filter((v) => v !== option);
                          handleChange(q.questionId, newValues);
                        }}
                        className="w-4 h-4"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {error && <p className="text-red-400 mt-4">{error}</p>}
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-green-600 rounded-lg hover:bg-green-500"
      >
        Submit
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const privateApiServer = createPrivateApiServer(context);
    const response = await privateApiServer.get(
      `/questionnaire/${id}/questions`
    );
    const questions: Question[] = response.data;

    const previousAnswers: Record<string, string | string[]> = {};
    questions.forEach((q) => {
      if (q.question.userAnswer) {
        if (q.question.type === "input" || q.question.type === "mcq-single") {
          previousAnswers[q.questionId] =
            q.question.userAnswer.answerText || "";
        } else {
          previousAnswers[q.questionId] =
            q.question.userAnswer.selectedOptions || [];
        }
      }
    });

    return { props: { questionnaireId: id, questions, previousAnswers } };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      props: { questionnaireId: id, questions: [], previousAnswers: {} },
    };
  }
};

export default QuestionnairePage;
