import { Html } from '@react-email/html'
import { Tailwind } from '@react-email/components'
import { Img } from '@react-email/components'

export function WelcomeEmail() {
  return (
    <Tailwind>
      <Html>
        <div className="flex flex-col content-between justify-center">
          <Img src="/images/mail/welcome.png" alt="Welcome" width="300" height="300" />;
          <h1 className="mb-10 text-3xl font-bold">Welcome at Bitz!</h1>
          <p className="mb-10">
            Thank you for creating an account! We hope you will like our Open Source Project. If you
            need help or further information just ask our AI
          </p>
          <a href="https://bitztech.de" className="rounded-lg bg-black px-5 py-3 text-white">
            To Bitz
          </a>
        </div>
      </Html>
    </Tailwind>
  )
}

export function ProductInterestEmail(productName: string) {
  return (
    <Tailwind>
      <Html>
        <div className="flex flex-col content-between justify-center">
          <Img src="/images/mail/welcome.png" alt="Welcome" width="300" height="300" />;
          <h1 className="mb-10 text-3xl font-bold">Somebody wants to buy your Bit {productName}!</h1>
          <p className="mb-10">Start chatting now</p>
          <a
            href="https://bitztech.de/en/conversations"
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            Conversations
          </a>
        </div>
      </Html>
    </Tailwind>
  )
}

export function ProductDirectlySoldEmail(productName: string, address: string) {
  return (
    <Tailwind>
      <Html>
        <div className="flex flex-col content-between justify-center">
          <Img src="/images/mail/welcome.png" alt="Welcome" width="300" height="300" />;
          <h1 className="mb-10 text-3xl font-bold">Your Bit {productName} has been bought</h1>
          <p className="mb-10">Please send your Bit here: {address} in the next 7 Days</p>
          <a
            href="https://bitztech.de/en/transactions"
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            To Transactions
          </a>
        </div>
      </Html>
    </Tailwind>
  )
}

export function NewMessagesEmail() {
  return (
    <Tailwind>
      <Html>
        <div className="flex flex-col content-between justify-center">
          <Img src="/images/mail/welcome.png" alt="Welcome" width="300" height="300" />;
          <h1 className="mb-10 text-3xl font-bold">There are new messages to check out at Bitz!</h1>
          <p className="mb-10">CLick the Button below to see your new Messages</p>
          <a
            href="https://bitztech.de/en/conversations"
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            Conversations
          </a>
        </div>
      </Html>
    </Tailwind>
  )
}

export function AccountVerifiedEmail() {
  return (
    <Tailwind>
      <Html>
        <div className="flex flex-col content-between justify-center">
          <Img src="/images/mail/welcome.png" alt="Welcome" width="300" height="300" />;
          <h1 className="mb-10 text-3xl font-bold">Your Bitz Account has been verified!</h1>
          <p className="mb-10">You can now use all functions of Bitz!</p>
          <a href="https://bitztech.de/en" className="rounded-lg bg-black px-5 py-3 text-white">
            Bitz
          </a>
        </div>
      </Html>
    </Tailwind>
  )
}

// Styles for the email template
// const main = {
//   backgroundColor: '#ffffff',
// }

// const container = {
//   margin: '0 auto',
//   padding: '20px 0 48px',
//   width: '580px',
// }

// const heading = {
//   fontSize: '32px',
//   lineHeight: '1.3',
//   fontWeight: '700',
//   color: '#484848',
// }

// const paragraph = {
//   fontSize: '18px',
//   lineHeight: '1.4',
//   color: '#484848',
// }
