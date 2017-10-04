import 'whatwg-fetch';
const comicVineAPIKey = '';


export const openAddComicModal = () => {
  return async (dispatch, getState) => {
    dispatch({type: 'OPEN_ADD_COMIC_MODAL'});
  }
}

export const closeAddComicModal = () => {
  return async (dispatch, getState) => {
    dispatch({type: 'CLOSE_ADD_COMIC_MODAL'});
  }
}

export const openEditComicModal = (comicBookToEdit) => {
  return async (dispatch, getState) => {
    dispatch({type: 'OPEN_EDIT_COMIC_MODAL', comicBookToEdit});
  }
}

export const closeEditComicModal = () => {
  return async (dispatch, getState) => {
    dispatch({type: 'CLOSE_EDIT_COMIC_MODAL'});
  }
}


export const addComicBook = () => {
  return async (dispatch, getState) => {
    var comicBookToAdd = getState().homeReducer.comicBookToAdd;
    fetch('/comicBookRecords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comicBookToAdd)
    }).then(function(response){ 
          return response.json(); 
        })
        .then(function(data){ 
          if(data.errors){
            alert(data.errors.name.message || "An error ocurred trying to save. Please try again.");
            return
          }
          dispatch({type: 'ADD_COMIC_FINISH'}); 
          dispatch(getCurrentComics());
        })
    
  }
}

export const editComicBook = () => {
  return async (dispatch, getState) => {
    var comicBookToEdit = getState().homeReducer.comicBookToEdit;
    fetch('/comicBookRecord/' + comicBookToEdit._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comicBookToEdit)
    }).then(function(response){ 
          return response.json(); 
        })
        .then(function(data){ 
          if(data.errors){
            alert(data.errors.name.message || "An error ocurred trying to save. Please try again.");
            return
          }
          dispatch({type: 'CLOSE_EDIT_COMIC_MODAL'}); 
          dispatch(getCurrentComics());
        })
    
  }
}

export const updateAddComicBookProp = update => {
  return async (dispatch, getState) => {
    dispatch({type: 'UPDATE_ADD_COMIC_BOOK_PROP', update: update});
  }
}

export const updateEditComicBookProp = update => {
  return async (dispatch, getState) => {
    dispatch({type: 'UPDATE_EDIT_COMIC_BOOK_PROP', update: update});
  }
}

export const updateSearchComicBookProp = update => {
  return async (dispatch, getState) => {
    dispatch({type: 'UPDATE_SEARCH_COMIC_BOOK_PROP', update: update});
  }
}

export const selectSearchedComicBookVolume = selectedComicBookVolume => {
  return async (dispatch, getState) => {
    dispatch({type: 'SELECT_SEARCHED_COMIC_BOOK_VOLUME', selectedComicBookVolume: selectedComicBookVolume});
  }
}

export const searchComicBook = () => {
  return async (dispatch, getState) => {
    dispatch({type: 'SEARCH_COMIC_BOOK_START'});
    let fieldList = "name,image,publisher";
    let filter = "";
    var searchName = getState().homeReducer.comicBookSearch.comicBookVolumeName;
    if(searchName !== null){
      filter = "name:" + searchName;
    }
    let results = [];
    //first do the main search for the issue but it only lets us filter by issue_number here so we will refine further after
    fetch('https://comicvine.gamespot.com/api/volumes/?api_key=' + comicVineAPIKey + "&format=json&limit=5" + "&field_list=" + fieldList + "&filter=" + filter)
      .then(function(response) {
          return response.json();
      })
      .then((jsonResponse) => {
          if(jsonResponse && jsonResponse.status_code === 1){
            results = jsonResponse.results.map(function(x, index){ return {resultIndex: index, name: x.name, publisherName: x.publisher.name, imageUrl: x.image.icon_url}});
            dispatch({type: 'SEARCH_COMIC_BOOK_FINISH', results: results});
          }else{
            results = [];
            dispatch({type: 'SEARCH_COMIC_BOOK_FINISH', results: results});
          }
      });   
  }
}

export const getCurrentComics = () => {
   return async (dispatch, getState) => {
    dispatch({type: 'GET_CURRENT_COMICS_START'});
    fetch('/comicBookRecords')
          .then(function(response) {
              return response.json();
          })
          .then((currentComics) => {
              dispatch({type: 'GET_CURRENT_COMICS_FINISH', currentComics});
          });
   }  
}

export const deleteComicBook = (comicBookRecordId) => {
   return async (dispatch, getState) => {
    fetch('/comicBookRecord/' + comicBookRecordId,{
            method: 'delete'
          })
          .then(function(response) {
              return response.json();
          })
          .then((currentComics) => {
            dispatch(getCurrentComics());
          });
          
   }  
}





