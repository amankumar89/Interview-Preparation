import { createSlice } from "@reduxjs/toolkit";
import { TOPIC_CATEGORIES } from "../../data/topics";

const LAST_VISITED_NOTE_KEY = "app-last-visited-note";
const HIDDEN_FOLDERS_KEY = "app-hidden-folders";
const SELECTED_CATEGORIES_KEY = "app-selected-categories";

function readStoredText(key, fallback = null) {
  try {
    return typeof window === "undefined"
      ? fallback
      : (window.localStorage.getItem(key) ?? fallback);
  } catch {
    return fallback;
  }
}

function readStoredValue(key, fallback) {
  try {
    const stored = readStoredText(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch {
    return fallback;
  }
}

function getInitialState() {
  const selectedCategoryIds = readStoredValue(SELECTED_CATEGORIES_KEY, []);
  const hiddenFolders = readStoredValue(HIDDEN_FOLDERS_KEY, []);
  const resumeSlug = readStoredText(LAST_VISITED_NOTE_KEY);

  return {
    activeSlug: resumeSlug,
    resumeSlug,
    selectedCategoryIds: Array.isArray(selectedCategoryIds)
      ? selectedCategoryIds.includes("all")
        ? ["all"]
        : [...new Set(selectedCategoryIds)].filter((id) =>
            TOPIC_CATEGORIES.some((category) => category.id === id),
          )
      : [],
    hiddenFolders: Array.isArray(hiddenFolders)
      ? [...new Set(hiddenFolders)].filter(
          (folder) => typeof folder === "string",
        )
      : [],
    theme: readStoredText("app-theme") === "dark" ? "dark" : "light",
    isCategoryHome: true,
    homeView: "domains",
  };
}

const learningSlice = createSlice({
  name: "learning",
  initialState: getInitialState(),
  reducers: {
    openLearningPath(state, action) {
      const { categoryIds, activeSlug } = action.payload;
      state.selectedCategoryIds = categoryIds.includes("all")
        ? ["all"]
        : categoryIds;
      state.activeSlug = activeSlug;
      state.resumeSlug = activeSlug || null;
      state.isCategoryHome = false;
    },
    selectNote(state, action) {
      state.activeSlug = action.payload;
      state.resumeSlug = action.payload;
    },
    returnToLearningHome(state) {
      state.isCategoryHome = true;
      state.homeView = "domains";
    },
    setHomeView(state, action) {
      state.homeView = action.payload;
    },
    toggleHiddenFolder(state, action) {
      const folder = action.payload;
      state.hiddenFolders = state.hiddenFolders.includes(folder)
        ? state.hiddenFolders.filter((hiddenFolder) => hiddenFolder !== folder)
        : [...state.hiddenFolders, folder];
    },
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    clearLearning(state) {
      state.activeSlug = null;
      state.resumeSlug = null;
      state.selectedCategoryIds = [];
      state.isCategoryHome = true;
      state.homeView = "domains";
    },
  },
});

export const {
  clearLearning,
  openLearningPath,
  returnToLearningHome,
  selectNote,
  setHomeView,
  toggleHiddenFolder,
  toggleTheme,
} = learningSlice.actions;

export const selectLearningState = (state) => state.learning;

export default learningSlice.reducer;
