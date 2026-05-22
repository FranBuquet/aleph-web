import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-navy/40">
        <span>© {new Date().getFullYear()} Aleph. Todos los derechos reservados.</span>
        <div className="flex items-center gap-6">
          <a href="mailto:alephcoachpartner@gmail.com" className="hover:text-navy transition-colors">
            alephcoachpartner@gmail.com
          </a>
          <Link href="/terminos" className="hover:text-navy transition-colors">
            Términos y condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
