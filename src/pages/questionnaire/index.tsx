import { createPrivateApiServer } from "@/services/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Questionnaire {
  id: string;
  name: string;
  description: string;
}

interface Props {
  questionnaires: Questionnaire[];
}

const QuestionnaireSelection: React.FC<Props> = ({ questionnaires }) => {
  const router = useRouter();

  const handleSelect = (id: string) => {
    router.push(`/questionnaire/${id}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Select a Questionnaire</h1>
      <div className="w-full max-w-lg space-y-4">
        {questionnaires.map((q) => (
          <button
            key={q.id}
            onClick={() => handleSelect(q.id)}
            className="w-full p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            <h2 className="text-lg font-semibold">{q.name}</h2>
            <p className="text-sm text-gray-400">{q.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const privateApiServer = createPrivateApiServer(context);
    const response = await privateApiServer.get(`/questionnaire`);

    const questionnaires: Questionnaire[] = response.data;

    return { props: { questionnaires } };
  } catch (error) {
    console.error("Erro ao buscar questionários:", error);
    return { props: { questionnaires: [] } };
  }
};

export default QuestionnaireSelection;
