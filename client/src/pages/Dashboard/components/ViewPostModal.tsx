import { Button, Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import { GET_POSTS_FOR_PET } from '../../../graphql/queries';
import { Pet, Post } from '../../../interfaces';

interface ModalProps {
  showPostsModal: boolean;
  setShowPostsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPet: Pet | null;
}

function ViewPostModal({
  showPostsModal,
  setShowPostsModal,
  selectedPet
}: ModalProps) {
  const { data: postData } = useQuery(GET_POSTS_FOR_PET, {
    variables: {
      petId: selectedPet?._id
    }
  });

  const handleModalClose = () => setShowPostsModal(false);

  return (
    <Modal show={showPostsModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Posts for {selectedPet?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {postData && !postData.getPostsForPet.length && (
          <p>No posts have been added.</p>
        )}

        {postData && postData.getPostsForPet.map((post: Post) => (
          <article key={post._id} className="mb-4">
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </article>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewPostModal;