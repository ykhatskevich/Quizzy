import Modal from 'react-modal';

type AboutModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    content: string;
  };
  

  const AboutModal: React.FC<AboutModalProps> = ({ isOpen, closeModal, content }) => {
    return (
        <Modal 
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="bg-gray-900 text-white p-10 rounded-lg fixed inset-0 flex items-center justify-center"
        overlayClassName="bg-gray-800 bg-opacity-75">

        <div className="modal-content">

            <h2 className="text-2xl text-indigo-400 font-semibold mb-4">About Quizzy App</h2>
            <p className="text-xl text-teal-300">{content}</p>
            <button onClick={closeModal} style={{fontFamily:"IBM PLEX MONO, monospace"}} className="mt-4 px-4 py-2 text-teal-300 text-2xl rounded border border-teal-300-rounded hover:text-teal-100 hover:border-teal-100 transition-colors">Close</button>
        </div>
        </Modal>
    )

       };

export default AboutModal;