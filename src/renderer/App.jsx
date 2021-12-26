import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Keyboard from './Keyboard.jsx';
import mapping from './mapping';

const HomePage = () => {
  const textToType =
    'ដើរ អង្គុយ ដេក ឈ ញាំ ហូប គេង សម្រាក់ ផឹក កម្សាន្ត ទស្សនា មើល ព្យាយាម ប្រឹងប្រែង គោរព រៀបចំ តុបតែង ធ្វើការងារ រត់ សរសេរ ចូលចិត្ត';
  const [doneText, setDoneText] = useState('');
  const [typingText, setTypingText] = useState('');
  useEffect(() => {
    const textToTypeSpan = document.querySelectorAll('.textToType');
    const textToTypeSpanArray = Array.from(textToTypeSpan);
    const inputDOM = document.getElementById('inputTyping');
    const displayTextDOM = document.getElementById('displayText');
    for (let i = 0; i < textToTypeSpanArray.length; i++) {
      const v = textToTypeSpanArray[i];
      if (v.classList.contains('text-red-500'))
        v.classList.remove('text-red-500');
      if (v.classList.contains('text-green-500')) {
        v.classList.remove('text-green-500');
      }
      if (inputDOM.classList.contains('shadow-red-600')) {
        inputDOM.classList.remove('shadow-red-600');
      }
      if (displayTextDOM.classList.contains('shadow-red-600')) {
        displayTextDOM.classList.remove('shadow-red-600');
      }
      if (v.innerHTML === typingText[i]) {
        v.classList.add('text-green-500');
      } else if (v.classList.contains('text-green-500')) {
        v.classList.remove('text-green-500');
      } else if (typingText[i]) {
        inputDOM.classList.add('shadow-red-600');
        displayTextDOM.classList.add('shadow-red-600');
        v.classList.add('text-red-500');
        break;
      }
    }
    let originalFill;
    const modifyDom = [];
    mapping[
      document.querySelector('.textToType.underline:not(.text-green-500)')
        ?.innerHTML || ' '
    ].forEach((v) => {
      const key = document.querySelector(`#${v}`);
      if (key) {
        modifyDom.push(key);
        originalFill = key.style.fill;
        key.style.fill = '#a6ffc3ab';
      }
    });
    return () => {
      modifyDom.forEach((v) => {
        v.style.fill = originalFill;
      });
    };
  }, [typingText]);
  useEffect(() => {
    document.getElementById('inputTyping').focus();
  }, []);
  return (
    <div className="flex flex-col justify-center max-w-4xl mx-auto h-screen gap-2">
      <section className="text-3xl">
        <div
          id="displayText"
          className="shadow-xl drop-shadow-lg shadow-amber-200 p-6 m-2 mb-6"
        >
          <span className="text-green-500">{doneText}</span>
          {textToType
            ?.split(' ')
            [doneText.split(' ').length - 1]?.split('')
            .map((letter, index) => {
              return <span className="textToType underline">{letter}</span>;
            })}{' '}
          <span className="">
            {textToType
              ?.split(' ')
              .slice([doneText?.split(' ').length])
              .join(' ')}
          </span>
        </div>
        <div id="buffer" className="">
          <input
            value={typingText}
            onChange={(e) => {
              const typed = e.target.value;
              if (doneText + typed === textToType) {
                setDoneText('');
                setTypingText('');
                // alert('done');
              } else if (
                typed ===
                `${textToType.split(' ')[doneText.split(' ').length - 1]} `
              ) {
                setDoneText(doneText + typed);
                setTypingText('');
              } else {
                setTypingText(typed);
              }
            }}
            id="inputTyping"
            type="text"
            className="p-3 shadow-lg drop-shadow-lg shadow-gray-400 w-full"
          />
        </div>
      </section>
      <Keyboard />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}
