import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexView.vue') },
      { path: '', component: () => import('pages/UnlockScene.vue') },
      { path: 'RevealScene', component: () => import('pages/RevealScene.vue') },

    ],
  },
  {
    path: '/Pad',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/IndexPad.vue'), children: [
          { path: '', component: () => import('pages/LanternPad.vue'), },
          { path: 'LanternPad', component: () => import('pages/LanternPad.vue'), },
          { path: 'CoinPad', component: () => import('pages/CoinPad.vue'), },
          { path: 'RotatePad', component: () => import('pages/RotatePad.vue'), },
          { path: 'GuitarPad', component: () => import('pages/GuitarPad.vue'), },
        ]
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
