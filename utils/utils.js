import {titles,texts} from '../index.js'

export function addPosts(title,text){
    if(title){
        titles.push(title);
        texts.push(text);
    }
};

export function deletePosts(index){
    titles.splice(index,1);
    texts.splice(index,1);
};


