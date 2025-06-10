import book1 from '../images/book1.jpg';
import book2 from '../images/book2.jpg';
import book3 from '../images/book3.jpg';
import book4 from '../images/book4.jpg';
import book5 from '../images/book5.jpg';
import book6 from '../images/book6.jpg';

const BookStore = [
  {
    id: 1,
    title: 'The Great Gatsby',
    price: 19.99,
    description: 'A classic novel by F. Scott Fitzgerald.',
    image: book1,
    status: 1, // Verified
  },
  {
    id: 2,
    title: '1984',
    price: 15.99,
    description: 'Dystopian novel by George Orwell.',
    image: book2,
    status: 0, // Unverified
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    price: 12.99,
    description: 'A novel by Harper Lee about justice.',
    image: book3,
    status: 1, // Verified
  },
  {
    id: 4,
    title: 'The Catcher in the Rye',
    price: 14.99,
    description: 'A story about teenage rebellion by J.D. Salinger.',
    image: book4,
    status: 0, // Unverified
  },
  {
    id: 5,
    title: 'Moby-Dick',
    price: 17.99,
    description: 'A sea adventure by Herman Melville.',
    image: book5,
    status: 1, // Verified
  },
  {
    id: 6,
    title: 'Pride and Prejudice',
    price: 11.99,
    description: 'A romantic novel by Jane Austen.',
    image: book6,
    status: 1, // Verified
  }
];

export default BookStore;
