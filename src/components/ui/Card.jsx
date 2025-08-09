// Card.jsx
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border-2 border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}
