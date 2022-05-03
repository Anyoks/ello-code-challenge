import React, { useState } from "react";
import "./page.css";
import Modal from "react-modal";

Modal.setAppElement("#root");
export default function Page({ tokens, content }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWord, setWord] = useState("");

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  // Get an array of individual elements fromthe content
  let arrContent = Array.from(content);

  const handleClick = (word) => {
    setWord(word);
    setIsOpen(!isOpen);
  };

  const renderParagraph = () => {
    // set the variable to keep track of the original position in the new array
    let diff = 0;

    // iterate throught the tokens
    for (let i = 0; i < tokens.length; i++) {
      // compute the proper place to insert new clickable word using diff variable
      let start = tokens[i].position[0] - diff;
      let end = tokens[i].position[1] - diff;
      let offset = end - start;
      // wrap the proper word with clickable element
      let formatted = clickable(i);
      // replace the array of letter with the formatted clickable word
      arrContent.splice(start, offset, formatted);
      // proper position of this formatted word in the new array depnds on the
      // length of the old array.
      diff = Array.from(content).length - arrContent.length; // - lengthBefore;
    }
    return arrContent;
  };

 

  function clickable(i) {
    return (
      <span key={i} className="grab" onClick={() => handleClick(tokens[i].value)}>
        {content.slice(tokens[i].position[0], tokens[i].position[1])}
      </span>
    );
  }

  return (
    <>
      <p>{renderParagraph()}</p>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        // contentLabel="My dialog"
        tokenValue={selectedWord}
      >
        <div className="modal">
          <p className="no-indent"> {selectedWord}</p>
          <button onClick={toggleModal}>Close</button>
        </div>
      </Modal>
    </>
  );
}
