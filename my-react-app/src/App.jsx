import { useState } from 'react'

const types = [
  { name: 'Fire', color: 'border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100' },
  { name: 'Water', color: 'border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100' },
  { name: 'Grass', color: 'border-green-200 bg-green-50 text-green-800 hover:bg-green-100' },
  { name: 'Ground', color: 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100' },
]

function App() {
  const [selectedType, setSelectedType] = useState('')
  function getMatchup(type) {
  // API CALL WILL GO HERE, AND WE WILL RETURN THE RESPONSE
  return `Fake API response: You are fighting a ${type}-type Pokémon.`;
}

function handleTypeClick(type) {
  const response = getMatchup(type);
  setSelectedType(response);
}
  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-10 text-slate-800">
      <section className="w-full max-w-lg rounded-3xl border-4 border-slate-800 bg-white p-7 shadow-[0_8px_0_#1e293b] sm:p-10">
        <div className="mb-7 flex items-center gap-3">
          <span aria-hidden="true" className="grid size-12 place-items-center rounded-full border-4 border-slate-800 bg-red-500 text-xl text-white">
            ★
          </span>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Pokémon Battle Assistant</p>
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Choose your opponent’s type</h1>
        <p className="mt-3 text-slate-600">Pick a type to get ready for battle.</p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          {types.map(({ name, color }) => (
            <button
              className={`rounded-xl border-2 px-4 py-3 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800 ${color}`}
              onClick={() => handleTypeClick(types.name)}
              key={name}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>

        {selectedType && <p className="mt-5 text-center font-semibold">{selectedType}</p>}
      </section>
    </main>
  )
}

export default App
