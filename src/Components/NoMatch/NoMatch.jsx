export default function NoMatch  ({ onLogin })  {
  return (
    <>
      <h2>No Match</h2>

      <button type='button' onClick={onLogin}>
        No
      </button>
    </>
  );
};