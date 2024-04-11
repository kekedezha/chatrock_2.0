import { PiChatsFill } from 'react-icons/pi';

export function Icon() {
  return (
    <div className="flex flex-row gap-3 items-center">
      <div className="bg-stone-50 p-2 rounded-lg shadow-md">
        <PiChatsFill className="text-4xl text-blue-900" size={24} />
      </div>
    </div>
  );
}
