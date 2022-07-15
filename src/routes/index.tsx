import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from 'components/Layout'

const HomePage = React.lazy(() => import('pages/HomePage'))
const CreatePage = React.lazy(() => import('pages/CreatePage'))
const ItemPage = React.lazy(() => import('pages/ItemPage'))

const AppRoutes = () => (
  <>
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/details/:id" element={<ItemPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Suspense>
  </>
)

export default AppRoutes
