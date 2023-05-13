import { Connected } from '../components/Wallet/Connected'
import { ReadContract } from '../components/ReadContract'
import { SendTransaction } from '../components/SendTransaction'
import { SendTransactionPrepared } from '../components/SendTransactionPrepared'
import { SignMessage } from '../components/SignMessage'
import { SignTypedData } from '../components/SignTypedData'
import { WriteContract } from '../components/WriteContract'
import { WriteContractPrepared } from '../components/WriteContractPrepared'
import { CreateBucket } from '../components/Buckets'
import '../styles/globals.css'
import { Header } from '../components/Header'

export default function Page() {
  return (
    <div>
      <Connected>
        <Header />
        <CreateBucket />
        <br />
        <hr />
        <h2>Read Contract</h2>
        <ReadContract />
        <br />
        <hr />
        <h2>Send Transaction</h2>
        <SendTransaction />
        <br />
        <hr />
        <h2>Send Transaction (Prepared)</h2>
        <SendTransactionPrepared />
        <br />
        <hr />
        <h2>Sign Message</h2>
        <SignMessage />
        <br />
        <hr />
        <h2>Sign Typed Data</h2>
        <SignTypedData />
        <br />
        <hr />
        <h2>Write Contract</h2>
        <WriteContract />
        <br />
        <hr />
        <h2>Write Contract (Prepared)</h2>
        <WriteContractPrepared />
      </Connected>
    </div>
  )
}
