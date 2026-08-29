export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-200 text-center">
      <span className="text-[13px] text-gray-400">
        {"©"} {new Date().getFullYear()} Josh Griffith. Built with purpose.
      </span>
    </footer>
  );
}
