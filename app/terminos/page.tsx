import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Aleph",
  description: "Términos y condiciones de uso del servicio Aleph, coach de fitness por WhatsApp.",
};

export default function Terminos() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-teal text-sm font-semibold mb-12 hover:opacity-80 transition-opacity">
          ← Volver a Aleph
        </Link>

        <h1 className="text-4xl font-bold text-navy mb-3">Términos y Condiciones</h1>
        <p className="text-navy/40 text-sm mb-12">Última actualización: mayo de 2025</p>

        <div className="prose prose-navy max-w-none space-y-10 text-navy/70 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">1. Naturaleza del servicio</h2>
            <p>
              Aleph es una herramienta digital de seguimiento y sugerencias en materia de fitness y nutrición,
              basada en inteligencia artificial. El servicio opera a través de WhatsApp y no constituye un
              servicio médico, nutricional clínico ni de entrenamiento personal certificado.
            </p>
            <p className="mt-3">
              Las recomendaciones, cálculos de macronutrientes, planes de entrenamiento y cualquier otra
              información proporcionada por Aleph tienen carácter orientativo y educativo únicamente.
            </p>
          </section>

          <section>
            <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-navy mb-3">⚕️ 2. Consulta profesional obligatoria</h2>
              <p className="font-medium text-navy/80">
                Aleph no reemplaza la consulta con profesionales de la salud. Antes de iniciar cualquier
                plan de entrenamiento o modificación en tu alimentación, recomendamos:
              </p>
              <ul className="mt-4 space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold mt-0.5">•</span>
                  Consultar con un <strong className="text-navy">médico clínico o deportólogo</strong> para evaluar tu estado de salud general.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold mt-0.5">•</span>
                  Obtener un <strong className="text-navy">certificado de aptitud física (apto médico)</strong> antes de comenzar a entrenar, especialmente si no realizás actividad física regular.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold mt-0.5">•</span>
                  Consultar con un <strong className="text-navy">nutricionista o dietista</strong> si tenés condiciones médicas específicas que afecten tu alimentación.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal font-bold mt-0.5">•</span>
                  Trabajar con un <strong className="text-navy">entrenador certificado</strong> para la supervisión de tu técnica de ejercicio.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">3. Limitación de responsabilidad</h2>
            <p>
              Aleph y sus operadores no se responsabilizan por lesiones, problemas de salud, resultados
              insatisfactorios o cualquier consecuencia derivada del uso del servicio sin la debida
              supervisión profesional.
            </p>
            <p className="mt-3">
              El usuario asume la responsabilidad de evaluar la idoneidad de las sugerencias recibidas
              y de consultarlas con los profesionales correspondientes antes de aplicarlas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">4. Datos personales</h2>
            <p>
              Para brindar el servicio, Aleph almacena información proporcionada por el usuario, incluyendo:
              número de teléfono, datos antropométricos (peso, altura, composición corporal), registros de
              entrenamiento, historial nutricional y objetivos de fitness.
            </p>
            <p className="mt-3">
              Esta información se utiliza exclusivamente para personalizar las sugerencias del servicio
              y no se comparte con terceros, salvo las integraciones opcionales expresamente activadas
              por el usuario (como Strava).
            </p>
            <p className="mt-3">
              El tratamiento de datos se realiza conforme a la Ley 25.326 de Protección de Datos
              Personales de la República Argentina.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">5. Uso del servicio</h2>
            <p>
              El acceso a Aleph es personal e intransferible. El usuario se compromete a proporcionar
              información veraz y a utilizar el servicio de buena fe. Está prohibido el uso del servicio
              para fines comerciales sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">6. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios
              serán comunicados a través del propio servicio. El uso continuado de Aleph tras la
              notificación implica la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-3">7. Contacto</h2>
            <p>
              Para consultas, reclamos o solicitudes relacionadas con el servicio o el tratamiento de
              tus datos, podés contactarnos directamente por WhatsApp al número del servicio.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link href="/" className="text-teal font-semibold hover:opacity-80 transition-opacity">
            ← Volver a Aleph
          </Link>
        </div>
      </div>
    </div>
  );
}
