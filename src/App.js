import { 
  BrowserRouter as Router,
  useRoutes,
   Routes, Route, Link, Outlet,
   useParams
} from 'react-router-dom';
import './App.css';

const BlogPosts = {
  'first-blog-post': {
    title: 'First Blog Post',
    description: 'Lorem ipsum dolor sit amet, consectetur adip.'
  },
  'second-blog-post': {
    title: 'Second Blog Post',
    description: 'Hello React Router v6'
  }
};
// posts 
function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      <Outlet />
    </div>
  );
}

// post list 

function PostLists() {
  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Post 
function Post() {
  const { slug } = useParams();
  const post = BlogPosts[slug];
  if(!post) {
    return <span>The blog post you've requested doesn't exist.</span>;
  }
  const { title, description } = post;
  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
// home function 
function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>page d'accueil</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

// about 

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>A propos</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

// page d'erreur 
function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Introuvable</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}


// Routes 

function Routemes() {
  const element = useRoutes([
    { path: "/", element: <Home/> },
    { path: "/posts",
      element: <Posts/>,
      children: [
        { index: true, element: <PostLists/> },
        { path: ":slug", element: <Post/> }
      ],
    },
    { path: "/about", element: <About/> },
    { path: "*", element: <NoMatch/>}
  ]);
  return element;
}
// App 
function App() {
  return (
    <Router>
      
      <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
          Home
          </Link>
          <Link to="/posts" style={{ padding: 5 }}>
          Posts
          </Link>
          <Link to="/about" style={{ padding: 5 }}>
          About
          </Link>
      </nav>
      <Routemes/>

      {/*
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
        <Route index element={<PostLists />} />
        <Route path=":slug" element={<Post />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
  */}

    </Router>
  )
}

export default App;
