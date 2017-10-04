import * as Immutable from "seamless-immutable";

const getDefaultComicBookToAdd = () => {
  return {
    comicBookName: null,
    publisherName: null,
    volume: null,
    issue:  null
  }  
}

const getDefaultComicBookSearch = () => {
  return {
    comicBookVolumeName: null,
    results: [],
    isSearching: false
  }  
}

const homeReducer = (state = {addModalvisible: false, comicBookToAdd: getDefaultComicBookToAdd(), comicBookToEdit: getDefaultComicBookToAdd(), comicBookSearch:getDefaultComicBookSearch(), currentComicsLoading: false, currentComics: []}, action) => {
  switch (action.type) {
    case 'GET_CURRENT_COMICS_START':
      return {...state, currentComicsLoading: true}
    case 'GET_CURRENT_COMICS_FINISH':
      return {...state, currentComicsLoading: false, currentComics: action.currentComics}
    case 'OPEN_ADD_COMIC_MODAL':
      return {...state, addModalvisible: true, editModalvisible: false, comicBookToAdd: getDefaultComicBookToAdd(), comicBookSearch: getDefaultComicBookSearch() }
    case 'CLOSE_ADD_COMIC_MODAL':
      return {...state, addModalvisible: false, editModalvisible: false, comicBookToAdd: getDefaultComicBookToAdd(), comicBookSearch: getDefaultComicBookSearch() }
    case 'OPEN_EDIT_COMIC_MODAL':
      return {...state, editModalvisible: true, addModalvisible: false, comicBookToEdit: action.comicBookToEdit }
    case 'CLOSE_EDIT_COMIC_MODAL':
      return {...state, editModalvisible: false, addModalvisible: false, comicBookToEdit: getDefaultComicBookToAdd() }
    case 'ADD_COMIC_FINISH':
      return {...state, addModalvisible: false };
    case 'UPDATE_ADD_COMIC_BOOK_PROP':
      return Immutable.setIn(state, ["comicBookToAdd", action.update.prop], action.update.value);
    case 'UPDATE_EDIT_COMIC_BOOK_PROP':
      return Immutable.setIn(state, ["comicBookToEdit", action.update.prop], action.update.value);
    case 'UPDATE_SEARCH_COMIC_BOOK_PROP':
      return Immutable.setIn(state, ["comicBookSearch", action.update.prop], action.update.value);
    case 'SEARCH_COMIC_BOOK_START':
      return Immutable.setIn(state, ["comicBookSearch", "isSearching"], true);
    case 'SEARCH_COMIC_BOOK_FINISH':
      var newState = Immutable.setIn(state, ["comicBookSearch", "isSearching"], false);
      return Immutable.setIn(newState, ["comicBookSearch", "results"], action.results);
    case 'SELECT_SEARCHED_COMIC_BOOK_VOLUME':
      var newState = Immutable.setIn(state, ["comicBookToAdd", "comicBookName"], action.selectedComicBookVolume.name);
      newState = Immutable.setIn(newState, ["comicBookToAdd", "publisherName"], action.selectedComicBookVolume.publisherName);
      newState = Immutable.setIn(newState, ["comicBookSearch", "comicBookVolumeName"], "");
      newState = Immutable.setIn(newState, ["comicBookSearch", "results"], []);
      return newState
    default:
      return state
  }
}

export default homeReducer