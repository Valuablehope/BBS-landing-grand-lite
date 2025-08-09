// Button.jsx
export default function Button({ children, variant = 'primary', onClick, type = 'button', className = '' }) {
  const baseStyles = 'px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
    secondary: 'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
