import { FiPlus } from 'react-icons/fi';
import usePublishMovie from '../../hooks/usePublishMovie';
import useSubmissions from '../../hooks/useSubmissions';
import SubmissionCard from '../submissions/SubmissionCard';

const CurateSubmissions = () => {
  const { movies: submissions } = useSubmissions();
  const { submitMovie, submitting } = usePublishMovie();

  const submitEmptyMovie = () => {
    submitMovie('Untitled', '', 'www.some.url', '', []);
  };

  return (
    <>
      <button
        className="mb-4 flex flex-row items-center gap-2 rounded bg-white px-4 py-2 text-sm font-semibold text-black transition-all hover:brightness-90"
        disabled={submitting}
        onClick={submitEmptyMovie}
      >
        <FiPlus />
        Add Empty Submission
      </button>
      <div>
        {submissions.length === 0 && (
          <span className="text-sm opacity-60">
            No unpublished movies submitted
          </span>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
      </div>
    </>
  );
};

export default CurateSubmissions;
