import FallingConfetti from './components/FallingConfetti'
import StaticBackground from './components/StaticBackground'
import Ceremonies from './components/Ceremonies'
import FinalRsvp from './components/FinalRsvp'
import GuestDetails from './components/GuestDetails'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Moments from './components/Moments'
import SaveTheDate from './components/SaveTheDate'
import Story from './components/Story'
import Wishes from './components/Wishes'

export default function App() {
  return (
    <main>
      <StaticBackground />
      <FallingConfetti />
      <Hero />
      <Invitation />
      <Story />
      <SaveTheDate />
      <Ceremonies />
      <Moments />
      <GuestDetails />
      <Wishes />
      <FinalRsvp />
    </main>
  )
}
