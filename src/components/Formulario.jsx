import { useState, useEffect } from "react";
import Error from "./Error";

function Formulario({ pacientes, setPacientes, paciente, setPaciente }) {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFechaAlta(paciente.fechaAlta);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validación del formulario
    if ([nombre, propietario, email, fechaAlta, sintomas].includes("")) {
      setError(true);
    } else {
      setError(false);

      //Construir el objeto de pacientes
      const objPaciente = {
        nombre: nombre,
        propietario: propietario,
        email: email,
        fechaAlta: fechaAlta,
        sintomas: sintomas,
      };

      if (paciente.id) {
        //Editando el registro
        objPaciente.id = paciente.id;

        const pacientesActualizados = pacientes.map((pacienteState) =>
          pacienteState.id === paciente.id ? objPaciente : pacienteState
        );

        setPacientes(pacientesActualizados);
        setPaciente({});
      } else {
        //Nuevo Registro
        objPaciente.id = generarId();
        setPacientes([...pacientes, objPaciente]);
      }

      //Reiniciar el formulario
      setNombre("");
      setPropietario("");
      setEmail("");
      setFechaAlta("");
      setSintomas("");
    }
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center">
        Añade pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mt-10 mb-10"
      >
        {error && <Error>Todos los campos son obligatorios </Error>}
        <div>
          <label htmlFor="nombreMascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>

          <input
            id="nombreMascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-5">
          <label htmlFor="nombrePropietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>

          <input
            id="nombrePropietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mt-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Email contacto propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Fecha de alta
          </label>

          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fechaAlta}
            onChange={(e) => setFechaAlta(e.target.value)}
          />
        </div>

        <div className="mt-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Síntomas
          </label>

          <textarea
            id="sintomas"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>

        <input
          type="submit"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold mt-5 
          hover:bg-indigo-700 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
}

export default Formulario;
