import React, { useState } from 'react';
import IAButton from './IAButton';
import {saveArticle} from '../dashboard/action'
const ArticleView: React.FC = () => {
  const [heading, setHeading] = useState('');
  const [textAreaContent, setTextAreaContent] = useState('');
  const handleButtonClick = () => {
    alert('Button was clicked!');
  };


   const submitArticle  = async ()  => {
 

    // e.preventDefault();
    // Handle form submission logic here



    try {
      // Call the server action
      const result = await saveArticle("Joe Dane", heading, textAreaContent);
      //  setMessage(result.message);
      setHeading('');
      setTextAreaContent('');
    } catch (error: any) {
      // setMessage(error.message || 'An error occurred');
    }
  };


  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
         Title
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          rows={6}
          placeholder="Enter detailed content"
          value={textAreaContent}
          onChange={(e) => setTextAreaContent(e.target.value)}
        />
      </div>
      <div>
        <IAButton onClick = {
            submitArticle
        }> Submit</IAButton>
      </div>
    </div>
  );
};

export default ArticleView;
