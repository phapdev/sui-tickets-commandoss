# ��️ Sui Ticket DApp

A decentralized event ticketing platform built on the Sui blockchain, enabling users to create, purchase, and manage event tickets in a secure and transparent manner.

## 🌟 Key Features

- **Create Events**: Create and manage events with detailed information
- **Buy Tickets**: Purchase event tickets directly on the platform
- **Ticket Management**: View and manage purchased tickets
- **Sharing**: Share events on social media with interactive preview cards
- **X Integration**: Support for interactive preview cards on X (Twitter)

## 🛠️ Technologies Used

- **Frontend**: Next.js 13+ (App Router), React, TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Framer Motion
- **State Management**: Zustand
- **Blockchain**: Sui Blockchain, @mysten/dapp-kit
- **Storage**: Tusky
- **Deployment**: Vercel

## 🚀 Installation

1. Clone repository:
```bash
git clone https://github.com/your-username/sui-ticket-dapp.git
cd sui-ticket-dapp
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`:
```env
NEXT_PUBLIC_TUS_API_KEY=your_tus_api_key
```

5. Run development server:
```bash
npm run dev
```

## 📱 Project Structure

```
sui-ticket-dapp/
├── app/                    # Next.js App Router
│   ├── create-event/      # Event creation page
│   ├── tickets/          # Ticket listing page
│   └── view/             # Event detail view page
├── components/           # React components
├── stores/              # Zustand stores
│   ├── storage/        # Local storage
│   └── tusky/         # IPFS storage
├── types/              # TypeScript types
└── lib/               # Utility functions
```

## 🔑 Core Features

### Event Creation
- Upload images to IPFS
- Create event information
- Issue tickets on blockchain

### Ticket Purchase
- Browse event listings
- Direct ticket purchase
- Transaction confirmation

### Sharing
- Generate shareable links
- Interactive preview cards on X
- OpenGraph integration

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details. 