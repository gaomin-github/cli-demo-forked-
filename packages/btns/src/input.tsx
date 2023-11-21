import React from 'react';
export const NormalInput = () => {
  const [inputMsg, updateInputMsg] = React.useState('');
  const updateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInputMsg(e.target.value);
    // console.log('updateChange', e);
  };

  return (
    <div>
      <input onChange={updateChange} />
      {/* <div dangerouslySetInnerHTML={inputMsg}></div> */}
      {inputMsg}
      <a href="http://localhost: :51768/?path=/story/btns--base-demo-1&javascript:alert('1')">
        thisis
      </a>
    </div>
  );
};
