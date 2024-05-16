'use client';

import { generateResponse } from '@/app/actions/bedrock/generate-response';
import { getOneConversation } from '@/app/actions/db/get-one-conversation';
import { useConversation } from '@/context/conversation-context';
import { useEffect } from 'react';
import { MdOutlinePersonOutline } from 'react-icons/md';
import { FaMeta } from 'react-icons/fa6';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

interface IProps {
  uuid: string;
}

export function ConversationDisplay({ uuid }: IProps) {
  const { conversation, setConversation, isGenerating, setIsGenerating } =
    useConversation();

  const { user } = useUser();

  // When the page loads for the first time, fetch the conversation for the page UUID from the DB and add it to the context
  useEffect(() => {
    async function fetchConversation() {
      const conversation = await getOneConversation(uuid);
      setConversation(conversation);
    }

    fetchConversation();
  }, []);

  // When the conversation is updated run this useEffect
  useEffect(() => {
    async function generateAIResponse() {
      if (isGenerating) return;

      setIsGenerating(true);

      const lastAuthor = conversation?.conversation.at(-1)?.author;

      /**
       * If the lastAuthor is the 'ai' then we know the user needs to respond so return early and update the context state
       * If the conversation is falsy, also return and and update the context state
       */
      if (!conversation || lastAuthor === 'ai') {
        setIsGenerating(false);
        return;
      }

      // Generate a new reply from the AI and update the conversation in the context state below.
      const generatedReponse = await generateResponse(uuid);

      setConversation(generatedReponse);
      setIsGenerating(false);
    }

    generateAIResponse();
  }, [conversation]);

  return (
    <div className="flex flex-col items-start gap-12">
      {conversation?.conversation.map((message, ind) => (
        <div
          className="flex flex-row gap-4 items-start"
          key={`${message.content}-${ind}`}
        >
          {message.author === conversation.pk ? (
            <div className="text-white" style={{ width: 40, height: 40, position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
              {user?.hasImage ? 
                <Image 
                  src={user.imageUrl}
                  alt="User profile image"
                  fill
                  objectFit='cover'
                />
              :
              <MdOutlinePersonOutline size={20}/>
            }
            </div>
          ) : (
            <div className="bg-green-400 rounded-sm p-2 text-white mr-4">
              <FaMeta />
            </div>
          )}
          <p key={message.content}>{message.content}</p>
        </div>
      ))}
    </div>
  );
}
