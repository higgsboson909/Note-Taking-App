import { Link } from "react-router"
export const ErrorPage = () => {

  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-slate-900">
      <div className="max-w-md rounded-[2rem] border border-white/80 bg-white/85 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-sm">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Notes</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page does not exist</h1>
        <Link
          to='/'
          className="mt-6 inline-flex items-center justify-center rounded-full border border-blue-500/10 bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(59,130,246,0.22)] transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          Click me to go back
        </Link>
      </div>
    </div>
  )
}

