import { useState } from "react";
import { GetServerSideProps } from "next";
import { createPrivateApiServer } from "@/services/api";

interface User {
  id: string;
  username: string;
  completedQuestionnaires: number;
  responses: QuestionnaireResponse[];
}

interface QuestionnaireResponse {
  questionnaireName: string;
  answers: { question: string; answer: string | string[] }[];
}

interface Props {
  users: User[];
}

const AdminPage: React.FC<Props> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Completed Questionnaires</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.completedQuestionnaires}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
                  >
                    View Responses
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">
              Responses for {selectedUser.username}
            </h2>
            <div className="space-y-4 max-h-96 overflow-auto">
              {selectedUser.responses.length === 0 && (
                <h3 className="text-lg font-semibold">
                  No questionnaire answered
                </h3>
              )}
              {selectedUser.responses.map((response, idx) => (
                <div key={idx} className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold">
                    {response.questionnaireName}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {response.answers.map((item, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-semibold">Q:</span>{" "}
                        {item.question}
                        <br />
                        <span className="font-semibold">A:</span>{" "}
                        {Array.isArray(item.answer)
                          ? item.answer.join(", ")
                          : item.answer}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-500 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const privateApiServer = createPrivateApiServer(context);
    const response = await privateApiServer.get(`/user-questionnaire`);

    const users: User[] = response.data;

    return { props: { users } };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return {
      props: { users: [] },
    };
  }
};

export default AdminPage;
