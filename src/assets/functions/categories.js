import '../css/main__page.scss';

import { createContent, resetDoctorList, newImage } from './generic'
import { printDoctorsList } from './doctor'

import iconDental from '../images/dental.png';
import iconHeart from '../images/heart.svg';
import iconEye from '../images/eye.svg';


import categoriesJson from '../categories.json';
import Category from '../../class/Category';


export function createCategoriesList() {
  const listCategories = categoriesJson.categoriesList;
  return listCategories.map( function(category) {
      return new Category(category.id, category.name, category.image, category.classCSS)
  })
}

function getIcon(id){
  switch(id){
    case 1: return iconDental;
    case 2: return iconHeart;
    case 3: return iconEye;
  }
}

function categoriesSearch(categoriesList, doctorList, id){

  let resultcat = categoriesList
    .filter(cat => cat.id === id);
  
  let result = doctorList
    .filter(doc => doc.categories == resultcat[0].name)

  resetDoctorList(categoriesList, doctorList);

  let page = document.getElementById("doctor__list--result");
  page.innerHTML = "";
  if(result.length == 0){
    page.appendChild(createContent("p", "No results"));
  }else{  
      printDoctorsList(page, categoriesList, result);
  }
}

export function printCategoriesList(page, categoriesList, doctorList){
  
  let div = document.createElement("div");
  div.id= "categories__list";
  
  categoriesList.forEach(element => {
    let item = document.createElement("div")
    item.className = "categories__list--item";
    item.onclick = function(){ categoriesSearch(categoriesList, doctorList, element.id);}

    let icon = document.createElement("div");
    icon.className = "categories__list--icon "+element.classCSS;

    icon.appendChild(newImage(35, 35, getIcon(element.id), element.id));

    item.appendChild(icon);
    item.appendChild(createContent("h3",element.name))
    div.appendChild(item)

  });

  page.appendChild(div);
}