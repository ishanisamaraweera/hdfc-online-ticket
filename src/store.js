import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        profileData: {},
        accessToken: {},
        authUser: false,
        activeSideMenu: false,
        activeRoute: "dashboard",
        pagePrivileges: [],
        actionPrivileges: [],

        setLogUser: (authUser, accessToken, profileData) => {
          set((state) => ({
            ...state,
            authUser: authUser,
            accessToken: accessToken,
            profileData: profileData,
          }));
        },

        setPagePrivileges: (pagePrivileges) => {
          set((state) => ({ ...state, pagePrivileges: pagePrivileges }));
        },

        setActionPrivileges: (actionPrivileges) => {
          set((state) => ({ ...state, actionPrivileges: actionPrivileges }));
        },

        setProfileData: (profileData) => {
          set((state) => ({ ...state, profileData: profileData }));
        },

        setActiveRoute: (activeRoute) => {
          set((state) => ({ ...state, activeRoute: activeRoute }));
        },

        setSettingData: (activeSideMenu) => {
          set((state) => ({ ...state, activeSideMenu: activeSideMenu }));
        },
      }),
      { name: "z-hdfc" }
    )
  )
);

let breadcrumbStore = (set) => ({
  breadcrumb: [],
  setBreadcrumb: (breadcrumb) => {
    set((state) => ({ ...state, breadcrumb: breadcrumb }));
  },
});

let refreshTable = (set) => ({
  refreshTable: false,
  setRefreshTable: (refreshTable) => {
    set((state) => ({ ...state, refreshTable: refreshTable }));
  },
});

export const useBreadcrumbStore = create(
  devtools(persist(breadcrumbStore, { name: "breadCrumb" }))
);

export const useRefreshTable = create(devtools(refreshTable));
