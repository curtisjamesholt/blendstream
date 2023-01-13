import useSubmissions from '../../hooks/useSubmissions';
import SubmissionCard from '../submissions/SubmissionCard';

const CurateSubmissions = () => {
  const { movies: submissions } = useSubmissions();

  return (
    <>
      {submissions.length === 0 && (
        <span className="text-sm opacity-60">
          No unpublished movies submitted
        </span>
      )}
      <div className="flex flex-row flex-wrap gap-4">
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
      </div>
    </>
  );
};

export default CurateSubmissions;
