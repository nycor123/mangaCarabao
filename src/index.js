import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeContainer } from './homeComponents/HomeContainer.js';
import { ReaderContainer } from './readerComponents/ReaderContainer.js';
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
    element: <HomeContainer />
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
    element: <ReaderContainer />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
