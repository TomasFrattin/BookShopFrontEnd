import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center min-h-screen px-6 text-gray-100">
      <div className="opacity-90 bg-custom2 p-10 rounded-full max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/vector-gratis/interior-biblioteca-sala-vacia-leer-libros-estantes-madera_33099-1722.jpg"
            alt="Libros en una biblioteca"
            className="w-80 h-80 object-cover rounded-full shadow-lg"
          />
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4">
            Bienvenido a{" "}
            <span className="relative text-blue-600 before:absolute before:left-0 before:bottom-[-4px] before:w-0 before:h-1 before:bg-blue-500 before:transition-all before:duration-500 before:ease-in-out hover:before:w-full">
              Inkspire
            </span>
          </h1>

          <p className="text-lg text-gray-300 mb-4">
            Un libro no es solo papel y tinta, es una puerta a nuevos mundos,
            ideas y emociones. Leer estimula la mente, mejora la concentración y
            expande nuestro conocimiento. Ya sea que busques aventura,
            aprendizaje o simple desconexión, siempre hay un libro esperando por
            ti.
          </p>

          <p className="text-gray-400 text-sm mb-6">
            📚 Amplia selección de géneros y títulos <br />
            🚀 Envíos rápidos y seguros <br />
            🌱 Apoya a librerías y editoriales independientes
          </p>

          <div className="flex gap-4 justify-center md:justify-start">
            <button
              className="px-6 py-3 bg-blue-600 font-bold text-white rounded-lg text-lg hover:bg-blue-700 transition"
              onClick={() => navigate("/login")}
            >
              Inicia sesión
            </button>
            <button
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg text-lg hover:bg-blue-600 hover:text-white transition"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
