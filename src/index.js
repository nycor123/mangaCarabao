import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeContainer } from './homeComponents/HomeContainer.js';
import { 
  ReaderContainer,
  loader as readerLoader
} from './readerComponents/ReaderContainer.js';
import { DirectoryContainer } from './directoryComponents/DirectoryContainer.js';
import { 
  ChapterListContainer, 
  loader as chapterListLoader 
} from './chapterListComponents/ChapterListContainer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeContainer />,
    errorElement: <HomeContainer />
  },
  {
    path: "/directory",
    element: <DirectoryContainer />
  },
  {
    path: "/manga/:mangaId/",
    element: <ChapterListContainer />,
    loader: chapterListLoader
  },
  {
    path: "/manga/:mangaId/:chapterId",
    element: <ReaderContainer />,
    loader: readerLoader
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
