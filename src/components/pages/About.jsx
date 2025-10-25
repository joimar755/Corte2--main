// src/components/About.jsx

export const About = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Sobre Nosotros
        </h2>
        <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Somos un grupo de estudiantes de Ingeniería en Sistemas comprometidos
            con el desarrollo de soluciones tecnológicas que conecten el mundo
            físico con el digital. Nuestro interés por la automatización y los
            sistemas de control nos llevó a crear este proyecto, que combina la
            electrónica, la programación y el análisis de datos.
          </p>

          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Melanny Ariza:</span>{" "}
              Se encarga del diseño y la integración del sistema. Apasionada por
              la innovación tecnológica, busca siempre crear soluciones
              funcionales que faciliten la interpretación y el control de la
              información.
            </p>

            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Carlos Flórez:</span>{" "}
              Aporta su enfoque analítico en la programación y optimización del
              circuito. Su curiosidad por los sistemas inteligentes y el control
              automatizado impulsa la precisión del proyecto.
            </p>

            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Ana Rocha:</span>{" "}
              Se destaca por su organización y atención al detalle, enfocándose
              en el procesamiento y la presentación de los datos dentro de la
              plataforma web.
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Juntos desarrollamos un sistema capaz de monitorear temperatura y
            humedad en tiempo real, mostrando los datos tanto en una pantalla LCD
            como en una página web interactiva con indicadores y gráficas
            dinámicas. Nuestro objetivo es demostrar cómo la ingeniería en
            sistemas puede transformar la información en herramientas prácticas
            para la toma de decisiones y el control eficiente del entorno.
          </p>
        </div>
      </div>
    </section>
  );
};
