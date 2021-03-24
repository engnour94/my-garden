const form = document.getElementById( 'formElement' );
const table = document.getElementById( 'table' );
const headerArray=['#','Image','Name','Season'];



function headerRender(){
  const trElement = document.createElement( 'tr' );
  table.appendChild( trElement );
  for ( let i = 0; i < headerArray.length; i++ ) {
    const thElement = document.createElement( 'th' );
    trElement.appendChild( thElement );
    thElement.textContent=headerArray[i];
  }


}


function Flower( name, image,season ){
  this.name=name;
  this.image=`./img/${image}.jpeg`;
  this.season=season;
  Flower.all.push( this );
}

Flower.all=[];

form.addEventListener( 'submit', handelSubmit );

function handelSubmit( event ){
  event.preventDefault();
  const name = event.target.name.value;
  const image = event.target.image.value;
  const season = event.target.season.value;
  const newFlower = new Flower( name,image,season );
  localStorage.setItem( 'flower', JSON.stringify( Flower.all ) );

  newFlower.render();
  form.reset();
}

Flower.prototype.render= function(){
  table.innerHTML=' ';
  headerRender();
  for ( let i = 0; i < Flower.all.length; i++ ) {
    const trElement = document.createElement( 'tr' );
    table.appendChild( trElement );

    const td1Element = document.createElement( 'td' );
    trElement.appendChild( td1Element );
    const aTag = document.createElement( 'a' );
    aTag.setAttribute( 'href',`#${i}` );
    aTag.setAttribute( 'name','delete' );
    aTag.textContent='X';
    td1Element.appendChild( aTag );

    const td2Element = document.createElement( 'td' );
    trElement.appendChild( td2Element );
    const imageFlower = document.createElement( 'img' );
    imageFlower.src=Flower.all[i].image;
    // imageFlower.setAttribute( 'src', '`${Flower.all[i].image}`' );
    imageFlower.setAttribute( 'style','width:50px; height:50px;' );
    td2Element.appendChild( imageFlower );

    const td3Element = document.createElement( 'td' );
    trElement.appendChild( td3Element );
    td3Element.textContent=Flower.all[i].name;

    const td4Element = document.createElement( 'td' );
    trElement.appendChild( td4Element );
    td4Element.textContent=Flower.all[i].season;


  }





};


console.log( Flower.all );


const deletee = document.querySelector( '#table' );

deletee.addEventListener( 'click',deleteRow );

function deleteRow( event ){
  if ( event.target.name==='delete' ) {
    Flower.all.splice( event.target.href.split( '#' )[1],[1] );
    localStorage.setItem( 'flower', JSON.stringify( Flower.all ) );
    Flower.prototype.render();
  }


}


function getData(){
  if( localStorage.getItem( 'flower' ) ){

    Flower.all=JSON.parse( localStorage.getItem( 'flower' ) );
    Flower.prototype.render();

  }

}

getData();

const clear = document.getElementById( 'clear' );
clear.addEventListener( 'click',clearAll );

function clearAll( ){

  Flower.all=[];
  localStorage.setItem( 'flower', JSON.stringify( Flower.all ) );
  Flower.prototype.render();



}

