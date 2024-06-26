import { HomePromptInput } from '@/components/prompt-inputs/home';

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between p-12">
      <div className="flex flex-col items-center gap-1 my-auto">
        <h1 className="font-bold text-2xl">What would you like to ask?</h1>
        <p>Ask me anything!</p>
        <p className='text-xs'>ℹ Powered by Meta's Llama2 70b Chat v1</p>
      </div>
      <HomePromptInput />
    </main>
  );
}
