import { Connected } from '../components/Wallet/Connected'
import { Bucket } from '../components/Buckets'
import '../styles/globals.css'
import { Header } from '../components/Header'

export default function Page() {
  return (
    <div>
      <Connected>
        <Header />
        <Bucket />
      </Connected>
    </div>
  )
}
