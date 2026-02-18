/**
 * Inline content-area loader — lightweight CSS-only spinner.
 *
 * @param {string} [size='md']  — 'sm' | 'md' | 'lg'
 * @param {string} [message]    — optional text alongside spinner
 * @param {string} [className]  — additional wrapper classes
 */
export function InlineLoader({ size = 'md', message, className = '' }) {
  const dims = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }
  const border = { sm: 'border-2', md: 'border-3', lg: 'border-4' }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-10 ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${dims[size]} ${border[size]} border-primary/20 rounded-full absolute inset-0 animate-ping-slow`}
        />
        {/* Spinner */}
        <div
          className={`${dims[size]} ${border[size]} border-primary border-t-transparent rounded-full animate-spin`}
        />
      </div>
      {message && (
        <p className="text-sm text-gray-500 dark-theme:text-gray-400 animate-pulse">{message}</p>
      )}
    </div>
  )
}

export default InlineLoader
