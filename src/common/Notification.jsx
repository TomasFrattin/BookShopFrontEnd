/* eslint-disable react/prop-types */
export const Notification = ({ message, messages, type, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-custom1 text-white p-4 rounded-lg text-center mx-auto max-w-4xl">
        <ul className="bg-custom2 p-2 my-2 rounded-lg shadow-sm">
          {type === "error" ? (
            <>
              {messages.map((errMsg, index) => (
                <li className="pt-1 text-red-500 font-bold text-lg" key={index}>
                  {errMsg}
                </li>
              ))}
            </>
          ) : type === "success" ? (
            <h2 className="pt-1 text-green-500 font-bold text-lg">{message}</h2>
          ) : null}
        </ul>
        <button
          className="shadow-md bg-custom2 hover:bg-gray-700 transition duration-500 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
