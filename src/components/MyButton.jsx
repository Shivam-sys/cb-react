import PropTypes from "prop-types";
const MyButton = ({ title, onClick }) => {
  return (
    <button
      type="button"
      className="mr-2 mt-2 inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-100 px-4 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-200 disabled:pointer-events-none disabled:opacity-50"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default MyButton;

MyButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};
