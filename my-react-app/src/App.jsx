import { useState } from 'react'

const types = [
  { name: 'Fire', color: 'border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100' },
  { name: 'Water', color: 'border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100' },
  { name: 'Grass', color: 'border-green-200 bg-green-50 text-green-800 hover:bg-green-100' },
  { name: 'Ground', color: 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100' },
]

function App() {
  const [selectedType, setSelectedType] = useState('')
  async function getMatchup(type) {
    try {
      const response = await fetch(`http://localhost:5001/api/type/${encodeURIComponent(type.toLowerCase())}`)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const matchup = await response.json()
      return [
        `Moves of this type deal half damage to: ${matchup.half_damage_to.join(', ')}.`,
        `This type takes double damage from: ${matchup.double_damage_from.join(', ')}.`,
      ].join('\n')
    } catch (error) {
      console.error('Could not get the type matchup:', error)
      return 'Could not load the type matchup. Please try again.'
    }
  }

  async function handleTypeClick(type) {
    const response = await getMatchup(type)
    setSelectedType(response)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-10 text-slate-800">
      <section className="w-full max-w-lg rounded-3xl border-4 border-slate-800 bg-white p-7 shadow-[0_8px_0_#1e293b] sm:p-10">
        <div className="mb-7 flex items-center gap-3">
          <span aria-hidden="true" className="grid size-12 place-items-center rounded-full border-4 border-slate-800 bg-red-500 text-xl text-white">
            â˜…
          </span>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">PokÃ©mon Battle Assistant</p>
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Choose your opponentâ€™s type</h1>
        <p className="mt-3 text-slate-600">Pick a type to get ready for battle.</p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          {types.map(({ name, color }) => (
            <button
              className={`rounded-xl border-2 px-4 py-3 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800 ${color}`}
              onClick={() => handleTypeClick(name)}
              key={name}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>

        {selectedType && <p className="mt-5 whitespace-pre-line text-center font-semibold">{selectedType}</p>}
      </section>
    </main>
  )
}

export default App
